import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatRp } from '../utils';
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
        appLogs, addLog
    } = useAppContext();

    const [newExpenseName, setNewExpenseName] = useState('');
    const [newExpenseAmount, setNewExpenseAmount] = useState('');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerAddress, setNewCustomerAddress] = useState('');
    const [newCustomerPhone, setNewCustomerPhone] = useState('');
    const [newCustomerLevel, setNewCustomerLevel] = useState('1');
    const [newEmpName, setNewEmpName] = useState('');
    const [newEmpPos, setNewEmpPos] = useState('');
    const [authPassword, setAuthPassword] = useState('');

    const loadPendingTransaction = (pendingItem: any) => {
        setCart(pendingItem.items);
        setSelectedCustomerId(pendingItem.customerId);
        setPendingTransactions(pendingTransactions.filter((p: any) => p.id !== pendingItem.id));
        setShowPendingModal(false);
    };

    const bayarPiutang = (id: string) => {
        setPiutangData(piutangData.filter((p: any) => p.id !== id));
        alert('Piutang dilunasi!');
    };

    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        const expense = {
            id: 'EXP-' + Date.now(),
            date: `${transactionDate} ${new Date().toLocaleTimeString('id-ID')}`,
            isoDate: new Date(transactionDate).toISOString(),
            name: newExpenseName,
            amount: parseInt(newExpenseAmount),
            cashier: user.name,
            branch: storeSettings.activeBranch || 'Pusat'
        };
        setExpenses([expense, ...expenses]);
        addLog('PENGELUARAN', `Rp ${expense.amount.toLocaleString('id-ID')} untuk ${expense.name}`);
        setNewExpenseName('');
        setNewExpenseAmount('');
        setShowExpenseModal(false);
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
        setEmployees([...employees, { id: Date.now(), name: newEmpName, position: newEmpPos }]);
        addLog('KARYAWAN', `Karyawan baru ditambahkan: ${newEmpName}`);
        setNewEmpName(''); setNewEmpPos(''); setShowAddEmpModal(false);
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

            {showPendingModal && (
                <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-[#8fb4d9] border-2 border-gray-400 w-full max-w-2xl flex flex-col shadow-xl h-[70vh]">
                        <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between shrink-0">
                        <span>Daftar Transaksi Pending</span>
                        <button onClick={() => setShowPendingModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                        </div>
                        <div className="p-2 overflow-y-auto flex-1 text-black">
                        {pendingTransactions.length === 0 ? (
                            <div className="bg-white border border-gray-400 p-4 text-center text-sm">Tidak ada transaksi yang dipending.</div>
                        ) : (
                            <table className="w-full text-left bg-white border border-gray-400 border-collapse">
                            <thead>
                                <tr className="border-b-2 border-gray-400 bg-gray-100">
                                <th className="p-2 border-r border-gray-300 font-bold">Waktu / ID</th>
                                <th className="p-2 border-r border-gray-300 font-bold">Pelanggan</th>
                                <th className="p-2 border-r border-gray-300 font-bold">Item</th>
                                <th className="p-2 border-r border-gray-300 font-bold text-right">Total</th>
                                <th className="p-2 font-bold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingTransactions.map((p: any) => (
                                <tr key={p.id} className="border-b hover:bg-blue-50">
                                    <td className="p-2 border-r border-gray-300">{p.time} / {p.id}</td>
                                    <td className="p-2 border-r border-gray-300 font-bold">{p.customerName}</td>
                                    <td className="p-2 border-r border-gray-300">{p.items.reduce((acc: number, item: any) => acc + item.qty, 0)} Pcs</td>
                                    <td className="p-2 border-r border-gray-300 text-right font-bold text-blue-900">{formatRp(p.total)}</td>
                                    <td className="p-2 text-center">
                                    <button onClick={() => loadPendingTransaction(p)} className="border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 px-3 py-1 font-bold shadow-sm">Lanjutkan</button>
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
                            <th className="p-2 border-r border-gray-300 font-bold">ID / Waktu</th>
                            <th className="p-2 border-r border-gray-300 font-bold">Pelanggan</th>
                            <th className="p-2 border-r border-gray-300 font-bold text-right">Total Transaksi</th>
                            <th className="p-2 border-r border-gray-300 font-bold text-right">Sisa Tagihan</th>
                            <th className="p-2 font-bold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {piutangData.map((p: any) => (
                            <tr key={p.id} className="border-b hover:bg-blue-50">
                                <td className="p-2 border-r border-gray-300">{p.id} / {p.date.split(' ')[1]}</td>
                                <td className="p-2 border-r border-gray-300 font-bold">{p.customer}</td>
                                <td className="p-2 border-r border-gray-300 text-right">{formatRp(p.total)}</td>
                                <td className="p-2 border-r border-gray-300 text-right font-bold text-red-600 text-sm">{formatRp(p.sisa)}</td>
                                <td className="p-2 text-center">
                                <button onClick={() => bayarPiutang(p.id)} className="border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 px-3 py-1 font-bold shadow-sm">Terima Cicilan/Lunas</button>
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
                    <span>Input Pengeluaran Laci</span>
                    <button onClick={() => setShowExpenseModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                    </div>
                    <div className="p-4 text-black text-sm">
                    <form onSubmit={handleAddExpense}>
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
                {transactions.length > 0 && (
                    <div className="flex flex-col gap-1 items-center pb-8">
                        <h2 className="font-bold text-base text-center">{storeSettings.storeName || 'Toko Saya'}</h2>
                        <p className="text-center">{storeSettings.address || 'Alamat Toko'}</p>
                        <p className="text-center">{storeSettings.phone || '0812xxxxxx'}</p>
                        <p className="border-b border-dashed border-black w-full pb-1 mb-1 mt-1 text-center">Faktur: {transactions[0].id}</p>
                        
                        <div className="w-full flex justify-between mb-2">
                            <span>Kasir: {transactions[0].cashier}</span>
                            <span>{new Date(transactions[0].isoDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        
                        <div className="w-full border-b border-black mb-1"></div>
                        {transactions[0].items.map((item: any, idx: number) => (
                            <div key={idx} className="w-full flex flex-col mb-1">
                                <span>{item.name}</span>
                                <div className="flex justify-between w-full pl-2">
                                    <span>{item.qty} x {item.price.toLocaleString('id-ID')}</span>
                                    <span>{(item.qty * item.price).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        ))}
                        <div className="w-full border-b border-black mt-1 mb-1"></div>
                        
                        {transactions[0].globalDiscount > 0 && (
                        <div className="w-full flex justify-between font-bold">
                            <span>Diskon:</span>
                            <span>- {transactions[0].globalDiscount.toLocaleString('id-ID')}</span>
                        </div>
                        )}
                        <div className="w-full flex justify-between font-bold text-sm">
                            <span>Total:</span>
                            <span>{transactions[0].total.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="w-full flex justify-between mt-1">
                            <span>Bayar:</span>
                            <span>{transactions[0].paid.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="w-full flex justify-between mb-2">
                            <span>Kembali:</span>
                            <span>{transactions[0].change.toLocaleString('id-ID')}</span>
                        </div>

                        <p className="text-center italic mt-4">Terima Kasih!</p>
                    </div>
                )}
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
                        <option value={1}>Level 1 (Umum)</option>
                        <option value={2}>Level 2 (Grosir)</option>
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
                        <input type="text" required value={newEmpPos} onChange={(e) => setNewEmpPos(e.target.value)} className="w-full p-1.5 border border-gray-400 mb-4 outline-none focus:border-blue-600" />
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
