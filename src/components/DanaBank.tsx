import React from 'react';
import { CustomDatePicker } from './CustomDatePicker';

export const DanaBank = () => {
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
            <thead className="bg-[#f0f0f0] sticky top-0 z-10 border-b-2 border-gray-400">
              <tr>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-[70px] leading-tight">TGL<br/>INPUT</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300">JENIS</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-12">NOTA</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-10">TEK</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300">PART AWAL</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-24">HARGA</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300">KETERANGAN</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-24">NOMINAL</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300">STATUS</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">07 Feb 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">SP DANA BANK</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">7981</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">AND</td>
                <td className="px-1.5 py-1 border-r border-gray-200">GANTI LCD</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 91.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 91.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200">DONE BELUM DIAMBIL</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">24 Feb 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">SP DANA BANK</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">11842</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">AND</td>
                <td className="px-1.5 py-1 border-r border-gray-200">MATI TOTAL</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 58.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 58.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200">PROGRESS</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">18 Apr 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">SP DANA BANK</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">12471</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">UDN</td>
                <td className="px-1.5 py-1 border-r border-gray-200">GANTI LCD</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 848.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 871.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200">PROGRESS</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">13 May 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">SP DANA BANK</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">12945</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">SMD</td>
                <td className="px-1.5 py-1 border-r border-gray-200">GANTI LCD</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 130.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 130.000</td>
                <td className="px-1.5 py-1 border-r border-gray-200">DONE BELUM DIAMBIL</td>
              </tr>
              <tr className="border-b border-gray-200 bg-[#3399ff] text-white">
                <td className="px-1.5 py-1 text-center border-r border-[#66b2ff]">07 Jun 2026</td>
                <td className="px-1.5 py-1 border-r border-[#66b2ff]">SPTB-RTTN</td>
                <td className="px-1.5 py-1 text-center border-r border-[#66b2ff]">13093</td>
                <td className="px-1.5 py-1 text-center border-r border-[#66b2ff]">UDN</td>
                <td className="px-1.5 py-1 border-r border-[#66b2ff]">TIDAK BISA DICAS, MATI</td>
                <td className="px-1.5 py-1 text-right border-r border-[#66b2ff]">Rp 2.000</td>
                <td className="px-1.5 py-1 border-r border-[#66b2ff]">BATT OPP BLP673 - UDN</td>
                <td className="px-1.5 py-1 text-right border-r border-[#66b2ff]">Rp 95.000</td>
                <td className="px-1.5 py-1 border-r border-[#66b2ff]">SP TAMBAHAN</td>
              </tr>
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
            <thead className="bg-[#f0f0f0] sticky top-0 z-10 border-b border-gray-300">
              <tr>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-[60px] leading-tight">TGL<br/>INPUT</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-24">JENIS</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-12">NOTA</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-10">TEK</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300">KETERANGAN</th>
                <th className="px-1.5 py-1 text-left font-normal border-r border-gray-300 w-20">NOMINAL</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">02 May 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">BON URGENT</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">ALI</td>
                <td className="px-1.5 py-1 border-r border-gray-200 truncate max-w-[120px]">BUAT CEKELAN</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 50.000</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">10 May 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">BON URGENT</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">ALI</td>
                <td className="px-1.5 py-1 border-r border-gray-200 truncate max-w-[120px]">BUAT CEKELAN</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 100.000</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">10 May 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">BON URGENT</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">ALI</td>
                <td className="px-1.5 py-1 border-r border-gray-200 truncate max-w-[120px]">BUAT BELI LIQUID+CAT...</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 218.000</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">12 May 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">BON URGENT</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">ALI</td>
                <td className="px-1.5 py-1 border-r border-gray-200 truncate max-w-[120px]">BUAT CEKELAN</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 250.000</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">12 May 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">BON URGENT</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">IRF</td>
                <td className="px-1.5 py-1 border-r border-gray-200 truncate max-w-[120px]">BUAT CEKELAN</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 500.000</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="px-1.5 py-1 text-center border-r border-gray-200">13 May 2026</td>
                <td className="px-1.5 py-1 border-r border-gray-200">BON URGENT</td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200"></td>
                <td className="px-1.5 py-1 text-center border-r border-gray-200">ALI</td>
                <td className="px-1.5 py-1 border-r border-gray-200 truncate max-w-[120px]">BAYAR PAKET PAMPES+...</td>
                <td className="px-1.5 py-1 text-right border-r border-gray-200">Rp 300.000</td>
              </tr>
              {/* Added a mock selection class to last row as present in the image */}
              <tr className="border-b border-gray-200 bg-[#3399ff] text-white">
                <td className="px-1.5 py-1 text-center border-r border-[#66b2ff]">07 Jun 2026</td>
                <td className="px-1.5 py-1 border-r border-[#66b2ff]">SPTB-RTTN</td>
                <td className="px-1.5 py-1 text-center border-r border-[#66b2ff]">13093</td>
                <td className="px-1.5 py-1 text-center border-r border-[#66b2ff]">UDN</td>
                <td className="px-1.5 py-1 border-r border-[#66b2ff] truncate max-w-[120px]">BATT OPP BLP673 - UDN</td>
                <td className="px-1.5 py-1 text-right border-r border-[#66b2ff]">Rp 95.000</td>
              </tr>
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
