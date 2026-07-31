'use client';

export default function BridgeCard() {
  const doItems = [
    "Rebuild estimators against hand-checkable fixtures",
    "Freeze categories, filters, and gates before rerunning",
    "Record input hashes and a source commit in every log"
  ];
  
  const dontItems = [
    "Call the DoP near-miss a pass",
    "Read Q4 association as a contact effect",
    "Report CEP language bias from the malformed output"
  ];
  
  return (
    <aside className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.12)]">
      <h3 className="text-[13px] font-semibold text-slate-700 mb-3">What the next validation must do</h3>
      
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
