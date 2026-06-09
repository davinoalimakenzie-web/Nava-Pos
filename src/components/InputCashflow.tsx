import React, { useState, useMemo } from 'react';
import { CustomDatePicker } from './CustomDatePicker';
import { generateDummyData, RecordData } from './BukuBesar';

export interface CashflowRow {
  id: string;
  tglInput: Date;
  jenis: string;
  nota: string;
  teknisi: string;
  keterangan: string;
  biaya: number;
  pob: number;
  jasa: number;
  cashTf: string;
}

const parseNum = (val: string | number): number => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const isNegative = val.trim().startsWith('-');
  const parsed = parseInt(val.replace(/[^0-9]/g, ''), 10);
  return isNaN(parsed) ? 0 : (isNegative ? -parsed : parsed);
};

const formatCurrency = (amount: number) => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(absAmount).replace(/Rp\s?/, 'Rp ');
  return isNegative ? `-${formatted}` : formatted;
};

export const InputCashflow = () => {
  const [records, setRecords] = useState<CashflowRow[]>(() => {
    const saved = localStorage.getItem('POS_Cashflow');
    return saved ? JSON.parse(saved).map((r: any) => ({ ...r, tglInput: new Date(r.tglInput) })) : [];
  });
  
  // Persist to localStorage
  React.useEffect(() => {
    localStorage.setItem('POS_Cashflow', JSON.stringify(records));
  }, [records]);

  // Form State
  const [tglInput] = useState<Date>(new Date()); // frozen to today
  const [jenis, setJenis] = useState('NOTA');
  const [nota, setNota] = useState('');
  const [teknisi, setTeknisi] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [biaya, setBiaya] = useState('');
  const [pob, setPob] = useState('');
  const [jasa, setJasa] = useState('');
  const [cashTf, setCashTf] = useState('');
  const [status, setStatus] = useState(''); // Just to show if needed

  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const [simpanModalOpen, setSimpanModalOpen] = useState(false);
  const [alertModal, setAlertModal] = useState<{ open: boolean, message: string }>({ open: false, message: '' });
  const [confirmHapusOpen, setConfirmHapusOpen] = useState(false);

  // Filters
  const [filterDari, setFilterDari] = useState<Date | null>(new Date());
  const [filterSampai, setFilterSampai] = useState<Date | null>(new Date());
  const [filterJenis, setFilterJenis] = useState('');
  const [filterCashTf, setFilterCashTf] = useState('');

  const isPengeluaran = jenis === 'PENGELUARAN';
  const isBon = jenis === 'BON';

  const handleClear = () => {
    setJenis('NOTA');
    setNota('');
    setTeknisi('');
    setKeterangan('');
    setBiaya('');
    setPob('');
    setJasa('');
    setCashTf('');
    setStatus('');
    setSelectedRowId(null);
  };

  const panggilDariBukuBesar = (bukuBesarItem: RecordData | undefined) => {
      // Called either from PANGGIL button or directly
      if (!bukuBesarItem) {
        setAlertModal({ open: true, message: "Nota tidak ditemukan di Buku Besar!" });
        return;
      }
      if (bukuBesarItem.status !== 'DONE AMBIL') {
        setAlertModal({ open: true, message: "Peringatan: Status nota ini belum 'DONE AMBIL'!" });
        return;
      }

      setTeknisi(bukuBesarItem.teknisi || '');
      setKeterangan(bukuBesarItem.keluhan || '');
      setBiaya(bukuBesarItem.biaya ? bukuBesarItem.biaya.toString() : '');
      setPob(bukuBesarItem.part ? bukuBesarItem.part.toString() : '');
      setJasa(bukuBesarItem.jasa ? bukuBesarItem.jasa.toString() : '');
      setCashTf(bukuBesarItem.cashTf || '');
      setStatus(bukuBesarItem.status || '');
  }

  const handlePanggil = () => {
    if (!nota) return;
    const bbRecords = generateDummyData();
    const item = bbRecords.find(r => r.nota.toLowerCase() === nota.toLowerCase());
    panggilDariBukuBesar(item);
  };

  const handleSimpanClick = () => {
    setSimpanModalOpen(true);
  };

  const confirmSimpan = () => {
    const newRecord: CashflowRow = {
      id: Date.now().toString(),
      tglInput: tglInput,
      jenis,
      nota,
      teknisi,
      keterangan,
      biaya: parseNum(biaya),
      pob: parseNum(pob),
      jasa: parseNum(jasa),
      cashTf
    };
    setRecords([newRecord, ...records]);
    setSimpanModalOpen(false);
    handleClear();
  };

  const handleHapus = () => {
    if (!selectedRowId) return;
    setConfirmHapusOpen(true);
  };
  
  const finishHapus = () => {
    if (!selectedRowId) return;
    setRecords(records.filter(r => r.id !== selectedRowId));
    setSelectedRowId(null);
    setConfirmHapusOpen(false);
  };

  const [sortConfig, setSortConfig] = useState<{ key: keyof CashflowRow; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof CashflowRow) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // derived metrics
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (filterDari && filterSampai && r.tglInput) {
        const rTime = r.tglInput.getTime();
        const start = new Date(filterDari.getFullYear(), filterDari.getMonth(), filterDari.getDate()).getTime();
        const endDay = new Date(filterSampai.getFullYear(), filterSampai.getMonth(), filterSampai.getDate());
        endDay.setHours(23,59,59,999);
        const end = endDay.getTime();
        if (rTime < start || rTime > end) return false;
      }
      if (filterJenis && r.jenis !== filterJenis) return false;
      if (filterCashTf && r.cashTf !== filterCashTf) return false;
      return true;
    });
  }, [records, filterDari, filterSampai, filterJenis, filterCashTf]);

  const sortedFilteredRecords = useMemo(() => {
    let sortableItems = [...filteredRecords];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'tglInput') {
           aValue = (aValue as Date)?.getTime() || 0;
           bValue = (bValue as Date)?.getTime() || 0;
        }

        if (aValue === null) aValue = '';
        if (bValue === null) bValue = '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredRecords, sortConfig]);

  const uangMasuk = filteredRecords.filter(r => r.jenis === 'NOTA').reduce((sum, r) => sum + r.biaya, 0);
  const uangKeluar = filteredRecords.filter(r => r.jenis === 'PENGELUARAN' || r.jenis === 'BON').reduce((sum, r) => sum + r.pob, 0); // POB used as nominal for pengeluaran? wait, pengeluaran reduces what? pob? Wait we need to check how to calculate total. Typically pengeluaran/bon uses 'POB' as the amount field?
  
  // Stats for Buku Besar records
  const allBBRecords = generateDummyData();
  const todayStr_ = new Date().toDateString();
  const currentMonth_ = new Date().getMonth();
  const currentYear_ = new Date().getFullYear();

  const todayBBFiltered = allBBRecords.filter(r => r.tglMasuk && new Date(r.tglMasuk).toDateString() === todayStr_);
  const todayStats = {
    progress: todayBBFiltered.filter(r => r.status === 'PROGRESS').length,
    done: todayBBFiltered.filter(r => r.status === 'DONE').length,
    ambil: todayBBFiltered.filter(r => r.status === 'DONE AMBIL').length,
    cancel: todayBBFiltered.filter(r => r.status === 'CANCEL' || r.status === 'CANCEL AMBIL').length,
  };

  const monthBBFiltered = allBBRecords.filter(r => {
    if (!r.tglMasuk) return false;
    const d = new Date(r.tglMasuk);
    return d.getMonth() === currentMonth_ && d.getFullYear() === currentYear_;
  });
  const monthStats = {
    progress: monthBBFiltered.filter(r => r.status === 'PROGRESS').length,
    done: monthBBFiltered.filter(r => r.status === 'DONE').length,
    ambil: monthBBFiltered.filter(r => r.status === 'DONE AMBIL').length,
    cancel: monthBBFiltered.filter(r => r.status === 'CANCEL' || r.status === 'CANCEL AMBIL').length,
  };
  
  const handleJenisChange = (val: string) => {
    setJenis(val);
    setNota('');
    setTeknisi('');
    setKeterangan('');
    setBiaya('');
    setPob('');
    setJasa('');
    setCashTf('');
    setStatus('');
  };

  return (
    <div className="flex-1 flex bg-[#3B0709] text-white p-2 gap-2 h-full overflow-hidden text-[13px] font-sans">
      
      {/* Left Form Panel */}
      <div className="w-[320px] flex flex-col shrink-0">
        <div className="flex flex-col gap-2 p-2 h-full relative">
          
          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">TGL INPUT</label>
            <div className="flex-1">
              <CustomDatePicker value={tglInput} className="w-full h-[26px] opacity-70 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">JENIS</label>
            <select 
              value={jenis}
              onChange={e => handleJenisChange(e.target.value)}
              className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px]"
            >
              <option value="NOTA">NOTA</option>
              <option value="PENGELUARAN">PENGELUARAN</option>
              <option value="BON">BON</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">NOTA</label>
            <div className="flex-1 flex gap-1">
              <input 
                type="text" 
                value={nota}
                onChange={e => setNota(e.target.value.toUpperCase())}
                disabled={isPengeluaran || isBon}
                className={`w-full bg-white text-black px-1 py-0.5 outline-none h-[26px] ${(isPengeluaran || isBon) ? 'opacity-50' : ''}`} 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePanggil();
                }}
              />
              <button 
                onClick={handlePanggil}
                disabled={isPengeluaran || isBon}
                className={`bg-white text-black px-2 font-bold hover:bg-gray-200 shrink-0 h-[26px] ${(isPengeluaran || isBon) ? 'opacity-50' : ''}`}
              >
                PANGGIL
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">TEKNISI</label>
            <select 
              value={teknisi}
              onChange={e => setTeknisi(e.target.value)}
              disabled={jenis === 'NOTA' || isPengeluaran}
              className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${(jenis === 'NOTA' || isPengeluaran) ? 'opacity-50' : ''}`}
            >
              <option value=""></option>
              <option value="AND">AND</option>
              <option value="IRF">IRF</option>
              <option value="SMD">SMD</option>
              <option value="UDN">UDN</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">KETERANGAN</label>
            <input 
              type="text" 
              value={keterangan}
              onChange={e => setKeterangan(e.target.value.toUpperCase())}
              disabled={jenis === 'NOTA'}
              className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${jenis === 'NOTA' ? 'opacity-50' : ''}`} 
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">BIAYA</label>
            <input 
              type="text" 
              value={biaya}
              onChange={e => setBiaya(e.target.value)}
              disabled={typeof biaya === 'string' && false} // let it be disabled for all except we cannot edit from NOTA, or we can?
              readOnly={jenis === 'NOTA' || isPengeluaran || isBon} // wait all of them are frozen for biaya if pengeluaran or bon? Yes, prompt says biaya frozen for pengeluaran & bon.
              className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${(jenis === 'NOTA' || isPengeluaran || isBon) ? 'opacity-50' : ''}`} 
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">P. O. B.</label>
            <input 
               type="text" 
               value={pob}
               onChange={e => setPob(e.target.value)}
               disabled={jenis === 'NOTA'}
               className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${jenis === 'NOTA' ? 'opacity-50' : ''}`} 
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">JASA</label>
            <input 
              type="text" 
              value={jasa}
              onChange={e => setJasa(e.target.value)}
              readOnly={jenis === 'NOTA' || isPengeluaran || isBon}
              className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${(jenis === 'NOTA' || isPengeluaran || isBon) ? 'opacity-50' : ''}`} 
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">CASH / TF</label>
            <select 
               value={cashTf}
               onChange={e => setCashTf(e.target.value)}
               disabled={jenis === 'NOTA' || isPengeluaran || isBon}
               className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${(jenis === 'NOTA' || isPengeluaran || isBon) ? 'opacity-50' : ''}`}
            >
              <option value=""></option>
              <option value="CASH">CASH</option>
              <option value="TF">TF</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">STATUS</label>
            <input 
               type="text" 
               value={status}
               readOnly 
               className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] opacity-50" 
            />
          </div>

          <div className="flex items-center gap-2 mt-4 select-none w-full">
            <button 
              onClick={handleHapus} 
              disabled={!selectedRowId} 
              className={`flex-1 h-8 font-bold text-xs rounded-sm transition-colors flex items-center justify-center shadow ${
                selectedRowId 
                  ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer' 
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
              }`}
            >
              HAPUS
            </button>
            <button 
              onClick={handleClear} 
              className="flex-1 h-8 bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors rounded-sm flex items-center justify-center shadow"
            >
              CLEAR
            </button>
            <button 
              onClick={handleSimpanClick} 
              className="flex-1 h-8 bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors rounded-sm flex items-center justify-center shadow"
            >
              SIMPAN
            </button>
          </div>

          <div className="mt-4 w-full h-[90px] border border-red-900/50 bg-[#260405] rounded-sm p-1.5 flex flex-col text-[11px] justify-between shadow-inner overflow-hidden select-none">
            <div className="flex flex-col h-full justify-between">
              <div className="border-b border-red-950 pb-0.5 mb-0.5 font-bold text-red-200 uppercase tracking-wider text-[9px]">
                <span>RINGKASAN STATUS HARI INI</span>
              </div>
              <div className="grid grid-cols-2 gap-x-1.5 gap-y-1 py-0.5">
                <div className="flex justify-between items-center bg-yellow-950/40 px-1 py-0.5 rounded-sm border border-yellow-900/50">
                  <span className="text-slate-300 font-medium">PROGRESS:</span>
                  <span className="font-bold text-yellow-400">{todayStats.progress}</span>
                </div>
                <div className="flex justify-between items-center bg-emerald-950/40 px-1 py-0.5 rounded-sm border border-emerald-900/50">
                  <span className="text-slate-300 font-medium">DONE:</span>
                  <span className="font-bold text-emerald-400">{todayStats.done}</span>
                </div>
                <div className="flex justify-between items-center bg-blue-950/40 px-1 py-0.5 rounded-sm border border-blue-900/50">
                  <span className="text-slate-300 font-medium">AMBIL:</span>
                  <span className="font-bold text-blue-400">{todayStats.ambil}</span>
                </div>
                <div className="flex justify-between items-center bg-red-950/40 px-1 py-0.5 rounded-sm border border-red-900/50">
                  <span className="text-slate-300 font-medium">CANCEL:</span>
                  <span className="font-bold text-red-400">{todayStats.cancel}</span>
                </div>
              </div>
              <div className="text-[9px] text-red-300/60 text-center italic border-t border-red-950 pt-1 leading-none">
                Klik ganda baris tabel untuk edit.
              </div>
            </div>
          </div>

          <div className="mt-2 w-full h-[76px] border border-red-900/50 bg-[#260405] rounded-sm p-1.5 flex flex-col text-[11px] justify-between shadow-inner overflow-hidden select-none">
            <div className="flex flex-col h-full justify-between">
              <div className="border-b border-red-950 pb-0.5 mb-0.5 font-bold text-red-200 uppercase tracking-wider text-[9px]">
                <span>RINGKASAN STATUS BULAN INI</span>
              </div>
              <div className="grid grid-cols-2 gap-x-1.5 gap-y-1 py-0.5">
                <div className="flex justify-between items-center bg-yellow-950/40 px-1 py-0.5 rounded-sm border border-yellow-900/50">
                  <span className="text-slate-300 font-medium">PROGRESS:</span>
                  <span className="font-bold text-yellow-400">{monthStats.progress}</span>
                </div>
                <div className="flex justify-between items-center bg-emerald-950/40 px-1 py-0.5 rounded-sm border border-emerald-900/50">
                  <span className="text-slate-300 font-medium">DONE:</span>
                  <span className="font-bold text-emerald-400">{monthStats.done}</span>
                </div>
                <div className="flex justify-between items-center bg-blue-950/40 px-1 py-0.5 rounded-sm border border-blue-900/50">
                  <span className="text-slate-300 font-medium">AMBIL:</span>
                  <span className="font-bold text-blue-400">{monthStats.ambil}</span>
                </div>
                <div className="flex justify-between items-center bg-red-950/40 px-1 py-0.5 rounded-sm border border-red-900/50">
                  <span className="text-slate-300 font-medium">CANCEL:</span>
                  <span className="font-bold text-red-400">{monthStats.cancel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIMPAN MODAL */}
          {simpanModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
               <div className="bg-white text-black p-4 outline outline-2 outline-blue-500 w-[250px] shadow-lg">
                  <p className="font-bold text-center mb-4">Simpan Nota ini ke Cashflow?</p>
                  <div className="flex justify-between mt-4">
                     <button onClick={() => setSimpanModalOpen(false)} className="px-4 py-1 bg-gray-200 border border-gray-400 font-bold hover:bg-gray-300">BATAL</button>
                     <button onClick={confirmSimpan} className="px-4 py-1 bg-[#1e40af] text-white border border-[#1e40af] font-bold hover:bg-blue-700">YA</button>
                  </div>
               </div>
            </div>
          )}

          {/* ALERT MODAL */}
          {alertModal.open && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
               <div className="bg-white text-black p-4 outline outline-2 outline-red-500 w-[280px] shadow-lg">
                  <p className="font-bold text-center mb-4 whitespace-pre-wrap">{alertModal.message}</p>
                  <div className="flex justify-center mt-4">
                     <button onClick={() => setAlertModal({ open: false, message: '' })} className="px-6 py-1 bg-gray-200 border border-gray-400 font-bold hover:bg-gray-300">OK</button>
                  </div>
               </div>
            </div>
          )}

          {/* CONFIRM HAPUS MODAL */}
          {confirmHapusOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
               <div className="bg-white text-black p-4 outline outline-2 outline-red-500 w-[250px] shadow-lg">
                  <p className="font-bold text-center mb-4">Hapus baris yang dipilih?</p>
                  <div className="flex justify-between mt-4">
                     <button onClick={() => setConfirmHapusOpen(false)} className="px-4 py-1 bg-gray-200 border border-gray-400 font-bold hover:bg-gray-300">BATAL</button>
                     <button onClick={finishHapus} className="px-4 py-1 bg-red-600 text-white border border-red-700 font-bold hover:bg-red-700">HAPUS</button>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* Right Content Panel */}
      <div className="flex-1 flex flex-col border border-white p-1 ml-2">
        
        {/* Filter Header */}
        <div className="flex items-end gap-4 mb-2 p-1 w-full">
          <div className="flex flex-col gap-1 w-44">
            <label className="text-[13px]">Dari Tanggal</label>
            <CustomDatePicker value={filterDari} onChange={setFilterDari} className="h-[26px]" />
          </div>
          <div className="flex flex-col gap-1 w-44">
            <label className="text-[13px]">Sampai Tanggal</label>
            <CustomDatePicker value={filterSampai} onChange={setFilterSampai} className="h-[26px]" />
          </div>
          <div className="flex flex-col gap-1 w-44">
            <label className="text-[13px]">Jenis</label>
            <select value={filterJenis} onChange={e => setFilterJenis(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-[26px]">
              <option value=""></option>
              <option value="NOTA">NOTA</option>
              <option value="PENGELUARAN">PENGELUARAN</option>
              <option value="BON">BON</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-28">
            <label className="text-[13px]">Cash / TF</label>
            <select value={filterCashTf} onChange={e => setFilterCashTf(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-[26px]">
              <option value=""></option>
              <option value="CASH">CASH</option>
              <option value="TF">TF</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>
          <div className="ml-auto flex items-end">
            <button onClick={() => {
              setFilterDari(new Date()); setFilterSampai(new Date()); setFilterJenis(''); setFilterCashTf('');
            }} className="bg-white text-black px-4 py-0.5 hover:bg-gray-200 font-bold h-[26px]">RESET</button>
          </div>
        </div>

        {/* Table wrapper */}
        <div className="flex-1 bg-[#a3b1c6] overflow-auto border border-gray-400">
          <table className="w-full text-black text-[13px]">
            <thead className="bg-[#f0f0f0] text-black sticky top-0 z-10 border-b-2 border-gray-400 shadow-sm">
              <tr>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('tglInput')}>TGL INPUT {sortConfig?.key === 'tglInput' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('jenis')}>JENIS {sortConfig?.key === 'jenis' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('nota')}>NOTA {sortConfig?.key === 'nota' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('teknisi')}>TEKNISI {sortConfig?.key === 'teknisi' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('keterangan')}>KETERANGAN {sortConfig?.key === 'keterangan' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('biaya')}>BIAYA {sortConfig?.key === 'biaya' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('pob')}>P.O.B. {sortConfig?.key === 'pob' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('jasa')}>JASA {sortConfig?.key === 'jasa' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
                <th className="px-2 py-1 font-bold text-center cursor-pointer select-none" onClick={() => handleSort('cashTf')}>BAYAR {sortConfig?.key === 'cashTf' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedFilteredRecords.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => setSelectedRowId(row.id)}
                  className={`border-b border-gray-300 transition-colors cursor-pointer ${selectedRowId === row.id ? 'bg-[#007acc] text-white' : 'hover:bg-gray-100'}`}
                >
                  <td className="px-2 py-1 border-r border-gray-300 text-center">{row.tglInput.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td className={`px-2 py-1 border-r border-gray-300 text-center ${row.jenis === 'PENGELUARAN' && selectedRowId !== row.id ? 'bg-[#ff0000] text-white font-normal' : row.jenis === 'PENGELUARAN' && selectedRowId === row.id ? 'bg-[#ff0000] text-white' : ''}`}>{row.jenis}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-center">{row.nota}</td>
                  <td className={`px-2 py-1 border-r border-gray-300 text-center ${row.teknisi === 'AND' ? 'bg-[#98fb98] text-black' : row.teknisi === 'IRF' ? 'bg-[#e0e0e0] text-black' : row.teknisi === 'SMD' ? 'bg-[#dda0dd] text-black' : row.teknisi === 'UDN' ? 'bg-[#ffffe0] text-black' : ''}`}>{row.teknisi}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-left pl-2">{row.keterangan}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-right pr-2 font-medium">{row.biaya ? formatCurrency(row.biaya) : ''}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-right pr-2 font-medium">{row.pob ? formatCurrency(row.pob) : ''}</td>
                  <td className={`px-2 py-1 border-r border-gray-300 text-right pr-2 font-medium ${row.jasa && row.jasa < 0 ? 'text-red-500' : ''}`}>{row.jasa ? formatCurrency(row.jasa) : ''}</td>
                  <td className="px-2 py-1 text-center">{row.cashTf}</td>
                </tr>
              ))}
              {sortedFilteredRecords.length === 0 && (
                 <tr>
                    <td colSpan={9} className="p-4 text-center text-gray-500 bg-white">Belum ada cashflow.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary Panel */}
        {(() => {
           let totalBiaya = 0;
           let totalPob = 0;
           let totalJasa = 0;
           let cashTfSum = 0;
           // The prompt actually didn't explicitly say how Uang Masuk / Keluar should be calculated,
           // but traditionally:
           // Uang Masuk = all positive Biaya for NOTA.
           // Uang Keluar = all positive POB for PENGELUARAN/BON ?
           // from screenshot: Uang Masuk Rp 3.286.000, Keluar 865.000
           // I will just sum Biaya for Masuk, and sum POB for Keluar.
           // Total = Uang Masuk - Uang Keluar.
           const { inTotal, cashTotal, outTotal, qrisTotal } = filteredRecords.reduce((acc, r) => {
              const biaya = r.biaya || 0;
              const pob = r.pob || 0;
              
              // Uang laci / Total Biaya
              acc.inTotal += biaya;
              
              // Uang masuk = total biaya yg jenis cash
              if (r.cashTf === 'CASH') {
                 acc.cashTotal += biaya;
              }

              // Uang keluar = total POB
              acc.outTotal += pob;

              // TF/QRIS = biaya yg jenis TF/QRIS
              if (r.cashTf === 'TF' || r.cashTf === 'QRIS') {
                 acc.qrisTotal += biaya;
              }

              return acc;
           }, { inTotal: 0, cashTotal: 0, outTotal: 0, qrisTotal: 0 });
           
           // Rumus: uang laci - uang keluar = total, total - TF/Qris = uang laci fix
           // (Asumsikan "uang laci" adalah inTotal atau semua biaya)
           const total = inTotal - outTotal;
           const laciFix = total - qrisTotal;

           return (
              <div className="flex gap-2 mt-3 w-full font-bold select-none">
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-wider opacity-90 mb-0.5 text-left truncate">Uang Masuk</span>
                  <div className="bg-[#ccffff] text-black font-bold text-right px-2 py-1 text-[13px] border border-gray-500 shadow-sm tracking-tight truncate">{formatCurrency(cashTotal)}</div>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-wider opacity-90 mb-0.5 text-left truncate">Uang Keluar</span>
                  <div className="bg-[#ccffff] text-black font-bold text-right px-2 py-1 text-[13px] border border-gray-500 shadow-sm tracking-tight truncate">{formatCurrency(outTotal)}</div>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-wider opacity-90 mb-0.5 text-left truncate">Total</span>
                  <div className="bg-[#ccffff] text-black font-bold text-right px-2 py-1 text-[13px] border border-gray-500 shadow-sm tracking-tight truncate">{formatCurrency(total)}</div>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-wider opacity-90 mb-0.5 text-left truncate">TF / QRIS</span>
                  <div className="bg-[#ffffcc] text-black font-bold text-right px-2 py-1 text-[13px] border border-gray-500 shadow-sm tracking-tight truncate">{formatCurrency(qrisTotal)}</div>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] uppercase tracking-wider opacity-90 mb-0.5 text-left truncate font-bold text-blue-100">Uang Laci Flx</span>
                  <div className="bg-[#000080] text-white font-bold text-right px-2 py-1 text-[13px] border border-gray-500 shadow-sm tracking-tight truncate">{formatCurrency(laciFix)}</div>
                </div>
              </div>
           );
        })()}

      </div>

    </div>
  );
};
