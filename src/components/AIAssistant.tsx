import React, { useState, useRef } from 'react';
import { Bot, User, CheckCircle2, Package, FileText, Send, UploadCloud, MessageSquare, Paperclip } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp } from '../utils';
import * as XLSX from 'xlsx';

export const AIAssistant = ({ currentTime }: { currentTime: Date }) => {
  const { orderData, inventory, setInventory, setActiveTab, setMasterDataTab, botMemory, setBotMemory, cart, setCart, setIsInputStockMode } = useAppContext();
  const [aiTab, setAiTab] = useState('input');
  const [isLoadingCs, setIsLoadingCs] = useState(false);
  
  // CS State
  const [chatInput, setChatInput] = useState('');
  const [csPhoneNumber, setCsPhoneNumber] = useState('08123456789');
  const [csPhones, setCsPhones] = useState<any[]>([{ phone: '08123456789', active: true }]);
  const [chatLogsByPhone, setChatLogsByPhone] = useState<Record<string, {role: string, text: string}[]>>({
    '08123456789': [
       { role: 'user', text: 'Halo, apakah spidol boardmarker masih ada?' },
       { role: 'bot', text: 'Halo! Berdasarkan data stok terbaru kami, Spidol Boardmarker (S001) masih tersedia sebanyak 2 pcs dengan harga Rp 8.000/pcs. Apakah ada yang ingin ditanyakan lagi?' }
    ]
  });

  // Memory Editor
  const [isEditingMemory, setIsEditingMemory] = useState(false);
  const [tempMemory, setTempMemory] = useState('');

  // Input Data State
  const [unstructuredText, setUnstructuredText] = useState('');

  // Generic AI Feature State
  const [genResponses, setGenResponses] = useState<Record<string, string>>({});
  const [isProcessingGen, setIsProcessingGen] = useState<Record<string, boolean>>({});

  const handleRunAiFeature = async (featureKey: string, systemInstruction: string, promptText: string) => {
    setIsProcessingGen(prev => ({...prev, [featureKey]: true}));
    setGenResponses(prev => ({...prev, [featureKey]: ''}));
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: promptText, systemInstruction })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Gagal menghubungi AI");
        setGenResponses(prev => ({...prev, [featureKey]: data.text || 'Gagal memproses data. Coba lagi.'}));
    } catch (err: any) {
        setGenResponses(prev => ({...prev, [featureKey]: 'Terjadi kesalahan: ' + err.message}));
    } finally {
        setIsProcessingGen(prev => ({...prev, [featureKey]: false}));
    }
  };

  const handleSendChat = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!chatInput.trim() || isLoadingCs) return;
     if (!csPhoneNumber.trim()) return alert('Pilih atau Masukkan Nomor WhatsApp Pelanggan!');

     const currentLogs = chatLogsByPhone[csPhoneNumber] || [];
     const newLogs = [...currentLogs, { role: 'user', text: chatInput }];
     setChatLogsByPhone({...chatLogsByPhone, [csPhoneNumber]: newLogs});
     setIsLoadingCs(true);
     setChatInput('');
     
     try {
         const systemInstruction = `Kamu adalah bot CS Toko bernama Nava POS. 
Ini adalah memori dan aturan khusus kamu: ${botMemory}

Ini adalah daftar barang/inventory saat ini:
${inventory.map((i:any) => `- ${i.name} (${i.code}): Stok ${i.stock}, Harga ${i.price1}`).join('\n')}

Ini adalah history pesan dengan nomor telepon ${csPhoneNumber}:
${currentLogs.map((l:any) => `${l.role === 'user' ? 'Customer' : 'Kamu'}: ${l.text}`).join('\n')}

Silahkan jawab pelanggan dengan ramah, informatif, gunakan bahasa Indonesia. Jika barang tidak ada, mohon maaf dan katakan tidak ada dengan sopan.`;

         const response = await fetch('/api/gemini', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                 prompt: chatInput,
                 systemInstruction
             })
         });

         const data = await response.json();
         if (!response.ok) throw new Error(data.error || "Gagal menghubungi AI");
         let botReply = data.text || 'Maaf, terjadi kesalahan saat memproses pesan.';

         setChatLogsByPhone(prev => ({
            ...prev,
            [csPhoneNumber]: [...newLogs, { role: 'bot', text: botReply }]
         }));
     } catch (err: any) {
         console.warn("AI Assistant Error:", err.message);
         alert('Gagal menghubungi AI Server: ' + err.message);
         setChatLogsByPhone(prev => ({
            ...prev,
            [csPhoneNumber]: [...newLogs, { role: 'bot', text: 'Maaf, saya sedang mengalami gangguan sistem.' }]
         }));
     } finally {
         setIsLoadingCs(false);
     }
  };

  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
          try {
              const bstr = evt.target?.result;
              const wb = XLSX.read(bstr, { type: 'binary' });
              const wsname = wb.SheetNames[0];
              const ws = wb.Sheets[wsname];
              const data = XLSX.utils.sheet_to_csv(ws);
              
              setUnstructuredText(prev => prev + '\n' + data);
          } catch (err) {
              alert('Gagal membaca file excel.');
          }
      };
      reader.readAsBinaryString(file);
  };

  const handleParseData = async () => {
      if (!unstructuredText.trim()) return;
      setIsParsing(true);
      
      try {
          const sysInstr = `Kamu adalah bot Parsing Data Inventory POS. Tugasmu adalah mengekstrak SEMUA intent untuk penambahan stok barang dari teks (bisa dari chat atau file CSV/Excel).
Ini daftar item di database:
${inventory.map((i:any) => `ID:${i.id} | Nama:${i.name} | Kode:${i.code}`).join('\n')}

Format balasamu WAJIB HANYA JSON ARRAY SEPERTI INI (jangan beri markdown \`\`\`json):
[
  {"itemId": number, "qtyToAdd": number}
]
Hanya kembalikan array JSON. Jangan ada teks lain. Ekstraklah sebanyak mungkin barang yang relevan. Jika tidak ada yang cocok kembalikan array kosong [].`;

          const response = await fetch('/api/gemini', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                 prompt: unstructuredText,
                 systemInstruction: sysInstr
             })
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "AI service unavailable");
          if (!data.text) {
             throw new Error("AI service unavailable");
          }
          let jsonStr = data.text.replace(/```json/g, '').replace(/```/g, '').trim();
          const pDataArray = JSON.parse(jsonStr);

          if (Array.isArray(pDataArray) && pDataArray.length > 0) {
              const itemsToAdd: any[] = [];
              pDataArray.forEach((pData: any) => {
                  const matchedItem = inventory.find((i:any) => i.id === pData.itemId);
                  if (matchedItem && pData.qtyToAdd > 0) {
                      itemsToAdd.push({
                          ...matchedItem,
                          qty: pData.qtyToAdd,
                          price: matchedItem.supplierPrice || 0,
                          isReturn: false,
                          cartUniqueId: 'ITEM-' + Date.now() + Math.random()
                      });
                  }
              });

              if (itemsToAdd.length > 0) {
                  // Switch to POS and put into cart
                  setCart((prev: any[]) => [...prev, ...itemsToAdd]);
                  setIsInputStockMode(true);
                  setActiveTab('pos');
                  setUnstructuredText('');
              } else {
                  alert('Tidak ada barang yang cocok dengan database master stock.');
              }
          } else {
              alert('Tidak ada data yang terdeteksi untuk ditambahkan.');
          }
      } catch (err: any) {
          console.warn("JSON Extraction Error:", err.message);
          alert('Gagal mengekstrak data JSON dari AI: ' + err.message);
      } finally {
          setIsParsing(false);
      }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="AI SMART ASSISTANT" currentTime={currentTime} />
      
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10 overflow-x-auto no-scrollbar">
         <button onClick={() => setAiTab('input')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'input' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Smart Data Input</button>
         <button onClick={() => setAiTab('insight')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'insight' ? 'bg-white border-b-white text-purple-900' : 'bg-gray-200 text-black'}`}>AI Insight</button>
         <button onClick={() => setAiTab('forecast')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'forecast' ? 'bg-white border-b-white text-indigo-900' : 'bg-gray-200 text-black'}`}>AI Forecast</button>
         <button onClick={() => setAiTab('profit')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'profit' ? 'bg-white border-b-white text-emerald-900' : 'bg-gray-200 text-black'}`}>Profit Analyzer</button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-6 text-black shadow-inner">
        <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
          
          {aiTab === 'input' && (
              <div className="flex flex-col h-full bg-[#ece9d8] border border-gray-400 p-6 shadow-sm">
                 <h2 className="text-xl font-bold text-blue-900 border-b border-gray-400 pb-2 mb-4">Smart Data Input (Gemini AI)</h2>
                 <p className="text-gray-700 mb-4 text-sm font-medium">Alih-alih mencari barang secara manual, ketik laporan pembelian dari supplier dalam bahasa sehari-hari. Sistem akan mendeteksinya menggunakan AI Gemini.</p>
                 
                 <label className="font-bold mb-1">Catatan Struk Belanja / Input Kasar:</label>
                 <textarea 
                    rows={4} 
                    value={unstructuredText}
                    onChange={e => setUnstructuredText(e.target.value)}
                    placeholder="Cth: Hari ini kulakan buku tulis sinar dunia 50 pcs"
                    className="w-full border border-gray-400 p-3 outline-none text-sm mb-4 shadow-inner"
                 />
                 
                 <div className="flex flex-wrap items-center gap-2">
                    <button onClick={handleParseData} disabled={isParsing} className={`text-white font-bold px-6 py-2 shadow-sm flex items-center gap-2 ${isParsing ? 'bg-gray-400' : 'bg-blue-600 border border-blue-800 hover:bg-blue-700'}`}>
                       <Bot className="w-4 h-4" /> {isParsing ? 'Memproses AI...' : 'Proses ke POS (Input Stock)'}
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv, .xlsx, .xls" className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="text-blue-900 bg-white border border-blue-900 font-bold px-6 py-2 shadow-sm flex items-center gap-2 hover:bg-blue-50">
                       <Paperclip className="w-4 h-4" /> Upload File Supliyer (Excel/CSV)
                    </button>
                    {unstructuredText && (
                        <button onClick={() => {setUnstructuredText('');}} className="text-gray-600 px-4 font-bold">Reset</button>
                    )}
                 </div>
              </div>
          )}

          {aiTab === 'insight' && (
              <div className="flex flex-col h-full bg-[#ece9d8] border border-gray-400 p-6 shadow-sm overflow-y-auto">
                 <h2 className="text-xl font-bold text-purple-900 border-b border-gray-400 pb-2 mb-4 flex items-center gap-2">✨ AI Insight: Rangkuman Tren Penjualan</h2>
                 <p className="text-gray-700 mb-6 text-sm font-medium">Buat rangkuman performa toko Anda (stok yang cepat habis, perilaku pelanggan, dsb) secara otomatis.</p>
                 <button 
                   onClick={() => handleRunAiFeature('insight', 'Kamu adalah konsultan bisnis data analitik.', 'Berdasarkan data toko POS biasa, buatkan 3 insight tren penjualan atau performa toko secara acak (anggap toko sedang laris). Format sebagai list profesional dalam bahasa Indonesia.')}
                   disabled={isProcessingGen['insight']} 
                   className="bg-purple-600 text-white font-bold px-6 py-3 hover:bg-purple-700 shadow-sm self-start mb-6"
                 >
                   {isProcessingGen['insight'] ? 'Menyusun Insight...' : 'Generate Insight Sekarang'}
                 </button>
                 {genResponses['insight'] && (
                     <div className="bg-white p-4 border border-gray-300 shadow-sm">
                       <h3 className="font-bold text-purple-900 mb-2">Laporan Analisis Tren:</h3>
                       <div className="whitespace-pre-line text-sm text-gray-800">{genResponses['insight']}</div>
                     </div>
                 )}
              </div>
          )}

          {aiTab === 'forecast' && (
              <div className="flex flex-col h-full bg-[#ece9d8] border border-gray-400 p-6 shadow-sm overflow-y-auto">
                 <h2 className="text-xl font-bold text-indigo-900 border-b border-gray-400 pb-2 mb-4 flex items-center gap-2">✨ AI Forecast: Prediksi Permintaan</h2>
                 <p className="text-gray-700 mb-6 text-sm font-medium">Prediksi potensi barang yang akan paling dibutuhkan bulan depan menggunakan model AI.</p>
                 <button 
                   onClick={() => handleRunAiFeature('forecast', 'Kamu adalah mesin AI prediktif untuk manajemen supply chain.', 'Prediksikan 3 kategori barang POS (alat tulis, dll) yang permintaannya akan meledak bulan depan. Jelaskan alasannya singkat.')}
                   disabled={isProcessingGen['forecast']} 
                   className="bg-indigo-600 text-white font-bold px-6 py-3 hover:bg-indigo-700 shadow-sm self-start mb-6"
                 >
                   {isProcessingGen['forecast'] ? 'Menjalankan Prediksi...' : 'Jalankan Forecast AI'}
                 </button>
                 {genResponses['forecast'] && (
                     <div className="bg-white p-4 border border-gray-300 shadow-sm">
                       <h3 className="font-bold text-indigo-900 mb-2">Proyeksi Penjualan Bulan Depan:</h3>
                       <div className="whitespace-pre-line text-sm text-gray-800">{genResponses['forecast']}</div>
                     </div>
                 )}
              </div>
          )}

          {aiTab === 'profit' && (
              <div className="flex flex-col h-full bg-[#ece9d8] border border-gray-400 p-6 shadow-sm overflow-y-auto">
                 <h2 className="text-xl font-bold text-emerald-900 border-b border-gray-400 pb-2 mb-4 flex items-center gap-2">✨ AI Profit Analyzer</h2>
                 <p className="text-gray-700 mb-6 text-sm font-medium">Dapatkan teguran cerdas tentang strategi harga dan margin Anda yang mungkin kurang efisien.</p>
                 <button 
                   onClick={() => handleRunAiFeature('profit', 'Kamu adalah auditor keuangan perusahaan ritel.', 'Buat simulasi laporan audit profit margin untuk toko kelontong POS. Soroti 2 masalah umum kebocoran margin dan sarankan strategi harga dinamis.')}
                   disabled={isProcessingGen['profit']} 
                   className="bg-emerald-600 text-white font-bold px-6 py-3 hover:bg-emerald-700 shadow-sm self-start mb-6"
                 >
                   {isProcessingGen['profit'] ? 'Audit Margin Sedang Berjalan...' : 'Mulai Audit Margin Harga'}
                 </button>
                 {genResponses['profit'] && (
                     <div className="bg-white p-4 border border-gray-300 shadow-sm">
                       <h3 className="font-bold text-emerald-900 mb-2">Laporan Rekomendasi Profit:</h3>
                       <div className="whitespace-pre-line text-sm text-gray-800">{genResponses['profit']}</div>
                     </div>
                 )}
              </div>
          )}

        </div>
      </div>
    </div>
  );
};
