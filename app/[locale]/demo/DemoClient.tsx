'use client';

import {useEffect, useRef, useState} from 'react';
import {track} from '@/app/lib/analytics';

export default function DemoClient({locale, calUrl}:{locale:string, calUrl:string}){
  const [messages, setMessages] = useState<any>(null);
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    import(`../../../messages/${locale}.json`).then(m => setMessages(m.default));
  }, [locale]);

  useEffect(()=>{
    const onLoad = () => track('cal_iframe_loaded', { from: 'demo_page' });
    const el = ref.current;
    if (el) el.addEventListener('load', onLoad);
    return () => { if (el) el.removeEventListener('load', onLoad); };
  },[]);

  useEffect(()=>{
    const onMsg = (e:MessageEvent)=>{
      if(typeof e.data==='string' && e.data.includes('bookingSuccessful')){
        track('cal_booking_success',{ src:'iframe', locale });
      }
    };
    window.addEventListener('message', onMsg);
    return ()=>window.removeEventListener('message', onMsg);
  },[locale]);

  const t = (k:string)=> (messages?.demo?.[k] ?? k);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold">{t('title')||'Book a demo'}</h1>
      <p className="mt-2 text-muted-foreground">{t('lead')||'Pick a time that works for you.'}</p>

      <div className="mt-6 w-full rounded-xl overflow-hidden border">
        <iframe
          ref={ref}
          src={calUrl}
          title="Book a demo"
          className="w-full"
          style={{height:'75vh', minHeight:640}}
          loading="lazy"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {t('fallback') || 'If the scheduler does not load, open it '}
        <a className="text-blue-600 underline" href={calUrl} target="_blank" rel="noopener noreferrer">here</a>.
      </p>
    </main>
  );
}
