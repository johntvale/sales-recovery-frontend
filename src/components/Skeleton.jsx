export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
);

export const KPISkeleton = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-border shadow-premium">
    <Skeleton className="h-4 w-24 mb-4" />
    <Skeleton className="h-10 w-32 mb-2" />
    <Skeleton className="h-3 w-40" />
  </div>
);