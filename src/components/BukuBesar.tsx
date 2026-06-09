import React, { useState } from 'react';
import { CustomDatePicker } from './CustomDatePicker';

export interface RecordData {
  id: string;
  nota: string;
  teknisi: string;
  namaUser: string;
  noWaUser: string;
  device: string;
  keluhan: string;
  status: string;
  garansi: string;
  tglMasuk: Date | null;
  biaya: string;
  part: string;
  jasa: number;
  tglAmbil: Date | null;
  cashTf: string;
  logMessage?: string;
}

const getTeknisiBgColor = (tek: string) => {
  switch (tek) {
    case 'AND': return '#00cc00';
    case 'IRF': return '#114edc';
    case 'SMD': return '#a930b0';
    case 'UDN': return '#e6e600';
    default: return 'white';
  }
};

const getTeknisiTextColor = (tek: string) => {
  if (tek === 'UDN') return 'black';
  if (tek) return 'white';
  return 'black';
};

const getStatusBgColor = (stat: string) => {
  switch (stat) {
    case 'PROGRESS': return '#e6e600';
    case 'DONE': return '#00cc00';
    case 'DONE AMBIL': return '#114edc';
    case 'CANCEL': return '#ff8c00';
    case 'CANCEL AMBIL': return '#cc0000';
    default: return 'white';
  }
};

const getStatusTextColor = (stat: string) => {
  if (stat === 'PROGRESS') return 'black';
  if (stat) return 'white';
  return 'black';
};

const formatCurrency = (amount: number) => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(absAmount).replace(/Rp\s?/, 'Rp ');
  return isNegative ? `-${formatted}` : formatted;
};

const parseNum = (val: string | number) => {
  if (typeof val === 'number') return val;
  if (!val) return 0;
  const isNegative = val.trim().startsWith('-');
  const parsed = parseInt(val.replace(/[^0-9]/g, ''), 10);
  return isNaN(parsed) ? 0 : (isNegative ? -parsed : parsed);
};

