import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpDown, Info, User, Calendar, DollarSign, MoreHorizontal } from 'lucide-react';

/**
 * @description High-performance BI Table component with sorting, intelligent pagination, and loading skeleton..
 */
const RecoveryTable = ({ clients = [], loading = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'total_revenue', direction: 'desc' });

  // Senior Sorting Logic
  const sortedClients = useMemo(() => {
    let sortableItems = [...clients];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [clients, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedClients.length / rowsPerPage);
  const currentData = sortedClients.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  if (!loading && !clients.length) return null;

  return (
    <section className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-visible transition-all duration-300">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white to-slate-50/50">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Strategic Recovery Queue</h3>
          <p className="text-sm text-slate-500 font-medium">Prioritized list based on revenue recovery potential</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
          <User size={14} className="text-blue-600" />
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            {loading ? 'Analyzing...' : `${clients.length} Targets`}
          </span>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto overflow-y-visible scrollbar-thin scrollbar-thumb-slate-200">
        <table className="w-full border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <TableHead label="Client Identification" sortKey="Cliente" onSort={requestSort} config={sortConfig} icon={<User size={14}/>} />
              <TableHead label="Timeline" center icon={<Calendar size={14}/>} tooltip />
              <TableHead label="Last Purchase" sortKey="last_purchase_date" onSort={requestSort} config={sortConfig} icon={<Calendar size={14}/>} />
              <TableHead label="Avg. Ticket" sortKey="average_ticket_value" onSort={requestSort} config={sortConfig} align="right" icon={<DollarSign size={14}/>} />
              <TableHead label="Recovery Impact" sortKey="total_revenue" onSort={requestSort} config={sortConfig} align="right" highlight icon={<DollarSign size={14}/>} />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <TableSkeleton />
            ) : (
              currentData.map((client, idx) => (
                <TableRow key={client['CNPJ/CPF'] || idx} client={client} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        rowsPerPage={rowsPerPage} 
        setRowsPerPage={setRowsPerPage} 
        setCurrentPage={setCurrentPage} 
        loading={loading}
      />
    </section>
  );
};

/* --- Auxiliary Sub-components --- */

const TableHead = ({ label, sortKey, onSort, config, align = 'left', highlight = false, icon, tooltip = false }) => (
  <th 
    onClick={() => sortKey && onSort(sortKey)}
    className={`p-5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 transition-colors relative 
    /* FIX: Garantir que o cabeçalho fique sobre os outros no hover */
    hover:z-[100] 
    ${sortKey ? 'cursor-pointer hover:text-primary' : ''} 
    ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}
  >
    <div className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}>
      {icon}
      <span className={highlight ? 'text-primary' : ''}>{label}</span>
      {sortKey && <ArrowUpDown size={12} className={`opacity-40 ${config.key === sortKey ? 'text-primary opacity-100' : ''}`} />}
      {tooltip && (
        <div className="group relative ml-1">
          <Info size={14} className="cursor-help text-slate-400 hover:text-primary transition-colors" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block w-64 p-4 bg-slate-900 text-white text-[10px] rounded-xl shadow-2xl z-[1000] normal-case tracking-normal border border-slate-700 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="space-y-2 font-medium">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"/> <span>Historical purchase records</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"/> <span>Last purchase (Churn focus)</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-slate-100"/> <span>Empty slot (No sales data)</span></div>
            </div>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-slate-900" />
          </div>
        </div>
      )}
    </div>
  </th>
);

const TimelineBar = ({ date, isLast = false, isEmpty = false, inactiveDays = 0 }) => (
  <div className="group/bar relative flex flex-col items-center">
    <div 
      className={`w-2.5 rounded-t-[2px] transition-all duration-300 
        ${isEmpty ? 'h-4 bg-slate-100' : isLast ? 'h-8 bg-orange-500 shadow-[0_-2px_10px_rgba(249,115,22,0.4)]' : 'h-6 bg-blue-600/40 group-hover/bar:bg-blue-600'}`}
    />
    {!isEmpty && (
      <div className="absolute bottom-full mb-2 hidden group-hover/bar:block z-[1100] whitespace-nowrap bg-slate-900 text-white text-[10px] py-2 px-3 rounded-lg shadow-2xl font-bold border border-slate-800 animate-in fade-in slide-in-from-bottom-1">
        {isLast ? (
          <div className="text-center">
            <p>Last purchase: {date}</p>
            <p className="text-orange-400">No purchases from that date until today. ({inactiveDays} days)</p>
          </div>
        ) : (
          <span>Purchase date: {date}</span>
        )}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </div>
    )}
  </div>
);

const TableRow = ({ client }) => {
  const history = client.purchase_history || [];
  const lastDate = new Date(client.last_purchase_date).toLocaleDateString('pt-BR');
  
  // TIMELINE: Generate exactly 10 slots
  const timelineData = useMemo(() => {
    const slots = [];
    // filtered to ensure that the latest date is not duplicated in the blue history.
    const historyDates = history.filter(d => d !== lastDate);
    
    const totalBars = 10;
    const blueAndEmptyCount = totalBars - 1; // 9 bars before the orange
    const emptyCount = Math.max(0, blueAndEmptyCount - historyDates.length);
    
    // 1. Fill with empty bars (Almost imperceptible blue)
    for (let i = 0; i < emptyCount; i++) {
      slots.push({ date: null, isEmpty: true, isLast: false });
    }
    
    // 2. Fill in with real history (Blue)
    historyDates.forEach(date => {
      slots.push({ date, isEmpty: false, isLast: false });
    });
    
    // 3. Add the last purchase (Orange) - Ensures it's the last one.
    slots.push({ date: lastDate, isEmpty: false, isLast: true });
    
    // If the historical data is very extensive, we only use the last 10 total bars.
    return slots.slice(-10);
  }, [history, lastDate]);

  return (
    <tr className="group hover:bg-slate-50/80 transition-all duration-200">
      <td className="p-5">
        <div className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{client.Cliente || client.Client}</div>
        <div className="text-[10px] text-slate-400 font-mono mt-1 tracking-tighter">{client['CNPJ/CPF']}</div>
      </td>
      <td className="p-5">
        <div className="flex justify-center items-end gap-1.5 h-8">
          {timelineData.map((item, i) => (
            <TimelineBar 
              key={i} 
              date={item.date} 
              isLast={item.isLast} 
              isEmpty={item.isEmpty} 
              inactiveDays={client.days_since_last_purchase}
            />
          ))}
        </div>
      </td>
      <td className="p-5">
        <div className="text-sm font-semibold text-slate-700">{lastDate}</div>
        <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-bold uppercase tracking-wider">
          {client.days_since_last_purchase}d Inactive
        </div>
      </td>
      <td className="p-5 text-right font-medium text-slate-500 text-sm">
        R$ {client.average_ticket_value?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </td>
      <td className="p-5 text-right">
        <div className="text-sm font-black text-slate-900">R$ {client.total_revenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
        <div className="text-[10px] font-bold text-green-600 uppercase">Strategic Focus</div>
      </td>
    </tr>
  );
};

const Pagination = ({ currentPage, totalPages, rowsPerPage, setRowsPerPage, setCurrentPage, loading }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) end = 4;
      else if (currentPage >= totalPages - 2) start = totalPages - 3;
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  if (loading) return (
    <div className="px-8 py-5 border-t border-slate-100 flex justify-between">
      <div className="h-8 w-32 bg-slate-100 animate-pulse rounded" />
      <div className="h-8 w-64 bg-slate-100 animate-pulse rounded" />
    </div>
  );

  return (
    <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6 overflow-visible">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rows per page</span>
        <select 
          value={rowsPerPage} 
          onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
        >
          {[10, 15, 30].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all"><ChevronLeft size={16} /></button>
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, i) => (
            page === '...' ? <span key={`sep-${i}`} className="px-2 text-slate-400"><MoreHorizontal size={14}/></span> : (
              <button key={page} onClick={() => setCurrentPage(page)} className={`min-w-[32px] h-8 rounded-lg text-xs font-bold transition-all ${currentPage === page ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-slate-500 hover:bg-white border border-transparent hover:border-slate-200'}`}>{page}</button>
            )
          ))}
        </div>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 transition-all"><ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

const TableSkeleton = () => (
  <>
    {[...Array(5)].map((_, i) => (
      <tr key={i} className="animate-pulse">
        <td className="p-5"><div className="h-4 w-40 bg-slate-200 rounded mb-2" /><div className="h-3 w-24 bg-slate-100 rounded" /></td>
        <td className="p-5 flex justify-center gap-1.5 mt-4">{[...Array(10)].map((_, j) => (<div key={j} className="h-6 w-2.5 bg-slate-100 rounded-sm" />))}</td>
        <td className="p-5"><div className="h-4 w-24 bg-slate-100 rounded" /></td>
        <td className="p-5"><div className="h-4 w-20 bg-slate-100 rounded ml-auto" /></td>
        <td className="p-5"><div className="h-4 w-28 bg-slate-200 rounded ml-auto" /></td>
      </tr>
    ))}
  </>
);

export default RecoveryTable;