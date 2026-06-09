import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Login } from './components/Login';
import { Sidebar } from './components/Sidebar';
import { POS } from './components/POS';
import { Cashflow } from './components/Cashflow';
import { MasterData } from './components/MasterData';
import { Absensi } from './components/Absensi';
import { AIAssistant } from './components/AIAssistant';
import { SettingsPanel } from './components/SettingsPanel';
import { Dashboard } from './components/Dashboard';
import { GlobalModals } from './components/GlobalModals';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BukuBesar } from './components/BukuBesar';
import { InputCashflow } from './components/InputCashflow';
import { DanaBank } from './components/DanaBank';
import { KalkulatorUser } from './components/KalkulatorUser';

const AppContent = () => {
  const { user, activeTab } = useAppContext();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="h-[100dvh] bg-[#8fb4d9] flex flex-col w-full overflow-hidden pt-1 pb-6">
      <div className="flex flex-row relative font-sans text-xs w-full flex-1 overflow-hidden">
        <GlobalModals />
        <KalkulatorUser />
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden text-black text-[11px] sm:text-xs min-w-0 pb-2">
          <ErrorBoundary>
            {activeTab === 'pos' && <POS currentTime={currentTime} />}
            {activeTab === 'absensi' && <Absensi currentTime={currentTime} />}
            {activeTab === 'dashboard' && (user.role === 'admin' || user.role === 'owner') && <Dashboard currentTime={currentTime} />}
            {activeTab === 'cashflow' && (user.role === 'admin' || user.role === 'owner') && <Cashflow currentTime={currentTime} />}
            {activeTab === 'masterdata' && (user.role === 'admin' || user.role === 'owner') && <MasterData currentTime={currentTime} />}
            {activeTab === 'ai' && (user.role === 'admin' || user.role === 'owner') && <AIAssistant currentTime={currentTime} />}
            {activeTab === 'setting' && (user.role === 'admin' || user.role === 'owner') && <SettingsPanel currentTime={currentTime} />}
            
            {/* Service Mode Tabs (Empty state for now) */}
            {activeTab === 'buku_besar' && <BukuBesar />}
            {activeTab === 'input_cashflow' && <InputCashflow />}
            {activeTab === 'dana_bank' && <DanaBank />}
            {activeTab === 'control_panel' && (
              <div className="flex-1 flex items-center justify-center bg-[#8fb4d9]">
                <div className="bg-white p-8 border-2 border-slate-400 shadow-xl text-center">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">CONTROL PANEL</h2>
                  <p className="text-slate-500">Modul Control Panel sedang dalam pengembangan.</p>
                </div>
              </div>
            )}
            {activeTab === 'table_kas' && (
              <div className="flex-1 flex items-center justify-center bg-[#8fb4d9]">
                <div className="bg-white p-8 border-2 border-slate-400 shadow-xl text-center">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">TABLE KAS</h2>
                  <p className="text-slate-500">Modul Table Kas sedang dalam pengembangan.</p>
                </div>
              </div>
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
