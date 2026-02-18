import React from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

export default function RecoveryFocusChart({ recovery_data_list = [] }) {
  const chartData = recovery_data_list.slice(0, 10);
  const maxRevenue = Math.max(...chartData.map(d => d.total_revenue), 1);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2">
            <Trophy className="text-orange-500" size={20} />
            Top 10 Recovery Opportunities
          </h3>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">
            Ranking by total historical revenue impact
          </p>
        </div>
      </div>

      <div className="relative h-[300px] md:h-[350px] w-full mt-12 flex items-stretch justify-between gap-1.5 md:gap-3 border-b border-slate-100 pb-2">
        
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-14">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="w-full border-t border-slate-50 border-dashed" />
          ))}
        </div>

        {chartData.map((item, index) => {
          const percentage = (item.total_revenue / maxRevenue) * 100;
          
          return (
            <div 
              key={index} 
              className={`flex-1 flex flex-col group relative ${index >= 5 ? 'hidden sm:flex' : 'flex'}`}
            >
              <div className="flex-1 flex flex-col justify-end items-center relative pb-2">
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
                  <div className="bg-slate-900 text-white text-[9px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap border border-slate-700">
                    R$ {item.total_revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1 border-r border-b border-slate-700" />
                </div>

                <div 
                  style={{ height: `${percentage}%` }}
                  className={`w-full max-w-[45px] rounded-t-lg transition-all duration-700 ease-out relative
                    ${index === 0 ? 'bg-primary shadow-[0_-4px_15px_rgba(59,130,246,0.3)]' : 'bg-slate-200 group-hover:bg-slate-300'}`}
                >
                  {index === 0 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                      <TrendingUp size={16} className="text-primary animate-bounce" />
                    </div>
                  )}
                </div>
              </div>

              <div className="h-12 mt-2 flex items-start justify-center text-center px-0.5">
                <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-tighter line-clamp-2 leading-[1.1]">
                  {item.Cliente}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}