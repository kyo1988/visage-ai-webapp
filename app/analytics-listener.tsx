'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    
    // GA4が読み込まれるまで待機
    const sendPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        const url = window.location.pathname + window.location.search;
        window.gtag('event', 'page_view', {
          page_path: url,
          page_location: window.location.href,
          page_title: document.title,
        });
        console.log('[GA4] pageview sent:', url);
      } else {
        // gtagがまだ読み込まれていない場合、少し待ってから再試行
        setTimeout(sendPageView, 100);
      }
    };

    // 少し遅延させてから実行
    setTimeout(sendPageView, 100);
  }, [pathname]);

  return null;
}
