import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Send, Loader2, Wallet, Bot } from 'lucide-react';
import { formatRp } from '../utils';

export const AiCashflowBot = () => {
    const { wallets, setWallets, transactions, expenses, addLog } = useAppContext();
    const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
        { role: 'model', text: 'Halo! Saya AI Cashflow Anda. Ada yang bisa saya bantu terkait pengelolaan Dana Laci, Dana Bebas, pengeluaran, atau setoran tutup toko hari ini?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        const currentLaci = wallets.danaLaci || 0;
        const currentBebas = wallets.danaBebas || 0;

        // Extract today's petty cash & income to help AI
        const today = new Date().toISOString().split('T')[0];
        const harianTransactions = (transactions || []).filter((t: any) => {
            if (t.type === 'PEMBELIAN') return false;
            if (t.date && t.date.includes(today)) return true;
            if (t.isoDate && t.isoDate.includes(today)) return true;
            return false;
        });
        const todayFiktif = harianTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0);
        const todayOmzet = currentLaci + todayFiktif;

        const systemPrompt = `
Kamu adalah AI Cashflow di aplikasi Nava POS. Tugas utamamu adalah membantu pemilik usaha mengelola dua dompet utama: Dana Laci dan Dana Bebas, dengan aturan ketat agar tidak terjadi minus. 

ATURAN:
1. Dana Laci
   - Saldo fisik saat ini tercatat di sistem: Rp${currentLaci}
   - Saldo awal setiap hari: Rp500.000.
   - Transaksi Fiktif (Non-Tunai) hari ini: Rp${todayFiktif}
   - Omzet hari ini (Saldo Laci + Fiktif): Rp${todayOmzet}
   - Sumber pemasukan: penjualan tunai, bon, piutang, dll.
   - Pengeluaran yg diizinkan: harian kecil (parkir, konsumsi).
   - Saat tutup toko / tutup buku harian: yang termigrasi ke Dana Bebas adalah Omzet dikurangi Rp500.000 (modal laci besok), bukan Dana Laci saja seperti sebelumnya. Formula: Setoran = (Saldo Laci + Fiktif) - Rp500.000. Setelah migrasi, Dana Laci harus disisakan tepat Rp500.000 (modal laci besok).
   - Dilarang bayar gaji, supplier, atau prive dari Dana Laci.

2. Dana Bebas
   - Saldo saat ini tercatat di sistem: Rp${currentBebas}
   - Sumber pemasukan: Setoran / Migrasi Laci.
   - Pengeluaran prioritas: operasional bulanan, gaji, supplier. Terakhir Prive. Prive hanya diizinkan jika saldo aman.
   - Tidak boleh minus! Beri peringatan keras jika akan minus.

NADA KOMUNIKASI: Ramah, tegas, sebutkan saldo, Bahasa Indonesia.

TUGAS KHUSUS AKSI SISTEM:
Jika kamu MENYETUJUI sebuah transaksi pengeluaran (parkir, prive, gaji), kamu WAJIB menyisipkan baris perintah TERSEMBUNYI di akhir jawabanmu dengan format persis seperti ini (tanpa spasi ekstra, gunakan kurung siku, WAJIB BARIS BARU):
[AKSI_SISTEM: PENGELUARAN_LACI = <NOMINAL>]
contoh: [AKSI_SISTEM: PENGELUARAN_LACI = 5000]

[AKSI_SISTEM: PENGELUARAN_BEBAS = <NOMINAL>]
contoh: [AKSI_SISTEM: PENGELUARAN_BEBAS = 500000]

Jika melakukan Setoran/Tutup Toko, sisipkan:
[AKSI_SISTEM: SETOR_KE_BEBAS = <NOMINAL_YANG_DISETOR>]
*(Dimana <NOMINAL_YANG_DISETOR> adalah Omzet minus 500000)*

Jangan berikan tag [AKSI_SISTEM] jika pengguna hanya bertanya atau jika kamu MENOLAK transaksinya!
        `;

        try {
            const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'AI'}: ${m.text}`).join('\n');
            const fullPrompt = `History Chat:\n${chatHistory}\n\nUser Saat Ini: ${userMsg}`;

            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: fullPrompt, systemInstruction: systemPrompt })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'API Error');
            
            let aiText = data.text;
            let actionProcessed = false;

            // Parser for system actions
            const laciMatch = aiText.match(/\[AKSI_SISTEM:\s*PENGELUARAN_LACI\s*=\s*(\d+)\]/i);
            if (laciMatch) {
                const amount = parseInt(laciMatch[1]);
                setWallets((prev: any) => ({...prev, danaLaci: prev.danaLaci - amount}));
                addLog('AI_CASHFLOW', `Pengeluaran Laci otomatis Rp ${amount}`);
                aiText = aiText.replace(laciMatch[0], '');
                actionProcessed = true;
            }

            const bebasMatch = aiText.match(/\[AKSI_SISTEM:\s*PENGELUARAN_BEBAS\s*=\s*(\d+)\]/i);
            if (bebasMatch) {
                const amount = parseInt(bebasMatch[1]);
                setWallets((prev: any) => ({...prev, danaBebas: prev.danaBebas - amount}));
                addLog('AI_CASHFLOW', `Pengeluaran Bebas otomatis Rp ${amount}`);
                aiText = aiText.replace(bebasMatch[0], '');
                actionProcessed = true;
            }

            const setorMatch = aiText.match(/\[AKSI_SISTEM:\s*SETOR_KE_BEBAS\s*=\s*(\d+)\]/i);
            if (setorMatch) {
                const amount = parseInt(setorMatch[1]);
                setWallets((prev: any) => ({
                    ...prev, 
                    danaLaci: 500000, 
                    danaBebas: (prev?.danaBebas || 0) + amount
                }));
                addLog('AI_CASHFLOW', `Tutup toko / Setor ke Dana Bebas Rp ${amount}`);
                aiText = aiText.replace(setorMatch[0], '');
                actionProcessed = true;
            }

            setMessages(prev => [...prev, { role: 'model', text: aiText.trim() }]);

        } catch (error: any) {
            console.warn("AI Cashflow Bot Error:", error.message);
            setMessages(prev => [...prev, { role: 'model', text: 'Maaf, terjadi kesalahan: ' + (error.message || 'sistem AI sedang sibuk. Silakan coba lagi.') }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 border border-gray-400">
            <div className="bg-blue-900 border-b-2 border-gray-400 p-3 text-white flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    <span className="font-bold text-sm tracking-wide">AI CASHFLOW ASSISTANT</span>
                </div>
                <div className="flex gap-4 text-xs font-medium">
                    <span className="bg-emerald-700 px-2 py-1 border border-emerald-900 shadow-inner">Laci: {formatRp(wallets?.danaLaci || 0)}</span>
                    <span className="bg-indigo-700 px-2 py-1 border border-indigo-900 shadow-inner">Bebas: {formatRp(wallets?.danaBebas || 0)}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] p-3 text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-white border text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border p-3 flex items-center gap-2 shadow-sm">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                            <span className="text-xs text-gray-500">AI sedang memproses...</span>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <div className="p-3 bg-gray-100 border-t border-gray-300">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ketik pengeluaran, setoran tutup toko, dll..."
                        className="flex-1 p-2 border border-gray-400 text-sm outline-none focus:border-blue-500 focus:bg-blue-50 transition-colors"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        className="bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 disabled:opacity-50 border border-blue-900 shadow font-bold text-sm"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};
