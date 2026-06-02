import React, { useState } from 'react';
import { ShoppingCart, LogOut, Wallet, Database, Bot, Settings, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Sidebar = () => {
  const { user, setUser, activeTab, setActiveTab, setShowLogoutConfirm } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <div 
      className={`relative flex flex-col min-h-screen shrink-0 shadow-2xl z-20 transition-all duration-300 ease-in-out bg-slate-900 text-white ${isExpanded ? 'w-[40%] sm:w-56' : 'w-16'}`}
    >
      {/* Toggle Separator Line on the right */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-0 top-0 bottom-0 w-4 group cursor-pointer z-30"
        title="Toggle Sidebar"
      >
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-slate-700/50 group-hover:bg-blue-500 transition-colors"></div>
        <button 
          className="absolute top-1/2 right-0 -translate-y-1/2 w-4 h-12 bg-slate-800 border border-slate-600 rounded-l flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shadow-md"
        >
          {isExpanded ? <ChevronLeft className="w-3 h-3 -ml-0.5" /> : <ChevronRight className="w-3 h-3 -ml-0.5" />}
        </button>
      </div>

      <div className={`p-4 border-b border-slate-700/50 sticky top-0 bg-slate-900 z-10 flex items-center ${isExpanded ? 'justify-start' : 'justify-center'} min-h-[64px]`}>
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-1.5 rounded shrink-0"><ShoppingCart className="w-5 h-5 text-white" /></div>
          {isExpanded && (
            <div className="overflow-hidden transition-opacity duration-300">
              <h2 className="font-bold text-lg tracking-wide leading-none whitespace-nowrap">Nava POS</h2>
              <p className="text-[10px] text-blue-300 capitalize mt-1 border border-blue-500/30 inline-block px-1.5 py-0.5 rounded">Role: {user?.role}</p>
            </div>
          )}
        </div>
      </div>

      <nav className={`flex-1 px-3 py-4 flex flex-col gap-1.5 text-xs font-medium overflow-y-auto pb-20 ${isExpanded ? '' : 'items-center'}`}>
        {(user?.role === 'admin' || user?.role === 'owner') && (
            <button onClick={() => setActiveTab('dashboard')} title="Dashboard" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> 
              {isExpanded && <span className="whitespace-nowrap">Dashboard</span>}
            </button>
        )}
        <button onClick={() => setActiveTab('pos')} title="POS (Transaksi)" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
          <ShoppingCart className="w-4 h-4 shrink-0" /> 
          {isExpanded && <span className="whitespace-nowrap">POS (Transaksi)</span>}
        </button>
        <button onClick={() => setActiveTab('absensi')} title="Absensi" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'absensi' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
          <Clock className="w-4 h-4 shrink-0" /> 
          {isExpanded && <span className="whitespace-nowrap">Absensi</span>}
        </button>
        
        {(user?.role === 'admin' || user?.role === 'owner') && (
          <>
            <button onClick={() => setActiveTab('cashflow')} title="Cashflow" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'cashflow' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <Wallet className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">Cashflow</span>}
            </button>

            <button onClick={() => setActiveTab('masterdata')} title="Master Data" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'masterdata' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <Database className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">Master Data</span>}
            </button>

            <button onClick={() => setActiveTab('ai')} title="AI Assistant" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'ai' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-purple-300 hover:bg-slate-800 border border-purple-900/30'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <Bot className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">AI Assistant</span>}
            </button>
            
            <button onClick={() => setActiveTab('setting')} title="Setting" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'setting' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <Settings className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">Setting</span>}
            </button>
          </>
        )}
      </nav>
      
      <div className={`p-4 border-t border-slate-700/50 bg-slate-900 flex ${isExpanded ? '' : 'justify-center'}`}>
        <button onClick={handleLogout} title="Keluar" className={`flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold text-sm ${isExpanded ? 'w-full justify-center' : 'w-10 justify-center'}`}>
          <LogOut className="w-4 h-4 shrink-0" /> 
          {isExpanded && <span className="whitespace-nowrap">Keluar</span>}
        </button>
      </div>
    </div>
  );
};

