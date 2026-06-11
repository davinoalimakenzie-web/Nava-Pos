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
    transactions,
    waitingPayments,
    setWaitingPayments
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

  // Monthly Calculations
  const [targetY, targetM, targetD] = targetDateStr.split('-');
  const monthlyTransactions = (transactions || []).filter((t: any) => {
    const tDate = new Date(t.timestamp || t.isoDate || new Date().toISOString());
    return tDate.getMonth() === (parseInt(targetM) - 1) && tDate.getFullYear() === parseInt(targetY);
  });
  const totalReturBulananVal = monthlyTransactions.reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const piutangNonTunaiBulananVal = monthlyTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0);

  const outBulananVal = (expenses || []).filter((e: any) => {
    if (e.wallet !== 'Dana Bebas' && e.name !== 'Setoran Tunai' && !e.name?.includes('Pelunasan') && !e.name?.includes('Gaji') && !e.name?.includes('Prive')) {
        // Only include expenses from Dana Bebas. Let's strictly check wallet.
        if (e.wallet !== 'Dana Bebas') return false; 
    }
    if (e.wallet !== 'Dana Bebas') return false; // Strict check
    
    // Check if current month
    const eDate = new Date(e.isoDate || e.date || new Date().toISOString());
    return eDate.getMonth() === (parseInt(targetM) - 1) && eDate.getFullYear() === parseInt(targetY);
  }).reduce((sum: number, e: any) => sum + (e.amount > 0 ? e.amount : 0), 0);
  
  const pengeluaranHarianVal = harianExpenses.filter((e: any) => e.amount > 0).reduce((sum: number, e: any) => sum + e.amount, 0);

  // Active sub-control state inside the Dana Bebas panel
  const [activeControl, setActiveControl] = useState<'tarik' | 'pelunasan_supplier' | 'gaji' | 'prive'>('tarik');

  // Success / error message state
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Tarik Dana Bebas Form States
  const [tarikNominal, setTarikNominal] = useState('');
  const [tarikDest, setTarikDest] = useState<'laci' | 'tunai' | 'suntik'>('laci');
  const [tarikNotes, setTarikNotes] = useState('');

  // Toggles for monthly views
  const [showMonthlyReturn, setShowMonthlyReturn] = useState(false);
  const [showMonthlyNonTunai, setShowMonthlyNonTunai] = useState(false);

  // 2. Pelunasan Supplier Form States
  const [selectedHutangId, setSelectedHutangId] = useState('');
  const [pelunasanAmount, setPelunasanAmount] = useState('');
  const [pelunasanType, setPelunasanType] = useState<'full' | 'partial'>('full');

  // 3. Gaji Karyawan (Waiting list bonuses)
  const [bonuses, setBonuses] = useState<{ [key: string]: string }>({});
  const [paymentDates, setPaymentDates] = useState<{ [key: string]: string }>({});
  const [paymentMethods, setPaymentMethods] = useState<{ [key: string]: 'Cash' | 'Transfer' }>({});

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

  // Flow 1: Tarik Dana Bebas / Suntik
  const handleTarikDanaBebas = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInputNumber(tarikNominal);
    if (!nominal || nominal <= 0) {
      showToast('error', 'Masukkan jumlah nominal yang valid!');
      return;
    }
    if (tarikDest !== 'suntik' && nominal > saldoDanaBebas) {
      showToast('error', 'Dana Bebas tidak mencukupi untuk melakukan penarikan ini!');
      return;
    }

    const tDate = transactionDate || new Date().toISOString().split('T')[0];
    const newExpense = {
      id: 'EXP-' + Date.now(),
      date: `${tDate} ${new Date().toLocaleTimeString('id-ID')}`,
      isoDate: new Date().toISOString(),
      name: tarikDest === 'suntik' ? `Suntik Dana Bebas${tarikNotes ? ' (' + tarikNotes + ')' : ''}` : `Tarik Dana Bebas: ${tarikDest === 'laci' ? 'Ke Dana Laci' : 'Tunai Umum'}${tarikNotes ? ' (' + tarikNotes + ')' : ''}`,
      amount: tarikDest === 'suntik' ? -nominal : nominal,
      cashier: user?.name || 'Owner',
      branch: user?.branch || storeSettings?.activeBranch || 'Pusat',
      wallet: 'Dana Bebas',
      category: tarikDest === 'suntik' ? 'Modal Masuk' : 'Tarik Dana Bebas'
    };

    // Update wallet
    setWallets((prev: any) => {
      const updated = { ...prev };
      if (tarikDest === 'suntik') {
        updated.danaBebas = (prev?.danaBebas || 0) + nominal;
      } else {
        updated.danaBebas = (prev?.danaBebas || 0) - nominal;
        if (tarikDest === 'laci') {
          updated.danaLaci = (prev?.danaLaci || 0) + nominal;
        }
      }
      return updated;
    });

    // Add expense
    setExpenses([newExpense, ...expenses]);

    // Log action
    if (tarikDest === 'suntik') {
      addLog('DANA_BEBAS', `Suntik Modal Dana Bebas Rp ${nominal.toLocaleString('id-ID')}`);
      showToast('success', `Berhasil menyekrupkan ${formatRp(nominal)} ke Dana Bebas!`);
    } else {
      addLog('DANA_BEBAS', `Tarik Dana Bebas Rp ${nominal.toLocaleString('id-ID')} (${tarikDest === 'laci' ? 'ke laci kasir' : 'tunai umum'})`);
      showToast('success', `Berhasil menarik ${formatRp(nominal)} dari Dana Bebas!`);
    }

    setTarikNominal('');
    setTarikNotes('');
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

  // Flow 3: Approve & Pay Salary waitlisted item
  const handleApproveSalary = (item: any) => {
    const rawBonus = bonuses[item.id] || '';
    const bonusVal = parseInt(rawBonus.replace(/\./g, '')) || 0;
    const totalTHP = item.salary + bonusVal;
    const payDate = paymentDates[item.id] || new Date().toISOString().split('T')[0];
    const payMethod = paymentMethods[item.id] || 'Cash';

    if (totalTHP > saldoDanaBebas) {
      showToast('error', 'Dana Bebas tidak mencukupi untuk melakukan pembayaran gaji ini!');
      return;
    }

    // 1. Deduct Dana Bebas
    setWallets((prev: any) => ({
      ...prev,
      danaBebas: (prev?.danaBebas || 0) - totalTHP
    }));

    // 2. Create and push new expense
    const newExpense = {
      id: 'EXP-GAJI-' + Date.now() + '-' + Math.floor(Math.random() * 100),
      date: `${payDate} ${new Date().toLocaleTimeString('id-ID')}`,
      isoDate: new Date().toISOString(),
      name: `Pembayaran Gaji Karyawan - ${item.name} (${item.details || ''})${bonusVal > 0 ? ' + Bonus (Rp ' + bonusVal.toLocaleString('id-ID') + ')' : ''} [${payMethod}]`,
      amount: totalTHP,
      cashier: user?.name || 'Owner',
      branch: user?.branch || storeSettings?.activeBranch || 'Pusat',
      wallet: 'Dana Bebas',
      category: 'Gaji Karyawan'
    };
    setExpenses([newExpense, ...expenses]);

    // 3. Add to app logs
    addLog('PENGGAJIAN', `Setujui & Bayar Gaji ${item.name} sebesar Rp ${totalTHP.toLocaleString('id-ID')} via ${payMethod} (Gaji: Rp ${item.salary.toLocaleString('id-ID')}, Bonus: Rp ${bonusVal.toLocaleString('id-ID')})`);

    // 4. Update the item in waiting payments to preserve as archive/report
    setWaitingPayments((prev: any[]) => {
      const arr = prev || [];
      return arr.map((p: any) => {
        if (p.id === item.id) {
          return {
            ...p,
            approved: true,
            approvedAt: new Date().toISOString(),
            approvedDate: payDate,
            approvedMethod: payMethod,
            approvedBonus: bonusVal,
            approvedTotal: totalTHP
          };
        }
        return p;
      });
    });

    // 5. Clean up local state
    setBonuses(prev => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });

    showToast('success', `Berhasil membayar gaji ${item.name} via ${payMethod} sebesar Rp ${totalTHP.toLocaleString('id-ID')}!`);
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

  // Histories for the archive tables
  const arsipTarikDana = expenses.filter((e: any) => e.wallet === 'Dana Bebas' && (e.category === 'Tarik Dana Bebas' || e.category === 'Modal Masuk'));
  const arsipPelunasan = expenses.filter((e: any) => e.wallet === 'Dana Bebas' && e.category === 'Pelunasan Supplier');
  const arsipPrive = expenses.filter((e: any) => e.wallet === 'Dana Bebas' && e.category === 'Prive Owner');

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
            <div 
              className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setShowMonthlyReturn(!showMonthlyReturn)}
            >
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
                {showMonthlyReturn ? 'Total Return (Bulan)' : 'Total Return (Harian)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
              </p>
              <div className="text-[14px] font-black text-red-600">{formatRp(showMonthlyReturn ? totalReturBulananVal : totalReturHarianVal)}</div>
            </div>
            
            <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Harian</p>
              <div className="text-[14px] font-black text-black">{formatRp(pengeluaranHarianVal)}</div>
            </div>
            <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Bulanan</p>
              <div className="text-[14px] font-black text-orange-600">{formatRp(outBulananVal)}</div>
            </div>
            <div 
              className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setShowMonthlyNonTunai(!showMonthlyNonTunai)}
            >
              <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
                {showMonthlyNonTunai ? 'Non Tunai (Bulan)' : 'Non Tunai (Harian)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
              </p>
              <div className="text-[14px] font-black text-orange-500">{formatRp(showMonthlyNonTunai ? piutangNonTunaiBulananVal : piutangNonTunaiHarianVal)}</div>
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
            👷 Daftar Tunggu Gaji Karyawan
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
            <div className="flex flex-col gap-4">
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
                    onChange={(e) => setTarikDest(e.target.value as 'laci' | 'tunai' | 'suntik')}
                    className="border border-gray-400 px-2 py-1 rounded-sm text-[11px] text-black font-bold focus:border-blue-900 outline-none bg-white h-[32px] w-full"
                  >
                    <option value="laci">DANA LACI KASIR (MASUK LACI)</option>
                    <option value="tunai">PENGELUARAN TUNAI (OUT LACI)</option>
                    <option value="suntik">SUNTIK DANA BEBAS (MODAL / OWNER)</option>
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

            {/* Arsip Table for Tarik Dana */}
            <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-2">
               <span className="text-[11px] font-bold text-gray-700 uppercase">Arsip Penarikan & Suntik Dana</span>
               {arsipTarikDana.length === 0 ? (
                  <div className="py-4 text-center text-gray-500 border border-dashed border-gray-300 bg-gray-50 rounded text-xs">
                     Belum ada arsip penarikan / suntik dana bebas.
                  </div>
               ) : (
                  <div className="overflow-x-auto border border-gray-300 rounded max-h-[300px]">
                    <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
                      <thead className="bg-gray-100 border-b border-gray-300 text-gray-700 font-bold">
                        <tr>
                          <th className="p-2 border-r border-gray-300">Waktu</th>
                          <th className="p-2 border-r border-gray-300">Deskripsi / Catatan</th>
                          <th className="p-2 border-r border-gray-300 text-center">Kategori</th>
                          <th className="p-2 text-right">Nominal (Rp)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {arsipTarikDana.slice(0, 50).map((item: any, idx: number) => (
                           <tr key={item.id || idx} className="hover:bg-gray-50 text-black">
                             <td className="p-2 border-r border-gray-300">{item.date}</td>
                             <td className="p-2 border-r border-gray-300">{item.name}</td>
                             <td className="p-2 border-r border-gray-300 text-center font-bold">
                               <span className={`px-2 py-0.5 rounded text-[10px] ${item.category === 'Modal Masuk' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{item.category}</span>
                             </td>
                             <td className={`p-2 text-right font-mono font-bold ${item.amount < 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.amount < 0 ? `+Rp ${Math.abs(item.amount).toLocaleString('id-ID')}` : `-Rp ${item.amount.toLocaleString('id-ID')}`}
                             </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               )}
            </div>
          </div>
          )}

          {activeControl === 'pelunasan_supplier' && (
            <div className="flex flex-col gap-4">
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

            {/* Arsip Table for Pelunasan Supplier */}
            <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-2">
               <span className="text-[11px] font-bold text-gray-700 uppercase">Arsip Pembayaran Hutang Supplier</span>
               {arsipPelunasan.length === 0 ? (
                  <div className="py-4 text-center text-gray-500 border border-dashed border-gray-300 bg-gray-50 rounded text-xs">
                     Belum ada arsip pembayaran hutang supplier.
                  </div>
               ) : (
                  <div className="overflow-x-auto border border-gray-300 rounded max-h-[300px]">
                    <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
                      <thead className="bg-amber-50 border-b border-gray-300 text-amber-900 font-bold">
                        <tr>
                          <th className="p-2 border-r border-gray-300">Waktu</th>
                          <th className="p-2 border-r border-gray-300">Deskripsi / Catatan</th>
                          <th className="p-2 text-right">Nominal Dibayar (Rp)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {arsipPelunasan.slice(0, 50).map((item: any, idx: number) => (
                           <tr key={item.id || idx} className="hover:bg-amber-50 text-black">
                             <td className="p-2 border-r border-gray-300">{item.date}</td>
                             <td className="p-2 border-r border-gray-300 font-bold text-amber-800">{item.name}</td>
                             <td className="p-2 text-right font-mono font-bold text-red-600">
                                -Rp {item.amount.toLocaleString('id-ID')}
                             </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               )}
            </div>
          </div>
          )}

          {activeControl === 'gaji' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                <span className="font-bold text-xs text-emerald-800 flex items-center gap-1 font-sans">
                   <UserCheck className="w-4 h-4" />
                   DAFTAR TUNGGU PEMBAYARAN GAJI KARYAWAN
                </span>
                <span className="text-[10px] text-gray-500">Kompensasi atau gaji yang diajukan dari absensi</span>
              </div>

              {(!waitingPayments || waitingPayments.length === 0) ? (
                <div className="py-8 text-center text-gray-500 border border-dashed border-gray-300 bg-gray-50 rounded text-xs">
                   Tidak ada daftar tunggu pembayaran gaji karyawan saat ini.
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-300 rounded">
                  <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
                    <thead className="bg-gray-100 border-b border-gray-300 text-gray-700 font-bold">
                      <tr>
                        <th className="p-2 border-r border-gray-300">Nama Karyawan</th>
                        <th className="p-2 border-r border-gray-300 text-center w-36">Tanggal Bayar</th>
                        <th className="p-2 border-r border-gray-300 text-center w-24">Metode</th>
                        <th className="p-2 border-r border-gray-300 text-right">Gaji Pokok</th>
                        <th className="p-2 border-r border-gray-300 text-center w-28">Bonus (Rp)</th>
                        <th className="p-2 border-r border-gray-300 text-right">Take Home Pay (THP)</th>
                        <th className="p-2 text-center w-28">Status / Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {waitingPayments.map((item: any) => {
                        const isApproved = !!item.approved;
                        const displayDate = isApproved 
                          ? (item.approvedDate || (item.createdAt ? item.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10))) 
                          : (paymentDates[item.id] || new Date().toISOString().substring(0, 10));
                        const displayMethod = isApproved 
                          ? (item.approvedMethod || 'Cash') 
                          : (paymentMethods[item.id] || 'Cash');
                        const displayBonus = isApproved 
                          ? (item.approvedBonus || 0) 
                          : (parseInputNumber(bonuses[item.id] || ''));
                        const displayTHP = isApproved 
                          ? (item.approvedTotal || (item.salary + displayBonus)) 
                          : (item.salary + displayBonus);

                        return (
                          <tr key={item.id} className={isApproved ? "bg-gray-50/70 text-gray-500" : "hover:bg-gray-50 text-black"}>
                            <td className="p-2 border-r border-gray-300">
                              <span className={`font-bold block ${isApproved ? "text-gray-400" : "text-gray-900"}`}>{item.name}</span>
                              <span className="text-[10px] text-gray-500 block leading-tight">{item.details}</span>
                            </td>
                            <td className="p-2 border-r border-gray-300 text-center">
                              <input
                                type="date"
                                value={displayDate}
                                disabled={isApproved}
                                onChange={(e) => {
                                  setPaymentDates(prev => ({
                                    ...prev,
                                    [item.id]: e.target.value
                                  }));
                                }}
                                className="w-32 text-center border border-gray-400 px-1 py-1 text-xs font-mono font-bold focus:border-blue-900 bg-white text-black outline-none rounded-sm disabled:opacity-75 disabled:bg-gray-150 disabled:text-gray-500"
                              />
                            </td>
                            <td className="p-2 border-r border-gray-300 text-center">
                              <select
                                value={displayMethod}
                                disabled={isApproved}
                                onChange={(e) => {
                                  setPaymentMethods(prev => ({
                                    ...prev,
                                    [item.id]: e.target.value as any
                                  }));
                                }}
                                className="w-20 text-center border border-gray-400 px-1 py-1 text-xs font-bold focus:border-blue-900 bg-white text-black outline-none rounded-sm disabled:opacity-75 disabled:bg-gray-150 disabled:text-gray-500"
                              >
                                <option value="Cash">Cash</option>
                                <option value="Transfer">TF</option>
                              </select>
                            </td>
                            <td className={`p-2 border-r border-gray-300 text-right font-mono font-medium ${isApproved ? "text-gray-400" : "text-gray-700"}`}>
                              Rp {item.salary.toLocaleString('id-ID')}
                            </td>
                            <td className="p-2 border-r border-gray-300 text-center">
                              <input
                                type="text"
                                value={isApproved ? (item.approvedBonus || 0).toLocaleString('id-ID') : (bonuses[item.id] || '')}
                                disabled={isApproved}
                                onChange={(e) => {
                                  const num = parseInputNumber(e.target.value);
                                  setBonuses(prev => ({
                                    ...prev,
                                    [item.id]: num ? num.toLocaleString('id-ID') : ''
                                  }));
                                }}
                                className="w-24 text-center border border-gray-400 px-1 py-1 text-xs font-mono font-bold focus:border-blue-900 bg-white text-black outline-none rounded-sm disabled:opacity-75 disabled:bg-gray-150 disabled:text-gray-500"
                                placeholder="0"
                              />
                            </td>
                            <td className={`p-2 border-r border-gray-300 text-right font-mono font-bold text-sm ${isApproved ? "text-gray-400" : "text-emerald-700"}`}>
                              Rp {displayTHP.toLocaleString('id-ID')}
                            </td>
                            <td className="p-2 text-center">
                              {isApproved ? (
                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 border border-green-300 font-bold px-2.5 py-1 text-[10px] rounded shadow-xs uppercase">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  DONE
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleApproveSalary(item)}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white font-bold text-[10px] rounded shadow-sm transition-all"
                                >
                                  APPROVE
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeControl === 'prive' && (
            <div className="flex flex-col gap-4">
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

            {/* Arsip Table for Prive Owner */}
            <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 mt-2">
               <span className="text-[11px] font-bold text-gray-700 uppercase">Arsip Prive Owner</span>
               {arsipPrive.length === 0 ? (
                  <div className="py-4 text-center text-gray-500 border border-dashed border-gray-300 bg-gray-50 rounded text-xs">
                     Belum ada arsip penarikan prive owner.
                  </div>
               ) : (
                  <div className="overflow-x-auto border border-gray-300 rounded max-h-[300px]">
                    <table className="w-full text-left border-collapse whitespace-nowrap text-xs">
                      <thead className="bg-purple-50 border-b border-purple-200 text-purple-900 font-bold">
                        <tr>
                          <th className="p-2 border-r border-gray-300">Waktu</th>
                          <th className="p-2 border-r border-gray-300">Deskripsi / Catatan</th>
                          <th className="p-2 border-r border-gray-300 text-center">Status</th>
                          <th className="p-2 text-right">Nominal Prive (Rp)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {arsipPrive.slice(0, 50).map((item: any, idx: number) => (
                           <tr key={item.id || idx} className="hover:bg-purple-50/50 text-black">
                             <td className="p-2 border-r border-gray-300">{item.date}</td>
                             <td className="p-2 border-r border-gray-300">{item.name}</td>
                             <td className="p-2 border-r border-gray-300 text-center font-bold">
                               <span className="px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800">Selesai</span>
                             </td>
                             <td className="p-2 text-right font-mono font-bold text-red-600">
                                -Rp {item.amount.toLocaleString('id-ID')}
                             </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
               )}
            </div>
          </div>
          )}
        </div>

      </div>
    </div>
  );
};
