# Whitepaper PDF Generation Guide

## Method 1: Generate HTML and Print to PDF (Recommended)

1. **Generate the HTML file:**
   ```bash
   npm run generate-pdf
   ```

2. **Open the generated HTML file:**
   - File: `public/whitepapers/ebm-2025-v0.1.html`
   - Or visit: http://localhost:3000/whitepapers/ebm-2025-v0.1.html

3. **Print to PDF:**
   - Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
   - Select "Save as PDF" as destination
   - Set paper size to A4
   - Set margins to "Minimum" or "None"
   - Click "Save" and save as `public/whitepapers/ebm-2025-v0.1.pdf`

## Method 2: Use Print Page (Alternative)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the print page in your browser:**
   - English: http://localhost:3000/en/whitepaper/ebm-2025/print
   - Japanese: http://localhost:3000/ja/whitepaper/ebm-2025/print

3. **Print to PDF:**
   - Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
   - Select "Save as PDF" as destination
   - Set paper size to A4
   - Set margins to "Minimum" or "None"
   - Click "Save" and save as `public/whitepapers/ebm-2025-v0.1.pdf`

## Method 2: Automated PDF Generation (Advanced)

1. **Install Puppeteer:**
   ```bash
   npm install puppeteer --save-dev
   ```

2. **Start the development server in one terminal:**
   ```bash
   npm run dev
   ```

3. **Generate PDF in another terminal:**
   ```bash
   npm run generate-pdf
   ```

## Method 3: Pandoc (Alternative)

If you have Pandoc installed:

```bash
cd content/whitepaper/ebm-2025
pandoc 00-cover.md 01-tldr.md 02-architecture.md 03-dirichlet.md 04-cep.md 05-decision-bridge.md 06-reproduction-checklist.md 99-legal.md \
  -o ../../public/whitepapers/ebm-2025-v0.1.pdf \
  --from=gfm --pdf-engine=wkhtmltopdf \
  -V margin-left=20mm -V margin-right=20mm -V margin-top=20mm -V margin-bottom=20mm
```

## Print Page Features

The print page (`/whitepaper/ebm-2025/print`) includes:

- ✅ A4-optimized CSS with proper margins (14mm)
- ✅ Page breaks between sections
- ✅ Print-friendly typography (12pt system-ui font)
- ✅ Proper table styling
- ✅ Chart and image optimization
- ✅ All whitepaper sections included
- ✅ Print button for easy PDF generation

## File Structure

```
public/whitepapers/
└── ebm-2025-v0.1.pdf  # Generated PDF file
```

## Notes

- The print page uses `@media print` CSS for optimal PDF output
- All sections are included: cover, TL;DR, architecture, Dirichlet, CEP, quantile analysis, case studies, decision bridge, reproduction checklist, and legal
- Charts and images are optimized for print with proper sizing and borders
- The PDF should be approximately 8-10 pages when printed
