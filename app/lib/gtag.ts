export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

const canUseGtag = () => typeof window !== 'undefined' && Boolean(GA_ID);

export const pageview = (path: string) => {
  if (!GA_ID || typeof window === 'undefined') {
    console.log('[GA4] pageview skipped - no GA_ID or window');
    return;
  }
  
  const pageData = {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  };
  
  console.log('[GA4] Sending pageview:', pageData);
  
  // window.gtagが存在しない場合はdataLayerに直接push
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', pageData);
    console.log('[GA4] pageview sent via gtag');
  } else {
    // gtagがまだ読み込まれていない場合はdataLayerに直接push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      ...pageData
    });
    console.log('[GA4] pageview queued in dataLayer');
  }
};

export const gaEvent = (name: string, params?: Record<string, any>) => {
  if (!canUseGtag()) return;
  
  // window.gtagが存在しない場合はdataLayerに直接push
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params || {});
  } else {
    // gtagがまだ読み込まれていない場合はdataLayerに直接push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: name,
      ...params
    });
  }
};

// フォーム送信用のヘルパー関数
export const trackFormSubmit = (formType: string, email?: string) => {
  const params: Record<string, any> = {
    form_type: formType,
  };
  
  if (email) {
    params.email_domain = email.split('@')[1] || '(none)';
  }
  
  gaEvent('form_submit', params);
};