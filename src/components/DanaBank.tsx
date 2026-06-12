import React, { useState } from 'react';
import { CustomDatePicker } from './CustomDatePicker';
import { smartSort } from '../utils';

export const DanaBank = () => {
  const [leftData, setLeftData] = useState([
    { tgl: '07 Feb 2026', jenis: 'SP DANA BANK', nota: '7981', tek: 'AND', part: 'GANTI LCD', harga: 91000, ket: '', nominal: 91000, status: 'DONE BELUM DIAMBIL' },
    { tgl: '24 Feb 2026', jenis: 'SP DANA BANK', nota: '11842', tek: 'AND', part: 'MATI TOTAL', harga: 58000, ket: '', nominal: 58000, status: 'PROGRESS' },
    { tgl: '18 Apr 2026', jenis: 'SP DANA BANK', nota: '12471', tek: 'UDN', part: 'GANTI LCD', harga: 848000, ket: '', nominal: 871000, status: 'PROGRESS' },
    { tgl: '13 May 2026', jenis: 'SP DANA BANK', nota: '12945', tek: 'SMD', part: 'GANTI LCD', harga: 130000, ket: '', nominal: 130000, status: 'DONE BELUM DIAMBIL' },
    { tgl: '07 Jun 2026', jenis: 'SPTB-RTTN', nota: '13093', tek: 'UDN', part: 'TIDAK BISA DICAS, MATI', harga: 2000, ket: 'BATT OPP BLP673 - UDN', nominal: 95000, status: 'SP TAMBAHAN' }
  ]);

  const [rightData, setRightData] = useState([
    { tgl: '02 May 2026', jenis: 'BON URGENT', nota: '', tek: 'ALI', ket: 'BUAT CEKELAN', nominal: 50000 },
    { tgl: '10 May 2026', jenis: 'BON URGENT', nota: '', tek: 'ALI', ket: 'BUAT CEKELAN', nominal: 100000 },
    { tgl: '10 May 2026', jenis: 'BON URGENT', nota: '', tek: 'ALI', ket: 'BUAT BELI LIQUID+CAT...', nominal: 218000 },
    { tgl: '12 May 2026', jenis: 'BON URGENT', nota: '', tek: 'ALI', ket: 'BUAT CEKELAN', nominal: 250000 },
    { tgl: '12 May 2026', jenis: 'BON URGENT', nota: '', tek: 'IRF', ket: 'BUAT CEKELAN', nominal: 500000 },
    { tgl: '13 May 2026', jenis: 'BON URGENT', nota: '', tek: 'ALI', ket: 'BAYAR PAKET PAMPES+...', nominal: 300000 },
    { tgl: '07 Jun 2026', jenis: 'SPTB-RTTN', nota: '13093', tek: 'UDN', ket: 'BATT OPP BLP673 - UDN', nominal: 95000 }
  ]);

  // Left sorting state
  const [leftSortKey, setLeftSortKey] = useState('tgl');
  const [leftSortDirection, setLeftSortDirection] = useState<'asc' | 'desc'>('asc');

  // Right sorting state
  const [rightSortKey, setRightSortKey] = useState('tgl');
  const [rightSortDirection, setRightSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleLeftSort = (key: string) => {
    if (leftSortKey === key) {
      setLeftSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setLeftSortKey(key);
      setLeftSortDirection('asc');
    }
  };

  const handleRightSort = (key: string) => {
    if (rightSortKey === key) {
      setRightSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setRightSortKey(key);
      setRightSortDirection('asc');
    }
  };

  const sortedLeftData = React.useMemo(() => {
    return smartSort(leftData, leftSortKey, leftSortDirection);
  }, [leftData, leftSortKey, leftSortDirection]);

  const sortedRightData = React.useMemo(() => {
    return smartSort(rightData, rightSortKey, rightSortDirection);
  }, [rightData, rightSortKey, rightSortDirection]);

  return (
    <div className="flex-1 flex flex-row overflow-hidden bg-[#3b003b] text-white">
      {/* Left side: Form */}
      <div className="flex-[6] flex flex-col p-2 border-r border-[#660066] overflow-hidden">
        
        {/* Form Container: 3 columns side by side */}
        <div className="flex gap-4 mb-2">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-1.5 w-[260px] shrink-0">
            <div className="flex items-center gap-2">
              <label className="w-20 shrink-0 font-bold text-[11px] uppercase">TGL INPUT</label>
              <CustomDatePicker className="flex-1 h-[22px] text-black bg-white px-1 text-[11px]" />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20 shrink-0 font-bold text-[11px] uppercase">JENIS</label>
              <select className="flex-1 h-[22px] text-black bg-white px-1 text-[11px] outline-none">
                <option></option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20 shrink-0 font-bold text-[11px] uppercase">NOTA</label>
              <div className="flex flex-1 gap-1 h-[22px]">
                <input type="text" className="flex-1 h-full text-black bg-white px-1 text-[11px] outline-none w-0" />
                <button className="h-full px-3 bg-white text-black font-bold text-[11px] outline-none leading-none shrink-0 border border-gray-400">PANGGIL</button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20 shrink-0 font-bold text-[11px] uppercase">TEKNISI</label>
              <select className="flex-1 h-[22px] text-black bg-white px-1 text-[11px] outline-none">
                <option></option>
              </select>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex items-center gap-2">
              <label className="w-[88px] shrink-0 font-bold text-[11px] uppercase">PART AWAL</label>
              <input type="text" className="flex-1 h-[22px] text-black bg-white px-1 text-[11px] outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[88px] shrink-0 font-bold text-[11px] uppercase">KETRNGAN</label>
              <input type="text" className="flex-1 h-[22px] text-black bg-white px-1 text-[11px] outline-none" />
            </div>
            <div className="flex items-center gap-2 mt-auto">
              <label className="w-[88px] shrink-0 font-bold text-[11px] uppercase">STATUS</label>
              <select className="flex-1 h-[22px] text-black bg-white px-1 text-[11px] outline-none">
                <option></option>
              </select>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-1.5 w-[200px] shrink-0">
            <div className="flex items-center gap-2">
              <label className="w-16 shrink-0 font-bold text-[11px] uppercase text-left">HARGA</label>
              <input type="text" className="flex-1 h-[22px] text-black bg-white px-1 text-[11px] outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-16 shrink-0 font-bold text-[11px] uppercase text-left">NOMINAL</label>
              <input type="text" className="flex-1 h-[22px] text-black bg-white px-1 text-[11px] outline-none" />
            </div>
            <div className="flex gap-1 mt-auto w-full">
              <button className="h-[22px] px-2 bg-white text-black font-bold text-[11px] outline-none flex-1 border border-gray-400">HAPUS</button>
              <button className="h-[22px] px-2 bg-white text-black font-bold text-[11px] outline-none flex-1 border border-gray-400">CLEAR</button>
              <button className="h-[22px] px-2 bg-white text-black font-bold text-[11px] outline-none flex-1 border border-gray-400">SIMPAN</button>
            </div>
          </div>

        </div>

        {/* Info Cards */}
        <div className="flex gap-2 mt-4 mb-2 items-end">
          <div className="w-[30%]">
            <div className="text-[11px] mb-0.5 ml-1">Dana Bank</div>
            <div className="bg-white text-black font-bold text-[16px] px-2 py-1 text-center h-[34px] flex items-center justify-center border border-gray-400">Rp 5.000.000</div>
          </div>
          <div className="w-[35%]">
            <div className="text-[11px] mb-0.5 ml-1 text-blue-200">Total Nominal</div>
            <div className="bg-white text-[#1e90ff] font-bold text-[16px] px-2 py-1 text-center border-[3px] border-[#1e90ff] h-[34px] flex items-center justify-center">Rp 1.245.000</div>
          </div>
          <div className="w-[35%]">
            <div className="text-[11px] mb-0.5 ml-1">Sisa Dana Bank</div>
            <div className="bg-[#f0f0f0] text-black font-bold text-[16px] px-2 py-1 text-center h-[34px] flex items-center justify-center border border-gray-400">Rp 3.755.000</div>
          </div>
          <div className="w-16 flex items-end">
            <button className="h-[34px] w-full bg-white text-black font-bold text-[12px] outline-none border border-gray-400">DEL</button>
          </div>
        </div>

        {/* Left Table */}
        <div className="flex-1 bg-[#a3b1c6] mt-1 overflow-auto border border-gray-400 relative">
          <table className="w-full text-black text-[11px]">
            <thead className="bg-[#f0f0f0] sticky top-0 z-10 border-b-2 border-gray-400 select-none">
              <tr>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 w-[70px] cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('tgl')} title="Urutkan Tanggal">
                  <div className="flex items-center gap-1">
                    <span>TGL INPUT</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'tgl' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('jenis')} title="Urutkan Jenis">
                  <div className="flex items-center gap-1 justify-between">
                    <span>JENIS</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'jenis' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 w-12 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('nota')} title="Urutkan Nota">
                  <div className="flex items-center gap-1">
                    <span>NOTA</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'nota' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 w-10 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('tek')} title="Urutkan Teknisi">
                  <div className="flex items-center gap-1">
                    <span>TEK</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'tek' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('part')} title="Urutkan Part">
                  <div className="flex items-center gap-1 justify-between">
                    <span>PART AWAL</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'part' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-right font-bold border-r border-gray-300 w-24 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('harga')} title="Urutkan Harga">
                  <div className="flex items-center justify-end gap-1">
                    <span>HARGA</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'harga' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('ket')} title="Urutkan Keterangan">
                  <div className="flex items-center gap-1 justify-between">
                    <span>KETERANGAN</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'ket' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-right font-bold border-r border-gray-300 w-24 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('nominal')} title="Urutkan Nominal">
                  <div className="flex items-center justify-end gap-1">
                    <span>NOMINAL</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'nominal' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleLeftSort('status')} title="Urutkan Status">
                  <div className="flex items-center gap-1 justify-between">
                    <span>STATUS</span>
                    <span className="font-mono text-[9px] text-[#000080]">{leftSortKey === 'status' ? (leftSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedLeftData.map((row, i) => (
                <tr key={i} className={`border-b border-gray-200 hover:bg-blue-50 ${row.tgl === '07 Jun 2026' ? 'bg-[#3399ff] text-white hover:bg-[#3399ff]' : ''}`}>
                  <td className="px-1.5 py-1 text-center border-r border-gray-200">{row.tgl}</td>
                  <td className="px-1.5 py-1 border-r border-gray-200">{row.jenis}</td>
                  <td className="px-1.5 py-1 text-center border-r border-gray-200">{row.nota}</td>
                  <td className="px-1.5 py-1 text-center border-r border-gray-200">{row.tek}</td>
                  <td className="px-1.5 py-1 border-r border-gray-200">{row.part}</td>
                  <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp {row.harga.toLocaleString('id-ID')}</td>
                  <td className="px-1.5 py-1 border-r border-gray-200">{row.ket}</td>
                  <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp {row.nominal.toLocaleString('id-ID')}</td>
                  <td className="px-1.5 py-1 border-r border-gray-200">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right side: List */}
      <div className="flex-[4] flex flex-col p-2 overflow-hidden">
        <div className="flex items-end gap-1.5 mb-1.5">
          <div className="w-[100px] flex flex-col gap-0.5">
            <span className="text-[11px]">Dari Tanggal</span>
            <CustomDatePicker className="h-[22px] text-black bg-white px-1 w-full text-[11px]" />
          </div>
          <div className="w-[100px] flex flex-col gap-0.5">
            <span className="text-[11px]">Sampai Tanggal</span>
            <CustomDatePicker className="h-[22px] text-black bg-white px-1 w-full text-[11px]" />
          </div>
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-[11px]">Jenis</span>
            <select className="h-[22px] text-black bg-white px-1 w-full outline-none text-[11px]">
              <option></option>
            </select>
          </div>
          <div className="w-[80px] flex flex-col gap-0.5">
            <span className="text-[11px]">Teknisi</span>
            <select className="h-[22px] text-black bg-white px-1 w-full outline-none text-[11px]">
              <option></option>
            </select>
          </div>
          <button className="h-[22px] px-3 bg-white text-black font-bold text-[11px] outline-none leading-none border border-gray-400 shrink-0">RESET</button>
        </div>

        {/* Right Table */}
        <div className="flex-1 bg-[#a3b1c6] mt-0.5 overflow-auto border border-gray-400 relative">
          <table className="w-full text-black text-[11px]">
            <thead className="bg-[#f0f0f0] sticky top-0 z-10 border-b border-gray-300 select-none">
              <tr>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 w-[60px] cursor-pointer hover:bg-gray-300" onClick={() => handleRightSort('tgl')} title="Urutkan Tanggal">
                  <div className="flex items-center gap-1">
                    <span>TGL INPUT</span>
                    <span className="font-mono text-[9px] text-[#000080]">{rightSortKey === 'tgl' ? (rightSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 w-24 cursor-pointer hover:bg-gray-300" onClick={() => handleRightSort('jenis')} title="Urutkan Jenis">
                  <div className="flex items-center gap-1 justify-between">
                    <span>JENIS</span>
                    <span className="font-mono text-[9px] text-[#000080]">{rightSortKey === 'jenis' ? (rightSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 w-12 cursor-pointer hover:bg-gray-300" onClick={() => handleRightSort('nota')} title="Urutkan Nota">
                  <div className="flex items-center gap-1">
                    <span>NOTA</span>
                    <span className="font-mono text-[9px] text-[#000080]">{rightSortKey === 'nota' ? (rightSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 w-10 cursor-pointer hover:bg-gray-300" onClick={() => handleRightSort('tek')} title="Urutkan Teknisi">
                  <div className="flex items-center gap-1">
                    <span>TEK</span>
                    <span className="font-mono text-[9px] text-[#000080]">{rightSortKey === 'tek' ? (rightSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-left font-bold border-r border-gray-300 cursor-pointer hover:bg-gray-300" onClick={() => handleRightSort('ket')} title="Urutkan Keterangan">
                  <div className="flex items-center gap-1 justify-between">
                    <span>KETERANGAN</span>
                    <span className="font-mono text-[9px] text-[#000080]">{rightSortKey === 'ket' ? (rightSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
                <th className="px-1.5 py-1 text-right font-bold border-r border-gray-300 w-20 cursor-pointer hover:bg-gray-300" onClick={() => handleRightSort('nominal')} title="Urutkan Nominal">
                  <div className="flex items-center justify-end gap-1 font-bold">
                    <span>NOMINAL</span>
                    <span className="font-mono text-[9px] text-[#000080]">{rightSortKey === 'nominal' ? (rightSortDirection === 'asc' ? '▲' : '▼') : '↕'}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedRightData.map((row, i) => (
                <tr key={i} className={`border-b border-gray-200 hover:bg-yellow-50 ${row.tgl === '07 Jun 2026' ? 'bg-[#3399ff] text-white hover:bg-[#3399ff]' : ''}`}>
                  <td className="px-1.5 py-1 text-center border-r border-gray-200">{row.tgl}</td>
                  <td className="px-1.5 py-1 border-r border-gray-200">{row.jenis}</td>
                  <td className="px-1.5 py-1 text-center border-r border-gray-200">{row.nota}</td>
                  <td className="px-1.5 py-1 text-center border-r border-gray-200">{row.tek}</td>
                  <td className="px-1.5 py-1 border-r border-gray-200 truncate max-w-[120px]">{row.ket}</td>
                  <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp {row.nominal.toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Bottom Stats */}
        <div className="flex gap-4 mt-2">
          <div className="flex-[3] flex flex-col gap-0.5">
            <span className="text-[11px]">Total SPTB-RTTN</span>
            <div className="bg-white text-black font-bold px-2 py-1 h-[26px] flex items-center justify-start text-[14px] border border-gray-400">Rp 16.465.000</div>
          </div>
          <div className="flex-[4] flex flex-col gap-0.5">
            <span className="text-[11px] text-right">Total BON URGENT</span>
            <div className="bg-white text-black font-bold px-2 py-1 h-[26px] flex items-center justify-end text-[14px] border border-gray-400">Rp 73.121.500</div>
          </div>
        </div>

      </div>
    </div>
  );
};
