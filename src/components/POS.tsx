import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Sparkles, Loader2, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { defaultDate } from '../data';
import { formatRp, formatDateDisplay } from '../utils';
import { LegacyWindowHeader } from './LegacyWindowHeader';

export const POS = ({ currentTime }: { currentTime: Date }) => {
  const { 
    user, setUser, setActiveTab,
    appUsers,
    inventory, setInventory, 
    transactions, setTransactions,
    piutangData, setPiutangData,
    expenses, setExpenses,
    orderData, setOrderData,
    customers, suppliers,
    cart, setCart,
    amountPaid, setAmountPaid,
    activeReturTrx, setActiveReturTrx,
    selectedCustomerId, setSelectedCustomerId,
    transactionDate, setTransactionDate,
    paymentMethod, setPaymentMethod,
    pendingTransactions, setPendingTransactions,
    setShowPendingModal, setShowPiutangModal, setShowPrintOptionsModal,
    setShowExpenseModal, setShowAddCustomerModal,
    setMasterDataTab, setPendingUser, setShowAuthModal, storeSettings,
    appLogs, addLog, employees,
    isInputStockMode, setIsInputStockMode
  } = useAppContext();

  const selectedCustomer = customers.find((c: any) => String(c.id) === String(selectedCustomerId));
  
  const [codeInput, setCodeInput] = useState('');
  const [qtyInput, setQtyInput] = useState('1');
  const [suggestions, setSuggestions] = useState<any[]>([]); 
  const [stagedItem, setStagedItem] = useState<any>(null); 
  const [transactionNote, setTransactionNote] = useState('');
  const [showInputMenu, setShowInputMenu] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [searchNotaRetur, setSearchNotaRetur] = useState('');
  const [showBonModal, setShowBonModal] = useState(false);
  const [bonEmployee, setBonEmployee] = useState('');
  const [bonBranch, setBonBranch] = useState(storeSettings.activeBranch || 'Pusat');
  const [bonAmount, setBonAmount] = useState('');
  const [bonReason, setBonReason] = useState('');

  const [isBarcodeMode, setIsBarcodeMode] = useState(true);
  const [confirmAction, setConfirmAction] = useState<{message: string, isAlert?: boolean, onConfirm?: () => void} | null>(null);
  const [printActionModal, setPrintActionModal] = useState(false);
  const [waNumber, setWaNumber] = useState('');
  const [isPromoActive, setIsPromoActive] = useState(false);
  const [stockSupplierId, setStockSupplierId] = useState('');
  const [stockDiscount, setStockDiscount] = useState(0);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<string>('Rp');
  const [newStock, setNewStock] = useState({code: '', name: '', category: 'UMUM', supplierPrice: 0, price1: 0, price2: 0, stock: 1});
  const [stockSuggestions, setStockSuggestions] = useState<any[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);

  const codeInputRef = useRef<HTMLInputElement>(null);
  const qtyInputRef = useRef<HTMLInputElement>(null);

  // --- AUTO ORDER LOGIC (AI TRIGGER) ---
  const triggerAutoOrder = (currentInv: any[]) => {
    setOrderData((prevOrders: any[]) => {
        let newOrders = [...prevOrders];
        let added = false;
        currentInv.forEach(inv => {
            if (inv.stock <= 2) {
                const existingIdx = newOrders.findIndex(o => o.item === inv.name && o.status === 'Pending');
                if (existingIdx === -1) {
                    newOrders.unshift({
                        id: 'ORD-AUTO-' + Math.floor(Math.random() * 10000),
                        date: defaultDate,
                        supplier: 'Auto Supplier (AI)',
                        item: inv.name,
                        sisaStock: inv.stock, 
                        targetOrder: 20, 
                        status: 'Pending'
                    });
                    added = true;
                } else if (newOrders[existingIdx].sisaStock !== inv.stock) {
                    newOrders[existingIdx].sisaStock = inv.stock;
                    added = true;
                }
            } else {
                const existingIdx = newOrders.findIndex(o => o.item === inv.name && o.status === 'Pending');
                if (existingIdx !== -1) {
                    newOrders.splice(existingIdx, 1);
                    added = true;
                }
            }
        });
        return added ? newOrders : prevOrders;
    });
  };

  const addToCart = (item: any, qtyToAdd = 1) => {
    if (!isInputStockMode && !selectedCustomer) return setConfirmAction({message: 'Silakan pilih Pelanggan terlebih dahulu!', isAlert: true});
    if (isInputStockMode && !stockSupplierId) return setConfirmAction({message: 'Silakan pilih Supliyer terlebih dahulu!', isAlert: true});
    if (!item) return;
    if (!isInputStockMode && item.stock < qtyToAdd) return setConfirmAction({message: 'Stok barang tidak mencukupi!', isAlert: true});

    const itemPrice = isInputStockMode ? (item.supplierPrice || 0) : (selectedCustomer?.level === 2 ? item.price2 : item.price1);
    const existing = cart.find(c => c.id === item.id && !c.isReturn);
    
    if (existing) {
      if (!isInputStockMode && existing.qty + qtyToAdd > item.stock) return setConfirmAction({message: 'Melebihi stok yang tersedia!', isAlert: true});
      setCart(cart.map(c => c.id === item.id && !c.isReturn ? { ...c, qty: c.qty + qtyToAdd } : c));
    } else {
      setCart([...cart, { ...item, qty: qtyToAdd, price: itemPrice, isReturn: false, cartUniqueId: 'ITEM-' + Date.now() + Math.random() }]);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCodeInput(val);
    if (val.trim().length > 0) {
      const res = inventory.filter((i: any) => i.code.toLowerCase().includes(val.toLowerCase()) || i.name.toLowerCase().includes(val.toLowerCase()));
      setSuggestions(res);
    } else setSuggestions([]);
  };

  const handleSelectSuggestion = (item: any) => {
    if (!isInputStockMode && !selectedCustomer) { setConfirmAction({message: 'Silakan pilih Pelanggan terlebih dahulu!', isAlert: true}); setSuggestions([]); return; }
    if (isInputStockMode && !stockSupplierId) { setConfirmAction({message: 'Silakan pilih Supliyer terlebih dahulu!', isAlert: true}); setSuggestions([]); return; }
    
    setStagedItem(item);
    setCodeInput(item.code);
    setQtyInput('1');
    setSuggestions([]);
    setTimeout(() => qtyInputRef.current?.focus(), 50);
  };

  const handleCodeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && codeInput) {
      if (!isInputStockMode && !selectedCustomer) return setConfirmAction({message: 'Silakan pilih Pelanggan terlebih dahulu!', isAlert: true});
      if (isInputStockMode && !stockSupplierId) return setConfirmAction({message: 'Silakan pilih Supliyer terlebih dahulu!', isAlert: true});
      
      const found = inventory.find((i: any) => i.code.toLowerCase() === codeInput.toLowerCase());
      if (found) {
        if (isBarcodeMode) {
            addToCart(found, 1);
            setCodeInput('');
            setSuggestions([]);
        } else {
            setStagedItem(found);
            setCodeInput(found.code);
            setQtyInput('1');
            setSuggestions([]);
            setTimeout(() => qtyInputRef.current?.focus(), 50);
        }
      } else {
         setConfirmAction({message: 'Barang tidak ditemukan!', isAlert: true});
      }
    }
  };

  const handleQtySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (stagedItem) {
        addToCart(stagedItem, parseInt(qtyInput) || 1);
        setStagedItem(null);
        setCodeInput('');
        setQtyInput('1');
        setTimeout(() => codeInputRef.current?.focus(), 50);
      } else {
        setTimeout(() => codeInputRef.current?.focus(), 50);
      }
    }
  };

  const removeFromCart = (cartItem: any) => {
    setCart(cart.filter(c => c.cartUniqueId !== cartItem.cartUniqueId));
  };
  
  const totalBelanjaBaru = cart.filter(c => !c.isReturn).reduce((total, item) => total + (item.price * item.qty), 0);
  const totalNilaiRetur = cart.filter(c => c.isReturn).reduce((total, item) => total + (item.price * item.qty), 0);
  
  const calculatedDiscount = discountType === '%' ? Math.round((totalBelanjaBaru - totalNilaiRetur) * (globalDiscount / 100)) : globalDiscount;
  const totalBelanja = (totalBelanjaBaru - totalNilaiRetur) - calculatedDiscount;
  const kembalian = amountPaid ? parseInt(amountPaid) - totalBelanja : (totalBelanja < 0 ? Math.abs(totalBelanja) : 0);

  const handlePromoToggle = () => {
      if (isPromoActive) {
          setIsPromoActive(false);
          setGlobalDiscount(0);
          return;
      }

      if (!selectedCustomer) {
          setConfirmAction({message: 'Pilih pelanggan terlebih dahulu untuk mengecek promo!', isAlert: true});
          return;
      }

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyTotal = transactions.filter((t: any) => {
          if (t.customer !== selectedCustomer.name) return false;
          if (t.id.includes('PLN') || t.method === 'RETUR') return false; 
          const tDate = new Date(t.isoDate || t.date);
          return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      }).reduce((sum: number, t: any) => sum + (t.total || 0), 0);

      const totalBelanjaBaru = cart.filter((c: any) => !c.isReturn).reduce((total, item) => total + (item.price * item.qty), 0);
      const totalNilaiRetur = cart.filter((c: any) => c.isReturn).reduce((total, item) => total + (item.price * item.qty), 0);
      const currentCartTotal = totalBelanjaBaru - totalNilaiRetur;
      const combinedTotal = monthlyTotal + currentCartTotal;
      
      if (combinedTotal >= 5000000) {
          setConfirmAction({
              message: `Pelanggan mencapai pembelian Rp ${combinedTotal.toLocaleString('id-ID')} bulan ini! Cashback promo Rp 250.000 otomatis diaktifkan. (Wajib dibelanjakan barang!)`,
              isAlert: true
          });
          setIsPromoActive(true);
          setDiscountType('Rp');
          setGlobalDiscount(250000);
      } else {
          setConfirmAction({
              message: `Total belanja pelanggan ini baru mencapai Rp ${combinedTotal.toLocaleString('id-ID')} bulan ini (Syarat Rp 5.000.000). Promo belum aktif.`,
              isAlert: true
          });
      }
  };

  const handleAddBon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bonEmployee || !bonAmount || !bonReason || !bonBranch) return setConfirmAction({message: 'Semua isian Bon wajib diisi!', isAlert: true});
    const expense = {
        id: 'BON-' + Date.now(),
        date: `${transactionDate} ${new Date().toLocaleTimeString('id-ID')}`,
        isoDate: new Date().toISOString(),
        name: `Bon - ${bonEmployee} : ${bonReason}`,
        amount: parseInt(bonAmount.replace(/\D/g, '') || '0'),
        cashier: user.name,
        branch: bonBranch,
        isBon: true,
        bonEmployee: bonEmployee,
        bonReason: bonReason
    };
    setExpenses([expense, ...expenses]);
    addLog('BON', `Kasbon ${bonEmployee} sejumlah Rp ${expense.amount.toLocaleString('id-ID')} (${bonBranch})`);
    setBonEmployee('');
    setBonAmount('');
    setBonReason('');
    setShowBonModal(false);
    setConfirmAction({message: 'Bon Kasbon berhasil dicatat!', isAlert: true});
  };

  const updateStockAndSave = (newTransaction: any) => {
    let currentInv = [...inventory];
    let currentTrxData = [...transactions];

    cart.forEach(cartItem => {
        if (cartItem.isReturn) {
            const invIdx = currentInv.findIndex(i => i.id === cartItem.originalItemId);
            if (invIdx >= 0) currentInv[invIdx].stock += cartItem.qty; 

            const oTrxIdx = currentTrxData.findIndex(t => t.id === cartItem.originalTrxId);
            if (oTrxIdx >= 0) {
                 const returValue = Math.abs(cartItem.price) * cartItem.qty;
                 currentTrxData[oTrxIdx].returTotal = (currentTrxData[oTrxIdx].returTotal || 0) + returValue;
                 currentTrxData[oTrxIdx].total -= returValue;
                 
                 const oItemIdx = currentTrxData[oTrxIdx].items.findIndex((i: any) => i.id === cartItem.originalItemId);
                 if(oItemIdx >= 0) currentTrxData[oTrxIdx].items[oItemIdx].qty -= cartItem.qty;
            }
        } else {
            const invIdx = currentInv.findIndex(i => i.id === cartItem.id);
            if (invIdx >= 0) currentInv[invIdx].stock -= cartItem.qty;
        }
    });

    setInventory(currentInv);
    if (newTransaction) {
       setTransactions([newTransaction, ...currentTrxData]);
       addLog(newTransaction.type === 'PIUTANG' ? 'PIUTANG_BARU' : 'PENJUALAN', `Transaksi ${newTransaction.id} sebesar Rp ${newTransaction.total.toLocaleString('id-ID')}`);
    }
    else {
       setTransactions(currentTrxData);
    }
    
    triggerAutoOrder(currentInv);
    resetKasirState();
  };

  const processTransaction = (shouldPrint = false) => {
    const isPiutang = paymentMethod === 'Qriss/TF' || paymentMethod === 'DP' || paymentMethod === '1 Minggu';
    const noFaktur = `FAK-${(() => { const d = new Date(); return String(d.getFullYear()).slice(2) + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0'); })()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    if (isInputStockMode) {
       const supplier = suppliers.find((s: any) => s.id.toString() === stockSupplierId);
       const finalTotalCost = totalBelanjaBaru - (totalBelanjaBaru * stockDiscount / 100);
       
       let currentInv = JSON.parse(JSON.stringify(inventory));
       let newInvItems: any[] = [];
       // Tambah mutasi stok & create data
       cart.forEach(item => {
          if (item.isNewStock) {
              newInvItems.push({
                  id: item.id,
                  code: item.code,
                  name: item.name,
                  category: item.category,
                  price1: item.price1,
                  price2: item.price2,
                  stock: item.qty
              });
          } else {
              const idx = currentInv.findIndex((i: any) => i.code === item.code);
              if (idx >= 0) currentInv[idx].stock += item.qty;
          }
       });

       const purchaseFaktur = noFaktur.replace('FAK', 'INV');
       const newTransaction = {
          id: purchaseFaktur,
          date: `${transactionDate} ${currentTime.toLocaleTimeString('id-ID')}`,
          isoDate: (() => { const [y,m,d] = transactionDate.split('-'); return new Date(parseInt(y), parseInt(m)-1, parseInt(d), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()).toISOString(); })(), 
          customer: supplier?.name || 'Unknown', // Keep customer field for compatibility, or add supplier
          supplier: supplier?.name || 'Unknown',
          items: [...cart],
          total: stockDiscount === 100 ? 0 : finalTotalCost, 
          paid: stockDiscount === 100 ? 0 : finalTotalCost,
          change: 0,
          discountPercent: stockDiscount,
          cashier: user.name,
          type: 'PEMBELIAN',
          method: paymentMethod,
          sisa: 0,
          returTotal: 0,
          branch: storeSettings.activeBranch || 'Pusat',
          note: transactionNote
       };

       if (stockDiscount < 100 && finalTotalCost > 0) {
           const newExpense = {
              id: 'EXP-' + Date.now(),
              date: `${transactionDate} ${currentTime.toLocaleTimeString('id-ID')}`,
              isoDate: (() => { const [y,m,d] = transactionDate.split('-'); return new Date(parseInt(y), parseInt(m)-1, parseInt(d), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()).toISOString(); })(),
              name: `Pembelian Stok ${purchaseFaktur}`,
              amount: finalTotalCost,
              cashier: user.name,
              branch: storeSettings.activeBranch || 'Pusat'
           };
           setExpenses([newExpense, ...expenses]);
       }

       setInventory([...newInvItems, ...currentInv]);
       setTransactions([newTransaction, ...transactions]);
       addLog('PEMBELIAN_STOK', `No: ${purchaseFaktur} Total: Rp ${finalTotalCost.toLocaleString('id-ID')}`);
       if (shouldPrint) setConfirmAction({message: `Pembelian Stok Tersimpan & Dicetak! (Faktur: ${purchaseFaktur})`, isAlert: true});
       else setConfirmAction({message: 'Pembelian Stok Tersimpan!', isAlert: true});
       setIsInputStockMode(false);
       setCart([]);
       setStockSupplierId('');
       setStockDiscount(0);
       resetKasirState();
       return;
    }

    const piutangPaymentItem = cart.find(c => c.isPiutangPayment);
    const paid = amountPaid ? parseInt(amountPaid) : 0;

    if (piutangPaymentItem) {
        if (paid <= 0) return setConfirmAction({message: 'Masukkan nominal pembayaran!', isAlert: true});
        const piutangToUpdate = piutangData.find(p => p.id === piutangPaymentItem.piutangId);
        
        let successMessage = '';
        if (piutangToUpdate) {
            const newSisa = Math.max(0, piutangToUpdate.sisa - paid);
            if (newSisa === 0) {
               setPiutangData(piutangData.filter(p => p.id !== piutangToUpdate.id));
               successMessage = 'Piutang lunas!';
            } else {
               setPiutangData(piutangData.map(p => p.id === piutangToUpdate.id ? { ...p, sisa: newSisa } : p));
               successMessage = `Pembayaran cicilan piutang berhasil. Sisa tagihan: Rp ${formatRp(newSisa).replace("Rp", "").trim()}`;
            }
        }

        const piutangTransaction = {
          id: noFaktur.replace('FAK', 'PLN'),
          date: `${transactionDate} ${currentTime.toLocaleTimeString('id-ID')}`,
          isoDate: (() => { const [y,m,d] = transactionDate.split('-'); return new Date(parseInt(y), parseInt(m)-1, parseInt(d), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()).toISOString(); })(), 
          customer: selectedCustomer?.name || piutangPaymentItem.name.replace('Pelunasan Piutang - ', ''),
          items: [...cart],
          total: paid, 
          paid: paid,
          change: 0,
          cashier: user.name,
          type: 'PELUNASAN_PIUTANG',
          method: paymentMethod,
          sisa: 0,
          returTotal: 0,
          globalDiscount: 0,
          branch: storeSettings.activeBranch || 'Pusat',
          note: `Pelunasan piutang ${piutangPaymentItem.piutangId}`
        };
        
        setTransactions([piutangTransaction, ...transactions]);
        addLog('PELUNASAN_PIUTANG', `Transaksi ${piutangTransaction.id} sebesar Rp ${piutangTransaction.total.toLocaleString('id-ID')}`);
        
        resetKasirState();
        if (shouldPrint) {
           setTimeout(() => window.print(), 200);
        } else {
           setConfirmAction({message: successMessage || 'Pelunasan Piutang Berhasil Disimpan!', isAlert: true});
        }
        return;
    }
    
    if (!isPiutang && paid < totalBelanja && totalBelanja > 0) return setConfirmAction({message: 'Uang pembayaran kurang! (Atur pembayaran ke DP/Qriss/1 Minggu untuk mencatat sebagai Piutang)', isAlert: true});

    const sisaTagihan = totalBelanja > 0 ? totalBelanja - paid : 0;
    const finalType = (isPiutang || sisaTagihan > 0) ? 'PIUTANG' : 'LUNAS';

    const newTransaction = {
      id: noFaktur,
      date: `${transactionDate} ${currentTime.toLocaleTimeString('id-ID')}`,
      isoDate: (() => { const [y,m,d] = transactionDate.split('-'); return new Date(parseInt(y), parseInt(m)-1, parseInt(d), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds()).toISOString(); })(), 
      customer: selectedCustomer.name,
      items: [...cart],
      total: totalBelanja, 
      paid: paid,
      change: finalType === 'PIUTANG' ? 0 : kembalian,
      cashier: user.name,
      type: finalType,
      method: paymentMethod,
      sisa: finalType === 'PIUTANG' ? (sisaTagihan > 0 ? sisaTagihan : totalBelanja) : 0,
      returTotal: totalNilaiRetur,
      globalDiscount: calculatedDiscount,
      branch: storeSettings.activeBranch || 'Pusat',
      note: transactionNote
    };

    if (finalType === 'PIUTANG') {
      setPiutangData([newTransaction, ...piutangData]);
      if (shouldPrint) {
          setTimeout(() => window.print(), 200);
      }
    } else {
      if (shouldPrint) {
          setTimeout(() => window.print(), 200);
      }
    }

    updateStockAndSave(newTransaction);
    if (!shouldPrint) {
        setConfirmAction({message: 'Transaksi Berhasil Disimpan!', isAlert: true});
    }
  };

  const handleSimpan = () => {
    const isPiutangPayment = cart.some(c => c.isPiutangPayment);
    if (isInputStockMode && !stockSupplierId) return setConfirmAction({message: 'Pilih supliyer terlebih dahulu!', isAlert: true});
    if (!isInputStockMode && !isPiutangPayment && !selectedCustomer) return setConfirmAction({message: 'Pilih pelanggan terlebih dahulu!', isAlert: true});
    if (cart.length === 0) return setConfirmAction({message: 'Keranjang masih kosong!', isAlert: true});
    
    // Validasi Pembayaran Tunai
    const paid = amountPaid ? parseInt(amountPaid) : 0;
    const isPiutang = paymentMethod === 'Qriss/TF' || paymentMethod === 'DP' || paymentMethod === '1 Minggu';

    if (isPromoActive && (totalBelanjaBaru - totalNilaiRetur) < 250000) {
        return setConfirmAction({
            message: 'Pencairan cashback belum mencapai Rp 250.000! Tambahkan barang hingga nominal belanja mencapai Rp 250.000, karena Cashback promo tidak bisa diuangkan.',
            isAlert: true
        });
    }

    if (isPiutangPayment && paid <= 0) {
        return setConfirmAction({
            message: `Pembayaran pelunasan tidak valid. Silakan isi nominal Tunai terlebih dahulu sebagai syarat wajib pelunasan.`,
            isAlert: true,
            onConfirm: () => { setTimeout(() => document.getElementById('tunai-input')?.focus(), 100); }
        });
    }
    if (!isInputStockMode && !isPiutangPayment && !isPiutang && paid < totalBelanja && totalBelanja > 0) {
        return setConfirmAction({
            message: `Pembayaran kurang Rp ${(totalBelanja - paid).toLocaleString('id-ID')}. Silakan isi nominal Tunai terlebih dahulu sebagai syarat wajib terjadi transaksi.`,
            isAlert: true,
            onConfirm: () => { setTimeout(() => document.getElementById('tunai-input')?.focus(), 100); }
        });
    }

    setConfirmAction({
      message: isPiutangPayment ? 'Simpan pelunasan piutang ini?' : 'Simpan transaksi ini?',
      onConfirm: () => processTransaction(false)
    });
  };

  const handleCetakButton = () => {
    const isPiutangPayment = cart.some(c => c.isPiutangPayment);
    if (!isInputStockMode && !isPiutangPayment && !selectedCustomer) return setConfirmAction({message: 'Pilih pelanggan terlebih dahulu!', isAlert: true});
    if (cart.length === 0) return setConfirmAction({message: 'Keranjang masih kosong!', isAlert: true});
    
    // Validasi Pembayaran Tunai
    const paid = amountPaid ? parseInt(amountPaid) : 0;
    const isPiutang = paymentMethod === 'Qriss/TF' || paymentMethod === 'DP' || paymentMethod === '1 Minggu';

    if (isPromoActive && (totalBelanjaBaru - totalNilaiRetur) < 250000) {
        return setConfirmAction({
            message: 'Pencairan cashback belum mencapai Rp 250.000! Tambahkan barang hingga nominal belanja mencapai Rp 250.000, karena Cashback promo tidak bisa diuangkan.',
            isAlert: true
        });
    }

    if (isPiutangPayment && paid <= 0) {
        return setConfirmAction({
            message: `Pembayaran pelunasan tidak valid. Silakan isi nominal Tunai terlebih dahulu sebagai syarat wajib pelunasan.`,
            isAlert: true,
            onConfirm: () => { setTimeout(() => document.getElementById('tunai-input')?.focus(), 100); }
        });
    }
    if (!isInputStockMode && !isPiutangPayment && !isPiutang && paid < totalBelanja && totalBelanja > 0) {
        return setConfirmAction({
            message: `Pembayaran kurang Rp ${(totalBelanja - paid).toLocaleString('id-ID')}. Silakan isi nominal Tunai terlebih dahulu sebagai syarat wajib terjadi transaksi.`,
            isAlert: true,
            onConfirm: () => { setTimeout(() => document.getElementById('tunai-input')?.focus(), 100); }
        });
    }
    
    // Automatically fill WA number if customer has phone
    if (selectedCustomer && selectedCustomer.phone && selectedCustomer.phone !== '-') {
       setWaNumber(selectedCustomer.phone);
    } else {
       setWaNumber('');
    }
    setPrintActionModal(true);
  };

  const handleSavePending = () => {
    if (cart.some(c => c.isReturn)) {
      return setConfirmAction({
        message: 'PERINGATAN: Selesaikan atau batalkan retur terlebih dahulu sebelum simpan pending! Jangan tunda transaksi retur.',
        isAlert: true
      });
    }
    if (cart.length === 0) return setConfirmAction({message: 'Keranjang masih kosong!', isAlert: true});
    if (!selectedCustomer) return setConfirmAction({message: 'Pilih pelanggan terlebih dahulu!', isAlert: true});
    setConfirmAction({
      message: 'Simpan transaksi ke daftar pending?',
      onConfirm: () => {
        const rawId = Date.now();
        const dateObj = new Date();
        const yyyymmdd = dateObj.getFullYear().toString() + String(dateObj.getMonth() + 1).padStart(2, '0') + String(dateObj.getDate()).padStart(2, '0');
        const hhmmss = String(dateObj.getHours()).padStart(2, '0') + String(dateObj.getMinutes()).padStart(2, '0') + String(dateObj.getSeconds()).padStart(2, '0');
        
        let pendingUser = user?.name || 'Kasir';
        if (storeSettings?.activeBranch) pendingUser += ' (' + storeSettings.activeBranch + ')';
        
        const newPending = {
          id: `${yyyymmdd}${hhmmss}-PENDING-${selectedCustomer.name.toUpperCase().replace(/\s+/g, ' ').substring(0, 30)}`,
          time: dateObj.toLocaleTimeString('id-ID'),
          dateString: dateObj.toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'}),
          customerName: selectedCustomer.name,
          customerId: selectedCustomerId,
          sales: pendingUser,
          items: [...cart],
          total: totalBelanja,
        };

        setPendingTransactions([newPending, ...pendingTransactions]);
        addLog('PENDING_TRANSAKSI', `Penundaan transaksi untuk pelanggan ${selectedCustomer.name}`);
        resetKasirState();
      }
    });
  };

  const handleResetBaru = () => {
    if (cart.length > 0) {
      if (cart.some(c => c.isReturn)) {
        setConfirmAction({
          message: 'PERINGATAN KERAS: Harap simpan transaksi laporan retur! Jangan hapus transaksi ini karena sangat berbahaya dan bisa menyebabkan kehilangan omzet.',
          isAlert: true
        });
      } else {
        setConfirmAction({
          message: 'Hapus transaksi yang sedang berjalan & buat baru?',
          onConfirm: () => resetKasirState()
        });
      }
    } else {
      resetKasirState();
    }
  };

  useEffect(() => {
    if (selectedCustomer) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyTotal = transactions.filter((t: any) => {
          if (t.customer !== selectedCustomer.name) return false;
          if (t.id.includes('PLN') || t.method === 'RETUR') return false; 
          const tDate = new Date(t.isoDate || t.date);
          return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      }).reduce((sum: number, t: any) => sum + (t.total || 0), 0);

      const totalBelanjaBaru = cart.filter((c: any) => !c.isReturn).reduce((total, item) => total + (item.price * item.qty), 0);
      const totalNilaiRetur = cart.filter((c: any) => c.isReturn).reduce((total, item) => total + (item.price * item.qty), 0);
      const currentCartTotal = totalBelanjaBaru - totalNilaiRetur;
      const combinedTotal = monthlyTotal + currentCartTotal;

      if (combinedTotal >= 5000000) {
          if (discountType !== 'Rp' || globalDiscount !== 250000) {
             setIsPromoActive(true);
             setDiscountType('Rp');
             setGlobalDiscount(250000);
          }
      }
    }
  }, [selectedCustomerId, cart, transactions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in a text input (unless we want global override carefully)
      // Actually F-keys don't write text, so we can always listen
      if (e.key === 'F8') {
        e.preventDefault();
        handleSimpan();
      } else if (e.key === 'F9') {
        e.preventDefault();
        if (!cart.some(c => c.isReturn)) handleCetakButton();
      } else if (e.key === 'F5') {
        e.preventDefault();
        handleResetBaru();
      } else if (e.key === 'F4') {
        e.preventDefault();
        if (!cart.some(c => c.isReturn)) setShowPendingModal(true);
      } else if (e.key === 'F3') {
        e.preventDefault();
        if (!cart.some(c => c.isReturn)) handleSavePending();
      } else if (e.key === 'F2') {
        e.preventDefault();
        if (!cart.some(c => c.isReturn)) setShowPiutangModal(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart, selectedCustomer, stockSupplierId, paymentMethod, transactionNote, amountPaid, isInputStockMode]);

  const resetKasirState = () => {
    setCart([]);
    setAmountPaid('');
    setTransactionNote('');
    setSelectedCustomerId('');
    setPaymentMethod('TUNAI');
    setSuggestions([]);
    setStagedItem(null);
    setActiveReturTrx(null);
    setIsInputStockMode(false);
    setGlobalDiscount(0);
  };

  const handleSwitchKasirRequest = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetName = e.target.value;
    if (targetName === user.name) return;

    const targetUser = appUsers.find((u: any) => u.name === targetName);
    if (targetUser) {
      setPendingUser(targetUser);
      setShowAuthModal(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title={isInputStockMode ? "POS - INPUT STOCK BARU (PEMBELIAN)" : "POS - TRANSAKSI PENJUALAN"} currentTime={currentTime} />
      
      <div className="p-2 flex-1 flex flex-col gap-1 overflow-hidden">
        
        {/* TOP CONTROLS */}
        <div className="flex justify-between items-end font-semibold text-blue-900 relative w-full mt-1">
          {/* Kolom Kiri */}
          <div className="flex flex-col justify-between h-[75px] w-auto shrink-0">
            <div className="flex items-center">
              <label className="w-24 uppercase">Date</label>
              <div className="relative border border-gray-400 bg-white w-[220px] flex items-center overflow-hidden hover:border-blue-500 shadow-inner">
                <span className="px-2 py-0.5 text-black font-normal pointer-events-none truncate flex-1">
                  {formatDateDisplay(transactionDate)}
                </span>
                <input type="date" value={transactionDate} onChange={(e) => setTransactionDate(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="bg-gray-100 border-l border-gray-300 h-full px-2 flex items-center justify-center pointer-events-none"><Calendar className="w-3 h-3 text-gray-700" /></div>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-24 uppercase">Tunai/Kredit</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border border-gray-400 px-1 py-0.5 w-[220px] bg-white text-black font-normal outline-none shadow-inner">
                <option value="TUNAI">TUNAI</option>
                <option value="1 Minggu">1 Minggu</option>
                <option value="Qriss/TF">Qriss/TF</option>
                <option value="DP">DP</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="w-24 uppercase">{isInputStockMode ? 'Supliyer' : 'Pelanggan'} <span className="text-red-500">*</span></label>
              <div className="flex gap-1 w-[220px] relative">
                {isInputStockMode ? (
                  <select 
                    className={`border border-gray-400 px-1 py-0.5 flex-1 outline-none text-black font-normal shadow-inner ${!stockSupplierId ? 'bg-yellow-100' : 'bg-white'}`}
                    value={stockSupplierId}
                    onChange={(e) => setStockSupplierId(e.target.value)}
                  >
                    <option value="">-- WAJIB PILIH --</option>
                    {suppliers.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                ) : (
                  <>
                  <select 
                    className={`border border-gray-400 px-1 py-0.5 flex-1 outline-none text-black font-normal shadow-inner ${!selectedCustomerId ? 'bg-yellow-100' : 'bg-white'}`}
                    value={selectedCustomerId}
                    disabled={cart.some(c => c.isReturn)}
                    onChange={(e) => {
                      const regularItems = cart.filter(c => !c.isReturn);
                      if (regularItems.length > 0) {
                        if (window.confirm('Mengubah pelanggan akan mengosongkan barang belanja biasa. Lanjutkan?')) { setCart(cart.filter(c => c.isReturn)); setSelectedCustomerId(e.target.value); }
                      } else setSelectedCustomerId(e.target.value);
                    }}
                  >
                    <option value="">-- WAJIB PILIH --</option>
                    {customers.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  
                  <button onClick={() => setShowAddCustomerModal(true)} className="border border-gray-400 bg-gray-200 w-6 hover:bg-gray-300 flex items-center justify-center font-bold relative z-20 shadow-sm">+</button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Kolom Kanan: User, Input Dropdown & KAS Merah */}
          <div className="flex flex-col items-end justify-between h-[75px] z-50 shrink-0 pr-4 pb-0.5 relative">
            <div className="flex items-center gap-2 mb-3">
              <label className="uppercase text-blue-700">User</label>
              <select value={user.name} onChange={handleSwitchKasirRequest} className="border border-gray-400 px-1 py-0.5 w-32 bg-white outline-none font-normal text-black cursor-pointer shadow-sm">
                {appUsers?.map((u: any) => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
              <div className="relative">
                 <button onClick={() => setShowInputMenu(!showInputMenu)} className="bg-gray-200 border border-gray-500 text-black px-3 py-0.5 font-bold shadow-sm hover:bg-gray-300">Input ▾</button>
                 {showInputMenu && (
                    <div className="absolute top-full right-0 mt-1 bg-[#ece9d8] border-2 border-gray-400 shadow-xl z-[999] w-56 flex flex-col text-left text-black font-normal">
                       <button onClick={() => { setShowExpenseModal(true); setShowInputMenu(false); }} className="px-3 py-2 hover:bg-blue-100 text-left border-b border-gray-300 font-bold">Input Pengeluaran</button>
                       <button onClick={() => { setIsInputStockMode(true); setCart([]); setShowInputMenu(false); }} className="px-3 py-2 hover:bg-blue-100 text-left border-b border-gray-300 font-bold">Input Stock Baru</button>
                       <button onClick={() => { setActiveTab('masterdata'); setMasterDataTab('order'); setShowInputMenu(false); }} className="px-3 py-2 hover:bg-blue-100 text-left border-b border-gray-300 font-bold">Order Supliyer</button>
                    </div>
                 )}
              </div>
            </div>
            
            {(() => {
              const parsedPaid = amountPaid ? parseInt(amountPaid) : 0;
              const outstandingAmount = !isInputStockMode ? Math.max(0, Math.abs(totalBelanja) - parsedPaid) : Math.abs(totalBelanja);
              const isCashInLabel = !isInputStockMode ? totalBelanja >= 0 : totalBelanja < 0;
              return (
                <div className={`${isCashInLabel ? "text-green-600" : "text-red-600"} font-bold flex items-baseline gap-2 transition-colors`}>
                  <span className="text-lg tracking-wide uppercase">{isCashInLabel ? "Cash In" : "Cash Out"}</span>
                  <span className="text-4xl tracking-tighter drop-shadow-sm leading-none">{formatRp(outstandingAmount).replace('Rp', '').trim()}</span>
                </div>
              );
            })()}

          </div>
        </div>

        {/* INPUT ROW ATAU FORM INPUT BARU */}
        {isInputStockMode ? (
          <div className="bg-[#ece9d8] border border-gray-400 p-2 flex flex-wrap gap-2 items-end shadow-sm mt-1 z-20 relative">
            <div className="flex flex-col gap-1 w-[120px]">
                <label className="text-xs font-bold text-gray-700">Kode Barang:</label>
                <input className="border border-gray-400 p-1 w-full outline-none focus:border-blue-500" value={newStock.code} onChange={e => {
                    const val = e.target.value;
                    setNewStock({...newStock, code: val});
                    if (val.trim().length > 0) {
                        setStockSuggestions(inventory.filter((i: any) => i.code.toLowerCase().includes(val.toLowerCase()) || i.name.toLowerCase().includes(val.toLowerCase())));
                    } else setStockSuggestions([]);
                }} />
            </div>
            <div className="flex flex-col gap-1 flex-1 min-w-[120px] relative">
                <label className="text-xs font-bold text-gray-700">Nama Barang:</label>
                <input className="border border-gray-400 p-1 w-full outline-none focus:border-blue-500" value={newStock.name} onChange={e => {
                    const val = e.target.value;
                    setNewStock({...newStock, name: val});
                    if (val.trim().length > 0) {
                        setStockSuggestions(inventory.filter((i: any) => i.code.toLowerCase().includes(val.toLowerCase()) || i.name.toLowerCase().includes(val.toLowerCase())));
                    } else setStockSuggestions([]);
                }} />
                {stockSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-0.5 w-[500px] bg-white border border-gray-400 shadow-xl max-h-[250px] overflow-y-auto text-black z-[999]">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-normal">
                        <tr><th className="px-2 py-1.5 border-r border-gray-300">Kode</th><th className="px-2 py-1.5 border-r border-gray-300">Nama Barang</th><th className="px-2 py-1.5 border-r border-gray-300">Kategori</th><th className="px-2 py-1.5 text-right">Stok</th></tr>
                      </thead>
                      <tbody>
                        {stockSuggestions.map((item: any) => (
                          <tr key={item.id} onClick={() => {
                              setNewStock({ code: item.code, name: item.name, category: item.category || 'UMUM', supplierPrice: 0, price1: item.price1, price2: item.price2, stock: 1 });
                              setStockSuggestions([]);
                          }} className="border-b border-gray-200 hover:bg-blue-100 cursor-pointer">
                            <td className="px-2 py-1.5 border-r border-gray-300 font-mono text-gray-500">{item.code}</td><td className="px-2 py-1.5 border-r border-gray-300 font-bold">{item.name}</td><td className="px-2 py-1.5 border-r border-gray-300 text-sm">{item.category || '-'}</td><td className={`px-2 py-1.5 text-right font-bold ${item.stock <= 2 ? 'text-red-600' : 'text-black'}`}>{item.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-1 w-[140px]">
                <label className="text-xs font-bold text-gray-700">Kategori:</label>
                <div className="flex h-[26px]">
                    {showNewCategory ? (
                        <>
                        <input className="border border-gray-400 p-1 px-1.5 w-full outline-none focus:border-blue-500 text-xs" autoFocus value={newStock.category} onChange={e => setNewStock({...newStock, category: e.target.value.toUpperCase()})} placeholder="Kategori Baru" />
                        <button onClick={() => setShowNewCategory(false)} className="bg-gray-300 px-2 font-bold hover:bg-gray-400 border border-gray-400 border-l-0 text-xs">x</button>
                        </>
                    ) : (
                        <>
                        <select className="border border-gray-400 p-1 px-1.5 w-full outline-none focus:border-blue-500 text-xs" value={newStock.category} onChange={e => setNewStock({...newStock, category: e.target.value})}>
                            {Array.from(new Set(['UMUM', ...(storeSettings?.margins ? Object.keys(storeSettings.margins).filter(k => k !== 'DEFAULT') : []), ...inventory.map((i: any) => i.category).filter(Boolean)])).map(cat => <option key={cat as string} value={cat as string}>{cat as string}</option>)}
                        </select>
                        <button onClick={() => { setShowNewCategory(true); setNewStock({...newStock, category: ''}); }} className="bg-gray-300 px-2 font-bold hover:bg-gray-400 border border-gray-400 border-l-0 text-xs">+</button>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-1 w-[110px]">
                <label className="text-xs font-bold text-gray-700">Harga Supliyer:</label>
                <input type="number" className="border border-gray-400 p-1 w-full outline-none focus:border-blue-500" value={newStock.supplierPrice || ''} onChange={e => {
                    const val = parseInt(e.target.value) || 0;
                    const margin1 = storeSettings?.margins?.[newStock.category]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                    const margin2 = storeSettings?.margins?.[newStock.category]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                    setNewStock({...newStock, supplierPrice: val, price1: Math.round(val * (1 + margin1/100)), price2: Math.round(val * (1 + margin2/100))});
                }} />
            </div>
            <div className="flex flex-col gap-1 w-[70px]">
                <label className="text-xs font-bold text-gray-700">Stok:</label>
                <input type="number" className="border border-gray-400 p-1 w-full outline-none focus:border-blue-500" value={newStock.stock || ''} onChange={e => setNewStock({...newStock, stock: parseInt(e.target.value) || 0})} />
            </div>
            <div className="flex items-center gap-1">
                <button onClick={() => {
                    if (!newStock.name || !newStock.code) return alert('Kode dan Nama barang wajib diisi!');
                    
                    const val = newStock.supplierPrice || 0;
                    const margin1 = storeSettings?.margins?.[newStock.category]?.level1 ?? storeSettings?.margins?.DEFAULT?.level1 ?? 75;
                    const margin2 = storeSettings?.margins?.[newStock.category]?.level2 ?? storeSettings?.margins?.DEFAULT?.level2 ?? 15;
                    const p1 = Math.round(val * (1 + margin1/100));
                    const p2 = Math.round(val * (1 + margin2/100));

                    const stockId = Date.now().toString();
                    const item = {
                        id: stockId,
                        code: newStock.code,
                        name: newStock.name,
                        category: newStock.category,
                        price1: p1,
                        price2: p2,
                        price: newStock.supplierPrice,
                        qty: newStock.stock,
                        cartUniqueId: Date.now(),
                        isNewStock: true
                    };
                    setCart([...cart, item]);
                    setNewStock({code: '', name: '', category: 'UMUM', supplierPrice: 0, price1: 0, price2: 0, stock: 1});
                }} className="bg-[#00a651] text-white font-bold py-1 px-4 hover:bg-green-700 shadow border border-green-800">Masukkan Keranjang</button>
            </div>
          </div>
        ) : (
        <div className="flex items-end gap-1 w-full relative z-20 mt-1">
          <div className="flex flex-col w-[250px] shrink-0 relative">
            <div className="mb-0.5 h-[18px] flex items-center text-blue-800">
                <label>Kode Barang (F1)</label>
            </div>
            <input ref={codeInputRef} type="text" value={codeInput} onChange={handleCodeChange} onKeyDown={handleCodeSubmit} className="bg-white border border-gray-400 px-2 py-1.5 h-[34px] w-full outline-none focus:border-blue-600 shadow-inner" placeholder="Ketik Kode/Nama Barang..." />
            
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 mt-0.5 w-[500px] bg-white border border-gray-400 shadow-xl max-h-[250px] overflow-y-auto text-black z-50">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#ece9d8] sticky top-0 border-b-2 border-gray-400 font-normal">
                    <tr><th className="px-2 py-1.5 border-r border-gray-300">Kode</th><th className="px-2 py-1.5 border-r border-gray-300">Nama Barang</th><th className="px-2 py-1.5 border-r border-gray-300 text-right">Harga Lvl 1</th><th className="px-2 py-1.5 text-right">Stok</th></tr>
                  </thead>
                  <tbody>
                    {suggestions.map((item: any) => (
                      <tr key={item.id} onClick={() => handleSelectSuggestion(item)} className="border-b border-gray-200 hover:bg-blue-100 cursor-pointer">
                        <td className="px-2 py-1.5 border-r border-gray-300 font-mono text-gray-500">{item.code}</td><td className="px-2 py-1.5 border-r border-gray-300 font-bold">{item.name}</td><td className="px-2 py-1.5 text-right border-r border-gray-300 text-blue-800">{formatRp(item.price1)}</td><td className={`px-2 py-1.5 text-right font-bold ${item.stock <= 2 ? 'text-red-600' : 'text-black'}`}>{item.stock}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex flex-col w-[60px] shrink-0">
            <div className="mb-0.5 h-[18px] flex items-center justify-center text-blue-800">
                <label>Qty</label>
            </div>
            <input ref={qtyInputRef} type="number" value={qtyInput} onChange={(e) => setQtyInput(e.target.value)} onKeyDown={handleQtySubmit} className="bg-white border border-gray-400 px-1 py-1.5 h-[34px] w-full text-center outline-none focus:border-blue-600 shadow-inner" />
          </div>
          
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex justify-between items-center text-blue-800 px-2 mb-0.5 h-[18px]">
              <span className="w-1/3">Nama Barang</span>
              {stagedItem && <span className="text-gray-500 italic text-[10px]">Tekan Enter pada kolom Jumlah...</span>}
            </div>
            <div className="bg-white h-[34px] border border-gray-400 w-full flex items-center px-2 text-black font-bold truncate text-sm">
              {stagedItem ? stagedItem.name : ''}
            </div>
          </div>
        </div>
        )}

        {/* DATA GRID */}
        <div className="flex-1 bg-white border border-gray-400 mt-1 overflow-auto shadow-inner relative z-10 min-h-[150px]">
          <table className="w-full text-left border-collapse whitespace-nowrap text-black relative">
            <thead className="sticky top-0 z-20 shadow-[0_2px_0_gray]">
              <tr className="bg-[#ece9d8]">
                <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5 w-24">Kode</th>
                <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5">Nama</th>
                {isInputStockMode && <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5">Kategori</th>}
                <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5 w-16 text-center">Jumlah</th>
                <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5 w-16 text-center">Satuan</th>
                <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5 w-28 text-right">{isInputStockMode ? 'Harga Supliyer' : 'Harga'}</th>
                {isInputStockMode && <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5 w-28 text-right">Lvl 1 (Jual)</th>}
                {isInputStockMode && <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5 w-28 text-right">Lvl 2 (Grosir)</th>}
                <th className="font-bold border-r border-b-2 border-gray-400 px-2 py-1.5 w-28 text-right">Total</th>
                <th className="font-bold border-b-2 border-gray-400 px-2 py-1.5 w-16 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {cart.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50">
                  <td className="border-r border-gray-300 px-2 py-1.5">{item.code}</td>
                  <td className="border-r border-gray-300 px-2 py-1.5 font-bold">{item.name}</td>
                  {isInputStockMode && <td className="border-r border-gray-300 px-2 py-1.5">{item.category || 'UMUM'}</td>}
                  <td className="border-r border-gray-300 px-2 py-1.5 text-center font-bold text-blue-900">
                    {item.isReturn ? (
                       <input type="number" min="1" max={item.originalQty || item.qty} value={item.qty} onChange={e => { let n = parseInt(e.target.value) || 1; if (n > (item.originalQty || item.qty)) n = item.originalQty || item.qty; setCart(cart.map(c => c.cartUniqueId === item.cartUniqueId ? {...c, qty: n} : c)); }} className="w-16 outline-none border border-gray-400 text-center shadow-inner font-bold text-blue-900" />
                    ) : item.qty}
                  </td>
                  <td className="border-r border-gray-300 px-2 py-1.5 text-center">Pcs</td>
                  <td className="border-r border-gray-300 px-2 py-1.5 text-right font-medium">
                    {isInputStockMode ? (
                        <input 
                          type="number" 
                          value={item.price || ''} 
                          onChange={(e) => {
                              const newPrice = parseInt(e.target.value) || 0;
                              setCart(cart.map(c => c.cartUniqueId === item.cartUniqueId ? { ...c, price: newPrice } : c));
                          }}
                          className="w-20 text-right border border-gray-400 px-1 py-0.5 outline-none font-bold"
                          placeholder="0"
                        />
                    ) : formatRp(item.price)}
                  </td>
                  {isInputStockMode && <td className="border-r border-gray-300 px-2 py-1.5 text-right font-medium text-blue-800">{formatRp(item.price1)}</td>}
                  {isInputStockMode && <td className="border-r border-gray-300 px-2 py-1.5 text-right font-medium text-purple-800">{formatRp(item.price2)}</td>}
                  <td className="border-r border-gray-300 px-2 py-1.5 text-right bg-blue-50/50 font-bold text-blue-900 text-sm">
                    <span className={item.isReturn ? "text-green-600" : ""}>{item.isReturn ? '[KREDIT] ' : ''}{formatRp(item.price * item.qty)}</span>
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    <button onClick={() => removeFromCart(item)} className="text-red-600 hover:bg-red-200 px-2 py-0.5 font-bold rounded border border-red-300">x</button>
                  </td>
                </tr>
              ))}
              {/* Expand table visually */}
              {cart.length < 18 && Array.from({ length: 18 - cart.length }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-gray-200 h-[30px]">
                  <td className="border-r border-gray-300 px-2"></td>
                  <td className="border-r border-gray-300 px-2"></td>
                  {isInputStockMode && <td className="border-r border-gray-300 px-2"></td>}
                  <td className="border-r border-gray-300 px-2"></td>
                  <td className="border-r border-gray-300 px-2"></td>
                  <td className="border-r border-gray-300 px-2"></td>
                  {isInputStockMode && <td className="border-r border-gray-300 px-2"></td>}
                  {isInputStockMode && <td className="border-r border-gray-300 px-2"></td>}
                  <td className="border-r border-gray-300 px-2"></td>
                  <td className="px-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex mt-1 justify-between items-stretch gap-3 w-full">
          {/* Left Totals */}
          <div className="flex flex-col justify-end gap-1 w-[280px] p-2 bg-[#8fb4d9] border border-white/50 shadow-sm shrink-0 rounded-sm">
             <div className="flex items-center h-[26px]">
               <span className="w-[110px] font-semibold text-blue-900 shrink-0 text-xs tracking-wide">SUBTOTAL</span>
               <input type="text" readOnly value={formatRp(totalBelanjaBaru)} className="border border-gray-400 bg-white px-1 leading-none text-right flex-1 min-w-0 h-full outline-none font-bold text-sm shadow-inner" />
             </div>
             {isInputStockMode ? (
                 <div className="flex items-center h-[26px]">
                   <span className="w-[110px] font-semibold text-blue-900 shrink-0 text-xs tracking-wide">DISKON %</span>
                   <input type="number" value={stockDiscount} onChange={e => setStockDiscount(parseInt(e.target.value)||0)} className="border border-gray-400 bg-white px-1 leading-none text-right flex-1 min-w-0 h-full outline-none font-bold text-sm shadow-inner text-black" />
                 </div>
             ) : (
                 <>
                 <div className="flex items-center h-[26px]">
                   <span className="w-[110px] font-semibold text-blue-900 shrink-0 text-xs tracking-wide">POTONGAN RETUR</span>
                   <input type="text" readOnly value={formatRp(totalNilaiRetur)} className="border border-gray-400 bg-white px-1 leading-none text-right flex-1 min-w-0 h-full outline-none font-bold text-sm shadow-inner" />
                 </div>
                 <div className="flex items-center h-[26px]">
                   <select value={discountType} onChange={(e) => setDiscountType(e.target.value)} className="w-[110px] font-semibold text-blue-900 shrink-0 text-xs tracking-wide outline-none bg-transparent cursor-pointer uppercase">
                     <option value="Rp">DISKON RP</option>
                     <option value="%">DISKON %</option>
                   </select>
                   <input type="text" value={discountType === 'Rp' ? formatRp(globalDiscount || 0) : (globalDiscount || '')} onChange={e => { const val = e.target.value.replace(/\D/g, ''); setGlobalDiscount(val ? parseInt(val, 10) : 0); }} className="border border-gray-400 bg-white px-1 leading-none text-right flex-1 min-w-0 h-full outline-none font-bold text-sm shadow-inner text-black" placeholder={discountType === 'Rp' ? "Rp 0" : "0"} />
                 </div>
                 </>
             )}
             
             {!isInputStockMode && (
                 <>
                 <div className="flex items-center h-[26px]">
                   <span className="w-[110px] font-semibold text-blue-900 shrink-0 text-xs tracking-wide">TUNAI</span>
                   <input 
                      id="tunai-input"
                      type="text" 
                      disabled={totalBelanja < 0} 
                      value={amountPaid === "" ? "" : formatRp(Number(amountPaid) || 0)} 
                      onChange={(e) => {
                         const val = e.target.value.replace(/\D/g, '');
                         setAmountPaid(val);
                      }} 
                      className="border border-gray-400 bg-white px-1 leading-none text-right flex-1 min-w-0 h-full font-bold outline-none focus:bg-yellow-50 text-sm shadow-inner disabled:bg-gray-300 text-black" 
                      placeholder="Rp 0" 
                   />
                 </div>
                 <div className="flex items-center h-[26px]">
                   <span className="w-[110px] font-semibold text-blue-900 shrink-0 text-xs tracking-wide">KEMBALIAN</span>
                   <input type="text" readOnly value={formatRp(kembalian > 0 ? kembalian : 0)} className="border border-gray-400 bg-white px-1 leading-none text-right flex-1 min-w-0 h-full outline-none font-bold text-sm shadow-inner" />
                 </div>
                 </>
             )}
             {isInputStockMode && (
                 <div className="flex items-center">
                   <span className="w-[85px] font-semibold text-blue-900 shrink-0 text-xs">Total Biaya</span>
                   <input type="text" readOnly value={formatRp(totalBelanjaBaru - (totalBelanjaBaru * stockDiscount / 100))} className="border border-gray-400 bg-white px-1 py-0.5 text-right flex-1 min-w-0 outline-none font-bold text-sm shadow-inner" />
                 </div>
              )}
          </div>
          
          <div className="flex-1 relative self-stretch">
            <div className="absolute inset-0 flex flex-col p-1.5 overflow-hidden border border-gray-400 bg-[#ece9d8]">
              <div className="flex items-center justify-center font-bold text-blue-900 border-b border-gray-400 pb-1 mb-1 shadow-sm shrink-0">
                  <span className="text-[10px] uppercase truncate text-center">Log Aktifitas Harian</span>
              </div>
              <div className="flex-1 overflow-y-auto pr-1">
                  {appLogs.filter((l: any) => new Date(l.time).toDateString() === new Date().toDateString()).length > 0 ? (
                      <div className="flex flex-col gap-1">
                          {appLogs.filter((l: any) => new Date(l.time).toDateString() === new Date().toDateString()).map((log: any, idx: number) => (
                             <div key={idx} className="bg-white border border-gray-300 p-1 flex flex-col justify-between shadow-sm hover:border-gray-400 transition-colors">
                                 <div className="flex justify-between w-full">
                                     <span className="text-[9px] font-bold text-blue-900 truncate" title={log.type}>{log.type}</span>
                                     <span className="text-[8px] text-gray-500">{new Date(log.time).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</span>
                                 </div>
                                 <span className="text-[9px] text-gray-700 leading-tight">{log.desc}</span>
                             </div>
                          ))}
                      </div>
                  ) : (
                      <div className="text-[9px] text-gray-500 italic mt-2 text-center leading-tight">
                          Belum ada aktifitas hari ini.
                      </div>
                  )}
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col items-end justify-end pr-0.5 pb-0.5 gap-2 shrink-0">
            <div className="flex flex-col items-end gap-1.5">
              <div className="flex gap-1.5">
                <div className="flex flex-col gap-1 w-[120px]">
                  <button onClick={handleSimpan} className="border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full hover:bg-gray-300 text-black font-bold shadow-sm text-xs">Simpan [F8]</button>
                    <button onClick={handleCetakButton} disabled={cart.some(c => c.isReturn)} className={`border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full text-black font-bold shadow-sm text-xs ${cart.some(c => c.isReturn) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>Cetak [F9]</button>
                    <button onClick={handleResetBaru} className={`border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full text-black font-bold shadow-sm text-xs ${cart.some(c => c.isReturn) ? 'opacity-50 hover:bg-red-200' : 'hover:bg-gray-300'}`}>Baru [F5]</button>
                    <button onClick={() => setShowHistoryModal(true)} disabled={cart.some(c => c.isReturn)} className={`border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full text-black font-bold shadow-sm text-xs ${cart.some(c => c.isReturn) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>Return</button>
                    <button onClick={() => setShowBonModal(true)} disabled={cart.some(c => c.isReturn)} className={`border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full text-black font-bold text-red-700 shadow-sm text-xs ${cart.some(c => c.isReturn) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>Kasbon</button>
                  </div>
                  <div className="flex flex-col gap-1 w-[130px]">
                    <button onClick={() => setShowPiutangModal(true)} disabled={cart.some(c => c.isReturn)} className={`border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full text-black font-bold shadow-sm text-xs relative ${cart.some(c => c.isReturn) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>
                      Piutang [F2]
                      {piutangData.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-lg">{piutangData.length}</span>}
                    </button>
                    <button onClick={handleSavePending} disabled={cart.some(c => c.isReturn)} className={`border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full text-black font-bold shadow-sm text-xs ${cart.some(c => c.isReturn) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>Pending [F3]</button>
                    <button onClick={() => setShowPendingModal(true)} disabled={cart.some(c => c.isReturn)} className={`border-2 border-gray-500 bg-gray-200 px-3 py-1.5 w-full text-black font-bold shadow-sm text-xs relative ${cart.some(c => c.isReturn) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}>
                      Daftar Pnd [F4]
                      {pendingTransactions.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-lg">{pendingTransactions.length}</span>}
                    </button>
                    <button onClick={() => setIsBarcodeMode(!isBarcodeMode)} className={`border-2 border-gray-500 px-3 py-1.5 w-full font-bold shadow-sm text-xs text-white ${isBarcodeMode ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}>Auto Scan</button>
                    <button onClick={handlePromoToggle} disabled={cart.some(c => c.isReturn)} className={`border-2 border-gray-500 px-3 py-1.5 w-full font-bold shadow-sm text-xs text-white ${cart.some(c => c.isReturn) ? 'opacity-50 cursor-not-allowed bg-red-600' : (isPromoActive ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700')}`}>Promo</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      
      {/* HISTORY MODAL FOR RETUR */}
      {showHistoryModal && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
              <div className="bg-[#ece9d8] border-2 border-gray-500 w-[600px] flex flex-col shadow-2xl">
                  <div className="bg-[#000040] text-white px-3 py-1.5 flex justify-between items-center cursor-default">
                      <span className="font-bold text-sm tracking-wide">PILIH TRANSAKSI</span>
                      <div className="flex items-center gap-2 ml-auto mr-4">
                          <label className="text-[13px] font-medium leading-none">No. Nota</label>
                          <input 
                              type="text" 
                              value={searchNotaRetur} 
                              onChange={e => setSearchNotaRetur(e.target.value)} 
                              className="text-black bg-white outline-none px-2 py-0.5 rounded-[3px] text-[13px] font-bold w-40 h-[24px]"
                          />
                          <button onClick={() => {}} className="bg-white text-black font-extrabold px-3 h-[24px] rounded-[3px] text-[12px] hover:bg-gray-200">CARI</button>
                      </div>
                      <button onClick={() => setShowHistoryModal(false)} className="hover:bg-red-600 px-2 py-0.5 font-bold">X</button>
                  </div>
                  <div className="p-3 bg-white border border-gray-400 mx-2 my-2 overflow-y-auto max-h-[400px]">
                      <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-[#ece9d8] sticky top-0 shadow-sm z-10 border-b border-gray-400">
                              <tr>
                                  <th className="p-2 border border-gray-400">FAKTUR</th>
                                  <th className="p-2 border border-gray-400">TANGGAL</th>
                                  <th className="p-2 border border-gray-400">PELANGGAN</th>
                                  <th className="p-2 border border-gray-400 w-24 text-right">TOTAL</th>
                                  <th className="p-2 border border-gray-400 text-center w-16">AKSI</th>
                              </tr>
                          </thead>
                          <tbody>
                              {transactions.slice().reverse().filter((t: any) => !searchNotaRetur || t.id.toLowerCase().includes(searchNotaRetur.toLowerCase())).slice(0, searchNotaRetur ? 200 : 50).map((t: any) => (
                                  <tr key={t.id} className="hover:bg-blue-50 border-b border-gray-300">
                                      <td className="p-2 border-r border-gray-400 font-bold">{t.id}</td>
                                      <td className="p-2 border-r border-gray-400">{t.date}</td>
                                      <td className="p-2 border-r border-gray-400 truncate max-w-[120px]">{t.customer}</td>
                                      <td className="p-2 border-r border-gray-400 font-medium text-right text-blue-900">{formatRp(t.total)}</td>
                                      <td className="p-2 text-center p-1">
                                          <button onClick={() => {
                                              const matchCust = customers.find((c: any) => c.name === t.customer);
                                              if (matchCust) setSelectedCustomerId(String(matchCust.id));
                                              
                                              const returnItems = t.items.filter((i: any) => i.qty > 0).map((item: any) => ({
                                                  ...item,
                                                  cartUniqueId: 'RET-' + item.id + '-' + Date.now() + Math.random(),
                                                  code: 'RETUR',
                                                  name: `(Retur) ${item.name}`,
                                                  price: Math.abs(item.price),
                                                  qty: item.qty,
                                                  originalQty: item.qty,
                                                  isReturn: true,
                                                  originalTrxId: t.id,
                                                  originalItemId: item.id
                                              }));
                                              // we just clear activeReturTrx since we don't need the banner anymore, and put items to cart
                                              setActiveReturTrx(null);
                                              setCart([...cart, ...returnItems]);
                                              setShowHistoryModal(false);
                                          }} className="bg-red-600 text-white px-2 py-1 font-bold text-xs hover:bg-red-700 shadow border border-red-800">Retur</button>
                                      </td>
                                  </tr>
                              ))}
                              {transactions.length === 0 && (
                                  <tr><td colSpan={5} className="p-4 text-center text-gray-500 font-bold">Tidak ada riwayat transaksi</td></tr>
                              )}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      )}

      {/* Bon Modal */}
      {showBonModal && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
              <div className="bg-[#ece9d8] border-2 border-gray-500 w-full max-w-md shadow-2xl flex flex-col">
                  <div className="bg-blue-900 text-white font-bold px-3 py-2 flex items-center justify-center shadow-sm relative">
                      <span>Catat Kasbon</span>
                      <button onClick={() => setShowBonModal(false)} className="bg-red-600 hover:bg-red-700 px-2 py-0.5 border border-white/50 shadow-sm leading-none font-bold absolute right-3">X</button>
                  </div>
                  <form onSubmit={handleAddBon} className="p-4 bg-white m-1 border border-gray-400">
                      <div className="flex flex-col gap-3 mb-4">
                         <label className="text-sm font-bold text-gray-700">Cabang</label>
                         <select required value={bonBranch} onChange={e => { setBonBranch(e.target.value); setBonEmployee(''); }} className="border border-gray-400 p-2 outline-none">
                            {(storeSettings.branches || ['Pusat']).map((b: string) => <option key={b} value={b}>{b}</option>)}
                         </select>

                         <label className="text-sm font-bold text-gray-700 mt-2">Pilih Karyawan</label>
                         <select required value={bonEmployee} onChange={e => setBonEmployee(e.target.value)} className="border border-gray-400 p-2 outline-none">
                            <option value="">-- Nama --</option>
                            {employees.filter((e: any) => e.branch === bonBranch || !e.branch).map((e: any) => <option key={e.id} value={e.name}>{e.name} ({e.position})</option>)}
                         </select>

                         <label className="text-sm font-bold text-gray-700 mt-2">Alasan Bon</label>
                         <input required type="text" value={bonReason} onChange={e => setBonReason(e.target.value)} className="border border-gray-400 p-2 outline-none" placeholder="Cth: Pinjam uang makan" />

                         <label className="text-sm font-bold text-gray-700 mt-2">Nominal (Rp)</label>
                         <input required type="text" value={bonAmount === "" ? "" : formatRp(Number(bonAmount) || 0)} onChange={e => { const val = e.target.value.replace(/\D/g, ''); setBonAmount(val); }} className="border border-gray-400 p-2 outline-none font-bold text-right" placeholder="Rp 0" />
                      </div>
                      
                      <div className="flex justify-end gap-2 text-sm mt-6">
                         <button type="button" onClick={() => setShowBonModal(false)} className="px-4 py-1.5 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold shadow-sm">Batal</button>
                         <button type="submit" className="px-4 py-1.5 border-2 border-red-800 bg-red-600 text-white hover:bg-red-700 font-bold shadow-sm">Simpan Bon</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Print Action Modal */}
      {printActionModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#ece9d8] border-2 border-gray-500 w-full max-w-md flex flex-col shadow-2xl">
            <div className="bg-[#000040] text-white px-3 py-1.5 flex items-center justify-between cursor-default">
              <span className="font-bold text-sm tracking-wide">PILIHAN CETAK</span>
              <button onClick={() => setPrintActionModal(false)} className="text-white hover:text-red-400 font-bold px-1">X</button>
            </div>
            <div className="p-4 bg-white border border-gray-400 mx-2 my-2">
              <p className="text-sm font-bold text-gray-800 text-center mb-4">Transaksi sudah divalidasi. Pilih metode pencetakan:</p>
              
              <div className="flex flex-col gap-4">
                 <button onClick={() => { 
                     setPrintActionModal(false); 
                     processTransaction(true); 
                 }} className="px-5 py-3 border-2 border-gray-500 bg-blue-100 hover:bg-blue-200 font-bold shadow-sm text-sm text-blue-900 border-b-4">
                     🖨️ Cetak Pakai Nota (Printer)
                 </button>

                 <div className="border-2 border-gray-400 p-3 bg-green-50 shadow-inner">
                    <p className="text-xs font-bold text-green-800 mb-2">📲 Cetak Online (Via WhatsApp)</p>
                    <form onSubmit={(e) => {
                         e.preventDefault();
                         if (!waNumber) return setConfirmAction({message: 'Silakan masukkan nomor WhatsApp!', isAlert: true});
                         setPrintActionModal(false);
                         processTransaction(false);
                         const dummyLink = 'https://navapos.com/nota/' + Date.now();
                         const text = encodeURIComponent(`Halo, Terimakasih telah berbelanja.. Berikut link nota Anda: ${dummyLink}`);
                         window.open(`https://web.whatsapp.com/send?phone=${waNumber.replace(/[^0-9]/g, '')}&text=${text}`, '_blank');
                    }} className="flex flex-col gap-2">
                        <input 
                            type="text" 
                            placeholder="Nomor WA (contoh: 0812...)" 
                            value={waNumber} 
                            onChange={(e) => setWaNumber(e.target.value)}
                            className="p-1.5 border border-gray-400 outline-none focus:border-green-600 text-sm w-full"
                        />
                        <button type="submit" className="w-full py-1.5 border-2 border-gray-500 bg-green-600 text-white font-bold text-xs hover:bg-green-700">Kirim Link Nota Via WA</button>
                    </form>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Action Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#ece9d8] border-2 border-gray-500 w-full max-w-sm flex flex-col shadow-2xl">
            <div className="bg-[#000040] text-white px-3 py-1.5 flex items-center justify-center cursor-default">
              <span className="font-bold text-sm tracking-wide">{confirmAction.isAlert ? 'PERHATIAN' : 'KONFIRMASI'}</span>
            </div>
            <div className="p-6 bg-white border border-gray-400 mx-2 my-2 text-center">
              <p className="text-sm font-bold text-gray-800 text-center mb-6">{confirmAction.message}</p>
              <div className="flex justify-center gap-3">
                {confirmAction.isAlert ? (
                   <button onClick={() => { confirmAction.onConfirm && confirmAction.onConfirm(); setConfirmAction(null); }} className="px-5 py-2 border-2 border-blue-900 bg-blue-700 text-white hover:bg-blue-800 font-bold shadow-sm text-xs">OK, MENGERTI</button>
                ) : (
                   <>
                     <button onClick={() => setConfirmAction(null)} className="px-5 py-2 border-2 border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold shadow-sm text-xs">BATAL</button>
                     <button onClick={() => { confirmAction.onConfirm && confirmAction.onConfirm(); setConfirmAction(null); }} className="px-5 py-2 border-2 border-blue-900 bg-blue-700 text-white hover:bg-blue-800 font-bold shadow-sm text-xs">YA, LANJUTKAN</button>
                   </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
