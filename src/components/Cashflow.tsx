import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp, calculateJatuhTempo, smartSort } from '../utils';

import { DanaBebas } from './DanaBebas';

export const Cashflow = ({ currentTime }: { currentTime: Date }) => {
  const { transactions, expenses, storeSettings, setActiveTab, setMasterDataTab, cart, setCart, customers, wallets } = useAppContext();
  
  const [cashflowTab, setCashflowTab] = useState('harian');
  const [cashflowHarianSubTab, setCashflowHarianSubTab] = useState('laporan');
  
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

  const sortedTransactions = React.useMemo(() => {
    return smartSort(filteredTransactions || [], txSortKey, txSortDirection);
  }, [filteredTransactions, txSortKey, txSortDirection]);

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
    return filteredTransactions.filter((t: any) => t.returTotal > 0 || (t.items && t.items.some((i: any) => i.isReturn)));
  }, [filteredTransactions]);

  const sortedReturnTransactions = React.useMemo(() => {
    return smartSort(returnTransactions || [], retSortKey, retSortDirection);
  }, [returnTransactions, retSortKey, retSortDirection]);

  const [showMonthlyReturn, setShowMonthlyReturn] = useState(false);
  const [showMonthlyNonTunai, setShowMonthlyNonTunai] = useState(false);

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

  const outBulananVal = expenses.filter((e: any) => {
    if (e.wallet !== 'Dana Bebas' && e.name !== 'Setoran Tunai' && !e.name?.includes('Pelunasan') && !e.name?.includes('Gaji') && !e.name?.includes('Prive')) {
        if (e.wallet !== 'Dana Bebas') return false; 
    }
    if (e.wallet !== 'Dana Bebas') return false;
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
      <div className="flex shrink-0 overflow-x-auto select-none border-b border-gray-400 bg-white divide-x divide-gray-300 shadow-sm z-10 no-scrollbar">
        <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Dana Bebas</p>
          <div className="text-[14px] font-black text-blue-900">{formatRp(wallets?.danaBebas || 0)}</div>
        </div>
        <div className="p-2 flex-1 min-w-[120px] bg-white hover:bg-gray-50 transition-colors">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Dana Laci</p>
          <div className="text-[14px] font-black text-gray-800">{formatRp(wallets?.danaLaci || 0)}</div>
        </div>
        <div 
          className="p-2 flex-1 min-w-[125px] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => setShowMonthlyReturn(!showMonthlyReturn)}
        >
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
            {showMonthlyReturn ? 'Total Return (Bulan)' : 'Total Return (Harian)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
          </p>
          <div className="text-[14px] font-black text-red-600">{formatRp(showMonthlyReturn ? totalReturBulananVal : totalReturHarianVal)}</div>
        </div>
        <div className="p-2 flex-1 min-w-[125px] bg-[#fcfcfc] hover:bg-gray-50 transition-colors">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Harian</p>
          <div className="text-[14px] font-black text-black">{formatRp(totalPengeluaran)}</div>
        </div>
        <div className="p-2 flex-1 min-w-[125px] bg-white hover:bg-gray-50 transition-colors">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Bulanan</p>
          <div className="text-[14px] font-black text-orange-600">{formatRp(outBulananVal)}</div>
        </div>
        <div 
          className="p-2 flex-1 min-w-[125px] bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => setShowMonthlyNonTunai(!showMonthlyNonTunai)}
        >
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
            {showMonthlyNonTunai ? 'Non Tunai (Bulan)' : 'Non Tunai (Harian)'} <span className="text-[8px] border border-gray-300 px-1 rounded bg-gray-100 text-gray-400">klik</span>
          </p>
          <div className="text-[14px] font-black text-orange-500">{formatRp(showMonthlyNonTunai ? piutangNonTunaiBulananVal : uangKeluarNonTunai)}</div>
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
                        <th className="p-3 border-r border-gray-300 text-right cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('total')} title="Urutkan Total Harga">
                          <div className="flex items-center justify-end gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Total Harga</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'total' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 border-r border-gray-300 text-right text-red-650 cursor-pointer hover:bg-gray-200" onClick={() => handleTxSort('returTotal')} title="Urutkan Retur">
                          <div className="flex items-center justify-end gap-1 bg-white/40 px-1 py-0.5 rounded">
                            <span>Retur Rp</span>
                            <span className="font-mono text-[9px] text-[#000080]">{txSortKey === 'returTotal' ? (txSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                          </div>
                        </th>
                        <th className="p-3 text-center cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleTxSort('cashier')} title="Urutkan Kasir">
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
                           title="Klik 2x untuk membuka faktur di mode Retur"
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
                           <td className="p-3 border-r border-gray-300 font-mono font-bold text-blue-800">{trx.id}</td>
                           <td className="p-3 border-r border-gray-300 text-center font-bold">{(trx.items || []).reduce((sum: number, i: any) => sum + i.qty, 0)}</td>
                           <td className="p-3 border-r border-gray-300">{trx.customer}</td>
                           <td className="p-3 border-r border-gray-300 text-center">
                             <span className={trx.method === 'TUNAI' ? 'text-green-700 font-bold' : 'text-orange-600 font-bold'}>{trx.method}</span>
                           </td>
                           {filterPaymentMethod !== 'TUNAI' && (
                             <td className="p-3 border-r border-gray-300 text-center text-red-600 font-medium">
                               {calculateJatuhTempo(trx.isoDate, trx.method)}
                             </td>
                           )}
                           <td className="p-3 border-r border-gray-300 text-right font-bold text-blue-800">{formatRp(trx.total)}</td>
                           <td className="p-3 border-r border-gray-300 text-right font-bold text-red-600">{formatRp(trx.returTotal || 0)}</td>
                           <td className="p-3 text-center text-gray-600">{trx.cashier}</td>
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
                               {(trx.items || []).filter((i: any) => i.isReturn).map((item: any, idx: number) => (
                                 <div key={idx}>- {item.name?.replace('(Retur) ', '')} ({item.qty} pcs)</div>
                               ))}
                            </td>
                            <td className="p-3 text-right font-bold text-red-600">
                               {formatRp(trx.returTotal || 0)}
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

    </div>
  );
};
