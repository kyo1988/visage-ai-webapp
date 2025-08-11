"use client";
import { useEffect, useState } from "react";
import { track } from "@/app/lib/analytics";
import { useTranslations } from "@/app/lib/intl";

export default function ReportClient({ reportId }: { reportId: string }) {
  const t = useTranslations("report");
  const [copied, setCopied] = useState(false);
  useEffect(()=>{ track("report_view",{ reportId }) },[reportId]);
  const share=async()=>{ const url=window?.location?.href||""; track("report_share_click",{reportId}); try{await navigator.clipboard.writeText(url); setCopied(true); setTimeout(()=>setCopied(false),1600);}catch{} };
  const print=()=>{ track("report_print_click",{reportId}); window.print(); };
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center gap-3 px-4 print:hidden"
         style={{ paddingBottom:"max(env(safe-area-inset-bottom),0px)" }}>
      <button className="rounded-xl border bg-white/95 backdrop-blur px-4 py-2 shadow-sm hover:bg-slate-50" onClick={share}>
        {copied ? t("copied") : t("share")}
      </button>
      <button className="rounded-xl bg-[#0ea5e9] px-4 py-2 text-white shadow-sm hover:opacity-90" onClick={print}>
        {t("print")}
      </button>
    </div>
  );
}
