interface KpiCardProps {
  title: string;
  value: number;
  description: string;
}

export default function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium leading-tight text-slate-500">{title}</p>
      <h3 className="mt-1 text-3xl font-bold leading-tight tracking-tight text-slate-900">{value}</h3>
      <p className="mt-2 text-xs font-medium leading-tight text-slate-500">{description}</p>
    </div>
  );
}