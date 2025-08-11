'use client';

import Link from 'next/link';
import { track } from '@/app/lib/analytics'; // ← 相対パスを絶対エイリアスに統一
import { useLocale } from '@/app/lib/intl';

type Props = {
  label: string;
  /** 明示的に遷移先を指定したい場合。未指定なら /{locale}/demo を自動生成 */
  href?: string;
  /** 計測の出所。未指定なら 'header' */
  from?: string;
  /** 追加クラス（上書きじゃなくマージ） */
  className?: string;
  /** Nextの自動プリフェッチを抑止したい時 */
  prefetch?: boolean;
};

export function DemoButton({
  label,
  href,
  from = 'header',
  className = '',
  prefetch = false
}: Props) {
  const locale = useLocale();
  const to = href ?? `/${locale}/demo`;

  return (
    <Link
      href={to}
      prefetch={prefetch}
      className={[
        'inline-flex items-center rounded-brand bg-brand px-5 py-3 text-white text-sm font-medium shadow-sm',
        'hover:opacity-90',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:oklch(62%_0.2_280)]',
        className
      ].join(' ')}
      data-analytics-id="header_demo_click"
      onClick={() => {
        // 失敗してもUIを邪魔しない軽量トラッキング
        try {
          track('demo_cta_click', { from, locale, to });
        } catch {}
      }}
      aria-label={label}
    >
      {label}
    </Link>
  );
}
