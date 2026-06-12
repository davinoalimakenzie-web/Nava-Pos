import React, { useState } from 'react';
import { Clock, Pencil } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LegacyWindowHeader } from './LegacyWindowHeader';
import { currentMonthStr, defaultDate } from '../data';
import { smartSort } from '../utils';

export const Absensi = ({ currentTime }: { currentTime: Date }) => {
  const { 
    user, appUsers, employees, setEmployees, attendances, setAttendances, setShowAddEmpModal, appLogs, addLog, expenses, setExpenses, storeSettings, wallets, setWallets,
    waitingPayments, setWaitingPayments
  } = useAppContext();

  const [absensiSubTab, setAbsensiSubTab] = useState('harian');
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedEmployeeAbsensi, setSelectedEmployeeAbsensi] = useState('');
  const { leaveRequests, setLeaveRequests } = useAppContext();

  const [filterStartDate, setFilterStartDate] = useState(defaultDate);
  const [filterEndDate, setFilterEndDate] = useState(defaultDate);
  const [filterBranch, setFilterBranch] = useState('Semua');
  const [absenAction, setAbsenAction] = useState('');

  const [sortKey, setSortKey] = useState('user');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredAttendances = React.useMemo(() => {
    return attendances.filter((a: any) => {
      let pass = true;
      if (filterStartDate) pass = pass && a.date >= filterStartDate;
      if (filterEndDate) pass = pass && a.date <= filterEndDate;
      if (filterBranch !== 'Semua') {
         const empInfo = employees.find((e: any) => e.name === a.user);
         if (empInfo) pass = pass && empInfo.branch === filterBranch;
         else pass = false;
      }
      if (selectedEmployeeAbsensi) pass = pass && a.user === selectedEmployeeAbsensi;
      return pass;
    });
  }, [attendances, filterStartDate, filterEndDate, filterBranch, selectedEmployeeAbsensi, employees]);

  const sortedFilteredAttendances = React.useMemo(() => {
    return smartSort(filteredAttendances, sortKey, sortDirection);
  }, [filteredAttendances, sortKey, sortDirection]);

  // Cuti Form State
  const [viewCutiDate, setViewCutiDate] = useState(new Date());
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
      if (!selectedEmployeeAbsensi || !cutiDateStr || !cutiReason) return alert('Harap isi semua field cuti, pilih karyawan di header!');
      
      const existingCutiOnDate = leaveRequests?.find((r: any) => r.date === cutiDateStr && r.status !== 'Ditolak');
      if (existingCutiOnDate) {
          return alert(`Sudah ada karyawan ngajukan cuti / off (${existingCutiOnDate.employeeName}) pada tanggal tersebut! Hanya boleh 1 karyawan cuti per hari.`);
      }

      const req = {
          id: 'CUTI-' + Date.now(),
          employeeName: selectedEmployeeAbsensi,
          date: cutiDateStr,
          reason: cutiReason,
          status: 'Pending'
      };
      setLeaveRequests([...(leaveRequests || []), req]);
      setSelectedEmployeeAbsensi('');
      setCutiDateStr('');
      setCutiReason('');
      alert('Pengajuan Cuti berhasil dikirim!');
  };

  const [editingAttId, setEditingAttId] = useState<number | null>(null);
  const [editingAttTime, setEditingAttTime] = useState('');

  const calculateLateMinutes = (timeStr: string) => {
    if (!timeStr || timeStr === '-') return 0;
    const parts = timeStr.replace('.', ':').split(':');
    const h = Number(parts[0]);
    const m = Number(parts[1] || 0);
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
      setEditingAttTime(current !== '-' ? current.replace('.', ':') : '09:00');
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
    addLog('ABSENSI', `${selectedEmployeeAbsensi} diset Libur`);
    alert(`Berhasil set Libur untuk ${selectedEmployeeAbsensi}!`);
  };

  const handleClockIn = () => {
    if (!selectedEmployeeAbsensi) return alert('Pilih nama karyawan terlebih dahulu!');
    const existing = attendances.find((a: any) => a.date === defaultDate && a.user === selectedEmployeeAbsensi);
    if (existing && existing.status !== 'Libur') return alert('Karyawan tersebut sudah Clock In hari ini!');
    
    const timeNowStr = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(/\./g, ':');
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
    addLog('ABSENSI', `${selectedEmployeeAbsensi} Clock In pada ${timeNowStr}`);
    alert(`Berhasil Clock In untuk ${selectedEmployeeAbsensi}!`);
  };

  const handleClockOut = () => {
    if (!selectedEmployeeAbsensi) return alert('Pilih nama karyawan terlebih dahulu!');
    let found = false;
    const updated = attendances.map((a: any) => {
      if (a.date === defaultDate && a.user === selectedEmployeeAbsensi && a.status === 'Clock In') {
        found = true;
        return { ...a, timeOut: currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(/\./g, ':'), status: 'Selesai' };
      }
      return a;
    });
    if (found) {
      setAttendances(updated);
      addLog('ABSENSI', `${selectedEmployeeAbsensi} Clock Out`);
      alert(`Berhasil Clock Out untuk ${selectedEmployeeAbsensi}!`);
    } else {
      alert('Karyawan tersebut belum Clock In hari ini!');
    }
  };

  const generateRekapAbsen = () => {
     let filteredData = attendances;
     let filteredBon = expenses;

     if (filterStartDate) {
         filteredData = filteredData.filter((a: any) => a.date >= filterStartDate);
         filteredBon = filteredBon.filter((e: any) => (e.date && e.date >= filterStartDate) || (e.isoDate && e.isoDate.startsWith(filterStartDate)));
     }
     if (filterEndDate) {
         filteredData = filteredData.filter((a: any) => a.date <= filterEndDate);
         filteredBon = filteredBon.filter((e: any) => (e.date && e.date <= filterEndDate) || (e.isoDate && e.isoDate.startsWith(filterEndDate)));
     }

     const summary = employees
        .filter((emp: any) => filterBranch === 'Semua' || emp.branch === filterBranch)
        .filter((emp: any) => !selectedEmployeeAbsensi || emp.name === selectedEmployeeAbsensi)
        .map((emp: any) => {
        const empAtt = filteredData.filter((a: any) => a.user === emp.name && a.status === 'Selesai');
        const empBon = filteredBon.filter((e: any) => e.isBon && e.bonEmployee === emp.name);
        const totalBon = empBon.reduce((sum: number, b: any) => sum + (b.amount || 0), 0);
        const totalLate = empAtt.reduce((sum: number, a: any) => sum + (a.lateMins || 0), 0);
        const dailyPay = emp.dailySalary ? emp.dailySalary : 0;
        const grossSalary = empAtt.length * dailyPay;
        const totalPenalty = Math.round((totalLate / 60) * 10000);
        const finalSalary = grossSalary - totalPenalty - totalBon;
        return {
           name: emp.name,
           position: emp.position,
           totalDays: empAtt.length,
           totalLate: totalLate,
           dailyPay,
           totalPenalty,
           totalBon,
           finalSalary: finalSalary > 0 ? finalSalary : 0
        };
     });
     return summary;
  };

  return (
    <div className="flex-1 flex flex-col bg-[#8fb4d9] border border-[#8fb4d9] overflow-hidden">
      <LegacyWindowHeader title="SISTEM ABSENSI" currentTime={currentTime} />
      
      {/* Global Filter Bar */}
      <div className="bg-[#000040] p-1.5 flex items-end gap-2 shrink-0 shadow-sm border-b border-[#000030] overflow-x-auto">
         <div className="flex flex-col gap-0.5 text-white w-40 shrink-0">
            <label className="text-[12px] font-medium">Dari Tanggal</label>
            <div className="flex items-center gap-1 bg-white px-1 rounded-sm h-[28px]">
               <input type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} className="text-black outline-none w-full font-medium text-[13px] bg-transparent" />
            </div>
         </div>
         <div className="flex flex-col gap-0.5 text-white w-40 shrink-0">
            <label className="text-[12px] font-medium">Sampai Tanggal</label>
            <div className="flex items-center gap-1 bg-white px-1 rounded-sm h-[28px]">
               <input type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} className="text-black outline-none w-full font-medium text-[13px] bg-transparent" />
            </div>
         </div>
         <div className="flex flex-col gap-0.5 text-white w-32 shrink-0">
            <label className="text-[12px] font-medium">Cabang</label>
            <div className="flex items-center gap-1 bg-white px-1 rounded-sm h-[28px]">
               <select value={filterBranch} onChange={e => { setFilterBranch(e.target.value); setSelectedEmployeeAbsensi(''); }} className="w-full text-black outline-none font-medium text-[13px] bg-transparent">
                  <option value="Semua">Semua</option>
                  {storeSettings?.branches?.map((b: string) => <option key={b} value={b}>{b}</option>)}
               </select>
            </div>
         </div>
         <div className="flex flex-col gap-0.5 text-white w-48 shrink-0">
            <label className="text-[12px] font-medium">Karyawan</label>
            <div className="flex items-center gap-1 bg-white px-1 rounded-sm h-[28px]">
               <select value={selectedEmployeeAbsensi} onChange={e => setSelectedEmployeeAbsensi(e.target.value)} className="w-full text-black outline-none font-medium text-[13px] bg-transparent">
                  <option value="">Semua Karyawan</option>
                  {employees.filter((e: any) => filterBranch === 'Semua' || e.branch === filterBranch).map((e: any) => (
                      <option key={e.id} value={e.name}>{e.name}</option>
                  ))}
               </select>
            </div>
         </div>
         <div className="flex flex-col gap-0.5 text-white w-40 shrink-0">
            <label className="text-[12px] font-medium">Aksi Absen</label>
            <div className="flex items-center gap-1 bg-white px-1 rounded-sm h-[28px]">
               <select disabled={absensiSubTab !== 'harian'} value={absenAction} onChange={e => setAbsenAction(e.target.value)} className="w-full text-black outline-none font-medium text-[13px] bg-transparent disabled:opacity-50">
                  <option value="">-- Pilih Aksi --</option>
                  <option value="clockin">Clock In</option>
                  <option value="clockout">Clock Out</option>
                  <option value="libur">Off / Libur</option>
                  <option value="hitung_gaji">Hitung Gaji</option>
               </select>
            </div>
         </div>
         <div className="flex flex-col gap-0.5 text-white shrink-0">
            <label className="text-[12px] font-medium">&nbsp;</label>
            <button onClick={() => {
                if (absenAction === 'clockin') {
                    handleClockIn();
                    setAbsenAction('');
                } else if (absenAction === 'clockout') {
                    handleClockOut();
                    setAbsenAction('');
                } else if (absenAction === 'libur') {
                    handleLibur();
                    setAbsenAction('');
                } else if (absenAction === 'hitung_gaji') {
                    setShowPayModal(true);
                } else {
                    setFilterStartDate(defaultDate); 
                    setFilterEndDate(defaultDate); 
                    setFilterBranch('Semua'); 
                    setSelectedEmployeeAbsensi('');
                    setAbsenAction('');
                }
            }} className={`h-[28px] ${absensiSubTab === 'harian' && absenAction === 'hitung_gaji' ? 'bg-green-600 hover:bg-green-700' : (absensiSubTab === 'harian' && absenAction ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700')} px-3 font-bold text-[12px] rounded-sm shadow-sm transition-colors whitespace-nowrap`}>
                {absensiSubTab === 'harian' && absenAction === 'hitung_gaji' ? 'Bayar Gaji' : (absensiSubTab === 'harian' && absenAction ? 'Refresh / Simpan' : 'Refresh')}
            </button>
         </div>
      </div>

      <div className="flex gap-1 shrink-0 bg-[#f9fafb] p-1 border-b border-gray-300">
          <button onClick={() => setAbsensiSubTab('harian')} className={`px-4 py-1.5 font-bold ${absensiSubTab === 'harian' ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Absen Hari Ini</button>
          <button onClick={() => setAbsensiSubTab('cuti')} className={`px-4 py-1.5 font-bold ${absensiSubTab === 'cuti' ? 'bg-blue-100 text-blue-900 border-b-2 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>Req Cuti</button>
      </div>
      
      <div className="flex-1 p-2 overflow-auto bg-white">
        {absensiSubTab === 'harian' && (
            <div className="flex flex-col gap-4">
              <table className="w-full text-left border-collapse whitespace-nowrap border border-gray-400">
                <thead className="bg-[#ece9d8] border-b border-gray-400">
                  {absenAction === 'hitung_gaji' && (() => {
                    const rekap = generateRekapAbsen();
                    const totalTHP = rekap.reduce((sum: number, r: any) => sum + r.finalSalary, 0);
                    const totalBon = rekap.reduce((sum: number, r: any) => sum + r.totalBon, 0);
                    const totalPenalty = rekap.reduce((sum: number, r: any) => sum + r.totalPenalty, 0);
                    const totalLate = rekap.reduce((sum: number, r: any) => sum + r.totalLate, 0);
                    return (
                      <tr className="bg-white border-b-2 border-gray-300">
                        <th className="p-2 border-r text-left bg-white font-bold">
                          <span className="inline-block bg-green-100 text-green-900 border border-green-300 font-mono text-sm px-2.5 py-0.5 rounded font-bold">
                            Rp {totalTHP.toLocaleString('id-ID')}
                          </span>
                        </th>
                        <th colSpan={4} className="border-r bg-white"></th>
                        <th className="p-2 border-r text-center bg-white font-bold">
                          <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-mono text-sm px-2.5 py-0.5 rounded font-bold">
                            {totalLate.toLocaleString('id-ID')} Min
                          </span>
                        </th>
                        <th className="p-2 border-r text-center bg-white font-bold">
                          <span className="inline-block bg-orange-100 text-orange-900 border border-orange-355 font-mono text-sm px-2.5 py-0.5 rounded font-bold">
                            Rp {totalPenalty.toLocaleString('id-ID')}
                          </span>
                        </th>
                        <th className="p-2 text-center bg-white font-bold">
                          <span className="inline-block bg-red-100 text-red-900 border border-red-300 font-mono text-sm px-2.5 py-0.5 rounded font-bold">
                            Rp {totalBon.toLocaleString('id-ID')}
                          </span>
                        </th>
                      </tr>
                    );
                  })()}
                  <tr className="bg-[#ece9d8] text-blue-900 border-b border-gray-400 select-none text-xs">
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200" onClick={() => handleSort('user')} title="Urutkan Nama Karyawan">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span>Nama Karyawan</span>
                        <span className="font-mono text-[9px] text-[#000080]">{sortKey === 'user' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-center" onClick={() => handleSort('date')} title="Urutkan Tanggal">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Tanggal</span>
                        <span className="font-mono text-[9px] text-[#000080]">{sortKey === 'date' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-center" onClick={() => handleSort('timeIn')} title="Urutkan Jam Masuk">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Jam Masuk</span>
                        <span className="font-mono text-[9px] text-[#000080]">{sortKey === 'timeIn' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-center" onClick={() => handleSort('timeOut')} title="Urutkan Jam Keluar">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Jam Keluar</span>
                        <span className="font-mono text-[9px] text-[#000080]">{sortKey === 'timeOut' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-center" onClick={() => handleSort('status')} title="Urutkan Status">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Status</span>
                        <span className="font-mono text-[9px] text-[#000080]">{sortKey === 'status' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200 text-center" onClick={() => handleSort('lateMins')} title="Urutkan Keterlambatan">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span><Clock className="w-3.5 h-3.5 inline-block mr-1"/>Keterlambatan</span>
                        <span className="font-mono text-[9px] text-[#000080]">{sortKey === 'lateMins' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 border-r border-gray-300 text-center text-red-600 cursor-pointer hover:bg-gray-200" onClick={() => handleSort('lateMins')} title="Urutkan Denda">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Denda Telat</span>
                        <span className="font-mono text-[9px] text-red-650">{sortKey === 'lateMins' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                    <th className="p-2 text-center text-red-600 font-bold cursor-pointer hover:bg-gray-200" onClick={() => handleSort('user')} title="Urutkan Kasbon">
                      <div className="flex items-center gap-1.5 justify-center">
                        <span>Kasbon</span>
                        <span className="font-mono text-[9px] text-red-650">{sortKey === 'user' ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedFilteredAttendances.map((a: any) => (
                      <tr key={a.id} className="border-b">
                        <td className="p-2 border-r font-bold">{a.user}</td>
                        <td className="p-2 border-r font-mono text-center text-sm">{a.date.split('-').reverse().join('/')}</td>
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
                        <td className="p-2 border-r text-center text-red-600 font-bold">{a.lateMins > 0 ? `${a.lateMins} Menit` : '-'}</td>
                        <td className="p-2 border-r text-center text-red-600">
                          {a.lateMins > 0 ? `Rp ${Math.round((a.lateMins / 60) * 10000).toLocaleString('id-ID')}` : '-'}
                        </td>
                        <td className="p-2 text-center text-red-600 font-bold">
                          {(() => {
                            const empBons = expenses?.filter((e: any) => {
                              return e.isBon && 
                                     e.bonEmployee === a.user && 
                                     ((e.date && e.date.startsWith(a.date)) || 
                                      (e.isoDate && e.isoDate.startsWith(a.date)));
                            }) || [];
                            const totalBonVal = empBons.reduce((sum: number, b: any) => sum + (b.amount || 0), 0);
                            return totalBonVal > 0 ? `Rp ${totalBonVal.toLocaleString('id-ID')}` : '-';
                          })()}
                        </td>
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
                         <div className="border border-gray-400 p-1.5 bg-gray-100 font-medium text-sm text-gray-600">
                             {selectedEmployeeAbsensi || 'Pilih Karyawan di Header Global Atas 👆'}
                         </div>
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


        {showPayModal && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
             <div className="bg-[#ece9d8] border-2 border-gray-400 w-full max-w-md flex flex-col shadow-xl text-black animate-none">
                <div className="bg-[#000080] text-white px-2 py-1 flex items-center font-bold text-xs justify-between">
                   <span>Konfirmasi VALIDASI Gaji (THP)</span>
                   <button onClick={() => setShowPayModal(false)} className="bg-gray-300 text-black px-1.5 font-bold hover:bg-red-500 hover:text-white border border-gray-400">X</button>
                </div>
                <div className="p-4 flex flex-col gap-3">
                   <h3 className="text-sm font-bold border-b pb-1 text-blue-900">Review Nominal THP Karyawan:</h3>
                   <div className="max-h-48 overflow-y-auto bg-white border p-2 flex flex-col gap-1.5 animate-none">
                      {generateRekapAbsen().map((emp: any, idx: number) => (
                         <div key={idx} className="flex justify-between text-xs font-mono border-b pb-1">
                            <div>
                               <span className="font-bold text-black">{emp.name}</span>
                               <span className="text-gray-500 block">({emp.totalDays} Hari kerja, denda: Rp {emp.totalPenalty.toLocaleString('id-ID')}, bon: Rp {emp.totalBon.toLocaleString('id-ID')})</span>
                            </div>
                            <span className="font-bold text-green-700">Rp {emp.finalSalary.toLocaleString('id-ID')}</span>
                         </div>
                      ))}
                   </div>
                   <div className="bg-yellow-50 border border-yellow-200 p-2.5 rounded text-xs text-yellow-900 leading-relaxed">
                      <p className="font-bold mb-1">Peringatan Dana Bebas:</p>
                      <p>Saldo Dana Bebas saat ini: <b>Rp {(wallets?.danaBebas || 0).toLocaleString('id-ID')}</b></p>
                      <p className="mt-1">Dana Bebas setelah pembayaran: <b className="text-blue-900">Rp {((wallets?.danaBebas || 0) - generateRekapAbsen().reduce((sum: number, r: any) => sum + r.finalSalary, 0)).toLocaleString('id-ID')}</b></p>
                      <p className="mt-2 text-red-700 font-bold">Harap pastikan semua nominal di atas sudah sesuai dan tidak ada kesalahan nominal gaji sebelum melanjutkan!</p>
                   </div>
                   
                   <div className="flex justify-end gap-2 mt-2">
                      <button onClick={() => setShowPayModal(false)} className="px-4 py-1.5 border border-gray-500 bg-gray-200 hover:bg-gray-300 font-bold text-xs">Batal</button>
                      <button 
                         // Tidak ada limit saldo dana bebas saat mengajukan ke waitlist
                         onClick={() => {
                            const rekapData = generateRekapAbsen();
                            if (rekapData.length === 0) {
                               return alert('Tidak ada data gaji untuk diajukan.');
                            }
                            
                            // Generate and push waitlist items
                            const newItems = rekapData.map((item: any) => ({
                               id: 'WP-' + String(item.name).replace(/\s+/g, '-') + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
                               name: item.name,
                               salary: item.finalSalary,
                               bonus: 0,
                               createdAt: new Date().toISOString(),
                               details: `Kehadiran: ${item.totalDays} Hari, Denda: Rp ${item.totalPenalty.toLocaleString('id-ID')}, Bon: Rp ${item.totalBon.toLocaleString('id-ID')}`
                            }));
                            setWaitingPayments((prev: any[]) => [...(prev || []), ...newItems]);
                            
                            const amt = rekapData.reduce((sum: number, r: any) => sum + r.finalSalary, 0);
                            addLog('PENGGAJIAN', `Mengajukan ${rekapData.length} Gaji Karyawan (Total Rp ${amt.toLocaleString('id-ID')}) ke Daftar Tunggu Pembayaran`);
                            alert(`Berhasil memasukkan ${rekapData.length} Gaji Karyawan ke Daftar Tunggu Pembayaran Gaji! Silakan kelola di menu Dana Bebas.`);
                            setShowPayModal(false);
                            setAbsenAction('');
                            return;
                         }} 
                         className="px-4 py-1.5 bg-green-600 text-white hover:bg-green-700 font-bold text-xs shadow-sm"
                      >
                         Lanjut Ajukan Gaji
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
