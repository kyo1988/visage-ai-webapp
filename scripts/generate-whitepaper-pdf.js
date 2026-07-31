#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const REPORT_FILES = [
  '00-cover.md',
  '01-executive-summary.md',
  '02-what-we-measured.md',
  '03-finding-1-duplication.md',
  '04-finding-2-double-jeopardy.md',
  '05-finding-3-buyer-frequency.md',
  '06-finding-4-cep.md',
  '07-methods.md',
  '08-limits.md',
  '09-reproduction-checklist.md',
  '10-references.md',
  '99-legal.md',
];

async function generateWhitepaper() {
  const { remark } = await import('remark');
  const { default: remarkGfm } = await import('remark-gfm');
  const { default: remarkHtml } = await import('remark-html');

  const rootDir = path.join(__dirname, '..');
  const contentDir = path.join(rootDir, 'content', 'whitepaper', 'ebm-2025');
  const outputDir = path.join(rootDir, 'public', 'whitepapers');
  const htmlPath = path.join(outputDir, 'ebm-2025-v0.2.html');

  fs.mkdirSync(outputDir, { recursive: true });

  const processor = remark().use(remarkGfm).use(remarkHtml, { sanitize: false });
  const sections = [];

  for (const filename of REPORT_FILES) {
    const markdownPath = path.join(contentDir, filename);
    if (!fs.existsSync(markdownPath)) {
      throw new Error(`Missing canonical whitepaper section: ${filename}`);
    }
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    let html = String(processor.processSync(markdown));
    if (filename === '00-cover.md') {
      html = html.replace('<blockquote>', '<blockquote id="revision-notice">');
    }
    sections.push(`<section class="report-section" data-source="${filename}">${html}</section>`);
  }

  const htmlDocument = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A corrected public-data replication audit of Ehrenberg-Bass regularities.">
  <title>Evidence-Based Marketing Playbook — Public-data replication audit</title>
  <style>
    :root { --ink:#172033; --muted:#5b667a; --line:#d9deea; --blue:#1d4ed8; --paper:#fff; --soft:#f5f7fb; --warn:#fffbeb; }
    * { box-sizing:border-box; }
    html { background:#e9edf5; }
    body { max-width:900px; margin:32px auto; padding:0; background:var(--paper); color:var(--ink); font:16px/1.62 Arial, Helvetica, sans-serif; box-shadow:0 20px 60px rgba(15,23,42,.12); }
    .report-section { padding:44px 58px; border-bottom:1px solid var(--line); }
    .report-section:first-child { min-height:980px; padding-top:110px; background:linear-gradient(145deg,#0f172a 0%,#172554 65%,#1e3a8a 100%); color:#fff; }
    .report-section:first-child h1, .report-section:first-child h2, .report-section:first-child h3 { color:#fff; }
    .report-section:first-child h1 { max-width:700px; font-size:46px; letter-spacing:-.035em; }
    .report-section:first-child h2 { color:#bfdbfe; font-size:24px; }
    .report-section:first-child p { max-width:720px; color:#dbeafe; }
    .report-section:first-child blockquote { max-width:760px; margin:34px 0; padding:24px 28px; border:1px solid rgba(147,197,253,.6); border-left:5px solid #60a5fa; border-radius:12px; background:rgba(15,23,42,.62); color:#e2e8f0; }
    .report-section:first-child blockquote p { color:#e2e8f0; }
    .report-section:first-child blockquote ol { padding-left:24px; }
    h1 { margin:0 0 26px; color:#0f172a; font-size:32px; line-height:1.16; letter-spacing:-.025em; }
    h2 { margin:34px 0 14px; color:#172554; font-size:22px; line-height:1.25; }
    h3 { margin:26px 0 10px; color:#1e3a8a; font-size:18px; line-height:1.3; }
    p { margin:0 0 16px; }
    ul, ol { margin:10px 0 20px; padding-left:25px; }
    li { margin:7px 0; }
    table { width:100%; margin:22px 0 28px; border-collapse:collapse; font-size:13px; line-height:1.45; }
    th, td { padding:10px 11px; border:1px solid var(--line); text-align:left; vertical-align:top; }
    th { background:#eef2ff; color:#172554; font-weight:700; }
    tr:nth-child(even) td { background:#fafbfe; }
    code { border-radius:4px; background:#eef2f7; padding:2px 5px; font:13px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    a { color:var(--blue); overflow-wrap:anywhere; }
    hr { margin:30px 0; border:0; border-top:1px solid rgba(255,255,255,.28); }
    blockquote { margin:20px 0; padding:2px 0 2px 18px; border-left:4px solid #93c5fd; color:var(--muted); }
    @page { size:A4; margin:16mm 15mm 18mm; }
    @media print {
      html, body { margin:0; max-width:none; background:#fff; box-shadow:none; print-color-adjust:exact; -webkit-print-color-adjust:exact; }
      .report-section { padding:0; border:0; break-before:page; }
      .report-section:first-child { min-height:260mm; height:auto; margin:-16mm -15mm -18mm; padding:36mm 22mm; break-before:auto; }
      h1, h2, h3 { break-after:avoid; }
      table, pre, blockquote { break-inside:avoid; }
      p, li { orphans:3; widows:3; }
      a { color:inherit; text-decoration:none; }
    }
  </style>
</head>
<body>
${sections.join('\n')}
</body>
</html>
`;

  fs.writeFileSync(htmlPath, htmlDocument);
  console.log(`HTML generated: ${htmlPath}`);

  if (process.argv.includes('--html-only')) {
    return;
  }

  const python = process.env.WHITEPAPER_PYTHON || 'python3';
  const pdfScript = path.join(__dirname, 'generate-whitepaper-pdf.py');
  const result = spawnSync(python, [pdfScript], {
    cwd: rootDir,
    env: process.env,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    throw new Error(
      'PDF generation failed. Install the pinned dependency with ' +
      '`python3 -m pip install -r scripts/requirements-whitepaper.txt` or set WHITEPAPER_PYTHON.'
    );
  }
}

generateWhitepaper().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
