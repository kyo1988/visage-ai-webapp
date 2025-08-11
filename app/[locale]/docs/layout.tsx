import Link from 'next/link';
import SidebarNav from '@/app/components/docs/SidebarNav';
import dynamic from 'next/dynamic';
import {track} from '@/app/lib/analytics';
const SearchBox = dynamic(()=>import('./SearchBox'), {ssr:false});

export default function DocsLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: 'ja' | 'en' };
}) {
  const base = `/${locale}/docs`;

  const isJa = locale === 'ja';

  // 追加: ページ末尾に表示する Prev/Next 用の小コンポーネント（レイアウト内に内蔵でOK）
  function PrevNext({locale, slug}:{locale:'ja'|'en'|string; slug:string}) {
    const order = ['','sdk-js','sdk-swift','sdk-kotlin','security'];
    const idx = order.indexOf(slug);
    const base = `/${locale}/docs`;
    const items = order.map(s => ({href: s ? `${base}/${s}` : `${base}`, label: s || 'overview'}));
    const prev = idx > 0 ? items[idx-1] : null;
    const next = idx >= 0 && idx < items.length-1 ? items[idx+1] : null;

    return (
      <div className="mt-10 flex justify-between border-t pt-6 text-sm">
        <div>{prev && <a onClick={()=>track('docs_prevnext_click',{to:prev.href})} className="text-slate-700 hover:underline" href={prev.href}>← {prev.label}</a>}</div>
        <div>{next && <a onClick={()=>track('docs_prevnext_click',{to:next.href})} className="text-slate-700 hover:underline" href={next.href}>{next.label} →</a>}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-600">
            {isJa ? '目次' : 'Contents'}
          </h2>
          <SidebarNav locale={locale} />
        </aside>

        <section className="min-w-0">
          <SearchBox locale={locale} />
          {children}
        </section>
      </div>
    </div>
  );
}
