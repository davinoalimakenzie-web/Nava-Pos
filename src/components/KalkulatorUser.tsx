import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Minus, Square } from 'lucide-react';

export const KalkulatorUser = () => {
  const { isKalkulatorOpen, setIsKalkulatorOpen } = useAppContext();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ w: 580, h: 420 });
  const dragRef = useRef<{ startX: number, startY: number, initialX: number, initialY: number } | null>(null);

  // Cost and Selling states
  const [lcdOledIphoneCost, setLcdOledIphoneCost] = useState('');
  const [lcdOledIphoneSell, setLcdOledIphoneSell] = useState('');

  const [lcdOledAndroidCost, setLcdOledAndroidCost] = useState('');
  const [lcdOledAndroidSell, setLcdOledAndroidSell] = useState('');

  const [lcdBagusCost, setLcdBagusCost] = useState('');
  const [lcdBagusSell, setLcdBagusSell] = useState('');

  const [batreAndroidCost, setBatreAndroidCost] = useState('');
  const [batreAndroidSell, setBatreAndroidSell] = useState('');

  const [lcdBiasaCost, setLcdBiasaCost] = useState('');
  const [lcdBiasaSell, setLcdBiasaSell] = useState('');

  const [batreIphoneCost, setBatreIphoneCost] = useState('');
  const [batreIphoneSell, setBatreIphoneSell] = useState('');

  // Helper formatting and calculations
  const formatNumberString = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    return new Intl.NumberFormat('id-ID').format(parseInt(digits, 10));
  };

  const handleCostChange = (
    val: string,
    setCost: (v: string) => void,
    setSell: (v: string) => void,
    formulaType: 'formula1' | 'formula2'
  ) => {
    const formatted = formatNumberString(val);
    setCost(formatted);
    
    if (formatted === '') {
      setSell('');
      return;
    }
    
    const num = parseInt(formatted.replace(/\D/g, ''), 10);
    if (!isNaN(num)) {
      // Formula 1: (modal * 2) + 10% = (modal * 2) * 1.10
      // Formula 2: (modal * 2) + 20% = (modal * 2) * 1.20
      const multiplied = num * 2;
      const margin = formulaType === 'formula1' ? 0.10 : 0.20;
      const sellPrice = Math.round(multiplied * (1 + margin));
      setSell(formatNumberString(String(sellPrice)));
    }
  };

  const handleSellChange = (val: string, setSell: (v: string) => void) => {
    setSell(formatNumberString(val));
  };

  const handleReset = () => {
    setLcdOledIphoneCost('');
    setLcdOledIphoneSell('');
    setLcdOledAndroidCost('');
    setLcdOledAndroidSell('');
    setLcdBagusCost('');
    setLcdBagusSell('');
    setBatreAndroidCost('');
    setBatreAndroidSell('');
    setLcdBiasaCost('');
    setLcdBiasaSell('');
    setBatreIphoneCost('');
    setBatreIphoneSell('');
  };

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
        <div className="flex-1 bg-[#050038] text-white flex flex-col items-center pt-3 pb-3 w-full relative justify-center">
          
          <div className="w-[94%] border border-white/40 rounded-md relative pt-4 pb-4 px-5 flex flex-col gap-4 bg-[#030026]/40 shadow-inner">
            
            {/* 3x2 Grid containing all 6 inputs including Harga Batre cleanly inside */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full">
              
              {/* Row 1, Col 1: Harga LCD OLED iPhone */}
              <div className="flex flex-col w-full items-start">
                <span className="font-bold text-[11px] mb-1 font-sans text-gray-200 uppercase tracking-wide">Harga LCD OLED iPhone</span>
                <input 
                  type="text" 
                  placeholder="Modal (Rp)"
                  value={lcdOledIphoneCost}
                  onChange={(e) => handleCostChange(e.target.value, setLcdOledIphoneCost, setLcdOledIphoneSell, 'formula2')}
                  className="w-[120px] h-[22px] bg-white text-black outline-none px-2 text-[11px] font-medium shadow-inner border border-gray-300 rounded-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Harga Jual User (Rp)"
                  value={lcdOledIphoneSell}
                  onChange={(e) => handleSellChange(e.target.value, setLcdOledIphoneSell)}
                  className="w-full h-8 mt-1.5 bg-yellow-100 text-black outline-none px-2 text-[13px] font-extrabold shadow-inner border border-yellow-300 rounded-sm text-center" 
                />
              </div>

              {/* Row 1, Col 2: Harga LCD OLED Android */}
              <div className="flex flex-col w-full items-end">
                <span className="font-bold text-[11px] mb-1 font-sans text-gray-200 uppercase tracking-wide">Harga LCD OLED Android</span>
                <input 
                  type="text" 
                  placeholder="Modal (Rp)"
                  value={lcdOledAndroidCost}
                  onChange={(e) => handleCostChange(e.target.value, setLcdOledAndroidCost, setLcdOledAndroidSell, 'formula1')}
                  className="w-[120px] h-[22px] bg-[#d8b4fe] text-black outline-none px-2 text-[11px] font-medium shadow-inner border border-purple-300 rounded-sm text-right" 
                />
                <input 
                  type="text" 
                  placeholder="Harga Jual User (Rp)"
                  value={lcdOledAndroidSell}
                  onChange={(e) => handleSellChange(e.target.value, setLcdOledAndroidSell)}
                  className="w-full h-8 mt-1.5 bg-yellow-100 text-black outline-none px-2 text-[13px] font-extrabold shadow-inner border border-yellow-300 rounded-sm text-center" 
                />
              </div>

              {/* Row 2, Col 1: Harga LCD Bagus */}
              <div className="flex flex-col w-full items-start">
                <span className="font-bold text-[11px] mb-1 font-sans text-gray-200 uppercase tracking-wide">Harga LCD Bagus</span>
                <input 
                  type="text" 
                  placeholder="Modal (Rp)"
                  value={lcdBagusCost}
                  onChange={(e) => handleCostChange(e.target.value, setLcdBagusCost, setLcdBagusSell, 'formula2')}
                  className="w-[120px] h-[22px] bg-[#b8c5d1] text-black outline-none px-2 text-[11px] font-medium shadow-inner border border-gray-400 rounded-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Harga Jual User (Rp)"
                  value={lcdBagusSell}
                  onChange={(e) => handleSellChange(e.target.value, setLcdBagusSell)}
                  className="w-full h-8 mt-1.5 bg-white text-black outline-none px-2 text-[13px] font-extrabold shadow-inner border border-gray-300 rounded-sm text-center" 
                />
              </div>

              {/* Row 2, Col 2: Harga Batre Android */}
              <div className="flex flex-col w-full items-end">
                <span className="font-bold text-[11px] mb-1 font-sans text-gray-200 uppercase tracking-wide">Harga Batre Android</span>
                <input 
                  type="text" 
                  placeholder="Modal (Rp)"
                  value={batreAndroidCost}
                  onChange={(e) => handleCostChange(e.target.value, setBatreAndroidCost, setBatreAndroidSell, 'formula1')}
                  className="w-[120px] h-[22px] bg-[#ff6666] text-black outline-none px-2 text-[11px] font-medium shadow-inner border border-red-300 rounded-sm text-right" 
                />
                <input 
                  type="text" 
                  placeholder="Harga Jual User (Rp)"
                  value={batreAndroidSell}
                  onChange={(e) => handleSellChange(e.target.value, setBatreAndroidSell)}
                  className="w-full h-8 mt-1.5 bg-white text-black outline-none px-2 text-[13px] font-extrabold shadow-inner border border-gray-300 rounded-sm text-center" 
                />
              </div>

              {/* Row 3, Col 1: Harga LCD Biasa */}
              <div className="flex flex-col w-full items-start">
                <span className="font-bold text-[11px] mb-1 font-sans text-gray-200 uppercase tracking-wide">Harga LCD Biasa</span>
                <input 
                  type="text" 
                  placeholder="Modal (Rp)"
                  value={lcdBiasaCost}
                  onChange={(e) => handleCostChange(e.target.value, setLcdBiasaCost, setLcdBiasaSell, 'formula2')}
                  className="w-[120px] h-[22px] bg-[#ffb366] text-black outline-none px-2 text-[11px] font-medium shadow-inner border border-amber-300 rounded-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Harga Jual User (Rp)"
                  value={lcdBiasaSell}
                  onChange={(e) => handleSellChange(e.target.value, setLcdBiasaSell)}
                  className="w-full h-8 mt-1.5 bg-white text-black outline-none px-2 text-[13px] font-extrabold shadow-inner border border-gray-300 rounded-sm text-center" 
                />
              </div>

              {/* Row 3, Col 2: Harga Batre iPhone */}
              <div className="flex flex-col w-full items-end">
                <span className="font-bold text-[11px] mb-1 font-sans text-gray-200 uppercase tracking-wide">Harga Batre iPhone</span>
                <input 
                  type="text" 
                  placeholder="Modal (Rp)"
                  value={batreIphoneCost}
                  onChange={(e) => handleCostChange(e.target.value, setBatreIphoneCost, setBatreIphoneSell, 'formula2')}
                  className="w-[120px] h-[22px] bg-[#66ccff] text-black outline-none px-2 text-[11px] font-medium shadow-inner border border-blue-300 rounded-sm text-right" 
                />
                <input 
                  type="text" 
                  placeholder="Harga Jual User (Rp)"
                  value={batreIphoneSell}
                  onChange={(e) => handleSellChange(e.target.value, setBatreIphoneSell)}
                  className="w-full h-8 mt-1.5 bg-white text-black outline-none px-2 text-[13px] font-extrabold shadow-inner border border-gray-300 rounded-sm text-center" 
                />
              </div>

            </div>

            {/* Reset Button tightly aligned at the bottom with proper height */}
            <div className="flex justify-center mt-1">
              <button 
                onClick={handleReset}
                className="bg-white text-black hover:bg-red-500 hover:text-white transition-all font-bold py-1 px-8 outline-none text-[11px] min-w-[100px] h-[26px] flex items-center justify-center font-sans tracking-wide rounded-sm shadow border border-gray-300 uppercase cursor-pointer"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

