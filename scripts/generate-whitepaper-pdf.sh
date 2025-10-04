#!/bin/bash

# Generate EBM-2025 Whitepaper PDF using Pandoc
# This script combines all markdown files and creates a proper PDF

set -e

echo "🚀 Generating EBM-2025 Whitepaper PDF..."

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc not found. Please install pandoc first:"
    echo "   - macOS: brew install pandoc"
    echo "   - Ubuntu: sudo apt-get install pandoc"
    echo "   - Windows: choco install pandoc"
    exit 1
fi

# Check if wkhtmltopdf is installed
if ! command -v wkhtmltopdf &> /dev/null; then
    echo "❌ wkhtmltopdf not found. Please install wkhtmltopdf first:"
    echo "   - macOS: brew install wkhtmltopdf"
    echo "   - Ubuntu: sudo apt-get install wkhtmltopdf"
    echo "   - Windows: choco install wkhtmltopdf"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p public/whitepapers

# Change to content directory
cd content/whitepaper/ebm-2025

# Generate PDF using Pandoc
echo "📝 Processing markdown files..."

pandoc \
  00-cover.md \
  01-tldr.md \
  02-architecture.md \
  03-dirichlet.md \
  04-cep.md \
  05-decision-bridge.md \
  06-reproduction-checklist.md \
  99-legal.md \
  -o ../../public/whitepapers/ebm-2025-v0.1.pdf \
  --from=gfm \
  --pdf-engine=wkhtmltopdf \
  --pdf-engine-opt='--page-size' \
  --pdf-engine-opt='A4' \
  --pdf-engine-opt='--margin-top' \
  --pdf-engine-opt='20mm' \
  --pdf-engine-opt='--margin-right' \
  --pdf-engine-opt='20mm' \
  --pdf-engine-opt='--margin-bottom' \
  --pdf-engine-opt='20mm' \
  --pdf-engine-opt='--margin-left' \
  --pdf-engine-opt='20mm' \
  --pdf-engine-opt='--encoding' \
  --pdf-engine-opt='UTF-8' \
  --pdf-engine-opt='--print-media-type' \
  --pdf-engine-opt='--disable-smart-shrinking' \
  --toc \
  --toc-depth=2 \
  --metadata title="Evidence-Based Marketing Playbook - Executive Preview v0.1" \
  --metadata author="Kyo Harada" \
  --metadata date="September 2025" \
  --metadata subject="Marketing Science Research" \
  --metadata keywords="Ehrenberg-Bass, Marketing Science, DoP, CEP, Dirichlet, Quantile Analysis" \
  --css=../../styles/whitepaper-pdf.css

# Check if PDF was created successfully
if [ -f "../../public/whitepapers/ebm-2025-v0.1.pdf" ]; then
    echo "✅ PDF generated successfully!"
    echo "📄 Location: public/whitepapers/ebm-2025-v0.1.pdf"
    
    # Get file size
    file_size=$(du -h "../../public/whitepapers/ebm-2025-v0.1.pdf" | cut -f1)
    echo "📊 File size: $file_size"
    
    # Get page count (if pdfinfo is available)
    if command -v pdfinfo &> /dev/null; then
        page_count=$(pdfinfo "../../public/whitepapers/ebm-2025-v0.1.pdf" | grep Pages | awk '{print $2}')
        echo "📖 Pages: $page_count"
    fi
else
    echo "❌ PDF generation failed!"
    exit 1
fi

echo "🎉 Whitepaper PDF generation complete!"
