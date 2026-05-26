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
import { GlobalModals } from './components/GlobalModals';
import { ErrorBoundary } from './components/ErrorBoundary';

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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative font-sans text-xs">
      <GlobalModals />
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden text-black text-[11px] sm:text-xs">
        <ErrorBoundary>
          {activeTab === 'pos' && <POS currentTime={currentTime} />}
          {activeTab === 'absensi' && <Absensi currentTime={currentTime} />}
          {activeTab === 'cashflow' && (user.role === 'admin' || user.role === 'owner') && <Cashflow currentTime={currentTime} />}
          {activeTab === 'masterdata' && (user.role === 'admin' || user.role === 'owner') && <MasterData currentTime={currentTime} />}
          {activeTab === 'ai' && (user.role === 'admin' || user.role === 'owner') && <AIAssistant currentTime={currentTime} />}
          {activeTab === 'setting' && (user.role === 'admin' || user.role === 'owner') && <SettingsPanel currentTime={currentTime} />}
        </ErrorBoundary>
      </main>
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
