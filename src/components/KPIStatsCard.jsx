import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3 } from 'lucide-react';

// Sub-component for load-bearing and maintaining skeleton consistency.
const KPISkeleton = () => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="h-4 w-24 bg-slate-100 rounded" />
      <div className="h-8 w-8 bg-slate-50 rounded-lg" />
    </div>
    <div className="h-8 w-32 bg-slate-100 rounded mb-2" />
    <div className="h-3 w-40 bg-slate-50 rounded" />
  </div>
);

export default function KPIStatsCard({ label, value, trend, isCurrency = false, loading = false, type }) {
  if (loading) return <KPISkeleton />;

  // Icon selection based on metric type.
  const getIcon = () => {
    switch (type) {
      case 'potential': return <DollarSign className="text-primary" size={20} />;
      case 'churn': return <Users className="text-orange-500" size={20} />;
      default: return <BarChart3 className="text-slate-400" size={20} />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:border-primary transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
          {label}
        </p>
        <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-primary/10 transition-colors">
          {getIcon()}
        </div>
      </div>

      <div className="flex flex-col">
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          {isCurrency 
            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0)
            : value || 0}
        </h3>
        
        {trend && (
          <div className="flex items-center gap-1.5 mt-2">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-[10px] md:text-xs font-bold text-green-600">
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}