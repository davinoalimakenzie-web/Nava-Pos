import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp, formatDateDisplay, calculateJatuhTempo } from '../utils';

export const Cashflow = ({ currentTime }: { currentTime: Date }) => {
  const { transactions, expenses, storeSettings } = useAppContext();
  
  const [cashflowTab, setCashflowTab] = useState('harian');
  const [cashflowHarianSubTab, setCashflowHarianSubTab] = useState('laporan');
  
  const [filterUseStart, setFilterUseStart] = useState(true);
  const [filterStartDate, setFilterStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterUseEnd, setFilterUseEnd] = useState(true);
  const [filterEndDate, setFilterEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterBranch, setFilterBranch] = useState('Semua Cabang');

  const filteredTransactions = transactions.filter((t: any) => {
    if (t.type === 'PEMBELIAN') return false; // Exclude from income logic
    if (filterBranch !== 'Semua Cabang' && (t.branch || 'Pusat') !== filterBranch) return false;
    const tDate = new Date(t.isoDate || new Date().toISOString());
    tDate.setHours(0,0,0,0);
    const start = new Date(filterStartDate); start.setHours(0,0,0,0);
    const end = new Date(filterEndDate); end.setHours(0,0,0,0);
    if (filterUseStart && tDate < start) return false;
    if (filterUseEnd && tDate > end) return false;
    return true;
  });

  const filteredExpenses = expenses.filter((e: any) => {
    if (filterBranch !== 'Semua Cabang' && (e.branch || 'Pusat') !== filterBranch) return false;
    const eDate = new Date(e.isoDate || new Date().toISOString());
    eDate.setHours(0,0,0,0);
    const start = new Date(filterStartDate); start.setHours(0,0,0,0);
    const end = new Date(filterEndDate); end.setHours(0,0,0,0);
    if (filterUseStart && eDate < start) return false;
    if (filterUseEnd && eDate > end) return false;
    return true;
  });

  const returTunaiTotal = filteredTransactions.filter((t: any) => t.method === 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);
  const returNonTunaiTotal = filteredTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.returTotal || 0), 0);

  const uangMasukCash = filteredTransactions.filter((t: any) => t.method === 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0); 
  const uangKeluarNonTunai = filteredTransactions.filter((t: any) => t.method !== 'TUNAI').reduce((sum: number, t: any) => sum + (t.total + (t.returTotal || 0)), 0); 
  const totalPengeluaran = filteredExpenses.reduce((sum: number, e: any) => sum + e.amount, 0) + returTunaiTotal;

  const monthlyCashflow = React.useMemo(() => {
    const data: any = {};
    transactions.filter((t:any) => t.type !== 'PEMBELIAN' && (filterBranch === 'Semua Cabang' || (t.branch || 'Pusat') === filterBranch)).forEach(t => {
      const isoMonth = t.isoDate ? t.isoDate.substring(0, 7) : 'Unknown';
      if (!data[isoMonth]) data[isoMonth] = { incomeCash: 0, incomeNonCash: 0, expenses: 0, incomeTotal: 0 };
      
      const grossNet = t.total + (t.returTotal || 0);

      if (t.method === 'TUNAI') {
          data[isoMonth].incomeCash += grossNet;
          data[isoMonth].expenses += (t.returTotal || 0);
      } else {
          data[isoMonth].incomeNonCash += grossNet;
      }
      data[isoMonth].incomeTotal += grossNet;
    });

    expenses.filter((e:any) => filterBranch === 'Semua Cabang' || (e.branch || 'Pusat') === filterBranch).forEach(e => {
      const isoMonth = e.isoDate ? e.isoDate.substring(0, 7) : 'Unknown';
      if (!data[isoMonth]) data[isoMonth] = { incomeCash: 0, incomeNonCash: 0, expenses: 0, incomeTotal: 0 };
      data[isoMonth].expenses += e.amount;
    });

    return Object.keys(data).sort((a,b) => b.localeCompare(a)).map(k => ({
      month: k,
      ...data[k]
    }));
  }, [transactions, expenses, filterBranch]);

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="CASHFLOW & KEUANGAN" currentTime={currentTime} />
      
      {/* Cashflow Top Tabs */}
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10">
         <button onClick={() => setCashflowTab('harian')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'harian' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Cashflow Harian</button>
         <button onClick={() => setCashflowTab('bulanan')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'bulanan' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Cashflow Bulanan</button>
      </div>

      {/* TAB: CASHFLOW HARIAN */}
      {cashflowTab === 'harian' && (
        <div className="p-2 flex flex-col h-full gap-2 overflow-hidden">
          {/* Header Box Dana Laci */}
          <div className="bg-[#000040] p-2 flex gap-4 items-end border border-gray-400 shadow-sm shrink-0">
             <div className="flex flex-col gap-1">
               <label className="text-white text-[10px]">Filter Cabang</label>
               <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="w-[180px] p-1 border outline-none font-bold">
                 <option value="Semua Cabang">Semua Cabang</option>
                 {(storeSettings.branches || ['Pusat']).map((b: string) => <option key={b} value={b}>{b}</option>)}
               </select>
             </div>
            <div className="flex flex-col gap-1">
              <label className="text-white text-[10px]">Dari Tanggal</label>
              <div className="flex items-center gap-1 bg-white px-1.5 py-1 w-[180px]">
                <input type="checkbox" checked={filterUseStart} onChange={e => setFilterUseStart(e.target.checked)} className="w-3 h-3" />
                <div className="relative flex-1 flex items-center bg-white border border-gray-300">
                  <span className="px-1 text-black font-medium truncate flex-1 leading-none py-0.5">
                    {filterUseStart ? formatDateDisplay(filterStartDate) : '-- -- --'}
                  </span>
                  <input type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} disabled={!filterUseStart} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white text-[10px]">Sampai Tanggal</label>
              <div className="flex items-center gap-1 bg-white px-1.5 py-1 w-[180px]">
                <input type="checkbox" checked={filterUseEnd} onChange={e => setFilterUseEnd(e.target.checked)} className="w-3 h-3" />
                <div className="relative flex-1 flex items-center bg-white border border-gray-300">
                  <span className="px-1 text-black font-medium truncate flex-1 leading-none py-0.5">
                    {filterUseEnd ? formatDateDisplay(filterEndDate) : '-- -- --'}
                  </span>
                  <input type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} disabled={!filterUseEnd} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                </div>
              </div>
            </div>
            <div className="ml-auto text-right text-white mr-4">
              <p className="text-[10px] text-blue-200">TOTAL DANA LACI (CASH FISIK)</p>
              <h2 className="text-2xl font-bold text-green-400">{formatRp(uangMasukCash - totalPengeluaran)}</h2>
            </div>
          </div>

          {/* Box Rangkuman */}
          <div className="flex gap-2 shrink-0">
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-gray-500 font-bold mb-1">Total Omset</p>
              <div className="text-sm font-bold text-blue-900">{formatRp(uangMasukCash + uangKeluarNonTunai)}</div>
            </div>
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-green-600 font-bold mb-1">CASH Laci (+)</p>
              <div className="text-sm font-bold text-black">{formatRp(uangMasukCash)}</div>
            </div>
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-orange-600 font-bold mb-1">Piutang/Non-Tunai</p>
              <div className="text-sm font-bold text-black">{formatRp(uangKeluarNonTunai)}</div>
            </div>
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-red-600 font-bold mb-1">Pengeluaran (-)</p>
              <div className="text-sm font-bold text-black">{formatRp(totalPengeluaran)}</div>
            </div>
          </div>

          {/* ROW OF SUB-TAB BUTTONS */}
          <div className="flex gap-1 shrink-0 mt-2 bg-[#ece9d8] p-1 border border-gray-400">
             <button onClick={() => setCashflowHarianSubTab('laporan')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${cashflowHarianSubTab === 'laporan' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Laporan Transaksi</button>
             <button onClick={() => setCashflowHarianSubTab('pengeluaran')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${cashflowHarianSubTab === 'pengeluaran' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Pengeluaran</button>
          </div>

          {/* SUB-TAB CONTENTS (CASHFLOW HARIAN) */}
          <div className="flex-1 bg-white border border-gray-400 overflow-auto shadow-inner flex flex-col relative">
            
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
                        <th className="p-3 border-r border-gray-300 text-center">Jumlah (Pcs)</th>
                        <th className="p-3 border-r border-gray-300">Pelanggan</th>
                        <th className="p-3 border-r border-gray-300 text-center">Metode</th>
                        <th className="p-3 border-r border-gray-300 text-center">Jatuh Tempo</th>
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
                         >
                           <td className="p-3 border-r border-gray-300">{trx.date.split(' ')[0]}</td>
                           <td className="p-3 border-r border-gray-300 font-mono font-bold text-blue-800">{trx.id}</td>
                           <td className="p-3 border-r border-gray-300 text-center font-bold">{trx.items.reduce((sum: number, i: any) => sum + i.qty, 0)}</td>
                           <td className="p-3 border-r border-gray-300">{trx.customer}</td>
                           <td className="p-3 border-r border-gray-300 text-center">
                             <span className={trx.method === 'TUNAI' ? 'text-green-700 font-bold' : 'text-orange-600 font-bold'}>{trx.method}</span>
                           </td>
                           <td className="p-3 border-r border-gray-300 text-center text-red-600 font-medium">
                             {calculateJatuhTempo(trx.isoDate, trx.method)}
                           </td>
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
                        <th className="p-3 border-r border-gray-300 w-1/2">Keterangan Pengeluaran</th>
                        <th className="p-3 border-r border-gray-300 text-center">User (Kasir)</th>
                        <th className="p-3 text-right">Nominal Pengeluaran</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredExpenses.map((exp: any) => (
                         <tr key={exp.id} className="border-b border-gray-200 hover:bg-red-50 text-black">
                            <td className="p-3 border-r border-gray-300">{exp.date} <span className="text-gray-400 font-mono">({exp.id})</span></td>
                            <td className="p-3 border-r border-gray-300 font-bold">{exp.name}</td>
                            <td className="p-3 border-r border-gray-300 text-center">{exp.cashier}</td>
                            <td className="p-3 text-right font-bold text-red-600">-{formatRp(exp.amount)}</td>
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

      {/* TAB: CASHFLOW BULANAN (DUMMY) */}
      {cashflowTab === 'bulanan' && (
         <div className="flex-1 flex flex-col overflow-hidden">
             {/* Styled Header matching image */}
             <div className="bg-[#a8c6e6] p-3 flex justify-between items-start border-b-2 border-blue-400 shadow-sm shrink-0">
                <div className="flex flex-col gap-2 relative z-10 w-[220px]">
                   <div className="flex flex-col gap-1 mb-2">
                     <span className="text-blue-900 text-[11px] uppercase tracking-normal">Filter Cabang</span>
                     <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)} className="w-full px-1 py-0.5 border border-gray-400 outline-none text-black font-medium">
                       <option value="Semua Cabang">Semua Cabang</option>
                       {(storeSettings.branches || ['Pusat']).map((b: string) => <option key={b} value={b}>{b}</option>)}
                     </select>
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-blue-900 text-[11px] uppercase tracking-normal">Mulai Tgl</span>
                     <input type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} className="w-[130px] px-1 py-0.5 border border-gray-400 outline-none text-black font-medium" />
                   </div>
                   <div className="flex items-center justify-between">
                     <span className="text-blue-900 text-[11px] uppercase tracking-normal">S/d Tgl</span>
                     <input type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} className="w-[130px] px-1 py-0.5 border border-gray-400 outline-none text-black font-medium" />
                   </div>
                </div>

                <div className="flex flex-col relative z-10 flex-1 ml-4 justify-center">
                   {/* Elements removed to make it clean */}
                </div>

                <div className="ml-auto w-[350px] flex flex-col pb-2 ml-4 relative z-10">
                   <div className="flex justify-between items-center text-[11px] text-blue-900">
                      <span>PEMASUKAN KAS</span>
                      <span className="font-bold text-sm tracking-wider">{uangMasukCash.toLocaleString('en-US')}</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px] text-blue-900">
                      <span>PENGELUARAN KAS</span>
                      <span className="font-bold text-sm tracking-wider">{totalPengeluaran.toLocaleString('en-US')}</span>
                   </div>
                   <div className="w-full h-[1px] bg-red-500 my-1 relative">
                      <span className="absolute -right-4 -top-3 text-2xl font-bold text-blue-900">-</span>
                   </div>
                   <div className="flex justify-between items-center text-[11px] text-blue-900 mt-1">
                      <span>SALDO (SELISIH)</span>
                      <span className="font-bold text-sm tracking-wider">{((uangMasukCash) - totalPengeluaran).toLocaleString('en-US')}</span>
                   </div>
                </div>
             </div>

             <div className="flex-1 bg-white border border-gray-400 m-2 shadow-inner flex flex-col overflow-auto">
             <table className="w-full text-left border-collapse whitespace-nowrap">
               <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-bold text-blue-900 shadow-sm z-10 text-sm">
                 <tr>
                    <th className="p-3 border-r border-gray-300">Bulan</th>
                    <th className="p-3 border-r border-gray-300 text-right">Omset Total</th>
                    <th className="p-3 border-r border-gray-300 text-right text-green-700">Tunai Masuk</th>
                    <th className="p-3 border-r border-gray-300 text-right text-orange-600">Non-Tunai / Piutang</th>
                    <th className="p-3 border-r border-gray-300 text-right text-red-600">Total Pengeluaran</th>
                    <th className="p-3 text-right text-blue-800">Saldo Akhir Tunai (Laci)</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {monthlyCashflow.length === 0 ? (
                   <tr><td colSpan={6} className="text-center p-10 font-bold text-gray-500">Belum ada data bulanan.</td></tr>
                 ) : (
                   monthlyCashflow.map((m: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer text-black">
                         <td className="p-3 border-r border-gray-300 font-bold">{m.month}</td>
                         <td className="p-3 border-r border-gray-300 text-right font-bold text-blue-800">{formatRp(m.incomeTotal)}</td>
                         <td className="p-3 border-r border-gray-300 text-right font-bold text-green-700">{formatRp(m.incomeCash)}</td>
                         <td className="p-3 border-r border-gray-300 text-right font-bold text-orange-600">{formatRp(m.incomeNonCash)}</td>
                         <td className="p-3 border-r border-gray-300 text-right font-bold text-red-600">-{formatRp(m.expenses)}</td>
                         <td className="p-3 text-right font-bold text-black border-l-2 bg-gray-50">{formatRp(m.incomeCash - m.expenses)}</td>
                      </tr>
                   ))
                 )}
               </tbody>
             </table>
             </div>
         </div>
      )}

    </div>
  );
};
