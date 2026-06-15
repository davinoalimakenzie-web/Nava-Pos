import React, { useState } from 'react';
import { ArrowLeftRight, Truck, Clock, Database, DownloadCloud, UploadCloud, History, Trash2, AlertTriangle, FileJson, RotateCcw, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp, formatDateDisplay, smartSort } from '../utils';
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
  const [opnameNames, setOpnameNames] = useState<Record<string, string>>({});
  const [opnameCategories, setOpnameCategories] = useState<Record<string, string>>({});
  const [opnameModalPrices, setOpnameModalPrices] = useState<Record<string, number>>({});
  const [opnameLvl1Prices, setOpnameLvl1Prices] = useState<Record<string, number>>({});
  const [opnameLvl2Prices, setOpnameLvl2Prices] = useState<Record<string, number>>({});
  const [opnameSuppliers, setOpnameSuppliers] = useState<Record<string, string>>({});
  const [orderChecklist, setOrderChecklist] = useState<Record<string, boolean>>({});
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showAddHutangModal, setShowAddHutangModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedHutang, setSelectedHutang] = useState<any>(null);
  
  const [newStock, setNewStock] = useState({code: '', name: '', category: 'UMUM', supplierPrice: 0, price1: 0, price2: 0, stock: 0, supplier: ''});
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

  // Sorting state for Master Stock / Opname
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedInventory = React.useMemo(() => {
    return smartSort(inventory, sortKey, sortDirection);
  }, [inventory, sortKey, sortDirection]);

  // Sorting state for Order Stock (PO)
  const [orderSortKey, setOrderSortKey] = useState<string>('');
  const [orderSortDirection, setOrderSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleOrderSort = (key: string) => {
    if (orderSortKey === key) {
      setOrderSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderSortKey(key);
      setOrderSortDirection('asc');
    }
  };

  const sortedOrderData = React.useMemo(() => {
    return smartSort(orderData || [], orderSortKey, orderSortDirection);
  }, [orderData, orderSortKey, orderSortDirection]);

  // Sorting state for Stock Return
  const [returnSortKey, setReturnSortKey] = useState<string>('');
  const [returnSortDirection, setReturnSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleReturnSort = (key: string) => {
    if (returnSortKey === key) {
      setReturnSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setReturnSortKey(key);
      setReturnSortDirection('asc');
    }
  };

  const sortedSupplierReturns = React.useMemo(() => {
    return smartSort(supplierReturns || [], returnSortKey, returnSortDirection);
  }, [supplierReturns, returnSortKey, returnSortDirection]);

  // Sorting state for Hutang Supplier
  const [hutangSortKey, setHutangSortKey] = useState<string>('');
  const [hutangSortDirection, setHutangSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleHutangSort = (key: string) => {
    if (hutangSortKey === key) {
      setHutangSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setHutangSortKey(key);
      setHutangSortDirection('asc');
    }
  };

  const sortedHutangSupplier = React.useMemo(() => {
    return smartSort(hutangSupplier || [], hutangSortKey, hutangSortDirection);
  }, [hutangSupplier, hutangSortKey, hutangSortDirection]);

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
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-xs font-bold text-gray-700">Supliyer:</label>
                        <select className="border border-gray-400 p-1 w-full bg-white text-xs select-none" value={newStock.supplier} onChange={e => setNewStock({...newStock, supplier: e.target.value})}>
                            <option value="">-- Supliyer --</option>
                            {suppliers?.map((s: any) => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                    </div>
                    <button onClick={() => {
                        if (!newStock.name) return alert('Nama barang wajib diisi!');
                        
                        // Recalculate based on latest category just in case
                        const val = newStock.supplierPrice || 0;
                        const margin1 = storeSettings?.margins?.[newStock.category]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                        const margin2 = storeSettings?.margins?.[newStock.category]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                        const p1 = Math.round(val * (1 + margin1/100));
                        const p2 = Math.round(val * (1 + margin2/100));

                        setInventory([...inventory, { id: Date.now().toString(), name: newStock.name, code: newStock.code, category: newStock.category, price1: p1, price2: p2, stock: newStock.stock, supplierPrice: val, supplier: newStock.supplier }]);
                        setNewStock({code: '', name: '', category: 'UMUM', supplierPrice: 0, price1: 0, price2: 0, stock: 0, supplier: ''});
                        setShowAddStockModal(false);
                    }} className="bg-green-600 text-white font-bold py-1.5 px-4 shadow hover:bg-green-700">Simpan</button>
                    <button onClick={() => setShowAddStockModal(false)} className="bg-gray-400 text-white font-bold py-1.5 px-4 shadow hover:bg-gray-500">Batal</button>
                 </div>
              )}
               <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-[#ece9d8] border-b border-gray-400 text-xs font-bold select-none text-blue-950">
                  <tr>
                    <th 
                      onClick={() => handleSort('code')} 
                      className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors min-w-[70px]"
                      title="Klik untuk mengurutkan berdasarkan Kode"
                    >
                      <div className="flex items-center justify-between gap-1 px-1">
                        <span>Kode</span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          {sortKey === 'code' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('name')} 
                      className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                      title="Klik untuk mengurutkan berdasarkan Nama Barang"
                    >
                      <div className="flex items-center justify-between gap-1 px-1">
                        <span>Nama Barang</span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          {sortKey === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('category')} 
                      className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors min-w-[95px]"
                      title="Klik untuk mengurutkan berdasarkan Kategori"
                    >
                      <div className="flex items-center justify-between gap-1 px-1">
                        <span>Kategori</span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          {sortKey === 'category' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('stock')} 
                      className="p-2 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200 transition-colors min-w-[70px]"
                      title="Klik untuk mengurutkan berdasarkan Stok"
                    >
                      <div className="flex items-center justify-center gap-1.5 px-1">
                        <span>Stok</span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          {sortKey === 'stock' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('price1')} 
                      className="p-2 border-r border-gray-300 text-right cursor-pointer hover:bg-gray-200 transition-colors min-w-[100px]"
                      title="Klik untuk mengurutkan berdasarkan Harga Level 1"
                    >
                      <div className="flex items-center justify-end gap-1 px-1">
                        <span>Harga Level 1</span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          {sortKey === 'price1' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('price2')} 
                      className="p-2 border-r border-gray-300 text-right cursor-pointer hover:bg-gray-200 transition-colors min-w-[100px]"
                      title="Klik untuk mengurutkan berdasarkan Harga Level 2"
                    >
                      <div className="flex items-center justify-end gap-1 px-1">
                        <span>Harga Level 2</span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          {sortKey === 'price2' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('supplier')} 
                      className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors min-w-[95px]"
                      title="Klik untuk mengurutkan berdasarkan Supliyer"
                    >
                      <div className="flex items-center justify-between gap-1 px-1">
                        <span>Supliyer</span>
                        <span className="text-[9px] text-gray-500 font-mono">
                          {sortKey === 'supplier' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedInventory.map((item: any) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50 text-xs text-black">
                      <td className="p-2 border-r border-gray-300 font-mono font-bold text-gray-700">{item.code}</td>
                      <td 
                        onClick={() => {
                          const updated = inventory.map((i: any) => i.id === item.id ? { ...i, isBestSeller: !i.isBestSeller } : i);
                          setInventory(updated);
                        }}
                        className="p-2 border-r border-gray-300 font-bold cursor-pointer hover:bg-yellow-50 select-none transition-colors"
                        title="Klik untuk tanda/hapus Best Seller"
                      >
                        <div className="flex items-center gap-1">
                          {item.isBestSeller ? (
                            <span className="text-amber-500 font-extrabold text-sm select-none">★</span>
                          ) : (
                            <span className="text-gray-300 opacity-60 font-normal hover:text-amber-400 select-none">☆</span>
                          )}
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td className="p-2 border-r border-gray-300 font-medium text-gray-600">{item.category || '-'}</td>
                      <td 
                        onClick={() => {
                          const updated = inventory.map((i: any) => i.id === item.id ? { ...i, isBestSeller: !i.isBestSeller } : i);
                          setInventory(updated);
                        }}
                        className={`p-2 border-r border-gray-300 text-center font-mono font-bold text-sm cursor-pointer hover:bg-yellow-50 select-none transition-colors ${item.stock <= 2 ? 'text-red-600' : 'text-emerald-700'}`}
                        title="Klik untuk tanda/hapus Best Seller"
                      >
                        <div className="flex justify-center items-center gap-1">
                          <span>{item.stock}</span>
                          {item.isBestSeller && <span className="text-amber-500 font-extrabold text-[12px] select-none">★</span>}
                        </div>
                      </td>
                      <td className="p-2 border-r border-gray-300 text-right font-mono text-gray-800">{formatRp(item.price1)}</td>
                      <td className="p-2 border-r border-gray-300 text-right font-mono text-gray-800">{formatRp(item.price2)}</td>
                      <td className="p-2 border-r border-gray-300 font-medium text-gray-700">{item.supplier || '-'}</td>
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
                <thead className="bg-[#ece9d8] border-b-2 border-gray-400 font-bold text-blue-900 text-xs text-blue-950">
                  <tr>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('code')} title="Urutkan berdasarkan Kode">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Kode</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'code' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('name')} title="Urutkan berdasarkan Nama Barang">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Nama Barang</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('category')} title="Urutkan berdasarkan Kategori">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Kategori</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'category' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none text-center" onClick={() => handleSort('stock')} title="Urutkan berdasarkan Stok Sistem">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Stok Sistem</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'stock' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 text-center w-28">Fisik Aktual</th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none text-right" onClick={() => handleSort('supplierPrice')} title="Urutkan berdasarkan Harga Modal">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span>Harga Modal</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'supplierPrice' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none text-right" onClick={() => handleSort('price1')} title="Urutkan berdasarkan Harga Level 1">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span>Harga Level 1</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'price1' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none text-right" onClick={() => handleSort('price2')} title="Urutkan berdasarkan Harga Level 2">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span>Harga Level 2</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'price2' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handleSort('supplier')} title="Urutkan berdasarkan Supliyer">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Supliyer</span>
                        <span className="text-[10px] text-gray-500 font-mono">{sortKey === 'supplier' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 text-center w-28">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedInventory.map((item: any) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-blue-50 text-xs text-black">
                      <td className="p-2 border-r border-gray-300 font-mono font-bold text-gray-700">{item.code}</td>
                      <td className="p-2 border-r border-gray-300">
                        <input 
                          type="text" 
                          value={opnameNames[item.id] !== undefined ? opnameNames[item.id] : item.name} 
                          onChange={e => setOpnameNames({...opnameNames, [item.id]: e.target.value.toUpperCase()})} 
                          className="border border-gray-400 px-1 py-0.5 w-full font-bold outline-none focus:border-blue-500 text-black bg-white uppercase" 
                        />
                      </td>
                      <td className="p-2 border-r border-gray-300">
                        <select 
                          value={opnameCategories[item.id] !== undefined ? opnameCategories[item.id] : (item.category || 'UMUM')} 
                          onChange={e => {
                            const newCat = e.target.value;
                            const curPrice = opnameModalPrices[item.id] !== undefined ? opnameModalPrices[item.id] : (item.supplierPrice || 0);
                            const m1 = storeSettings?.margins?.[newCat]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                            const m2 = storeSettings?.margins?.[newCat]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                            setOpnameCategories({...opnameCategories, [item.id]: newCat});
                            setOpnameLvl1Prices({...opnameLvl1Prices, [item.id]: Math.round(curPrice * (1 + m1/100))});
                            setOpnameLvl2Prices({...opnameLvl2Prices, [item.id]: Math.round(curPrice * (1 + m2/100))});
                          }}
                          className="border border-gray-400 px-1 py-0.5 outline-none focus:border-blue-500 text-black bg-white w-full text-xs"
                        >
                          {Array.from(new Set(['UMUM', ...(storeSettings?.margins ? Object.keys(storeSettings.margins).filter(k => k !== 'DEFAULT') : []), ...inventory.map((i: any) => i.category).filter(Boolean)])).map(cat => <option key={cat as string} value={(cat as string).toUpperCase()}>{(cat as string).toUpperCase()}</option>)}
                        </select>
                      </td>
                      <td className="p-2 border-r border-gray-300 text-center font-bold text-sm text-[#000080]">{item.stock}</td>
                      <td className="p-2 border-r border-gray-300 text-center">
                        <input 
                          type="number" 
                          value={opnameInputs[item.id] !== undefined ? opnameInputs[item.id] : ''} 
                          onChange={e => setOpnameInputs({...opnameInputs, [item.id]: e.target.value === '' ? item.stock : parseInt(e.target.value) || 0})} 
                          className="w-16 border border-gray-400 px-1 py-0.5 text-center font-bold outline-none focus:border-blue-500 text-black bg-white" 
                          placeholder={String(item.stock)} 
                        />
                      </td>
                      <td className="p-2 border-r border-gray-300">
                        <input 
                          type="number" 
                          value={opnameModalPrices[item.id] !== undefined ? opnameModalPrices[item.id] : (item.supplierPrice || 0)} 
                          onChange={e => {
                            const val = parseInt(e.target.value) || 0;
                            const cat = opnameCategories[item.id] !== undefined ? opnameCategories[item.id] : (item.category || 'UMUM');
                            const m1 = storeSettings?.margins?.[cat]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                            const m2 = storeSettings?.margins?.[cat]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                            setOpnameModalPrices({...opnameModalPrices, [item.id]: val});
                            setOpnameLvl1Prices({...opnameLvl1Prices, [item.id]: Math.round(val * (1 + m1/100))});
                            setOpnameLvl2Prices({...opnameLvl2Prices, [item.id]: Math.round(val * (1 + m2/100))});
                          }} 
                          className="w-20 border border-gray-400 px-1 py-0.5 font-mono text-right font-bold outline-none focus:border-blue-500 text-black bg-white" 
                        />
                      </td>
                      <td className="p-2 border-r border-gray-300 text-right font-mono font-bold text-blue-900">
                        {formatRp(opnameLvl1Prices[item.id] !== undefined ? opnameLvl1Prices[item.id] : (item.price1 || 0))}
                      </td>
                      <td className="p-2 border-r border-gray-300 text-right font-mono font-bold text-purple-900">
                        {formatRp(opnameLvl2Prices[item.id] !== undefined ? opnameLvl2Prices[item.id] : (item.price2 || 0))}
                      </td>
                      <td className="p-2 border-r border-gray-300">
                        <select 
                          value={opnameSuppliers[item.id] !== undefined ? opnameSuppliers[item.id] : (item.supplier || '')} 
                          onChange={e => setOpnameSuppliers({...opnameSuppliers, [item.id]: e.target.value})} 
                          className="border border-gray-400 px-1 py-0.5 outline-none focus:border-blue-500 text-black bg-white w-full text-xs"
                        >
                          <option value="">-- Supliyer --</option>
                          {suppliers?.map((s: any) => <option key={s.id} value={s.name}>{s.name}</option>)}
                        </select>
                      </td>
                      <td className="p-2 text-center">
                        <button 
                          onClick={() => {
                            const updatedName = opnameNames[item.id] !== undefined ? opnameNames[item.id] : item.name;
                            const updatedCategory = opnameCategories[item.id] !== undefined ? opnameCategories[item.id] : (item.category || 'UMUM');
                            const updatedStock = opnameInputs[item.id] !== undefined ? opnameInputs[item.id] : item.stock;
                            const updatedModalPrice = opnameModalPrices[item.id] !== undefined ? opnameModalPrices[item.id] : (item.supplierPrice || 0);
                            
                            const cat = updatedCategory || 'UMUM';
                            const m1 = storeSettings?.margins?.[cat]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                            const m2 = storeSettings?.margins?.[cat]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                            const calculatedL1 = Math.round(updatedModalPrice * (1 + m1/100));
                            const calculatedL2 = Math.round(updatedModalPrice * (1 + m2/100));

                            const updatedLvl1 = opnameLvl1Prices[item.id] !== undefined ? opnameLvl1Prices[item.id] : calculatedL1;
                            const updatedLvl2 = opnameLvl2Prices[item.id] !== undefined ? opnameLvl2Prices[item.id] : calculatedL2;
                            const updatedSupplier = opnameSuppliers[item.id] !== undefined ? opnameSuppliers[item.id] : item.supplier;

                            setInventory(inventory.map((i: any) => i.id === item.id ? { 
                              ...i, 
                              name: updatedName,
                              category: updatedCategory,
                              stock: updatedStock,
                              supplierPrice: updatedModalPrice,
                              price1: updatedLvl1,
                              price2: updatedLvl2,
                              supplier: updatedSupplier
                            } : i));

                            // Reset local edit states for this item
                            const newInputs = {...opnameInputs}; delete newInputs[item.id]; setOpnameInputs(newInputs);
                            const newNames = {...opnameNames}; delete newNames[item.id]; setOpnameNames(newNames);
                            const newCats = {...opnameCategories}; delete newCats[item.id]; setOpnameCategories(newCats);
                            const newModals = {...opnameModalPrices}; delete newModals[item.id]; setOpnameModalPrices(newModals);
                            const newL1s = {...opnameLvl1Prices}; delete newL1s[item.id]; setOpnameLvl1Prices(newL1s);
                            const newL2s = {...opnameLvl2Prices}; delete newL2s[item.id]; setOpnameLvl2Prices(newL2s);
                            const newSups = {...opnameSuppliers}; delete newSups[item.id]; setOpnameSuppliers(newSups);

                            alert(`Data barang "${updatedName}" berhasil diperbaharui!`);
                          }} 
                          className="px-3 py-1 font-bold shadow border text-xs bg-green-600 text-white border-green-800 hover:bg-green-700"
                        >
                          Update
                        </button>
                      </td>
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
               {orderData.filter((o: any) => o.sisaStock <= 3).length === 0 ? (
                   <p className="text-gray-500 italic mt-2">Tidak ada barang yang perlu diorder saat ini (Stok Aman).</p>
               ) : (
                   <table className="w-full text-left border-collapse whitespace-nowrap mt-2 border border-gray-400 shadow-sm">
                      <thead className="bg-[#ece9d8] border-b-2 border-gray-400 font-bold text-blue-900 select-none text-xs">
                        <tr>
                          <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleOrderSort('id')} title="Urutkan No PO / Tgl">
                            <div className="flex items-center gap-1.5 justify-between">
                              <span>No PO / Tgl</span>
                              <span className="font-mono text-[9px] text-[#000080]">{orderSortKey === 'id' ? (orderSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                            </div>
                          </th>
                          <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleOrderSort('supplier')} title="Urutkan Supliyer">
                            <div className="flex items-center gap-1.5 justify-between">
                              <span>Supliyer</span>
                              <span className="font-mono text-[9px] text-[#000080]">{orderSortKey === 'supplier' ? (orderSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                            </div>
                          </th>
                          <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleOrderSort('item')} title="Urutkan Item">
                            <div className="flex items-center gap-1.5 justify-between">
                              <span>Item</span>
                              <span className="font-mono text-[9px] text-[#000080]">{orderSortKey === 'item' ? (orderSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                            </div>
                          </th>
                          <th className="p-2 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleOrderSort('sisaStock')} title="Urutkan Sisa Stok">
                            <div className="flex items-center gap-1.5 justify-center">
                              <span>Sisa Stok</span>
                              <span className="font-mono text-[9px] text-[#000080]">{orderSortKey === 'sisaStock' ? (orderSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                            </div>
                          </th>
                          <th className="p-2 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleOrderSort('targetOrder')} title="Urutkan Target Order">
                            <div className="flex items-center gap-1.5 justify-center">
                              <span>Target Order</span>
                              <span className="font-mono text-[9px] text-[#000080]">{orderSortKey === 'targetOrder' ? (orderSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                            </div>
                          </th>
                          <th className="p-2 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleOrderSort('status')} title="Urutkan Status">
                            <div className="flex items-center gap-1.5 justify-center">
                              <span>Status</span>
                              <span className="font-mono text-[9px] text-[#000080]">{orderSortKey === 'status' ? (orderSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                            </div>
                          </th>
                          <th className="p-2 text-center w-24">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedOrderData.filter((o: any) => o.sisaStock <= 3).map((o: any) => (
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
                    <tr>
                      <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleReturnSort('id')} title="Urutkan ID Retur">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span>ID Retur</span>
                          <span className="font-mono text-[9px] text-gray-500">{returnSortKey === 'id' ? (returnSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                      </th>
                      <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleReturnSort('date')} title="Urutkan Tanggal">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span>Tanggal</span>
                          <span className="font-mono text-[9px] text-gray-500">{returnSortKey === 'date' ? (returnSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                      </th>
                      <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleReturnSort('supplierName')} title="Urutkan Supliyer">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span>Supliyer</span>
                          <span className="font-mono text-[9px] text-gray-500">{returnSortKey === 'supplierName' ? (returnSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                      </th>
                      <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleReturnSort('itemName')} title="Urutkan Barang Rusak">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span>Barang Rusak</span>
                          <span className="font-mono text-[9px] text-gray-500">{returnSortKey === 'itemName' ? (returnSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                      </th>
                      <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleReturnSort('kendala')} title="Urutkan Kendala">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span>Kendala</span>
                          <span className="font-mono text-[9px] text-gray-500">{returnSortKey === 'kendala' ? (returnSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                      </th>
                      <th className="p-2 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleReturnSort('qty')} title="Urutkan Qty">
                        <div className="flex items-center gap-1.5 justify-center">
                          <span>Qty</span>
                          <span className="font-mono text-[9px] text-gray-500">{returnSortKey === 'qty' ? (returnSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                      </th>
                      <th className="p-2 text-center cursor-pointer hover:bg-gray-200 font-bold" onClick={() => handleReturnSort('status')} title="Urutkan Status">
                        <div className="flex items-center gap-1.5 justify-center">
                          <span>Status</span>
                          <span className="font-mono text-[9px] text-gray-500">{returnSortKey === 'status' ? (returnSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                      </th>
                    </tr>
                 </thead>
                 <tbody className="text-sm">
                    {supplierReturns.length === 0 ? (
                       <tr><td colSpan={7} className="text-center p-4 italic text-gray-500">Belum ada data retur.</td></tr>
                    ) : (
                       sortedSupplierReturns.map((r: any) => (
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
              </div>

              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-slate-50 border-b-2 border-gray-400 font-normal">
                  <tr>
                    <th className="p-2 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-200 text-xs font-bold text-blue-900 select-none" onClick={() => handleHutangSort('nomor_nota')} title="Urutkan Nota">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Nota</span>
                        <span className="font-mono text-[9px] text-[#000080]">{hutangSortKey === 'nomor_nota' ? (hutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-xs font-bold text-blue-900 select-none" onClick={() => handleHutangSort('supplier_nama')} title="Urutkan Supplier">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Supplier</span>
                        <span className="font-mono text-[9px] text-[#000080]">{hutangSortKey === 'supplier_nama' ? (hutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-xs font-bold text-blue-900 select-none" onClick={() => handleHutangSort('tanggal_beli')} title="Urutkan Tgl Beli">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Tgl Beli</span>
                        <span className="font-mono text-[9px] text-[#000080]">{hutangSortKey === 'tanggal_beli' ? (hutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-xs font-bold text-blue-900 select-none" onClick={() => handleHutangSort('tanggal_jatuh_tempo')} title="Urutkan Jatuh Tempo">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Jatuh Tempo</span>
                        <span className="font-mono text-[9px] text-[#000080]">{hutangSortKey === 'tanggal_jatuh_tempo' ? (hutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 text-right cursor-pointer hover:bg-gray-200 text-xs font-bold text-blue-900 select-none" onClick={() => handleHutangSort('nilai_hutang')} title="Urutkan Nilai Hutang">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span>Nilai Hutang</span>
                        <span className="font-mono text-[9px] text-[#000080]">{hutangSortKey === 'nilai_hutang' ? (hutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 text-right cursor-pointer hover:bg-gray-200 text-xs font-bold text-blue-900 select-none" onClick={() => handleHutangSort('sisa_hutang')} title="Urutkan Sisa Hutang">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span>Sisa Hutang</span>
                        <span className="font-mono text-[9px] text-[#000080]">{hutangSortKey === 'sisa_hutang' ? (hutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHutangSupplier.filter((h: any) => h.sisa_hutang > 0).map((h: any) => {
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
                        <td className="p-2 text-right font-bold text-red-600">{formatRp(h.sisa_hutang)}</td>
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
