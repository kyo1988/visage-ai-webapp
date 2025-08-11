import { ReactNode } from "react";
export default function ReportSection({ title, subtitle, muted = false, children }: { title: string; subtitle?: string; muted?: boolean; children: ReactNode }) {
  return (
    <section className={`${muted ? 'bg-gray-50/50' : 'bg-white'} rounded-2xl border border-gray-200 p-8 shadow-sm`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <div className="h-1 w-16 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full"></div>
        {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}
