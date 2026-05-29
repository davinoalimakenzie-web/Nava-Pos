import React, { useState } from 'react';
import { Bot, User, CheckCircle2, Package, FileText, Send, UploadCloud, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp } from '../utils';

export const AIAssistant = ({ currentTime }: { currentTime: Date }) => {
  const { orderData, inventory, setInventory, setActiveTab, setMasterDataTab, botMemory, setBotMemory } = useAppContext();
  const [aiTab, setAiTab] = useState('dashboard');
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
  const [parsedResult, setParsedResult] = useState<any>(null);

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

  const handleParseData = async () => {
      if (!unstructuredText.trim()) return;
      setIsParsing(true);
      
      try {
          const sysInstr = `Kamu adalah bot Parsing Data Inventory POS. Tugasmu adalah mengekstrak intent untuk menambah stok barang.
Ini daftar item di database:
${inventory.map((i:any) => `ID:${i.id} | Nama:${i.name} | Kode:${i.code}`).join('\n')}

Format balasamu WAJIB HANYA JSON SEPERTI INI:
{"found": true/false, "itemId": number_or_null, "qtyToAdd": number_or_0, "message": "Pesan balasan ramah"}

Jangan sertakan markdown \`\`\`json.`;

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
          const pData = JSON.parse(jsonStr);

          if (pData.found && pData.itemId && pData.qtyToAdd > 0) {
              const matchedItem = inventory.find((i:any) => i.id === pData.itemId);
              if (matchedItem) {
                  setParsedResult({
                      item: matchedItem,
                      qtyToAdd: pData.qtyToAdd,
                      message: pData.message || `Sistem mendeteksi penambahan stok untuk [${matchedItem.name}] sebanyak ${pData.qtyToAdd} Pcs.`
                  });
              } else {
                  alert('Sistem salah mengenali ID item. Silakan coba deskripsi yang lebih spesifik.');
              }
          } else {
              alert(pData.message || 'Barang atau Qty tidak ditemukan. Pastikan nama barang sesuai.');
          }
      } catch (err: any) {
          console.error(err);
          alert('Gagal menghubungi AI: ' + err.message);
      } finally {
          setIsParsing(false);
      }
  };

  const handleConfirmAddStock = () => {
      if (!parsedResult) return;
      const updatedInv = inventory.map((i: any) => 
          i.id === parsedResult.item.id ? { ...i, stock: i.stock + parsedResult.qtyToAdd } : i
      );
      setInventory(updatedInv);
      alert('Stok berhasil diperbarui melalui Smart Data Input!');
      setParsedResult(null);
      setUnstructuredText('');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="AI SMART ASSISTANT" currentTime={currentTime} />
      
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10">
         <button onClick={() => setAiTab('dashboard')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${aiTab === 'dashboard' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Dashboard</button>
         <button onClick={() => setAiTab('cs')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${aiTab === 'cs' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Bot WhatsApp CS</button>
         <button onClick={() => setAiTab('input')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${aiTab === 'input' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Smart Data Input</button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-6 text-black shadow-inner">
        <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
          
          {aiTab === 'dashboard' && (
              <>
                  <div className="flex items-center gap-3 mb-8 border-b pb-4">
                    <div className="bg-blue-600 p-3 rounded-sm shadow border border-blue-800">
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight text-blue-900">AI Smart Assistant</h1>
                      <p className="text-gray-600 font-bold text-sm mt-1">Sistem Otomasi Cerdas Nava POS</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#ece9d8] border border-gray-400 rounded-sm p-6 relative overflow-hidden group hover:bg-green-50 transition-colors shadow-sm">
                      <div className="absolute top-0 right-0 p-4 font-bold opacity-10"><User className="w-24 h-24" /></div>
                      <div className="flex items-center gap-2 text-green-700 mb-4 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" /> BOT WHATSAPP CS
                      </div>
                      <h3 className="text-3xl font-bold mb-1 text-black">Aktif</h3>
                      <p className="text-gray-600 text-sm mb-4">Integrasi WhatsApp API untuk merespon stok barang dan jam operasional via chat secara instan.</p>
                      <button onClick={() => setAiTab('cs')} className="bg-gray-200 border border-gray-400 hover:bg-gray-300 px-4 py-2 text-sm font-bold w-full text-black shadow-sm">Uji Coba Bot</button>
                    </div>

                    <div className="bg-[#ece9d8] border border-gray-400 rounded-sm p-6 relative overflow-hidden hover:bg-yellow-50 transition-colors shadow-sm">
                      <div className="absolute top-0 right-0 p-4 font-bold opacity-10"><Package className="w-24 h-24" /></div>
                      <div className="flex items-center gap-2 text-orange-600 mb-4 font-bold text-sm">
                        <span className="w-4 h-4">✨</span> AI AUTO-ORDER & SUPPLIER
                      </div>
                      <h3 className="text-3xl font-bold mb-1 text-black">{orderData?.filter((o:any) => o.sisaStock <= 2).length} Deteksi</h3>
                      <p className="text-gray-600 text-sm mb-4">Deteksi stok menipis lalu menyusun draf PO (Purchase Order) serta terhubung ke WA Supplier.</p>
                      <button onClick={() => { setActiveTab('masterdata'); setMasterDataTab?.('order'); }} className="bg-blue-600 text-white border border-blue-800 hover:bg-blue-700 font-bold px-4 py-2 text-sm w-full shadow-sm">Lihat Draft PO & Kirim</button>
                    </div>

                    <div className="bg-[#ece9d8] border border-gray-400 rounded-sm p-6 relative overflow-hidden hover:bg-blue-50 transition-colors shadow-sm">
                      <div className="absolute top-0 right-0 p-4 font-bold opacity-10"><FileText className="w-24 h-24" /></div>
                      <div className="flex items-center gap-2 text-blue-700 mb-4 font-bold text-sm">
                        <span className="w-4 h-4">✨</span> SMART DATA INPUT
                      </div>
                      <h3 className="text-xl font-bold mb-1 leading-tight text-black">Ekstraksi Teks ke Data</h3>
                      <p className="text-gray-600 text-sm mb-4">Input stok hanya dengan mengetik catatan kasar, sistem otomatis mendeteksi barang dan jumlah.</p>
                      <button onClick={() => setAiTab('input')} className="bg-blue-600 border border-blue-800 hover:bg-blue-700 text-white px-4 py-2 text-sm font-bold w-full mt-2 shadow-sm">Mulai Input</button>
                    </div>
                  </div>
              </>
          )}

          {aiTab === 'cs' && (
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
                 
                 <div className="flex items-center gap-2">
                    <button onClick={handleParseData} disabled={isParsing} className={`text-white font-bold px-6 py-2 shadow-sm flex items-center gap-2 ${isParsing ? 'bg-gray-400' : 'bg-blue-600 border border-blue-800 hover:bg-blue-700'}`}>
                       <UploadCloud className="w-4 h-4" /> {isParsing ? 'Memproses AI...' : 'Proses Ekstraksi Data'}
                    </button>
                    {unstructuredText && (
                        <button onClick={() => {setUnstructuredText(''); setParsedResult(null);}} className="text-gray-600 px-4 font-bold">Reset</button>
                    )}
                 </div>

                 {parsedResult && (
                     <div className="mt-8 bg-green-50 border-2 border-green-500 p-4 shadow-sm animate-fade-in">
                        <h3 className="font-bold text-green-800 text-lg mb-2">Hasil Ekstraksi Data:</h3>
                        <p className="text-green-900 font-medium mb-4">{parsedResult.message}</p>
                        <div className="flex gap-4">
                           <button onClick={handleConfirmAddStock} className="bg-green-600 text-white font-bold px-4 py-2 hover:bg-green-700 shadow-sm">Konfirmasi Tambah Stok</button>
                           <button onClick={() => setParsedResult(null)} className="bg-gray-200 border border-gray-500 px-4 py-2 font-bold hover:bg-gray-300">Batalkan</button>
                        </div>
                     </div>
                 )}
              </div>
          )}

        </div>
      </div>
    </div>
  );
};
