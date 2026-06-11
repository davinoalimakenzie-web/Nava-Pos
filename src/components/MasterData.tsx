import React, { useState } from 'react';
import { ArrowLeftRight, Truck, Clock, Database, DownloadCloud, UploadCloud, History, Trash2, AlertTriangle, FileJson, RotateCcw, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp, formatDateDisplay } from '../utils';
import { currentMonthStr, defaultDate } from '../data';

export const MasterData = ({ currentTime }: { currentTime: Date }) => {
  const { 
    inventory, setInventory, customers, setCustomers, orderData, setOrderData, masterDataTab, setMasterDataTab,
    setShowAddCustomerModal, suppliers, setSuppliers, supplierReturns, setSupplierReturns, storeSettings,
    employees, setEmployees, attendances, setAttendances, leaveRequests, setLeaveRequests,
    transactions, setTransactions, expenses, setExpenses, piutangData, setPiutangData,
    pendingTransactions, setPendingTransactions, appUsers, setAppUsers, setStoreSettings,
    hutangSupplier, setHutangSupplier
  } = useAppContext();

  const [opnameInputs, setOpnameInputs] = useState<Record<string, number>>({});
  const [orderChecklist, setOrderChecklist] = useState<Record<string, boolean>>({});
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddHutangModal, setShowAddHutangModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedHutang, setSelectedHutang] = useState<any>(null);
  
  const [newStock, setNewStock] = useState({code: '', name: '', category: 'UMUM', supplierPrice: 0, price1: 0, price2: 0, stock: 0});
  const [newSupplier, setNewSupplier] = useState({name: '', contact: '', address: ''});
  const [newHutang, setNewHutang] = useState({nota: '', supplier_id: '', supplier_nama: '', tanggal_beli: '', tanggal_jatuh_tempo: '', nilai: ''});
  const [paymentAmount, setPaymentAmount] = useState('');

  // Backup & Restore states
  const [snapshots, setSnapshots] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('POS_Snapshots');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [uploadedFileStats, setUploadedFileStats] = useState<any | null>(null);
  const [uploadedFileData, setUploadedFileData] = useState<any | null>(null);
  const [resetInput, setResetInput] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="MASTER DATA" currentTime={currentTime} />
      
      {/* Master Data Top Tabs */}
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10 overflow-x-auto no-scrollbar">
         <button onClick={() => setMasterDataTab('stock')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${masterDataTab === 'stock' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Master Stock</button>
         <button onClick={() => setMasterDataTab('opname')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${masterDataTab === 'opname' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Stock Opname</button>
         <button onClick={() => setMasterDataTab('order')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${masterDataTab === 'order' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Order Stock</button>
         <button onClick={() => setMasterDataTab('return')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${masterDataTab === 'return' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Retur Supliyer</button>
         <button onClick={() => setMasterDataTab('hutang')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${masterDataTab === 'hutang' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Hutang Supplier</button>
      </div>

      <div className="p-2 flex flex-col h-full gap-2 overflow-y-auto">
        <div className="flex-1 bg-white border border-gray-400 overflow-auto shadow-inner flex flex-col relative">
          
          {/* SUB TAB: MASTER STOCK */}
          {masterDataTab === 'stock' && (
            <div className="flex flex-col h-full">
              <div className="flex justify-center items-center bg-[#ece9d8] border-b border-gray-400 p-2 shadow-sm sticky top-0 z-20">
                <span className="font-bold text-center w-full">Master Stock</span>
              </div>
              {showAddStockModal && (
                 <div className="bg-[#ece9d8] border border-gray-400 p-3 flex flex-wrap gap-2 items-end mb-2 shadow-sm rounded-sm m-2">
                    <div className="flex flex-col gap-1 w-24">
                        <label className="text-xs font-bold text-gray-700">Kode Barang:</label>
                        <input className="border border-gray-400 p-1 w-full" value={newStock.code} onChange={e => setNewStock({...newStock, code: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
                        <label className="text-xs font-bold text-gray-700">Nama Barang:</label>
                        <input className="border border-gray-400 p-1 w-full" value={newStock.name} onChange={e => setNewStock({...newStock, name: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1 w-24">
                        <label className="text-xs font-bold text-gray-700">Kategori:</label>
                        <input className="border border-gray-400 p-1 w-full" value={newStock.category} onChange={e => setNewStock({...newStock, category: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-xs font-bold text-gray-700">Harga Supliyer:</label>
                        <input type="number" className="border border-gray-400 p-1 w-full" value={newStock.supplierPrice || ''} onChange={e => {
                            const val = parseInt(e.target.value) || 0;
                            const margin1 = storeSettings?.margins?.[newStock.category]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                            const margin2 = storeSettings?.margins?.[newStock.category]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                            setNewStock({...newStock, supplierPrice: val, price1: Math.round(val * (1 + margin1/100)), price2: Math.round(val * (1 + margin2/100))});
                        }} />
                    </div>
                    <div className="flex flex-col gap-1 w-16">
                        <label className="text-xs font-bold text-gray-700">Stok:</label>
                        <input type="number" className="border border-gray-400 p-1 w-full" value={newStock.stock || ''} onChange={e => setNewStock({...newStock, stock: parseInt(e.target.value) || 0})} />
                    </div>
                    <button onClick={() => {
                        if (!newStock.name) return alert('Nama barang wajib diisi!');
                        
                        // Recalculate based on latest category just in case
                        const val = newStock.supplierPrice || 0;
                        const margin1 = storeSettings?.margins?.[newStock.category]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                        const margin2 = storeSettings?.margins?.[newStock.category]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                        const p1 = Math.round(val * (1 + margin1/100));
                        const p2 = Math.round(val * (1 + margin2/100));

                        setInventory([...inventory, { id: Date.now().toString(), name: newStock.name, code: newStock.code, category: newStock.category, price1: p1, price2: p2, stock: newStock.stock }]);
                        setNewStock({code: '', name: '', category: 'UMUM', supplierPrice: 0, price1: 0, price2: 0, stock: 0});
                        setShowAddStockModal(false);
                    }} className="bg-green-600 text-white font-bold py-1.5 px-4 shadow hover:bg-green-700">Simpan</button>
                    <button onClick={() => setShowAddStockModal(false)} className="bg-gray-400 text-white font-bold py-1.5 px-4 shadow hover:bg-gray-500">Batal</button>
                 </div>
              )}
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-slate-50 border-b-2 border-gray-400 font-normal">
                  <tr><th className="p-2 border-r border-gray-300">Kode</th><th className="p-2 border-r border-gray-300">Nama Barang</th><th className="p-2 border-r border-gray-300">Kategori</th><th className="p-2 border-r border-gray-300 text-right">Harga Lvl 1</th><th className="p-2 border-r border-gray-300 text-right">Harga Lvl 2</th><th className="p-2 border-r border-gray-300 text-center">Stok</th></tr>
                </thead>
                <tbody>
                  {inventory.map((item: any) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-2 border-r border-gray-300">{item.code}</td><td className="p-2 border-r border-gray-300 font-bold">{item.name}</td><td className="p-2 border-r border-gray-300">{item.category || '-'}</td><td className="p-2 border-r border-gray-300 text-right">{formatRp(item.price1)}</td><td className="p-2 border-r border-gray-300 text-right">{formatRp(item.price2)}</td><td className={`p-2 border-r border-gray-300 text-center font-bold text-sm ${item.stock <= 2 ? 'text-red-600' : 'text-black'}`}>{item.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SUB TAB: STOCK OPNAME */}
          {masterDataTab === 'opname' && (
            <div className="flex flex-col h-full">
              <div className="bg-[#ece9d8] border-b border-gray-400 p-2 font-bold sticky top-0 z-20">Sesuaikan Fisik Gudang & Sistem</div>
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-slate-50 border-b-2 border-gray-400 font-normal">
                  <tr><th className="p-2 border-r border-gray-300">Kode</th><th className="p-2 border-r border-gray-300">Nama Barang</th><th className="p-2 border-r border-gray-300 text-center">Stok Sistem</th><th className="p-2 border-r border-gray-300 text-center">Fisik Aktual</th><th className="p-2 text-center">Aksi</th></tr>
                </thead>
                <tbody>
                  {inventory.map((item: any) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50">
                      <td className="p-2 border-r border-gray-300">{item.code}</td><td className="p-2 border-r border-gray-300 font-bold">{item.name}</td><td className="p-2 border-r border-gray-300 text-center font-bold text-sm">{item.stock}</td>
                      <td className="p-2 border-r border-gray-300 text-center">
                        <input type="number" value={opnameInputs[item.id] !== undefined ? opnameInputs[item.id] : ''} onChange={e => setOpnameInputs({...opnameInputs, [item.id]: parseInt(e.target.value) || 0})} className="w-24 border border-gray-400 p-1 text-center font-bold outline-none focus:border-blue-500" placeholder={item.stock} />
                      </td>
                      <td className="p-2 text-center"><button onClick={() => {
                          if (opnameInputs[item.id] !== undefined) {
                              setInventory(inventory.map((i:any) => i.id === item.id ? { ...i, stock: opnameInputs[item.id] } : i));
                              const newInputs = {...opnameInputs};
                              delete newInputs[item.id];
                              setOpnameInputs(newInputs);
                          }
                      }} className={`px-3 py-1 font-bold shadow border ${opnameInputs[item.id] !== undefined && opnameInputs[item.id] !== item.stock ? 'bg-green-600 text-white border-green-800 hover:bg-green-700' : 'bg-gray-200 border-gray-500 hover:bg-gray-300'}`}>Update</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

           {/* SUB TAB: ORDER STOCK (PO) */}
           {masterDataTab === 'order' && (
            <div className="flex flex-col h-full bg-white p-4">
               <div className="flex justify-between items-center mb-2 border-b pb-2">
                 <h3 className="font-bold text-lg text-blue-900">Daftar Order Supliyer</h3>
                 <button onClick={() => {
                     const checkedIds = Object.keys(orderChecklist).filter(id => orderChecklist[id]);
                     if (checkedIds.length === 0) return alert('Pilih minimal satu barang dengan mencentang checkbox untuk diorder!');
                     setOrderData(orderData.map((o:any) => checkedIds.includes(o.id) ? { ...o, status: 'sending' } : o));
                     setOrderChecklist({});
                     alert('Data berhasil diexport ke Excel & pesan dikirim ke Supliyer!');
                 }} className="bg-green-600 text-white px-4 py-1.5 shadow font-bold hover:bg-green-700 rounded-sm">Export to Excel</button>
               </div>
               {orderData.filter((o: any) => o.sisaStock <= 2).length === 0 ? (
                   <p className="text-gray-500 italic mt-2">Tidak ada barang yang perlu diorder saat ini (Stok Aman).</p>
               ) : (
                   <table className="w-full text-left border-collapse whitespace-nowrap mt-2 border border-gray-400 shadow-sm">
                      <thead className="bg-[#ece9d8] border-b-2 border-gray-400 font-normal">
                        <tr><th className="p-2 border-r border-gray-300">No PO / Tgl</th><th className="p-2 border-r border-gray-300">Supliyer</th><th className="p-2 border-r border-gray-300">Item</th><th className="p-2 border-r border-gray-300 text-center">Sisa Stok</th><th className="p-2 border-r border-gray-300 text-center">Target Order</th><th className="p-2 border-r border-gray-300 text-center">Status</th><th className="p-2 text-center">Aksi</th></tr>
                      </thead>
                      <tbody>
                        {orderData.filter((o: any) => o.sisaStock <= 2).map((o: any) => (
                           <tr key={o.id} className="border-b border-gray-200 hover:bg-blue-50">
                              <td className="p-2 border-r border-gray-300 font-bold">{o.id}<br/><span className="text-[10px] text-gray-500 font-normal">{o.date}</span></td>
                              <td className="p-2 border-r border-gray-300 font-bold text-blue-800">{o.supplier}</td>
                              <td className="p-2 border-r border-gray-300">{o.item}</td>
                              <td className="p-2 border-r border-gray-300 text-center font-bold text-lg text-red-600">{o.sisaStock} Pcs</td>
                              <td className="p-2 border-r border-gray-300 text-center">
                                <input type="number" value={o.targetOrder} onChange={() => {}} className="w-16 border border-gray-400 text-center font-bold outline-none focus:border-blue-500" /> Pcs
                              </td>
                              <td className="p-2 border-r border-gray-300 text-center"><span className="bg-yellow-200 text-yellow-800 px-3 py-1 font-bold rounded-sm border border-yellow-400">{o.status}</span></td>
                              <td className="p-2 text-center">
                                 <input type="checkbox" checked={!!orderChecklist[o.id]} onChange={e => setOrderChecklist({...orderChecklist, [o.id]: e.target.checked})} className="w-5 h-5 cursor-pointer accent-blue-600" />
                              </td>
                           </tr>
                        ))}
                      </tbody>
                   </table>
               )}
            </div>
          )}

          {/* SUB TAB: STOCK RETURN */}
          {masterDataTab === 'return' && (
            <div className="flex flex-col h-full bg-white p-4">
              <h3 className="font-bold text-lg mb-2 text-blue-900 border-b pb-2">Retur Barang Ke Supliyer</h3>
              <div className="bg-[#f9fafb] p-3 border border-gray-400 font-bold flex gap-4 text-sm mb-4 items-end rounded shadow-sm">
                 <div className="flex-1 flex flex-col gap-1">
                    <label>Pilih Barang:</label>
                    <select className="border-gray-400 border p-1" id="returBarangId">
                       <option value="">-- Barang --</option>
                       {inventory.map((i: any) => <option key={i.id} value={i.id}>{i.code} - {i.name} (Stok: {i.stock})</option>)}
                    </select>
                 </div>
                 <div className="flex flex-col gap-1 w-32">
                    <label>Qty Rusak:</label>
                    <input type="number" id="returQty" min="1" defaultValue="1" className="border-gray-400 border p-1" />
                 </div>
                 <div className="flex-1 flex flex-col gap-1">
                    <label>Kendala:</label>
                    <input type="text" id="returKendala" className="border-gray-400 border p-1" placeholder="Misal: Kemasan rusak" />
                 </div>
                 <div className="flex-1 flex flex-col gap-1">
                    <label>Pilih Supliyer:</label>
                    <select className="border-gray-400 border p-1" id="returSupliyerId">
                       <option value="">-- Supliyer --</option>
                       {suppliers?.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                 </div>
                 <button className="bg-red-600 text-white px-4 py-1.5 shadow font-bold hover:bg-red-700 h-[30px]" onClick={() => {
                    const idBarang = (document.getElementById('returBarangId') as HTMLSelectElement).value;
                    const qty = parseInt((document.getElementById('returQty') as HTMLInputElement).value);
                    const idSup = (document.getElementById('returSupliyerId') as HTMLSelectElement).value;
                    const kendala = (document.getElementById('returKendala') as HTMLInputElement).value;
                    if (!idBarang || !qty || !idSup) return alert('Lengkapi data!');
                    
                    const item = inventory.find((i:any) => String(i.id) === idBarang);
                    if (!item) return alert('Barang tidak ditemukan!');
                    if (item.stock < qty) return alert('Stok tidak cukup untuk diretur!');
                    
                    const sup = suppliers.find((s:any) => String(s.id) === idSup);
                    setInventory(inventory.map((i:any) => String(i.id) === idBarang ? { ...i, stock: i.stock - qty } : i));
                    
                    setSupplierReturns([...(supplierReturns || []), {
                       id: 'RTS-' + Date.now().toString().slice(-6),
                       date: new Date().toLocaleDateString('id-ID'),
                       itemName: item.name,
                       qty,
                       kendala,
                       supplierName: sup.name,
                       status: 'Proses'
                    }]);
                    alert('Barang berhasil diretur ke supliyer & stok dikurangi!');
                 }}>Proses Retur</button>
              </div>

              <h3 className="font-bold border-b pb-1">Riwayat Retur ke Supliyer</h3>
              <table className="w-full text-left border-collapse whitespace-nowrap border border-gray-400 mt-2">
                 <thead className="bg-[#ece9d8] border-b-2 border-gray-400 font-bold text-sm">
                    <tr><th className="p-2 border-r border-gray-300">ID Retur</th><th className="p-2 border-r border-gray-300">Tanggal</th><th className="p-2 border-r border-gray-300">Supliyer</th><th className="p-2 border-r border-gray-300">Barang Rusak</th><th className="p-2 border-r border-gray-300">Kendala</th><th className="p-2 border-r border-gray-300 text-center">Qty</th><th className="p-2 border-gray-300 text-center">Status</th></tr>
                 </thead>
                 <tbody className="text-sm">
                    {supplierReturns.length === 0 ? (
                       <tr><td colSpan={7} className="text-center p-4 italic text-gray-500">Belum ada data retur.</td></tr>
                    ) : (
                       supplierReturns.map((r: any) => (
                          <tr key={r.id} className="border-b border-gray-300 hover:bg-gray-100">
                             <td className="p-2 border-r border-gray-300 font-mono font-bold text-red-700">{r.id}</td>
                             <td className="p-2 border-r border-gray-300">{r.date}</td>
                             <td className="p-2 border-r border-gray-300">{r.supplierName}</td>
                             <td className="p-2 border-r border-gray-300">{r.itemName}</td>
                             <td className="p-2 border-r border-gray-300 text-gray-600 whitespace-normal min-w-[200px]">{r.kendala || '-'}</td>
                             <td className="p-2 border-r border-gray-300 text-center font-bold text-red-600">-{r.qty} Pcs</td>
                             <td className="p-2 text-center">
                                 <select value={r.status} onChange={e => {
                                     setSupplierReturns(supplierReturns.map((sr:any) => sr.id === r.id ? {...sr, status: e.target.value} : sr));
                                 }} className="border border-gray-400 p-1 text-xs font-bold outline-none bg-orange-50 text-orange-800">
                                     <option value="Proses">Proses</option>
                                     <option value="Potong Nota">Potong Nota</option>
                                     <option value="Ganti Barang">Ganti Barang</option>
                                     <option value="Selesai">Selesai</option>
                                 </select>
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
              </table>
            </div>
          )}

          {/* SUB TAB: DATA PELANGGAN */}
          {/* SUB TAB: HUTANG SUPPLIER */}
          {masterDataTab === 'hutang' && (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center bg-[#ece9d8] border-b border-gray-400 p-2 shadow-sm sticky top-0 z-20">
                <span className="font-bold">Manajemen Hutang Supplier</span>
                <button className="bg-gray-200 border border-gray-500 px-3 py-1 font-bold shadow hover:bg-gray-300" onClick={() => setShowAddHutangModal(true)}>+ Catat Hutang Baru</button>
              </div>
              {showAddHutangModal && (
                 <div className="bg-[#ece9d8] border border-gray-400 p-3 flex flex-wrap gap-2 items-end mb-2 shadow-sm rounded-sm m-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">No. Nota:</label>
                        <input className="border border-gray-400 p-1 w-24" value={newHutang.nota} onChange={e => setNewHutang({...newHutang, nota: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-xs font-bold text-gray-700">Supplier:</label>
                        <select className="border border-gray-400 p-1 w-full" value={newHutang.supplier_id} onChange={e => {
                            const sup = suppliers.find((s: any) => String(s.id) === e.target.value);
                            setNewHutang({...newHutang, supplier_id: e.target.value, supplier_nama: sup?.name || ''});
                        }}>
                            <option value="">-- Pilih --</option>
                            {suppliers?.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">Tgl Beli:</label>
                        <input type="date" className="border border-gray-400 p-1" value={newHutang.tanggal_beli} onChange={e => setNewHutang({...newHutang, tanggal_beli: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">Jatuh Tempo:</label>
                        <input type="date" className="border border-gray-400 p-1" value={newHutang.tanggal_jatuh_tempo} onChange={e => setNewHutang({...newHutang, tanggal_jatuh_tempo: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">Nilai (Rp):</label>
                        <input type="number" className="border border-gray-400 p-1 w-32" value={newHutang.nilai} onChange={e => setNewHutang({...newHutang, nilai: e.target.value})} />
                    </div>
                    <button onClick={() => {
                        if (!newHutang.nota || !newHutang.supplier_id || !newHutang.nilai || !newHutang.tanggal_jatuh_tempo) return alert('Data belum lengkap!');
                        const rp = parseInt(newHutang.nilai) || 0;
                        setHutangSupplier([...(hutangSupplier || []), {
                            id: 'HTG' + Date.now().toString(),
                            nomor_nota: newHutang.nota,
                            supplier_id: newHutang.supplier_id,
                            supplier_nama: newHutang.supplier_nama,
                            tanggal_beli: newHutang.tanggal_beli,
                            tanggal_jatuh_tempo: newHutang.tanggal_jatuh_tempo,
                            nilai_hutang: rp,
                            sisa_hutang: rp,
                            status: 'belum_jatuh_tempo'
                        }]);
                        setNewHutang({nota: '', supplier_id: '', supplier_nama: '', tanggal_beli: '', tanggal_jatuh_tempo: '', nilai: ''});
                        setShowAddHutangModal(false);
                    }} className="bg-green-600 text-white font-bold py-1 px-4 shadow hover:bg-green-700">Simpan</button>
                    <button onClick={() => setShowAddHutangModal(false)} className="bg-gray-400 text-white font-bold py-1 px-4 shadow hover:bg-gray-500">Batal</button>
                 </div>
              )}

              {showPaymentModal && selectedHutang && (
                  <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                      <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-sm flex flex-col shadow-xl">
                          <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                              <span>Pembayaran Hutang</span>
                              <button onClick={() => {setShowPaymentModal(false); setSelectedHutang(null);}} className="bg-gray-300 text-black px-1.5 font-bold border border-gray-400 hover:bg-red-500 hover:text-white">X</button>
                          </div>
                          <div className="p-4 flex flex-col gap-3 text-black text-sm">
                              <div><strong>Supplier:</strong> {selectedHutang.supplier_nama}</div>
                              <div><strong>Nota:</strong> {selectedHutang.nomor_nota}</div>
                              <div><strong>Sisa Hutang:</strong> <span className="text-red-600 font-bold text-lg">{formatRp(selectedHutang.sisa_hutang)}</span></div>
                              
                              <label className="font-bold mt-2">Nominal Pembayaran (Rp):</label>
                              <input type="number" className="border border-gray-400 p-2 w-full" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)} placeholder="0" />
                              
                              <p className="text-[10px] text-gray-500 italic mt-1">*Pembayaran otomatis akan mengurangi saldo Dana Bebas dan masuk ke pencatatan Pengeluaran.</p>

                              <div className="flex gap-2 justify-end mt-2">
                                  <button onClick={() => {setShowPaymentModal(false); setSelectedHutang(null);}} className="px-4 py-1.5 bg-gray-200 border border-gray-500 font-bold shadow hover:bg-gray-300">Batal</button>
                                  <button onClick={() => {
                                      const rp = parseInt(paymentAmount);
                                      if (!rp || rp <= 0 || rp > selectedHutang.sisa_hutang) return alert('Nominal tidak valid!');
                                      
                                      // 1. Kurangi Hutang
                                      const updatedHutang = hutangSupplier.map((h: any) => {
                                          if (h.id === selectedHutang.id) {
                                              return {
                                                  ...h, 
                                                  sisa_hutang: h.sisa_hutang - rp,
                                                  status: (h.sisa_hutang - rp) === 0 ? 'lunas' : h.status
                                              };
                                          }
                                          return h;
                                      });
                                      setHutangSupplier(updatedHutang);

                                      // 2. Tambah Pengeluaran
                                      const expense = {
                                          id: 'EXP-' + Date.now(),
                                          date: `${new Date().toLocaleDateString('en-CA')} ${new Date().toLocaleTimeString('id-ID')}`,
                                          isoDate: new Date().toISOString(),
                                          name: `Pembayaran Hutang SUP: ${selectedHutang.supplier_nama} (Nota: ${selectedHutang.nomor_nota})`,
                                          amount: rp,
                                          cashier: 'Sistem',
                                          branch: 'Pusat',
                                          wallet: 'Dana Bebas'
                                      };
                                      setExpenses([expense, ...expenses]);

                                      setShowPaymentModal(false);
                                      setSelectedHutang(null);
                                      setPaymentAmount('');
                                      alert('Pembayaran berhasil dicatat!');
                                  }} className="px-4 py-1.5 bg-green-600 text-white border border-green-800 font-bold shadow hover:bg-green-700">Bayar</button>
                              </div>
                          </div>
                      </div>
                  </div>
              )}

              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-slate-50 border-b-2 border-gray-400 font-normal">
                  <tr>
                    <th className="p-2 border-r border-gray-300 text-center">Nota</th>
                    <th className="p-2 border-r border-gray-300">Supplier</th>
                    <th className="p-2 border-r border-gray-300">Tgl Beli</th>
                    <th className="p-2 border-r border-gray-300">Jatuh Tempo</th>
                    <th className="p-2 border-r border-gray-300 text-right">Nilai Hutang</th>
                    <th className="p-2 border-r border-gray-300 text-right">Sisa Hutang</th>
                    <th className="p-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {(hutangSupplier||[]).filter((h: any) => h.sisa_hutang > 0).map((h: any) => {
                    const diffDays = Math.ceil((new Date(h.tanggal_jatuh_tempo).getTime() - new Date().setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
                    return (
                        <tr key={h.id} className="border-b border-gray-200 hover:bg-blue-50">
                        <td className="p-2 border-r border-gray-300 text-center">{h.nomor_nota}</td>
                        <td className="p-2 border-r border-gray-300 font-bold">{h.supplier_nama}</td>
                        <td className="p-2 border-r border-gray-300">{h.tanggal_beli}</td>
                        <td className="p-2 border-r border-gray-300">
                            {h.tanggal_jatuh_tempo}
                            {diffDays < 0 ? <span className="text-red-600 text-xs ml-1 font-bold">(Telat)</span> : null}
                        </td>
                        <td className="p-2 border-r border-gray-300 text-right">{formatRp(h.nilai_hutang)}</td>
                        <td className="p-2 border-r border-gray-300 text-right font-bold text-red-600">{formatRp(h.sisa_hutang)}</td>
                        <td className="p-2 text-center">
                            <button onClick={() => { setSelectedHutang(h); setShowPaymentModal(true); }} className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 font-bold border border-yellow-600 shadow-sm text-yellow-950">Bayar</button>
                        </td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
