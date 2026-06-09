import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Minus, Square } from 'lucide-react';

export const KalkulatorUser = () => {
  const { isKalkulatorOpen, setIsKalkulatorOpen } = useAppContext();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ w: 600, h: 460 });
  const dragRef = useRef<{ startX: number, startY: number, initialX: number, initialY: number } | null>(null);

  // Initialize position when opened
  useEffect(() => {
    if (isKalkulatorOpen && !isMaximized) {
      setPosition({
        x: Math.max(0, (window.innerWidth - dimensions.w) / 2),
        y: Math.max(0, (window.innerHeight - dimensions.h) / 2)
      });
      setIsMinimized(false);
    }
  }, [isKalkulatorOpen]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragRef.current || isMaximized) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPosition({
        x: dragRef.current.initialX + dx,
        y: Math.max(0, dragRef.current.initialY + dy)
      });
    };
    const handleUp = () => {
      dragRef.current = null;
    };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [isMaximized]);

  if (!isKalkulatorOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y
    };
  };

  const getWindowStyle = (): React.CSSProperties => {
    if (isMinimized) {
      return {
        position: 'fixed',
        bottom: 0,
        left: position.x > window.innerWidth - 300 ? window.innerWidth - 220 : position.x,
        top: 'auto',
        width: 200,
        height: 40,
        zIndex: 60
      };
    }
    if (isMaximized) {
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 60
      };
    }
    return {
      position: 'fixed',
      top: position.y,
      left: position.x,
      width: dimensions.w,
      height: dimensions.h,
      zIndex: 60
    };
  };

  return (
    <div style={getWindowStyle()} className="flex flex-col bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-gray-400 overflow-hidden rounded-sm font-sans">
      
      {/* Title Bar */}
      <div 
        className="bg-gray-100 flex items-center justify-between px-2 py-1 shrink-0 select-none cursor-default border-b border-gray-300"
        onPointerDown={handlePointerDown}
      >
        <div className="flex items-center gap-2">
          {/* A small app icon placeholder */}
          <div className="w-4 h-4 bg-[#8f1994] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white"></div>
          </div>
          <span className="text-[11px] text-black font-semibold tracking-wide">KalkulatorUser</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="w-7 h-6 flex items-center justify-center hover:bg-gray-300 text-black">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }} className="w-7 h-6 flex items-center justify-center hover:bg-gray-300 text-black">
            <Square className="w-3 h-3" />
          </button>
          <button onClick={() => setIsKalkulatorOpen(false)} className="w-7 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white text-black transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {!isMinimized && (
        <div className="flex-1 bg-[#050038] text-white flex flex-col items-center pt-5 w-full relative">
          
          <h1 className="text-xl font-bold mb-4 tracking-[0.05em] text-center px-4 font-sans uppercase text-white">KALKULATOR USER</h1>
          
          <div className="w-[90%] border border-gray-400 relative mt-2 pt-6 pb-4 px-6 flex flex-col gap-5">
            
            {/* Outline Box for Harga Batre to overlap naturally */}
            <div className="absolute top-[-10px] right-[-10px] w-[calc(50%+5px)] border border-gray-500 bg-[#000080] p-3 shadow-lg z-10 flex flex-col justify-center">
               <div className="flex justify-end gap-3 items-center mb-1.5">
                 <span className="font-bold text-[11px] font-sans text-white">Harga Batre</span>
                 <input type="text" className="w-[110px] h-[22px] bg-white text-black outline-none px-2 text-[11px] font-medium text-right shadow-inner" />
               </div>
               <div>
                 <input type="text" className="w-full h-8 bg-white text-black outline-none px-2 text-sm font-bold text-center shadow-inner" />
               </div>
            </div>

            {/* Left column top element */}
            <div className="flex flex-col w-[45%]">
              <span className="font-bold text-[11px] mb-1 font-sans">Harga LCD "POLOS"</span>
              <input type="text" className="w-[120px] h-[22px] bg-white text-black outline-none px-2 text-[11px] font-medium shadow-inner" />
              <input type="text" className="w-full h-8 mt-2 bg-white text-black outline-none px-2 text-[12px] font-bold shadow-inner" />
            </div>

            {/* Grid for remaining 4 */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-5 w-full">
              
              <div className="flex flex-col w-full">
                <span className="font-bold text-[11px] mb-1 font-sans">Harga LCD "OG"</span>
                <input type="text" className="w-[120px] h-[22px] bg-[#b8c5d1] text-black outline-none px-2 text-[11px] font-medium shadow-inner" />
                <input type="text" className="w-full h-8 mt-2 bg-white text-black outline-none px-2 text-[12px] font-bold shadow-inner" />
              </div>

              <div className="flex flex-col w-full items-end">
                <span className="font-bold text-[11px] mb-1 font-sans">Harga LCD "MEETOO"</span>
                <input type="text" className="w-[120px] h-[22px] bg-[#ff6666] text-black outline-none px-2 text-[11px] font-medium shadow-inner" />
                <input type="text" className="w-full h-8 mt-2 bg-white text-black outline-none px-2 text-[12px] font-bold shadow-inner" />
              </div>

              <div className="flex flex-col w-full">
                <span className="font-bold text-[11px] mb-1 font-sans">Harga LCD "SHINESTAR"</span>
                <input type="text" className="w-[120px] h-[22px] bg-[#ffb366] text-black outline-none px-2 text-[11px] font-medium shadow-inner" />
                <input type="text" className="w-full h-8 mt-2 bg-white text-black outline-none px-2 text-[12px] font-bold shadow-inner" />
              </div>

              <div className="flex flex-col w-full items-end">
                <span className="font-bold text-[11px] mb-1 font-sans">Harga LCD "POZI"</span>
                <input type="text" className="w-[120px] h-[22px] bg-[#66ccff] text-black outline-none px-2 text-[11px] font-medium shadow-inner" />
                <input type="text" className="w-full h-8 mt-2 bg-white text-black outline-none px-2 text-[12px] font-bold shadow-inner" />
              </div>

            </div>

            <div className="flex justify-center mt-3">
              <button className="bg-white text-black hover:bg-gray-200 transition-colors font-bold py-1 px-8 outline-none text-[11px] min-w-[90px] h-[24px] flex items-center justify-center font-sans tracking-wide rounded-sm shadow">RESET</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

