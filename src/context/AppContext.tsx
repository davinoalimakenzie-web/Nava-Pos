import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { 
  initialInventory, 
  initialCustomers, 
  initialTransactions, 
  initialExpenses, 
  initialPiutang, 
  initialOrderData,
  initialEmployees,
  initialAttendances,
  initialPendingTransactions,
  initialLeaveRequests,
  defaultDate,
  initialUsers
} from '../data';

const AppContext = createContext<any>(null);

const DUMMY_VERSION = "18";

const initialHutangSupplier: any[] = [];

function useSyncState<T>(key: string, initial: T, syncEnabled: boolean) {
  const [state, setState] = useState<T>(() => {
    const version = localStorage.getItem('POS_DUMMY_VERSION');
    const saved = localStorage.getItem(`POS_${key}`);
    
    // Force reload dummy data if version is bumped
    if (version !== DUMMY_VERSION) {
       return initial;
    }
    
    if (saved) {
      try {
        return JSON.parse(saved) as T;
      } catch (e) {
        console.error("Error loading localStorage key: " + key, e);
      }
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(`POS_${key}`, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    if (!syncEnabled) return;
    const unsub = onSnapshot(doc(db, 'system', key), (docSnap) => {
      if (docSnap.exists()) {
        const val = docSnap.data().value as T;
        setState(val);
        localStorage.setItem(`POS_${key}`, JSON.stringify(val));
      }
    });
    return () => unsub();
  }, [key, syncEnabled]);

  const setSyncedState = (updater: any) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem(`POS_${key}`, JSON.stringify(next));
      if (syncEnabled) {
        setDoc(doc(db, 'system', key), { value: next }, { merge: true }).catch(console.error);
      }
      return next;
    });
  }

  return [state, setSyncedState] as const;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('pos');
  const [appMode, setAppMode] = useState<'POS' | 'SERVICE'>('POS');
  
  // System Settings
  const [storeSettings, setStoreSettings] = useState(() => {
    const version = localStorage.getItem('POS_DUMMY_VERSION');
    const saved = localStorage.getItem('POS_storeSettings');
    
    if (version !== DUMMY_VERSION) {
       return {
          storeName: 'NAVA POS',
          storeAddress: 'Jl. Pahlawan No 123, Surabaya',
          storePhone: '0812-3456-7890',
          footerText: 'Terima Kasih Telah Berbelanja',
          printerDriver: 'Generic / Text Only',
          scannerPrefix: '',
          scannerSuffix: 'Enter',
          syncEnabled: false,
          branches: ['Kudus', 'Pati'],
          activeBranch: 'Kudus',
          margins: {
              UMUM: { level1: 30, level2: 15 },
              LCD: { level1: 50, level2: 25 },
              Batre: { level1: 40, level2: 20 },
              Aksesoris: { level1: 75, level2: 30 }
          }
       };
    }
    
    return saved ? JSON.parse(saved) : {
      storeName: 'NAVA POS',
      storeAddress: 'Jl. Pahlawan No 123, Surabaya',
      storePhone: '0812-3456-7890',
      footerText: 'Terima Kasih Telah Berbelanja',
      printerDriver: 'Generic / Text Only',
      scannerPrefix: '',
      scannerSuffix: 'Enter',
      syncEnabled: false,
      branches: ['Pusat'],
      activeBranch: 'Pusat',
      margins: { UMUM: { level1: 75, level2: 15 } }
    };
  });

  useEffect(() => {
    localStorage.setItem('POS_storeSettings', JSON.stringify(storeSettings));
    localStorage.setItem('POS_DUMMY_VERSION', DUMMY_VERSION);
  }, [storeSettings]);

  const [appUsers, setAppUsers] = useSyncState<any[]>('appUsers', initialUsers, storeSettings.syncEnabled);
  const [wallets, setWallets] = useSyncState<any>('wallets', { danaLaci: 0, danaBebas: 0, lastClosedDate: '' }, storeSettings.syncEnabled);
  const [inventory, setInventory] = useSyncState<any[]>('inventory', initialInventory, storeSettings.syncEnabled);
  const [customers, setCustomers] = useSyncState<any[]>('customers', initialCustomers, storeSettings.syncEnabled);
  const [employees, setEmployees] = useSyncState<any[]>('employees', initialEmployees, storeSettings.syncEnabled);
  const [attendances, setAttendances] = useSyncState<any[]>('attendances', initialAttendances, storeSettings.syncEnabled);
  const [leaveRequests, setLeaveRequests] = useSyncState<any[]>('leaveRequests', initialLeaveRequests, storeSettings.syncEnabled);
  const [transactions, setTransactions] = useSyncState<any[]>('transactions', initialTransactions, storeSettings.syncEnabled);
  const [expenses, setExpenses] = useSyncState<any[]>('expenses', initialExpenses, storeSettings.syncEnabled);
  const [piutangData, setPiutangData] = useSyncState<any[]>('piutang', initialPiutang, storeSettings.syncEnabled);
  const [orderData, setOrderData] = useSyncState<any[]>('order', initialOrderData, storeSettings.syncEnabled);
  const [hutangSupplier, setHutangSupplier] = useSyncState<any[]>('hutangSupplier', initialHutangSupplier, storeSettings.syncEnabled);
  const [kewajibanLain, setKewajibanLain] = useSyncState<any[]>('kewajibanLain', [], storeSettings.syncEnabled);
  const [waitingPayments, setWaitingPayments] = useSyncState<any[]>('waitingPayments', [], storeSettings.syncEnabled);

  const [suppliers, setSuppliers] = useSyncState<any[]>('suppliers', [], storeSettings.syncEnabled);
  const [supplierReturns, setSupplierReturns] = useSyncState<any[]>('supplierReturns', [], storeSettings.syncEnabled);

  const [botMemory, setBotMemory] = useSyncState<string>('botMemory', 'Saya adalah AI bot asisten cerdas untuk Nava POS.', storeSettings.syncEnabled);

  const [appLogs, setAppLogs] = useSyncState<any[]>('appLogs', [], false);

  const addLog = (type: string, desc: string) => {
    const time = new Date().getTime();
    setAppLogs(prev => {
      const today = new Date().toDateString();
      const filtered = prev.filter(p => new Date(p.time).toDateString() === today);
      return [{type, desc, time}, ...filtered].slice(0, 100);
    });
  };

  // Cross-cutting states
  const [pendingTransactions, setPendingTransactions] = useSyncState<any[]>('pendingTransactions', initialPendingTransactions, storeSettings.syncEnabled);

  // POS specific global states
  const [cart, setCart] = useState<any[]>([]);
  const [amountPaid, setAmountPaid] = useState('');
  const [activeReturTrx, setActiveReturTrx] = useState<any>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [transactionDate, setTransactionDate] = useState(defaultDate);
  const [paymentMethod, setPaymentMethod] = useState('TUNAI');

  // Modals state
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showPiutangModal, setShowPiutangModal] = useState(false);
  const [showPrintOptionsModal, setShowPrintOptionsModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Auth state for switch user
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingUser, setPendingUser] = useState<any>(null);

  // Tab states
  const [masterDataTab, setMasterDataTab] = useState('stock');
  const [isInputStockMode, setIsInputStockMode] = useState(false);
  const [isKalkulatorOpen, setIsKalkulatorOpen] = useState(false);

  return (
    <AppContext.Provider value={{
      user, setUser,
      activeTab, setActiveTab,
      appMode, setAppMode,
      wallets, setWallets,
      appUsers, setAppUsers,
      inventory, setInventory,
      customers, setCustomers,
      employees, setEmployees,
      attendances, setAttendances,
      leaveRequests, setLeaveRequests,
      transactions, setTransactions,
      expenses, setExpenses,
      piutangData, setPiutangData,
      orderData, setOrderData,
      hutangSupplier, setHutangSupplier,
      kewajibanLain, setKewajibanLain,
      waitingPayments, setWaitingPayments,
      pendingTransactions, setPendingTransactions,
      cart, setCart,
      amountPaid, setAmountPaid,
      activeReturTrx, setActiveReturTrx,
      selectedCustomerId, setSelectedCustomerId,
      transactionDate, setTransactionDate,
      paymentMethod, setPaymentMethod,
      showPendingModal, setShowPendingModal,
      showPiutangModal, setShowPiutangModal,
      showPrintOptionsModal, setShowPrintOptionsModal,
      showExpenseModal, setShowExpenseModal,
      showAddCustomerModal, setShowAddCustomerModal,
      showAddEmpModal, setShowAddEmpModal,
      showLogoutConfirm, setShowLogoutConfirm,
      showAuthModal, setShowAuthModal,
      pendingUser, setPendingUser,
      masterDataTab, setMasterDataTab,
      suppliers, setSuppliers,
      supplierReturns, setSupplierReturns,
      botMemory, setBotMemory,
      storeSettings, setStoreSettings,
      appLogs, addLog,
      isInputStockMode, setIsInputStockMode,
      isKalkulatorOpen, setIsKalkulatorOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
