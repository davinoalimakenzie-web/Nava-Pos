import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const Login = () => {
  const { setUser, setActiveTab, appUsers, setAppUsers } = useAppContext();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isChangePinMode, setIsChangePinMode] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (isChangePinMode) {
      const userIndex = appUsers.findIndex((u: any) => u.username === username);
      if (userIndex >= 0) {
         const newUsers = [...appUsers];
         newUsers[userIndex].password = password;
         setAppUsers(newUsers);
         setSuccessMsg(`PIN akun ${username} berhasil diubah! Silahkan login.`);
         setErrorMsg('');
         setIsChangePinMode(false);
         form.reset();
      } else {
         setErrorMsg('Username tidak ditemukan!');
         setSuccessMsg('');
      }
      return;
    }

    const foundUser = appUsers?.find((u: any) => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      if (foundUser.role === 'admin' || foundUser.role === 'owner') {
          setActiveTab('dashboard');
      } else {
          setActiveTab('pos');
      }
      setErrorMsg('');
    } else {
      setErrorMsg('Username atau Password salah!');
      setSuccessMsg('');
    }
  };

  return (
    <div className="min-h-screen bg-[#8fb4d9] flex items-center justify-center p-4 font-sans">
      <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-sm flex flex-col shadow-xl">
        <div className="bg-[#000080] text-white px-2 py-1 flex items-center justify-between font-bold text-xs">
           <span>{isChangePinMode ? 'Ubah PIN Akun' : 'Login - Nava POS'}</span>
           <button type="button" onClick={() => setIsChangePinMode(!isChangePinMode)} className="bg-gray-300 text-black px-2 hover:bg-white">{isChangePinMode ? 'Kembali Login' : 'Ubah PIN'}</button>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-900 tracking-tight">Nava POS</h1>
            <p className="text-gray-600 text-xs mt-1">Smart Retail Management</p>
          </div>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-600 p-2 mb-4 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-2 mb-4 text-xs text-center font-medium">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3 text-xs">
            <div>
              <label className="block text-black mb-1">Username:</label>
              <input 
                type="text" name="username"
                className="w-full p-2 border border-gray-400 outline-none focus:border-blue-600"
                placeholder="admin / kasir" required
              />
            </div>
            <div>
              <label className="block text-black mb-1">{isChangePinMode ? 'Masukan PIN Baru:' : 'Password / PIN:'}</label>
              <input 
                type="password" name="password"
                className="w-full p-2 border border-gray-400 outline-none focus:border-blue-600"
                placeholder="PIN..." required
              />
            </div>
            <button type="submit" className={`w-full ${isChangePinMode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} border-2 border-gray-500 font-bold py-2 mt-4 hover:bg-gray-300 active:bg-gray-400 shadow-sm`}>
              {isChangePinMode ? 'SIMPAN PIN BARU' : 'OK MASUK'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
