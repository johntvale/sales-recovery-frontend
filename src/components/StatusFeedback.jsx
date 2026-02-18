import React from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

/**
 * @description Specialized component to handle and translate backend feedback.
 * Centering error mapping logic here keeps the main App clean.
 */
export default function StatusFeedback({ error, success, onClear }) {
  if (!error && !success) return null;

  const getErrorMessage = (rawError) => {
    // Extracts specific detail from FastAPI error responses or falls back to generic messages
    const detail = rawError?.response?.data?.detail || rawError?.message || "";
    
    if (detail.includes("No columns to parse")) {
      return "The file is empty or formatted incorrectly. Please check your CSV content.";
    }
    if (detail.includes("encoding")) {
      return "Encoding error detected. Please ensure the file is saved as UTF-8 or Latin-1.";
    }
    if (detail.includes("column") || detail.includes("not found")) {
      return "Required columns missing. Ensure your CSV has: 'Cliente', 'Valor', 'Data da Emissão', 'Pedido' and 'CNPJ/CPF'.";
    }
    return detail || "An unexpected error occurred during analysis.";
  };

  const isError = !!error;
  const message = isError ? getErrorMessage(error) : "Analysis completed successfully!";

  return (
    <div 
      className={`mb-6 p-4 rounded-xl flex items-center justify-between border animate-in fade-in slide-in-from-top-2 duration-500 ${
        !isError 
          ? 'bg-green-50/50 border-green-200 text-green-700' 
          : 'bg-red-50/50 border-red-200 text-red-700'
      }`}
    >
      <div className="flex items-center gap-3">
        {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
        <span className="text-xs font-black uppercase tracking-widest leading-relaxed">
          {message}
        </span>
      </div>
      
      <button 
        onClick={onClear} 
        className="text-[10px] font-bold uppercase tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        Dismiss
      </button>
    </div>
  );
}