import { useLocale, useTranslations } from "@/app/lib/intl";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateMetadata({params:{locale}}:{params:{locale:string}}): Promise<Metadata> {
  return {
    title: locale === 'ja' ? 'Visage AI – デモ予約（日本語）' : 'Visage AI – Book a Demo',
    description: locale === 'ja' ? 'AI肌診断のデモを予約' : 'Book a demo of AI skin analysis',
  };
}

export default function DemoPage({params:{locale}}:{params:{locale:string}}) {
  const calUrl =
    process.env.NEXT_PUBLIC_CAL_URL ??
    process.env.CALCOM_URL ??
    "";

  if (!calUrl) {
    // ← ローカル/PreviewでENV未設定でも落ちない
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-semibold">
          {locale === 'ja' ? 'デモを予約' : 'Book a Demo'}
        </h1>
        <p className="mt-3 text-slate-600">
          {locale === 'ja' 
            ? '予約カレンダーが一時的に利用できません。お問い合わせいただければ、デモを手配いたします。'
            : 'Our booking calendar is temporarily unavailable. Please contact us and we will arrange a demo.'
          }
        </p>
        <div className="mt-6 flex gap-3">
          <a
            href={`mailto:hello@visageaiconsulting.com?subject=Demo%20Request%20(${locale})`}
            className="rounded-lg bg-sky-600 px-4 py-2 text-white shadow-sm hover:opacity-90"
          >
            {locale === 'ja' ? 'お問い合わせ' : 'Contact us'}
          </a>
          <a
            href={`/${locale}/docs`}
            className="rounded-lg border px-4 py-2 hover:bg-slate-50"
          >
            {locale === 'ja' ? 'ドキュメントを見る' : 'View Docs'}
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          {locale === 'ja' 
            ? '(NEXT_PUBLIC_CAL_URL または CALCOM_URL を設定すると予約iframeが有効になります。)'
            : '(Set NEXT_PUBLIC_CAL_URL or CALCOM_URL to enable the booking iframe.)'
          }
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <h1 className="sr-only">Book a Demo</h1>
      <div className="rounded-2xl border bg-white shadow-sm">
        <iframe
          src={calUrl}
          title="Cal.com booking"
          className="h-[80vh] w-full rounded-2xl"
          loading="lazy"
        />
      </div>
    </main>
    );
}
