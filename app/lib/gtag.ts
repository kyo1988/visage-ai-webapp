export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

const canUseGtag = () => typeof window !== 'undefined' && Boolean(GA_ID);

export const pageview = (path: string) => {
  if (!GA_ID || typeof window === 'undefined') return;
  
  const pageData = {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  };
  
  // window.gtagが存在しない場合はdataLayerに直接push
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', pageData);
  } else {
    // gtagがまだ読み込まれていない場合はdataLayerに直接push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'page_view',
      ...pageData
    });
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
