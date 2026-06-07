import React, { useState } from 'react';
import { CustomDatePicker } from './CustomDatePicker';

export const BukuBesar = () => {
  return (
    <div className="flex-1 flex flex-col bg-[#050B24] text-white p-2 h-full overflow-hidden text-[11px] font-sans">
      {/* Top Form Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-1 mb-2">
        {/* Column 1 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">NOTA</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">TEKNISI</label>
            <select className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option></option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">NAMA USER</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">NO. WA USER</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">DEVICE</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">KELUHAN</label>
            <select className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option></option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">STATUS</label>
            <select className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option></option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">GARANSI</label>
            <select className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option></option>
            </select>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">TGL MASUK</label>
            <CustomDatePicker className="flex-1 h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">BIAYA</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">PART</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">JASA</label>
            <input type="text" className="flex-1 bg-yellow-300 text-black px-1 py-0.5 outline-none font-bold h-[22px]" value="Rp 0" readOnly />
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">TGL AMBIL</label>
            <CustomDatePicker className="flex-1 h-[22px]" />
          </div>
          <div className="flex items-center">
            <label className="w-24 font-bold shrink-0">CASH / TF</label>
            <select className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option></option>
            </select>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2 justify-end mt-1">
            <button className="border border-white hover:bg-white hover:text-[#050B24] px-4 py-1 transition-colors font-bold">HAPUS</button>
            <button className="bg-white text-black hover:bg-gray-200 px-4 py-1 font-bold transition-colors">CLEAR</button>
            <button className="bg-[#1e2b6b] border border-white hover:bg-[#2a3c94] px-4 py-1 transition-colors font-bold w-24">SIMPAN</button>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-slate-600 my-1"></div>

      {/* Filter Bar */}
      <div className="flex items-end gap-2 mb-1 w-full overflow-x-auto no-scrollbar">
        <div className="flex flex-col gap-0.5 min-w-[130px]">
          <label className="text-[11px]">Dari Tanggal</label>
          <CustomDatePicker className="h-5" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-[130px]">
          <label className="text-[11px]">Sampai Tanggal</label>
          <CustomDatePicker className="h-5" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-[110px]">
          <label className="text-[11px]">Teknisi</label>
          <select className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px]"><option></option></select>
        </div>
        <div className="flex flex-col gap-0.5 min-w-[130px]">
          <label className="text-[11px]">Status</label>
          <select className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px]"><option></option></select>
        </div>
        <div className="flex flex-col gap-0.5 min-w-[110px]">
          <label className="text-[11px]">Cash / TF</label>
          <select className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px]"><option></option></select>
        </div>
        <div className="flex flex-col gap-0.5 min-w-[100px] mb-[1px]">
          <button className="bg-white text-black px-3 py-0.5 hover:bg-gray-200 font-bold h-5 text-[11px]">RESET</button>
        </div>
        <div className="flex flex-col gap-0.5 min-w-[130px] ml-auto">
          <label className="text-[11px]">No. Nota</label>
          <input type="text" className="bg-white text-black px-1 py-0.5 outline-none h-5 text-[11px]" />
        </div>
        <div className="flex flex-col gap-0.5 min-w-[100px] mb-[1px]">
          <button className="bg-white text-black px-3 py-0.5 hover:bg-gray-200 font-bold h-5 text-[11px]">CARI</button>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 bg-white overflow-auto border border-gray-400 mt-1">
        <table className="w-full text-black text-[11px]">
          <thead className="bg-[#8f1994] text-white sticky top-0 z-10 shadow">
            <tr>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">NOTA</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">STATUS</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">TEKNISI</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">USER</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">WAUSER</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">DEVICE</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">KELUHAN</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">TGLMASUK</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-right">BIAYA</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-right">MODAL</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-right">JASA</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">TGLAMBIL</th>
              <th className="px-2 py-1 border-r border-[#a930b0] font-normal text-left">GARANSI</th>
              <th className="px-2 py-1 font-normal text-left">BAYAR</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5,6,7].map((row, i) => (
              <tr key={i} className="border-b border-gray-300 hover:bg-blue-50 transition-colors">
                <td className="px-2 py-1 border-r border-gray-300">997{8+i}</td>
                <td className="p-0 border-r border-gray-300 text-white font-bold text-center align-middle whitespace-nowrap">
                  {i === 4 ? (
                    <div className="bg-[#cc0000] w-full h-full flex items-center justify-center px-2 py-1 uppercase scale-y-110">CANCEL DIAMBIL</div>
                  ) : (
                    <div className="bg-[#114edc] w-full h-full flex items-center justify-center px-2 py-1 uppercase">DONE DIAMBIL</div>
                  )}
                </td>
                <td className="px-2 py-1 border-r border-gray-300">SMD</td>
                <td className="px-2 py-1 border-r border-gray-300 whitespace-nowrap">USER {i+1}</td>
                <td className="px-2 py-1 border-r border-gray-300">08574091{i*123}</td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[100px]">RENO 5</td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[140px]">GANTI LCD</td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[80px]">10 Sep...</td>
                <td className="px-2 py-1 border-r border-gray-300 text-right whitespace-nowrap">Rp 626.000</td>
                <td className="px-2 py-1 border-r border-gray-300 text-right whitespace-nowrap">Rp 270.000</td>
                <td className="px-2 py-1 border-r border-gray-300 text-right whitespace-nowrap">Rp 356.000</td>
                <td className="px-2 py-1 border-r border-gray-300 truncate max-w-[80px]">10 Sep...</td>
                <td className="px-2 py-1 border-r border-gray-300 whitespace-nowrap">30 HARI</td>
                <td className="px-2 py-1">CASH</td>
              </tr>
            ))}
            <tr>
              <td colSpan={14} className="p-6 text-center text-gray-500 bg-gray-50 h-full">...</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Summary Area */}
      <div className="flex gap-2 mt-2 w-full overflow-x-auto no-scrollbar font-bold text-center">
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Total Unit Masuk</span>
          <div className="bg-[#cc0099] text-xl py-1 rounded-sm shadow-inner">3775</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Unit Nggandul</span>
          <div className="bg-[#4d0099] text-xl py-1 rounded-sm shadow-inner">23</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Progress</span>
          <div className="bg-[#e6e600] text-black text-xl py-1 rounded-sm shadow-inner">7</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Done Saja</span>
          <div className="bg-[#00cc00] text-xl py-1 rounded-sm shadow-inner">7</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Cancel</span>
          <div className="bg-[#ff8c00] text-black text-xl py-1 rounded-sm shadow-inner">9</div>
        </div>
        <div className="flex flex-col min-w-[110px] flex-1">
          <span className="text-[10px] text-left mb-0.5 opacity-90">Cancel Diambil</span>
          <div className="bg-[#cc0000] text-xl py-1 rounded-sm shadow-inner">254</div>
        </div>
      </div>
    </div>
  );
};
