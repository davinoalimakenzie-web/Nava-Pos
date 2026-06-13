import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp, calculateJatuhTempo, smartSort } from '../utils';

import { DanaBebas } from './DanaBebas';

export const Cashflow = ({ currentTime }: { currentTime: Date }) => {
  const { 
    transactions, setTransactions,
    expenses, 
    storeSettings, 
    setActiveTab, 
    setMasterDataTab, 
    cart, setCart, 
    customers, 
    wallets, setWallets,
    setReprintTx,
    setInventory,
    setPiutangData,
    addLog,
    setSelectedCustomerId,
    setActiveReturTrx
  } = useAppContext();
  
  const [cashflowTab, setCashflowTab] = useState('harian');
  const [cashflowHarianSubTab, setCashflowHarianSubTab] = useState('laporan');
  
  const [selectedTrxPopup, setSelectedTrxPopup] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Dragging state for POS Mini popup
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [isDraggingPopup, setIsDraggingPopup] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (selectedTrxPopup) {
      setPopupPos({ x: 0, y: 0 });
    }
  }, [selectedTrxPopup]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.id === 'btn-popup-top-close' || target.closest('button')) return;
    setIsDraggingPopup(true);
    setDragStart({ x: e.clientX - popupPos.x, y: e.clientY - popupPos.y });
  };

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDraggingPopup) return;
    setPopupPos({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDraggingPopup, dragStart]);

  const handleMouseUp = React.useCallback(() => {
    setIsDraggingPopup(false);
  }, []);

  React.useEffect(() => {
    if (isDraggingPopup) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingPopup, handleMouseMove, handleMouseUp]);

  // Handle Return from POS Mini Popup
  const handleReturnFromPopup = () => {
    if (!selectedTrxPopup) return;
    const t = selectedTrxPopup;
    const matchCust = customers.find((c: any) => c.name === t.customer);
    if (matchCust) {
      setSelectedCustomerId(String(matchCust.id));
    }
    const returnItems = (t.items || []).filter((i: any) => i.qty > 0).map((item: any) => ({
      ...item,
      cartUniqueId: 'RET-' + item.id + '-' + Date.now() + Math.random(),
      code: 'RETUR',
      name: `(Retur) ${item.name}`,
      price: Math.abs(item.price),
      qty: item.qty,
      originalQty: item.qty,
      isReturn: true,
      originalTrxId: t.id,
      originalItemId: item.id
    }));
    setActiveReturTrx(null);
    setCart([...cart, ...returnItems]);
    setSelectedTrxPopup(null);
    setActiveTab('pos');
  };
  
  const handleDeleteTransaction = () => {
    if (!selectedTrxPopup) return;
    
    const trx = selectedTrxPopup;

    // 1. Restore Inventory Stock count
    if (trx.items && trx.items.length > 0) {
      setInventory((prevInv: any[]) => {
        const newInv = [...(prevInv || [])];
        trx.items.forEach((item: any) => {
          const foundIdx = newInv.findIndex((i: any) => i.id === item.id);
          if (foundIdx >= 0) {
            newInv[foundIdx].stock = (newInv[foundIdx].stock || 0) + item.qty;
          }
        });
        return newInv;
      });
    }

    // 2. Adjust Wallets (Dana Laci) if cash entered laci
    let computedLaciMasuk = 0;
    if (trx.method !== 'Qriss/TF') {
      if (trx.type === 'PIUTANG') {
        computedLaciMasuk = trx.paid || 0;
      } else {
        const paid = trx.paid || 0;
        const change = trx.change || 0;
        computedLaciMasuk = paid - change;
      }
    }
    if (computedLaciMasuk > 0) {
      setWallets((prev: any) => ({
        ...prev,
        danaLaci: Math.max(0, (prev?.danaLaci || 0) - computedLaciMasuk)
      }));
    }

    // 3. Delete from Piutang database if it was a Piutang transaction
    if (trx.method === 'PIUTANG' || trx.type === 'PIUTANG') {
      setPiutangData((prev: any[]) => (prev || []).filter((p: any) => p.id !== trx.id));
    }

    // 4. Remove from transactions list
    setTransactions((prev: any[]) => (prev || []).filter((t: any) => t.id !== trx.id));

    // 5. Post System Log
    addLog?.('TRANSAKSI_DIHAPUS', `Transaksi harian ${trx.id} dihapus. Stok produk di-restore & Laci disesuaikan.`);

    // 6. Reset popup states
    setShowDeleteConfirm(false);
    setSelectedTrxPopup(null);
    alert(`Transaksi ${trx.id} berhasil dihapus.`);
  };
  
  const defaultDateStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; })();
  const [filterUseStart, setFilterUseStart] = useState(true);
  const [filterStartDate, setFilterStartDate] = useState(defaultDateStr);
  const [filterUseEnd, setFilterUseEnd] = useState(true);
  const [filterEndDate, setFilterEndDate] = useState(defaultDateStr);
  const [filterBranch, setFilterBranch] = useState('Semua Cabang');

  const [filterPaymentMethod, setFilterPaymentMethod] = useState('Semua');
  const [searchNota, setSearchNota] = useState('');
  
  const filteredTransactions = transactions.filter((t: any) => {
    if (t.type === 'PEMBELIAN') return false; // Exclude from income logic
    const txBranch = t.branch || (t.cashier?.includes('Pati') ? 'Pati' : 'Kudus');
    if (filterBranch !== 'Semua Cabang' && txBranch !== filterBranch) return false;
    
    if (filterPaymentMethod === 'TUNAI' && t.method !== 'TUNAI') return false;
    if (filterPaymentMethod === 'NON-TUNAI' && t.method === 'TUNAI') return false;
    
    if (searchNota && !t.id.toLowerCase().includes(searchNota.toLowerCase())) return false;

    // Safely extract YYYY-MM-DD string for comparison
    let dPart = '';
    if (t.date) {
        let p = t.date.split(' ')[0];
        // Handle if date is DD-MM-YYYY or DD/MM/YYYY
        if (p.includes('/')) p = p.split('/').reverse().join('-');
        else if (p.split('-')[0].length === 2) p = p.split('-').reverse().join('-');
        dPart = p;
    } else if (t.isoDate) {
        dPart = t.isoDate.split('T')[0];
    } else {
        dPart = new Date().toISOString().split('T')[0];
    }
    
    if (filterUseStart && dPart < filterStartDate) return false;
    if (filterUseEnd && dPart > filterEndDate) return false;
    return true;
  });

  const filteredExpenses = expenses.filter((e: any) => {
    const exBranch = e.branch || (e.cashier?.includes('Pati') ? 'Pati' : 'Kudus');
    if (filterBranch !== 'Semua Cabang' && exBranch !== filterBranch) return false;
    const eDate = new Date(e.isoDate || new Date().toISOString());
    eDate.setHours(0,0,0,0);
    
    const [sY, sM, sD] = filterStartDate.split('-');
    const start = new Date(parseInt(sY), parseInt(sM) - 1, parseInt(sD), 0, 0, 0, 0);
    
    const [eY, eM, eD] = filterEndDate.split('-');
    const end = new Date(parseInt(eY), parseInt(eM) - 1, parseInt(eD), 0, 0, 0, 0);

    if (filterUseStart && eDate < start) return false;
    if (filterUseEnd && eDate > end) return false;
    return true;
  });

  const [txSortKey, setTxSortKey] = useState('date');
  const [txSortDirection, setTxSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleTxSort = (key: string) => {
    if (txSortKey === key) {
      setTxSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setTxSortKey(key);
      setTxSortDirection('asc');
    }
  };

  const mappedTransactions = React.useMemo(() => {
    return (filteredTransactions || []).map((trx: any) => {
      const displayRetur = trx.returTotal || trx.returTotalPopupOnly || 0;
      const totalGross = (trx.total || 0) + displayRetur;
      
      let laciMasuk = 0;
      if (trx.method !== 'Qriss/TF') {
        if (trx.type === 'PIUTANG') {
          laciMasuk = trx.paid || 0;
        } else {
          const paid = trx.paid || 0;
          const change = trx.change || 0;
          laciMasuk = paid - change;
        }
      }
      return {
        ...trx,
        laciMasuk,
        totalGross,
        displayRetur
      };
    });
  }, [filteredTransactions]);

  const sortedTransactions = React.useMemo(() => {
    return smartSort(mappedTransactions || [], txSortKey, txSortDirection);
  }, [mappedTransactions, txSortKey, txSortDirection]);

  const [expSortKey, setExpSortKey] = useState('date');
  const [expSortDirection, setExpSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleExpSort = (key: string) => {
    if (expSortKey === key) {
      setExpSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setExpSortKey(key);
      setExpSortDirection('asc');
    }
  };

  const sortedExpenses = React.useMemo(() => {
    return smartSort(filteredExpenses || [], expSortKey, expSortDirection);
  }, [filteredExpenses, expSortKey, expSortDirection]);

  const [retSortKey, setRetSortKey] = useState('id');
  const [retSortDirection, setRetSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleRetSort = (key: string) => {
    if (retSortKey === key) {
      setRetSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setRetSortKey(key);
      setRetSortDirection('asc');
    }
  };

  const returnTransactions = React.useMemo(() => {
    return filteredTransactions.filter((t: any) => t.returTotal > 0 || t.returTotalPopupOnly > 0 || (t.items && t.items.some((i: any) => i.isReturn || i.totalReturnedQty > 0)));
  }, [filteredTransactions]);

  const sortedReturnTransactions = React.useMemo(() => {
    return smartSort(returnTransactions || [], retSortKey, retSortDirection);
  }, [returnTransactions, retSortKey, retSortDirection]);

  const [showMonthlyReturn, setShowMonthlyReturn] = useState(false);
  const [showMonthlyNonTunai, setShowMonthlyNonTunai] = useState(false);
  const [showMonthlyOmzet, setShowMonthlyOmzet] = useState(false);
  const [showMonthlyExpense, setShowMonthlyExpense] = useState(false);

  const returTunaiTotal = filteredTransactions.filter((t: any) => t.method === 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const returNonTunaiTotal = filteredTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const totalReturHarianVal = returTunaiTotal + returNonTunaiTotal;

  const uangKeluarNonTunai = filteredTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0); 
  
  const totalPengeluaran = filteredExpenses.filter((e: any) => e.amount > 0).reduce((sum: number, e: any) => sum + e.amount, 0);

  const [tY, tM, tD] = filterStartDate.split('-');
  const monthlyTransactions = transactions.filter((t: any) => {
    let dPart = '';
    if (t.date) {
        let p = t.date.split(' ')[0];
        if (p.includes('/')) p = p.split('/').reverse().join('-');
        else if (p.split('-')[0].length === 2) p = p.split('-').reverse().join('-');
        dPart = p;
    } else if (t.isoDate) {
        dPart = t.isoDate.split('T')[0];
    } else {
        dPart = new Date().toISOString().split('T')[0];
    }
    return dPart.startsWith(`${tY}-${tM}`);
  });
  const totalReturBulananVal = monthlyTransactions.reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const piutangNonTunaiBulananVal = monthlyTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0);

  const pengeluaranBulananVal = expenses.filter((e: any) => {
    const eDate = new Date(e.isoDate || e.date || new Date().toISOString());
    return eDate.getMonth() === (parseInt(tM) - 1) && eDate.getFullYear() === parseInt(tY);
  }).reduce((sum: number, e: any) => sum + (e.amount > 0 ? e.amount : 0), 0);

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="CASHFLOW & KEUANGAN" currentTime={currentTime} />
      
      {/* Cashflow Top Tabs - Perfectly flush back-to-back with window header */}
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] px-1 pt-1 border-b border-gray-400 shadow-sm z-10 overflow-x-auto no-scrollbar">
         <button onClick={() => setCashflowTab('harian')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'harian' ? 'bg-white border-b-transparent text-blue-900' : 'bg-gray-200 text-black'}`}>Cashflow Harian</button>
         <button onClick={() => setCashflowTab('dana_bebas')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'dana_bebas' ? 'bg-white border-b-transparent text-blue-900' : 'bg-gray-200 text-black'}`}>Dana Bebas</button>
      </div>

      {/* Box Rangkuman Statis (Sits seamlessly below Top Tabs) */}
      <div className="grid grid-cols-6 divide-x divide-gray-300 border-b border-gray-400 bg-white shadow-sm z-10 w-full select-none shrink-0 no-scrollbar overflow-x-auto text-center">
        {/* 1. DANA BEBAS */}
        <div className="p-1.5 md:p-2.5 bg-white hover:bg-gray-50 transition-colors flex flex-col justify-center min-w-0">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider truncate">Dana Bebas</p>
          <div className="text-[14px] font-black text-blue-900 truncate">{formatRp(wallets?.danaBebas || 0)}</div>
        </div>
        
        {/* 2. DANA LACI */}
        <div className="p-1.5 md:p-2.5 bg-white hover:bg-gray-50 transition-colors flex flex-col justify-center min-w-0">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider truncate">Dana Laci</p>
          <div className="text-[14px] font-black text-gray-800 truncate">{formatRp(wallets?.danaLaci || 0)}</div>
        </div>

        {/* 3. OMZET */}
        <div 
          className="p-1.5 md:p-2.5 bg-white hover:bg-gray-50 transition-colors cursor-pointer flex flex-col justify-center min-w-0"
          onClick={() => setShowMonthlyOmzet(!showMonthlyOmzet)}
        >
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shrink-0 truncate">
            {showMonthlyOmzet ? 'OMZET (BULAN)' : 'OMZET (HARIAN)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
          </p>
          <div className="text-[14px] font-black text-teal-700 truncate">
            {formatRp(showMonthlyOmzet ? ((wallets?.danaLaci || 0) + piutangNonTunaiBulananVal) : ((wallets?.danaLaci || 0) + uangKeluarNonTunai))}
          </div>
        </div>

        {/* 4. FIKTIF */}
        <div 
          className="p-1.5 md:p-2.5 bg-white hover:bg-gray-50 transition-colors cursor-pointer flex flex-col justify-center min-w-0"
          onClick={() => setShowMonthlyNonTunai(!showMonthlyNonTunai)}
        >
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shrink-0 truncate">
            {showMonthlyNonTunai ? 'FIKTIF (BULAN)' : 'FIKTIF (HARIAN)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
          </p>
          <div className="text-[14px] font-black text-orange-500 truncate">
            {formatRp(showMonthlyNonTunai ? piutangNonTunaiBulananVal : uangKeluarNonTunai)}
          </div>
        </div>

        {/* 5. RETURN */}
        <div 
          className="p-1.5 md:p-2.5 bg-white hover:bg-gray-50 transition-colors cursor-pointer flex flex-col justify-center min-w-0"
          onClick={() => setShowMonthlyReturn(!showMonthlyReturn)}
        >
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shrink-0 truncate">
            {showMonthlyReturn ? 'RETURN (BULAN)' : 'RETURN (HARIAN)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
          </p>
          <div className="text-[14px] font-black text-red-600 truncate">
            {formatRp(showMonthlyReturn ? totalReturBulananVal : totalReturHarianVal)}
          </div>
        </div>

        {/* 6. PENGELUARAN */}
        <div 
          className="p-1.5 md:p-2.5 bg-white hover:bg-gray-50 transition-colors cursor-pointer flex flex-col justify-center min-w-0"
          onClick={() => setShowMonthlyExpense(!showMonthlyExpense)}
        >
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 shrink-0 truncate">
            {showMonthlyExpense ? 'PENGELUARAN (BULAN)' : 'PENGELUARAN (HARIAN)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
          </p>
          <div className="text-[14px] font-black text-black truncate">
            {formatRp(showMonthlyExpense ? pengeluaranBulananVal : totalPengeluaran)}
          </div>
        </div>
      </div>

      {/* Header Filter Baru */}
      {cashflowTab === 'harian' && (
        <div className="bg-[#000040] p-1.5 flex items-end gap-2 shrink-0 shadow-sm border-b border-[#000030]">
           {/* Dari Tanggal */}
           <div className="flex flex-col gap-0.5 text-white flex-1">
              <label className="text-[12px] font-medium">Dari Tanggal</label>
              <div className="flex items-center bg-white px-1 rounded-sm h-[28px]">
                 <input type="date" value={filterStartDate} onChange={e => { setFilterStartDate(e.target.value); setFilterUseStart(true); }} className="text-black outline-none w-full font-medium text-[13px] bg-transparent" />
              </div>
           </div>
           {/* Sampai Tanggal */}
           <div className="flex flex-col gap-0.5 text-white flex-1">
              <label className="text-[12px] font-medium">Sampai Tanggal</label>
              <div className="flex items-center bg-white px-1 rounded-sm h-[28px]">
                 <input type="date" value={filterEndDate} onChange={e => { setFilterEndDate(e.target.value); setFilterUseEnd(true); }} className="text-black outline-none w-full font-medium text-[13px] bg-transparent" />
              </div>
           </div>
           {/* Jenis */}
           <div className="flex flex-col gap-0.5 text-white flex-1">
              <label className="text-[12px] font-medium">Jenis</label>
              <select value={cashflowHarianSubTab} onChange={e => setCashflowHarianSubTab(e.target.value)} className="bg-white text-black outline-none px-1 w-full font-medium text-[13px] rounded-sm h-[28px]">
                 <option value="laporan">Laporan Transaksi</option>
                 <option value="pengeluaran">Pengeluaran</option>
                 <option value="return">Return</option>
              </select>
           </div>
           {/* Cabang */}
           <div className="flex flex-col gap-0.5 text-white flex-1">
              <label className="text-[12px] font-medium">Cabang</label>
              <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="bg-white text-black outline-none px-1 w-full font-medium text-[13px] rounded-sm h-[28px]">
                 <option value="Semua Cabang">Semua Cabang</option>
                 {(storeSettings.branches || ['Pusat']).map((b: string) => <option key={b} value={b}>{b}</option>)}
              </select>
           </div>
           {/* Tunai / Non Tunai (Cash/TF) */}
           <div className="flex flex-col gap-0.5 text-white flex-1">
              <label className="text-[12px] font-medium">Tunai / Non Tunai</label>
              <select value={filterPaymentMethod} onChange={e => setFilterPaymentMethod(e.target.value)} className="bg-white text-black outline-none px-1 w-full font-medium text-[13px] rounded-sm h-[28px]">
                 <option value="Semua">Semua</option>
                 <option value="TUNAI">Tunai</option>
                 <option value="NON-TUNAI">Non Tunai</option>
              </select>
           </div>
           {/* No Nota & Search */}
           <div className="flex flex-col gap-0.5 text-white flex-1 justify-end">
              <label className="text-[12px] font-medium">No. Nota</label>
              <div className="flex items-center gap-1">
                 <input type="text" value={searchNota} onChange={e => setSearchNota(e.target.value)} className="bg-white text-black px-2 w-full font-medium text-[13px] outline-none rounded-sm h-[28px]" />
                 <button className="bg-white text-black px-4 font-bold text-[13px] border border-gray-300 rounded-sm shadow-sm hover:bg-gray-200 h-[28px]">CARI</button>
              </div>
           </div>
        </div>
      )}

      {/* TAB: CASHFLOW HARIAN */}
      {cashflowTab === 'harian' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* SUB-TAB CONTENTS (CASHFLOW HARIAN) */}
          <div className="flex-1 bg-white overflow-auto flex flex-col relative">
            
            {cashflowHarianSubTab === 'laporan' && (
              <div className="flex flex-col h-full">
                {filteredTransactions.length === 0 ? (
                  <div className="text-center text-gray-500 p-10 font-bold text-lg">Tidak ada data transaksi pada rentang waktu ini.</div>
                ) : (
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-blue-900 shadow-sm z-10 text-sm select-none">
                      <tr>
                        <th className="p-3 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('date')} title="Urutkan Tanggal">
                          <div className="flex items-center gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Tanggal</span>
                            <span className="font-mono text-[9px] text-[#000080]" id="sort-indicator-tx-date">{txSortKey === 'date' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('id')} title="Urutkan Faktur">
                          <div className="flex items-center gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Faktur</span>
                            <span className="font-mono text-[9px] text-[#000080]" id="sort-indicator-tx-id">{txSortKey === 'id' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('total')} title="Urutkan Qty">
                          <div className="flex items-center justify-center gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Qty</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'total' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('customer')} title="Urutkan Pelanggan">
                          <div className="flex items-center gap-1 justify-between bg-white/40 px-1 py-0.5 rounded">
                            <span>Pelanggan</span>
                            <span className="font-mono text-[9px] text-[#000080]" id="sort-indicator-tx-customer">{txSortKey === 'customer' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('method')} title="Urutkan Metode">
                          <div className="flex items-center justify-center gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Metode</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'method' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        {filterPaymentMethod !== 'TUNAI' && (
                          <th className="p-3 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('isoDate')} title="Urutkan Jatuh Tempo">
                            <div className="flex items-center justify-center gap-1 bg-white/40 px-1 py-0.5 rounded">
                              <span>Jatuh Tempo</span>
                              <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'isoDate' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                            </div>
                          </th>
                        )}
                        <th className="p-3 border-r border-gray-300 text-right cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('totalGross')} title="Urutkan Total Harga">
                          <div className="flex items-center justify-end gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Total Harga</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'totalGross' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-right text-red-650 cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('displayRetur')} title="Urutkan Retur">
                          <div className="flex items-center justify-end gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Retur Rp</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'displayRetur' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-right text-green-700 cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('laciMasuk')} title="Urutkan Laci Masuk">
                          <div className="flex items-center justify-end gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Laci Masuk</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'laciMasuk' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleTxSort('cashier')} title="Urutkan Kasir">
                          <div className="flex items-center justify-center gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>User</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'cashier' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {sortedTransactions.slice(0, 100).map((trx: any) => (
                         <tr 
                           key={trx.id} 
                           className="border-b border-gray-200 hover:bg-blue-100 cursor-pointer text-black"
                           title="Klik sekali untuk Detail POS (Mini), klik 2x untuk mode Retur"
                           onClick={() => setSelectedTrxPopup(trx)}
                           onDoubleClick={() => {
                               const returnItems = (trx.items || []).map((item: any) => ({
                                   ...item,
                                   qty: Math.abs(item.qty),
                                   originalQty: Math.abs(item.qty),
                                   isReturn: true,
                                   originalTrxId: trx.id,
                                   originalItemId: item.id
                               }));
                               setCart([...cart, ...returnItems]);
                               setActiveTab('pos');
                           }}
                         >
                           <td className="p-3 border-r border-gray-300">{trx.date.split(' ')[0]}</td>
                           <td className="p-3 border-r border-gray-300 font-mono font-bold text-black">{trx.id}</td>
                           <td className="p-3 border-r border-gray-300 text-center font-bold">{(trx.items || []).reduce((sum: number, i: any) => sum + i.qty, 0)}</td>
                           <td className="p-3 border-r border-gray-300">{trx.customer}</td>
                           <td className="p-3 border-r border-gray-300 text-center">
                             <span className="text-black font-bold">{trx.method}</span>
                           </td>
                           {filterPaymentMethod !== 'TUNAI' && (
                             <td className="p-3 border-r border-gray-300 text-center text-black font-medium">
                               {calculateJatuhTempo(trx.isoDate, trx.method)}
                             </td>
                           )}
                           <td className="p-3 border-r border-gray-300 text-right font-bold text-blue-800">{formatRp(trx.totalGross)}</td>
                           <td className={`p-3 border-r border-gray-300 text-right font-bold ${
                             (trx.returTotal || 0) > 0
                               ? 'text-red-600 font-extrabold'
                               : (trx.returTotalPopupOnly || 0) > 0
                               ? 'text-blue-600 font-extrabold'
                               : trx.displayRetur > 0
                               ? 'text-blue-600 font-extrabold'
                               : 'text-gray-400 opacity-60'
                           }`}>{formatRp(trx.displayRetur || 0)}</td>
                           <td className={`p-3 border-r border-gray-300 text-right font-bold ${trx.laciMasuk < 0 ? 'text-red-700' : 'text-green-700'}`}>{formatRp(trx.laciMasuk || 0)}</td>
                           <td className="p-3 border-gray-300 text-center text-gray-600">{trx.cashier}</td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {cashflowHarianSubTab === 'pengeluaran' && (
              <div className="flex flex-col h-full">
                {filteredExpenses.length === 0 ? (
                  <div className="text-center text-gray-500 p-10 font-bold text-lg">Tidak ada data pengeluaran pada rentang waktu ini.</div>
                ) : (
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-red-800 shadow-sm z-10 text-sm select-none">
                      <tr>
                        <th className="p-3 border-r border-gray-300 w-1/4 cursor-pointer hover:bg-gray-200" onClick={() => handleExpSort('date')} title="Urutkan Waktu/ID">
                          <div className="flex items-center gap-1.5 justify-start bg-white/40 px-1 py-0.5 rounded">
                            <span>Waktu / ID</span>
                            <span className="font-mono text-[9px] text-red-750">{expSortKey === 'date' ? (expSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 w-1/3 cursor-pointer hover:bg-gray-200" onClick={() => handleExpSort('name')} title="Urutkan Keterangan">
                          <div className="flex items-center gap-1.5 justify-between bg-white/40 px-1 py-0.5 rounded">
                            <span>Keterangan Pengeluaran</span>
                            <span className="font-mono text-[9px] text-red-750">{expSortKey === 'name' ? (expSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200" onClick={() => handleExpSort('wallet')} title="Urutkan Sumber Dana">
                          <div className="flex items-center justify-center gap-1.5 bg-white/40 px-1 py-0.5 rounded">
                            <span>Sumber Dana</span>
                            <span className="font-mono text-[9px] text-red-750">{expSortKey === 'wallet' ? (expSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200" onClick={() => handleExpSort('cashier')} title="Urutkan Kasir">
                          <div className="flex items-center justify-center gap-1.5 bg-white/40 px-1 py-0.5 rounded">
                            <span>User (Kasir)</span>
                            <span className="font-mono text-[9px] text-red-750">{expSortKey === 'cashier' ? (expSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 text-right cursor-pointer hover:bg-gray-200" onClick={() => handleExpSort('amount')} title="Urutkan Nominal">
                          <div className="flex items-center justify-end gap-1.5 bg-white/40 px-1 py-0.5 rounded">
                            <span>Nominal Pengeluaran</span>
                            <span className="font-mono text-[9px] text-red-750">{expSortKey === 'amount' ? (expSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {sortedExpenses.map((exp: any) => (
                         <tr key={exp.id} className="border-b border-gray-200 hover:bg-red-50 text-black">
                            <td className="p-3 border-r border-gray-300">{exp.date} <span className="text-gray-400 font-mono">({exp.id})</span></td>
                            <td className="p-3 border-r border-gray-300 font-bold">{exp.name}</td>
                            <td className="p-3 border-r border-gray-300 text-center font-bold text-xs">{exp.wallet || 'Dana Laci'}</td>
                            <td className="p-3 border-r border-gray-300 text-center">{exp.cashier}</td>
                            <td className={`p-3 text-right font-bold ${exp.amount < 0 ? 'text-teal-600' : 'text-red-600'}`}>
                              {exp.amount < 0 ? '+' : '-'}{formatRp(Math.abs(exp.amount))}
                            </td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            {cashflowHarianSubTab === 'return' && (
              <div className="flex flex-col h-full">
                {returnTransactions.length === 0 ? (
                  <div className="text-center text-gray-500 p-10 font-bold text-lg">Tidak ada data retur pada rentang waktu ini.</div>
                ) : (
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-blue-900 shadow-sm z-10 text-sm select-none">
                      <tr>
                        <th className="p-3 border-r border-gray-300 w-1/4 cursor-pointer hover:bg-gray-200" onClick={() => handleRetSort('id')} title="Urutkan ID/Waktu">
                          <div className="flex items-center gap-1.5 justify-start bg-white/40 px-1 py-0.5 rounded">
                            <span>ID Transaksi / Waktu</span>
                            <span className="font-mono text-[9px] text-[#000080]">{retSortKey === 'id' ? (retSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleRetSort('customer')} title="Urutkan Customer">
                          <div className="flex items-center gap-1.5 justify-between bg-white/40 px-1 py-0.5 rounded">
                            <span>Customer</span>
                            <span className="font-mono text-[9px] text-[#000080]">{retSortKey === 'customer' ? (retSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 w-1/2 font-bold text-gray-550 select-none">Item Retur</th>
                        <th className="p-3 text-right cursor-pointer hover:bg-gray-200" onClick={() => handleRetSort('returTotal')} title="Urutkan Nilai Retur">
                          <div className="flex items-center justify-end gap-1.5 bg-white/40 px-1 py-0.5 rounded font-bold text-red-650">
                            <span>Nilai Retur</span>
                            <span className="font-mono text-[9px] text-red-650">{retSortKey === 'returTotal' ? (retSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {sortedReturnTransactions.map((trx: any) => (
                         <tr key={`return-${trx.id}`} className="border-b border-gray-200 hover:bg-yellow-50 text-black">
                            <td className="p-3 border-r border-gray-300">{trx.date} <span className="text-gray-400 font-mono">({trx.id})</span></td>
                            <td className="p-3 border-r border-gray-300 font-bold">{trx.customer}</td>
                            <td className="p-3 border-r border-gray-300 text-sm">
                               {(trx.items || []).filter((i: any) => i.isReturn || (i.totalReturnedQty && i.totalReturnedQty > 0)).map((item: any, idx: number) => {
                                 const qtyToShow = item.isReturn ? item.qty : item.totalReturnedQty;
                                 return (
                                   <div key={idx}>- {item.name?.replace('(Retur) ', '')} ({qtyToShow} pcs)</div>
                                 );
                               })}
                            </td>
                            <td className="p-3 text-right font-bold text-red-600">
                               {formatRp(trx.returTotal || trx.returTotalPopupOnly || 0)}
                            </td>
                         </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB: DANA BEBAS */}
      {cashflowTab === 'dana_bebas' && (
         <div className="flex-1 flex flex-col overflow-hidden">
             <DanaBebas currentTime={currentTime} headless={true} />
         </div>
      )}

      {/* POPUP DETAIL TRANSAKSI POS MINI */}
      {selectedTrxPopup && (
         <div id="popup-mini-pos-modal" className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-all">
             <div 
                 id="popup-card-container" 
                 style={{ transform: `translate(${popupPos.x}px, ${popupPos.y}px)` }}
                 className="bg-[#ece9d8] border-2 border-white shadow-[4px_4px_16px_rgba(0,0,0,0.6)] w-full max-w-lg overflow-hidden flex flex-col font-sans border-b-gray-600 border-r-gray-600 relative select-none pointer-events-auto"
             >
                 
                 {/* Standard Windows Classical Title Bar */}
                 <div onMouseDown={handleMouseDown} className="bg-[#000080] text-white p-2 flex items-center justify-between font-bold text-sm select-none shrink-0 cursor-move">
                     <span className="flex items-center gap-1.5 pl-1">🛍️ POS DETAIL TRANSAKSI (MINI)</span>
                     <button 
                         id="btn-popup-top-close"
                         onClick={() => setSelectedTrxPopup(null)} 
                         className="bg-[#ece9d8] text-black border border-white hover:bg-gray-300 font-bold px-2 py-0.5 text-xs select-none shadow-[inset_1px_1px_0px_#fff,1px_1px_1px_rgba(0,0,0,0.5)]"
                     >
                         X
                     </button>
                 </div>

                 {/* Modal Body Container */}
                 <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
                     
                     {/* 2-Column Info Grid */}
                     <div className="grid grid-cols-2 gap-2.5 text-xs border border-gray-400 p-2.5 bg-white rounded shadow-inner">
                         <div>
                             <p className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">Faktur / Nota</p>
                             <p className="font-mono font-bold text-blue-900 text-[13px]">{selectedTrxPopup.id}</p>
                         </div>
                         <div>
                             <p className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">Pelanggan</p>
                             <p className="font-bold text-gray-800 text-[13px]">{selectedTrxPopup.customer || 'Pelanggan Umum'}</p>
                         </div>
                         <div>
                             <p className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">Waktu Transaksi</p>
                             <p className="font-semibold text-gray-700">{selectedTrxPopup.date}</p>
                         </div>
                         <div>
                             <p className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">Operator (Kasir)</p>
                             <p className="font-bold text-emerald-700">{selectedTrxPopup.cashier || 'System'}</p>
                         </div>
                         <div>
                             <p className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">Metode Pembayaran</p>
                             <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-black ${selectedTrxPopup.method === 'TUNAI' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                 {selectedTrxPopup.method}
                             </span>
                         </div>
                         <div>
                             <p className="text-gray-400 font-bold uppercase text-[9px] tracking-wide">Cabang Toko</p>
                             <p className="font-semibold text-purple-700">{selectedTrxPopup.branch || 'Pusat'}</p>
                         </div>
                     </div>

                     {/* Itemized Table */}
                     <div>
                         <p className="text-gray-600 font-bold text-[10px] uppercase mb-1 tracking-wider">Daftar Item Belanjaan</p>
                         <div className="border border-gray-400 rounded bg-white overflow-hidden shadow-inner max-h-[180px] overflow-y-auto">
                             <table className="w-full text-xs text-left border-collapse">
                                 <thead className="bg-[#ece9d8] border-b border-gray-300 text-blue-900 font-bold sticky top-0 text-[10px] uppercase">
                                     <tr>
                                         <th className="p-1 px-2 border-r border-gray-200">Nama Barang</th>
                                         <th className="p-1 text-center w-[55px] border-r border-gray-200">Qty</th>
                                         <th className="p-1 text-right w-[85px] border-r border-gray-200">Harga</th>
                                         <th className="p-1 text-right w-[95px]">Total</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {(selectedTrxPopup.items || []).map((item: any, idx: number) => {
                                          const hasRetur = item.originalQtyBeforeReturn !== undefined && item.originalQtyBeforeReturn !== item.qty;
                                          return (
                                         <tr key={idx} className="border-b border-gray-200 hover:bg-slate-50 text-black">
                                             <td className="p-1.5 px-2 font-medium text-gray-800">{item.name}</td>
                                             <td className="p-1.5 text-center font-bold text-blue-950">
                                                      {hasRetur ? (
                                                          <div className="flex flex-col items-center justify-center leading-normal">
                                                              <span className="text-[12px] font-bold">{item.qty}</span>
                                                              <span className="text-[9px] text-gray-500 font-normal">Awal: {item.originalQtyBeforeReturn}</span>
                                                              <span className="text-[9px] text-red-650 font-bold leading-none mt-0.5">Retur: {item.totalReturnedQty || (item.originalQtyBeforeReturn - item.qty)}</span>
                                                          </div>
                                                      ) : (
                                                          item.qty
                                                      )}
                                                  </td>
                                             <td className="p-1.5 text-right font-mono text-gray-500">{formatRp(item.price)}</td>
                                             <td className="p-1.5 text-right font-mono font-bold text-gray-900">{formatRp(item.qty * item.price)}</td>
                                         </tr>
                                           );
                                      })}`
                                 </tbody>
                             </table>
                         </div>
                     </div>

                     {/* Math Breakdown Box */}
                     <div className="border border-gray-400 p-3 bg-[#fcfbe9] rounded text-xs flex flex-col gap-1.5 shadow-inner font-mono text-black">
                         <div className="flex justify-between text-gray-600">
                             <span>Subtotal Barang:</span>
                             <span className="font-bold">{formatRp((selectedTrxPopup.items || []).reduce((sum: number, i: any) => sum + (i.qty * i.price), 0))}</span>
                         </div>
                         {(selectedTrxPopup.globalDiscount || 0) > 0 && (
                             <div className="flex justify-between text-rose-600 font-bold">
                                 <span>Potongan Diskon:</span>
                                 <span>-{formatRp(selectedTrxPopup.globalDiscount)}</span>
                             </div>
                         )}
                         {(selectedTrxPopup.returTotal > 0 || selectedTrxPopup.returTotalPopupOnly > 0) && (
                              <div className="flex justify-between text-red-650 font-bold mb-1">
                                  <span>Potongan Retur:</span>
                                  <span>-{formatRp(selectedTrxPopup.returTotal || selectedTrxPopup.returTotalPopupOnly)}</span>
                              </div>
                          )}
                          <div className="border-t border-dashed border-gray-300 my-1"></div>
                         <div className="flex justify-between text-[13px] font-black text-blue-900">
                             <span>TOTAL TRANSAKSI:</span>
                             <span>{formatRp(selectedTrxPopup.total)}</span>
                         </div>
                         <div className="flex justify-between text-gray-600">
                             <span>Uang Tunai Diterima:</span>
                             <span className="font-semibold">{formatRp(selectedTrxPopup.paid || selectedTrxPopup.amountPaid || 0)}</span>
                         </div>
                         
                         {selectedTrxPopup.method === 'PIUTANG' ? (
                             <div className="flex justify-between text-red-650 font-bold mt-0.5">
                                 <span>Sisa Piutang (Kredit):</span>
                                 <span>{formatRp(selectedTrxPopup.sisa || 0)}</span>
                             </div>
                         ) : (
                             <div className="flex justify-between text-gray-600 mt-0.5">
                                 <span>Uang Kembalian (Laci):</span>
                                 <span>{formatRp(selectedTrxPopup.change || 0)}</span>
                             </div>
                         )}
                     </div>

                 </div>

                 {/* Action Buttons Footer (Hapus, Cetak, Batal) */}
                 <div className="bg-[#ece9d8] border-t border-gray-300 p-3 flex justify-end gap-2.5 text-xs font-bold shrink-0">
                     <button 
                         id="btn-popup-delete"
                         onClick={() => setShowDeleteConfirm(true)} 
                         className="bg-rose-600 hover:bg-rose-700 text-white border border-rose-750 px-4 py-2 rounded flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                         title="Hapus Transaksi & Kembalikan Stok"
                     >
                         🗑️ Hapus
                     </button>
                     <button 
                         id="btn-popup-print"
                         onClick={() => {
                             setReprintTx(selectedTrxPopup);
                             setTimeout(() => {
                                 window.print();
                             }, 150);
                         }} 
                         className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 px-4 py-2 rounded flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                         title="Cetak Ulang Dokumen Nota"
                     >
                         🖨️ Cetak
                     </button>
                     <button 
                         id="btn-popup-return"
                         onClick={handleReturnFromPopup} 
                         className="bg-sky-600 hover:bg-sky-700 text-white border border-sky-700 px-4 py-2 rounded flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
                         title="Return Transaksi Ini"
                     >
                         🔄 Return
                     </button>
                 </div>

             </div>
         </div>
      )}

      {/* SUB-MODAL SAFETY CONFIRMATION */}
      {showDeleteConfirm && selectedTrxPopup && (
          <div id="sub-modal-confirm-delete" className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4 transition-all">
              <div className="bg-white border-2 border-red-600 shadow-2xl max-w-sm w-full rounded overflow-hidden font-sans text-black">
                  <div className="bg-red-600 text-white p-2.5 font-bold flex items-center gap-2 select-none text-sm">
                      <span>⚠️ PERINGATAN HAPUS DATA</span>
                  </div>
                  <div className="p-4">
                      <div className="text-xs text-gray-700 mb-4 leading-relaxed">
                          Apakah Anda benar-benar yakin ingin menghapus data transaksi <strong className="text-blue-900">{selectedTrxPopup.id}</strong>? <br /><br />
                          Tindakan ini akan memicu efek balik otomatis di sistem:
                          <ul className="list-disc pl-4 mt-2 mb-2 gap-1 flex flex-col text-gray-800">
                              <li>Stok item belanjaan akan <strong>dikembalikan (ditambahkan)</strong> ke gudang secara otomatis.</li>
                              <li>Saldo kasir / <strong>Dana Laci</strong> akan dikurangi atau disesuaikan otomatis.</li>
                          </ul>
                          Tindakan penghapusan bersifat permanen dan tidak dapat dibatalkan.
                      </div>
                      <div className="flex justify-end gap-2 text-xs font-bold pt-2 border-t border-gray-100">
                          <button 
                              id="btn-confirm-delete-yes"
                              onClick={handleDeleteTransaction}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded border border-red-750 transition-colors cursor-pointer"
                          >
                              Ya, Hapus Permanen
                          </button>
                          <button 
                              id="btn-confirm-delete-no"
                              onClick={() => setShowDeleteConfirm(false)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded border border-gray-300 transition-colors cursor-pointer"
                          >
                              Batal
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};
