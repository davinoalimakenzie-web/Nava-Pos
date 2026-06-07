import React, { useState } from 'react';
import { ShoppingCart, LogOut, Wallet, Database, Bot, Settings, Clock, ChevronRight, ChevronLeft, BrainCircuit, BookOpen, ArrowRightLeft, Landmark, Calculator, SlidersHorizontal, TableProperties } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const Sidebar = () => {
  const { user, setUser, activeTab, setActiveTab, setShowLogoutConfirm, appMode, setAppMode } = useAppContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  return (
    <div 
      className={`relative flex flex-col h-full shrink-0 shadow-2xl z-20 transition-all duration-300 ease-in-out bg-slate-900 text-white ${isExpanded ? 'w-[40%] sm:w-56' : 'w-16'}`}
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
          <div 
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer transition-colors p-1.5 rounded shrink-0"
            onClick={() => {
              setAppMode(appMode === 'POS' ? 'SERVICE' : 'POS');
              setActiveTab(appMode === 'POS' ? 'buku_besar' : 'dashboard');
            }}
            title="Switch Mode"
          >
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          {isExpanded && (
            <div className="overflow-hidden transition-opacity duration-300">
              <h2 className="font-bold text-lg tracking-wide leading-none whitespace-nowrap uppercase">
                {appMode === 'SERVICE' ? 'NAVA SERVICE' : 'NAVA POS'}
              </h2>
              <p className="text-[10px] text-blue-300 capitalize mt-1 border border-blue-500/30 inline-block px-1.5 py-0.5 rounded uppercase">Role: {user?.role}</p>
            </div>
          )}
        </div>
      </div>

      <nav className={`flex-1 px-3 py-4 flex flex-col gap-1.5 text-xs font-medium overflow-y-auto pb-20 uppercase ${isExpanded ? '' : 'items-center'}`}>
        {appMode === 'POS' ? (
          <>
            {(user?.role === 'admin' || user?.role === 'owner') && (
                <button onClick={() => setActiveTab('dashboard')} title="DASHBOARD" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> 
                  {isExpanded && <span className="whitespace-nowrap">DASHBOARD</span>}
                </button>
            )}
            <button onClick={() => setActiveTab('pos')} title="POS" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <ShoppingCart className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">POS</span>}
            </button>
            <button onClick={() => setActiveTab('absensi')} title="ABSENSI" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'absensi' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <Clock className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">ABSENSI</span>}
            </button>
            
            {(user?.role === 'admin' || user?.role === 'owner') && (
              <>
                <button onClick={() => setActiveTab('cashflow')} title="CASHFLOW" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'cashflow' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
                  <Wallet className="w-4 h-4 shrink-0" /> 
                  {isExpanded && <span className="whitespace-nowrap">CASHFLOW</span>}
                </button>

                <button onClick={() => setActiveTab('masterdata')} title="MASTER DATA" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'masterdata' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
                  <Database className="w-4 h-4 shrink-0" /> 
                  {isExpanded && <span className="whitespace-nowrap">MASTER DATA</span>}
                </button>

                <button onClick={() => setActiveTab('ai')} title="AI ASSISTANT" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'ai' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' : 'text-purple-300 hover:bg-slate-800 border border-purple-900/30'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
                  <Bot className="w-4 h-4 shrink-0" /> 
                  {isExpanded && <span className="whitespace-nowrap">AI ASSISTANT</span>}
                </button>
                
                <button onClick={() => setActiveTab('setting')} title="SETTING" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'setting' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
                  <Settings className="w-4 h-4 shrink-0" /> 
                  {isExpanded && <span className="whitespace-nowrap">SETTING</span>}
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button onClick={() => setActiveTab('buku_besar')} title="BUKU BESAR" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'buku_besar' ? 'bg-green-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <BookOpen className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">BUKU BESAR</span>}
            </button>
            <button onClick={() => setActiveTab('input_cashflow')} title="INPUT CASHFLOW" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'input_cashflow' ? 'bg-green-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <ArrowRightLeft className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">INPUT CASHFLOW</span>}
            </button>
            <button onClick={() => setActiveTab('dana_bank')} title="DANA BANK" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'dana_bank' ? 'bg-green-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <Landmark className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">DANA BANK</span>}
            </button>
            <button onClick={() => setActiveTab('kalkulator_user')} title="KALKULATOR USER" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'kalkulator_user' ? 'bg-green-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <Calculator className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">KALKULATOR USER</span>}
            </button>
            <button onClick={() => setActiveTab('control_panel')} title="CONTROL PANEL" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'control_panel' ? 'bg-green-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <SlidersHorizontal className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">CONTROL PANEL</span>}
            </button>
            <button onClick={() => setActiveTab('table_kas')} title="TABLE KAS" className={`flex items-center gap-3 p-2.5 rounded transition-all ${activeTab === 'table_kas' ? 'bg-green-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'} ${isExpanded ? 'w-full' : 'w-10 justify-center'}`}>
              <TableProperties className="w-4 h-4 shrink-0" /> 
              {isExpanded && <span className="whitespace-nowrap">TABLE KAS</span>}
            </button>
          </>
        )}
      </nav>
      
      <div className={`p-4 border-t border-slate-700/50 bg-slate-900 flex ${isExpanded ? '' : 'justify-center'}`}>
        <button onClick={handleLogout} title="KELUAR" className={`flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold text-sm uppercase ${isExpanded ? 'w-full justify-center' : 'w-10 justify-center'}`}>
          <LogOut className="w-4 h-4 shrink-0" /> 
          {isExpanded && <span className="whitespace-nowrap">KELUAR</span>}
        </button>
      </div>
    </div>
  );
};

