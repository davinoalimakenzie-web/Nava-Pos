import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  className?: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ className = '', value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [viewDate, setViewDate] = useState(value || new Date());
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };
  
  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setCurrentDate(newDate);
    if(onChange) onChange(newDate);
    setIsOpen(false);
  };
  
  const handleSetToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setViewDate(today);
    if (onChange) onChange(today);
    setIsOpen(false);
  };

  const formatDisplayDate = (d: Date) => {
    const dayName = DAYS[d.getDay()];
    let dayNameFull = dayName;
    if(dayName === 'Sun') dayNameFull = 'Sunday';
    if(dayName === 'Mon') dayNameFull = 'Monday';
    if(dayName === 'Tue') dayNameFull = 'Tuesday';
    if(dayName === 'Wed') dayNameFull = 'Wednesday';
    if(dayName === 'Thu') dayNameFull = 'Thursday';
    if(dayName === 'Fri') dayNameFull = 'Friday';
    if(dayName === 'Sat') dayNameFull = 'Saturday';
    
    const dayNum = String(d.getDate()).padStart(2, '0');
    const monthName = MONTHS[d.getMonth()];
    const year = d.getFullYear();
    return `${dayNameFull} , ${dayNum}\u00A0\u00A0\u00A0${monthName}\u00A0\u00A0\u00A0${year}`;
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);
  
  const grid = [];
  
  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    grid.push({ day: prevMonthDays - i, isCurrentMonth: false, isPrevMonth: true });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push({ day: i, isCurrentMonth: true });
  }
  
  // Next month leading days
  const totalCells = grid.length > 35 ? 42 : 35; // keep it 6 rows if needed, or 6*7=42
  let nextMonthDay = 1;
  while (grid.length < totalCells) {
    grid.push({ day: nextMonthDay++, isCurrentMonth: false, isNextMonth: true });
  }

  const today = new Date();
  
  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div 
        className="flex items-center justify-between w-full h-full bg-white text-black border border-blue-400 cursor-pointer font-sans"
        onClick={() => setIsOpen(!isOpen)}
        style={{ height: 'inherit', boxSizing: 'border-box' }}
      >
        <div className="flex-1 px-1 flex items-center h-full">
            <span className="truncate text-left whitespace-pre">{formatDisplayDate(currentDate)}</span>
        </div>
        <div className="bg-[#b3d7ff] border-l border-blue-400 w-5 h-full flex items-center justify-center shrink-0">
          <ChevronDown size={14} className="text-black" strokeWidth={2} />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-[100%] left-0 mt-[1px] z-50 bg-white text-black border border-gray-400 shadow-lg w-[200px] font-sans text-xs pt-1">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-0.5 bg-white text-black">
            <button onClick={handlePrevMonth} className="hover:bg-gray-200">
              <span className="text-black text-[10px] leading-none text-center">◀</span>
            </button>
            <span className="font-medium text-sm">{MONTHS[month]} {year}</span>
            <button onClick={handleNextMonth} className="hover:bg-gray-200">
                <span className="text-black text-[10px] leading-none text-center">▶</span>
            </button>
          </div>
          
          <div className="px-1 mt-1">
             <div className="grid grid-cols-7 border-b border-gray-200 mb-1">
               {DAYS.map(d => (
                 <div key={d} className="text-center py-0.5 font-medium">{d}</div>
               ))}
             </div>
             <div className="grid grid-cols-7 pb-1 gap-y-0.5">
                {grid.map((cell, idx) => {
                  const isSelected = cell.isCurrentMonth && cell.day === currentDate.getDate() && viewDate.getMonth() === currentDate.getMonth() && viewDate.getFullYear() === currentDate.getFullYear();
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => cell.isCurrentMonth ? handleDateClick(cell.day) : null}
                      className={`text-center py-1 cursor-pointer 
                        ${!cell.isCurrentMonth ? 'text-gray-400' : 'hover:bg-blue-100'}
                        ${isSelected ? 'outline outline-1 outline-blue-500 bg-blue-50' : ''}
                      `}
                    >
                      {cell.day}
                    </div>
                  )
                })}
             </div>
          </div>
          
          {/* Today Button area */}
          <div className="border-t border-gray-200 py-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100" onClick={handleSetToday}>
             <div className="w-8 h-4 border border-blue-400 rounded-[2px] bg-white"></div>
             <span className="text-[11px]">Today: {today.getMonth()+1}/{today.getDate()}/{today.getFullYear()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
