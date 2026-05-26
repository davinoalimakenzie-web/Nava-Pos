import React, { useState } from 'react';
import { Printer, MonitorSmartphone, Server, Lock, DownloadCloud } from 'lucide-react';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { useAppContext } from '../context/AppContext';

export const SettingsPanel = ({ currentTime }: { currentTime: Date }) => {
  const { user, storeSettings, setStoreSettings, setPendingUser, appUsers, setAppUsers, inventory, customers, suppliers, orderData, supplierReturns, setShowLogoutConfirm } = useAppContext();
  const [settingTab, setSettingTab] = useState('print');

  const handleBackupData = () => {
      const allData = { inventory, customers, suppliers, orderData, supplierReturns };
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
      
      <div className="flex gap-1 shrink-0 bg-[#ece9d8] p-1 border-b border-gray-400 shadow-sm z-10">
         <button onClick={() => setSettingTab('print')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${settingTab === 'print' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Setting Print (Invoice)</button>
         <button onClick={() => setSettingTab('scanner')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${settingTab === 'scanner' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Scanner Barcode</button>
         <button onClick={() => setSettingTab('sync')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${settingTab === 'sync' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Sinkronisasi</button>
         <button onClick={() => setSettingTab('margins')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${settingTab === 'margins' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Setting Margin Harga</button>
         {(user?.role === 'owner' || user?.role === 'admin') && (
             <button onClick={() => setSettingTab('akun')} className={`px-4 py-1.5 border border-gray-500 font-bold hover:bg-white ${settingTab === 'akun' ? 'bg-white border-b-white text-blue-900' : 'bg-gray-200 text-black'}`}>Akun Login & Hak Akses</button>
         )}
      </div>

      <div className="p-2 flex flex-col h-full gap-2 overflow-y-auto w-full max-w-4xl">
        <div className="flex-1 bg-white border border-gray-400 shadow-inner p-6">
           
           {settingTab === 'margins' && (
              <div className="flex flex-col gap-4">
                 <div className="flex gap-2 items-center mb-4 border-b pb-2">
                    <h2 className="text-xl font-bold text-blue-900">Pengaturan Margin Harga Barang Baru</h2>
                 </div>
                 <div className="text-gray-600 mb-4 text-sm max-w-lg">
                    Atur nilai persentase default untuk Harga Level 1 dan Level 2. Persentase ini akan digunakan untuk menghitung otomatis harga jual saat menginput stok baru berdasarkan kategori barang. Jika kategori tidak diatur, maka nilai UMUM akan digunakan.
                 </div>
                 <table className="w-full max-w-lg border-collapse text-left text-sm mb-4">
                    <thead>
                      <tr className="bg-gray-100 border-y border-gray-300">
                        <th className="p-2">Kategori</th>
                        <th className="p-2 w-32">Level 1 (%)</th>
                        <th className="p-2 w-32">Level 2 (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(storeSettings.margins || { UMUM: {level1: 75, level2: 15} }).map(cat => {
                        const currentMargins = storeSettings.margins || { UMUM: {level1: 75, level2: 15} };
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
                     if (!cat) return;
                     setStoreSettings({...storeSettings, margins: {...(storeSettings.margins||{}), [cat.toUpperCase()]: {level1: lv1, level2: lv2}}});
                     e.currentTarget.reset();
                 }} className="flex gap-2 items-end bg-gray-50 border border-gray-300 p-3 max-w-lg">
                    <div className="flex flex-col gap-1 w-1/3">
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
                    <button type="submit" className="bg-green-600 text-white font-bold px-4 py-2 hover:bg-green-700">Tambah</button>
                 </form>

                 <button className="bg-blue-600 text-white font-bold py-2 shadow hover:bg-blue-700 w-48 mt-4" onClick={() => alert('Pengaturan Margin Disimpan!')}>Simpan Pengaturan</button>
              </div>
           )}

           {settingTab === 'print' && (
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
                 <button className="bg-blue-600 text-white font-bold py-2 shadow hover:bg-blue-700 w-48 mt-4" onClick={() => alert('Pengaturan Disimpan!')}>Simpan Pengaturan</button>
              </div>
           )}

           {settingTab === 'scanner' && (
              <div className="flex flex-col gap-4">
                 <div className="flex gap-2 items-center mb-4 border-b pb-2">
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
                 <button className="bg-blue-600 text-white font-bold py-2 shadow hover:bg-blue-700 w-48 mt-4" onClick={() => alert('Kalibrasi Disimpan!')}>Simpan Kalibrasi</button>
              </div>
           )}

           {settingTab === 'sync' && (
              <div className="flex flex-col gap-4">
                 <div className="flex gap-2 items-center mb-4 border-b pb-2">
                    <Server className="w-8 h-8 text-gray-500" />
                    <h2 className="text-xl font-bold text-blue-900">Sinkronisasi Cloud Backup</h2>
                 </div>
                 <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-blue-900 font-bold mb-1">Status Sinkronisasi Saat Ini:</p>
                    <p className="text-xl font-mono text-blue-800">{storeSettings.syncEnabled ? 'AKTIF - Terhubung ke Cloud' : 'TIDAK AKTIF - Mode Offline Lokal'}</p>
                 </div>
                 <button onClick={() => {
                    setStoreSettings({...storeSettings, syncEnabled: !storeSettings.syncEnabled});
                    alert(storeSettings.syncEnabled ? 'Sinkronisasi dimatikan.' : 'Berhasil terhubung ke server Cloud! Data akan dibackup otomatis setiap 1 jam.');
                 }} className={`font-bold py-3 mt-4 text-white shadow max-w-sm ${storeSettings.syncEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
                    <DownloadCloud className="w-5 h-5 inline-block mr-2" />
                    {storeSettings.syncEnabled ? 'Matikan Autobackup Cloud' : 'Aktifkan Cloud Database'}
                 </button>
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
                                   if(u.username === 'admin') return alert('User admin utama tidak dapat dihapus!');
                                   if(window.confirm(`Hapus pengguna ${u.name}?`)) setAppUsers(appUsers.filter((usr: any) => usr.id !== u.id));
                                 }} 
                                 className="text-red-600 hover:bg-red-100 px-2 py-1 font-bold border border-red-300 rounded"
                               >Hapus</button>
                             </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="bg-[#ece9d8] p-4 mt-4 border border-gray-400 shadow-sm">
                       <h4 className="font-bold border-b border-gray-400 pb-2 mb-3">Tambah Pengguna Baru</h4>
                       <form onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const newU = {
                             id: 'u' + Date.now(),
                             username: formData.get('username') as string,
                             password: formData.get('password') as string,
                             name: formData.get('name') as string,
                             role: formData.get('role') as string,
                          };
                          if (appUsers?.find((u: any) => u.username === newU.username)) return alert('Username sudah digunakan!');
                          setAppUsers([...(appUsers || []), newU]);
                          e.currentTarget.reset();
                          alert('Pengguna berhasil ditambahkan!');
                       }} className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold">Username</label>
                            <input name="username" required className="border border-gray-400 p-1.5 outline-none" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold">Nama Lengkap</label>
                            <input name="name" required className="border border-gray-400 p-1.5 outline-none" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold">Password / PIN</label>
                            <input name="password" required className="border border-gray-400 p-1.5 outline-none" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold">Role (Hak Akses)</label>
                            <select name="role" required className="border border-gray-400 p-1.5 outline-none">
                               <option value="kasir">Staff / Kasir (Terbatas)</option>
                               <option value="admin">Administrator (Full Akses)</option>
                            </select>
                          </div>
                          <div className="col-span-2 mt-2">
                             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 shadow w-48">Simpan Pengguna</button>
                          </div>
                       </form>
                    </div>
                 </div>
              </div>
           )}

        </div>
      </div>
    </div>
  );
};
