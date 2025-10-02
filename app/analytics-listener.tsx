'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsListener() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    
    const query = search?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    
    // DEBUG LOG
    console.log('[GA] pageview ->', url);
    
    // GA4 pageview送信
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
      console.log('[GA4] pageview sent:', url);
    } else {
      console.log('[GA4] gtag not available yet');
    }
  }, [pathname, search]);

  return null;
}
