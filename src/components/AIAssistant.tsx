import React, { useState, useRef } from 'react';
import { Bot, User, CheckCircle2, Package, FileText, Send, UploadCloud, MessageSquare, Paperclip } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp } from '../utils';
import * as XLSX from 'xlsx';

export const AIAssistant = ({ currentTime }: { currentTime: Date }) => {
  const { orderData, inventory, setInventory, setActiveTab, setMasterDataTab, botMemory, setBotMemory, cart, setCart, setIsInputStockMode } = useAppContext();
  const [aiTab, setAiTab] = useState('chat');
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
         let botReply = data.text || 'Maaf, terjadi kesalahan saat memproses pesan.';

         setChatLogsByPhone(prev => ({
            ...prev,
            [csPhoneNumber]: [...newLogs, { role: 'bot', text: botReply }]
         }));
     } catch (err: any) {
         console.error(err);
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
          if (!data.text) {
             throw new Error(data.error || "AI service unavailable");
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
          console.error(err);
          alert('Gagal mengekstrak data JSON dari AI: ' + err.message);
      } finally {
          setIsParsing(false);
      }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="AI SMART ASSISTANT" currentTime={currentTime} />
      
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10 overflow-x-auto no-scrollbar">
         <button onClick={() => setAiTab('chat')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'chat' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>AI Chat Assistant</button>
         <button onClick={() => setAiTab('input')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'input' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Smart Data Input</button>
         <button onClick={() => setAiTab('insight')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'insight' ? 'bg-white border-b-white text-purple-900' : 'bg-gray-200 text-black'}`}>AI Insight</button>
         <button onClick={() => setAiTab('forecast')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'forecast' ? 'bg-white border-b-white text-indigo-900' : 'bg-gray-200 text-black'}`}>AI Forecast</button>
         <button onClick={() => setAiTab('profit')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'profit' ? 'bg-white border-b-white text-emerald-900' : 'bg-gray-200 text-black'}`}>Profit Analyzer</button>
         <button onClick={() => setAiTab('promo')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'promo' ? 'bg-white border-b-white text-rose-900' : 'bg-gray-200 text-black'}`}>Promo Generator</button>
         <button onClick={() => setAiTab('consultant')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${aiTab === 'consultant' ? 'bg-white border-b-white text-cyan-900' : 'bg-gray-200 text-black'}`}>Business Consultant</button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-6 text-black shadow-inner">
        <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
          
          {aiTab === 'chat' && (
              <div className="flex flex-col h-full items-center p-2">
                 <div className="w-full justify-between items-center bg-green-600 text-white p-3 font-bold rounded-t-lg shadow-md flex mb-0 border-x border-t border-green-800">
                     <span className="flex items-center gap-2"><MessageSquare className="w-5 h-5"/> WA CS API (Auto Reply)</span>
                     <div className="flex gap-4 items-center">
                         <button onClick={() => { setTempMemory(botMemory); setIsEditingMemory(true); }} className="px-3 py-1 bg-white text-green-700 font-bold rounded shadow-sm hover:bg-gray-100 text-xs">Ajarin Bot (Instruksi)</button>
                         <div className="flex gap-2 text-sm text-black">
                             {/* Dropdown / Input selector */}
                             <div className="relative flex select-none">
                                <span className="bg-gray-200 border border-gray-400 px-2 py-1 flex items-center leading-none">+62</span>
                                <input 
                                   type="text" 
                                   value={csPhoneNumber} 
                                   onChange={(e) => setCsPhoneNumber(e.target.value)} 
                                   placeholder="Nomor WA Pelanggan..." 
                                   className="px-2 py-1 outline-none text-black font-mono font-bold border border-gray-400 border-l-0"
                                />
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="flex-1 w-full bg-[#E5DDD5] border-x border-gray-300 p-4 overflow-y-auto flex flex-col gap-4 shadow-inner">
                     <div className="text-center text-xs text-gray-500 bg-[#E5DDD5] font-bold">Log Percakapan Simulator untuk {csPhoneNumber ? `+62 ${csPhoneNumber}` : '...'}</div>
                     {(chatLogsByPhone[csPhoneNumber] || []).map((log, idx) => (
                         <div key={idx} className={`flex ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] p-3 rounded-lg shadow-sm text-sm ${log.role === 'user' ? 'bg-[#DCF8C6] text-black rounded-tr-none' : 'bg-white text-black rounded-tl-none font-medium'}`}>
                                {log.text}
                            </div>
                         </div>
                     ))}
                     {(!chatLogsByPhone[csPhoneNumber] || chatLogsByPhone[csPhoneNumber].length === 0) && (
                         <div className="text-center text-sm font-medium text-gray-500 mt-10">Belum ada pesan. Mulai simulasi chat dengan mengirim pesan sebagai user <b>+62 {csPhoneNumber}</b>.</div>
                     )}
                 </div>
                 <form onSubmit={handleSendChat} className="w-full bg-[#f0f0f0] p-3 border border-gray-300 flex gap-2 rounded-b-lg">
                     <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} required placeholder="Kirim simulasi pesan SEBAGAI pelanggan di area ini..." className="flex-1 p-2 outline-none rounded border border-gray-400 bg-white" />
                     <button type="submit" disabled={isLoadingCs} className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-700 shadow-sm flex items-center gap-2">Send <Send className="w-4 h-4" /></button>
                 </form>

                 {isEditingMemory && (
                     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white border-2 border-green-700 w-full max-w-lg shadow-xl relative">
                           <div className="bg-green-700 text-white px-4 py-2 flex justify-between font-bold">
                               <span>Aturan & Memori Bot CS</span>
                               <button onClick={() => setIsEditingMemory(false)}>X</button>
                           </div>
                           <div className="p-4">
                               <p className="text-gray-600 mb-2 font-medium">Ajarkan AI cara menjawab, kebijakan toko Anda, atau informasi promosi terbaru yang akan diingat oleh sistem.</p>
                               <textarea 
                                  rows={6}
                                  value={tempMemory}
                                  onChange={e => setTempMemory(e.target.value)}
                                  className="w-full border border-gray-400 p-2 outline-none focus:border-green-600"
                               />
                               <div className="flex justify-end gap-2 mt-4">
                                  <button onClick={() => setIsEditingMemory(false)} className="px-4 py-2 bg-gray-200 font-bold border border-gray-400">Batal</button>
                                  <button onClick={() => { setBotMemory(tempMemory); setIsEditingMemory(false); alert('Memori Bot berhasil diupdate!'); }} className="px-4 py-2 bg-green-600 text-white font-bold">Simpan Memori</button>
                               </div>
                           </div>
                        </div>
                     </div>
                 )}
              </div>
          )}

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

          {aiTab === 'promo' && (
              <div className="flex flex-col h-full bg-[#ece9d8] border border-gray-400 p-6 shadow-sm overflow-y-auto">
                 <h2 className="text-xl font-bold text-rose-900 border-b border-gray-400 pb-2 mb-4 flex items-center gap-2">✨ AI Promo Generator</h2>
                 <p className="text-gray-700 mb-6 text-sm font-medium">Otomatis buat ide bundling / promosi untuk cuci gudang atau meningkatkan konversi pada pembeli.</p>
                 <button 
                   onClick={() => handleRunAiFeature('promo', 'Kamu adalah ahli marketing kreatif.', 'Saya punya toko buku & alat tulis. Buatkan 3 ide paket bundling kreatif beserta judul diskon yang catchy untuk hari libur nasional mendatang.')}
                   disabled={isProcessingGen['promo']} 
                   className="bg-rose-600 text-white font-bold px-6 py-3 hover:bg-rose-700 shadow-sm self-start mb-6"
                 >
                   {isProcessingGen['promo'] ? 'Menemukan Ide Promo...' : 'Generate Ide Bundling Promosi'}
                 </button>
                 {genResponses['promo'] && (
                     <div className="bg-white p-4 border border-gray-300 shadow-sm">
                       <h3 className="font-bold text-rose-900 mb-2">Daftar Ide Diskon & Bundling:</h3>
                       <div className="whitespace-pre-line text-sm text-gray-800">{genResponses['promo']}</div>
                     </div>
                 )}
              </div>
          )}

          {aiTab === 'consultant' && (
              <div className="flex flex-col h-full bg-[#ece9d8] border border-gray-400 p-6 shadow-sm overflow-y-auto w-full">
                 <h2 className="text-xl font-bold text-cyan-900 border-b border-gray-400 pb-2 mb-4 flex items-center gap-2">✨ AI Business Consultant</h2>
                 <p className="text-gray-700 mb-4 text-sm font-medium">Sistem interaktif bagi Anda (Owner) untuk bertanya tentang strategi bisnis, scaling, dll.</p>
                 <div className="bg-white border border-gray-400 p-4 mb-4 flex flex-col gap-2 relative shadow-inner min-h-[300px]">
                    <div className="absolute inset-0 bg-cyan-50/50 pointer-events-none"></div>
                    <div className="z-10 bg-cyan-100 p-3 rounded shadow-sm self-start max-w-[80%] border border-cyan-300">
                        <p className="text-sm font-bold text-cyan-900">Konsultan AI:</p>
                        <p className="text-sm">Halo! Ada pertanyaan strategis soal tata kelola toko Anda hari ini? (Misal: "Bagaimana cara menangani karyawan yang kinerjanya menurun?")</p>
                    </div>
                    {genResponses['consultant'] && (
                        <div className="z-10 bg-white p-3 rounded shadow-sm self-start max-w-[90%] border border-cyan-400 mt-8">
                            <p className="text-sm font-bold text-cyan-900 mb-1">Rekomendasi Konsultan:</p>
                            <div className="whitespace-pre-line text-sm">{genResponses['consultant']}</div>
                        </div>
                    )}
                 </div>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      id="consultant_prompt"
                      placeholder="Ketik pertanyaan bisnis yang spesifik..." 
                      className="flex-1 p-2 border border-gray-400 outline-none w-full shadow-inner"
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                              handleRunAiFeature('consultant', 'Kamu adalah konsultan bisnis ritel senior yang sangat bijak dan praktikal.', (e.target as any).value);
                          }
                      }}
                    />
                    <button 
                      onClick={() => {
                        const input = document.getElementById('consultant_prompt') as HTMLInputElement;
                        if (input.value) handleRunAiFeature('consultant', 'Kamu adalah konsultan bisnis ritel senior yang sangat bijak dan praktikal.', input.value);
                      }}
                      disabled={isProcessingGen['consultant']}
                      className="bg-cyan-600 text-white font-bold px-6 py-2 hover:bg-cyan-700 shadow-sm"
                    >
                      {isProcessingGen['consultant'] ? 'Berpikir...' : 'Tanya Konsultan'}
                    </button>
                 </div>
              </div>
          )}

        </div>
      </div>
    </div>
  );
};
