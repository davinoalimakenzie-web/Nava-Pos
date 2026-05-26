import React from 'react';

export const LegacyWindowHeader = ({ title, currentTime }: { title: string, currentTime: Date }) => (
  <div className="bg-white px-2 py-1 flex items-center justify-between border-b border-gray-400 shadow-sm text-xs font-bold text-gray-800 shrink-0">
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5 shadow-sm">
        <div className="w-3 h-3 bg-red-500 border border-gray-400"></div>
        <div className="w-3 h-3 bg-yellow-400 border border-gray-400"></div>
      </div>
      <span>{title}</span>
    </div>
    <span className="text-gray-600 font-medium">
      {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()} {currentTime.toLocaleTimeString('id-ID')}
    </span>
  </div>
);