const formatDateToDDMMYYYY = (d: Date | null) => {
  if (!d) return '';
  const dateObj = new Date(d);
  if (isNaN(dateObj.getTime())) return '';
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

let cachedRecords: RecordData[] | null = null;

export const generateDummyData = (): RecordData[] => {
  if (cachedRecords) return cachedRecords;
  const dummy: RecordData[] = [];
  const teknisiList = ['AND', 'IRF', 'SMD', 'UDN'];
  const statusList = ['PROGRESS', 'DONE', 'DONE AMBIL', 'CANCEL', 'CANCEL AMBIL'];
  const cashTfList = ['CASH', 'TF', 'QRIS'];
  
  let idCounter = 1;
  const today = new Date();
  
  for (let d = 1; d <= today.getDate(); d++) {
    const date = new Date(today.getFullYear(), today.getMonth(), d);
    for (let i = 0; i < 10; i++) {
        const status = statusList[Math.floor(Math.random() * statusList.length)];
        const tech = teknisiList[Math.floor(Math.random() * teknisiList.length)];
        
        let tglSelesai = new Date(date);
        tglSelesai.setHours(date.getHours() + Math.floor(Math.random() * 24));
        
        let total = Math.floor(Math.random() * 50) * 10000 + 50000;
        let modal = Math.floor((total * 0.3) / 10000) * 10000;
        let pph = Math.floor((total * 0.05) / 10000) * 10000;
        let feeTeknisi = Math.floor((total * 0.2) / 10000) * 10000;
        let jasa = total - modal - pph - feeTeknisi;
        
        let tglAmbil = new Date(tglSelesai);
        tglAmbil.setHours(tglAmbil.getHours() + Math.floor(Math.random() * 24));
        let cashTf = cashTfList[Math.floor(Math.random() * cashTfList.length)];

        dummy.push({
            id: `INV-${idCounter}`,
            nota: String(idCounter + 13000),
            teknisi: tech,
            namaUser: `User ${idCounter}`,
            noWaUser: `0812${Math.floor(Math.random() * 100000000)}`,
            device: `Model ${Math.floor(Math.random() * 5)}`,
            keluhan: `Kerusakan ${Math.floor(Math.random() * 5)}`,
            tglMasuk: new Date(date),
            status: status,
            garansi: Math.random() > 0.5 ? '1 Bulan' : 'Tidak Ada',
            biaya: total > 0 ? total.toString() : '',
            part: modal > 0 ? modal.toString() : '',
            jasa: jasa,
            tglAmbil: tglAmbil,
            cashTf: cashTf || '',
        });
        idCounter++;
    }
  }
  cachedRecords = dummy.reverse();
  return cachedRecords; // Newest first
};

export const BukuBesar = () => {
  const [records, setRecords] = useState<RecordData[]>(generateDummyData());
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const [filterDariTanggal, setFilterDariTanggal] = useState<Date | null>(new Date());
  const [filterSampaiTanggal, setFilterSampaiTanggal] = useState<Date | null>(new Date());
  const [filterTeknisi, setFilterTeknisi] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCashTf, setFilterCashTf] = useState('');
  const [filterNoNotaInput, setFilterNoNotaInput] = useState('');
  const [filterNoNotaApplied, setFilterNoNotaApplied] = useState('');
  
  const [sortConfig, setSortConfig] = useState<{ key: keyof RecordData; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: keyof RecordData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleResetFilter = () => {
    const today = new Date();
    setFilterDariTanggal(new Date(today.getFullYear(), today.getMonth(), 1));
    setFilterSampaiTanggal(today);
    setFilterTeknisi('');
    setFilterStatus('');
    setFilterCashTf('');
    setFilterNoNotaInput('');
    setFilterNoNotaApplied('');
  };

  const formatDateForInput = (d: Date | null) => {
    if (!d) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearchClick = () => {
    setFilterNoNotaApplied(filterNoNotaInput);
  };

  const filteredRecords = records.filter(record => {
    if (filterNoNotaApplied && !record.nota.toLowerCase().includes(filterNoNotaApplied.toLowerCase())) {
      return false;
    }
    
    if (filterTeknisi && record.teknisi !== filterTeknisi) {
      return false;
    }

    if (filterStatus) {
      if (filterStatus === 'NGGANDUL') {
        if (!['PROGRESS', 'DONE', 'CANCEL'].includes(record.status)) {
          return false;
        }
      } else if (record.status !== filterStatus) {
        return false;
      }
    }

    if (filterCashTf && record.cashTf !== filterCashTf) {
      return false;
    }

    if (!filterNoNotaApplied && record.tglMasuk) {
      const incoming = new Date(record.tglMasuk);
      incoming.setHours(0, 0, 0, 0);

      if (filterDariTanggal) {
        const start = new Date(filterDariTanggal);
        start.setHours(0, 0, 0, 0);
        if (incoming < start) return false;
      }

      if (filterSampaiTanggal) {
        const end = new Date(filterSampaiTanggal);
        end.setHours(23, 59, 59, 999);
        if (incoming > end) return false;
      }
    } else if (!filterNoNotaApplied && !record.tglMasuk) {
      if (filterDariTanggal || filterSampaiTanggal) return false;
    }

    return true;
  });

  const sortedFilteredRecords = React.useMemo(() => {
    let sortableItems = [...filteredRecords];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        if (sortConfig.key === 'biaya' || sortConfig.key === 'part') {
           aValue = parseNum(aValue as string);
           bValue = parseNum(bValue as string);
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

  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logInput, setLogInput] = useState('');
  
  const handleLogClick = () => {
    if (!selectedRecordId) {
      return;
    }
    setLogModalOpen(true);
    setLogInput('');
  };

  const submitLog = () => {
    if (logInput.trim() !== '') {
      const updatedRecords = records.map(r => {
        if (r.id === selectedRecordId) {
          const timestamp = new Date().toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
          const newLog = `[${timestamp}] ${logInput.trim()}`;
          return { ...r, logMessage: r.logMessage ? `${r.logMessage}\n${newLog}` : newLog };
        }
        return r;
      });
      setRecords(updatedRecords);
    }
    setLogModalOpen(false);
  };



  const [nota, setNota] = useState('');
  const [teknisi, setTeknisi] = useState('');
  const [namaUser, setNamaUser] = useState('');
  const [noWaUser, setNoWaUser] = useState('');
  const [device, setDevice] = useState('');
  const [keluhan, setKeluhan] = useState('');
  const [status, setStatus] = useState('');
  const [garansi, setGaransi] = useState('');
  const [tglMasuk, setTglMasuk] = useState<Date | null>(new Date());
  const [biaya, setBiaya] = useState('');
  const [part, setPart] = useState('');
  const [tglAmbil, setTglAmbil] = useState<Date | null>(new Date());
  const [cashTf, setCashTf] = useState('');

  const biayaNum = parseNum(biaya);
  const partNum = parseNum(part);
  const jasa = biayaNum - partNum;

  const handleClear = () => {
    setSelectedRecordId(null);
    setNota('');
    setTeknisi('');
    setNamaUser('');
    setNoWaUser('');
    setDevice('');
    setKeluhan('');
    setStatus('');
    setGaransi('');
    setTglMasuk(new Date());
    setBiaya('');
    setPart('');
    setTglAmbil(new Date());
    setCashTf('');
  };

  const handleSimpan = () => {
    const newRecord: RecordData = {
      id: selectedRecordId || Date.now().toString(),
      nota,
      teknisi,
      namaUser,
      noWaUser,
      device,
      keluhan,
      status,
      garansi,
      tglMasuk,
      biaya,
      part,
      jasa,
      tglAmbil: status.includes('AMBIL') || cashTf ? tglAmbil : null,
      cashTf
    };

    if (selectedRecordId) {
      const u = records.map(r => r.id === selectedRecordId ? { ...r, ...newRecord, logMessage: r.logMessage } : r);
      setRecords(u);
      cachedRecords = u;
    } else {
      const u = [newRecord, ...records];
      setRecords(u);
      cachedRecords = u;
    }
    handleClear();
  };

  const handleHapus = () => {
    if (selectedRecordId) {
      const u = records.filter(r => r.id !== selectedRecordId);
      setRecords(u);
      cachedRecords = u;
      handleClear();
    }
  };

  const handleEdit = (record: RecordData) => {
    setSelectedRecordId(record.id);
    setNota(record.nota);
    setTeknisi(record.teknisi);
    setNamaUser(record.namaUser);
    setNoWaUser(record.noWaUser);
    setDevice(record.device);
    setKeluhan(record.keluhan);
    setStatus(record.status);
    setGaransi(record.garansi);
    setTglMasuk(record.tglMasuk);
    setBiaya(record.biaya);
    setPart(record.part);
    setTglAmbil(record.tglAmbil || new Date());
    setCashTf(record.cashTf);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050B24] text-white p-2 h-full overflow-hidden text-[13px] font-sans">
      {logModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white text-black p-4 w-[400px] shadow-lg flex flex-col gap-3 border border-gray-400">
            <h3 className="font-bold border-b border-gray-300 pb-2 text-sm">Tambah Log Message</h3>
            <textarea 
               className="w-full border border-gray-300 p-2 outline-none h-24 text-sm" 
               placeholder="Tulis pesan atau log teknisi..."
               value={logInput}
               onChange={e => setLogInput(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setLogModalOpen(false)} className="px-4 py-1.5 border border-gray-400 hover:bg-gray-100 font-bold text-xs transition-colors">BATAL</button>
              <button onClick={submitLog} className="px-4 py-1.5 bg-[#1e2b6b] text-white hover:bg-[#2a3c94] font-bold text-xs transition-colors">SIMPAN LOG</button>
            </div>
          </div>
        </div>
      )}

      {/* Top Form Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 mb-2">
        {/* Column 1 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">NOTA</label>
            <input type="text" value={nota} onChange={e => setNota(e.target.value.toUpperCase())} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">TEKNISI</label>
            <select 
              value={teknisi} 
              onChange={e => setTeknisi(e.target.value)} 
              className="flex-1 outline-none h-[26px] px-1 py-0.5"
              style={{ backgroundColor: getTeknisiBgColor(teknisi), color: getTeknisiTextColor(teknisi) }}
            >
              <option value=""></option>
              <option value="AND">AND</option>
              <option value="IRF">IRF</option>
              <option value="SMD">SMD</option>
              <option value="UDN">UDN</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">NAMA USER</label>
            <input type="text" value={namaUser} onChange={e => setNamaUser(e.target.value.toUpperCase())} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">NO. WA USER</label>
            <input type="text" value={noWaUser} onChange={e => setNoWaUser(e.target.value.toUpperCase())} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px]" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">DEVICE</label>
            <input type="text" value={device} onChange={e => setDevice(e.target.value.toUpperCase())} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">KELUHAN</label>
            <input type="text" value={keluhan} onChange={e => setKeluhan(e.target.value.toUpperCase())} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">STATUS</label>
            <select 
              value={status} 
              onChange={e => {
                const newStatus = e.target.value;
                setStatus(newStatus);
                if (newStatus === 'CANCEL AMBIL') {
                  setBiaya('');
                  setPart('');
                  setCashTf('');
                }
              }} 
              className="flex-1 outline-none h-[26px] px-1 py-0.5"
              style={{ backgroundColor: getStatusBgColor(status), color: getStatusTextColor(status) }}
            >
              <option value=""></option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="DONE">DONE</option>
              <option value="DONE AMBIL">DONE AMBIL</option>
              <option value="CANCEL">CANCEL</option>
              <option value="CANCEL AMBIL">CANCEL AMBIL</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">GARANSI</label>
            <select value={garansi} onChange={e => setGaransi(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px]">
              <option value=""></option>
              <option value="7 HARI">7 HARI</option>
              <option value="14 HARI">14 HARI</option>
              <option value="30 HARI">30 HARI</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">TGL MASUK</label>
            <CustomDatePicker value={tglMasuk} onChange={setTglMasuk} className="flex-1 h-[26px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">BIAYA</label>
            <input 
              type="text" 
              value={biaya} 
              onChange={e => setBiaya(e.target.value)} 
              disabled={status === 'CANCEL AMBIL'}
              className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${status === 'CANCEL AMBIL' ? 'opacity-50 cursor-not-allowed' : ''}`} 
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">PART</label>
            <input 
              type="text" 
              value={part} 
              onChange={e => setPart(e.target.value)} 
              disabled={status === 'CANCEL AMBIL'}
              className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${status === 'CANCEL AMBIL' ? 'opacity-50 cursor-not-allowed' : ''}`} 
            />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">JASA</label>
            <input 
              type="text" 
              value={status === 'CANCEL AMBIL' ? '' : formatCurrency(jasa)} 
              className={`flex-1 bg-yellow-300 text-black px-1 py-0.5 outline-none font-bold h-[26px] ${status === 'CANCEL AMBIL' ? 'opacity-50 cursor-not-allowed' : ''}`} 
              readOnly 
            />
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center relative group">
            <label className="w-24 font-bold shrink-0">TGL AMBIL</label>
            <div className="flex-1 h-[26px] relative cursor-pointer">
               <CustomDatePicker 
                  value={tglAmbil} 
                  onChange={setTglAmbil} 
                  className={`flex-1 h-[26px] w-full ${!selectedRecordId ? 'pointer-events-none opacity-80' : ''}`} 
               />
               {!selectedRecordId && (
                  <div className="absolute inset-0 z-10" title="Bisa diedit setelah disimpan (klik dua kali pada tabel untuk edit)"></div>
               )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">CASH / TF</label>
            <select 
              value={cashTf} 
              onChange={e => setCashTf(e.target.value)} 
              disabled={status === 'CANCEL AMBIL'}
              className={`flex-1 bg-white text-black px-1 py-0.5 outline-none h-[26px] ${status === 'CANCEL AMBIL' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value=""></option>
              <option value="CASH">CASH</option>
              <option value="TF">TF</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center">
            <div className="w-24 shrink-0"></div>
            <div className="grid grid-cols-3 gap-2 flex-1 mt-1">
              <button onClick={handleHapus} className="border border-white hover:bg-white hover:text-[#050B24] py-1.5 text-xs sm:text-[13px] md:text-sm font-bold uppercase truncate transition-colors text-center w-full">HAPUS</button>
              <button onClick={handleClear} className="bg-white text-black hover:bg-gray-200 py-1.5 text-xs sm:text-[13px] md:text-sm font-bold uppercase truncate transition-colors text-center w-full">CLEAR</button>
              <button onClick={handleSimpan} className="bg-[#1e2b6b] border border-white hover:bg-[#2a3c94] py-1.5 text-xs sm:text-[13px] md:text-sm font-bold uppercase truncate transition-colors text-center w-full">SIMPAN</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-slate-600 my-1"></div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 mb-1 w-full">
        <div className="md:col-span-3 flex flex-wrap items-end gap-2 justify-start z-40 relative">
          <div className="flex flex-col gap-0.5 min-w-[130px] z-[60]">
            <label className="text-[13px]">Dari Tanggal</label>
            <CustomDatePicker 
              value={filterDariTanggal || undefined} 
              onChange={(date) => setFilterDariTanggal(date)} 
              className="h-[26px] w-full" 
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-[130px] z-[60]">
            <label className="text-[13px]">Sampai Tanggal</label>
            <CustomDatePicker 
              value={filterSampaiTanggal || undefined} 
              onChange={(date) => setFilterSampaiTanggal(date)} 
              className="h-[26px] w-full" 
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-[110px]">
            <label className="text-[13px]">Teknisi</label>
            <select value={filterTeknisi} onChange={e => setFilterTeknisi(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-[26px] text-[13px]">
              <option value=""></option>
              <option value="AND">AND</option>
              <option value="IRF">IRF</option>
              <option value="SMD">SMD</option>
              <option value="UDN">UDN</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[130px]">
            <label className="text-[13px]">Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-[26px] text-[13px]">
              <option value=""></option>
              <option value="NGGANDUL">NGGANDUL</option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="DONE">DONE</option>
              <option value="DONE AMBIL">DONE AMBIL</option>
              <option value="CANCEL">CANCEL</option>
              <option value="CANCEL AMBIL">CANCEL AMBIL</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[110px]">
            <label className="text-[13px]">Cash / TF</label>
            <select value={filterCashTf} onChange={e => setFilterCashTf(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-[26px] text-[13px]">
              <option value=""></option>
              <option value="CASH">CASH</option>
              <option value="TF">TF</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[100px] mb-[1px]">
            <button onClick={handleResetFilter} className="bg-white text-black px-3 py-0.5 hover:bg-gray-200 font-bold h-[26px] text-[13px]">RESET</button>
          </div>
        </div>
        
        <div className="flex items-end gap-2 justify-start">
          <div className="flex flex-col gap-0.5 flex-1 min-w-[70px]">
            <label className="text-[13px]">No. Nota</label>
            <input type="text" value={filterNoNotaInput} onChange={e => setFilterNoNotaInput(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleSearchClick()} className="bg-white text-black px-1 py-0.5 outline-none h-[26px] text-[13px] w-full" />
          </div>
          <div className="flex flex-col gap-0.5 mb-[1px] shrink-0">
            <button onClick={handleSearchClick} className="bg-white text-black px-3 py-0.5 hover:bg-gray-200 font-bold h-[26px] text-[13px]">CARI</button>
          </div>
          <div className="flex flex-col gap-0.5 mb-[1px] shrink-0">
            <button onClick={handleLogClick} className="bg-red-600 text-white px-3 py-0.5 hover:bg-red-700 font-bold h-[26px] text-[13px]">LOG</button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 bg-white overflow-auto border border-gray-400 mt-1">
        <table className="w-full table-fixed text-black text-[11px]">
          <thead className="bg-[#8f1994] text-white sticky top-0 z-10 shadow">
            <tr>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-center whitespace-nowrap cursor-pointer select-none w-[45px]" onClick={() => handleSort('nota')}>NOTA {sortConfig?.key === 'nota' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-left whitespace-nowrap cursor-pointer select-none w-[85px]" onClick={() => handleSort('status')}>STATUS {sortConfig?.key === 'status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-center whitespace-nowrap cursor-pointer select-none w-[45px]" onClick={() => handleSort('teknisi')}>TEKNISI {sortConfig?.key === 'teknisi' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-left whitespace-nowrap cursor-pointer select-none w-[70px]" onClick={() => handleSort('namaUser')}>USER {sortConfig?.key === 'namaUser' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-left whitespace-nowrap cursor-pointer select-none w-[80px]" onClick={() => handleSort('noWaUser')}>WAUSER {sortConfig?.key === 'noWaUser' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-left whitespace-nowrap cursor-pointer select-none w-[75px]" onClick={() => handleSort('device')}>DEVICE {sortConfig?.key === 'device' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-left whitespace-nowrap cursor-pointer select-none w-[100px]" onClick={() => handleSort('keluhan')}>KELUHAN {sortConfig?.key === 'keluhan' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-center whitespace-nowrap cursor-pointer select-none w-[65px]" onClick={() => handleSort('tglMasuk')}>TGLMASUK {sortConfig?.key === 'tglMasuk' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-right whitespace-nowrap cursor-pointer select-none w-[75px]" onClick={() => handleSort('biaya')}>BIAYA {sortConfig?.key === 'biaya' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-right whitespace-nowrap cursor-pointer select-none w-[75px]" onClick={() => handleSort('part')}>MODAL {sortConfig?.key === 'part' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-right whitespace-nowrap cursor-pointer select-none w-[75px]" onClick={() => handleSort('jasa')}>JASA {sortConfig?.key === 'jasa' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-left whitespace-nowrap cursor-pointer select-none w-[65px]" onClick={() => handleSort('tglAmbil')}>TGLAMBIL {sortConfig?.key === 'tglAmbil' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 border-r border-[#a930b0] font-normal text-left whitespace-nowrap cursor-pointer select-none w-[65px]" onClick={() => handleSort('garansi')}>GARANSI {sortConfig?.key === 'garansi' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
              <th className="px-1 py-0.5 font-normal text-left whitespace-nowrap cursor-pointer select-none w-[45px]" onClick={() => handleSort('cashTf')}>BAYAR {sortConfig?.key === 'cashTf' && (sortConfig.direction === 'asc' ? '▲' : '▼')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedFilteredRecords.length === 0 && (
                <tr>
                   <td colSpan={14} className="p-6 text-center text-gray-500 bg-gray-50 h-full">Belum ada data. Silakan isi form dan tekan SIMPAN.</td>
                </tr>
            )}
            {sortedFilteredRecords.map((row) => {
              const isColoredRow = ['CANCEL', 'DONE', 'PROGRESS'].includes(row.status);
               const isSelected = selectedRecordId === row.id;
               
               let rowStyle: React.CSSProperties = {};
               let rowClass = "border-b border-gray-300 transition-colors cursor-pointer ";
               
               if (isSelected) {
                  rowClass += "bg-[#c4dbf6]";
               } else if (isColoredRow) {
                  rowStyle.backgroundColor = getStatusBgColor(row.status);
                  rowStyle.color = 'black'; 
               } else {
                  rowClass += "hover:bg-blue-50"; 
               }
 
               if (row.logMessage) {
                  rowClass += " border-l-4 border-l-red-500";
               }
 
               return (
               <tr 
                 key={row.id} 
                 onClick={() => handleEdit(row)}
                 className={rowClass}
                 style={rowStyle}
                 title={row.logMessage ? `Log:\n${row.logMessage}` : ''}
               >
                 <td className="px-1 py-0.5 border-r border-gray-300 text-center w-[45px] truncate">{row.nota}</td>
                 <td className="p-0 border-r border-gray-300 text-white font-bold text-left align-middle whitespace-nowrap w-[85px]">
                    {row.status && (
                      <div 
                         className="w-full h-full flex items-center justify-start px-1 py-0.5 uppercase truncate text-[10px]" 
                         style={{ backgroundColor: getStatusBgColor(row.status), color: getStatusTextColor(row.status) }}
                      >
                         {row.status}
                       </div>
                    )}
                 </td>
                 <td 
                   className="px-1 py-0.5 border-r border-gray-300 font-bold text-center w-[45px] truncate"
                   style={['AND', 'IRF', 'SMD', 'UDN'].includes(row.teknisi) ? {
                     backgroundColor: getTeknisiBgColor(row.teknisi),
                     color: getTeknisiTextColor(row.teknisi)
                   } : {}}
                 >
                   {row.teknisi}
                 </td>
                 <td className="px-1 py-0.5 border-r border-gray-300 whitespace-nowrap text-left w-[70px] truncate" title={row.namaUser}>{row.namaUser}</td>
                 <td className="px-1 py-0.5 border-r border-gray-300 text-left w-[80px] truncate" title={row.noWaUser}>{row.noWaUser}</td>
                 <td className="px-1 py-0.5 border-r border-gray-300 text-left w-[75px] truncate" title={row.device}>{row.device}</td>
                 <td className="px-1 py-0.5 border-r border-gray-300 text-left w-[100px] truncate" title={row.keluhan}>{row.keluhan}</td>
                 <td className="px-1 py-0.5 border-r border-gray-300 text-center w-[65px] truncate">
                    {formatDateToDDMMYYYY(row.tglMasuk)}
                 </td>
                 <td className={`px-1 py-0.5 border-r border-gray-300 text-right whitespace-nowrap font-medium w-[75px] truncate ${isColoredRow ? '' : 'text-red-600'}`}>
                    {row.biaya ? formatCurrency(parseNum(row.biaya)) : ''}
                 </td>
                 <td className={`px-1 py-0.5 border-r border-gray-300 text-right whitespace-nowrap font-medium w-[75px] truncate ${isColoredRow ? '' : 'text-orange-600'}`}>
                    {row.part ? formatCurrency(parseNum(row.part)) : ''}
                 </td>
                 <td className={`px-1 py-0.5 border-r border-gray-300 text-right whitespace-nowrap font-medium w-[75px] truncate ${row.jasa < 0 ? 'text-red-500' : (isColoredRow ? '' : 'text-emerald-600')}`}>
                    {formatCurrency(row.jasa)}
                 </td>
                 <td className="px-1 py-0.5 border-r border-gray-300 text-center w-[65px] truncate">
                    {formatDateToDDMMYYYY(row.tglAmbil)}
                 </td>
                 <td className="px-1 py-0.5 border-r border-gray-300 text-left whitespace-nowrap w-[65px] truncate" title={row.garansi}>{row.garansi}</td>
                 <td className="px-1 py-0.5 text-left w-[45px] truncate" title={row.cashTf}>{row.cashTf}</td>
               </tr>
               );
             })}
           </tbody>
         </table>
       </div>

      {/* Bottom Summary Area */}
      <div className="grid grid-cols-7 gap-2 mt-2 w-full font-bold text-center">
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-left mb-0.5 opacity-90 truncate" title="Total Unit Masuk">Total Unit Masuk</span>
          <div className="bg-[#cc0099] text-xl py-1 rounded-sm shadow-inner">{records.length}</div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-left mb-0.5 opacity-90 truncate" title="Unit Nggandul">Unit Nggandul</span>
          <div className="bg-[#4d0099] text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status && !r.status.includes('DONE') && !r.status.includes('CANCEL')).length}</div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-left mb-0.5 opacity-90 truncate" title="Progress">Progress</span>
          <div className="bg-[#e6e600] text-black text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'PROGRESS').length}</div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-left mb-0.5 opacity-90 truncate" title="Done Saja">Done Saja</span>
          <div className="bg-[#00cc00] text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'DONE').length}</div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-left mb-0.5 opacity-90 truncate" title="Cancel">Cancel</span>
          <div className="bg-[#ff8c00] text-black text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'CANCEL').length}</div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-left mb-0.5 opacity-90 truncate" title="Cancel Diambil">Cancel Diambil</span>
          <div className="bg-[#cc0000] text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'CANCEL AMBIL').length}</div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm md:text-base text-left mb-0.5 opacity-90 truncate" title="Done Diambil">Done Diambil</span>
          <div className="bg-[#114edc] text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'DONE AMBIL').length}</div>
        </div>
      </div>
    </div>
  );
};

