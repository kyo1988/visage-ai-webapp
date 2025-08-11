'use client';
import {useEffect, useMemo, useState} from 'react';
import {track} from '@/app/lib/analytics';

type DocItem = {title:string; href:string; body?:string};

const buildIndex = (locale:string, messages:any): DocItem[] => ([
  {title:messages.docs.cards.overview.title, href:`/${locale}/docs`, body:messages.docs.cards.overview.desc},
  {title:messages.docs.cards.sdkJs.title, href:`/${locale}/docs/sdk-js`, body:messages.docs.cards.sdkJs.desc},
  {title:messages.docs.cards.sdkSwift.title, href:`/${locale}/docs/sdk-swift`, body:messages.docs.cards.sdkSwift.desc},
  {title:messages.docs.cards.sdkKotlin.title, href:`/${locale}/docs/sdk-kotlin`, body:messages.docs.cards.sdkKotlin.desc},
  {title:messages.docs.cards.security.title, href:`/${locale}/docs/security`, body:messages.docs.cards.security.desc}
]);

export default function SearchBox({locale}:{locale:string}){
  const [q, setQ] = useState('');
  const [messages, setMessages] = useState<any>(null);
  
  useEffect(() => {
    import(`../../../messages/${locale}.json`).then(m => setMessages(m.default));
  }, [locale]);
  
  const data = useMemo(() => messages ? buildIndex(locale, messages) : [], [locale, messages]);
  
  // 軽量な検索実装（Fuse.js の代替）
  const results = useMemo(() => {
    if (!q || q.length < 2) return [];
    const query = q.toLowerCase();
    return data
      .filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.body?.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [q, data]);

  useEffect(()=>{
    if(q.length>=2) track('docs_search',{ q, len:q.length });
  },[q]);

      return (
      <div className="mb-6">
        <input
          value={q} onChange={e=>setQ(e.target.value)}
          placeholder={messages?.docs?.search?.placeholder || 'Search docs...'}
          className="w-full rounded-lg border px-3 py-2 text-sm"
        />
        {q && (
          <div className="mt-2 rounded-lg border divide-y bg-white">
            {results.length===0 && <div className="p-3 text-sm text-slate-500">{messages?.docs?.search?.noResults || 'No results'}</div>}
            {results.map(r=>(
              <a key={r.href} href={r.href} className="block p-3 text-sm hover:bg-slate-50">
                <div className="font-medium">{r.title}</div>
                <div className="text-slate-500 text-xs">{r.body}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
