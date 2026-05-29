import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, PartyPopper, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { formatRp } from '../utils';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const CustomMonthlyTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const pemasukan = payload.find((p: any) => p.dataKey === 'Pemasukan')?.value || 0;
    const pengeluaran = payload.find((p: any) => p.dataKey === 'Pengeluaran')?.value || 0;
    const profit = pemasukan - pengeluaran;

    return (
      <div className="bg-white border-2 border-gray-400 p-3 shadow-lg flex flex-col">
        <p className="font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">{label}</p>
        <div className="flex flex-col gap-1 text-sm">
          <p className="flex justify-between gap-6">
            <span className="text-gray-600">Pemasukan:</span>
            <span className="font-bold text-green-700">{formatRp(pemasukan)}</span>
          </p>
          <p className="flex justify-between gap-6">
            <span className="text-gray-600">Pengeluaran:</span>
            <span className="font-bold text-red-600">{formatRp(pengeluaran)}</span>
          </p>
          <div className="mt-1 pt-1 border-t border-gray-200">
            <p className="flex justify-between gap-6">
              <span className="text-gray-800 font-bold">Laba Bersih:</span>
              <span className={`font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {profit > 0 ? '+' : ''}{formatRp(profit)}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const Dashboard = ({ currentTime }: { currentTime: Date }) => {
  const { transactions, expenses, inventory, setActiveTab } = useAppContext();

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('POS_stockNotifications') === 'true';
  });

  const [categoryThresholds, setCategoryThresholds] = useState<Record<string, number>>(() => {
    return JSON.parse(localStorage.getItem('POS_categoryThresholds') || '{"DEFAULT": 5}');
  });
  const [showThresholdModal, setShowThresholdModal] = useState(false);
  const [compactMode, setCompactMode] = useState(() => {
    return localStorage.getItem('POS_dashboardCompactMode') === 'true';
  });
  const [dailyGoal, setDailyGoal] = useState(() => {
    return parseInt(localStorage.getItem('POS_dailyGoal') || '1000000', 10);
  });
  const [dailyGoalNote, setDailyGoalNote] = useState(() => {
    return localStorage.getItem('POS_dailyGoalNote') || '';
  });
  const [weeklyGoal, setWeeklyGoal] = useState(() => {
    return parseInt(localStorage.getItem('POS_weeklyGoal') || '7000000', 10);
  });
  const [weeklyGoalNote, setWeeklyGoalNote] = useState(() => {
    return localStorage.getItem('POS_weeklyGoalNote') || '';
  });
  const [showGoalModal, setShowGoalModal] = useState(false);

  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastAiText, setForecastAiText] = useState("");
  const [hasFetchedForecast, setHasFetchedForecast] = useState(false);

  // Daily Sales Tip Logic
  const [dailyAiTip, setDailyAiTip] = useState("");
  const [dailyAiTipLoading, setDailyAiTipLoading] = useState(false);

  const fetchDailyTip = async (forceRefresh = false) => {
    const today = new Date().toISOString().split('T')[0];
    const cachedTipKey = `POS_dailyAiTip_${today}`;
    
    if (!forceRefresh) {
      const cachedTip = localStorage.getItem(cachedTipKey);
      if (cachedTip) {
        setDailyAiTip(cachedTip);
        return;
      }
    }
    
    setDailyAiTipLoading(true);
    try {
      const recentTxs = transactions.slice(-100).map((t: any) => ({
          date: t.date,
          total: t.total,
      }));
      const prompt = `Based on the latest ${recentTxs.length} transactions: ${JSON.stringify(recentTxs)}.
      Give exactly one short, actionable business improvement tip for today to boost sales or improve efficiency.
      Max 2 sentences. No markdown, just plain text. Always respond in Indonesian (Gunakan bahasa Indonesia).`;
      
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.text) {
           setDailyAiTip(data.text);
           localStorage.setItem(cachedTipKey, data.text);
      }
    } catch (err) {
      console.error("Failed to fetch daily AI tip", err);
      // Removed fallback so users see there's an error if needed, but keeping fallback is fine
      setDailyAiTip("Sapa pelanggan dengan senyuman hari ini, tawari produk bundle untuk naikkan penjualan!");
    } finally {
      setDailyAiTipLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length > 0 && !dailyAiTip) {
        fetchDailyTip();
    }
  }, [transactions]);

  const fetchAiForecast = async () => {
    if (forecastLoading) return;
    setForecastLoading(true);
    try {
        const recentTxs = transactions.slice(-50).map((t: any) => ({
            date: t.date,
            total: t.total,
            items: t.items.map((i: any) => i.name)
        }));
        const prompt = `Analyze these recent transactions (up to 50): ${JSON.stringify(recentTxs)}. 
        Provide a very brief 2-3 sentence 'Sales Forecast' and suggest 2 practical promotional strategies for the next week.
        Format without markdown just plain text or bullets. No markdown. Always respond in Indonesian (Gunakan bahasa Indonesia).`;
        
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        if (data.text) {
             setForecastAiText(data.text);
        }
    } catch (err) {
        console.error("Failed to fetch AI forecast", err);
        setForecastAiText("Gagal memuat prediksi AI.");
    } finally {
        setHasFetchedForecast(true);
        setForecastLoading(false);
    }
  };

  const getThreshold = (cat: string) => categoryThresholds[cat] ?? categoryThresholds.DEFAULT ?? 5;

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      if (!('Notification' in window)) {
        alert('Browser ini tidak mendukung notifikasi.');
        return;
      }
      if (Notification.permission !== 'granted') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          localStorage.setItem('POS_stockNotifications', 'true');
        }
      } else {
        setNotificationsEnabled(true);
        localStorage.setItem('POS_stockNotifications', 'true');
      }
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('POS_stockNotifications', 'false');
    }
  };

  const notifiedItems = useRef<Set<string>>(new Set());

  const triggerStockNotifications = () => {
    if (notificationsEnabled && Notification.permission === 'granted') {
      inventory.forEach((item: any) => {
        const threshold = getThreshold(item.category || 'UMUM');
        if (item.stock <= threshold) {
          if (!notifiedItems.current.has(item.id)) {
             new Notification('Peringatan Stok Tipis', {
               body: `Stok produk ${item.name} sisa ${item.stock} pcs! Segera restock.`
             });
             notifiedItems.current.add(item.id);
          }
        } else {
          notifiedItems.current.delete(item.id);
        }
      });
    }
  };

  useEffect(() => {
    triggerStockNotifications();
  }, [inventory, notificationsEnabled, categoryThresholds]);

  const lowStockCount = useMemo(() => {
    return inventory.filter((item: any) => {
        const threshold = getThreshold(item.category || 'UMUM');
        return item.stock <= threshold;
    }).length;
  }, [inventory, categoryThresholds]);

  // 1. Daily Sales Trends (Last 7 Days)
  const salesData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayTxs = transactions.filter((t: any) => t.date.startsWith(dateStr));
      const totalSales = dayTxs.reduce((sum: number, t: any) => sum + t.total, 0);

      data.push({
        date: dateStr,
        sales: totalSales,
        label: d.toLocaleDateString('id-ID', { weekday: 'short' })
      });
    }
    return data;
  }, [transactions]);

  const total7Days = useMemo(() => salesData.reduce((sum, day) => sum + day.sales, 0), [salesData]);

  const projectedMonthlyRevenue = useMemo(() => {
    return (total7Days / 7) * 30;
  }, [total7Days]);

  // 2. Top Selling Items
  const topItems = useMemo(() => {
    const itemCounts: Record<string, {name: string, qty: number, total: number}> = {};
    
    transactions.forEach((t: any) => {
        t.items.forEach((item: any) => {
            if (item.isReturn) return;
            if (!itemCounts[item.name]) {
                itemCounts[item.name] = { name: item.name, qty: 0, total: 0 };
            }
            itemCounts[item.name].qty += item.qty;
            itemCounts[item.name].total += (item.qty * item.price);
        });
    });

    return Object.values(itemCounts)
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5); // top 5
  }, [transactions]);

  const revenueByCategory = useMemo(() => {
    const categoryTotals: Record<string, number> = {};

    transactions.forEach((t: any) => {
        t.items.forEach((item: any) => {
            const cat = item.category || 'LAINNYA';
            if (!categoryTotals[cat]) {
                categoryTotals[cat] = 0;
            }
            if (item.isReturn) {
                categoryTotals[cat] -= (item.qty * item.price);
            } else {
                categoryTotals[cat] += (item.qty * item.price);
            }
        });
    });

    return Object.entries(categoryTotals)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const PIE_COLORS = ['#0052cc', '#00a651', '#f59e0b', '#dc2626', '#8b5cf6', '#0ea5e9', '#ec4899'];

  const currentMonthDailySalesData = useMemo(() => {
    const data = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= numDays; i++) {
      const d = new Date(year, month, i);
      const dateStr = d.toISOString().split('T')[0];
      const dayTxs = transactions.filter((t: any) => t.date.startsWith(dateStr));
      const totalSales = dayTxs.reduce((sum: number, t: any) => sum + t.total, 0);

      data.push({
        date: dateStr,
        sales: totalSales,
        label: i.toString() // Day of the month
      });
    }
    return data;
  }, [transactions]);

  // 3. Current Cash Flow Status (Today) and Growth
  const cashFlowToday = useMemo(() => {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastWeekStr = lastWeek.toISOString().split('T')[0];
      
      const todayTxs = transactions.filter((t: any) => t.date.startsWith(todayStr));
      const todayExpenses = expenses.filter((e: any) => e.date.startsWith(todayStr));
      
      const lastWeekTxs = transactions.filter((t: any) => t.date.startsWith(lastWeekStr));
      const lastWeekExpenses = expenses.filter((e: any) => e.date.startsWith(lastWeekStr));
      
      const totalIncome = todayTxs.reduce((sum: number, t: any) => sum + t.total, 0);
      const totalExpense = todayExpenses.reduce((sum: number, e: any) => sum + e.amount, 0);
      
      const lastWeekIncome = lastWeekTxs.reduce((sum: number, t: any) => sum + t.total, 0);
      const lastWeekExpense = lastWeekExpenses.reduce((sum: number, e: any) => sum + e.amount, 0);

      const incomeGrowth = lastWeekIncome === 0 ? (totalIncome > 0 ? 100 : 0) : ((totalIncome - lastWeekIncome) / lastWeekIncome) * 100;
      const expenseGrowth = lastWeekExpense === 0 ? (totalExpense > 0 ? 100 : 0) : ((totalExpense - lastWeekExpense) / lastWeekExpense) * 100;
      
      return {
          income: totalIncome,
          expense: totalExpense,
          net: totalIncome - totalExpense,
          incomeGrowth,
          expenseGrowth,
          lastWeekIncome,
          lastWeekExpense
      };
  }, [transactions, expenses]);

  const monthlyData = useMemo(() => {
    const data = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      // Calculate start of the month
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      
      const year = d.getFullYear();
      const monthStr = String(d.getMonth() + 1).padStart(2, '0');
      const prefix = `${year}-${monthStr}`;
      
      const monthTxs = transactions.filter((t: any) => t.date.startsWith(prefix));
      const monthExps = expenses.filter((e: any) => e.date.startsWith(prefix));
      
      const income = monthTxs.reduce((sum: number, t: any) => sum + t.total, 0);
      const expense = monthExps.reduce((sum: number, e: any) => sum + e.amount, 0);
      
      data.push({
        label: d.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' }),
        Pemasukan: income,
        Pengeluaran: expense,
        Bersih: income - expense
      });
    }
    
    return data;
  }, [transactions, expenses]);

  const weeklyProjectionData = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    const bins = [0, 0, 0, 0]; 

    transactions.forEach((t: any) => {
        if (t.type === 'PEMBELIAN') return; 
        
        let tDate = new Date(t.date);
        if (t.isoDate) tDate = new Date(t.isoDate);
        
        const diffTime = today.getTime() - tDate.getTime();
        if (diffTime < 0) return;
        
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 28) {
            const weekIndex = 3 - Math.floor(diffDays / 7);
            if (weekIndex >= 0 && weekIndex < 4) {
               bins[weekIndex] += t.total;
            }
        }
    });

    const avg = bins.reduce((a, b) => a + b, 0) / 4;
    
    return [
       { label: 'Mg -4', sales: bins[0], projected: 0 },
       { label: 'Mg -3', sales: bins[1], projected: 0 },
       { label: 'Mg -2', sales: bins[2], projected: 0 },
       { label: 'Mg -1', sales: bins[3], projected: 0 },
       { label: 'Proyeksi (Mg Ini)', sales: 0, projected: avg }
    ];
  }, [transactions]);

  const dailyGoalProgress = Math.min(100, Math.round((cashFlowToday.income / dailyGoal) * 100));
  const dailyGoalRadius = 40;
  const dailyGoalCircumference = 2 * Math.PI * dailyGoalRadius;
  const dailyGoalOffset = dailyGoalCircumference - (dailyGoalProgress / 100) * dailyGoalCircumference;

  const weeklyGoalProgress = Math.min(100, Math.round((total7Days / weeklyGoal) * 100));
  const weeklyGoalRadius = 40;
  const weeklyGoalCircumference = 2 * Math.PI * weeklyGoalRadius;
  const weeklyGoalOffset = weeklyGoalCircumference - (weeklyGoalProgress / 100) * weeklyGoalCircumference;

  const [hasCelebrated, setHasCelebrated] = useState(() => {
    return localStorage.getItem('POS_celebratedDate') === new Date().toISOString().split('T')[0];
  });
  const [showGoalToast, setShowGoalToast] = useState(false);

  useEffect(() => {
     if (dailyGoalProgress >= 100 && cashFlowToday.income > 0 && !hasCelebrated) {
         confetti({
             particleCount: 150,
             spread: 70,
             origin: { y: 0.6 },
             colors: ['#00a651', '#f59e0b', '#3b82f6', '#ec4899']
         });
         setHasCelebrated(true);
         localStorage.setItem('POS_celebratedDate', new Date().toISOString().split('T')[0]);
         setShowGoalToast(true);
         setTimeout(() => setShowGoalToast(false), 5000);
     }
  }, [dailyGoalProgress, cashFlowToday.income, hasCelebrated]);

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden relative">
      <LegacyWindowHeader title="DASHBOARD & STATISTIK" currentTime={currentTime} />
      
      <AnimatePresence>
        {showGoalToast && (
            <motion.div 
               initial={{ opacity: 0, y: -50, scale: 0.9 }}
               animate={{ opacity: 1, y: 20, scale: 1 }}
               exit={{ opacity: 0, y: -20, scale: 0.9 }}
               className="absolute top-10 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-green-500 to-green-600 border-2 border-white shadow-2xl rounded-full px-6 py-3 flex items-center gap-3 text-white"
            >
               <PartyPopper className="w-6 h-6 animate-bounce" />
               <div>
                  <h3 className="font-bold text-lg leading-tight tracking-tight shadow-sm">Target Tercapai!</h3>
                  <p className="text-sm font-medium text-green-100">Hebat! Penjualan hari ini luar biasa.</p>
               </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#d4d0c8] px-2 py-1 flex justify-end shadow-sm border-b border-gray-400">
         <button 
           onClick={() => {
               const newMode = !compactMode;
               setCompactMode(newMode);
               localStorage.setItem('POS_dashboardCompactMode', String(newMode));
           }}
           className={`text-[10px] px-2 py-1 font-bold border rounded-sm transition-colors flex items-center gap-1 ${compactMode ? 'bg-blue-600 text-white border-blue-800' : 'bg-gray-100 text-gray-600 border-gray-400 hover:bg-gray-200'}`}
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
            {compactMode ? 'Compact Mode (ON)' : 'Full View (OFF)'}
         </button>
      </div>

      <div className="p-2 flex flex-col gap-4 overflow-y-auto h-full text-black">
        
        {/* TOP ROW STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 shrink-0">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white border border-gray-400 p-4 shadow-sm flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                </div>
                <span className="text-gray-500 font-bold mb-1">Pemasukan Hari Ini</span>
                <motion.span 
                  key={cashFlowToday.income}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-green-700"
                >
                  {formatRp(cashFlowToday.income)}
                </motion.span>
                <div className="flex items-center gap-1 mt-2 text-[10px]">
                    <span className={`font-bold px-1.5 py-0.5 rounded-sm ${cashFlowToday.incomeGrowth > 0 ? 'bg-green-100 text-green-700' : cashFlowToday.incomeGrowth < 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                        {cashFlowToday.incomeGrowth > 0 ? '+' : ''}{cashFlowToday.incomeGrowth.toFixed(1)}%
                    </span>
                    <span className="text-gray-500">vs minggu lalu</span>
                </div>
            </motion.div>
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white border border-gray-400 p-4 shadow-sm flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a8 8 0 0 1-9 7.96V22a1 1 0 0 0-1-1 1 1 0 0 0-1 1v.04A8 8 0 0 1 4 19.34"/><path d="M22 17v-4h-3a2 2 0 1 0 0 4h3Z"/></svg>
                </div>
                <span className="text-gray-500 font-bold mb-1">Pengeluaran Hari Ini</span>
                <motion.span 
                  key={cashFlowToday.expense}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-red-700"
                >
                  {formatRp(cashFlowToday.expense)}
                </motion.span>
                <div className="flex items-center gap-1 mt-2 text-[10px]">
                    <span className={`font-bold px-1.5 py-0.5 rounded-sm ${cashFlowToday.expenseGrowth > 0 ? 'bg-red-100 text-red-700' : cashFlowToday.expenseGrowth < 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {cashFlowToday.expenseGrowth > 0 ? '+' : ''}{cashFlowToday.expenseGrowth.toFixed(1)}%
                    </span>
                    <span className="text-gray-500">vs minggu lalu</span>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white border border-gray-400 p-4 shadow-sm flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <span className="text-gray-500 font-bold mb-1">Laba Bersih Hari Ini</span>
                <motion.span 
                  key={cashFlowToday.net}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-blue-800"
                >
                  {formatRp(cashFlowToday.net)}
                </motion.span>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white border border-gray-400 p-4 shadow-sm flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                     <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-gray-500 font-bold flex items-center gap-1">Peringatan Stok Tipis</span>
                  <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setShowThresholdModal(true)}
                        className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                        title="Atur Batas Stok"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                      </button>
                      <button 
                        onClick={toggleNotifications}
                        className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border transition-colors ${notificationsEnabled ? 'bg-orange-100 text-orange-800 border-orange-300' : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'}`}
                        title="Toggle Notifikasi Browser"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                        {notificationsEnabled ? 'On' : 'Off'}
                      </button>
                  </div>
                </div>
                <motion.span 
                  key={lowStockCount}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-orange-600"
                >
                  {lowStockCount} Item
                </motion.span>
                <div className="mt-auto pt-2 relative z-10 flex items-center justify-between">
                    <button onClick={() => setActiveTab('masterdata')} className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-1.5 rounded font-bold border border-orange-300 transition-colors shadow-sm">Lihat Data &rarr;</button>
                </div>
            </motion.div>
        </div>

        {/* DAILY SALES TIP WIDGET */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col"
        >
            <div className="bg-purple-800 text-white font-bold px-3 py-1.5 text-sm flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    TIP BISNIS HARIAN AI
                </div>
                <button onClick={() => fetchDailyTip(true)} disabled={dailyAiTipLoading} className="text-gray-200 hover:text-white flex items-center gap-1 text-xs px-2 cursor-pointer outline-none">
                    <RefreshCw className={`w-3 h-3 ${dailyAiTipLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>
            <div className="p-3 bg-white m-1 border border-gray-300 flex items-center gap-3">
               {dailyAiTipLoading ? (
                   <div className="flex-1 flex gap-2 items-center justify-center text-gray-500 min-h-[40px]">
                       <Loader2 className="w-4 h-4 animate-spin" /> Sedang merumuskan tip berdasarkan penjualan...
                   </div>
               ) : (
                   <p className="text-sm font-medium text-gray-800 flex-1 leading-relaxed">{dailyAiTip || "Coba sapa pelanggan secara personal hari ini untuk meningkatkan retensi."}</p>
               )}
            </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[300px]">
            {/* WIDGET: DAILY SALES GOAL */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col">
                <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between items-center shadow-sm">
                   <span>TARGET PENDAPATAN HARI INI</span>
                   <button onClick={() => setShowGoalModal(true)} title="Atur Target" className="hover:bg-blue-800 p-0.5 rounded transition-colors text-white/80 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                   </button>
                </div>
                <div className="flex-1 p-4 bg-white m-1 border border-gray-300 flex flex-col items-center justify-center relative overflow-hidden text-center">
                    <motion.div 
                        className="relative w-32 h-32 flex items-center justify-center"
                        animate={
                            dailyGoalProgress >= 100 ? { scale: [1, 1.1, 1] } :
                            dailyGoalProgress >= 50 ? { scale: [1, 1.05, 1] } : 
                            { scale: 1 }
                        }
                        transition={{ duration: 1.5, repeat: dailyGoalProgress >= 50 ? Infinity : 0, ease: "easeInOut" }}
                    >
                        <svg className="transform -rotate-90 w-32 h-32 absolute inset-0">
                           <circle
                             cx="64" cy="64" r={dailyGoalRadius}
                             stroke="currentColor" strokeWidth="10" fill="transparent"
                             className="text-gray-100"
                           />
                           <circle
                             cx="64" cy="64" r={dailyGoalRadius}
                             stroke="currentColor" strokeWidth="10" fill="transparent"
                             strokeDasharray={dailyGoalCircumference}
                             strokeDashoffset={dailyGoalOffset}
                             strokeLinecap="round"
                             className={`transition-all duration-1000 ease-out ${dailyGoalProgress >= 100 ? 'text-green-500' : 'text-blue-600'}`}
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black text-gray-800 tracking-tighter">{dailyGoalProgress}%</span>
                        </div>
                    </motion.div>
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tercapai</span>
                        <span className={`text-lg font-bold ${dailyGoalProgress >= 100 ? 'text-green-700' : 'text-blue-900'}`}>{formatRp(cashFlowToday.income)}</span>
                        <span className="text-[10px] text-gray-500 mt-1">
                            Target: {formatRp(dailyGoal)}
                        </span>
                        {dailyGoalNote && (
                            <span className="mt-2 text-[10px] italic text-gray-600 bg-gray-50 px-2 py-1 rounded w-full max-w-[150px] truncate border border-gray-200">
                                {dailyGoalNote}
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* WIDGET: WEEKLY TARGET */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col">
                <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between items-center shadow-sm">
                   <span>TARGET MINGGUAN (7 HARI)</span>
                   <button onClick={() => setShowGoalModal(true)} title="Atur Target" className="hover:bg-blue-800 p-0.5 rounded transition-colors text-white/80 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                   </button>
                </div>
                <div className="flex-1 p-4 bg-white m-1 border border-gray-300 flex flex-col items-center justify-center relative overflow-hidden text-center">
                    <motion.div 
                        className="relative w-32 h-32 flex items-center justify-center"
                        animate={
                            weeklyGoalProgress >= 100 ? { scale: [1, 1.1, 1] } :
                            weeklyGoalProgress >= 50 ? { scale: [1, 1.05, 1] } : 
                            { scale: 1 }
                        }
                        transition={{ duration: 1.5, repeat: weeklyGoalProgress >= 50 ? Infinity : 0, ease: "easeInOut" }}
                    >
                        <svg className="transform -rotate-90 w-32 h-32 absolute inset-0">
                           <circle
                             cx="64" cy="64" r={weeklyGoalRadius}
                             stroke="currentColor" strokeWidth="10" fill="transparent"
                             className="text-gray-100"
                           />
                           <circle
                             cx="64" cy="64" r={weeklyGoalRadius}
                             stroke="currentColor" strokeWidth="10" fill="transparent"
                             strokeDasharray={weeklyGoalCircumference}
                             strokeDashoffset={weeklyGoalOffset}
                             strokeLinecap="round"
                             className={`transition-all duration-1000 ease-out ${weeklyGoalProgress >= 100 ? 'text-green-500' : 'text-blue-600'}`}
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black text-gray-800 tracking-tighter">{weeklyGoalProgress}%</span>
                        </div>
                    </motion.div>
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tercapai</span>
                        <span className={`text-lg font-bold ${weeklyGoalProgress >= 100 ? 'text-green-700' : 'text-blue-900'}`}>{formatRp(total7Days)}</span>
                        <span className="text-[10px] text-gray-500 mt-1">
                            Target: {formatRp(weeklyGoal)}
                        </span>
                        {weeklyGoalNote && (
                            <span className="mt-2 text-[10px] italic text-gray-600 bg-gray-50 px-2 py-1 rounded w-full max-w-[150px] truncate border border-gray-200">
                                {weeklyGoalNote}
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* CHART 2: TOP ITEMS */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col">
                <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between shadow-sm">
                   PRODUK PALING LARIS
                </div>
                <div className="flex-1 p-4 bg-white m-1 border border-gray-300 min-h-[250px]">
                     <ResponsiveContainer width="99%" height="100%" minHeight={250}>
                        <BarChart data={topItems} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 100 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                          <XAxis type="number" fontSize={11} />
                          <YAxis dataKey="name" type="category" fontSize={10} width={90} />
                          <RechartsTooltip 
                             formatter={(value: number, name: string) => [value, name === 'qty' ? 'Total Terjual (Pcs)' : name]}
                             labelStyle={{color: 'black', fontWeight: 'bold'}}
                          />
                          <Legend />
                          <Bar dataKey="qty" name="Jumlah (Pcs)" fill="#00a651" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* CHART 3: REVENUE BY CATEGORY */}
            {!compactMode && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col">
                    <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between shadow-sm">
                       PENDAPATAN PER KATEGORI
                    </div>
                    <div className="flex-1 p-4 bg-white m-1 border border-gray-300 min-h-[250px]">
                         <ResponsiveContainer width="99%" height="100%" minHeight={250}>
                            <PieChart>
                              <Pie
                                data={revenueByCategory}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                                label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                labelLine={false}
                              >
                                {revenueByCategory.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                 formatter={(value: number) => [formatRp(value), "Pendapatan"]}
                                 labelStyle={{color: 'black', fontWeight: 'bold'}}
                              />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* CHART 4: MONTHLY INCOME VS EXPENSES */}
            {!compactMode && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col">
                    <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between shadow-sm">
                       PENDAPATAN VS PENGELUARAN (6 BULAN)
                    </div>
                    <div className="flex-1 p-4 bg-white m-1 border border-gray-300 min-h-[250px]">
                        <ResponsiveContainer width="99%" height="100%" minHeight={250}>
                            <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                              <XAxis dataKey="label" fontSize={11} />
                              <YAxis fontSize={11} tickFormatter={(val) => `Rp ${val/1000}k`} />
                              <RechartsTooltip content={<CustomMonthlyTooltip />} />
                              <Legend />
                              <Line type="monotone" dataKey="Pemasukan" stroke="#00a651" strokeWidth={3} activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="Pengeluaran" stroke="#dc2626" strokeWidth={3} activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="Bersih" name="Laba Bersih" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* CHART 5: DAILY REVENUE (CURRENT MONTH) */}
            {!compactMode && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.85 }}
                    className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col lg:col-span-2">
                    <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between shadow-sm">
                       PENDAPATAN HARIAN (BULAN INI)
                    </div>
                    <div className="flex-1 p-4 bg-white m-1 border border-gray-300 min-h-[250px]">
                        <ResponsiveContainer width="99%" height="100%" minHeight={250}>
                            <LineChart data={currentMonthDailySalesData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                              <XAxis dataKey="label" fontSize={11} />
                              <YAxis fontSize={11} tickFormatter={(val) => `Rp ${val/1000}k`} />
                              <RechartsTooltip 
                                 formatter={(value: number, name: string) => [formatRp(value), name]}
                                 labelStyle={{color: 'black', fontWeight: 'bold'}}
                              />
                              <Legend />
                              <Line type="monotone" dataKey="sales" name="Total Penjualan" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* CHART 6: WEEKLY PROJECTION */}
            {!compactMode && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.85 }}
                    className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col lg:col-span-1">
                    <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between shadow-sm">
                       PROYEKSI MINGGUAN
                    </div>
                    <div className="flex-1 p-4 bg-white m-1 border border-gray-300 min-h-[250px]">
                        <ResponsiveContainer width="99%" height="100%" minHeight={250}>
                            <BarChart data={weeklyProjectionData} margin={{ top: 15, right: 10, bottom: 5, left: 10 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0"/>
                              <XAxis dataKey="label" fontSize={10} tick={{ fill: '#4b5563' }} />
                              <YAxis fontSize={10} width={40} tickFormatter={(val) => `${val/1000}k`} />
                              <RechartsTooltip 
                                 formatter={(value: number, name: string) => [formatRp(value), name === 'sales' ? 'Penjualan' : 'Proyeksi']}
                                 labelStyle={{color: 'black', fontWeight: 'bold'}}
                              />
                              <Legend wrapperStyle={{ fontSize: '11px' }} />
                              <Bar dataKey="sales" name="Penjualan Riil" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="projected" name="Proyeksi" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* AI SALES FORECAST WIDGET */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col lg:col-span-3 min-h-[150px]">
                <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex gap-2 items-center shadow-sm">
                   <Sparkles className="w-4 h-4 text-purple-400" />
                   AI SALES FORECAST & STRATEGY
                </div>
                <div className="flex-1 p-4 bg-white m-1 border border-gray-300 flex flex-col items-center justify-center text-center">
                    {!hasFetchedForecast ? (
                         <button 
                             onClick={fetchAiForecast}
                             disabled={forecastLoading}
                             className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded shadow flex items-center gap-2"
                         >
                             {forecastLoading ? <><Loader2 className="w-4 h-4 animate-spin"/> Menganalisis Data...</> : <><Sparkles className="w-4 h-4"/> Buat Prediksi via AI</>}
                         </button>
                    ) : (
                         <div className="w-full text-left font-sans text-sm text-gray-800 flex flex-col gap-2">
                             {forecastAiText ? (
                                 <div className="whitespace-pre-wrap">{forecastAiText}</div>
                             ) : (
                                 <div className="text-gray-500 italic">Gagal membuat prediksi.</div>
                             )}
                             <div className="mt-2 text-right border-t border-gray-200 pt-2">
                                 <button onClick={fetchAiForecast} disabled={forecastLoading} className="text-blue-600 hover:underline text-xs font-bold inline-flex items-center gap-1">
                                     {forecastLoading ? <Loader2 className="w-3 h-3 animate-spin"/> : <Sparkles className="w-3 h-3"/>}
                                     Refresh
                                 </button>
                             </div>
                         </div>
                    )}
                </div>
            </motion.div>
        </div>
      </div>
      
      {showThresholdModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-[#ece9d8] border-2 border-slate-600 shadow-xl w-full max-w-md flex flex-col">
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-3 py-2 flex justify-between items-center font-bold shadow-sm">
                    <span>Atur Batas Peringatan Stok per Kategori</span>
                    <button onClick={() => setShowThresholdModal(false)} className="hover:text-red-300">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                <div className="p-4 bg-white m-1 border border-gray-300 max-h-[60vh] overflow-y-auto">
                    <p className="text-xs text-gray-600 mb-4">Atur batas sisa stok untuk menampilkan peringatan. Jika stok kurang dari atau sama dengan batas ini, produk akan masuk dalam daftar peringatan stok menipis.</p>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-2 border border-blue-200 rounded gap-4 bg-blue-50">
                            <span className="font-bold text-sm text-blue-900 flex-1">DEFAULT (Global)</span>
                            <div className="flex items-center gap-2">
                                <label className="text-xs text-gray-500">Batas:</label>
                                <input type="number" className="border border-gray-400 p-1 w-16 text-right font-bold text-blue-900"
                                       value={categoryThresholds.DEFAULT ?? 5}
                                       onChange={(e) => {
                                           const val = parseInt(e.target.value) || 0;
                                           const newVal = { ...categoryThresholds, DEFAULT: val };
                                           setCategoryThresholds(newVal);
                                           localStorage.setItem('POS_categoryThresholds', JSON.stringify(newVal));
                                       }}
                                />
                            </div>
                        </div>
                        
                        <div className="w-full h-px bg-gray-200 my-1"></div>
                        
                        {/* Get unique categories from inventory to show existing categories */}
                        {Array.from(new Set(inventory.map((i: any) => i.category || 'UMUM'))).sort().map(cat => (
                            <div key={cat as string} className="flex items-center justify-between p-2 border border-gray-200 rounded gap-4">
                                <span className="font-bold text-sm text-gray-700 flex-1">{cat as string}</span>
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500">Batas:</label>
                                    <input type="number" className="border border-gray-400 p-1 w-16 text-right font-bold"
                                           value={categoryThresholds[cat as string] ?? categoryThresholds.DEFAULT ?? 5}
                                           onChange={(e) => {
                                               const val = parseInt(e.target.value) || 0;
                                               const newVal = { ...categoryThresholds, [cat as string]: val };
                                               setCategoryThresholds(newVal);
                                               localStorage.setItem('POS_categoryThresholds', JSON.stringify(newVal));
                                           }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      )}

      {showGoalModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-[#ece9d8] border-2 border-slate-600 shadow-xl w-full max-w-sm flex flex-col">
                <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-3 py-2 flex justify-between items-center font-bold shadow-sm">
                    <span>Atur Target Pendapatan</span>
                    <button onClick={() => setShowGoalModal(false)} className="hover:text-red-300">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                <div className="p-4 bg-white m-1 border border-gray-300 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
                    <p className="text-xs text-gray-600">Tentukan target pendapatan harian dan mingguan untuk toko ini.</p>
                    
                    <div className="border-b border-gray-200 pb-3 mb-1">
                        <h4 className="text-sm font-bold text-blue-900 mb-3">Target Harian</h4>
                        <div className="flex flex-col gap-2 mb-3">
                            <label className="text-xs font-bold text-gray-700">Nominal (Rp)</label>
                            <input type="number" 
                                   className="border border-gray-400 p-2 font-bold text-base text-blue-900"
                                   value={dailyGoal}
                                   onChange={(e) => {
                                       const val = parseInt(e.target.value) || 0;
                                       setDailyGoal(val);
                                       localStorage.setItem('POS_dailyGoal', String(val));
                                   }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-700">Catatan / Label</label>
                            <input type="text" 
                                   placeholder="Contoh: Promo Akhir Pekan"
                                   className="border border-gray-400 p-2 text-sm text-gray-800"
                                   value={dailyGoalNote}
                                   onChange={(e) => {
                                       setDailyGoalNote(e.target.value);
                                       localStorage.setItem('POS_dailyGoalNote', e.target.value);
                                   }}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-blue-900 mb-3">Target Mingguan</h4>
                        <div className="flex flex-col gap-2 mb-3">
                            <label className="text-xs font-bold text-gray-700">Nominal (Rp)</label>
                            <input type="number" 
                                   className="border border-gray-400 p-2 font-bold text-base text-blue-900"
                                   value={weeklyGoal}
                                   onChange={(e) => {
                                       const val = parseInt(e.target.value) || 0;
                                       setWeeklyGoal(val);
                                       localStorage.setItem('POS_weeklyGoal', String(val));
                                   }}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-gray-700">Catatan / Label</label>
                            <input type="text" 
                                   placeholder="Contoh: Omzet Minggu Ini"
                                   className="border border-gray-400 p-2 text-sm text-gray-800"
                                   value={weeklyGoalNote}
                                   onChange={(e) => {
                                       setWeeklyGoalNote(e.target.value);
                                       localStorage.setItem('POS_weeklyGoalNote', e.target.value);
                                   }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
