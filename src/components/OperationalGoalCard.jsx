import React from 'react';
import { PhoneCall, Target, CalendarDays } from 'lucide-react';

export default function OperationalGoalCard({ callsPerDay, totalClients, loading }) {
  if (loading) {
    return <div className="h-32 bg-white rounded-2xl border border-slate-200 animate-pulse" />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 relative overflow-hidden group">
      {/* bg decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <PhoneCall size={120} className="text-white" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-primary" size={18} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Daily Goal</span>
          </div>
          <h3 className="text-4xl font-black text-white tracking-tighter">
            {callsPerDay} <span className="text-lg font-medium text-slate-400">calls / day</span>
          </h3>
          <p className="text-slate-400 text-xs mt-2 font-medium">
            Projected effort to clear <span className="text-white font-bold">{totalClients} clients</span> in a 22-day cycle.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
               <CalendarDays size={10} /> Working Days
            </div>
            <div className="text-xl font-black text-white">22</div>
          </div>
        </div>
      </div>
    </div>
  );
}