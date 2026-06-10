import React, { useState, useEffect } from 'react';
import { CustomDatePicker } from './CustomDatePicker';
import { Download, MessageSquare, ExternalLink, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

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
        let jasa = total - modal;
        
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
  const [records, setRecords] = useState<RecordData[]>(() => {
    const saved = localStorage.getItem('POS_BukuBesar');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((r: any) => ({
          ...r,
          tglMasuk: r.tglMasuk ? new Date(r.tglMasuk) : null,
          tglAmbil: r.tglAmbil ? new Date(r.tglAmbil) : null,
        }));
      } catch (e) {
        console.error("Gagal membaca local storage Buku Besar", e);
      }
    }
    const initial = generateDummyData();
    localStorage.setItem('POS_BukuBesar', JSON.stringify(initial));
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('POS_BukuBesar', JSON.stringify(records));
    cachedRecords = records;
  }, [records]);

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  const getWhatsAppUrl = (noWa: string, customMessage: string) => {
    let cleaned = noWa.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "62" + cleaned.slice(1);
    }
    return `https://wa.me/${cleaned}?text=${encodeURIComponent(customMessage)}`;
  };

  const getWaMessage = (row: any) => {
    const formattedBiaya = row.biaya ? formatCurrency(parseNum(row.biaya)) : 'Rp 0';
    if (row.status === 'DONE') {
      return `Halo Ibu/Bapak *${row.namaUser || ''}*, device Anda *${row.device || ''}* dengan No. Nota *${row.nota || ''}* telah selesai diperbaiki dengan nominal biaya *${formattedBiaya}*. Silakan bisa diambil dan dicek kembali di toko kami. Terima kasih! 🙏`;
    } else if (row.status === 'DONE AMBIL') {
      return `Halo Ibu/Bapak *${row.namaUser || ''}*, device Anda *${row.device || ''}* dengan No. Nota *${row.nota || ''}* telah selesai diperbaiki dengan nominal biaya *${formattedBiaya}* dan telah diambil (DONE AMBIL). Terima kasih banyak atas kepercayaan Anda! 🙏`;
    } else if (row.status === 'CANCEL' || row.status === 'CANCEL AMBIL') {
      return `Halo Ibu/Bapak *${row.namaUser || ''}*, mohon maaf device Anda *${row.device || ''}* dengan No. Nota *${row.nota || ''}* tidak dapat diperbaiki (CANCEL). Perangkat silakan bisa diambil kembali di toko. Terima kasih.`;
    } else if (row.status === 'PROGRESS') {
      return `Halo Ibu/Bapak *${row.namaUser || ''}*, device Anda *${row.device || ''}* dengan No. Nota *${row.nota || ''}* sedang dalam pengerjaan oleh teknisi kami. Kami akan menginfokan kembali jika sudah selesai. Terima kasih banyak atas kepercayaan Anda!`;
    }
    return `Halo Ibu/Bapak *${row.namaUser || ''}*, menginfokan mengenai perbaikan device Anda *${row.device || ''}* dengan No. Nota *${row.nota || ''}*. Saat ini status unit adalah: *${row.status || ''}*. Silakan menghubungi kami untuk detailnya. Terima kasih.`;
  };

  const exportToExcel = () => {
    const dataToExport = records.map(r => ({
      'No. Nota': r.nota,
      'Status': r.status,
      'Teknisi': r.teknisi,
      'Nama Pelanggan': r.namaUser,
      'No. WhatsApp': r.noWaUser,
      'Device / Perangkat': r.device,
      'Keluhan / Kerusakan': r.keluhan,
      'Garansi': r.garansi,
      'Tanggal Masuk': formatDateToDDMMYYYY(r.tglMasuk),
      'Biaya': parseNum(r.biaya),
      'Modal / Part': parseNum(r.part),
      'Jasa (Pendapatan)': r.jasa,
      'Tanggal Ambil': formatDateToDDMMYYYY(r.tglAmbil),
      'Metode Bayar': r.cashTf,
      'Catatan Log': r.logMessage || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Buku Besar');

    worksheet['!cols'] = [
      { wch: 10 }, // No. Nota
      { wch: 15 }, // Status
      { wch: 10 }, // Teknisi
      { wch: 20 }, // Nama Pelanggan
      { wch: 15 }, // No. WhatsApp
      { wch: 20 }, // Device
      { wch: 25 }, // Keluhan
      { wch: 15 }, // Garansi
      { wch: 15 }, // Tanggal Masuk
      { wch: 15 }, // Biaya
      { wch: 15 }, // Modal
      { wch: 15 }, // Jasa
      { wch: 15 }, // Tanggal Ambil
      { wch: 15 }, // Metode Bayar
      { wch: 40 }  // Catatan Log
    ];

    XLSX.writeFile(workbook, `Buku_Besar_Backup_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

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
  const [alertModal, setAlertModal] = useState<{open: boolean, message: string}>({ open: false, message: '' });
  const [waPopupModal, setWaPopupModal] = useState<{
    open: boolean;
    message: string;
    noWa: string;
    recordToSave: RecordData;
    isEdit: boolean;
    updatedLogMessage: string;
  } | null>(null);
  
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

  const commitSave = (record: RecordData, isEdit: boolean, finalLogMessage: string) => {
    const recordWithLog = { ...record, logMessage: finalLogMessage };
    if (isEdit) {
      const u = records.map(r => r.id === record.id ? recordWithLog : r);
      setRecords(u);
      cachedRecords = u;
    } else {
      const u = [recordWithLog, ...records];
      setRecords(u);
      cachedRecords = u;
    }
    handleClear();
  };

  const handleSimpan = () => {
    if (!nota || !teknisi || !namaUser || !noWaUser || !device || !keluhan || !status || !garansi || !tglMasuk || !biaya || !part || !tglAmbil || !cashTf) {
      setAlertModal({ open: true, message: 'Harap isi semua kolom sebelum menyimpan!' });
      return;
    }

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

    const timestamp = new Date().toLocaleString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    let updatedLogMessage = '';
    let isStatusChanged = false;

    if (selectedRecordId) {
      const oldRecord = records.find(r => r.id === selectedRecordId);
      updatedLogMessage = oldRecord?.logMessage || '';
      if (oldRecord && oldRecord.status !== status) {
        isStatusChanged = true;
        const changeEntry = `[${timestamp}] AutoLog: Status berubah dari '${oldRecord.status || 'KOSONG'}' ke '${status}' oleh Teknisi/Admin: ${teknisi}`;
        updatedLogMessage = updatedLogMessage ? `${updatedLogMessage}\n${changeEntry}` : changeEntry;
      }
    } else {
      isStatusChanged = true; // Treating on-creation as status change
      updatedLogMessage = `[${timestamp}] AutoLog: Unit baru masuk dengan status '${status}' (Teknisi: ${teknisi})`;
    }

    const targetStatuses = ['DONE', 'CANCEL', 'DONE AMBIL'];
    const isTargetStatus = targetStatuses.includes(status.toUpperCase().trim());
    const isWaEmptyOrStrip = !noWaUser || noWaUser.trim() === '' || noWaUser.trim() === '-';

    if (isTargetStatus && isStatusChanged && !isWaEmptyOrStrip) {
      // Open the editable WhatsApp notification popup
      setWaPopupModal({
        open: true,
        message: getWaMessage(newRecord),
        noWa: noWaUser,
        recordToSave: newRecord,
        isEdit: !!selectedRecordId,
        updatedLogMessage: updatedLogMessage
      });
    } else {
      // Save directly
      commitSave(newRecord, !!selectedRecordId, updatedLogMessage);
    }
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
      {alertModal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white text-black p-4 w-[320px] shadow-lg flex flex-col gap-3 border border-gray-400">
            <h3 className="font-bold border-b border-gray-300 pb-2 text-sm text-red-600">Peringatan</h3>
            <p className="text-sm font-medium">{alertModal.message}</p>
            <div className="flex justify-end mt-2">
              <button 
                onClick={() => setAlertModal({ open: false, message: '' })} 
                className="px-4 py-1.5 bg-[#1e2b6b] text-white hover:bg-[#2a3c94] font-bold text-xs transition-colors"
               >
                 TUTUP
               </button>
            </div>
          </div>
        </div>
      )}

      {logModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f3f4f6] text-black w-full max-w-lg shadow-2xl flex flex-col border-2 border-slate-600 max-h-[85vh]">
            <div className="bg-[#1e2b6b] text-white px-4 py-2.5 font-bold flex justify-between items-center border-b border-slate-700 shadow-sm">
              <span className="flex items-center gap-1.5 uppercase tracking-wide text-xs">
                📚 Riwayat Log Transaksi (Nota: {records.find(r => r.id === selectedRecordId)?.nota || '-'})
              </span>
              <button onClick={() => setLogModalOpen(false)} className="text-white hover:text-red-300 font-bold transition-colors">✕</button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
              {/* Timeline list of previous logs */}
              <div>
                <h4 className="font-bold text-[11px] text-gray-500 uppercase mb-2 tracking-wider border-b border-gray-300 pb-1 flex items-center justify-between">
                  <span>Aktivitas Perangkat</span>
                  <span className="text-[10px] lowercase normal-case italic font-normal text-gray-400">Terurut Waktu</span>
                </h4>
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {records.find(r => r.id === selectedRecordId)?.logMessage ? (
                    records.find(r => r.id === selectedRecordId)!.logMessage!.split('\n').map((line, idx) => {
                      const isAuto = line.includes('AutoLog:');
                      return (
                        <div key={idx} className={`p-2.5 border rounded-sm text-xs leading-relaxed ${isAuto ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-sm' : 'bg-blue-50 border-blue-200 text-blue-900 shadow-sm'}`}>
                          <p className="font-medium whitespace-pre-wrap">{line}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-gray-400 italic py-2">Belum ada log terekam untuk perangkat ini.</p>
                  )}
                </div>
              </div>

              {/* Form to submit manual log input */}
              <div className="border-t border-gray-300 pt-3 flex flex-col gap-1.5">
                <h4 className="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Tambah Catatan / Log Teknisi</h4>
                <textarea 
                   className="w-full border border-gray-300 bg-white p-2.5 outline-none h-20 text-xs text-black shadow-inner" 
                   placeholder="Tulis pesan status pengerjaan atau detail penggantian part baru..."
                   value={logInput}
                   onChange={e => setLogInput(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-100 border-t border-gray-200 p-3 flex justify-end gap-2 shrink-0">
              <button onClick={() => setLogModalOpen(false)} className="px-4 py-1.5 border border-gray-400 bg-white text-gray-800 hover:bg-gray-50 font-bold text-xs transition-colors">BATAL</button>
              <button onClick={submitLog} className="px-4 py-1.5 bg-[#1e2b6b] text-white hover:bg-[#2a3c94] font-bold text-xs transition-colors shadow">SIMPAN CATATAN</button>
            </div>
          </div>
        </div>
      )}

      {waPopupModal?.open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#f3f4f6] text-black w-full max-w-lg shadow-2xl flex flex-col border-2 border-slate-600">
            <div className="bg-[#1e2b6b] text-white px-4 py-2.5 font-bold flex justify-between items-center border-b border-slate-700 shadow-sm">
              <span className="flex items-center gap-1.5 uppercase tracking-wide text-xs">
                📲 Edit & Kirim Notifikasi WhatsApp (Status: {waPopupModal.recordToSave.status})
              </span>
              <button 
                onClick={() => setWaPopupModal(null)} 
                className="text-white hover:text-red-300 font-bold transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              <div className="text-xs text-gray-600 bg-white p-2.5 border border-gray-300 rounded-sm">
                <p><strong>Penerima:</strong> {waPopupModal.recordToSave.namaUser} ({waPopupModal.noWa})</p>
                <p className="mt-1"><strong>Status Garapan Baru:</strong> <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-bold text-[10px]">{waPopupModal.recordToSave.status}</span></p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Isi Pesan WhatsApp:</label>
                <textarea 
                  className="w-full border border-gray-300 bg-white p-2.5 outline-none h-44 text-xs text-black shadow-inner font-sans resize-y" 
                  value={waPopupModal.message}
                  onChange={(e) => setWaPopupModal({ ...waPopupModal, message: e.target.value })}
                  placeholder="Isi pesan chat..."
                />
              </div>
            </div>

            <div className="bg-gray-100 border-t border-gray-200 p-3 flex flex-wrap justify-end gap-2 shrink-0">
              <button 
                onClick={() => setWaPopupModal(null)} 
                className="px-4 py-1.5 border border-gray-400 bg-white hover:bg-gray-50 font-bold text-xs text-gray-800 transition-colors"
              >
                BATAL
              </button>
              <button 
                onClick={() => {
                  commitSave(waPopupModal.recordToSave, waPopupModal.isEdit, waPopupModal.updatedLogMessage);
                  setWaPopupModal(null);
                }} 
                className="px-4 py-1.5 bg-gray-600 text-white hover:bg-gray-700 font-bold text-xs transition-colors shadow"
              >
                SIMPAN SAJA
              </button>
              <button 
                onClick={() => {
                  window.open(getWhatsAppUrl(waPopupModal.noWa, waPopupModal.message), '_blank');
                  commitSave(waPopupModal.recordToSave, waPopupModal.isEdit, waPopupModal.updatedLogMessage);
                  setWaPopupModal(null);
                }} 
                className="px-4 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs transition-colors shadow flex items-center gap-1"
                title="Kirim pesan di WhatsApp lalu lanjut simpan"
              >
                <MessageSquare className="w-3.5 h-3.5" /> KIRIM & LANJUT SIMPAN
              </button>
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
          <div className="flex flex-col gap-0.5 mb-[1px] shrink-0">
            <button onClick={exportToExcel} className="bg-emerald-600 text-white px-3 py-0.5 hover:bg-emerald-700 font-bold h-[26px] text-[13px] flex items-center gap-1 transition-colors" title="Eksport data Buku Besar ke file .xlsx (Excel)">
              <FileSpreadsheet className="w-3.5 h-3.5" /> EXCEL
            </button>
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

