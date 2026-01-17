import Link from 'next/link';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const title = locale === 'ja' ? 'Visage AI – 導入ガイド（日本語）' : 'Visage AI – Getting Started Guide';
  const description = locale === 'ja' ? 'アプリのインストールから店舗運用まで、導入の流れをご案内します' : 'From app installation to store operation - your complete onboarding guide';
  return {
    title,
    description,
    openGraph: { title, description, images: ['/og.jpg'], url: `/${locale}/docs` },
    alternates: { canonical: `/${locale}/docs` }
  };
}

export default async function DocsHome({
  params: { locale }
}: {
  params: { locale: 'ja' | 'en' };
}) {
  const messages = locale === 'ja'
    ? await import('../../../messages/ja.json')
    : await import('../../../messages/en.json');
  const base = `/${locale}/docs`;

  return (
    <article className="prose prose-slate max-w-none">
      <h1>{messages.default.docs.pages.overview.title}</h1>
      <p className="lead">
        {messages.default.docs.pages.overview.lead}
      </p>

      <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href={`${base}/sdk-js`}
          className="rounded-xl border p-4 hover:bg-slate-50"
        >
          <h3 className="font-semibold">{messages.default.docs.pages.overview.cards.sdkJs.title}</h3>
          <p className="text-sm text-slate-600">
            {messages.default.docs.pages.overview.cards.sdkJs.desc}
          </p>
        </Link>

        <Link
          href={`${base}/sdk-swift`}
          className="rounded-xl border p-4 hover:bg-slate-50"
        >
          <h3 className="font-semibold">{messages.default.docs.pages.overview.cards.sdkSwift.title}</h3>
          <p className="text-sm text-slate-600">
            {messages.default.docs.pages.overview.cards.sdkSwift.desc}
          </p>
        </Link>

        <Link
          href={`${base}/sdk-kotlin`}
          className="rounded-xl border p-4 hover:bg-slate-50"
        >
          <h3 className="font-semibold">{messages.default.docs.pages.overview.cards.sdkKotlin.title}</h3>
          <p className="text-sm text-slate-600">
            {messages.default.docs.pages.overview.cards.sdkKotlin.desc}
          </p>
        </Link>

        <Link
          href={`${base}/security`}
          className="rounded-xl border p-4 hover:bg-slate-50"
        >
          <h3 className="font-semibold">{messages.default.docs.pages.overview.cards.security.title}</h3>
          <p className="text-sm text-slate-600">
            {messages.default.docs.pages.overview.cards.security.desc}
          </p>
        </Link>
      </div>

      <div className="mt-8">
        <a href={`/${locale}/demo`} className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-white text-sm hover:opacity-90">
          {messages.default.docs.cta.demo}
        </a>
      </div>
    </article>
  );
}
