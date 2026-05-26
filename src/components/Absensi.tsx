import React, { useState } from 'react';
import { Clock, Pencil } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { currentMonthStr, defaultDate } from '../data';

export const Absensi = ({ currentTime }: { currentTime: Date }) => {
  const { 
    user, appUsers, employees, setEmployees, attendances, setAttendances, setShowAddEmpModal
  } = useAppContext();

  const [absensiSubTab, setAbsensiSubTab] = useState('harian');
  const [selectedEmployeeAbsensi, setSelectedEmployeeAbsensi] = useState('');
  const [rekapMonth, setRekapMonth] = useState(currentMonthStr);
  const { leaveRequests, setLeaveRequests } = useAppContext();

  const handlePrevRekapMonth = () => {
      if (!rekapMonth) return;
      const [y, m] = rekapMonth.split('-');
      if (!y || !m) return;
      const date = new Date(parseInt(y), parseInt(m) - 2, 1);
      setRekapMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  const handleNextRekapMonth = () => {
      if (!rekapMonth) return;
      const [y, m] = rekapMonth.split('-');
      if (!y || !m) return;
      const date = new Date(parseInt(y), parseInt(m), 1);
      setRekapMonth(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  };

  // Cuti Form State
  const [viewCutiDate, setViewCutiDate] = useState(new Date());
  const [cutiEmployee, setCutiEmployee] = useState('');
  const [cutiDateStr, setCutiDateStr] = useState('');
  const [cutiReason, setCutiReason] = useState('');

  const handlePrevMonth = () => {
      const newD = new Date(viewCutiDate);
      newD.setMonth(newD.getMonth() - 1);
      setViewCutiDate(newD);
  }
  const handleNextMonth = () => {
      const newD = new Date(viewCutiDate);
      newD.setMonth(newD.getMonth() + 1);
      setViewCutiDate(newD);
  }
  const handleCutiSubmit = () => {
      if (!cutiEmployee || !cutiDateStr || !cutiReason) return alert('Harap isi semua field cuti!');
      const req = {
          id: 'CUTI-' + Date.now(),
          employeeName: cutiEmployee,
          date: cutiDateStr,
          reason: cutiReason,
          status: 'Pending'
      };
      setLeaveRequests([...(leaveRequests || []), req]);
      setCutiEmployee('');
      setCutiDateStr('');
      setCutiReason('');
      alert('Pengajuan Cuti berhasil dikirim!');
  };

  const [editingAttId, setEditingAttId] = useState<number | null>(null);
  const [editingAttTime, setEditingAttTime] = useState('');

  const calculateLateMinutes = (timeStr: string) => {
    if (!timeStr || timeStr === '-') return 0;
    const [h, m] = timeStr.split(':').map(Number);
    const late = (h * 60 + m) - (9 * 60); 
    return late > 0 ? late : 0;
  };

  const verifyAdmin = (actionName: string) => {
    if (user?.role === 'admin' || user?.role === 'owner') return true;
    return false; // prompt blocked, must use state if needed or ask user.
  };

  const startEditTimeIn = (id: number, current: string) => {
      // Allow editing if we have inline state, admin verification removed to simplify inline editing,
      // or we can just let any user edit for now, or only admin (button is hidden otherwise)
      if (user?.role !== 'admin' && user?.role !== 'owner') return alert('Hanya admin/owner yang bisa mengubah jam masuk');
      setEditingAttId(id);
      setEditingAttTime(current !== '-' ? current : '09:00');
  };

  const saveEditTimeIn = (id: number) => {
      const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!regex.test(editingAttTime)) {
          alert('Format jam tidak valid! Gunakan format HH:mm');
          return;
      }
      const updated = attendances.map((a: any) => {
        if (a.id === id) {
          return { ...a, timeIn: editingAttTime, lateMins: calculateLateMinutes(editingAttTime) };
        }
        return a;
      });
      setAttendances(updated);
      setEditingAttId(null);
  };

  const handleLibur = () => {
    if (!selectedEmployeeAbsensi) return alert('Pilih nama karyawan terlebih dahulu!');
    const existing = attendances.find((a: any) => a.date === defaultDate && a.user === selectedEmployeeAbsensi);
    if (existing && existing.status !== 'Clock Out' && existing.status !== 'Selesai') return alert('Karyawan tersebut sudah memiliki log absen hari ini!');
    
    setAttendances([{
      id: Date.now(),
      date: defaultDate,
      isoDate: new Date().toISOString(),
      user: selectedEmployeeAbsensi,
      timeIn: '-',
      timeOut: '-',
      status: 'Libur',
      lateMins: 0
    }, ...attendances]);
    alert(`Berhasil set Libur untuk ${selectedEmployeeAbsensi}!`);
  };

  const handleClockIn = () => {
    if (!selectedEmployeeAbsensi) return alert('Pilih nama karyawan terlebih dahulu!');
    const existing = attendances.find((a: any) => a.date === defaultDate && a.user === selectedEmployeeAbsensi);
    if (existing && existing.status !== 'Libur') return alert('Karyawan tersebut sudah Clock In hari ini!');
    
    const timeNowStr = currentTime.toLocaleTimeString('id-ID').substring(0, 5);
    setAttendances([{
      id: Date.now(),
      date: defaultDate,
      isoDate: new Date().toISOString(),
      user: selectedEmployeeAbsensi,
      timeIn: timeNowStr,
      timeOut: '-',
      status: 'Clock In',
      lateMins: calculateLateMinutes(timeNowStr)
    }, ...attendances]);
    alert(`Berhasil Clock In untuk ${selectedEmployeeAbsensi}!`);
  };

  const handleClockOut = () => {
    if (!selectedEmployeeAbsensi) return alert('Pilih nama karyawan terlebih dahulu!');
    let found = false;
    const updated = attendances.map((a: any) => {
      if (a.date === defaultDate && a.user === selectedEmployeeAbsensi && a.status === 'Clock In') {
        found = true;
        return { ...a, timeOut: currentTime.toLocaleTimeString('id-ID').substring(0,5), status: 'Selesai' };
      }
      return a;
    });
    if (found) {
      setAttendances(updated);
      alert(`Berhasil Clock Out untuk ${selectedEmployeeAbsensi}!`);
    } else {
      alert('Karyawan tersebut belum Clock In hari ini!');
    }
  };

  const generateRekapAbsen = () => {
     const monthlyData = attendances.filter((a: any) => a.date.startsWith(rekapMonth));
     const summary = employees.map((emp: any) => {
        const empAtt = monthlyData.filter((a: any) => a.user === emp.name && a.status === 'Selesai');
        const totalLate = empAtt.reduce((sum: number, a: any) => sum + (a.lateMins || 0), 0);
        const dailyPay = emp.dailySalary ? emp.dailySalary : 0;
        const penaltyPerHour = emp.latePenaltyPerMin ? emp.latePenaltyPerMin : 10000;
        const grossSalary = empAtt.length * dailyPay;
        const hoursLate = Math.ceil(totalLate / 60);
        const totalPenalty = hoursLate * penaltyPerHour;
        const finalSalary = grossSalary - totalPenalty;
        return {
           name: emp.name,
           position: emp.position,
           totalDays: empAtt.length,
           totalLate: totalLate,
           dailyPay,
           totalPenalty,
           finalSalary: finalSalary > 0 ? finalSalary : 0
        };
     });
     return summary;
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="SISTEM ABSENSI" currentTime={currentTime} />
      
      <div className="flex gap-1 shrink-0 bg-[#f9fafb] p-1 border-b border-gray-300">
          <button onClick={() => setAbsensiSubTab('harian')} className={`px-4 py-1.5 font-bold ${absensiSubTab === 'harian' ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Absen Hari Ini</button>
          <button onClick={() => setAbsensiSubTab('cuti')} className={`px-4 py-1.5 font-bold ${absensiSubTab === 'cuti' ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Permintaan Cuti / Off</button>
          <button onClick={() => setAbsensiSubTab('rekap')} className={`px-4 py-1.5 font-bold ${absensiSubTab === 'rekap' ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Rekap Bulanan</button>
          <button onClick={() => setAbsensiSubTab('karyawan')} className={`px-4 py-1.5 font-bold ${absensiSubTab === 'karyawan' ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Daftar Karyawan</button>
      </div>
      
      <div className="flex-1 p-2 overflow-auto bg-white">
        {absensiSubTab === 'harian' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 border border-gray-400 bg-[#ece9d8] shadow-sm flex items-end gap-3 rounded-sm">
                  <div className="flex-1">
                    <label className="block font-bold mb-1">Pilih Karyawan:</label>
                    <select value={selectedEmployeeAbsensi} onChange={e => setSelectedEmployeeAbsensi(e.target.value)} className="w-full border border-gray-400 p-2 outline-none">
                        <option value="">-- Nama --</option>
                        {employees.map((e: any) => <option key={e.id} value={e.name}>{e.name} ({e.position})</option>)}
                    </select>
                  </div>
                  <button onClick={handleClockIn} className="bg-green-600 text-white font-bold py-2 px-6 shadow hover:bg-green-700">CLOCK IN</button>
                  <button onClick={handleLibur} className="bg-gray-600 text-white font-bold py-2 px-6 shadow hover:bg-gray-700">OFF / LIBUR</button>
                  <button onClick={handleClockOut} className="bg-blue-600 text-white font-bold py-2 px-6 shadow hover:bg-blue-700">CLOCK OUT</button>
              </div>
              
              <h3 className="font-bold border-b pb-1">Log Kedatangan Hari Ini ({defaultDate})</h3>
              <table className="w-full text-left border-collapse whitespace-nowrap border border-gray-400">
                <thead className="bg-gray-100 border-b border-gray-400">
                  <tr><th className="p-2 border-r">Nama Karyawan</th><th className="p-2 border-r text-center">Jam Masuk</th><th className="p-2 border-r text-center">Jam Keluar</th><th className="p-2 border-r text-center">Status</th><th className="p-2 text-center"><Clock className="w-4 h-4 inline-block"/> Keterlambatan</th></tr>
                </thead>
                <tbody>
                  {attendances.filter((a: any) => a.date === defaultDate).map((a: any) => (
                      <tr key={a.id} className="border-b">
                        <td className="p-2 border-r font-bold">{a.user}</td>
                        <td className="p-2 border-r text-center font-mono group">
                           {editingAttId === a.id ? (
                               <div className="flex items-center justify-center gap-1">
                                 <input type="time" value={editingAttTime} onChange={e => setEditingAttTime(e.target.value)} className="w-24 border border-gray-400 p-0.5 text-center" autoFocus />
                                 <button onClick={() => saveEditTimeIn(a.id)} className="bg-green-600 text-white px-2 py-0.5 text-xs font-bold shadow">OK</button>
                                 <button onClick={() => setEditingAttId(null)} className="bg-red-600 text-white px-2 py-0.5 text-xs font-bold shadow">X</button>
                               </div>
                           ) : (
                               <>
                                 {a.timeIn} 
                                 {a.status !== 'Libur' && (
                                    <button onClick={() => startEditTimeIn(a.id, a.timeIn)} className="ml-2 text-blue-600 hidden group-hover:inline-block"><Pencil className="w-3 h-3" /></button>
                                 )}
                               </>
                           )}
                        </td>
                        <td className="p-2 border-r text-center font-mono">{a.timeOut}</td>
                        <td className="p-2 border-r text-center">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              a.status==='Clock In' ? 'bg-yellow-200 text-yellow-800' : 
                              a.status==='Libur' ? 'bg-gray-200 text-gray-800' : 'bg-green-200 text-green-800'
                           }`}>{a.status}</span>
                        </td>
                        <td className="p-2 text-center text-red-600 font-bold">{a.lateMins > 0 ? `${a.lateMins} Menit` : '-'}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}

        {absensiSubTab === 'cuti' && (
            <div className="flex flex-col gap-4 p-4 border border-gray-300 bg-[#f9fafb]">
               <h3 className="font-bold text-lg mb-2 text-blue-900 border-b border-gray-400 pb-2">Pengajuan Libur & Cuti</h3>
               <div className="flex flex-col md:flex-row gap-6">
                  {/* Calendar Grid */}
                  <div className="flex-1 bg-white border border-gray-400 p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                         <span className="font-bold text-lg">{new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(viewCutiDate)}</span>
                         <div className="flex gap-2">
                             <button onClick={handlePrevMonth} className="px-2 py-1 bg-gray-200 text-xs font-bold rounded hover:bg-gray-300">&lt; Prev</button>
                             <button onClick={handleNextMonth} className="px-2 py-1 bg-gray-200 text-xs font-bold rounded hover:bg-gray-300">Next &gt;</button>
                         </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center font-bold text-sm mb-2 text-gray-500">
                          <div>Mg</div><div>Sn</div><div>Sl</div><div>Rb</div><div>Km</div><div>Jm</div><div>Sb</div>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                          {/* We simply mock the empty days. A real app will calculate day of week for 1st of month. */}
                          {Array.from({length: new Date(viewCutiDate.getFullYear(), viewCutiDate.getMonth(), 1).getDay()}).map((_, i) => (
                              <div key={`empty-${i}`} className="p-2 border border-transparent"></div>
                          ))}
                          
                          {Array.from({length: new Date(viewCutiDate.getFullYear(), viewCutiDate.getMonth() + 1, 0).getDate()}).map((_, i) => {
                             const day = i + 1;
                             const dateStr = `${viewCutiDate.getFullYear()}-${String(viewCutiDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                             const isSunday = new Date(dateStr).getDay() === 0;
                             
                             const reqsForDay = (leaveRequests || []).filter((r: any) => r.date === dateStr);
                             
                             let bg = "bg-white border-gray-300 hover:bg-blue-50 cursor-pointer";
                             let text = "text-black";
                             if (isSunday) text = "text-red-500";
                             if (reqsForDay.length > 0) bg = reqsForDay.some((r:any) => r.status === 'Disetujui') ? "bg-green-200 border-green-500" : "bg-yellow-200 border-yellow-500";
                             
                             return (
                               <div key={day} onClick={() => { setCutiDateStr(dateStr); alert(`Tanggal ${dateStr} dipilih.`); }} className={`relative p-3 border ${bg} text-center flex flex-col items-center justify-center h-16 min-w-[3rem]`}>
                                  <span className={`font-bold ${text}`}>{day}</span>
                                  {reqsForDay.map((r: any, idx: number) => (
                                     <span key={idx} className={`absolute bottom-1 text-[9px] leading-tight font-bold bg-white/70 px-1 rounded truncate w-11/12 ${r.status==='Disetujui' ? 'text-green-800' : 'text-yellow-800'}`}>{r.employeeName}</span>
                                  ))}
                               </div>
                             );
                          })}
                      </div>
                  </div>
                  
                  {/* Form Ajukan */}
                  <div className="w-full md:w-80 flex flex-col bg-white border border-gray-400 p-4 shadow-sm">
                      <h4 className="font-bold border-b border-gray-300 pb-2 mb-4">Form Cuti Karyawan</h4>
                      <div className="flex flex-col gap-2 mb-3">
                         <label className="text-xs font-bold uppercase text-gray-600">Pilih Karyawan</label>
                         <select value={cutiEmployee} onChange={e => setCutiEmployee(e.target.value)} className="border border-gray-400 p-1.5 outline-none font-medium text-sm">
                            <option value="">== Pilih ==</option>
                            {employees.map((e: any) => <option key={e.id} value={e.name}>{e.name}</option>)}
                         </select>
                      </div>
                      <div className="flex flex-col gap-2 mb-3">
                         <label className="text-xs font-bold uppercase text-gray-600">Tanggal Pengajuan</label>
                         <input type="date" value={cutiDateStr} onChange={e => setCutiDateStr(e.target.value)} className="border border-gray-400 p-1.5 outline-none font-medium text-sm" />
                      </div>
                      <div className="flex flex-col gap-2 mb-4">
                         <label className="text-xs font-bold uppercase text-gray-600">Keterangan / Alasan</label>
                         <textarea rows={3} value={cutiReason} onChange={e => setCutiReason(e.target.value)} className="border border-gray-400 p-1.5 outline-none font-medium text-sm w-full" placeholder="Cth: Cuti Tahunan, Sakit, Izin..."></textarea>
                      </div>
                      <button onClick={handleCutiSubmit} className="w-full bg-blue-600 text-white font-bold py-2 shadow-sm border border-blue-800 hover:bg-blue-700 mt-auto">AJUKAN CUTI MENDATANG</button>
                  </div>
               </div>
            </div>
        )}
        {absensiSubTab === 'rekap' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                  <label className="font-bold">Pilih Bulan:</label>
                  <div className="flex gap-1 items-center">
                    <button onClick={handlePrevRekapMonth} className="px-2 py-1 bg-gray-200 border border-gray-400 font-bold hover:bg-gray-300">&lt; Prev</button>
                    <input type="month" value={rekapMonth} onChange={e => e.target.value && setRekapMonth(e.target.value)} className="border border-gray-400 p-1 font-mono outline-none" />
                    <button onClick={handleNextRekapMonth} className="px-2 py-1 bg-gray-200 border border-gray-400 font-bold hover:bg-gray-300">Next &gt;</button>
                  </div>
              </div>
              <table className="w-full text-left border-collapse whitespace-nowrap border border-gray-400">
                <thead className="bg-[#ece9d8] border-b border-gray-400">
                  <tr><th className="p-2 border-r">Nama Karyawan</th><th className="p-2 border-r">Posisi</th><th className="p-2 border-r text-center">Kehadiran</th><th className="p-2 border-r text-center">Gaji Perhari</th><th className="p-2 border-r text-center">Total Telat</th><th className="p-2 border-r text-center text-red-600">Denda Telat</th><th className="p-2 text-right">Gaji Bersih</th></tr>
                </thead>
                <tbody>
                  {generateRekapAbsen().map((rec: any, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="p-2 border-r font-bold">{rec.name}</td>
                        <td className="p-2 border-r">{rec.position}</td>
                        <td className="p-2 border-r text-center font-bold text-blue-800">{rec.totalDays} Hari</td>
                        <td className="p-2 border-r text-center">
                           <input 
                              type="number"
                              value={rec.dailyPay}
                              onChange={(e) => {
                                  const newVal = parseInt(e.target.value) || 0;
                                  setEmployees(employees.map((emp: any) => emp.name === rec.name ? { ...emp, dailySalary: newVal } : emp));
                              }}
                              className="w-24 text-center border border-gray-300 p-1 outline-none"
                           />
                        </td>
                        <td className="p-2 border-r text-center text-red-600 font-bold">{rec.totalLate} Min</td>
                        <td className="p-2 border-r text-center text-red-600 font-bold">-{rec.totalPenalty > 0 ? rec.totalPenalty.toLocaleString('id-ID') : '0'}</td>
                        <td className="p-2 text-right font-bold text-green-700 text-lg">Rp {rec.finalSalary.toLocaleString('id-ID')}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}

        {absensiSubTab === 'karyawan' && (
            <div className="flex flex-col gap-2">
              <button onClick={() => setShowAddEmpModal(true)} className="bg-blue-600 text-white font-bold py-2 w-48 mb-2 shadow rounded hover:bg-blue-700">+ Tambah Karyawan Baru</button>
              <table className="w-full text-left border-collapse whitespace-nowrap border border-gray-400">
                <thead className="bg-gray-100 border-b border-gray-400">
                  <tr><th className="p-2 border-r w-16">ID</th><th className="p-2 border-r">Nama</th><th className="p-2 border-r">Posisi/Jabatan</th></tr>
                </thead>
                <tbody>
                  {employees.map((emp: any) => (
                      <tr key={emp.id} className="border-b">
                        <td className="p-2 border-r text-gray-500 font-mono">#{emp.id}</td>
                        <td className="p-2 border-r font-bold">{emp.name}</td>
                        <td className="p-2 border-r">{emp.position}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
    </div>
  );
};
