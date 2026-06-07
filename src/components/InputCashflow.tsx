import React from 'react';
import { CustomDatePicker } from './CustomDatePicker';

export const InputCashflow = () => {
  return (
    <div className="flex-1 flex bg-[#3B0709] text-white p-2 gap-2 h-full overflow-hidden text-[11px] font-sans">
      
      {/* Left Form Panel */}
      <div className="w-[320px] flex flex-col shrink-0">
        <div className="flex flex-col gap-2 p-2 h-full">
          
          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">TGL INPUT</label>
            <CustomDatePicker className="flex-1 h-[22px]" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">JENIS</label>
            <select className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option></option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">NOTA</label>
            <div className="flex-1 flex gap-1">
              <input type="text" className="w-full bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
              <button className="bg-white text-black px-2 font-bold hover:bg-gray-200 shrink-0 h-[22px]">PANGGIL</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">TEKNISI</label>
            <select className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]">
              <option></option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">KETERANGAN</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">BIAYA</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">P. O. B.</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">JASA</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">CASH / TF</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-28 font-bold shrink-0">STATUS</label>
            <input type="text" className="flex-1 bg-white text-black px-1 py-0.5 outline-none h-[22px]" />
          </div>

          <div className="flex items-center gap-2 mt-4 justify-between">
            <button className="bg-white text-black font-bold px-4 py-1.5 hover:bg-gray-200 transition-colors">HAPUS</button>
            <button className="bg-white text-black font-bold px-4 py-1.5 hover:bg-gray-200 transition-colors">CLEAR</button>
            <button className="bg-white text-black font-bold px-4 py-1.5 hover:bg-gray-200 transition-colors">SIMPAN</button>
          </div>

          {/* Empty Space for spacing/aesthetic like the image */}
          <div className="mt-4 flex-1 border border-red-900/50 bg-[#2A0506]"></div>

        </div>
      </div>

      {/* Right Content Panel */}
      <div className="flex-1 flex flex-col border border-white p-1">
        
        {/* Filter Header */}
        <div className="flex items-end gap-2 mb-1 p-1">
          <div className="flex flex-col gap-0.5 w-32">
            <label className="text-[11px]">Dari Tanggal</label>
            <CustomDatePicker className="h-[22px]" />
          </div>
          <div className="flex flex-col gap-0.5 w-32">
            <label className="text-[11px]">Sampai Tanggal</label>
            <CustomDatePicker className="h-[22px]" />
          </div>
          <div className="flex flex-col gap-0.5 w-32">
            <label className="text-[11px]">Jenis</label>
            <select className="bg-white text-black px-1 py-0.5 outline-none h-[22px]"><option></option></select>
          </div>
          <div className="flex flex-col gap-0.5 w-24">
            <label className="text-[11px]">Cash / TF</label>
            <select className="bg-white text-black px-1 py-0.5 outline-none h-[22px]"><option></option></select>
          </div>
          <div className="ml-auto flex items-end">
            <button className="bg-white text-black px-4 py-0.5 hover:bg-gray-200 font-bold h-[22px]">RESET</button>
          </div>
        </div>

        {/* Table wrapper */}
        <div className="flex-1 bg-[#a3b1c6] overflow-auto border border-gray-400">
          <table className="w-full text-black text-[11px]">
            <thead className="bg-[#f0f0f0] text-black sticky top-0 z-10 border-b-2 border-gray-400">
              <tr>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">TGL INPUT</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">JENIS</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">NOTA</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">TEKNISI</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">KETERANGAN</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">BIAYA</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">P.O.B.</th>
                <th className="px-2 py-1 border-r border-gray-300 font-bold text-center">JASA</th>
                <th className="px-2 py-1 font-bold text-center">BAYAR</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13199", teknisi: "AND", ket: "MATI TOTAL", biaya: "Rp. 350.000", pob: "Rp. 0", jasa: "Rp. 350.000", bayar: "CASH", selected: true},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13233", teknisi: "IRF", ket: "GANTI BATRE+TOMBOL", biaya: "Rp. 275.000", pob: "Rp. 102.000", jasa: "Rp. 173.000", bayar: "CASH"},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13216", teknisi: "IRF", ket: "MATI TOTAL", biaya: "Rp. 450.000", pob: "Rp. 0", jasa: "Rp. 450.000", bayar: "QRIS"},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13234", teknisi: "SMD", ket: "IKLAN", biaya: "Rp. 125.000", pob: "Rp. 0", jasa: "Rp. 125.000", bayar: "CASH"},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13237", teknisi: "SMD", ket: "GANTI LCD", biaya: "Rp. 346.000", pob: "Rp. 144.000", jasa: "Rp. 202.000", bayar: "CASH", teknisiBg: true},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13215", teknisi: "UDN", ket: "TIDAK BISA DICAS", biaya: "Rp. 250.000", pob: "Rp. 0", jasa: "Rp. 250.000", bayar: "CASH"},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13232", teknisi: "UDN", ket: "GANTI BATRE", biaya: "Rp. 253.000", pob: "Rp. 107.000", jasa: "Rp. 146.000", bayar: "QRIS"},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13238", teknisi: "UDN", ket: "GANTI LCD", biaya: "Rp. 977.000", pob: "Rp. 407.000", jasa: "Rp. 570.000", bayar: "CASH"},
                {tgl: "07 Jun 2026...", jenis: "NOTA", nota: "13235", teknisi: "UDN", ket: "GANTI LCD", biaya: "Rp. 260.000", pob: "Rp. 105.000", jasa: "Rp. 155.000", bayar: "QRIS"},
              ].map((row, i) => (
                <tr key={i} className={`border-b border-gray-300 transition-colors ${row.selected ? 'bg-[#007acc] text-white' : 'hover:bg-gray-100'}`}>
                  <td className="px-2 py-1 border-r border-gray-300 text-center">{row.tgl}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-center">{row.jenis}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-center">{row.nota}</td>
                  <td className={`px-2 py-1 border-r border-gray-300 text-center ${row.teknisiBg ? 'bg-[#d89ba1] text-black font-semibold' : ''}`}>{row.teknisi}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-left pl-2">{row.ket}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-right pr-2">{row.biaya}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-right pr-2">{row.pob}</td>
                  <td className="px-2 py-1 border-r border-gray-300 text-right pr-2">{row.jasa}</td>
                  <td className="px-2 py-1 text-center">{row.bayar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary Panel */}
        <div className="flex items-end gap-2 mt-2">
          <div className="flex flex-col w-32">
            <span className="text-[10px] opacity-90 mb-0.5">Uang Masuk</span>
            <div className="bg-[#ccffff] text-black font-bold text-center py-1 text-sm border border-gray-500 shadow-sm tracking-tight text-[11px]">Rp 3.286.000</div>
          </div>
          <div className="flex flex-col w-32">
            <span className="text-[10px] opacity-90 mb-0.5">Uang Keluar</span>
            <div className="bg-[#ccffff] text-black font-bold text-center py-1 text-sm border border-gray-500 shadow-sm tracking-tight text-[11px]">Rp 865.000</div>
          </div>
          <div className="flex flex-col w-32">
            <span className="text-[10px] opacity-90 mb-0.5">Total</span>
            <div className="bg-[#ccffff] text-black font-bold text-center py-1 text-sm border border-gray-500 shadow-sm tracking-tight text-[11px]">Rp 2.421.000</div>
          </div>
          <div className="flex flex-col w-32">
            <span className="text-[10px] opacity-90 mb-0.5">TF / QRIS</span>
            <div className="bg-[#ffffcc] text-black font-bold text-center py-1 text-sm border border-gray-500 shadow-sm tracking-tight text-[11px]">Rp 963.000</div>
          </div>
          <div className="flex flex-col w-32 ml-auto">
            <span className="text-[10px] opacity-90 mb-0.5">Uang Laci Flx</span>
            <div className="bg-[#000080] text-white font-bold text-center py-1 text-sm border border-gray-500 shadow-sm tracking-tight text-[11px]">Rp 1.458.000</div>
          </div>
        </div>

      </div>

    </div>
  );
};
