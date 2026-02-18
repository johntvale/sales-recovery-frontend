import { useState, useEffect } from 'react';
import { Activity, LayoutDashboard } from 'lucide-react';

export default function StrategicHeader() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);
        setIsOnline(response.ok);
      } catch {
        setIsOnline(false);
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-[1000] h-20 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 md:px-6 h-full flex justify-between items-center max-w-[1200px]">
        
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg hidden sm:block">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-black text-slate-900 leading-tight">
              Sales <span className="text-primary">Recovery</span>
            </h1>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
              Intelligence Dashboard
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 bg-slate-50 px-3 md:px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all hover:bg-white">
          <div className="relative flex">
            <div className={`h-2 w-2 md:h-2.5 md:w-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            {isOnline && <div className="absolute inset-0 h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-green-500 animate-ping opacity-75"></div>}
          </div>
          <span className="text-[10px] md:text-xs font-black text-slate-700 uppercase tracking-widest whitespace-nowrap">
            {isOnline ? 'System Online' : 'System Offline'}
          </span>
          <Activity size={14} className={isOnline ? 'text-green-600' : 'text-red-600'} />
        </div>
      </div>
    </header>
  );
}