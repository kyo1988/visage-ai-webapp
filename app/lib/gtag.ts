export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const pageview = (path: string) => {
  if (!GA_ID || typeof window === 'undefined') return;
  
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
};

export const event = (name: string, params?: Record<string, any>) => {
  if (!GA_ID || typeof window === 'undefined') return;
  
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params || {});
  }
};

