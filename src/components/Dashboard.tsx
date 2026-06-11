import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, PartyPopper, RefreshCw, Volume2, VolumeX, Bell, BellOff, Target, Trophy, Settings } from 'lucide-react';
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

const playGoalReachedSound = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const playNote = (freq: number, start: number, duration: number) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      
      gainNode.gain.setValueAtTime(0.15, start);
      gainNode.gain.exponentialRampToValueAtTime(0.01, start + duration);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start(start);
      osc.stop(start + duration);
    };
    
    const now = audioCtx.currentTime;
    playNote(523.25, now, 0.2); // C5
    playNote(659.25, now + 0.12, 0.2); // E5
    playNote(783.99, now + 0.24, 0.4); // G5
  } catch (e) {
    console.warn("AudioContext error", e);
  }
};

export const Dashboard = ({ currentTime }: { currentTime: Date }) => {
  const { 
    transactions, expenses, inventory, wallets,
    hutangSupplier, kewajibanLain, setActiveTab 
  } = useAppContext();

  const monthlyChartScrollRef = useRef<HTMLDivElement>(null);

  // Comprehensive Time Filter States
  const [timeframe, setTimeframe] = useState<'WEEK' | 'MONTH' | '3MONTHS' | 'CUSTOM'>('MONTH');
  const [customStart, setCustomStart] = useState<string>(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().split('T')[0];
  });
  const [customEnd, setCustomEnd] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  const parsedRange = useMemo(() => {
    const today = new Date();
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);
    
    let start = new Date(today);
    start.setHours(0, 0, 0, 0);

    if (timeframe === 'WEEK') {
      start.setDate(today.getDate() - 6);
    } else if (timeframe === 'MONTH') {
      start.setDate(1); // 1st of current month
    } else if (timeframe === '3MONTHS') {
      start.setMonth(today.getMonth() - 3);
      start.setDate(1);
    } else if (timeframe === 'CUSTOM') {
      if (customStart) {
        start = new Date(customStart);
        start.setHours(0, 0, 0, 0);
      }
      if (customEnd) {
        const customEndDate = new Date(customEnd);
        customEndDate.setHours(23, 59, 59, 999);
        end.setTime(customEndDate.getTime());
      }
    }
    return { start, end };
  }, [timeframe, customStart, customEnd]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t: any) => {
      const tDate = new Date(t.date);
      return tDate >= parsedRange.start && tDate <= parsedRange.end;
    });
  }, [transactions, parsedRange]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e: any) => {
      const eDate = new Date(e.date);
      return eDate >= parsedRange.start && eDate <= parsedRange.end;
    });
  }, [expenses, parsedRange]);

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
  const [goalAlarmSound, setGoalAlarmSound] = useState(() => {
    return localStorage.getItem('POS_goalAlarmSound') !== 'false';
  });
  const [goalNotification, setGoalNotification] = useState(() => {
    return localStorage.getItem('POS_goalNotification') !== 'false';
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

  // AI Cashflow Monitor
  const [cashflowLoading, setCashflowLoading] = useState(false);
  const [cashflowAiText, setCashflowAiText] = useState("");
  const [hasFetchedCashflow, setHasFetchedCashflow] = useState(false);

  const fetchAiCashflowMonitor = async () => {
      setCashflowLoading(true);
      try {
          const saldoDanaLaci = wallets?.danaLaci || 0;
          const hSupplier = (hutangSupplier || []).filter((h: any) => h.sisa_hutang > 0);
          const tKasbon = expenses.filter((e: any) => e.isBon && e.status !== 'lunas');
          const kLain = (kewajibanLain || []).filter((k: any) => k.status === 'aktif');
          
          const prompt = `Lakukan analisis Cashflow berdasarkan data berikut:
          - Saldo Dana Laci (Real-time): Rp${saldoDanaLaci}
          - Total Hutang Supplier Aktif: Rp${hSupplier.reduce((sum: number, h: any) => sum + h.sisa_hutang, 0)} (${hSupplier.length} nota)
          - Rincian Hutang: ${JSON.stringify(hSupplier.map((h: any) => ({ supplier: h.supplier_name, sisa: h.sisa_hutang, jatuh_tempo: h.jatuh_tempo })))}
          - Total Kasbon Karyawan: Rp${tKasbon.reduce((sum: number, e: any) => sum + e.amount, 0)}
          - Kewajiban Lain (Aktif): Rp${kLain.reduce((sum: number, k: any) => sum + k.nilai, 0)}
          
          Tampilkan dalam 4 poin peluru (Markdown ringan diperbolehkan):
          1. Status kesehatan cashflow saat ini
          2. Prediksi kemampuan bayar hutang yang akan jatuh tempo
          3. Peringatan dini jika ada risiko kekurangan dana
          4. Rekomendasi tindakan konkret`;
          
          const response = await fetch('/api/gemini', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt })
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Gagal menghubungi AI");
          if (data.text) {
              setCashflowAiText(data.text);
          }
      } catch (err: any) {
          console.warn("Gagal analisa cashflow", err.message);
          setCashflowAiText("Terjadi kesalahan: " + (err.message || "Gagal memproses analisis cashflow."));
      } finally {
          setHasFetchedCashflow(true);
          setCashflowLoading(false);
      }
  };

  useEffect(() => {
     if (wallets?.danaLaci !== undefined && !hasFetchedCashflow) {
         fetchAiCashflowMonitor();
     }
  }, [wallets, hutangSupplier, expenses, kewajibanLain]);

  // Daily Sales Tip Logic
  const [dailyAiTip, setDailyAiTip] = useState("");
  const [dailyAiTipLoading, setDailyAiTipLoading] = useState(false);

  const fetchDailyTip = async (forceRefresh = false) => {
    const d = new Date(); const today = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
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
      if (!response.ok) throw new Error(data.error || "Gagal menghubungi AI");
      if (data.text) {
           setDailyAiTip(data.text);
           localStorage.setItem(cachedTipKey, data.text);
      }
    } catch (err: any) {
      console.warn("Failed to fetch daily AI tip", err.message);
      setDailyAiTip("Error: " + (err.message || "Gagal memuat tips harian."));
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
        if (!response.ok) throw new Error(data.error || "Gagal menghubungi AI");
        if (data.text) {
             setForecastAiText(data.text);
        }
    } catch (err: any) {
        console.warn("Failed to fetch AI forecast", err.message);
        setForecastAiText("Gagal memuat prediksi AI: " + (err.message || "sistem sibuk."));
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

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 800);
  };

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
    
    filteredTransactions.forEach((t: any) => {
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
  }, [filteredTransactions]);

  const revenueByCategory = useMemo(() => {
    const categoryTotals: Record<string, number> = {};

    filteredTransactions.forEach((t: any) => {
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
  }, [filteredTransactions]);

  const PIE_COLORS = ['#0052cc', '#00a651', '#f59e0b', '#dc2626', '#8b5cf6', '#0ea5e9', '#ec4899'];

  const rangeDailySalesData = useMemo(() => {
    const data = [];
    const start = new Date(parsedRange.start);
    const end = new Date(parsedRange.end);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let temp = new Date(start);
    if (diffDays <= 45) {
      while (temp <= end) {
        const dateStr = temp.toISOString().split('T')[0];
        const dayTxs = filteredTransactions.filter((t: any) => t.date.startsWith(dateStr));
        const totalSales = dayTxs.reduce((sum: number, t: any) => sum + t.total, 0);

        data.push({
          date: dateStr,
          sales: totalSales,
          label: temp.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
        });
        temp.setDate(temp.getDate() + 1);
      }
    } else {
      const step = Math.ceil(diffDays / 30);
      while (temp <= end) {
        const dateStr = temp.toISOString().split('T')[0];
        const dayTxs = filteredTransactions.filter((t: any) => t.date.startsWith(dateStr));
        const totalSales = dayTxs.reduce((sum: number, t: any) => sum + t.total, 0);

        data.push({
          date: dateStr,
          sales: totalSales,
          label: temp.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
        });
        temp.setDate(temp.getDate() + step);
      }
    }
    return data;
  }, [filteredTransactions, parsedRange]);

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

  const monthlyProjectionData = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    // Find oldest transaction month back to "omzet pertama" (excluding PEMBELIAN)
    let oldestYear = currentYear;
    let oldestMonth = currentMonth;
    let foundAny = false;
    
    transactions.forEach((t: any) => {
      if (t.type === 'PEMBELIAN') return;
      let tDate = new Date(t.date);
      if (t.isoDate) tDate = new Date(t.isoDate);
      
      const yr = tDate.getFullYear();
      const mo = tDate.getMonth();
      if (!foundAny) {
        oldestYear = yr;
        oldestMonth = mo;
        foundAny = true;
      } else {
        if (yr < oldestYear || (yr === oldestYear && mo < oldestMonth)) {
          oldestYear = yr;
          oldestMonth = mo;
        }
      }
    });

    // If no transactions, fallback to 11 months before today (so 12 months total)
    if (!foundAny) {
      const fallbackDate = new Date(currentYear, currentMonth - 11, 1);
      oldestYear = fallbackDate.getFullYear();
      oldestMonth = fallbackDate.getMonth();
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    const buckets: { year: number; month: number; label: string; sales: number; isFuture: boolean }[] = [];
    
    // 1. Add all months from oldest to current month
    let tempYr = oldestYear;
    let tempMo = oldestMonth;
    
    while (tempYr < currentYear || (tempYr === currentYear && tempMo <= currentMonth)) {
      buckets.push({
        year: tempYr,
        month: tempMo,
        label: `${monthNames[tempMo]} '${String(tempYr).slice(-2)}`,
        sales: 0,
        isFuture: false
      });
      tempMo++;
      if (tempMo > 11) {
        tempMo = 0;
        tempYr++;
      }
    }

    // 2. Populate actual sales for past and current months
    transactions.forEach((t: any) => {
      if (t.type === 'PEMBELIAN') return;
      
      let tDate = new Date(t.date);
      if (t.isoDate) tDate = new Date(t.isoDate);
      
      const tYear = tDate.getFullYear();
      const tMonth = tDate.getMonth();
      
      const bucket = buckets.find(b => b.year === tYear && b.month === tMonth && !b.isFuture);
      if (bucket) {
        bucket.sales += t.total;
      }
    });

    // 3. Calculate historical average (excluding the current month to prevent low starter numbers)
    const historicalBuckets = buckets.filter(b => !(b.year === currentYear && b.month === currentMonth));
    const nonZeroMonths = historicalBuckets.filter(b => b.sales > 0).length;
    const totalHistoricalSales = historicalBuckets.reduce((sum, b) => sum + b.sales, 0);
    const avgHistorical = nonZeroMonths > 0 
      ? totalHistoricalSales / nonZeroMonths 
      : (totalHistoricalSales / Math.max(1, historicalBuckets.length) || 1500000);

    // 4. Append 12 future months for the "proyeksikan selama setahun" requirement
    let futYr = currentYear;
    let futMo = currentMonth + 1;
    if (futMo > 11) {
      futMo = 0;
      futYr++;
    }

    for (let f = 0; f < 12; f++) {
      buckets.push({
        year: futYr,
        month: futMo,
        label: `${monthNames[futMo]} '${String(futYr).slice(-2)}`,
        sales: 0,
        isFuture: true
      });
      futMo++;
      if (futMo > 11) {
        futMo = 0;
        futYr++;
      }
    }

    // 5. Map buckets to chart format (showing real sales only for past, projection for current + future)
    return buckets.map((b) => {
      if (b.year === currentYear && b.month === currentMonth && !b.isFuture) {
        const currentSales = b.sales;
        const projectedFormula = currentSales > 0 
          ? Math.max(currentSales, Math.round(currentSales * (30 / Math.max(1, currentDay))))
          : Math.round(avgHistorical);
        
        return {
          label: `${b.label} (Proy)`,
          sales: currentSales,
          projected: projectedFormula
        };
      } else if (b.isFuture) {
        return {
          label: `${b.label} (Proy)`,
          sales: 0,
          projected: Math.round(avgHistorical)
        };
      } else {
        return {
          label: b.label,
          sales: b.sales,
          projected: 0
        };
      }
    });
  }, [transactions]);

  useEffect(() => {
    if (monthlyChartScrollRef.current) {
      const timer = setTimeout(() => {
        if (monthlyChartScrollRef.current) {
          monthlyChartScrollRef.current.scrollLeft = monthlyChartScrollRef.current.scrollWidth;
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [monthlyProjectionData]);

  const dailyGoalProgress = Math.min(100, Math.round((cashFlowToday.income / dailyGoal) * 100));
  const dailyGoalRadius = 40;
  const dailyGoalCircumference = 2 * Math.PI * dailyGoalRadius;
  const dailyGoalOffset = dailyGoalCircumference - (dailyGoalProgress / 100) * dailyGoalCircumference;

  const weeklyGoalProgress = Math.min(100, Math.round((total7Days / weeklyGoal) * 100));
  const weeklyGoalRadius = 40;
  const weeklyGoalCircumference = 2 * Math.PI * weeklyGoalRadius;
  const weeklyGoalOffset = weeklyGoalCircumference - (weeklyGoalProgress / 100) * weeklyGoalCircumference;

  const [hasCelebrated, setHasCelebrated] = useState(() => {
    const d = new Date(); return localStorage.getItem('POS_celebratedDate') === `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
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
      const d = new Date(); localStorage.setItem('POS_celebratedDate', `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
      setShowGoalToast(true);
      setTimeout(() => setShowGoalToast(false), 5000);

      if (goalAlarmSound) playGoalReachedSound();
      if (goalNotification && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('Target Harian Tembus! 🎉', {
            body: `Selamat! Omzet hari ini (${formatRp(cashFlowToday.income)}) telah melampaui target harian Rp ${formatRp(dailyGoal)}!`
          });
        } catch (e) { console.warn(e); }
      }
    }
  }, [dailyGoalProgress, cashFlowToday.income, hasCelebrated, goalAlarmSound, goalNotification, dailyGoal]);

  useEffect(() => {
     if (false) { // Duplicate disabled; consolidated above
         confetti({
             particleCount: 150,
             spread: 70,
             origin: { y: 0.6 },
             colors: ['#00a651', '#f59e0b', '#3b82f6', '#ec4899']
         });
         setHasCelebrated(true);
         const d = new Date(); localStorage.setItem('POS_celebratedDate', `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
         setShowGoalToast(true);
         setTimeout(() => setShowGoalToast(false), 5000);
     }
  }, [dailyGoalProgress, cashFlowToday.income, hasCelebrated]);

  // Formula Inti Dana Bebas
  const saldoDanaLaci = wallets?.danaLaci || 0;
  const saldoDanaBebasKeseluruhan = wallets?.danaBebas || 0;
  const totalHutangSupplierAktif = (hutangSupplier || []).filter((h: any) => h.sisa_hutang > 0).reduce((sum: number, h: any) => sum + h.sisa_hutang, 0);
  const totalKasbonAktif = expenses.filter((e: any) => e.isBon && e.status !== 'lunas').reduce((sum: number, e: any) => sum + e.amount, 0);
  const totalKewajibanLain = (kewajibanLain || []).filter((k: any) => k.status === 'aktif').reduce((sum: number, k: any) => sum + k.nilai, 0);
  
  const danaBebasReal = saldoDanaBebasKeseluruhan - totalHutangSupplierAktif - totalKasbonAktif - totalKewajibanLain;

  const danaBebasStatus = danaBebasReal > (0.5 * saldoDanaBebasKeseluruhan) ? 'Aman' : (danaBebasReal >= (0.2 * saldoDanaBebasKeseluruhan) ? 'Waspada' : 'Bahaya');

  // AI Early Warning Logic
  const todayDate = new Date();
  todayDate.setHours(0,0,0,0);
  const hutangMendesak = (hutangSupplier || []).filter((h: any) => {
      if (h.sisa_hutang <= 0) return false;
      const jtDate = new Date(h.jatuh_tempo);
      const diffTime = jtDate.getTime() - todayDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 14;
  });
  const totalHutangMendesak = hutangMendesak.reduce((sum, h) => sum + h.sisa_hutang, 0);
  const isKrisisDana = danaBebasReal < totalHutangMendesak;

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden relative">
      <LegacyWindowHeader title="DASHBOARD & STATISTIK" currentTime={currentTime} />
      
      {isKrisisDana && (
         <div className="bg-red-600 text-white p-3 shadow-md flex flex-col gap-1 z-40 border-b-4 border-red-800">
            <div className="flex items-center gap-2 font-bold text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle animate-pulse"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                PERINGATAN DINI KEUANGAN (AI WARNING)
            </div>
            <p className="text-sm">
                Dana Bebas Anda saat ini (<strong className="text-xl px-1">{formatRp(danaBebasReal)}</strong>) tidak cukup untuk menutupi Hutang yang akan jatuh tempo dalam 14 hari ke depan (<strong className="text-xl px-1">{formatRp(totalHutangMendesak)}</strong>).
            </p>
            <p className="text-xs italic opacity-90 mt-1">Kekurangan Dana: {formatRp(Math.abs(danaBebasReal - totalHutangMendesak))}</p>
         </div>
      )}
      
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

      <div className="bg-[#d4d0c8] px-2 py-1 flex justify-end gap-2 shadow-sm border-b border-gray-400">
         <button 
           onClick={handleRefresh}
           disabled={isRefreshing}
           className="text-[10px] px-2 py-1 font-bold border rounded-sm transition-colors flex items-center gap-1 bg-white hover:bg-gray-100 text-blue-900 border-gray-400 disabled:opacity-50"
         >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
         </button>
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
        
        {/* FITUR 1 & FITUR 3: WIDGET DANA BEBAS & JADWAL JATUH TEMPO */}
        {compactMode ? (
          <>
            {/* Mode Compact ON: Hanya terlihat Dana Bebas Tersedia, dklik navigasi ke Cashflow & Keuangan */}
            <div 
              onClick={() => setActiveTab('cashflow')}
              title="Sisa Dana Bebas Tersedia. Klik untuk masuk ke menu Cashflow & Keuangan"
              className="bg-white border-4 border-blue-950 p-4 shadow-md rounded-sm cursor-pointer hover:bg-blue-50 hover:scale-[1.005] active:scale-95 transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet"><path d="M21 12V7H5a2 2 0 0 1-2-2V5M3 10V5v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2z"/></svg>
              </div>
              <div className="flex flex-col gap-1 relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping"></span>
                  <span className="text-[11px] font-black tracking-widest text-[#1e2b6b] uppercase">DANA BEBAS TERSEDIA</span>
                </div>
                <span className={`text-3xl font-black ${danaBebasReal < 0 ? 'text-red-700' : 'text-blue-900'} tracking-tight`}>
                  {formatRp(danaBebasReal)}
                </span>
                <span className="text-[10px] text-gray-500 font-bold group-hover:text-blue-800 transition-colors uppercase">
                  Klik untuk Kelola Cashflow & Keuangan &rarr;
                </span>
              </div>
              <div className="relative z-10 shrink-0 self-end sm:self-center">
                <div className={`text-[10px] font-black px-3 py-1 bg-white border-2 rounded-full uppercase tracking-wider
                     ${danaBebasStatus === 'Aman' ? 'text-green-700 border-green-600' : (danaBebasStatus === 'Waspada' ? 'text-yellow-700 border-yellow-600' : 'text-red-700 border-red-600')}
                `}>
                    Status: {danaBebasStatus}
                </div>
              </div>
            </div>

            {/* FITUR 3: WIDGET JATUH TEMPO (Jika ada) - horizontal scroll di Mode Compact */}
            {(hutangSupplier || []).filter((h: any) => h.sisa_hutang > 0).length > 0 && (
                <div className="bg-white border text-black border-gray-400 p-4 shadow-sm flex flex-col">
                    <h3 className="font-bold text-lg text-red-800 mb-3 border-b pb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-clock"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.25V14"/><circle cx="16" cy="16" r="6"/></svg>
                        Jadwal Jatuh Tempo Supplier
                    </h3>
                    <div className="flex overflow-x-auto gap-3 pb-2 snap-x">
                        {hutangSupplier.filter((h: any) => h.sisa_hutang > 0).sort((a: any, b: any) => new Date(a.jatuh_tempo).getTime() - new Date(b.jatuh_tempo).getTime()).map((h: any) => {
                            const jtDate = new Date(h.jatuh_tempo);
                            const diffTime = jtDate.getTime() - todayDate.getTime();
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            
                            let statusColor = '';
                            let bgColor = '';
                            if (diffDays < 0) { statusColor = 'text-red-800'; bgColor = 'bg-red-100 border-red-400'; }
                            else if (diffDays <= 7) { statusColor = 'text-orange-800'; bgColor = 'bg-orange-100 border-orange-400'; }
                            else if (diffDays <= 14) { statusColor = 'text-yellow-800'; bgColor = 'bg-yellow-100 border-yellow-400'; }
                            else { statusColor = 'text-green-800'; bgColor = 'bg-green-100 border-green-400'; }

                            return (
                                <div key={h.id} className={`border p-3 flex flex-col gap-1 cursor-pointer transition-transform hover:-translate-y-1 ${bgColor} shrink-0 w-[280px] snap-start`}>
                                    <div className="text-xs font-bold text-gray-500">{h.jatuh_tempo.split('T')[0]} ({diffDays < 0 ? `Terlambat ${Math.abs(diffDays)} hari` : `${diffDays} hari lagi`})</div>
                                    <div className="font-bold text-sm truncate uppercase">{h.supplier_name}</div>
                                    <div className="text-xs text-gray-600 bg-white border border-gray-300 px-1 font-mono">{h.id}</div>
                                    <div className={`text-lg font-black mt-2 ${statusColor}`}>{formatRp(h.sisa_hutang)}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
          </>
        ) : (
          /* Mode Compact OFF (Full View): Dana Bebas & Jatuh Tempo Supplier side-by-side */
          <div className="flex flex-col lg:flex-row gap-4 w-full">
              {/* Left Widget: Indikator Kesehatan Keuangan (Dana Bebas) */}
              <div className="bg-white border-4 border-blue-900 shadow-lg p-5 relative w-full lg:w-1/2 flex flex-col">
                  <div className="absolute top-0 right-0 p-3 opacity-5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                  </div>
                  <h2 className="text-sm font-black text-[#1e2b6b] uppercase tracking-wide border-b-2 border-gray-200 pb-1.5 mb-3">Indikator Kesehatan Keuangan (Dana Bebas)</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 flex-1">
                      {/* Dana Bebas Tersedia pindah ke kiri (rata kiri) */}
                      <div className="flex flex-col gap-1 items-start text-left justify-center bg-blue-50 border border-blue-200 p-3.5 rounded-lg shadow-inner">
                          <span className="text-xs font-black text-blue-900 uppercase tracking-wider">Dana Bebas Tersedia</span>
                          <span className={`text-2xl font-black ${danaBebasReal < 0 ? 'text-red-700' : 'text-blue-900'}`}>{formatRp(danaBebasReal)}</span>
                          <div className={`mt-2 text-[10px] font-bold px-2 py-0.5 bg-white border-2 inline-block rounded-full uppercase
                               ${danaBebasStatus === 'Aman' ? 'text-green-700 border-green-600' : (danaBebasStatus === 'Waspada' ? 'text-yellow-700 border-yellow-600' : 'text-red-700 border-red-600')}
                          `}>
                              Status: {danaBebasStatus}
                          </div>
                      </div>

                      {/* Lainnya di sebelah kanan */}
                      <div className="flex flex-col gap-2.5 justify-center border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
                          <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Dana Laci</span>
                              <span className="text-base font-black text-gray-900">{formatRp(saldoDanaLaci)}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold text-red-600 uppercase flex items-center gap-1">
                                 (-) Hutang Aktif
                              </span>
                              <span className="text-base font-black text-red-700">{formatRp(totalHutangSupplierAktif)}</span>
                          </div>
                          <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold text-orange-600 uppercase flex items-center gap-1">
                                 (-) Kasbon Karyawan
                              </span>
                              <span className="text-base font-black text-[#b45309]">{formatRp(totalKasbonAktif)}</span>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right Widget: Jadwal Jatuh Tempo Supplier - Setengah Layout, Vertically Scrollable list */}
              {(hutangSupplier || []).filter((h: any) => h.sisa_hutang > 0).length > 0 ? (
                  <div className="bg-white border text-black border-4 border-slate-600 p-5 shadow-lg w-full lg:w-1/2 flex flex-col">
                      <h3 className="font-bold text-sm text-[#1e2b6b] uppercase tracking-wide border-b-2 border-gray-200 pb-1.5 mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-clock"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.25V14"/><circle cx="16" cy="16" r="6"/></svg>
                          Jadwal Jatuh Tempo Supplier
                      </h3>
                      <div className="flex-1 overflow-y-auto max-h-[160px] pr-1 flex flex-col gap-2">
                          {hutangSupplier.filter((h: any) => h.sisa_hutang > 0).sort((a: any, b: any) => new Date(a.jatuh_tempo).getTime() - new Date(b.jatuh_tempo).getTime()).map((h: any) => {
                              const jtDate = new Date(h.jatuh_tempo);
                              const diffTime = jtDate.getTime() - todayDate.getTime();
                              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                              
                              let statusColor = '';
                              let bgColor = '';
                              if (diffDays < 0) { statusColor = 'text-red-800 font-extrabold'; bgColor = 'bg-red-50 border-red-300'; }
                              else if (diffDays <= 7) { statusColor = 'text-orange-800 font-bold'; bgColor = 'bg-orange-50 border-orange-300'; }
                              else if (diffDays <= 14) { statusColor = 'text-yellow-800 font-bold'; bgColor = 'bg-yellow-50 border-yellow-300'; }
                              else { statusColor = 'text-green-800 font-bold'; bgColor = 'bg-green-50 border-green-300'; }

                              return (
                                  <div key={h.id} className={`border p-2 flex items-center justify-between gap-3 rounded-sm transition-all hover:translate-x-1 ${bgColor}`}>
                                      <div className="flex flex-col gap-0.5 min-w-0">
                                          <div className="font-extrabold text-xs truncate uppercase text-slate-900">{h.supplier_name}</div>
                                          <div className="text-[10px] text-gray-500 font-mono truncate">{h.id}</div>
                                          <div className="text-[10px] font-bold text-gray-600 font-sans">{h.jatuh_tempo.split('T')[0]} ({diffDays < 0 ? `Terlambat ${Math.abs(diffDays)} hari` : `${diffDays} hari lagi`})</div>
                                      </div>
                                      <div className={`text-sm font-black whitespace-nowrap text-right ${statusColor}`}>{formatRp(h.sisa_hutang)}</div>
                                  </div>
                              );
                          })}
                      </div>
                  </div>
              ) : (
                  <div className="bg-white border text-gray-500 border-4 border-slate-600 p-5 shadow-lg w-full lg:w-1/2 flex items-center justify-center text-xs italic font-bold">
                      Tidak ada hutang jatuh tempo supplier yang aktif.
                  </div>
              )}
          </div>
        )}



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

            {/* WIDGET: TARGET HARIAN INTERAKTIF & ALARM */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-white border border-gray-400 p-4 shadow-sm flex flex-col relative overflow-hidden justify-between h-full min-h-[140px]">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Target className="w-12 h-12" />
                </div>
                
                {/* Header Controls */}
                <div className="flex justify-between items-start mb-1 z-10">
                  <span className="text-gray-500 font-bold flex items-center gap-1">Target Harian</span>
                  <div className="flex items-center gap-1">
                      {/* Alarm Sound Toggle */}
                      <button 
                        onClick={() => {
                          const newVal = !goalAlarmSound;
                          setGoalAlarmSound(newVal);
                          localStorage.setItem('POS_goalAlarmSound', String(newVal));
                        }}
                        className={`flex items-center justify-center p-1 rounded border transition-colors ${goalAlarmSound ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'}`}
                        title={goalAlarmSound ? "Alarm Suara: Aktif" : "Alarm Suara: Nonaktif"}
                      >
                        {goalAlarmSound ? <Volume2 size={12} className="animate-pulse" /> : <VolumeX size={12} />}
                      </button>

                      {/* Web Notifications Toggle */}
                      <button 
                        onClick={async () => {
                          if (!goalNotification) {
                            if ('Notification' in window && Notification.permission !== 'granted') {
                              const p = await Notification.requestPermission();
                              if (p !== 'granted') return;
                            }
                          }
                          const newVal = !goalNotification;
                          setGoalNotification(newVal);
                          localStorage.setItem('POS_goalNotification', String(newVal));
                        }}
                        className={`flex items-center justify-center p-1 rounded border transition-colors ${goalNotification ? 'bg-orange-100 text-orange-850 border-orange-300 hover:bg-orange-200' : 'bg-gray-100 text-gray-400 border-gray-300 hover:bg-gray-200'}`}
                        title={goalNotification ? "Notifikasi Browser: Aktif" : "Notifikasi Browser: Nonaktif"}
                      >
                        {goalNotification ? <Bell size={12} className="animate-bounce" /> : <BellOff size={12} />}
                      </button>
                  </div>
                </div>

                {/* Progress Value & Graphic */}
                <div className="flex flex-col my-1 z-10">
                  <div className="flex items-baseline gap-2">
                    <motion.span 
                      key={dailyGoalProgress}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`text-2xl font-black ${dailyGoalProgress >= 100 ? 'text-green-600' : 'text-blue-700'}`}
                    >
                      {dailyGoalProgress}%
                    </motion.span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400">
                      {dailyGoalProgress >= 100 ? 'Tembus! 🎉' : 'Menuju Target'}
                    </span>
                  </div>

                  {/* Retro Win95 Style Block Progress Bar */}
                  <div className="w-full bg-[#d4d0c8] border border-gray-400 h-4 p-[2px] mt-1 flex gap-[2px] overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => {
                      const fillPercent = (i + 1) * (100 / 15);
                      const isFilled = dailyGoalProgress >= fillPercent;
                      return (
                        <div 
                          key={i} 
                          className={`flex-1 h-full transition-all duration-300 ${isFilled ? (dailyGoalProgress >= 100 ? 'bg-green-600' : 'bg-blue-800') : 'bg-transparent'}`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Footer details & direct adjust input */}
                <div className="mt-auto pt-1 z-10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span className="font-medium truncate">Omzet: <strong className="text-gray-800 font-bold">{formatRp(cashFlowToday.income)}</strong></span>
                  </div>
                  
                  {/* Inline editable Target Input */}
                  <div className="flex items-center gap-1 border-t border-dotted border-gray-300 pt-1.5">
                    <span className="text-gray-500 text-[10px] whitespace-nowrap">Target:</span>
                    <div className="flex items-center border border-gray-400 bg-white px-1 py-0.5 w-full">
                      <span className="text-gray-400 text-[9px] mr-1">Rp</span>
                      <input 
                        type="number"
                        value={dailyGoal}
                        onChange={(e) => {
                          const val = Math.max(1000, parseInt(e.target.value) || 0);
                          setDailyGoal(val);
                          localStorage.setItem('POS_dailyGoal', String(val));
                        }}
                        className="bg-transparent text-[10px] font-bold text-gray-800 focus:outline-none text-right w-full font-mono"
                        title="Klik untuk mengubah nominal target"
                      />
                    </div>
                  </div>
                </div>
            </motion.div>
        </div>





        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-[300px] transition-all duration-300 ${isRefreshing ? 'opacity-30 blur-[2px] pointer-events-none' : 'opacity-100'}`}>
            {/* WIDGET: PENDAPATAN HARI INI & MINGGUAN (GABUNGAN) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col">
                <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between items-center shadow-sm">
                   <span>TARGET PENDAPATAN</span>
                   <button onClick={() => setShowGoalModal(true)} title="Atur Target" className="hover:bg-blue-800 p-0.5 rounded transition-colors text-white/80 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                   </button>
                </div>
                <div className="flex-1 p-2 bg-white m-1 border border-gray-300 flex flex-row items-center justify-around overflow-hidden text-center gap-2">
                    {/* Harian */}
                    <div className="flex flex-col items-center justify-center flex-1 w-1/2">
                        <span className="text-[10px] text-gray-500 font-bold mb-1">HARI INI</span>
                        <motion.div 
                            className="relative w-20 h-20 flex items-center justify-center"
                            animate={
                                dailyGoalProgress >= 100 ? { scale: [1, 1.1, 1] } :
                                dailyGoalProgress >= 50 ? { scale: [1, 1.05, 1] } : 
                                { scale: 1 }
                            }
                            transition={{ duration: 1.5, repeat: dailyGoalProgress >= 50 ? Infinity : 0, ease: "easeInOut" }}
                        >
                            <svg className="transform -rotate-90 w-20 h-20 absolute inset-0">
                               <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                               <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="transparent"
                                 strokeDasharray={201}
                                 strokeDashoffset={201 - (201 * dailyGoalProgress / 100)}
                                 strokeLinecap="round"
                                 className={`transition-all duration-1000 ease-out ${dailyGoalProgress >= 100 ? 'text-green-500' : 'text-blue-600'}`}
                               />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-[13px] font-black text-gray-800 tracking-tighter">{dailyGoalProgress}%</span>
                            </div>
                        </motion.div>
                        <div className="mt-2 flex flex-col items-center">
                            <span className={`text-[12px] font-bold ${dailyGoalProgress >= 100 ? 'text-green-700' : 'text-blue-900'}`}>{formatRp(cashFlowToday.income)}</span>
                            <span className="text-[9px] text-gray-500 mt-0.5">Target: {formatRp(dailyGoal)}</span>
                            {dailyGoalNote && (
                                <span className="mt-1 text-[9px] italic text-gray-600 bg-gray-50 px-1 py-0.5 rounded w-full max-w-[120px] truncate border border-gray-200">
                                    {dailyGoalNote}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-px bg-gray-200 h-[80%]"></div>

                    {/* Mingguan */}
                    <div className="flex flex-col items-center justify-center flex-1 w-1/2">
                        <span className="text-[10px] text-gray-500 font-bold mb-1">MINGGUAN</span>
                        <motion.div 
                            className="relative w-20 h-20 flex items-center justify-center"
                            animate={
                                weeklyGoalProgress >= 100 ? { scale: [1, 1.1, 1] } :
                                weeklyGoalProgress >= 50 ? { scale: [1, 1.05, 1] } : 
                                { scale: 1 }
                            }
                            transition={{ duration: 1.5, repeat: weeklyGoalProgress >= 50 ? Infinity : 0, ease: "easeInOut" }}
                        >
                            <svg className="transform -rotate-90 w-20 h-20 absolute inset-0">
                               <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
                               <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="transparent"
                                 strokeDasharray={201}
                                 strokeDashoffset={201 - (201 * weeklyGoalProgress / 100)}
                                 strokeLinecap="round"
                                 className={`transition-all duration-1000 ease-out ${weeklyGoalProgress >= 100 ? 'text-green-500' : 'text-blue-600'}`}
                               />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-[13px] font-black text-gray-800 tracking-tighter">{weeklyGoalProgress}%</span>
                            </div>
                        </motion.div>
                        <div className="mt-2 flex flex-col items-center">
                            <span className={`text-[12px] font-bold ${weeklyGoalProgress >= 100 ? 'text-green-700' : 'text-blue-900'}`}>{formatRp(total7Days)}</span>
                            <span className="text-[9px] text-gray-500 mt-0.5">Target: {formatRp(weeklyGoal)}</span>
                            {weeklyGoalNote && (
                                <span className="mt-1 text-[9px] italic text-gray-600 bg-gray-50 px-1 py-0.5 rounded w-full max-w-[120px] truncate border border-gray-200">
                                    {weeklyGoalNote}
                                </span>
                            )}
                        </div>
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
                     <ResponsiveContainer width="100%" height={255}>
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
                         <ResponsiveContainer width="100%" height={255}>
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
                        <ResponsiveContainer width="100%" height={255}>
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
                    <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between shadow-sm uppercase tracking-wide text-xs">
                       PENDAPATAN HARIAN ({timeframe === 'WEEK' ? 'MINGGU INI' : timeframe === 'MONTH' ? 'BULAN INI' : timeframe === '3MONTHS' ? '3 BULAN TERAKHIR' : 'PERIODE KUSTOM'})
                    </div>
                    <div className="flex-1 p-4 bg-white m-1 border border-gray-300 min-h-[250px]">
                        <ResponsiveContainer width="100%" height={255}>
                            <LineChart data={rangeDailySalesData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
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

            {/* CHART 6: MONTHLY PROJECTION */}
            {!compactMode && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.85 }}
                    className="bg-[#ece9d8] border border-gray-400 shadow-sm flex flex-col lg:col-span-3 w-full">
                    <div className="bg-blue-900 text-white font-bold px-3 py-1.5 text-sm flex justify-between shadow-sm">
                       <span>PROYEKSI BULANAN</span>
                       <span className="text-[10px] bg-blue-800 text-blue-100 px-2 py-0.5 rounded font-mono">Geser Horizontal &larr; &rarr;</span>
                    </div>
                    <div 
                        ref={monthlyChartScrollRef}
                        className="flex-1 p-4 bg-white m-1 border border-gray-300 min-h-[250px] overflow-x-auto scrollbar-thin select-none"
                    >
                        <div style={{ width: `${Math.max(1000, monthlyProjectionData.length * 75)}px`, height: '255px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyProjectionData} margin={{ top: 15, right: 10, bottom: 5, left: 10 }}>
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
                    </div>
                </motion.div>
            )}
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
