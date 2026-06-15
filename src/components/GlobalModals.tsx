import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatRp, smartSort } from '../utils';
import { DownloadCloud } from 'lucide-react';
import { initialInventory, initialCustomers, initialTransactions, initialPiutang, initialExpenses, initialOrderData } from '../data';

export const GlobalModals = () => {
    const {
        showPendingModal, setShowPendingModal,
        pendingTransactions, setPendingTransactions,
        setCart, setSelectedCustomerId,
        showPiutangModal, setShowPiutangModal, piutangData, setPiutangData,
        showPrintOptionsModal, setShowPrintOptionsModal,
        showExpenseModal, setShowExpenseModal, expenses, setExpenses, user, transactionDate, storeSettings,
        showAddCustomerModal, setShowAddCustomerModal, customers, setCustomers,
        showAddEmpModal, setShowAddEmpModal, employees, setEmployees,
        showAuthModal, setShowAuthModal, pendingUser, setPendingUser, setUser, setActiveTab,
        showLogoutConfirm, setShowLogoutConfirm,
        inventory, suppliers, orderData, supplierReturns, transactions,
        appUsers, attendances, leaveRequests,
        setInventory, setTransactions, setOrderData,
        appLogs, addLog,
        wallets, setWallets,
        reprintTx, setReprintTx,
        isOrderSupplierMode, setIsOrderSupplierMode,
        isInputStockMode, setIsInputStockMode,
        stockSupplierId, setStockSupplierId,
        poType, setPoType
    } = useAppContext();

    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');
    const [expenseType, setExpenseType] = useState('Harian');
    const [expenseWallet, setExpenseWallet] = useState('Dana Laci');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerAddress, setNewCustomerAddress] = useState('');
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [newCustomerLevel, setNewCustomerLevel] = useState('1');
    const [newEmpName, setNewEmpName] = useState('');
    const [newEmpPos, setNewEmpPos] = useState('');
    const [newEmpBranch, setNewEmpBranch] = useState(storeSettings?.branches?.[0] || 'Kudus');
    const [newEmpPhone, setNewEmpPhone] = useState('');
    const [newEmpSalary, setNewEmpSalary] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [pendingSearch, setPendingSearch] = useState('');
    const [selectedPendingId, setSelectedPendingId] = useState<string | null>(null);
    const [showAllPending, setShowAllPending] = useState(false);

    // Sorting states
    const [pendingSortKey, setPendingSortKey] = useState('dateString');
    const [pendingSortDirection, setPendingSortDirection] = useState<'asc' | 'desc'>('desc');
    const [piutangSortKey, setPiutangSortKey] = useState('id');
    const [piutangSortDirection, setPiutangSortDirection] = useState<'asc' | 'desc'>('asc');

    const handlePendingSort = (key: string) => {
        if (pendingSortKey === key) {
            setPendingSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setPendingSortKey(key);
            setPendingSortDirection('asc');
        }
    };

    const handlePiutangSort = (key: string) => {
        if (piutangSortKey === key) {
            setPiutangSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setPiutangSortKey(key);
            setPiutangSortDirection('asc');
        }
    };

    const loadPendingTransaction = (pendingItem: any) => {
        setCart(pendingItem.items);
        if (pendingItem.isOrderSupplierMode) {
            setIsOrderSupplierMode(true);
            setIsInputStockMode(false);
            setStockSupplierId(pendingItem.stockSupplierId || '');
            setPoType(pendingItem.poType || 'Daftar Antrian');
        } else {
            setIsOrderSupplierMode(false);
            setIsInputStockMode(false);
            setSelectedCustomerId(pendingItem.customerId);
        }
        setPendingTransactions(pendingTransactions.filter((p: any) => p.id !== pendingItem.id));
        setShowPendingModal(false);
    };

    const bayarPiutang = (p: any) => {
        const itemPiutang = {
          id: p.id,
          code: 'PIUTANG',
          name: `Pelunasan Piutang - ${p.customer}`,
          price: p.sisa,
          qty: 1,
          isReturn: false,
          isPiutangPayment: true,
          piutangId: p.id,
          originalPiutangData: p,
          cartUniqueId: 'ITEM-' + Date.now() + Math.random()
        };
        const customer = customers.find((c: any) => c.name === p.customer);
        if (customer) {
            setSelectedCustomerId(customer.id);
        }
        setCart([itemPiutang]);
        setShowPiutangModal(false);
    };

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        const amt = parseInt(newExpenseAmount);
        
        if (expenseWallet === 'Dana Laci' && (wallets?.danaLaci || 0) < amt) {
            alert('Peringatan: Saldo Dana Laci tidak mencukupi!');
            return;
        } else if (expenseWallet === 'Dana Bebas' && (wallets?.danaBebas || 0) < amt) {
            alert('Peringatan: Saldo Dana Bebas tidak mencukupi!');
            return;
        }

        const expense = {
            id: 'EXP-' + Date.now(),
            date: `${transactionDate} ${new Date().toLocaleTimeString('id-ID')}`,
            isoDate: new Date(transactionDate).toISOString(),
            name: newExpenseName,
            amount: amt,
            cashier: user.name,
            branch: user?.branch || storeSettings.activeBranch || 'Pusat',
            wallet: expenseWallet
        };
        setExpenses([expense, ...expenses]);
        addLog('PENGELUARAN', `Rp ${expense.amount.toLocaleString('id-ID')} untuk ${expense.name} (dari ${expenseWallet})`);
        
        if (expenseWallet === 'Dana Laci') {
            setWallets((prev: any) => ({...prev, danaLaci: (prev?.danaLaci || 0) - amt}));
        } else {
            setWallets((prev: any) => ({...prev, danaBebas: (prev?.danaBebas || 0) - amt}));
        }

        setNewExpenseName('');
        setNewExpenseAmount('');
        setShowExpenseModal(false);
        setExpenseWallet('Dana Laci');
        alert('Pengeluaran berhasil dicatat!');
    };

    const handleAddCustomer = (e: React.FormEvent) => {
        e.preventDefault();
        const newCust = {
            id: Date.now(),
            name: newCustomerName,
            address: newCustomerAddress || '-',
            phone: newCustomerPhone || '-',
            level: parseInt(newCustomerLevel)
        };
        setCustomers([...customers, newCust]);
        addLog('DATA_PELANGGAN', `Pelanggan baru ditambahkan: ${newCustomerName}`);
        setSelectedCustomerId(newCust.id.toString());
        setShowAddCustomerModal(false);
        setNewCustomerName(''); setNewCustomerAddress(''); setNewCustomerPhone(''); setNewCustomerLevel('1');
    };

    const handleLoadDummy = () => {
        if (!window.confirm("Bermuat Data Dummy? Data lama akan ditimpa!")) return;
        setInventory(initialInventory);
        setCustomers(initialCustomers);
        setTransactions(initialTransactions);
        setPiutangData(initialPiutang);
        setExpenses(initialExpenses);
        setOrderData(initialOrderData);
        alert('Data dummy berhasil dimuat! Silahkan refresh atau cek tab Dashboard.');
        setShowExpenseModal(false);
    };

    const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        setEmployees([...employees, { 
            id: Date.now(), 
            name: newEmpName, 
            position: newEmpPos, 
            branch: newEmpBranch, 
            phone: newEmpPhone || '-',
            dailySalary: parseInt(newEmpSalary) || 0, 
            latePenaltyPerMin: 10000/60 
        }]);
        addLog('KARYAWAN', `Karyawan baru ditambahkan: ${newEmpName} (${newEmpBranch})`);
        setNewEmpName(''); setNewEmpPos(''); setNewEmpPhone(''); setNewEmpSalary(''); setShowAddEmpModal(false);
        alert('Karyawan baru berhasil ditambahkan!');
    };

    const confirmSwitchKasir = (e: React.FormEvent) => {
        e.preventDefault();
        if (authPassword === pendingUser.password) {
            setUser(pendingUser);
            setShowAuthModal(false);
            setPendingUser(null);
            setAuthPassword('');
            if (pendingUser.role === 'kasir') setActiveTab('pos');
        } else alert('Password Salah! Otorisasi Gagal.');
    };

    return (
        <>
            {showAuthModal && pendingUser && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-sm flex flex-col shadow-xl">
                        <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                        <span>Otorisasi Dibutuhkan</span>
                        <button onClick={() => setShowAuthModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                        </div>
                        <div className="p-4 text-black">
                        <p className="mb-4 text-sm">Masukkan password untuk beralih ke <b>{pendingUser.name}</b></p>
                        <form onSubmit={confirmSwitchKasir}>
                            <input 
                            type="password" 
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            className="w-full p-2 border border-gray-400 outline-none focus:border-blue-600 mb-4"
                            placeholder="Password akun..." 
                            autoFocus required
                            />
                            <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowAuthModal(false)} className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold">Batal</button>
                            <button type="submit" className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold">Beralih</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}

            {showPendingModal && (() => {
                const filteredPendingTransactions = pendingTransactions.filter((p: any) => {
                  const matchSearch = showAllPending || p.id.toLowerCase().includes(pendingSearch.toLowerCase()) || 
                                     p.customerName.toLowerCase().includes(pendingSearch.toLowerCase());
                  const matchBranch = p.sales?.includes(storeSettings?.activeBranch || 'Pusat');
                  return matchSearch && matchBranch;
                });
                
                const processSelectedPending = () => {
                  if (selectedPendingId) {
                    const found = pendingTransactions.find((p:any) => p.id === selectedPendingId);
                    if (found) {
                      loadPendingTransaction(found);
                      setShowPendingModal(false);
                    }
                  }
                };
                
                const handlePendingKeyDown = (e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    processSelectedPending();
                  } else if (e.key === 'Escape') {
                    setShowPendingModal(false);
                  }
                };

                return (
                 <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4 backdrop-blur-sm" onKeyDown={handlePendingKeyDown}>
                     <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-4xl flex flex-col shadow-xl h-[70vh] rounded-md overflow-hidden">
                         <div className="bg-white px-3 py-2 flex items-center justify-between shrink-0 border-b border-gray-300">
                           <span className="text-sm">Daftar Transaksi Pending</span>
                           <button onClick={() => setShowPendingModal(false)} className="text-black font-bold hover:bg-gray-200 px-1">X</button>
                         </div>
                         <div className="p-3 flex-1 flex flex-col gap-2 overflow-hidden bg-[#ece9d8]">
                           <div className="bg-white border text-black border-gray-400 flex-1 overflow-auto rounded-sm relative">
                             <table className="w-full text-left border-collapse text-xs">
                             <thead className="sticky top-0 bg-white shadow-sm z-10">
                                 <tr className="border-b border-gray-400">
                                 <th className="p-1 px-2 border-r border-gray-300 font-normal cursor-pointer hover:bg-gray-200 select-none" onClick={() => handlePendingSort('id')} title="Urutkan Kode">
                                     <div className="flex items-center gap-1 justify-between">
                                         <span>KODE PENDING</span>
                                         <span className="font-mono text-[9px] text-[#000080]">{pendingSortKey === 'id' ? (pendingSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                     </div>
                                 </th>
                                 <th className="p-1 px-2 border-r border-gray-300 font-normal cursor-pointer hover:bg-gray-200 select-none" onClick={() => handlePendingSort('dateString')} title="Urutkan Tanggal">
                                     <div className="flex items-center gap-1 justify-between">
                                         <span>TANGGAL</span>
                                         <span className="font-mono text-[9px] text-[#000080]">{pendingSortKey === 'dateString' ? (pendingSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                     </div>
                                 </th>
                                 <th className="p-1 px-2 border-r border-gray-300 font-normal w-1/3 cursor-pointer hover:bg-gray-200 select-none" onClick={() => handlePendingSort('customerName')} title="Urutkan Pelanggan">
                                     <div className="flex items-center gap-1 justify-between">
                                         <span>PELANGGAN</span>
                                         <span className="font-mono text-[9px] text-[#000080]">{pendingSortKey === 'customerName' ? (pendingSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                     </div>
                                 </th>
                                 <th className="p-1 px-2 border-gray-300 font-normal cursor-pointer hover:bg-gray-200 select-none" onClick={() => handlePendingSort('sales')} title="Urutkan Sales">
                                     <div className="flex items-center gap-1 justify-between">
                                         <span>SALES</span>
                                         <span className="font-mono text-[9px] text-[#000080]">{pendingSortKey === 'sales' ? (pendingSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                     </div>
                                 </th>
                                 </tr>
                             </thead>
                             <tbody>
                                 {smartSort(filteredPendingTransactions, pendingSortKey, pendingSortDirection).map((p: any) => (
                                 <tr 
                                   key={p.id} 
                                   onClick={() => setSelectedPendingId(p.id)}
                                   onDoubleClick={() => {
                                     setSelectedPendingId(p.id);
                                     setTimeout(() => {
                                       loadPendingTransaction(p);
                                       setShowPendingModal(false);
                                     }, 10);
                                   }}
                                   className={`border-b cursor-pointer ${selectedPendingId === p.id ? 'bg-[#3399ff] text-white' : 'hover:bg-blue-50 text-black'}`}>
                                     <td className={`p-1 px-2 border-r ${selectedPendingId === p.id ? 'border-blue-400' : 'border-gray-200'}`}>{p.id}</td>
                                     <td className={`p-1 px-2 border-r ${selectedPendingId === p.id ? 'border-blue-400' : 'border-gray-200'}`}>{p.dateString || p.time} {p.time}</td>
                                     <td className={`p-1 px-2 border-r ${selectedPendingId === p.id ? 'border-blue-400' : 'border-gray-200'}`}>{p.customerName}</td>
                                     <td className={`p-1 px-2 ${selectedPendingId === p.id ? 'border-blue-400' : 'border-gray-200'}`}>{p.sales || '-'}</td>
                                 </tr>
                                 ))}
                             </tbody>
                             </table>
                           </div>
                           <div className="flex gap-2 items-center bg-[#8fb4d9] border border-gray-400 p-2 shrink-0">
                               <span className="font-bold text-blue-900 text-sm whitespace-nowrap drop-shadow-sm">CARI ATAU TEKAN ENTER :</span>
                               <input 
                                  type="text" 
                                  value={pendingSearch} 
                                  onChange={(e) => setPendingSearch(e.target.value)} 
                                  className="flex-1 bg-white border border-gray-400 px-2 text-black py-0.5 outline-none focus:border-blue-600"
                                  autoFocus
                               />
                               <button onClick={processSelectedPending} className="border border-gray-400 bg-[#ece9d8] hover:bg-gray-200 px-3 py-0.5 text-black text-xs font-medium">Pilih, Enter Atau Dobel Klik</button>
                               <button onClick={() => { setShowAllPending(false); setPendingSearch(''); }} className={`border border-gray-400 px-3 py-0.5 text-black text-xs font-medium bg-[#ece9d8] hover:bg-gray-200`}>Show All</button>
                               <button onClick={() => {
                                  if (selectedPendingId) {
                                     setPendingTransactions(pendingTransactions.filter((pt:any) => pt.id !== selectedPendingId));
                                     setSelectedPendingId(null);
                                  }
                               }} className="border border-gray-400 bg-[#ece9d8] hover:bg-gray-200 px-3 py-0.5 text-black text-xs font-medium">Hapus</button>
                               <button onClick={() => setShowPendingModal(false)} className="border border-gray-400 bg-[#ece9d8] hover:bg-gray-200 px-3 py-0.5 text-black text-xs font-medium">Keluar (Esc)</button>
                           </div>
                         </div>
                     </div>
                 </div>
                );
            })()}

            {showPiutangModal && (
                <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#8fb4d9] border-2 border-gray-400 w-full max-w-4xl flex flex-col shadow-xl h-[80vh]">
                    <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between shrink-0">
                    <span>Daftar Piutang Cepat</span>
                    <button onClick={() => setShowPiutangModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                    </div>
                    <div className="p-2 overflow-y-auto flex-1 text-black">
                    {piutangData.length === 0 ? (
                        <div className="bg-white border border-gray-400 p-4 text-center text-sm">Tidak ada piutang aktif saat ini.</div>
                    ) : (
                        <table className="w-full text-left bg-white border border-gray-400 border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-400 bg-gray-100">
                            <th className="p-2 border-r border-gray-300 font-bold cursor-pointer hover:bg-gray-200 select-none text-[#000080]" onClick={() => handlePiutangSort('id')} title="Urutkan ID">
                                <div className="flex items-center gap-1 justify-between bg-white/40 px-1 py-0.5 rounded">
                                    <span>ID / Waktu</span>
                                    <span className="font-mono text-[9px] text-[#000080]">{piutangSortKey === 'id' ? (piutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                </div>
                            </th>
                            <th className="p-2 border-r border-gray-300 font-bold cursor-pointer hover:bg-gray-200 select-none text-[#000080]" onClick={() => handlePiutangSort('customer')} title="Urutkan Pelanggan">
                                <div className="flex items-center gap-1 justify-between bg-white/40 px-1 py-0.5 rounded">
                                    <span>Pelanggan</span>
                                    <span className="font-mono text-[9px] text-[#000080]">{piutangSortKey === 'customer' ? (piutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                </div>
                            </th>
                            <th className="p-2 border-r border-gray-300 font-bold text-right cursor-pointer hover:bg-gray-200 select-none text-[#000080]" onClick={() => handlePiutangSort('total')} title="Urutkan Total">
                                <div className="flex items-center gap-1 justify-end bg-white/40 px-1 py-0.5 rounded">
                                    <span>Total Transaksi</span>
                                    <span className="font-mono text-[9px] text-[#000080]">{piutangSortKey === 'total' ? (piutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                </div>
                            </th>
                            <th className="p-2 border-r border-gray-300 font-bold text-right cursor-pointer hover:bg-gray-200 select-none text-[#000080]" onClick={() => handlePiutangSort('sisa')} title="Urutkan Sisa">
                                <div className="flex items-center gap-1 justify-end bg-white/40 px-1 py-0.5 rounded">
                                    <span>Sisa Tagihan</span>
                                    <span className="font-mono text-[9px] text-[#000080]">{piutangSortKey === 'sisa' ? (piutangSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                </div>
                            </th>
                            <th className="p-2 font-bold text-center select-none text-gray-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {smartSort(piutangData, piutangSortKey, piutangSortDirection).map((p: any) => (
                            <tr key={p.id} className="border-b hover:bg-blue-50">
                                <td className="p-2 border-r border-gray-300">{p.id} / {p.date.split(' ')[1]}</td>
                                <td className="p-2 border-r border-gray-300 font-bold">{p.customer}</td>
                                <td className="p-2 border-r border-gray-300 text-right">{formatRp(p.total)}</td>
                                <td className="p-2 border-r border-gray-300 text-right font-bold text-red-600 text-sm">{formatRp(p.sisa)}</td>
                                <td className="p-2 text-center">
                                <button onClick={() => bayarPiutang(p)} className="border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 px-3 py-1 font-bold shadow-sm">Pelunasan</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                    </div>
                </div>
                </div>
            )}

            {showExpenseModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-sm flex flex-col shadow-xl">
                    <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                    <span>Input Pengeluaran</span>
                    <button onClick={() => setShowExpenseModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                    </div>
                    <div className="p-4 text-black text-sm">
                    <form onSubmit={handleAddExpense}>
                        <label className="block mb-1 font-bold text-xs">Sifat Pengeluaran:</label>
                        <select 
                           value={expenseType} 
                           onChange={(e) => {
                               setExpenseType(e.target.value);
                               setExpenseWallet(e.target.value === 'Harian' ? 'Dana Laci' : 'Dana Bebas');
                           }}
                           className="w-full p-2 border border-gray-400 mb-3 outline-none focus:border-blue-600 bg-white"
                        >
                           <option value="Harian">Harian (Kasbon, Operasional, ATK, dll)</option>
                           <option value="Bulanan">Bulanan (Gaji, Prive, Bayar Supplier)</option>
                        </select>
                        <label className="block mb-1 font-bold text-xs">Sumber Dana (Otomatis):</label>
                        <select 
                           value={expenseWallet} 
                           disabled
                           className="w-full p-2 border border-gray-400 mb-3 outline-none bg-gray-200 text-gray-700"
                        >
                           <option value="Dana Laci">Dana Laci</option>
                           <option value="Dana Bebas">Dana Bebas</option>
                        </select>
                        
                        <label className="block mb-1">Keterangan Pengeluaran:</label>
                        <input 
                        type="text" required value={newExpenseName} onChange={(e) => setNewExpenseName(e.target.value)}
                        className="w-full p-2 border border-gray-400 mb-3 outline-none focus:border-blue-600"
                        placeholder="Cth: Beli Galon Air"
                        />
                        <label className="block mb-1">Nominal (Rp):</label>
                        <input 
                        type="number" required value={newExpenseAmount} onChange={(e) => setNewExpenseAmount(e.target.value)}
                        className="w-full p-2 border border-gray-400 mb-4 outline-none focus:border-blue-600"
                        placeholder="0"
                        />
                        <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowExpenseModal(false)} className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold">Batal</button>
                        <button type="submit" className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold text-red-600">Catat Pengeluaran</button>
                        </div>
                    </form>
                    
                    <div className="mt-4 pt-4 border-t border-gray-400 text-center">
                        <button type="button" onClick={handleLoadDummy} className="text-[10px] text-blue-800 hover:text-blue-950 underline font-bold">
                        Buat Data Dummy (Untuk Praktek)
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {showPrintOptionsModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-sm flex flex-col shadow-xl">
                    <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                    <span>Opsi Cetak & Simpan</span>
                    <button onClick={() => setShowPrintOptionsModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                    </div>
                    <div className="p-4 text-black text-center text-sm">
                    <p className="mb-4 font-bold text-lg text-green-700">Transaksi Berhasil Disimpan!</p>
                    <p className="mb-6 text-gray-700">Pilih tindakan selanjutnya:</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => { 
                            setShowPrintOptionsModal(false); 
                            window.print();
                        }} className="w-full py-3 border-2 border-gray-500 bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-sm">Cetak Nota Sekarang</button>
                        <button onClick={() => { setShowPrintOptionsModal(false); }} className="w-full py-2 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold">Lanjutkan Tanpa Cetak</button>
                    </div>
                    </div>
                </div>
                </div>
            )}

            {/* Print Section (Hidden on screen, visible on print) */}
            <div id="print-section" className="hidden print:block text-black bg-white p-4 font-mono text-[10px] w-[80mm] mx-auto absolute top-0 left-0">
                {(() => {
                    const activePrintTrx = reprintTx || transactions[0];
                    if (!activePrintTrx) return null;
                    return (
                        <div className="flex flex-col gap-1 items-center pb-8">
                            <h2 className="font-bold text-base text-center">{storeSettings.storeName || 'Toko Saya'}</h2>
                            <p className="text-center">{storeSettings.address || 'Alamat Toko'}</p>
                            <p className="text-center">{storeSettings.phone || '0812xxxxxx'}</p>
                            <p className="border-b border-dashed border-black w-full pb-1 mb-1 mt-1 text-center">Faktur: {activePrintTrx.id}</p>
                            
                            <div className="w-full flex justify-between mb-2">
                                <span>Kasir: {activePrintTrx.cashier}</span>
                                <span>{activePrintTrx.isoDate ? new Date(activePrintTrx.isoDate).toLocaleDateString('id-ID') : (activePrintTrx.date || '')}</span>
                            </div>
                            
                            <div className="w-full border-b border-black mb-1"></div>
                            {(activePrintTrx.items || []).map((item: any, idx: number) => (
                                <div key={idx} className="w-full flex flex-col mb-1">
                                    <span>{item.name}</span>
                                    <div className="flex justify-between w-full pl-2">
                                        <span>{item.qty} x {item.price.toLocaleString('id-ID')}</span>
                                        <span>{(item.qty * item.price).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="w-full border-b border-black mt-1 mb-1"></div>
                            
                            {(activePrintTrx.globalDiscount || 0) > 0 && (
                            <div className="w-full flex justify-between font-bold">
                                <span>Diskon:</span>
                                <span>- {(activePrintTrx.globalDiscount || 0).toLocaleString('id-ID')}</span>
                            </div>
                            )}
                            <div className="w-full flex justify-between font-bold text-sm">
                                <span>Total:</span>
                                <span>{(activePrintTrx.total || 0).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="w-full flex justify-between mt-1">
                                <span>Bayar:</span>
                                <span>{(activePrintTrx.paid || activePrintTrx.amountPaid || 0).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="w-full flex justify-between mb-2">
                                <span>Kembali:</span>
                                <span>{(activePrintTrx.change || 0).toLocaleString('id-ID')}</span>
                            </div>

                            <p className="text-center italic mt-4">Terima Kasih!</p>
                        </div>
                    );
                })()}
            </div>

             {showAddCustomerModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-sm flex flex-col shadow-xl">
                    <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                    <span>Input Pelanggan Baru</span>
                    <button onClick={() => setShowAddCustomerModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                    </div>
                    <div className="p-4 text-black text-sm">
                    <form onSubmit={handleAddCustomer}>
                        <label className="block mb-1">Nama Pelanggan / Toko:</label>
                        <input type="text" required value={newCustomerName} onChange={(e) => setNewCustomerName(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-2 outline-none focus:border-blue-600" />
                        <label className="block mb-1">Alamat Lengkap:</label>
                        <input type="text" required value={newCustomerAddress} onChange={(e) => setNewCustomerAddress(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-2 outline-none focus:border-blue-600" />
                        <label className="block mb-1">No. Telp / WA:</label>
                        <input type="text" required value={newCustomerPhone} onChange={(e) => setNewCustomerPhone(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-2 outline-none focus:border-blue-600" />
                        <label className="block mb-1">Level Harga:</label>
                        <select value={newCustomerLevel} onChange={(e) => setNewCustomerLevel(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-4 outline-none focus:border-blue-600">
                        <option value={1}>Level 1</option>
                        <option value={2}>Level 2</option>
                        <option value={3}>Level 3 (Affiliate/Expo)</option>
                        </select>
                        <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddCustomerModal(false)} className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold">Batal</button>
                        <button type="submit" className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold">Simpan</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            )}

            {showAddEmpModal && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-sm flex flex-col shadow-xl">
                    <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                    <span>Tambah Karyawan Baru</span>
                    <button onClick={() => setShowAddEmpModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                    </div>
                    <div className="p-4 text-black text-sm">
                    <form onSubmit={handleAddEmployee}>
                        <label className="block mb-1">Nama Lengkap:</label>
                        <input type="text" required value={newEmpName} onChange={(e) => setNewEmpName(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-3 outline-none focus:border-blue-600" />
                        <label className="block mb-1">Posisi / Jabatan:</label>
                        <input type="text" required value={newEmpPos} onChange={(e) => setNewEmpPos(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-3 outline-none focus:border-blue-600" />
                        <label className="block mb-1">No WA:</label>
                        <input type="text" value={newEmpPhone} onChange={(e) => setNewEmpPhone(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-3 outline-none focus:border-blue-600" placeholder="Contoh: 08123456789" />
                        <label className="block mb-1">Gaji Perhari (Rp):</label>
                        <input type="number" value={newEmpSalary} onChange={(e) => setNewEmpSalary(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-3 outline-none focus:border-blue-600" placeholder="Contoh: 150000" />
                        <label className="block mb-1">Penempatan Cabang:</label>
                        <select required value={newEmpBranch} onChange={(e) => setNewEmpBranch(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-4 outline-none focus:border-blue-600">
                            {storeSettings?.branches?.map((b: string) => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddEmpModal(false)} className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold">Batal</button>
                        <button type="submit" className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold text-blue-900">Simpan Data</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            )}

            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-md flex flex-col shadow-xl">
                    <div className="bg-red-800 text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                        <span>Peringatan Keluar Sistem</span>
                        <button onClick={() => setShowLogoutConfirm(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                    </div>
                    <div className="p-6 text-black flex flex-col gap-4 text-center">
                        <h3 className="text-xl font-bold text-red-700">PERHATIAN: BACKUP DATA ANDA!</h3>
                        <p className="text-sm font-medium">Banyak data pada mode lokal ini yang tidak tersinkronisasi. Sebelum Anda Logout, <b>SISIHKAN 1 MENIT UNTUK BACKUP DATA ANDA TERLEBIH DAHULU</b> agar tidak hilang bila cache terhapus.</p>
                        <div className="flex flex-col gap-2 mt-2 border-y border-gray-400 py-4 mb-2">
                            <button onClick={() => {
                                const allData = { 
                                    inventory, customers, suppliers, orderData, supplierReturns,
                                    employees, attendances, leaveRequests, transactions, expenses,
                                    piutangData, pendingTransactions, appUsers, storeSettings
                                };
                                const jsonStr = JSON.stringify(allData, null, 2);
                                const blob = new Blob([jsonStr], { type: 'application/json' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `backup_master_data_logout_${new Date().toISOString().split('T')[0]}.json`;
                                a.click();
                                URL.revokeObjectURL(url);
                                alert('Data berhasil terdownload. Silakan simpan file JSON tersebut.');
                            }} className="w-full font-bold bg-green-600 text-white py-3 shadow border border-green-800 hover:bg-green-700 flex items-center justify-center gap-2">
                                <DownloadCloud className="w-5 h-5"/> KLIK DISINI UNTUK BACKUP DATA DULU
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 bg-gray-200 border-2 border-gray-500 font-bold hover:bg-gray-300 py-2">Batal Keluar</button>
                            <button onClick={() => { setUser(null); setShowLogoutConfirm(false); setPendingUser(null); window.location.reload(); }} className="flex-1 bg-white text-red-600 border border-red-300 font-bold hover:bg-red-50 py-2">Tetap Keluar</button>
                        </div>
                    </div>
                </div>
                </div>
            )}
        </>
    )
}
