'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    
    // クライアントサイドでのみURLを構築
    const url = typeof window !== 'undefined' ? window.location.pathname + window.location.search : pathname;
    
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
  }, [pathname]);

  return null;
}
