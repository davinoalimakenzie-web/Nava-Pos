import React, { useState } from 'react';
import { CustomDatePicker } from './CustomDatePicker';

interface RecordData {
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
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount).replace('Rp', 'Rp ');
};

const parseNum = (val: string) => {
  if (!val) return 0;
  const parsed = parseInt(val.replace(/[^0-9]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
};

const generateDummyData = (): RecordData[] => {
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
        
        let tglSelesai = null;
        let tglAmbil = null;
        let cashTf = '';
        let total = 0;
        let modal = 0;
        let pph = 0;
        let feeTeknisi = 0;
        let jasa = 0;

        if (status !== 'PROGRESS') {
           tglSelesai = new Date(date);
           tglSelesai.setHours(date.getHours() + Math.floor(Math.random() * 24));
           total = Math.floor(Math.random() * 500) * 1000 + 50000;
           modal = Math.floor(total * 0.3);
           pph = Math.floor(total * 0.05);
           feeTeknisi = Math.floor(total * 0.2);
           jasa = total - modal - pph - feeTeknisi;
        }
        
        if (status.includes('AMBIL')) {
           tglAmbil = new Date(tglSelesai || date);
           tglAmbil.setHours(tglAmbil.getHours() + Math.floor(Math.random() * 24));
           cashTf = cashTfList[Math.floor(Math.random() * cashTfList.length)];
        }

        dummy.push({
            id: `INV-${idCounter}`,
            nota: `NOTA-${String(idCounter).padStart(4, '0')}`,
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
  return dummy.reverse(); // Newest first
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
      setRecords(records.map(r => r.id === selectedRecordId ? newRecord : r));
    } else {
      setRecords([newRecord, ...records]);
    }
    handleClear();
  };

  const handleHapus = () => {
    if (selectedRecordId) {
      setRecords(records.filter(r => r.id !== selectedRecordId));
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
    <div className="flex-1 flex flex-col bg-[#050B24] text-white p-2 h-full overflow-hidden text-[11px] font-sans">
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
            <input type="text" value={nota} onChange={e => setNota(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">TEKNISI</label>
            <select 
              value={teknisi} 
              onChange={e => setTeknisi(e.target.value)} 
              className="flex-1 outline-none h-[22px] px-1 py-0.5"
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
            <input type="text" value={namaUser} onChange={e => setNamaUser(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">NO. WA USER</label>
            <input type="text" value={noWaUser} onChange={e => setNoWaUser(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">DEVICE</label>
            <input type="text" value={device} onChange={e => setDevice(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">KELUHAN</label>
            <input type="text" value={keluhan} onChange={e => setKeluhan(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">STATUS</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)} 
              className="flex-1 outline-none h-[22px] px-1 py-0.5"
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
            <select value={garansi} onChange={e => setGaransi(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
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
            <CustomDatePicker value={tglMasuk} onChange={setTglMasuk} className="flex-1 h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">BIAYA</label>
            <input type="text" value={biaya} onChange={e => setBiaya(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">PART</label>
            <input type="text" value={part} onChange={e => setPart(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">JASA</label>
            <input type="text" value={formatCurrency(jasa)} className="flex-1 bg-yellow-300 text-black px-1 py-0.5 outline-none font-bold h-[22px]" readOnly />
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center relative group">
            <label className="w-24 font-bold shrink-0">TGL AMBIL</label>
            <div className="flex-1 h-[22px] relative cursor-pointer">
               <CustomDatePicker 
                  value={tglAmbil} 
                  onChange={setTglAmbil} 
                  className={`flex-1 h-[22px] w-full ${!selectedRecordId ? 'pointer-events-none opacity-80' : ''}`} 
               />
               {!selectedRecordId && (
                  <div className="absolute inset-0 z-10" title="Bisa diedit setelah disimpan (klik dua kali pada tabel untuk edit)"></div>
               )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">CASH / TF</label>
            <select value={cashTf} onChange={e => setCashTf(e.target.value)} className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option value=""></option>
              <option value="CASH">CASH</option>
              <option value="TF">TF</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2 w-full mt-1">
            <button onClick={handleHapus} className="flex-1 border border-white hover:bg-white hover:text-[#050B24] py-1.5 text-[12px] transition-colors font-bold">HAPUS</button>
            <button onClick={handleClear} className="flex-1 bg-white text-black hover:bg-gray-200 py-1.5 text-[12px] font-bold transition-colors">CLEAR</button>
            <button onClick={handleSimpan} className="flex-1 bg-[#1e2b6b] border border-white hover:bg-[#2a3c94] py-1.5 text-[12px] transition-colors font-bold">SIMPAN</button>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-slate-600 my-1"></div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 mb-1 w-full">
        <div className="md:col-span-3 flex items-end gap-2 overflow-x-auto no-scrollbar justify-start">
          <div className="flex flex-col gap-0.5 min-w-[130px]">
            <label className="text-[11px]">Dari Tanggal</label>
            <input 
              type="date" 
              value={formatDateForInput(filterDariTanggal)} 
              onChange={e => setFilterDariTanggal(e.target.value ? new Date(e.target.value) : null)} 
              className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px] w-full"
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-[130px]">
            <label className="text-[11px]">Sampai Tanggal</label>
            <input 
              type="date" 
              value={formatDateForInput(filterSampaiTanggal)} 
              onChange={e => setFilterSampaiTanggal(e.target.value ? new Date(e.target.value) : null)} 
              className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px] w-full"
            />
          </div>
          <div className="flex flex-col gap-0.5 min-w-[110px]">
            <label className="text-[11px]">Teknisi</label>
            <select value={filterTeknisi} onChange={e => setFilterTeknisi(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px]">
              <option value=""></option>
              <option value="AND">AND</option>
              <option value="IRF">IRF</option>
              <option value="SMD">SMD</option>
              <option value="UDN">UDN</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[130px]">
            <label className="text-[11px]">Status</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px]">
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
            <label className="text-[11px]">Cash / TF</label>
            <select value={filterCashTf} onChange={e => setFilterCashTf(e.target.value)} className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px]">
              <option value=""></option>
              <option value="CASH">CASH</option>
              <option value="TF">TF</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>
          <div className="flex flex-col gap-0.5 min-w-[100px] mb-[1px]">
            <button onClick={handleResetFilter} className="bg-white text-black px-3 py-0.5 hover:bg-gray-200 font-bold h-5 text-[11px]">RESET</button>
          </div>
        </div>
        
        <div className="flex items-end gap-2 justify-start">
          <div className="flex flex-col gap-0.5 flex-1 min-w-[70px]">
            <label className="text-[11px]">No. Nota</label>
            <input type="text" value={filterNoNotaInput} onChange={e => setFilterNoNotaInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearchClick()} className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px] w-full" />
          </div>
          <div className="flex flex-col gap-0.5 mb-[1px] shrink-0">
            <button onClick={handleSearchClick} className="bg-white text-black px-3 py-0.5 hover:bg-gray-200 font-bold h-5 text-[11px]">CARI</button>
          </div>
          <div className="flex flex-col gap-0.5 mb-[1px] shrink-0">
            <button onClick={handleLogClick} className="bg-red-600 text-white px-3 py-0.5 hover:bg-red-700 font-bold h-5 text-[11px]">LOG</button>
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 bg-white overflow-auto border border-gray-400 mt-1">
        <table className="w-full text-black text-[11px]">
          <thead className="bg-[#8f1994] text-white sticky top-0 z-10 shadow">
            <tr>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">NOTA</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">STATUS</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">TEKNISI</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">USER</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">WAUSER</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left max-w-[120px] whitespace-nowrap">DEVICE</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left max-w-[160px] whitespace-nowrap">KELUHAN</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">TGLMASUK</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-right whitespace-nowrap">BIAYA</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-right whitespace-nowrap">MODAL</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-right whitespace-nowrap">JASA</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">TGLAMBIL</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left whitespace-nowrap">GARANSI</th>
              <th className="px-2 py-1 font-normal text-left whitespace-nowrap">BAYAR</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 && (
               <tr>
                  <td colSpan={14} className="p-6 text-center text-gray-500 bg-gray-50 h-full">Belum ada data. Silakan isi form dan tekan SIMPAN.</td>
               </tr>
            )}
            {filteredRecords.map((row) => (
              <tr 
                key={row.id} 
                onDoubleClick={() => handleEdit(row)}
                className={`border-b border-gray-300 transition-colors cursor-pointer ${selectedRecordId === row.id ? 'bg-[#c4dbf6]' : 'hover:bg-blue-50'} ${row.logMessage ? 'border-l-4 border-l-red-500' : ''}`}
                title={row.logMessage ? `Log:\n${row.logMessage}` : ''}
              >
                <td className="px-2 py-1 border-r border-gray-300">{row.nota}</td>
                <td className="p-0 border-r border-gray-300 text-white font-bold text-center align-middle whitespace-nowrap">
                   {row.status && (
                     <div 
                        className="w-full h-full flex items-center justify-center px-2 py-1 uppercase" 
                        style={{ backgroundColor: getStatusBgColor(row.status), color: getStatusTextColor(row.status) }}
                     >
                        {row.status}
                     </div>
                   )}
                </td>
                <td className="px-2 py-1 border-r border-gray-300 font-bold text-center">{row.teknisi}</td>
                <td className="px-2 py-1 border-r border-gray-300 whitespace-nowrap">{row.namaUser}</td>
                <td className="px-2 py-1 border-r border-gray-300">{row.noWaUser}</td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[120px]" title={row.device}>{row.device}</td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[160px]" title={row.keluhan}>{row.keluhan}</td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[80px]">
                   {row.tglMasuk?.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                </td>
                <td className="px-2 py-1 border-r border-gray-300 text-right whitespace-nowrap font-medium text-red-600">
                   {row.biaya ? formatCurrency(parseNum(row.biaya)) : ''}
                </td>
                <td className="px-2 py-1 border-r border-gray-300 text-right whitespace-nowrap font-medium text-orange-600">
                   {row.part ? formatCurrency(parseNum(row.part)) : ''}
                </td>
                <td className="px-2 py-1 border-r border-gray-300 text-right whitespace-nowrap font-medium text-emerald-600">
                   {formatCurrency(row.jasa)}
                </td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[80px]">
                   {row.tglAmbil ? row.tglAmbil.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : ''}
                </td>
                <td className="px-2 py-1 border-r border-gray-300 whitespace-nowrap">{row.garansi}</td>
                <td className="px-2 py-1">{row.cashTf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Summary Area */}
      <div className="flex gap-2 mt-2 w-full overflow-x-auto no-scrollbar font-bold text-center">
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Total Unit Masuk</span>
          <div className="bg-[#cc0099] text-xl py-1 rounded-sm shadow-inner">{records.length}</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Unit Nggandul</span>
          <div className="bg-[#4d0099] text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status && !r.status.includes('DONE') && !r.status.includes('CANCEL')).length}</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Progress</span>
          <div className="bg-[#e6e600] text-black text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'PROGRESS').length}</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Done Saja</span>
          <div className="bg-[#00cc00] text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'DONE').length}</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Cancel</span>
          <div className="bg-[#ff8c00] text-black text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'CANCEL').length}</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Cancel Diambil</span>
          <div className="bg-[#cc0000] text-xl py-1 rounded-sm shadow-inner">{records.filter(r => r.status === 'CANCEL AMBIL').length}</div>
        </div>
      </div>
    </div>
  );
};

