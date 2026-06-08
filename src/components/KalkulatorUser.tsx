import React from 'react';

export const KalkulatorUser = () => {
  return (
    <div className="flex-1 flex flex-col items-center pt-8 pb-4 bg-[#050038] text-white overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 tracking-widest text-center mt-2">KALKULATOR USER</h1>
      
      <div className="border border-white p-8 max-w-4xl w-full flex flex-col gap-8 relative mt-2">
        <div className="grid grid-cols-2 gap-x-12 gap-y-8 w-full">
          
          <div className="flex flex-col w-full">
            <span className="font-bold text-[13px] mb-1">Harga LCD "POLOS"</span>
            <input type="text" className="w-[80%] h-8 bg-white text-black outline-none px-2" />
            <input type="text" className="w-full h-14 mt-3 bg-white text-black outline-none px-2" />
          </div>

          {/* Highlighted column */}
          <div className="flex flex-col bg-[#050085] p-5 border border-gray-400 relative -top-6 -right-6 shadow-lg w-[108%]">
             <div className="flex flex-col items-end w-full">
              <span className="font-bold text-[13px] mb-1">Harga Batre</span>
              <input type="text" className="w-[60%] h-8 bg-white text-black outline-none px-2" />
             </div>
             <input type="text" className="w-full h-14 mt-4 bg-white text-black outline-none px-2" />
          </div>

          <div className="flex flex-col w-full">
            <span className="font-bold text-[13px] mb-1">Harga LCD "OG"</span>
            <input type="text" className="w-[80%] h-8 bg-[#b8c5d1] text-black outline-none px-2" />
            <input type="text" className="w-full h-14 mt-3 bg-white text-black outline-none px-2" />
          </div>

          <div className="flex flex-col w-full items-end mt-2">
            <span className="font-bold text-[13px] mb-1">Harga LCD "MEETOO"</span>
            <input type="text" className="w-[80%] h-8 bg-[#ff6666] text-black outline-none px-2" />
            <input type="text" className="w-full h-14 mt-3 bg-white text-black outline-none px-2" />
          </div>

          <div className="flex flex-col w-full">
            <span className="font-bold text-[13px] mb-1">Harga LCD "SHINESTAR"</span>
            <input type="text" className="w-[80%] h-8 bg-[#ffb366] text-black outline-none px-2" />
            <input type="text" className="w-full h-14 mt-3 bg-white text-black outline-none px-2" />
          </div>

          <div className="flex flex-col w-full items-end">
            <span className="font-bold text-[13px] mb-1">Harga LCD "POZI"</span>
            <input type="text" className="w-[80%] h-8 bg-[#66ccff] text-black outline-none px-2" />
            <input type="text" className="w-full h-14 mt-3 bg-white text-black outline-none px-2" />
          </div>

        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-white text-black font-bold py-1.5 px-8 outline-none text-[13px] rounded-sm h-8 flex items-center justify-center">RESET</button>
        </div>
      </div>
    </div>
  );
};
