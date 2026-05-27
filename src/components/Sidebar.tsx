import React from 'react';
import { ShoppingCart, LogOut, Wallet, Database, Bot, Settings, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Sidebar = () => {
  const { user, setUser, activeTab, setActiveTab, setShowLogoutConfirm } = useAppContext();

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <aside className="w-full md:w-56 bg-slate-900 text-white flex flex-col md:min-h-screen shrink-0 shadow-2xl z-10 overflow-y-auto">
      <div className="p-4 border-b border-slate-700/50 sticky top-0 bg-slate-900 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-1.5 rounded"><ShoppingCart className="w-5 h-5 text-white" /></div>
          <div>
            <h2 className="font-bold text-lg tracking-wide leading-none">Nava POS</h2>
            <p className="text-[10px] text-blue-300 capitalize mt-1 border border-blue-500/30 inline-block px-1.5 py-0.5 rounded">Role: {user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1.5 text-xs font-medium overflow-y-auto pb-20">
        {(user?.role === 'admin' || user?.role === 'owner') && (
            <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 w-full p-2.5 rounded transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> Dashboard
            </button>
        )}
        <button onClick={() => setActiveTab('pos')} className={`flex items-center gap-3 w-full p-2.5 rounded transition-all ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
          <ShoppingCart className="w-4 h-4" /> POS (Transaksi)
        </button>
        <button onClick={() => setActiveTab('absensi')} className={`flex items-center gap-3 w-full p-2.5 rounded transition-all ${activeTab === 'absensi' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
          <Clock className="w-4 h-4" /> Absensi
        </button>
        
        {(user?.role === 'admin' || user?.role === 'owner') && (
          <>
            <button onClick={() => setActiveTab('cashflow')} className={`flex items-center gap-3 w-full p-2.5 rounded transition-all ${activeTab === 'cashflow' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Wallet className="w-4 h-4" /> Cashflow
            </button>

            <button onClick={() => setActiveTab('masterdata')} className={`flex items-center gap-3 w-full p-2.5 rounded transition-all ${activeTab === 'masterdata' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Database className="w-4 h-4" /> Master Data
            </button>

            <button onClick={() => setActiveTab('ai')} className={`flex items-center gap-3 w-full p-2.5 rounded transition-all ${activeTab === 'ai' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-purple-300 hover:bg-slate-800 border border-purple-900/30'}`}>
              <Bot className="w-4 h-4" /> AI Assistant
            </button>
            
            <button onClick={() => setActiveTab('setting')} className={`flex items-center gap-3 w-full p-2.5 rounded transition-all ${activeTab === 'setting' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'}`}>
              <Settings className="w-4 h-4" /> Setting
            </button>
          </>
        )}
      </nav>
      
      <div className="p-4 border-t border-slate-700/50 bg-slate-900">
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold text-sm">
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>
    </aside>
  );
};
