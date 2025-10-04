'use client';

export default function StatStrip() {
  const stats = [
    { label: "DoP (MAD)", value: "0.015863", hint: "near-pass" },
    { label: "DJ @ q≥0.9", value: "r 0.627", hint: "tail deviation" },
    { label: "Q4 slope", value: "R² 0.472", hint: "strongest slope" },
    { label: "CEP bottom-5", value: "38→52%", hint: "<5% Δacc" },
  ];
  
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label} className="rounded-xl border border-slate-200/80 bg-white/60 backdrop-blur px-4 py-3 shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.12)]">
          <div className="text-[11px] uppercase tracking-wide text-slate-500 font-medium">{s.label}</div>
          <div className="text-[16px] font-bold text-slate-900">{s.value}</div>
          <div className="text-[10px] text-slate-400 mt-1">{s.hint}</div>
        </div>
      ))}
    </div>
  );
}
