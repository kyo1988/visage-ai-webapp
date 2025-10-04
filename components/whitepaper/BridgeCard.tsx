'use client';

export default function BridgeCard() {
  const doItems = [
    "Raise bottom-5 CEP to ≥52% (JP/EN normalized)",
    "Optimize Q4 first; bound and report tail deviation",
    "Keep Δaccuracy <5% under on-device constraints"
  ];
  
  const dontItems = [
    "Treat q≥0.9 deviation as failure",
    "Compare languages without normalization",
    "Over-parameterize moderation"
  ];
  
  return (
    <aside className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.12)]">
      <h3 className="text-[13px] font-semibold text-slate-700 mb-3">What we do this quarter</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-[12px] font-semibold text-green-700 mb-2">Do</h4>
          <ul className="space-y-1 list-disc pl-4 text-[13px] text-slate-800">
            {doItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-[12px] font-semibold text-red-700 mb-2">Don&apos;t</h4>
          <ul className="space-y-1 list-disc pl-4 text-[13px] text-slate-800">
            {dontItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
