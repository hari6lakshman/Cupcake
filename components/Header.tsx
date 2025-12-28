import React from 'react';
import { Sparkles, Cookie } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-[#FFB6C1]/30 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-[#FFD1DC]/20 rounded-2xl shadow-inner border border-white">
          <Cookie className="w-6 h-6 text-[#FFB6C1]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#5D3A42] flex items-center gap-1.5 tracking-tight">
            Cupcake <span className="text-[#72BCD4] font-black">AI</span>
          </h1>
          <div className="flex gap-1">
             <span className="w-2 h-1 bg-[#FFD1DC] rounded-full"></span>
             <span className="w-2 h-1 bg-[#FFB6C1] rounded-full"></span>
             <span className="w-2 h-1 bg-[#BFEFFF] rounded-full"></span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#8E4D5B] text-xs font-bold border border-[#FFB6C1] shadow-sm">
          <Sparkles size={14} className="text-[#FFB6C1]" />
          <span>Pro Mode</span>
        </div>
      </div>
    </header>
  );
};

export default Header;