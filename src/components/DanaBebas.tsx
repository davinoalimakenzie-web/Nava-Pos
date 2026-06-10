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
      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-full">

        {/* FEEDBACK STATUS BANNER */}
        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-900 rounded px-4 py-2 flex items-center gap-2 shadow-sm font-bold animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span className="text-xs font-bold leading-tight uppercase">{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-900 rounded px-4 py-2 flex items-center gap-2 shadow-sm font-bold animate-pulse">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <span className="text-xs font-bold leading-tight uppercase">{errorMsg}</span>
          </div>
        )}

        {/* FINANCIAL SUMMARY HIGHLIGHT CARDS (AS REQUESTED IN GAMBAR 2) */}
        <div className="flex gap-[2px] shrink-0 overflow-x-auto select-none">
          <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm min-w-[124px]">
            <p className="text-gray-800 font-bold mb-1 text-[13px] whitespace-nowrap">Dana Bebas</p>
            <div className="text-[15px] font-bold text-black">{formatRp(saldoDanaBebas)}</div>
          </div>
          <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm min-w-[124px]">
            <p className="text-gray-800 font-bold mb-1 text-[13px] whitespace-nowrap">Dana Laci</p>
            <div className="text-[15px] font-bold text-black">{formatRp(saldoDanaLaci)}</div>
          </div>
          <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm min-w-[124px]">
            <p className="text-gray-800 font-bold mb-1 text-[13px] whitespace-nowrap">Total Retur (Harian)</p>
            <div className="text-[15px] font-bold text-black">{formatRp(totalReturHarianVal)}</div>
          </div>
          <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm min-w-[124px]">
            <p className="text-gray-800 font-bold mb-1 text-[13px] whitespace-nowrap">Piutang/Non-Tunai (Harian)</p>
            <div className="text-[15px] font-bold text-black">{formatRp(piutangNonTunaiHarianVal)}</div>
          </div>
          <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm min-w-[124px]">
            <p className="text-gray-800 font-bold mb-1 text-[13px] whitespace-nowrap">Pengeluaran (-) Harian</p>
            <div className="text-[15px] font-bold text-black">{formatRp(pengeluaranHarianVal)}</div>
          </div>
        </div>

        {/* OPERATIONS TABS NAVIGATION */}
        <div className="flex flex-wrap border-b-2 border-gray-300 gap-1 mt-2">
          <button
            onClick={() => setActiveControl('tarik')}
            className={`px-4 py-2 text-xs font-bold transition-colors uppercase outline-none ${activeControl === 'tarik' ? 'bg-[#1e2b6b] text-white rounded-t-md border-t-2 border-x-2 border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            💸 Tarik Dana Bebas
          </button>
          <button
            onClick={() => setActiveControl('pelunasan_supplier')}
            className={`px-4 py-2 text-xs font-bold transition-colors uppercase outline-none ${activeControl === 'pelunasan_supplier' ? 'bg-[#1e2b6b] text-white rounded-t-md border-t-2 border-x-2 border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            🤝 Pelunasan Supplier
          </button>
          <button
            onClick={() => setActiveControl('gaji')}
            className={`px-4 py-2 text-xs font-bold transition-colors uppercase outline-none ${activeControl === 'gaji' ? 'bg-[#1e2b6b] text-white rounded-t-md border-t-2 border-x-2 border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            👷 Gaji Karyawan
          </button>
          <button
            onClick={() => setActiveControl('prive')}
            className={`px-4 py-2 text-xs font-bold transition-colors uppercase outline-none ${activeControl === 'prive' ? 'bg-[#1e2b6b] text-white rounded-t-md border-t-2 border-x-2 border-[#1e2b6b]' : 'bg-gray-200 border-x border-t border-gray-300 text-gray-700 hover:bg-gray-300'}`}
          >
            👤 Prive Owner
          </button>
        </div>

        {/* TAB ACTIVE PANEL CONTENT */}
        <div className="bg-white border-2 border-gray-300 rounded-b-lg p-5 shadow-inner">
          {activeControl === 'tarik' && (
            <form onSubmit={handleTarikDanaBebas} className="flex flex-col gap-4">
              <div className="border-b pb-2 mb-2">
                <h3 className="font-bold text-sm text-gray-800 flex items-center gap-1">
                   <ArrowDownToLine className="w-4 h-4 text-blue-900" />
                   MODUL TARIK DANA BEBAS
                </h3>
                <p className="text-[11px] text-gray-500">Mencairkan nominal dari cadangan Dana Bebas Anda ke Dana Laci kasir fisik atau pengeluaran tunai langsung.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-750">NOMINAL PENARIKAN (RP) :</label>
                  <input
                    type="text"
                    required
                    value={tarikNominal}
                    onChange={(e) => {
                      const num = parseInputNumber(e.target.value);
                      setTarikNominal(num ? num.toLocaleString('id-ID') : '');
                    }}
                    className="border-2 border-gray-300 px-3 py-2 rounded text-sm text-black font-mono font-bold focus:border-blue-900 outline-none shadow-inner"
                    placeholder="Contoh: 1.000.000"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-750">TEMPAT TUJUAN ALIRAN DANA :</label>
                  <select
                    value={tarikDest}
                    onChange={(e) => setTarikDest(e.target.value as 'laci' | 'tunai')}
                    className="border-2 border-gray-300 px-3 py-2 rounded text-xs text-black font-bold focus:border-blue-900 outline-none bg-white h-[38px]"
                  >
                    <option value="laci">DANA LACI KASIR (MENAMBAH SALDO TUNAI LACI)</option>
                    <option value="tunai">PENGELUARAN TUNAI UMUM / BEBAS (DILUAR LACI)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-750">CATATAN / KEPERLUAN PENARIKAN :</label>
                <textarea
                  value={tarikNotes}
                  onChange={(e) => setTarikNotes(e.target.value)}
                  className="border-2 border-gray-300 px-3 py-2 rounded text-xs text-black focus:border-blue-900 outline-none h-16 shadow-inner resize-none"
                  placeholder="Opsional: Misal penarikan rutin awal pekan, belanja atk darurat, dsb..."
                />
              </div>

              <div className="flex justify-end pt-3 border-t">
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  PROSES PENARIKAN DANA
                </button>
              </div>
            </form>
          )}

          {activeControl === 'pelunasan_supplier' && (
            <form onSubmit={handlePelunasanSupplier} className="flex flex-col gap-4">
              <div className="border-b pb-2 mb-2">
                <h3 className="font-bold text-sm text-gray-800 flex items-center gap-1">
                   <UserCheck className="w-4 h-4 text-amber-700" />
                   MODUL PELUNASAN HUTANG SUPPLIER
                </h3>
                <p className="text-[11px] text-gray-500">Membayar tagihan hutang aktif ke pihak pemasok/supplier menggunakan kas Dana Bebas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-750">PILIH HUTANG SUPPLIER AKTIF :</label>
                  {listHutangAktif.length === 0 ? (
                    <div className="text-sm p-3 border border-dashed rounded bg-amber-50 text-amber-800 font-bold">
                      Tidak ada hutang supplier aktif saat ini.
                    </div>
                  ) : (
                    <select
                      value={selectedHutangId}
                      onChange={(e) => {
                        setSelectedHutangId(e.target.value);
                        setPelunasanAmount('');
                      }}
                      className="border-2 border-gray-300 px-3 py-2 rounded text-xs text-black font-bold focus:border-blue-900 outline-none bg-white h-[38px]"
                    >
                      <option value="">-- PILIH TRANSAKSI HUTANG --</option>
                      {listHutangAktif.map((h: any) => (
                        <option key={h.id} value={h.id}>
                          {h.id} - {h.supplier_name} [Sisa: {formatRp(h.sisa_hutang)}] - JT: {h.jatuh_tempo.split('T')[0]}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {selectedHutangItem && (
                  <div className="bg-amber-50 border border-amber-300 p-3 rounded flex flex-col gap-1 text-[11px]">
                    <p className="font-bold text-amber-900 text-xs">RINCIAN DATA TAGIHAN SELECTED :</p>
                    <p><strong>ID Nota Hutang:</strong> {selectedHutangItem.id}</p>
                    <p><strong>Supplier:</strong> {selectedHutangItem.supplier_name}</p>
                    <p><strong>Total Pinjaman Awal:</strong> {formatRp(selectedHutangItem.nominal)}</p>
                    <p><strong>Sisa Hutang:</strong> <span className="font-bold text-red-700 text-sm">{formatRp(selectedHutangItem.sisa_hutang)}</span></p>
                    <p><strong>Jatuh Tempo:</strong> {selectedHutangItem.jatuh_tempo.split('T')[0]}</p>
                  </div>
                )}
              </div>

              {selectedHutangItem && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-750">METODE PEMBAYARAN :</label>
                      <div className="flex items-center gap-4 mt-1">
                        <label className="flex items-center gap-1.5 text-xs font-bold text-black cursor-pointer">
                          <input
                            type="radio"
                            name="pelunasanType"
                            checked={pelunasanType === 'full'}
                            onChange={() => setPelunasanType('full')}
                            className="text-blue-900 focus:ring-blue-950"
                          />
                          Bayar Lunas Langsung ({formatRp(selectedHutangItem.sisa_hutang)})
                        </label>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-black cursor-pointer">
                          <input
                            type="radio"
                            name="pelunasanType"
                            checked={pelunasanType === 'partial'}
                            onChange={() => setPelunasanType('partial')}
                            className="text-blue-900 focus:ring-blue-950"
                          />
                          Bayar Sebagian (Cicilan Manual)
                        </label>
                      </div>
                    </div>

                    {pelunasanType === 'partial' && (
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-gray-750">NOMINAL DICICIL / DIBAYAR (RP) :</label>
                        <input
                          type="text"
                          required
                          value={pelunasanAmount}
                          onChange={(e) => {
                            const num = parseInputNumber(e.target.value);
                            setPelunasanAmount(num ? num.toLocaleString('id-ID') : '');
                          }}
                          className="border-2 border-gray-300 px-3 py-2 rounded text-sm text-black font-mono font-bold focus:border-blue-900 outline-none shadow-inner"
                          placeholder="Masukkan nilai bayar msl: 500.000"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-3 border-t">
                    <button
                      type="submit"
                      className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-2.5 rounded text-xs flex items-center gap-1.5 transition-colors shadow"
                    >
                      PROSES PEMBAYARAN SUPPLIER
                    </button>
                  </div>
                </>
              )}
            </form>
          )}

          {activeControl === 'gaji' && (
            <form onSubmit={handleGajiKaryawan} className="flex flex-col gap-4">
              <div className="border-b pb-2 mb-2">
                <h3 className="font-bold text-sm text-gray-800 flex items-center gap-1">
                   <UserCheck className="w-4 h-4 text-emerald-800" />
                   MODUL PEMBAYARAN GAJI KARYAWAN
                </h3>
                <p className="text-[11px] text-gray-500">Membayarkan kompensasi bulanan atau gaji harian karyawan dari cadangan anggaran Dana Bebas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-750">PILIH KARYAWAN PENERIMA GAJI :</label>
                  <select
                    value={selectedEmployeeId}
                    onChange={(e) => {
                      setSelectedEmployeeId(e.target.value);
                      const empItem = (employees || []).find((v: any) => String(v.id) === String(e.target.value));
                      if (empItem && empItem.dailySalary) {
                        // set default recommendation based on salary config if exists
                        setGajiAmount(empItem.dailySalary.toLocaleString('id-ID'));
                      } else {
                        setGajiAmount('');
                      }
                    }}
                    required
                    className="border-2 border-gray-300 px-3 py-2 rounded text-xs text-black font-bold focus:border-blue-900 outline-none bg-white h-[38px]"
                  >
                    <option value="">-- PILIH KARYAWAN --</option>
                    {(employees || []).map((emp: any) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.position || 'Staff'}) [Cabang: {emp.branch || 'Pusat'}]
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-750">NOMINAL GAJI DIBAYAR (RP) :</label>
                  <input
                    type="text"
                    required
                    value={gajiAmount}
                    onChange={(e) => {
                      const num = parseInputNumber(e.target.value);
                      setGajiAmount(num ? num.toLocaleString('id-ID') : '');
                    }}
                    className="border-2 border-gray-300 px-3 py-2 rounded text-sm text-black font-mono font-bold focus:border-blue-900 outline-none shadow-inner"
                    placeholder="Contoh: 1.500.050"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-750">DESKRIPSI / PERIODE GAJI (CATATAN) :</label>
                <input
                  type="text"
                  value={gajiNotes}
                  onChange={(e) => setGajiNotes(e.target.value)}
                  className="border-2 border-gray-300 px-3 py-2 rounded text-xs text-black focus:border-blue-900 outline-none shadow-inner"
                  placeholder="Contoh: Pembayaran Gaji Karyawan Bulan Juni 2026 atau Gaji Harian Bonus Lembur"
                />
              </div>

              <div className="flex justify-end pt-3 border-t">
                <button
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  PROSES GAJI KARYAWAN
                </button>
              </div>
            </form>
          )}

          {activeControl === 'prive' && (
            <form onSubmit={handlePriveOwner} className="flex flex-col gap-4">
              <div className="border-b pb-2 mb-2">
                <h3 className="font-bold text-sm text-gray-800 flex items-center gap-1">
                   <CircleDollarSign className="w-4 h-4 text-purple-800" />
                   MODUL PRIVE / TARIK OWNER DRAWINGS
                </h3>
                <p className="text-[11px] text-gray-500">Mencatat penarikan kas modal/keuntungan (prive) untuk kebutuhan ekuitas pribadi pemilih toko (Owner).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-750">NOMINAL PRIVE OWNER (RP) :</label>
                  <input
                    type="text"
                    required
                    value={priveAmount}
                    onChange={(e) => {
                      const num = parseInputNumber(e.target.value);
                      setPriveAmount(num ? num.toLocaleString('id-ID') : '');
                    }}
                    className="border-2 border-gray-300 px-3 py-2 rounded text-sm text-black font-mono font-bold focus:border-blue-900 outline-none shadow-inner"
                    placeholder="Contoh: 15.000.000"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-750">KELUARAN ALASAN PRIVE / OPTIONAL NOTE :</label>
                  <input
                    type="text"
                    value={priveNotes}
                    onChange={(e) => setPriveNotes(e.target.value)}
                    className="border-2 border-gray-300 px-3 py-2 rounded text-xs text-black focus:border-blue-900 outline-none shadow-inner"
                    placeholder="Contoh: Prive Rutin Pribadi Owner"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t">
                <button
                  type="submit"
                  className="bg-purple-900 hover:bg-purple-800 text-white font-bold px-6 py-2.5 rounded text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  PROSES PRIVE OWNER
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
