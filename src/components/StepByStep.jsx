import React from 'react';
import { FileUp, Clock, PlayCircle, Info } from 'lucide-react';

export default function StepByStep() {
  return (
    <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-primary transition-colors">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <FileUp className="text-slate-400 group-hover:text-primary" size={24} />
          </div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Step 01</span>
          <h4 className="text-sm font-black text-slate-900 mb-2 uppercase">Upload Dataset</h4>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Select your <span className="font-bold text-slate-700">.CSV</span> file using <span className="font-bold text-slate-700">semicolon (;)</span> as the delimiter.
          </p>
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 w-full">
            <div className="flex items-start gap-2 text-[9px] text-left text-slate-400 font-bold uppercase tracking-tighter">
              <Info size={12} className="shrink-0 mt-0.5" />
              <span>Required columns: Cliente, CNPJ/CPF, Valor, Data da Emissão e Vendedor.<br />See the "Sample CSV" file.</span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-primary transition-colors">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <Clock className="text-slate-400 group-hover:text-primary" size={24} />
          </div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Step 02</span>
          <h4 className="text-sm font-black text-slate-900 mb-2 uppercase">Set Threshold</h4>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Define the inactivity period. The system uses <span className="font-bold text-slate-700">60 days</span> by default to identify churn.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-primary transition-colors">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <PlayCircle className="text-slate-400 group-hover:text-primary" size={24} />
          </div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Step 03</span>
          <h4 className="text-sm font-black text-slate-900 mb-2 uppercase">Analyze</h4>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            Click on <span className="font-bold text-slate-700">"Analyze"</span> to generate Automated BI Insights and Recovery Opportunities.
          </p>
        </div>

      </div>
    </div>
  );
}