"use client";
import { useEffect } from "react";
import { track } from "@/app/lib/analytics";

export default function SectionObserverClient({ ids, payload }: { ids: string[]; payload?: any }) {
  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e=>{
        if(e.isIntersecting && !seen.has(e.target.id)){
          seen.add(e.target.id);
          track("report_section_view", { section: e.target.id, ...payload });
        }
      });
    }, { rootMargin: "0px 0px -35% 0px", threshold: 0.25 });
    
    ids.forEach(id => { 
      const el = document.getElementById(id); 
      if (el) io.observe(el); 
    });
    
    return () => io.disconnect();
  }, [ids, payload]);
  
  return null;
}
