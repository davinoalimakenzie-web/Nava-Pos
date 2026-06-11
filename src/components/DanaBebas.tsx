import React, { useState } from 'react';
import { Landmark, ArrowRight, UserCheck, ShieldAlert, CheckCircle2, CircleDollarSign, ArrowDownToLine, ReceiptText } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const DanaBebas = ({ currentTime, headless = false }: { currentTime?: Date; headless?: boolean }) => {
  const {
    wallets,
    setWallets,
    expenses,
    setExpenses,
    hutangSupplier,
    setHutangSupplier,
    employees,
    addLog,
    user,
    storeSettings,
    transactionDate,
    transactions
  } = useAppContext();

  // Core wallets calculations
  const saldoDanaLaci = wallets?.danaLaci || 0;
  const saldoDanaBebas = wallets?.danaBebas || 0;
  const listHutangAktif = (hutangSupplier || []).filter((h: any) => h.sisa_hutang > 0);
  const totalHutangSupplier = listHutangAktif.reduce((sum: number, h: any) => sum + h.sisa_hutang, 0);

  // Daily summary stats calculations
  const targetDateStr = transactionDate || new Date().toISOString().split('T')[0];

  const harianTransactions = (transactions || []).filter((t: any) => {
    if (t.type === 'PEMBELIAN') return false;
    if (t.date && t.date.startsWith(targetDateStr)) return true;
    
    const tDate = new Date(t.isoDate || t.date || new Date().toISOString());
    const [y, m, d] = targetDateStr.split('-');
    const compDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    tDate.setHours(0,0,0,0);
    compDate.setHours(0,0,0,0);
    return tDate.getTime() === compDate.getTime();
  });

  const harianExpenses = (expenses || []).filter((e: any) => {
    if (e.date && e.date.startsWith(targetDateStr)) return true;
    
    const eDate = new Date(e.isoDate || e.date || new Date().toISOString());
    const [y, m, d] = targetDateStr.split('-');
    const compDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
    eDate.setHours(0,0,0,0);
    compDate.setHours(0,0,0,0);
    return eDate.getTime() === compDate.getTime();
  });

  const returTunaiTotal = harianTransactions.filter((t: any) => t.method === 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const returNonTunaiTotal = harianTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const totalReturHarianVal = returTunaiTotal + returNonTunaiTotal;

  const piutangNonTunaiHarianVal = harianTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0);

  const outBulananVal = (expenses || []).filter((e: any) => {
    if (e.wallet !== 'Dana Bebas' && e.name !== 'Setoran Tunai' && !e.name?.includes('Pelunasan') && !e.name?.includes('Gaji') && !e.name?.includes('Prive')) {
        // Only include expenses from Dana Bebas. Let's strictly check wallet.
        if (e.wallet !== 'Dana Bebas') return false; 
    }
    if (e.wallet !== 'Dana Bebas') return false; // Strict check
    
    // Check if current month
    const eDate = new Date(e.isoDate || e.date || new Date().toISOString());
    const targetDate = new Date(); // or use targetDateStr ? Bulanan means current month. I will use the month of targetDateStr.
    const [y, m, d] = targetDateStr.split('-');
    
    return eDate.getMonth() === (parseInt(m) - 1) && eDate.getFullYear() === parseInt(y);
  }).reduce((sum: number, e: any) => sum + (e.amount > 0 ? e.amount : 0), 0);
  
  const pengeluaranHarianVal = harianExpenses.filter((e: any) => e.amount > 0).reduce((sum: number, e: any) => sum + e.amount, 0) + returTunaiTotal;

  // Active sub-control state inside the Dana Bebas panel
  const [activeControl, setActiveControl] = useState<'tarik' | 'pelunasan_supplier' | 'gaji' | 'prive'>('tarik');

  // Success / error message state
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Tarik Dana Bebas Form States
  const [tarikNominal, setTarikNominal] = useState('');
  const [tarikDest, setTarikDest] = useState<'laci' | 'tunai'>('laci');
  const [tarikNotes, setTarikNotes] = useState('');

  // 2. Pelunasan Supplier Form States
  const [selectedHutangId, setSelectedHutangId] = useState('');
  const [pelunasanAmount, setPelunasanAmount] = useState('');
  const [pelunasanType, setPelunasanType] = useState<'full' | 'partial'>('full');

  // 3. Gaji Karyawan Form States
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [gajiAmount, setGajiAmount] = useState('');
  const [gajiNotes, setGajiNotes] = useState('');

  // 4. Prive Owner Form States
  const [priveAmount, setPriveAmount] = useState('');
  const [priveNotes, setPriveNotes] = useState('');

  const formatRp = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    if (type === 'success') {
      setSuccessMsg(msg);
      setErrorMsg('');
      setTimeout(() => setSuccessMsg(''), 5000);
    } else {
      setErrorMsg(msg);
      setSuccessMsg('');
      setTimeout(() => setErrorMsg(''), 5000);
    }
  };

  // Helper inside form to handle input sanitization
  const parseInputNumber = (str: string) => {
    return parseInt(str.replace(/\D/g, '') || '0');
  };

  // Flow 1: Tarik Dana Bebas
  const handleTarikDanaBebas = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInputNumber(tarikNominal);
    if (!nominal || nominal <= 0) {
      showToast('error', 'Masukkan jumlah penarikan nominal yang valid!');
      return;
    }
    if (nominal > saldoDanaBebas) {
      showToast('error', 'Dana Bebas tidak mencukupi untuk melakukan penarikan ini!');
      return;
    }

    const tDate = transactionDate || new Date().toISOString().split('T')[0];
    const newExpense = {
      id: 'EXP-' + Date.now(),
      date: `${tDate} ${new Date().toLocaleTimeString('id-ID')}`,
      isoDate: new Date().toISOString(),
      name: `Tarik Dana Bebas: ${tarikDest === 'laci' ? 'Ke Dana Laci' : 'Tunai Umum'}${tarikNotes ? ' (' + tarikNotes + ')' : ''}`,
      amount: nominal,
      cashier: user?.name || 'Owner',
      branch: user?.branch || storeSettings?.activeBranch || 'Pusat',
      wallet: 'Dana Bebas',
      category: 'Tarik Dana Bebas'
    };

    // Update wallet
    setWallets((prev: any) => {
      const updated = { ...prev };
      updated.danaBebas = (prev?.danaBebas || 0) - nominal;
      if (tarikDest === 'laci') {
        updated.danaLaci = (prev?.danaLaci || 0) + nominal;
      }
      return updated;
    });

    // Add expense
    setExpenses([newExpense, ...expenses]);

    // Log action
    addLog('DANA_BEBAS', `Tarik Dana Bebas Rp ${nominal.toLocaleString('id-ID')} (${tarikDest === 'laci' ? 'ke laci kasir' : 'tunai umum'})`);

    setTarikNominal('');
    setTarikNotes('');
    showToast('success', `Berhasil menarik ${formatRp(nominal)} dari Dana Bebas!`);
  };

  // Flow 2: Pelunasan Supplier
  const handlePelunasanSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHutangId) {
      showToast('error', 'Pilih salah satu hutang supplier yang ingin dilunasi!');
      return;
    }

    const targetHutang = listHutangAktif.find((h: any) => h.id === selectedHutangId);
    if (!targetHutang) {
      showToast('error', 'Hutang supplier tidak ditemukan!');
      return;
    }

    let amt = 0;
    if (pelunasanType === 'full') {
      amt = targetHutang.sisa_hutang;
    } else {
      amt = parseInputNumber(pelunasanAmount);
    }

    if (!amt || amt <= 0) {
      showToast('error', 'Masukkan jumlah nominal pelunasan yang valid!');
      return;
    }

    if (amt > targetHutang.sisa_hutang) {
      showToast('error', `Nominal melebihi sisa hutang (${formatRp(targetHutang.sisa_hutang)})!`);
      return;
    }

    if (amt > saldoDanaBebas) {
      showToast('error', 'Dana Bebas tidak mencukupi untuk pembayaran supplier ini!');
      return;
    }

    const tDate = transactionDate || new Date().toISOString().split('T')[0];
    const newExpense = {
      id: 'EXP-' + Date.now(),
      date: `${tDate} ${new Date().toLocaleTimeString('id-ID')}`,
      isoDate: new Date().toISOString(),
      name: `Pelunasan Supplier: ${targetHutang.supplier_name} (${targetHutang.id})`,
      amount: amt,
      cashier: user?.name || 'Owner',
      branch: user?.branch || storeSettings?.activeBranch || 'Pusat',
      wallet: 'Dana Bebas',
      category: 'Pelunasan Supplier'
    };

    // Update Hutang Supplier state
    setHutangSupplier((prevArr: any[]) => {
      return prevArr.map((h: any) => {
        if (h.id === selectedHutangId) {
          const newSisa = h.sisa_hutang - amt;
          return {
            ...h,
            sisa_hutang: newSisa,
            status: newSisa <= 0 ? 'lunas' : 'belum_lunas'
          };
        }
        return h;
      });
    });

    // Update wallet
    setWallets((prev: any) => ({
      ...prev,
      danaBebas: (prev?.danaBebas || 0) - amt
    }));

    // Add expense record
    setExpenses([newExpense, ...expenses]);

    // Log action
    addLog('DANA_BEBAS', `Pelunasan supplier ${targetHutang.supplier_name} sebesar Rp ${amt.toLocaleString('id-ID')} menggunakan Dana Bebas`);

    setSelectedHutangId('');
    setPelunasanAmount('');
    showToast('success', `Berhasil membayar supplier ${targetHutang.supplier_name} sebesar ${formatRp(amt)}!`);
  };

  // Flow 3: Gaji Karyawan
  const handleGajiKaryawan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployeeId) {
      showToast('error', 'Harap pilih karyawan yang menerima gaji!');
      return;
    }

    const emp = (employees || []).find((e: any) => String(e.id) === String(selectedEmployeeId));
    if (!emp) {
      showToast('error', 'Karyawan tidak ditemukan!');
      return;
    }

    const nominal = parseInputNumber(gajiAmount);
    if (!nominal || nominal <= 0) {
      showToast('error', 'Masukkan nominal gaji yang valid!');
      return;
    }

    if (nominal > saldoDanaBebas) {
      showToast('error', 'Dana Bebas tidak mencukupi untuk membayar gaji karyawan!');
      return;
    }

    const tDate = transactionDate || new Date().toISOString().split('T')[0];
    const newExpense = {
      id: 'EXP-' + Date.now(),
      date: `${tDate} ${new Date().toLocaleTimeString('id-ID')}`,
      isoDate: new Date().toISOString(),
      name: `Gaji Karyawan: ${emp.name} (${gajiNotes || 'Pembayaran Gaji'})`,
      amount: nominal,
      cashier: user?.name || 'Owner',
      branch: user?.branch || storeSettings?.activeBranch || 'Pusat',
      wallet: 'Dana Bebas',
      category: 'Gaji Karyawan'
    };

    // Update wallet
    setWallets((prev: any) => ({
      ...prev,
      danaBebas: (prev?.danaBebas || 0) - nominal
    }));

    // Record expense
    setExpenses([newExpense, ...expenses]);

    // Log action
    addLog('DANA_BEBAS', `Bayar gaji karyawan ${emp.name} sebesar Rp ${nominal.toLocaleString('id-ID')} dari Dana Bebas`);

    setSelectedEmployeeId('');
    setGajiAmount('');
    setGajiNotes('');
    showToast('success', `Berhasil mengirimkan gaji ke ${emp.name} sebesar ${formatRp(nominal)}!`);
  };

  // Flow 4: Prive Owner
  const handlePriveOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInputNumber(priveAmount);
    if (!nominal || nominal <= 0) {
      showToast('error', 'Masukkan nominal penarikan prive yang valid!');
      return;
    }

    if (nominal > saldoDanaBebas) {
      showToast('error', 'Dana Bebas tidak mencukupi untuk penarikan prive owner!');
      return;
    }

    const tDate = transactionDate || new Date().toISOString().split('T')[0];
    const newExpense = {
      id: 'EXP-' + Date.now(),
      date: `${tDate} ${new Date().toLocaleTimeString('id-ID')}`,
      isoDate: new Date().toISOString(),
      name: `Prive Owner: Drawing Owner${priveNotes ? ' (' + priveNotes + ')' : ''}`,
      amount: nominal,
      cashier: user?.name || 'Owner',
      branch: user?.branch || storeSettings?.activeBranch || 'Pusat',
      wallet: 'Dana Bebas',
      category: 'Prive Owner'
    };

    // Update wallet
    setWallets((prev: any) => ({
      ...prev,
      danaBebas: (prev?.danaBebas || 0) - nominal
    }));

    // Record expense
    setExpenses([newExpense, ...expenses]);

    // Log action
    addLog('DANA_BEBAS', `Penarikan Prive Owner sebesar Rp ${nominal.toLocaleString('id-ID')} menggunakan Dana Bebas`);

    setPriveAmount('');
    setPriveNotes('');
    showToast('success', `Berhasil memproses Prive Owner sebesar ${formatRp(nominal)}!`);
  };

  const selectedHutangItem = listHutangAktif.find((h: any) => h.id === selectedHutangId);

  return (
    <div className={`flex-1 flex flex-col bg-[#ece9d8] text-black h-full overflow-hidden font-sans ${headless ? '' : 'border border-gray-400'}`}>
      {/* Visual Window Header */}
      {!headless && (
        <div className="bg-[#1e2b6b] text-white font-bold text-xs px-3 py-2 flex items-center justify-between border-b shadow-sm shrink-0">
          <span className="flex items-center gap-1.5 uppercase font-black tracking-wide">
            💰 PENGENDALIAN DANA BEBAS (FINANCIAL CONTROL)
          </span>
          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold">
            {currentTime ? currentTime.toLocaleTimeString('id-ID') : new Date().toLocaleTimeString('id-ID')}
          </div>
        </div>
      )}

      {/* Main Container Scrollable Area */}
      <div className={`flex flex-col overflow-y-auto h-full ${headless ? 'p-0 gap-0' : 'p-2.5 gap-2.5'}`}>

        {/* FEEDBACK STATUS BANNER */}
        {successMsg && (
          <div className={`bg-green-100 border border-green-400 text-green-900 px-4 py-2 flex items-center gap-2 font-bold animate-pulse ${headless ? 'm-2 rounded-sm' : 'rounded shadow-sm'}`}>
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-xs font-bold leading-tight uppercase">{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className={`bg-red-100 border border-red-400 text-red-900 px-4 py-2 flex items-center gap-2 font-bold animate-pulse ${headless ? 'm-2 rounded-sm' : 'rounded shadow-sm'}`}>
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-xs font-bold leading-tight uppercase">{errorMsg}</span>
          </div>
        )}

        {/* FINANCIAL SUMMARY HIGHLIGHT CARDS (AS REQUESTED IN GAMBAR 2) */}
        {!headless && (
          <div className="flex shrink-0 overflow-x-auto select-none border border-gray-400 bg-white rounded-sm divide-x divide-gray-300 shadow-sm">
            <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Dana Bebas</p>
              <div className="text-[14px] font-black text-blue-900">{formatRp(saldoDanaBebas)}</div>
            </div>
            <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Dana Laci</p>
              <div className="text-[14px] font-black text-gray-800">{formatRp(saldoDanaLaci)}</div>
            </div>
            <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Total Retur (Harian)</p>
              <div className="text-[14px] font-black text-red-600">{formatRp(totalReturHarianVal)}</div>
            </div>
            <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Bulanan</p>
              <div className="text-[14px] font-black text-orange-600">{formatRp(outBulananVal)}</div>
            </div>
            <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Harian</p>
              <div className="text-[14px] font-black text-black">{formatRp(pengeluaranHarianVal)}</div>
            </div>
          </div>
        )}

        {/* OPERATIONS TABS NAVIGATION */}
        <div className={`flex flex-wrap gap-1 ${headless ? 'bg-[#ece9d8] px-2 pt-1 border-b border-gray-400' : 'border-b border-gray-300 mt-1'}`}>
          <button
            onClick={() => setActiveControl('tarik')}
            className={`px-3 py-1.5 text-[11px] font-bold transition-all uppercase outline-none ${activeControl === 'tarik' ? 'bg-[#1e2b6b] text-white rounded-t border-t border-x border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            💸 Tarik Dana Bebas
          </button>
          <button
            onClick={() => setActiveControl('pelunasan_supplier')}
            className={`px-3 py-1.5 text-[11px] font-bold transition-all uppercase outline-none ${activeControl === 'pelunasan_supplier' ? 'bg-[#1e2b6b] text-white rounded-t border-t border-x border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            🤝 Pelunasan Supplier
          </button>
          <button
            onClick={() => setActiveControl('gaji')}
            className={`px-3 py-1.5 text-[11px] font-bold transition-all uppercase outline-none ${activeControl === 'gaji' ? 'bg-[#1e2b6b] text-white rounded-t border-t border-x border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            👷 Gaji Karyawan
          </button>
          <button
            onClick={() => setActiveControl('prive')}
            className={`px-3 py-1.5 text-[11px] font-bold transition-all uppercase outline-none ${activeControl === 'prive' ? 'bg-[#1e2b6b] text-white rounded-t border-t border-x border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            👤 Prive Owner
          </button>
        </div>

        {/* TAB ACTIVE PANEL CONTENT */}
        <div className={`bg-white p-3.5 ${headless ? 'border-b border-gray-400 shadow-sm' : 'border border-gray-300 rounded-b shadow-sm'}`}>
          {activeControl === 'tarik' && (
            <form onSubmit={handleTarikDanaBebas} className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                <span className="font-bold text-xs text-blue-900 flex items-center gap-1">
                   <ArrowDownToLine className="w-4 h-4" />
                   MODUL TARIK DANA BEBAS
                </span>
                <span className="text-[10px] text-gray-500">Mencairkan nominal dari cadangan Dana Bebas</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="flex flex-col gap-1 md:col-span-3">
                  <label className="text-[10px] font-bold text-gray-700">NOMINAL PENARIKAN (RP) :</label>
                  <input
                    type="text"
                    required
                    value={tarikNominal}
                    onChange={(e) => {
                      const num = parseInputNumber(e.target.value);
                      setTarikNominal(num ? num.toLocaleString('id-ID') : '');
                    }}
                    className="border border-gray-400 px-2 py-1.5 rounded-sm text-xs text-black font-mono font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                    placeholder="Contoh: 1.000.000"
                  />
                </div>

                <div className="flex flex-col gap-1 md:col-span-3">
                  <label className="text-[10px] font-bold text-gray-700">TEMPAT TUJUAN ALIRAN DANA :</label>
                  <select
                    value={tarikDest}
                    onChange={(e) => setTarikDest(e.target.value as 'laci' | 'tunai')}
                    className="border border-gray-400 px-2 py-1 rounded-sm text-[11px] text-black font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                  >
                    <option value="laci">DANA LACI KASIR (MASUK LACI)</option>
                    <option value="tunai">PENGELUARAN TUNAI (OUT LACI)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 md:col-span-4">
                  <label className="text-[10px] font-bold text-gray-700">CATATAN / KEPERLUAN PENARIKAN :</label>
                  <input
                    type="text"
                    value={tarikNotes}
                    onChange={(e) => setTarikNotes(e.target.value)}
                    className="border border-gray-400 px-2 py-1.5 rounded-sm text-xs text-black focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                    placeholder="Opsional: belanja atk, bensin, dsb..."
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1e2b6b] hover:bg-blue-800 text-white font-bold h-[32px] rounded-sm text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm uppercase active:translate-y-px"
                  >
                    PROSES DANA
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeControl === 'pelunasan_supplier' && (
            <form onSubmit={handlePelunasanSupplier} className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                <span className="font-bold text-xs text-amber-800 flex items-center gap-1">
                   <UserCheck className="w-4 h-4" />
                   MODUL PELUNASAN HUTANG SUPPLIER
                </span>
                <span className="text-[10px] text-gray-500">Membayar tagihan hutang supplier</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="flex flex-col gap-1 md:col-span-4">
                  <label className="text-[10px] font-bold text-gray-700">PILIH HUTANG SUPPLIER AKTIF :</label>
                  {listHutangAktif.length === 0 ? (
                    <div className="text-[11px] px-2 py-1 border border-dashed rounded bg-amber-50 text-amber-800 font-bold h-[32px] flex items-center">
                      Tidak ada hutang supplier aktif.
                    </div>
                  ) : (
                    <select
                      value={selectedHutangId}
                      onChange={(e) => {
                        setSelectedHutangId(e.target.value);
                        setPelunasanAmount('');
                      }}
                      className="border border-gray-400 px-2 py-1 rounded-sm text-xs text-black font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                    >
                      <option value="">-- PILIH TRANSAKSI HUTANG --</option>
                      {listHutangAktif.map((h: any) => (
                        <option key={h.id} value={h.id}>
                          {h.id} - {h.supplier_name} [Sisa: {formatRp(h.sisa_hutang)}]
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {selectedHutangItem && (
                  <div className="bg-amber-50 border border-amber-300 p-1.5 rounded-sm text-[10px] md:col-span-3 h-[32px] flex items-center justify-between">
                    <span className="font-medium text-gray-600 pr-1">Sisa:</span>
                    <span className="font-bold text-red-700 text-xs">{formatRp(selectedHutangItem.sisa_hutang)}</span>
                  </div>
                )}

                {selectedHutangItem && (
                  <div className="flex flex-col gap-1 md:col-span-3">
                    <label className="text-[10px] font-bold text-gray-700">METODE PEMBAYARAN :</label>
                    <div className="flex items-center gap-3 h-[32px]">
                      <label className="flex items-center gap-1 text-[10px] font-bold text-black cursor-pointer">
                        <input
                          type="radio"
                          name="pelunasanType"
                          checked={pelunasanType === 'full'}
                          onChange={() => setPelunasanType('full')}
                          className="text-blue-900 focus:ring-blue-950 w-3 h-3"
                        />
                        Lunas
                      </label>
                      <label className="flex items-center gap-1 text-[10px] font-bold text-black cursor-pointer">
                        <input
                          type="radio"
                          name="pelunasanType"
                          checked={pelunasanType === 'partial'}
                          onChange={() => setPelunasanType('partial')}
                          className="text-blue-900 focus:ring-blue-950 w-3 h-3"
                        />
                        Cicil
                      </label>
                    </div>
                  </div>
                )}

                {selectedHutangItem && pelunasanType === 'partial' && (
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className="text-[10px] font-bold text-gray-700">NOMINAL (RP) :</label>
                    <input
                      type="text"
                      required
                      value={pelunasanAmount}
                      onChange={(e) => {
                        const num = parseInputNumber(e.target.value);
                        setPelunasanAmount(num ? num.toLocaleString('id-ID') : '');
                      }}
                      className="border border-gray-400 px-2 py-1.5 rounded-sm text-xs text-black font-mono font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                      placeholder="Contoh: 500.000"
                    />
                  </div>
                )}

                {selectedHutangItem && (
                  <div className={`flex justify-end ${pelunasanType === 'partial' ? 'md:col-span-12' : 'md:col-span-2'}`}>
                    <button
                      type="submit"
                      className="bg-amber-700 hover:bg-amber-800 text-white font-bold h-[32px] px-3 w-full rounded-sm text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm uppercase active:translate-y-px"
                    >
                      BAYAR HUTANG
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}

          {activeControl === 'gaji' && (
            <form onSubmit={handleGajiKaryawan} className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                <span className="font-bold text-xs text-emerald-800 flex items-center gap-1">
                   <UserCheck className="w-4 h-4" />
                   MODUL PEMBAYARAN GAJI KARYAWAN
                </span>
                <span className="text-[10px] text-gray-500">Membayarkan kompensasi bulanan atau gaji harian</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="flex flex-col gap-1 md:col-span-4">
                  <label className="text-[10px] font-bold text-gray-700">KARYAWAN PENERIMA GAJI :</label>
                  <select
                    value={selectedEmployeeId}
                    onChange={(e) => {
                      setSelectedEmployeeId(e.target.value);
                      const empItem = (employees || []).find((v: any) => String(v.id) === String(e.target.value));
                      if (empItem && empItem.dailySalary) {
                        setGajiAmount(empItem.dailySalary.toLocaleString('id-ID'));
                      } else {
                        setGajiAmount('');
                      }
                    }}
                    required
                    className="border border-gray-400 px-2 py-1 rounded-sm text-xs text-black font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                  >
                    <option value="">-- PILIH KARYAWAN --</option>
                    {(employees || []).map((emp: any) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.position || 'Staff'})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1 md:col-span-3">
                  <label className="text-[10px] font-bold text-gray-700">NOMINAL GAJI (RP) :</label>
                  <input
                    type="text"
                    required
                    value={gajiAmount}
                    onChange={(e) => {
                      const num = parseInputNumber(e.target.value);
                      setGajiAmount(num ? num.toLocaleString('id-ID') : '');
                    }}
                    className="border border-gray-400 px-2 py-1.5 rounded-sm text-xs text-black font-mono font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                    placeholder="Contoh: 1.500.000"
                  />
                </div>

                <div className="flex flex-col gap-1 md:col-span-3">
                  <label className="text-[10px] font-bold text-gray-700">CATATAN / PERIODE GAJI :</label>
                  <input
                    type="text"
                    value={gajiNotes}
                    onChange={(e) => setGajiNotes(e.target.value)}
                    className="border border-gray-400 px-2 py-1.5 rounded-sm text-xs text-black focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                    placeholder="Contoh: Gaji Juni 2026"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold h-[32px] rounded-sm text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm uppercase active:translate-y-px"
                  >
                    BAYAR GAJI
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeControl === 'prive' && (
            <form onSubmit={handlePriveOwner} className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                <span className="font-bold text-xs text-purple-800 flex items-center gap-1">
                   <CircleDollarSign className="w-4 h-4" />
                   MODUL PRIVE / OWNER DRAWINGS
                </span>
                <span className="text-[10px] text-gray-500">Mencatat penarikan kas owner</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="flex flex-col gap-1 md:col-span-4">
                  <label className="text-[10px] font-bold text-gray-700">NOMINAL PRIVE OWNER (RP) :</label>
                  <input
                    type="text"
                    required
                    value={priveAmount}
                    onChange={(e) => {
                      const num = parseInputNumber(e.target.value);
                      setPriveAmount(num ? num.toLocaleString('id-ID') : '');
                    }}
                    className="border border-gray-400 px-2 py-1.5 rounded-sm text-xs text-black font-mono font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                    placeholder="Contoh: 5.000.000"
                  />
                </div>

                <div className="flex flex-col gap-1 md:col-span-6">
                  <label className="text-[10px] font-bold text-gray-700">DISKLAMER ALASAN / CATATAN :</label>
                  <input
                    type="text"
                    value={priveNotes}
                    onChange={(e) => setPriveNotes(e.target.value)}
                    className="border border-gray-400 px-2 py-1.5 rounded-sm text-xs text-black focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                    placeholder="Contoh: Prive Rutin Pribadi Owner"
                  />
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-purple-900 hover:bg-purple-800 text-white font-bold h-[32px] rounded-sm text-[11px] flex items-center justify-center gap-1 transition-colors shadow-sm uppercase active:translate-y-px"
                  >
                    PROSES PRIVE
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
