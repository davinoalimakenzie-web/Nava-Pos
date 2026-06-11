import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp, calculateJatuhTempo } from '../utils';

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

  // Promo Calculation
  const currentMonthIdx = new Date().getMonth();
  const currentYearVal = new Date().getFullYear();
  const customerPromoData = (customers || []).map((c: any) => {
    const total = transactions.filter((t: any) => {
      if (t.customer !== c.name) return false;
      if (t.id.includes('PLN') || t.method === 'RETUR') return false;
      const tDate = new Date(t.isoDate || t.date);
      return tDate.getMonth() === currentMonthIdx && tDate.getFullYear() === currentYearVal;
    }).reduce((sum: number, t: any) => sum + (t.total || 0), 0);
    return { name: c.name, total, memberType: c.level === 2 ? 'Grosir' : 'Ecer', phone: c.phone || '-' };
  }).filter((c: any) => c.total > 0).sort((a: any, b: any) => b.total - a.total);
  
  const filteredTransactions = transactions.filter((t: any) => {
    if (t.type === 'PEMBELIAN') return false; // Exclude from income logic
    const txBranch = t.branch || (t.cashier?.includes('Pati') ? 'Pati' : 'Kudus');
    if (filterBranch !== 'Semua Cabang' && txBranch !== filterBranch) return false;
    
    if (filterPaymentMethod === 'TUNAI' && t.method !== 'TUNAI') return false;
    if (filterPaymentMethod === 'NON-TUNAI' && t.method === 'TUNAI') return false;
    
    if (searchNota && !t.id.toLowerCase().includes(searchNota.toLowerCase())) return false;

    const tDate = new Date(t.isoDate || new Date().toISOString());
    tDate.setHours(0,0,0,0);
    
    // Safely parse YYYY-MM-DD to local date
    const [sY, sM, sD] = filterStartDate.split('-');
    const start = new Date(parseInt(sY), parseInt(sM) - 1, parseInt(sD), 0, 0, 0, 0);
    
    const [eY, eM, eD] = filterEndDate.split('-');
    const end = new Date(parseInt(eY), parseInt(eM) - 1, parseInt(eD), 0, 0, 0, 0);

    if (filterUseStart && tDate < start) return false;
    if (filterUseEnd && tDate > end) return false;
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

  const returTunaiTotal = filteredTransactions.filter((t: any) => t.method === 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const returNonTunaiTotal = filteredTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);

  const uangKeluarNonTunai = filteredTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0); 
  
  const totalPengeluaran = filteredExpenses.filter((e: any) => e.amount > 0).reduce((sum: number, e: any) => sum + e.amount, 0) + returTunaiTotal;

  const outBulananVal = expenses.filter((e: any) => {
    if (e.wallet !== 'Dana Bebas' && e.name !== 'Setoran Tunai' && !e.name?.includes('Pelunasan') && !e.name?.includes('Gaji') && !e.name?.includes('Prive')) {
        if (e.wallet !== 'Dana Bebas') return false; 
    }
    if (e.wallet !== 'Dana Bebas') return false;
    const eDate = new Date(e.isoDate || e.date || new Date().toISOString());
    const targetDate = new Date(); // bulanan implies current month
    return eDate.getMonth() === targetDate.getMonth() && eDate.getFullYear() === targetDate.getFullYear();
  }).reduce((sum: number, e: any) => sum + (e.amount > 0 ? e.amount : 0), 0);

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="CASHFLOW & KEUANGAN" currentTime={currentTime} />
      
      {/* Cashflow Top Tabs - Perfectly flush back-to-back with window header */}
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] px-1 pt-1 border-b border-gray-400 shadow-sm z-10 overflow-x-auto no-scrollbar">
         <button onClick={() => setCashflowTab('harian')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'harian' ? 'bg-white border-b-transparent text-blue-900' : 'bg-gray-200 text-black'}`}>Cashflow Harian</button>
         <button onClick={() => setCashflowTab('dana_bebas')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'dana_bebas' ? 'bg-white border-b-transparent text-blue-900' : 'bg-gray-200 text-black'}`}>Dana Bebas</button>
         <button onClick={() => setCashflowTab('promo')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'promo' ? 'bg-white border-b-transparent text-blue-900' : 'bg-gray-200 text-black'}`}>Promo</button>
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
        <div className="p-2 flex-1 min-w-[125px] bg-white hover:bg-gray-50 transition-colors">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Total Retur (Harian)</p>
          <div className="text-[14px] font-black text-red-600">{formatRp(returTunaiTotal + returNonTunaiTotal)}</div>
        </div>
        <div className="p-2 flex-1 min-w-[125px] bg-white hover:bg-gray-50 transition-colors">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Bulanan</p>
          <div className="text-[14px] font-black text-orange-600">{formatRp(outBulananVal)}</div>
        </div>
        <div className="p-2 flex-1 min-w-[125px] bg-[#fcfcfc] hover:bg-gray-50 transition-colors">
          <p className="text-gray-500 font-bold mb-0.5 text-[10px] uppercase tracking-wider whitespace-nowrap">Out Harian</p>
          <div className="text-[14px] font-black text-black">{formatRp(totalPengeluaran)}</div>
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
                    <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-blue-900 shadow-sm z-10 text-sm">
                      <tr>
                        <th className="p-3 border-r border-gray-300">Tanggal</th>
                        <th className="p-3 border-r border-gray-300">Faktur</th>
                        <th className="p-3 border-r border-gray-300 text-center">Qty</th>
                        <th className="p-3 border-r border-gray-300">Pelanggan</th>
                        <th className="p-3 border-r border-gray-300 text-center">Metode</th>
                        {filterPaymentMethod !== 'TUNAI' && <th className="p-3 border-r border-gray-300 text-center">Jatuh Tempo</th>}
                        <th className="p-3 border-r border-gray-300 text-right">Total Harga</th>
                        <th className="p-3 border-r border-gray-300 text-right text-red-600">Retur Rp</th>
                        <th className="p-3 text-center">User</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredTransactions.slice(0, 100).map((trx: any) => (
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
                    <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-red-800 shadow-sm z-10 text-sm">
                      <tr>
                        <th className="p-3 border-r border-gray-300 w-1/4">Waktu / ID</th>
                        <th className="p-3 border-r border-gray-300 w-1/3">Keterangan Pengeluaran</th>
                        <th className="p-3 border-r border-gray-300 text-center">Sumber Dana</th>
                        <th className="p-3 border-r border-gray-300 text-center">User (Kasir)</th>
                        <th className="p-3 text-right">Nominal Pengeluaran</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredExpenses.map((exp: any) => (
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
                {filteredTransactions.filter((t: any) => t.returTotal > 0 || (t.items && t.items.some((i: any) => i.isReturn))).length === 0 ? (
                  <div className="text-center text-gray-500 p-10 font-bold text-lg">Tidak ada data retur pada rentang waktu ini.</div>
                ) : (
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-blue-900 shadow-sm z-10 text-sm">
                      <tr>
                        <th className="p-3 border-r border-gray-300 w-1/4">ID Transaksi / Waktu</th>
                        <th className="p-3 border-r border-gray-300">Customer</th>
                        <th className="p-3 border-r border-gray-300 w-1/2">Item Retur</th>
                        <th className="p-3 text-right">Nilai Retur</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredTransactions.filter((t: any) => t.returTotal > 0 || (t.items && t.items.some((i: any) => i.isReturn))).map((trx: any) => (
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

      {/* TAB: PROMO */}
      {cashflowTab === 'promo' && (
         <div className="flex-1 flex flex-col overflow-hidden">
             <div className="bg-yellow-50 p-2.5 border-b border-yellow-250 text-yellow-905 text-xs shrink-0 font-medium">
                <p><strong>Info Promo:</strong> Menampilkan total belanja pelanggan bulan ini. Pelanggan yang mencapai omzet Rp 5.000.000 berhak mendapatkan cashback 5% (potongan yang wajib dibelanjakan). Promo aktif ketika kasir menekan tombol "Promo" saat bertransaksi dengan pelanggan tersebut.</p>
             </div>
             <div className="flex-1 bg-white flex flex-col overflow-auto">
             <table className="w-full text-left border-collapse whitespace-nowrap">
               <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-blue-900 shadow-sm z-10 text-sm">
                 <tr>
                    <th className="p-3 border-r border-gray-300">Nama Pelanggan</th>
                    <th className="p-3 border-r border-gray-300">No. WA</th>
                    <th className="p-3 border-r border-gray-300">Tipe Pelanggan</th>
                    <th className="p-3 border-r border-gray-300 text-right">Total Transaksi Bulan Ini</th>
                    <th className="p-3 text-center">Status Promo</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {customerPromoData.length === 0 ? (
                   <tr><td colSpan={5} className="text-center p-10 font-bold text-gray-500">Belum ada transaksi bulan ini.</td></tr>
                 ) : (
                   customerPromoData.map((c: any, idx: number) => {
                      const isEligible = c.total >= 5000000;
                      return (
                      <tr key={idx} className={`border-b border-gray-200 cursor-pointer text-black ${isEligible ? 'bg-green-50 hover:bg-green-100' : 'hover:bg-blue-50'}`}>
                         <td className="p-3 border-r border-gray-300 font-bold">{c.name}</td>
                         <td className="p-3 border-r border-gray-300">{c.phone}</td>
                         <td className="p-3 border-r border-gray-300">{c.memberType}</td>
                         <td className="p-3 border-r border-gray-300 text-right font-bold text-blue-800">{formatRp(c.total)}</td>
                         <td className="p-3 text-center font-bold">
                             {isEligible ? (
                                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs shadow-sm">Memenuhi Syarat 5 Juta</span>
                             ) : (
                                <span className="text-gray-500">Belum Memenuhi</span>
                             )}
                         </td>
                      </tr>
                      );
                   })
                 )}
               </tbody>
             </table>
             </div>
         </div>
      )}

    </div>
  );
};
