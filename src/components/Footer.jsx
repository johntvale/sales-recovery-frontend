import React from 'react';
import { ShieldCheck, Cpu, Code2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 pb-10 px-6 border-t border-slate-200">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10">
          
          <div className="text-center md:text-left">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">
              Sales Recovery - Intelligence Dashboard
            </h4>
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight">
              Developed by  <span className="text-primary">John Torres do Vale</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">
              &copy; {currentYear} Criativo Websites • Manaus, AM
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-slate-400" />
              <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
                React + Tailwind
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-slate-400" />
              <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
                FastAPI + Python
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-slate-400" />
              <span className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">
                Secure Data Analysis
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4">
          <div className="flex gap-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter cursor-pointer hover:text-primary transition-colors">Privacy Policy</span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter cursor-pointer hover:text-primary transition-colors">Terms of Service</span>
          </div>
          <div className="bg-slate-100 px-3 py-1 rounded-full">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Build v1.4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}