import React, { useState } from 'react';
import { smartSort, formatRp } from '../utils';
import { Printer, MonitorSmartphone, Server, Lock, DownloadCloud, UploadCloud, Database, History, Trash2, AlertTriangle, Check, Eye, EyeOff } from 'lucide-react';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { useAppContext } from '../context/AppContext';

export const SettingsPanel = ({ currentTime }: { currentTime: Date }) => {
  const { 
      user, storeSettings, setStoreSettings, setPendingUser, appUsers, setAppUsers, 
      inventory, setInventory, customers, setCustomers, suppliers, setSuppliers, orderData, setOrderData, supplierReturns, setSupplierReturns, setShowLogoutConfirm,
      employees, setEmployees, attendances, setAttendances, leaveRequests, setLeaveRequests, transactions, setTransactions, expenses, setExpenses, piutangData, setPiutangData, pendingTransactions, setPendingTransactions, appLogs, addLog,
      setShowAddEmpModal, setShowAddCustomerModal
  } = useAppContext();
  const [settingTab, setSettingTab] = useState('tools');
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', address: '' });
  
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
  const [editUser, setEditUser] = useState<any>(null);
  const [showEditPasswords, setShowEditPasswords] = useState(false);
  const [showSyncMarginModal, setShowSyncMarginModal] = useState<{cat: string, lv1: number, lv2: number, lv3: number} | null>(null);
  const [isSyncingMargin, setIsSyncingMargin] = useState(false);

  // Sorting states
  const [empSortKey, setEmpSortKey] = useState('id');
  const [empSortDirection, setEmpSortDirection] = useState<'asc' | 'desc'>('asc');
  const [custSortKey, setCustSortKey] = useState('id');
  const [custSortDirection, setCustSortDirection] = useState<'asc' | 'desc'>('asc');
  const [supSortKey, setSupSortKey] = useState('id');
  const [supSortDirection, setSupSortDirection] = useState<'asc' | 'desc'>('asc');
  const [promoSortKey, setPromoSortKey] = useState('id');
  const [promoSortDirection, setPromoSortDirection] = useState<'asc' | 'desc'>('asc');
  const [snapSortKey, setSnapSortKey] = useState('timestamp');
  const [snapSortDirection, setSnapSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleEmpSort = (key: string) => {
    if (empSortKey === key) setEmpSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else { setEmpSortKey(key); setEmpSortDirection('asc'); }
  };
  const handleCustSort = (key: string) => {
    if (custSortKey === key) setCustSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else { setCustSortKey(key); setCustSortDirection('asc'); }
  };
  const handleSupSort = (key: string) => {
    if (supSortKey === key) setSupSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else { setSupSortKey(key); setSupSortDirection('asc'); }
  };
  const handlePromoSort = (key: string) => {
    if (promoSortKey === key) setPromoSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else { setPromoSortKey(key); setPromoSortDirection('asc'); }
  };
  const handleSnapSort = (key: string) => {
    if (snapSortKey === key) setSnapSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else { setSnapSortKey(key); setSnapSortDirection('desc'); }
  };

  const handleBackupData = () => {
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
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="PENGATURAN SISTEM" currentTime={currentTime} />
      
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10 overflow-x-auto no-scrollbar">
         <button onClick={() => setSettingTab('tools')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${settingTab === 'tools' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Tools & Backup</button>
         <button onClick={() => setSettingTab('margins')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${settingTab === 'margins' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Harga Level</button>
         <button onClick={() => setSettingTab('karyawan')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${settingTab === 'karyawan' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Data Karyawan</button>
         <button onClick={() => setSettingTab('pelanggan')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${settingTab === 'pelanggan' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Data Pelanggan</button>
         <button onClick={() => setSettingTab('supliyer')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${settingTab === 'supliyer' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Data Supliyer</button>
         <button onClick={() => setSettingTab('promo')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${settingTab === 'promo' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Promo</button>
         {(user?.role === 'owner' || user?.role === 'admin') && (
             <button onClick={() => setSettingTab('akun')} className={`px-2.5 py-1 text-[10px] md:text-xs md:px-4 md:py-1.5 whitespace-nowrap shrink-0 border border-gray-500 font-bold hover:bg-white ${settingTab === 'akun' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Akun Login & Hak Akses</button>
         )}
      </div>

      <div className="flex-1 p-4 md:p-6 flex flex-col h-full gap-2 overflow-y-auto w-full max-w-5xl bg-[#ece9d8] border border-gray-400 shadow-inner mx-2 my-2">
           
           {settingTab === 'margins' && (
              <div className="flex flex-col gap-4">
                 <div className="flex gap-2 items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-bold text-blue-900">Pengaturan Persentase Harga Level</h2>
                 </div>
                 <div className="text-gray-600 mb-4 text-sm max-w-lg">
                    Atur nilai persentase default untuk Harga Level 1, Level 2, dan Level 3. Persentase ini akan digunakan untuk menghitung otomatis harga jual saat menginput stok baru berdasarkan kategori barang. Jika kategori tidak diatur, maka nilai UMUM akan digunakan.
                 </div>
                 <table className="w-full max-w-2xl border-collapse text-left text-sm mb-4">
                    <thead>
                      <tr className="bg-gray-100 border-y border-gray-300">
                        <th className="p-2">Kategori</th>
                        <th className="p-2 w-28">Level 1 (%)</th>
                        <th className="p-2 w-28">Level 2 (%)</th>
                        <th className="p-2 w-28">Level 3 (%)</th>
                        <th className="p-2 w-16 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(storeSettings.margins || { UMUM: {level1: 75, level2: 15, level3: 10} }).map(cat => {
                        const currentMargins = storeSettings.margins || { UMUM: {level1: 75, level2: 15, level3: 10} };
                        return (
                        <tr key={cat} className="border-b border-gray-200">
                          <td className="p-2 font-bold">{cat}</td>
                          <td className="p-2">
                            <input 
                              type="number" 
                              className="border border-gray-400 p-1 w-full" 
                              value={currentMargins[cat]?.level1 || 0} 
                              onChange={e => setStoreSettings({...storeSettings, margins: {...(storeSettings.margins||{}), [cat]: {...(currentMargins[cat]||{}), level1: parseInt(e.target.value)||0}}})}
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="number" 
                              className="border border-gray-400 p-1 w-full" 
                              value={currentMargins[cat]?.level2 || 0} 
                              onChange={e => setStoreSettings({...storeSettings, margins: {...(storeSettings.margins||{}), [cat]: {...(currentMargins[cat]||{}), level2: parseInt(e.target.value)||0}}})}
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="number" 
                              className="border border-gray-400 p-1 w-full" 
                              value={currentMargins[cat]?.level3 || 0} 
                              onChange={e => setStoreSettings({...storeSettings, margins: {...(storeSettings.margins||{}), [cat]: {...(currentMargins[cat]||{}), level3: parseInt(e.target.value)||0}}})}
                            />
                          </td>
                          <td className="p-2 text-center">
                            {cat !== 'UMUM' && (
                                <button
                                    onClick={() => {
                                        if (confirm(`Hapus margin untuk kategori ${cat}?`)) {
                                            const newMargins = { ...storeSettings.margins };
                                            delete newMargins[cat];
                                            setStoreSettings({ ...storeSettings, margins: newMargins });
                                            addLog('SETTING_MARGIN', `Kategori margin dihapus: ${cat}`);
                                        }
                                    }}
                                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                          </td>
                        </tr>
                      )})}
                    </tbody>
                 </table>
                 
                 <form onSubmit={(e) => {
                     e.preventDefault();
                     const formData = new FormData(e.currentTarget);
                     const cat = formData.get('category') as string;
                     const lv1 = parseInt(formData.get('level1') as string) || 0;
                     const lv2 = parseInt(formData.get('level2') as string) || 0;
                     const lv3 = parseInt(formData.get('level3') as string) || 0;
                     if (!cat) return;
                     setShowSyncMarginModal({ cat: cat.toUpperCase(), lv1, lv2, lv3 });
                     e.currentTarget.reset();
                 }} className="flex gap-2 items-end bg-gray-50 border border-gray-300 p-3 max-w-2xl">
                    <div className="flex flex-col gap-1 w-1/4">
                      <label className="text-xs font-bold">Kategori Baru:</label>
                      <input name="category" required className="border border-gray-400 p-2" placeholder="Cth: OBAT" />
                    </div>
                    <div className="flex flex-col gap-1 w-[80px]">
                      <label className="text-xs font-bold">Lvl 1 (%):</label>
                      <input name="level1" type="number" required className="border border-gray-400 p-2" defaultValue="50" />
                    </div>
                    <div className="flex flex-col gap-1 w-[80px]">
                      <label className="text-xs font-bold">Lvl 2 (%):</label>
                      <input name="level2" type="number" required className="border border-gray-400 p-2" defaultValue="10" />
                    </div>
                    <div className="flex flex-col gap-1 w-[80px]">
                      <label className="text-xs font-bold">Lvl 3 (%):</label>
                      <input name="level3" type="number" required className="border border-gray-400 p-2" defaultValue="5" />
                    </div>
                    <button type="submit" className="bg-green-600 text-white font-bold px-4 py-2 hover:bg-green-700">Tambah</button>
                 </form>
              </div>
           )}

           {settingTab === 'tools' && (
              <div className="flex flex-col gap-4">
                 <div className="flex gap-2 items-center mb-4 border-b pb-2">
                    <Printer className="w-8 h-8 text-gray-500" />
                    <h2 className="text-xl font-bold text-blue-900">Pengaturan Printer & Invoice</h2>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-bold text-sm">Nama Toko</label>
                       <input value={storeSettings.storeName} onChange={e => setStoreSettings({...storeSettings, storeName: e.target.value})} className="border border-gray-400 p-2 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-bold text-sm">No Telp Toko</label>
                       <input value={storeSettings.storePhone} onChange={e => setStoreSettings({...storeSettings, storePhone: e.target.value})} className="border border-gray-400 p-2 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2">
                       <label className="font-bold text-sm">Alamat Toko</label>
                       <input value={storeSettings.storeAddress} onChange={e => setStoreSettings({...storeSettings, storeAddress: e.target.value})} className="border border-gray-400 p-2 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-bold text-sm">Pesan Footer Struk (Bawah)</label>
                       <input value={storeSettings.footerText} onChange={e => setStoreSettings({...storeSettings, footerText: e.target.value})} className="border border-gray-400 p-2 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-bold text-sm">Cabang Aktif 
                          <button 
                             onClick={() => {
                                 const branchName = prompt('Masukan nama cabang baru:');
                                 if (branchName) {
                                     setStoreSettings({...storeSettings, branches: [...(storeSettings.branches || ['Pusat']), branchName]});
                                     alert('Cabang berhasil ditambahkan!');
                                 }
                             }}
                             className="ml-2 bg-blue-600 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-700">
                             + Tambah Cabang
                          </button>
                       </label>
                       <select value={storeSettings.activeBranch || 'Pusat'} onChange={e => setStoreSettings({...storeSettings, activeBranch: e.target.value})} className="border border-gray-400 p-2 outline-none">
                          {(storeSettings.branches || ['Pusat']).map((b: string) => <option key={b} value={b}>{b}</option>)}
                       </select>
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-bold text-sm">Driver Printer Aktif</label>
                       <select value={storeSettings.printerDriver} onChange={e => setStoreSettings({...storeSettings, printerDriver: e.target.value})} className="border border-gray-400 p-2 outline-none">
                          <option>Generic / Text Only</option>
                          <option>Epson TM-T82</option>
                          <option>POS-58 Thermal</option>
                       </select>
                    </div>
                 </div>
                 <button className="bg-blue-600 text-white font-bold py-2 shadow hover:bg-blue-700 w-48 mt-4" onClick={() => {
                     alert('Pengaturan Disimpan!');
                     addLog('SETTING_SISTEM', 'Pengaturan Profil / Print / Invoice disimpan');
                 }}>Simpan Pengaturan</button>

                 <div className="flex gap-2 items-center mb-4 border-b pb-2 mt-8">
                    <MonitorSmartphone className="w-8 h-8 text-gray-500" />
                    <h2 className="text-xl font-bold text-blue-900">Kalibrasi Scanner Barcode</h2>
                 </div>
                 <p className="text-sm text-gray-600 mb-2">Konfigurasi ini disesuaikan dengan merk scanner barcode yang Anda gunakan agar dapat langsung memasukkan barang ke keranjang.</p>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                       <label className="font-bold text-sm">Karakter Awalan (Prefix)</label>
                       <input value={storeSettings.scannerPrefix} onChange={e => setStoreSettings({...storeSettings, scannerPrefix: e.target.value})} placeholder="(Kosongkan jika tidak ada)" className="border border-gray-400 p-2 outline-none" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <label className="font-bold text-sm">Karakter Akhiran (Suffix)</label>
                       <select value={storeSettings.scannerSuffix} onChange={e => setStoreSettings({...storeSettings, scannerSuffix: e.target.value})} className="border border-gray-400 p-2 outline-none">
                          <option value="Enter">Enter / Line Feed (\n)</option>
                          <option value="Tab">Tab (\t)</option>
                          <option value="None">Tidak ada</option>
                       </select>
                    </div>
                 </div>
                 <button className="bg-blue-600 text-white font-bold py-2 shadow hover:bg-blue-700 w-48 mt-4" onClick={() => {
                     alert('Kalibrasi Disimpan!');
                     addLog('SETTING_SISTEM', 'Kalibrasi Scanner disimpan');
                 }}>Simpan Kalibrasi</button>

                 <div className="flex gap-2 items-center mt-8 mb-4 border-b pb-2 border-gray-300">
                    <Server className="w-8 h-8 text-gray-500" />
                    <h2 className="text-xl font-bold text-blue-900">Sinkronisasi Cloud Backup</h2>
                 </div>
                 <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-blue-900 font-bold mb-1">Status Sinkronisasi Saat Ini:</p>
                    <p className="text-xl font-mono text-blue-800">{storeSettings.syncEnabled ? 'AKTIF - Terhubung ke Cloud' : 'TIDAK AKTIF - Mode Offline Lokal'}</p>
                 </div>
                 <button onClick={() => {
                    setStoreSettings({...storeSettings, syncEnabled: !storeSettings.syncEnabled});
                    if (!storeSettings.syncEnabled) addLog('SINKRONISASI', 'Sinkronisasi Cloud Diaktifkan');
                    else addLog('SINKRONISASI', 'Sinkronisasi Cloud Dimatikan');
                    alert(storeSettings.syncEnabled ? 'Sinkronisasi dimatikan.' : 'Berhasil terhubung ke server Cloud! Data akan dibackup otomatis setiap 1 jam.');
                 }} className={`font-bold py-3 mt-4 text-white shadow max-w-sm ${storeSettings.syncEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                    <DownloadCloud className="w-5 h-5 inline-block mr-2" />
                    {storeSettings.syncEnabled ? 'Matikan Autobackup Cloud' : 'Aktifkan Cloud Database'}
                 </button>

             <div className="flex flex-col bg-[#ece9d8] text-black p-4 mt-8 border border-gray-400">
               {/* Retro Panel Header */}
               <div className="bg-[#000080] text-white px-3 py-1.5 flex flex-wrap items-center font-bold text-[10px] md:text-xs justify-between mb-4 shadow border border-gray-400">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Database className="w-4 h-4 text-amber-400 shrink-0" /> RECOVERY & DATABASE MAINTENANCE CENTER (PIN: ACTIVE)
                </span>
                <span className="text-[10px] font-mono text-gray-300">SYSTEM RECOVERY ENG. v2.1</span>
              </div>

              {/* Grid 1: Database Size Summary */}
              <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
                {[
                  { label: 'Total Barang (SKU)', count: inventory?.length || 0, color: 'text-blue-900 border-blue-300 bg-blue-50/50' },
                  { label: 'Mitra Pelanggan', count: customers?.length || 0, color: 'text-green-800 border-green-300 bg-green-50/50' },
                  { label: 'Mitra Supliyer', count: suppliers?.length || 0, color: 'text-amber-800 border-amber-300 bg-amber-50/50' },
                  { label: 'Nota Transaksi', count: transactions?.length || 0, color: 'text-indigo-800 border-indigo-300 bg-indigo-50/50' },
                  { label: 'Pos Pengeluaran', count: expenses?.length || 0, color: 'text-rose-800 border-rose-300 bg-rose-50/50' },
                  { label: 'Staff Karyawan', count: employees?.length || 0, color: 'text-teal-800 border-teal-300 bg-teal-50/50' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-2.5 border border-gray-400 bg-white shadow-sm flex flex-col justify-between min-h-[70px] shrink-0 min-w-[120px] md:min-w-[150px] ${item.color}`}>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-gray-500 mb-1 break-words">{item.label}</p>
                    <p className="text-xl md:text-2xl font-black font-mono tracking-tight leading-none mt-auto">{item.count}</p>
                  </div>
                ))}
              </div>

              {/* Grid 2: Core Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 1. LOCAL SNAPSHOTS PANEL - Left (7 cols) */}
                <div className="lg:col-span-7 bg-white border border-gray-400 shadow-sm flex flex-col min-h-[350px]">
                  <div className="bg-gray-400 text-black px-3 py-1.5 font-bold text-xs flex flex-wrap gap-2 items-center justify-between border-b border-gray-400">
                    <span className="flex items-center gap-1.5 min-w-0"><History className="w-3.5 h-3.5 shrink-0" /> <span className="truncate">Snapshot DB Lokal (Max 10)</span></span>
                    <button 
                      onClick={() => {
                        const desc = prompt('Masukkan keterangan singkat untuk snapshot ini:\n(Contoh: "Sebelum Update Harga Mei", "Keadaan Jam 12 Siang")');
                        if (desc === null) return;
                        const finalDesc = desc.trim() || 'Manual Checkpoint - ' + new Date().toLocaleTimeString();
                        
                        const newSnap = {
                          id: 'SNAP-' + Date.now(),
                          label: finalDesc,
                          timestamp: new Date().toISOString(),
                          meta: {
                            inventory: inventory?.length || 0,
                            customers: customers?.length || 0,
                            suppliers: suppliers?.length || 0,
                            transactions: transactions?.length || 0,
                            expenses: expenses?.length || 0,
                            employees: employees?.length || 0
                          },
                          data: {
                            inventory, customers, suppliers, orderData, supplierReturns,
                            employees, attendances, leaveRequests, transactions, expenses,
                            piutangData, pendingTransactions, appUsers, storeSettings
                          }
                        };
                        const updated = [newSnap, ...snapshots].slice(0, 10); // Limit 10 to protect localStorage size
                        setSnapshots(updated);
                        localStorage.setItem('POS_Snapshots', JSON.stringify(updated));
                        alert('Snapshot berhasil disimpan dalam browser! Anda dapat merestore data ke keadaan ini kapan saja.');
                      }} 
                      className="bg-gray-200 hover:bg-white text-black font-bold px-2 py-0.5 border border-gray-500 text-[10px] shadow-sm ml-2"
                    >
                      + Buat Snapshot Baru
                    </button>
                  </div>
                  <div className="p-3 bg-blue-50 border-b border-gray-300 text-xs text-blue-950 font-medium">
                    💡 <b>Snapshot Lokal</b> menyimpan replika database saat ini di dalam penampung internal browser Anda secara langsung tanpa internet. Sangat disarankan untuk membuat snapshot baru sebelum mengubah harga massal atau menghapus transaksi.
                  </div>
                  <div className="p-3 flex-1 overflow-x-auto max-h-[310px] w-full">
                    {snapshots.length === 0 ? (
                      <div className="h-40 flex flex-col items-center justify-center border border-dashed border-gray-300 bg-gray-50 gap-2 p-4 text-center">
                        <History className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                        <p className="font-bold text-gray-500 text-xs">Belum Ada Checkpoint Tersimpan</p>
                        <p className="text-[10px] text-gray-400 max-w-xs">Tekan tombol di kanan atas untuk membuat checkpoint instan dalam 1 detik.</p>
                      </div>
                    ) : (
                      <div className="min-w-[550px]">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="select-none text-black">
                            <tr className="bg-slate-100 border-b-2 border-gray-400">
                              <th className="p-2 font-bold text-gray-700 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSnapSort('label')} title="Urutkan Nama">
                                  <div className="flex items-center gap-1 justify-between">
                                      <span>Nama Checkpoint</span>
                                      <span className="font-mono text-[9px] text-[#000080]">{snapSortKey === 'label' ? (snapSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                  </div>
                              </th>
                              <th className="p-2 font-bold text-gray-700 whitespace-nowrap cursor-pointer hover:bg-slate-200" onClick={() => handleSnapSort('timestamp')} title="Urutkan Waktu">
                                  <div className="flex items-center gap-1 justify-between">
                                      <span>Waktu Simpan</span>
                                      <span className="font-mono text-[9px] text-[#000080]">{snapSortKey === 'timestamp' ? (snapSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                                  </div>
                              </th>
                              <th className="p-2 font-bold text-gray-700 whitespace-nowrap text-gray-400 select-none">Rincian Data</th>
                              <th className="p-2 font-bold text-gray-700 text-center whitespace-nowrap text-gray-400 select-none">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                          {smartSort(snapshots, snapSortKey, snapSortDirection).map((snap: any) => (
                            <tr key={snap.id} className="border-b border-gray-200 hover:bg-slate-50">
                              <td className="p-2 font-bold text-blue-900">{snap.label}</td>
                              <td className="p-2 text-gray-600 font-mono text-[10px]">
                                {new Date(snap.timestamp).toLocaleDateString('id-ID')} {new Date(snap.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="p-2 text-[10px] text-gray-500 max-w-[180px] truncate leading-tight">
                                📦 {snap.meta?.inventory || 0} SKU | 🧾 {snap.meta?.transactions || 0} Nota | 👥 {snap.meta?.customers || 0} Pelanggan
                              </td>
                              <td className="p-2">
                                <div className="flex flex-col md:flex-row justify-center gap-1">
                                  <button 
                                    onClick={() => {
                                      if (!window.confirm(`PERINGATAN KRITIKAL!\n\nApakah Anda yakin ingin memulihkan (Restore) database ke Checkpoint "${snap.label}"?\n\nSemua perubahan data transaksi, stok, dan pelanggan saat ini yang dilakukan SETELAH waktu checkpoint ini akan digantikan seluruhnya.`)) return;
                                      
                                      const d = snap.data;
                                      if (d.inventory) setInventory(d.inventory);
                                      if (d.customers) setCustomers(d.customers);
                                      if (d.suppliers) setSuppliers(d.suppliers);
                                      if (d.orderData) setOrderData(d.orderData);
                                      if (d.supplierReturns) setSupplierReturns(d.supplierReturns);
                                      if (d.employees) setEmployees(d.employees);
                                      if (d.attendances) setAttendances(d.attendances);
                                      if (d.leaveRequests) setLeaveRequests(d.leaveRequests);
                                      if (d.transactions) setTransactions(d.transactions);
                                      if (d.expenses) setExpenses(d.expenses);
                                      if (d.piutangData) setPiutangData(d.piutangData);
                                      if (d.pendingTransactions) setPendingTransactions(d.pendingTransactions);
                                      if (d.appUsers) setAppUsers(d.appUsers);
                                      if (d.storeSettings) setStoreSettings(d.storeSettings);
                                      
                                      addLog('RESTORE_DATA', `Restore database ke checkpoint: ${snap.label}`);
                                      alert(`Berhasil! Database dipulihkan sepenuhnya ke checkpoint: ${snap.label}`);
                                    }} 
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-1.5 py-1 text-[10px] w-full max-w-[60px]"
                                  >
                                    Restore
                                  </button>
                                  <button 
                                    onClick={() => {
                                      const jsonStr = JSON.stringify(snap.data, null, 2);
                                      const blob = new Blob([jsonStr], { type: 'application/json' });
                                      const url = URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      const sanitizedLabel = snap.label.toLowerCase().replace(/[^a-z0-9]/g, '_');
                                      a.download = `backup_NAVAPOS_${sanitizedLabel}_${new Date(snap.timestamp).getTime()}.json`;
                                      a.click();
                                      URL.revokeObjectURL(url);
                                    }} 
                                    className="bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300 font-bold px-1.5 py-1 text-[10px] w-full max-w-[60px]"
                                    title="Unduh file JSON"
                                  >
                                    Unduh
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (!window.confirm('Hapus snapshot ini dari browser?')) return;
                                      const updated = snapshots.filter(s => s.id !== snap.id);
                                      setSnapshots(updated);
                                      localStorage.setItem('POS_Snapshots', JSON.stringify(updated));
                                    }} 
                                    className="text-red-600 hover:text-red-800 p-1 bg-red-50 hover:bg-red-100 w-full max-w-[30px]"
                                    title="Hapus"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 mx-auto" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. EXTERNAL FILES PANEL - Right (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  
                  {/* File Backup (Export/Download JSON) */}
                  <div className="bg-white border border-gray-400 p-4 shadow-sm flex flex-col gap-3 min-h-[160px]">
                    <h3 className="font-bold text-xs text-green-700 border-b border-gray-255 pb-1.5 flex items-center gap-1.5">
                      <DownloadCloud className="w-4 h-4 text-green-600" /> EXPORT FILE FISIK DATABASE (.JSON)
                    </h3>
                    <p className="text-[11px] text-gray-600 leading-tight">Mengunduh replika berkas seluruh database toko Anda. Berkas ini adalah file fisik yang aman dipindahkan ke laptop lain, disimpan sebagai cadangan rahasia, atau dikirim via Whatsapp.</p>
                    <button 
                      onClick={() => {
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
                        a.download = `DB_NAVAPOS_FULL_${new Date().toISOString().split('T')[0]}_${Date.now()}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        alert("File cadangan .json berhasil diunduh ke folder Downloads Anda!");
                      }} 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 text-xs shadow-sm flex items-center justify-center gap-2 mt-auto"
                    >
                      <DownloadCloud className="w-4 h-4" /> UNDUH FILE CADANGAN SEKARANG
                    </button>
                  </div>

                  {/* File Restore (Import JSON with PREVIEW) */}
                  <div className="bg-white border border-gray-400 p-4 shadow-sm flex flex-col gap-3 min-h-[220px]">
                    <h3 className="font-bold text-xs text-blue-700 border-b border-gray-225 pb-1.5 flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4 text-blue-600" /> IMPORT & RESTORE FILE CADANGAN (.JSON)
                    </h3>
                    
                    {!uploadedFileStats ? (
                      <>
                        <p className="text-[11px] text-gray-600 leading-tight">Kembalikan atau pindahkan database Anda dengan mengunggah berkas .JSON cadangan yang telah Anda unduh sebelumnya.</p>
                        <div className="flex flex-col items-center justify-center py-5 border border-dashed border-blue-400 bg-blue-50/50 hover:bg-blue-50 cursor-pointer relative transition-colors">
                          <input 
                            type="file" 
                            accept=".json" 
                            id="file-upload" 
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                 try {
                                     const parsed = JSON.parse(event.target?.result as string);
                                     if (!parsed.inventory && !parsed.transactions) {
                                       throw new Error("Format database tidak dikenali");
                                     }
                                     setUploadedFileData(parsed);
                                     setUploadedFileStats({
                                        fileName: file.name,
                                        fileSize: `${Math.round(file.size / 1024)} KB`,
                                        inventory: parsed.inventory?.length || 0,
                                        customers: parsed.customers?.length || 0,
                                        transactions: parsed.transactions?.length || 0,
                                        employees: parsed.employees?.length || 0,
                                        storeName: parsed.storeSettings?.storeName || 'Unknown store'
                                     });
                                 } catch (err) {
                                     alert('Gagal membaca file! Pastikan file adalah backup JSON valid dari sistem NAVA POS ini.');
                                 }
                              };
                              reader.readAsText(file);
                              e.target.value = '';
                            }} 
                          />
                          <UploadCloud className="w-8 h-8 text-blue-600 mb-1" />
                          <span className="font-bold text-xs text-blue-700">Pilih Berkas Backup (.json)</span>
                          <span className="text-[9px] text-gray-400">Tekan atau tarik file kemari</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2.5 p-3 rounded bg-blue-50 border border-blue-300 text-xs text-blue-900">
                        <div className="flex items-center justify-between font-bold border-b border-blue-200 pb-1">
                          <span>🔍 Informasi Berkas Masuk</span>
                          <button onClick={() => { setUploadedFileStats(null); setUploadedFileData(null); }} className="text-red-600 font-bold hover:underline">Batal</button>
                        </div>
                        <div className="grid grid-cols-2 gap-y-1 gap-x-2 font-mono text-[10px] leading-tight">
                          <div>Nama File:</div><div className="font-bold truncate">{uploadedFileStats.fileName}</div>
                          <div>Ukuran File:</div><div className="font-bold">{uploadedFileStats.fileSize}</div>
                          <div>Nama Toko:</div><div className="font-bold">{uploadedFileStats.storeName}</div>
                          <div>Data Barang:</div><div className="font-bold text-blue-800">{uploadedFileStats.inventory} SKU</div>
                          <div>Pelanggan:</div><div className="font-bold text-blue-800">{uploadedFileStats.customers} Kontak</div>
                          <div>Transaksi:</div><div className="font-bold text-blue-800">{uploadedFileStats.transactions} Nota</div>
                        </div>
                        
                        <div className="flex items-start gap-1 p-1.5 bg-amber-100 border border-amber-300 text-[10px] text-amber-950 py-1.5 leading-tight">
                          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-700" />
                          <span><b>Peringatan:</b> Menekan tombol "Restore" di bawah akan menghapus seluruh database Anda saat ini dan menimpanya dengan isi berkas ini.</span>
                        </div>
                        
                        <button 
                          onClick={() => {
                            if (!window.confirm('Apakah Anda yakin 100%?\n\nTindakan ini ireversibel. Data Anda saat ini yang tidak dibackup akan lenyap selamanya.')) return;
                            const d = uploadedFileData;
                            if (d.inventory) setInventory(d.inventory);
                            if (d.customers) setCustomers(d.customers);
                            if (d.suppliers) setSuppliers(d.suppliers);
                            if (d.orderData) setOrderData(d.orderData);
                            if (d.supplierReturns) setSupplierReturns(d.supplierReturns);
                            if (d.employees) setEmployees(d.employees);
                            if (d.attendances) setAttendances(d.attendances);
                            if (d.leaveRequests) setLeaveRequests(d.leaveRequests);
                            if (d.transactions) setTransactions(d.transactions);
                            if (d.expenses) setExpenses(d.expenses);
                            if (d.piutangData) setPiutangData(d.piutangData);
                            if (d.pendingTransactions) setPendingTransactions(d.pendingTransactions);
                            if (d.appUsers) setAppUsers(d.appUsers);
                            if (d.storeSettings) setStoreSettings(d.storeSettings);
                            
                            alert('Restore Sukses! Seluruh data Anda telah berhasil di-pulihkan dari berkas.');
                            setUploadedFileStats(null);
                            setUploadedFileData(null);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 shadow-sm flex items-center justify-center gap-2 mt-1.5"
                        >
                          <Check className="w-4 h-4" /> YA, RESTORE SEKARANG!
                        </button>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Reset Section */}
              <div className="mt-8 p-4 bg-red-50 border-2 border-red-400 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-10 h-10 text-red-600 shrink-0" />
                  <div className="text-left">
                    <h3 className="font-bold text-red-800 text-sm">Pusat Penghapusan & Reset Pabrik (Factory Reset)</h3>
                    <p className="text-xs text-red-750 max-w-xl leading-tight">Gunakan fitur ini untuk mereset program pos kembali ke data bawaan asli/kosong. Seluruh produk baru, pelanggan, riwayat transaksi harian, absensi karyawan, pengeluaran kasir, laci uang masukan, dan piutang akan dihapus selamanya.</p>
                  </div>
                </div>
                
                {!showResetConfirm ? (
                  <button 
                    onClick={() => setShowResetConfirm(true)} 
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 text-xs whitespace-nowrap self-stretch md:self-auto text-center"
                  >
                    KOSONGKAN DATABASE BARU
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <label className="text-[10px] text-red-800 font-bold self-start md:self-end">Ketik kata <span className="font-mono text-red-950 underline font-black">FACTORY RESET</span> untuk konfirmasi:</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={resetInput} 
                        onChange={(e) => setResetInput(e.target.value)} 
                        placeholder="FACTORY RESET"
                        className="bg-white border border-red-400 p-1 font-bold text-xs uppercase outline-none text-red-900 w-full md:w-40" 
                      />
                      <button 
                        disabled={resetInput !== 'FACTORY RESET'} 
                        onClick={() => {
                          if (resetInput !== 'FACTORY RESET') return;
                          
                          // Wipe local storage
                          const keysToWipe = [
                            'inventory', 'customers', 'suppliers', 'order', 'supplierReturns',
                            'employees', 'attendances', 'leaveRequests', 'transactions', 'expenses',
                            'piutang', 'appUsers', 'botMemory', 'storeSettings'
                          ];
                          keysToWipe.forEach(k => localStorage.removeItem(`POS_${k}`));
                          
                          // Wiping React status
                          setInventory([]);
                          setCustomers([]);
                          setSuppliers([]);
                          setOrderData([]);
                          setSupplierReturns([]);
                          setEmployees([]);
                          setAttendances([]);
                          setLeaveRequests([]);
                          setTransactions([]);
                          setExpenses([]);
                          setPiutangData([]);
                          setPendingTransactions([]);
                          alert('Database berhasil di-reset total ke kondisi kosong. Aplikasi akan memuat ulang.');
                          window.location.reload();
                        }} 
                        className="bg-red-700 text-white hover:bg-red-800 font-bold px-4 py-1 text-xs disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        Reset Total
                      </button>
                      <button onClick={() => { setShowResetConfirm(false); setResetInput(''); }} className="bg-gray-200 border border-gray-400 hover:bg-gray-300 font-bold px-3 py-1 text-xs text-black">Batal</button>
                    </div>
                  </div>
                )}
              </div>

            </div>
              </div>
           )}
           {settingTab === 'akun' && (
              <div className="flex flex-col gap-4">
                 <div className="flex justify-between items-end mb-4 border-b pb-2">
                    <div className="flex gap-2 items-center">
                        <Lock className="w-8 h-8 text-gray-500" />
                        <h2 className="text-xl font-bold text-blue-900">Akun & Pembagian Hak Akses</h2>
                    </div>
                    <button onClick={() => setShowLogoutConfirm(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1.5 px-4 shadow text-sm">LOG OUT SEKARANG</button>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg mb-2">Daftar Pengguna Sistem</h3>
                    <table className="w-full text-left border-collapse border border-gray-400">
                      <thead className="bg-[#ece9d8]">
                        <tr>
                          <th className="border p-2">Username</th>
                          <th className="border p-2">Nama Lengkap</th>
                          <th className="border p-2">Password/PIN</th>
                          <th className="border p-2">Role/Hak Akses</th>
                          <th className="border p-2 w-24 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appUsers?.map((u: any) => (
                           <tr key={u.id} className="hover:bg-gray-50">
                             <td className="border p-2 font-mono">{u.username}</td>
                             <td className="border p-2 font-bold">{u.name}</td>
                             <td className="border p-2">*** (Tersembunyi)</td>
                             <td className="border p-2 font-bold uppercase text-blue-800">{u.role}</td>
                             <td className="border p-2 text-center">
                               <button 
                                 onClick={() => {
                                    setEditUser({...u});
                                 }} 
                                 className="text-blue-900 hover:bg-blue-100 px-2 py-1 font-bold border border-blue-300 rounded"
                               >Modifikasi</button>
                             </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="bg-[#ece9d8] p-4 mt-4 border border-gray-400 shadow-sm">
                       <h4 className="font-bold border-b border-gray-400 pb-2 mb-3">Aturan Role/Hak Akses</h4>
                       <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse border border-gray-400 bg-white text-xs">
                           <thead className="bg-gray-100">
                             <tr>
                               <th className="border border-gray-400 p-2 text-center w-1/4">Fitur Sistem</th>
                               <th className="border border-gray-400 p-2 text-center bg-blue-50 text-blue-900 font-bold w-1/4">Owner</th>
                               <th className="border border-gray-400 p-2 text-center bg-yellow-50 text-yellow-900 font-bold w-1/4">Admin</th>
                               <th className="border border-gray-400 p-2 text-center bg-green-50 text-green-900 font-bold w-1/4">Kasir</th>
                             </tr>
                           </thead>
                           <tbody>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Transaksi Penjualan (POS)</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                             </tr>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Cashflow Harian</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                             </tr>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Manajemen Inventori</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                             </tr>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Pembelian & Retur</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                             </tr>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Manajemen Pelanggan</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                             </tr>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Karyawan & Absensi</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                             </tr>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Laporan Lengkap</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                             </tr>
                             <tr>
                               <td className="border border-gray-400 p-2 font-semibold">Pengaturan Sistem (Role)</td>
                               <td className="border border-gray-400 p-2 text-center text-green-600"><Check size={16} className="mx-auto" /></td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                               <td className="border border-gray-400 p-2 text-center text-gray-300">-</td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                    </div>
                 </div>

              </div>
           )}

      {editUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#460101] text-white w-[500px] shadow-2xl border border-gray-600 rounded-sm overflow-hidden flex flex-col font-sans">
            <div className="flex justify-between items-center bg-gray-100 text-black px-2 py-1 border-b border-gray-400 select-none">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-yellow-500 mr-2 flex items-center justify-center shadow-inner border border-gray-300">
                   <div className="flex flex-wrap w-2 h-2 gap-0.5">
                      <div className="w-0.5 h-0.5 bg-red-600"></div><div className="w-0.5 h-0.5 bg-orange-500"></div>
                      <div className="w-0.5 h-0.5 bg-blue-600"></div><div className="w-0.5 h-0.5 bg-green-600"></div>
                   </div>
                </span>
                <span className="text-xs">Modifikasi Akun Pengguna</span>
              </div>
              <div className="flex items-center gap-1">
                 <button className="w-6 h-5 flex items-center justify-center border border-gray-400 hover:bg-gray-300 bg-gray-200 text-xs">__</button>
                 <button className="w-6 h-5 flex items-center justify-center border border-gray-400 hover:bg-gray-300 bg-gray-200 text-xs">□</button>
                 <button onClick={() => setEditUser(null)} className="w-6 h-5 flex items-center justify-center border border-gray-400 hover:bg-red-500 hover:text-white bg-gray-200 text-xs">X</button>
              </div>
            </div>
            
            <form onSubmit={(e) => {
               e.preventDefault();
               const formData = new FormData(e.currentTarget);
               
               const pass_lama = formData.get('pass_lama') as string;
               const pass_baru = formData.get('pass_baru') as string;
               const konfirmasi = formData.get('konfirmasi') as string;
               
               if (pass_baru || konfirmasi) {
                  if (pass_baru === editUser.password) {
                      return alert('Password Baru tidak boleh sama dengan Password Lama!');
                  }
                  if (pass_baru !== konfirmasi) {
                      return alert('Password Baru dan Konfirmasi tidak cocok!');
                  }
               }
               
               const updatedUser = {
                 ...editUser,
                 password: pass_baru ? pass_baru : editUser.password,
                 name: formData.get('name') as string,
                 email: formData.get('email') as string,
                 role: formData.get('role') as string,
                 cabang: formData.get('cabang') as string,
               };
               
               setAppUsers(appUsers.map((u: any) => u.id === editUser.id ? updatedUser : u));
               setEditUser(null);
               alert('Pengguna berhasil dimodifikasi!');
            }} className="p-6 flex flex-col gap-3">
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Username</label>
                <input type="text" name="username" defaultValue={editUser.username} readOnly className="px-2 py-0.5 text-black bg-white outline-none w-full" />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Nama Pengguna</label>
                <input type="text" name="name" defaultValue={editUser.name} className="px-2 py-0.5 text-black bg-white outline-none w-full" />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Password Lama</label>
                <div className="relative w-full">
                  <input type={showEditPasswords ? "text" : "password"} name="pass_lama" defaultValue={editUser.password} readOnly className="px-2 py-0.5 text-black bg-white outline-none w-full pr-7" />
                  <button type="button" onClick={() => setShowEditPasswords(!showEditPasswords)} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                    {showEditPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Password Baru</label>
                <div className="relative w-full">
                  <input type={showEditPasswords ? "text" : "password"} name="pass_baru" className="px-2 py-0.5 text-black bg-white outline-none w-full pr-7" />
                  <button type="button" onClick={() => setShowEditPasswords(!showEditPasswords)} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                    {showEditPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Konfirmasi</label>
                <div className="relative w-full">
                  <input type={showEditPasswords ? "text" : "password"} name="konfirmasi" className="px-2 py-0.5 text-black bg-white outline-none w-full pr-7" />
                  <button type="button" onClick={() => setShowEditPasswords(!showEditPasswords)} className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                    {showEditPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Email</label>
                <input type="email" name="email" defaultValue={editUser.email || ''} className="px-2 py-0.5 text-black bg-white outline-none w-full" />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Role Akses</label>
                <select name="role" defaultValue={editUser.role?.toLowerCase() || 'admin'} className="px-1 py-0.5 text-black bg-white outline-none w-full border border-gray-400">
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                </select>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center">
                <label className="font-bold text-sm">Cabang</label>
                <select name="cabang" defaultValue={editUser.cabang || (storeSettings.branches && storeSettings.branches.length > 0 ? storeSettings.branches[0] : '')} className="px-2 py-0.5 text-black outline-none bg-white">
                   {storeSettings.branches?.map((b: string) => (
                       <option key={b} value={b}>{b}</option>
                   ))}
                </select>
              </div>
              
              <div className="flex justify-end gap-2 mt-2">
                 <button type="button" onClick={() => setEditUser(null)} className="bg-white text-black px-6 py-0.5 hover:bg-gray-200">BATAL</button>
                 <button type="submit" className="bg-white text-black px-6 py-0.5 hover:bg-gray-200">SIMPAN</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sync Margin Modal */}
      {showSyncMarginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#ece9d8] border-2 border-white border-r-gray-500 border-b-gray-500 shadow-xl w-full max-w-md">
            <div className="bg-[#000080] text-white px-2 py-1 font-bold text-sm flex justify-between items-center">
              <span>Sinkronisasi Harga</span>
              <button disabled={isSyncingMargin} onClick={() => setShowSyncMarginModal(null)} className="hover:bg-red-500 hover:text-white px-2 font-bold">X</button>
            </div>
            <div className="p-6 flex flex-col gap-4 text-center">
              {isSyncingMargin ? (
                <div className="flex flex-col items-center justify-center py-8 gap-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-bold text-blue-900 animate-pulse">Menghitung ulang harga untuk kategori: {showSyncMarginModal.cat}...</p>
                </div>
              ) : (
                <>
                  <div className="bg-white p-4 border border-gray-400">
                    <p className="font-bold mb-2">Buat Kategori: {showSyncMarginModal.cat}</p>
                    <p className="text-sm text-gray-700">Margin akan disimpan: L1:{showSyncMarginModal.lv1}%, L2:{showSyncMarginModal.lv2}%, L3:{showSyncMarginModal.lv3}%</p>
                  </div>
                  <p className="text-sm">Apakah Anda ingin menyimpan dan menerapkan otomatis persentase ini ke semua barang dengan kategori ini?</p>
                  <div className="flex justify-center gap-4 mt-4">
                    <button 
                      onClick={() => setShowSyncMarginModal(null)}
                      className="bg-gray-200 border border-gray-400 font-bold px-6 py-2 hover:bg-gray-300"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={() => {
                        setIsSyncingMargin(true);
                        
                        setTimeout(() => {
                          // Save margins
                          setStoreSettings({...storeSettings, margins: {...(storeSettings.margins||{}), [showSyncMarginModal.cat]: {level1: showSyncMarginModal.lv1, level2: showSyncMarginModal.lv2, level3: showSyncMarginModal.lv3}}});
                          addLog('SETTING_MARGIN', `Kategori margin baru disinkronkan: ${showSyncMarginModal.cat}`);
                          
                          // Recalculate inventory
                          const newInventory = inventory.map(item => {
                            if (item.category?.toUpperCase() === showSyncMarginModal.cat) {
                              const base = item.basePrice || item.price;
                              return {
                                ...item,
                                level1Price: Math.round(base + (base * showSyncMarginModal.lv1 / 100)),
                                level2Price: Math.round(base + (base * showSyncMarginModal.lv2 / 100)),
                                level3Price: Math.round(base + (base * showSyncMarginModal.lv3 / 100)),
                              };
                            }
                            return item;
                          });
                          
                          setInventory(newInventory);
                          setIsSyncingMargin(false);
                          setShowSyncMarginModal(null);
                        }, 1500); // Wait 1.5s for cool effect
                      }}
                      className="bg-blue-600 text-white font-bold px-6 py-2 hover:bg-blue-700 shadow-md flex items-center gap-2"
                    >
                      <Server className="w-4 h-4" /> Sinkronisasi Harga
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {settingTab === 'karyawan' && (
          <div className="flex flex-col gap-2">
            <button onClick={() => setShowAddEmpModal(true)} className="bg-blue-600 text-white font-bold py-2 w-48 mb-2 shadow rounded hover:bg-blue-700">+ Tambah Karyawan Baru</button>
            <table className="w-full text-left border-collapse whitespace-nowrap border border-gray-400 select-none text-black">
              <thead className="bg-[#ece9d8] border-b border-gray-400 text-xs font-bold">
                <tr>
                  <th className="p-2 border-r w-16 cursor-pointer hover:bg-gray-300" onClick={() => handleEmpSort('id')} title="Urutkan ID">
                      <div className="flex items-center gap-1 justify-between">
                          <span>ID</span>
                          <span className="font-mono text-[9px] text-[#000080]">{empSortKey === 'id' ? (empSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer hover:bg-gray-300" onClick={() => handleEmpSort('name')} title="Urutkan Nama">
                      <div className="flex items-center gap-1 justify-between">
                          <span>Nama</span>
                          <span className="font-mono text-[9px] text-[#000080]">{empSortKey === 'name' ? (empSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer hover:bg-gray-300" onClick={() => handleEmpSort('position')} title="Urutkan Posisi">
                      <div className="flex items-center gap-1 justify-between">
                          <span>Posisi/Jabatan</span>
                          <span className="font-mono text-[9px] text-[#000080]">{empSortKey === 'position' ? (empSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer hover:bg-gray-300" onClick={() => handleEmpSort('branch')} title="Urutkan Cabang">
                      <div className="flex items-center gap-1 justify-between">
                          <span>Cabang</span>
                          <span className="font-mono text-[9px] text-[#000080]">{empSortKey === 'branch' ? (empSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer hover:bg-gray-300" onClick={() => handleEmpSort('phone')} title="Urutkan No WA">
                      <div className="flex items-center gap-1 justify-between">
                          <span>No WA</span>
                          <span className="font-mono text-[9px] text-[#000080]">{empSortKey === 'phone' ? (empSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 cursor-pointer hover:bg-gray-300" onClick={() => handleEmpSort('dailySalary')} title="Urutkan Gaji">
                      <div className="flex items-center gap-1 justify-start">
                          <span>Gaji Perhari</span>
                          <span className="font-mono text-[9px] text-[#000080]">{empSortKey === 'dailySalary' ? (empSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {smartSort(employees, empSortKey, empSortDirection).map((emp: any) => (
                    <tr key={emp.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 border-r text-gray-500 font-mono">#{emp.id}</td>
                      <td className="p-2 border-r font-bold">{emp.name}</td>
                      <td className="p-2 border-r">{emp.position}</td>
                      <td className="p-2 border-r">{emp.branch || '-'}</td>
                      <td className="p-2 border-r font-mono">{emp.phone || '-'}</td>
                      <td className="p-2 font-mono font-bold text-green-700">Rp {(emp.dailySalary || 0).toLocaleString('id-ID')}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}

      {settingTab === 'pelanggan' && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center bg-[#ece9d8] border-b border-gray-400 p-2 shadow-sm sticky top-0 z-20">
              <span className="font-bold">Daftar Pelanggan Terdaftar</span>
              <button onClick={() => setShowAddCustomerModal(true)} className="bg-gray-200 border border-gray-500 px-3 py-1 font-bold shadow hover:bg-gray-300">+ Tambah Pelanggan</button>
            </div>
            <table className="w-full text-left border-collapse whitespace-nowrap select-none text-black">
              <thead className="bg-[#ece9d8] border-b-2 border-gray-400 font-bold text-xs">
                <tr>
                  <th className="p-2 border-r border-gray-300 w-16 text-center cursor-pointer hover:bg-gray-300" onClick={() => handleCustSort('id')} title="Urutkan ID">
                      <div className="flex items-center gap-1 justify-center">
                          <span>ID</span>
                          <span className="font-mono text-[9px] text-[#000080]">{custSortKey === 'id' ? (custSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleCustSort('name')} title="Urutkan Nama">
                      <div className="flex items-center gap-1 justify-between">
                          <span>Nama Pelanggan</span>
                          <span className="font-mono text-[9px] text-[#000080]">{custSortKey === 'name' ? (custSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleCustSort('phone')} title="Urutkan No Telp">
                      <div className="flex items-center gap-1 justify-between">
                          <span>No. Telp / WA</span>
                          <span className="font-mono text-[9px] text-[#000080]">{custSortKey === 'phone' ? (custSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 border-r border-gray-300 text-center cursor-pointer hover:bg-gray-300" onClick={() => handleCustSort('level')} title="Urutkan Level">
                      <div className="flex items-center gap-1 justify-center">
                          <span>Level Harga</span>
                          <span className="font-mono text-[9px] text-[#000080]">{custSortKey === 'level' ? (custSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                  </th>
                  <th className="p-2 text-center text-gray-500 font-bold select-none">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {smartSort(customers, custSortKey, custSortDirection).map((c: any) => (
                  <tr key={c.id} className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="p-2 border-r border-gray-300 text-center font-mono text-gray-500">#{c.id}</td><td className="p-2 border-r border-gray-300 font-bold">{c.name}</td><td className="p-2 border-r border-gray-300">{c.phone || '-'}</td><td className="p-2 border-r border-gray-300 text-center">Level {c.level} {c.level == 1 ? '(NON member)' : ''}</td><td className="p-2 text-center"><button className="px-2 text-blue-700 font-bold hover:underline">Edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      )}

      {settingTab === 'supliyer' && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center bg-[#ece9d8] border-b border-gray-400 p-2 shadow-sm sticky top-0 z-20">
              <span className="font-bold">Daftar Supliyer Aktif</span>
              <button className="bg-gray-200 border border-gray-500 px-3 py-1 font-bold shadow hover:bg-gray-300" onClick={() => setShowAddSupplierModal(true)}>+ Tambah Supliyer</button>
            </div>
            {showAddSupplierModal && (
                 <div className="bg-[#ece9d8] border border-gray-400 p-3 flex gap-2 items-end mb-2 shadow-sm rounded-sm m-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">Nama Supliyer:</label>
                        <input className="border border-gray-400 p-1" value={newSupplier.name} onChange={e => setNewSupplier({...newSupplier, name: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">Kontak:</label>
                        <input className="border border-gray-400 p-1" value={newSupplier.contact} onChange={e => setNewSupplier({...newSupplier, contact: e.target.value})} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-700">Alamat:</label>
                        <input className="border border-gray-400 p-1" value={newSupplier.address} onChange={e => setNewSupplier({...newSupplier, address: e.target.value})} />
                    </div>
                    <button onClick={() => {
                        if (!newSupplier.name) return alert('Nama supliyer wajib diisi!');
                        setSuppliers([...(suppliers || []), { id: Date.now().toString(), name: newSupplier.name, contact: newSupplier.contact, address: newSupplier.address }]);
                        setNewSupplier({name: '', contact: '', address: ''});
                        setShowAddSupplierModal(false);
                    }} className="bg-green-600 text-white font-bold py-1 px-4 shadow hover:bg-green-700">Simpan</button>
                    <button onClick={() => setShowAddSupplierModal(false)} className="bg-gray-400 text-white font-bold py-1 px-4 shadow hover:bg-gray-500">Batal</button>
                 </div>
            )}
            <table className="w-full text-left border-collapse whitespace-nowrap mt-2 select-none text-black">
               <thead className="bg-[#ece9d8] border-b-2 border-gray-400 font-bold text-xs">
                  <tr>
                    <th className="p-2 border-r border-gray-300 text-center w-16 cursor-pointer hover:bg-gray-300" onClick={() => handleSupSort('id')} title="Urutkan ID">
                        <div className="flex items-center gap-1 justify-center">
                            <span>ID Sup</span>
                            <span className="font-mono text-[9px] text-[#000080]">{supSortKey === 'id' ? (supSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleSupSort('name')} title="Urutkan Nama">
                        <div className="flex items-center gap-1 justify-between">
                            <span>Nama Lengkap Supliyer</span>
                            <span className="font-mono text-[9px] text-[#000080]">{supSortKey === 'name' ? (supSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleSupSort('contact')} title="Urutkan Kontak">
                        <div className="flex items-center gap-1 justify-between">
                            <span>Kontak Person</span>
                            <span className="font-mono text-[9px] text-[#000080]">{supSortKey === 'contact' ? (supSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleSupSort('address')} title="Urutkan Alamat">
                        <div className="flex items-center gap-1 justify-between">
                            <span>Alamat Lengkap</span>
                            <span className="font-mono text-[9px] text-[#000080]">{supSortKey === 'address' ? (supSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                        </div>
                    </th>
                  </tr>
               </thead>
               <tbody>
                 {smartSort(suppliers, supSortKey, supSortDirection).map((s: any) => (
                    <tr key={s.id} className="border-b border-gray-200 hover:bg-blue-50">
                       <td className="p-2 border-r border-gray-300 text-center font-mono text-gray-500">#{s.id}</td>
                       <td className="p-2 border-r border-gray-300 font-bold">{s.name}</td>
                       <td className="p-2 border-r border-gray-300">{s.contact || '-'}</td>
                       <td className="p-2 border-r border-gray-300">{s.address || '-'}</td>
                    </tr>
                 ))}
               </tbody>
            </table>
          </div>
      )}

      {settingTab === 'promo' && (
          <div className="flex flex-col gap-4">
             <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-900 leading-relaxed shadow-sm">
               <p><strong>Info Promo:</strong> Menampilkan total belanja pelanggan bulan ini. Pelanggan yang mencapai omzet Rp 5.000.000 berhak mendapatkan cashback 5% (potongan yang wajib dibelanjakan). Promo aktif ketika kasir menekan tombol "Promo" saat bertransaksi dengan pelanggan tersebut.</p>
             </div>
             <table className="w-full text-left border-collapse">
                <thead className="bg-[#ece9d8] border-b border-gray-400 text-xs">
                   <tr>
                     <th className="p-2 border-r border-gray-300 w-16 text-center">ID</th>
                     <th className="p-2 border-r border-gray-300">Nama Pelanggan</th>
                     <th className="p-2 border-r border-gray-300">Total Belanja Bulan Ini</th>
                     <th className="p-2 border-r border-gray-300 text-center">Target Omzet (Rp)</th>
                     <th className="p-2 text-center">Status Promo</th>
                   </tr>
                </thead>
                <tbody>
                 {customers.map((c: any, idx: number) => {
                    // Quick calculation for promo logic (dummy implementation since we lost customerPromoData from Cashflow)
                    // Let's use the transactions from AppContext!
                    const customerMonthlyTotal = transactions.filter((t: any) => t.customer === c.name && t.timestamp && new Date(t.timestamp).getMonth() === new Date().getMonth()).reduce((sum: number, t: any) => sum + (t.total || 0), 0);
                    const isReached = customerMonthlyTotal >= 5000000;
                    return (
                       <tr key={idx} className="border-b border-gray-300 hover:bg-gray-100 bg-white">
                         <td className="p-2 border-r border-gray-300 text-center font-mono text-gray-500">#{c.id}</td>
                         <td className="p-2 font-bold border-r border-gray-300">{c.name}</td>
                         <td className={`p-2 font-mono border-r border-gray-300 ${isReached ? 'text-green-700 font-bold' : ''}`}>Rp {customerMonthlyTotal.toLocaleString('id-ID')}</td>
                         <td className="p-2 font-mono border-r border-gray-300 text-center">5.000.000</td>
                         <td className="p-2 text-center">
                            {isReached ? (
                               <span className="bg-green-600 text-white px-2 py-1 rounded shadow-sm font-bold text-[10px]">CASHBACK 5% AKTIF</span>
                            ) : (
                               <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded shadow-sm text-[10px] font-bold">BELUM MENCAPAI</span>
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

    </div>
  );
};
