import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp, formatDateDisplay, calculateJatuhTempo } from '../utils';

export const Cashflow = ({ currentTime }: { currentTime: Date }) => {
  const { transactions, expenses, setExpenses, storeSettings } = useAppContext();
  
  const [cashflowTab, setCashflowTab] = useState('harian');
  const [cashflowHarianSubTab, setCashflowHarianSubTab] = useState('laporan');
  
  const [filterUseStart, setFilterUseStart] = useState(true);
  const [filterStartDate, setFilterStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterUseEnd, setFilterUseEnd] = useState(true);
  const [filterEndDate, setFilterEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterBranch, setFilterBranch] = useState('Semua Cabang');

  const [filterPaymentMethod, setFilterPaymentMethod] = useState('Semua');
  const [searchNota, setSearchNota] = useState('');
  
  const filteredTransactions = transactions.filter((t: any) => {
    if (t.type === 'PEMBELIAN') return false; // Exclude from income logic
    if (filterBranch !== 'Semua Cabang' && (t.branch || 'Pusat') !== filterBranch) return false;
    
    if (filterPaymentMethod === 'TUNAI' && t.method !== 'TUNAI') return false;
    if (filterPaymentMethod === 'NON-TUNAI' && t.method === 'TUNAI') return false;
    
    if (searchNota && !t.id.toLowerCase().includes(searchNota.toLowerCase())) return false;

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
  
  const totalPengeluaran = filteredExpenses.filter((e: any) => e.amount > 0).reduce((sum: number, e: any) => sum + e.amount, 0) + returTunaiTotal;

  const monthlyCashflow = React.useMemo(() => {
    const data: any = {};
    filteredTransactions.forEach(t => {
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

    filteredExpenses.forEach(e => {
      const isoMonth = e.isoDate ? e.isoDate.substring(0, 7) : 'Unknown';
      if (!data[isoMonth]) data[isoMonth] = { incomeCash: 0, incomeNonCash: 0, expenses: 0, incomeTotal: 0 };
      if (e.amount > 0) {
        data[isoMonth].expenses += e.amount;
      }
    });

    return Object.keys(data).sort((a,b) => b.localeCompare(a)).map(k => ({
      month: k,
      ...data[k]
    }));
  }, [filteredTransactions, filteredExpenses]);

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="CASHFLOW & KEUANGAN" currentTime={currentTime} />
      
      {/* Cashflow Top Tabs */}
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10">
         <button onClick={() => setCashflowTab('harian')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'harian' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Cashflow Harian</button>
         <button onClick={() => setCashflowTab('bulanan')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${cashflowTab === 'bulanan' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Cashflow Bulanan</button>
      </div>

      {/* Header Filter Baru (Sesuai Gambar) - Global for Both Tabs */}
      <div className="bg-[#000040] p-1.5 flex items-end gap-2 shrink-0 shadow-sm border-b border-[#000030]">
         {/* Dari Tanggal */}
         <div className="flex flex-col gap-0.5 text-white flex-1">
            <label className="text-[12px] font-medium">Dari Tanggal</label>
            <div className="flex items-center gap-1 bg-white px-1 rounded-sm h-[28px]">
               <input type="checkbox" checked={filterUseStart} onChange={e => setFilterUseStart(e.target.checked)} className="w-3.5 h-3.5 cursor-pointer shrink-0" />
               <input type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} disabled={!filterUseStart} className="text-black outline-none w-full font-medium text-[13px] bg-transparent disabled:opacity-50" />
            </div>
         </div>
         {/* Sampai Tanggal */}
         <div className="flex flex-col gap-0.5 text-white flex-1">
            <label className="text-[12px] font-medium">Sampai Tanggal</label>
            <div className="flex items-center gap-1 bg-white px-1 rounded-sm h-[28px]">
               <input type="checkbox" checked={filterUseEnd} onChange={e => setFilterUseEnd(e.target.checked)} className="w-3.5 h-3.5 cursor-pointer shrink-0" />
               <input type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} disabled={!filterUseEnd} className="text-black outline-none w-full font-medium text-[13px] bg-transparent disabled:opacity-50" />
            </div>
         </div>
         {/* Jenis (Teknisi) */}
         <div className="flex flex-col gap-0.5 text-white flex-1">
            <label className="text-[12px] font-medium">Jenis</label>
            <select value={cashflowHarianSubTab} onChange={e => setCashflowHarianSubTab(e.target.value)} className="bg-white text-black outline-none px-1 w-full font-medium text-[13px] rounded-sm h-[28px]">
               <option value="laporan">Laporan Transaksi</option>
               <option value="pengeluaran">Pengeluaran</option>
               <option value="return">Return</option>
            </select>
         </div>
         {/* Cabang (Status) */}
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
         {/* No Nota & Search / Export CSV */}
         <div className="flex flex-col gap-0.5 text-white flex-1 justify-end">
            {cashflowTab === 'harian' ? (
              <>
                <label className="text-[12px] font-medium">No. Nota</label>
                <div className="flex items-center gap-1">
                   <input type="text" value={searchNota} onChange={e => setSearchNota(e.target.value)} className="bg-white text-black px-2 w-full font-medium text-[13px] outline-none rounded-sm h-[28px]" />
                   <button className="bg-white text-black px-4 font-bold text-[13px] border border-gray-300 rounded-sm shadow-sm hover:bg-gray-200 h-[28px]">CARI</button>
                </div>
              </>
            ) : (
                <button onClick={() => {
                   const rows = [
                       ['Bulan', 'Omset Total', 'Tunai Masuk', 'Non-Tunai / Piutang', 'Total Pengeluaran', 'Saldo Akhir Tunai (Laci)'],
                       ...monthlyCashflow.map((m: any) => [
                           m.month, 
                           (m.incomeTotal).toString(), 
                           (m.incomeCash).toString(), 
                           (m.incomeNonCash).toString(), 
                           (m.expenses).toString(), 
                           (m.incomeCash - m.expenses).toString()
                       ])
                   ];
                   const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
                   const encodedUri = encodeURI(csvContent);
                   const link = document.createElement("a");
                   link.setAttribute("href", encodedUri);
                   link.setAttribute("download", `laporan_bulanan_${new Date().getTime()}.csv`);
                   document.body.appendChild(link);
                   link.click();
                   document.body.removeChild(link);
               }} className="bg-white text-black hover:bg-gray-200 font-bold px-4 shadow-sm border border-gray-300 rounded-sm text-[13px] h-[28px] w-full">
                   Export CSV
               </button>
            )}
         </div>
      </div>

      {/* TAB: CASHFLOW HARIAN */}
      {cashflowTab === 'harian' && (
        <div className="p-[2px] flex flex-col h-full gap-[2px] overflow-hidden">


          {/* Box Rangkuman */}
          <div className="flex gap-[2px] shrink-0">
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-gray-800 font-bold mb-1 text-[13px]">Total Omset</p>
              <div className="text-[15px] font-bold text-black">{formatRp(uangMasukCash + uangKeluarNonTunai)}</div>
            </div>
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-gray-800 font-bold mb-1 text-[13px]">Total Retur</p>
              <div className="text-[15px] font-bold text-black">{formatRp(returTunaiTotal + returNonTunaiTotal)}</div>
            </div>
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-gray-800 font-bold mb-1 text-[13px]">CASH Laci (+)</p>
              <div className="text-[15px] font-bold text-black">{formatRp(uangMasukCash)}</div>
            </div>
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-gray-800 font-bold mb-1 text-[13px]">Piutang/Non-Tunai</p>
              <div className="text-[15px] font-bold text-black">{formatRp(uangKeluarNonTunai)}</div>
            </div>
            <div className="bg-white border border-gray-400 p-2 flex-1 shadow-sm">
              <p className="text-gray-800 font-bold mb-1 text-[13px]">Pengeluaran (-)</p>
              <div className="text-[15px] font-bold text-black">{formatRp(totalPengeluaran)}</div>
            </div>
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
                         >
                           <td className="p-3 border-r border-gray-300">{trx.date.split(' ')[0]}</td>
                           <td className="p-3 border-r border-gray-300 font-mono font-bold text-blue-800">{trx.id}</td>
                           <td className="p-3 border-r border-gray-300 text-center font-bold">{trx.items.reduce((sum: number, i: any) => sum + i.qty, 0)}</td>
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
                               {trx.items.filter((i: any) => i.isReturn).map((item: any, idx: number) => (
                                 <div key={idx}>- {item.name.replace('(Retur) ', '')} ({item.qty} pcs)</div>
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

      {/* TAB: CASHFLOW BULANAN (DUMMY) */}
      {cashflowTab === 'bulanan' && (
         <div className="flex-1 flex flex-col overflow-hidden">
             <div className="flex-1 bg-white border border-gray-400 m-[2px] shadow-inner flex flex-col overflow-auto">
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
