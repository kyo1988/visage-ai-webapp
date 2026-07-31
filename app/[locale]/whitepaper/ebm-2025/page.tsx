import { Suspense } from 'react';
import type { Metadata } from 'next';
import { loadWhitepaperContent, markdownToHtml } from '@/app/lib/markdown';
import WhitepaperForm from './WhitepaperForm';

export const metadata: Metadata = {
  title: 'Evidence-Based Marketing Playbook v0.2 | Public-data replication audit',
  description:
    'Version 0.2 of a public-data replication audit. Five claims from v0.1 are withdrawn after a code audit; the remaining outputs are retained as an audit trail.',
  openGraph: {
    title: 'Evidence-Based Marketing Playbook v0.2',
    description:
      'A revised public-data replication audit with five v0.1 claims explicitly withdrawn after a code audit.',
    type: 'article',
    url: '/en/whitepaper/ebm-2025',
  },
  twitter: {
    card: 'summary',
    title: 'Evidence-Based Marketing Playbook v0.2',
    description:
      'A revised public-data replication audit with five v0.1 claims explicitly withdrawn after a code audit.',
  },
};

function ReportSection({
  markdown,
  tone = 'plain',
}: {
  markdown: string;
  tone?: 'plain' | 'warning' | 'appendix';
}) {
  const toneClass = {
    plain: 'border-slate-200 bg-white',
    warning: 'border-amber-200 bg-amber-50/60',
    appendix: 'border-slate-200 bg-slate-50',
  }[tone];

  return (
    <section className={`rounded-2xl border ${toneClass} p-6 shadow-sm md:p-9`}>
      <div
        className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-table:block prose-table:overflow-x-auto prose-th:whitespace-nowrap"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
      />
    </section>
  );
}

export default async function WhitepaperPage() {
  const content = await loadWhitepaperContent();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 py-20 text-white">
        <div className="container mx-auto max-w-5xl px-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
            Version 0.2 — revised July 2026. Five claims from v0.1 withdrawn after a code audit.
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Evidence-Based Marketing Playbook
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            A public-data replication audit of Ehrenberg-Bass regularities. The revision preserves the negative
            results and withdraws claims that the archived code did not measure.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['DoP weighted MAD', '0.015863', 'FAIL · gate ≤0.015'],
              ['Double Jeopardy', 'r 0.627', 'FAIL · gate ≥0.80'],
              ['Q4 lagged frequency', 'R² 0.472', 'Descriptive only'],
              ['CEP lexical pipeline', 'r −0.280', 'Not interpretable · schema mismatch'],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-xl border border-white/15 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
                <div className="mt-1 text-xl font-bold">{value}</div>
                <div className="mt-1 text-xs text-slate-400">{note}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/whitepapers/ebm-2025-v0.2.pdf"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Download v0.2 PDF
            </a>
            <a
              href="#report"
              className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition hover:border-slate-400"
            >
              Read the audit
            </a>
            <a
              href="/whitepapers/ebm-2025-v0.2.html#revision-notice"
              className="px-1 py-3 text-sm font-semibold text-blue-300 underline-offset-4 hover:text-blue-200 hover:underline"
            >
              Read the full revision notice
            </a>
          </div>
          <p className="mt-5 text-sm text-slate-400">
            Archive:{' '}
            <a
              href="/whitepapers/ebm-2025-v0.1.pdf"
              className="underline underline-offset-4 hover:text-slate-200"
            >
              v0.1 (September 2025, superseded)
            </a>
          </p>
        </div>
      </section>

      <div id="report" className="container mx-auto max-w-5xl space-y-8 px-6 py-12">
        <ReportSection markdown={content.executiveSummary} />
        <ReportSection markdown={content.whatWeMeasured} />
        <ReportSection markdown={content.finding1} />
        <ReportSection markdown={content.finding2} />
        <ReportSection markdown={content.finding3} />
        <ReportSection markdown={content.finding4} tone="warning" />

        <details className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
          <summary className="cursor-pointer list-none px-6 py-5 text-lg font-semibold text-slate-900 md:px-9">
            Methods, limitations, and reproduction requirements
            <span className="float-right text-slate-400 group-open:rotate-180">⌄</span>
          </summary>
          <div className="space-y-8 border-t border-slate-200 p-6 md:p-9">
            <ReportSection markdown={content.methods} tone="appendix" />
            <ReportSection markdown={content.limits} tone="warning" />
            <ReportSection markdown={content.checklist} tone="appendix" />
            <ReportSection markdown={content.references} tone="appendix" />
            <ReportSection markdown={content.legal} tone="appendix" />
          </div>
        </details>
      </div>

      <section id="download" className="border-t border-slate-200 bg-white py-16">
        <div className="container mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-950">Receive version 0.2</h2>
          <p className="mt-3 text-slate-600">
            The PDF contains the corrected findings, methods, limitations, references, and publication checklist.
          </p>
          <div className="mt-8 text-left">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-slate-100" />}>
              <WhitepaperForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
