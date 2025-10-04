const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function generateWhitepaperPDF() {
  try {
    console.log('📄 Generating whitepaper PDF...');
    
    // Create public/whitepapers directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public', 'whitepapers');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Load all markdown content
    const contentDir = path.join(process.cwd(), 'content', 'whitepaper', 'ebm-2025');
    
    const files = [
      '00-cover.md',
      '01-executive-summary.md',
      '02-what-we-measured.md',
      '03-finding-1-entry-situations.md',
      '04-finding-2-heavy-buyers.md',
      '05-finding-3-top-quarter.md',
      '06-finding-4-repertoire.md',
      '07-methods.md',
      '08-limits.md',
      '09-checklist.md',
      '10-references.md'
    ];
    
    // Combine all markdown files
    let combinedMarkdown = '';
    for (const file of files) {
      const filePath = path.join(contentDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        combinedMarkdown += content + '\n\n---\n\n';
      }
    }
    
    // Write combined markdown to temp file
    const tempMarkdownPath = path.join(process.cwd(), 'temp-whitepaper.md');
    fs.writeFileSync(tempMarkdownPath, combinedMarkdown);
    
    // Generate PDF using pandoc
    const outputPath = path.join(publicDir, 'ebm-2025-v0.1.pdf');
    
    try {
      execSync(`pandoc "${tempMarkdownPath}" -o "${outputPath}" --pdf-engine=wkhtmltopdf -V margin-left=20mm -V margin-right=20mm -V margin-top=20mm -V margin-bottom=20mm --from=gfm`, {
        stdio: 'inherit'
      });
      console.log('✅ PDF generated successfully:', outputPath);
    } catch (pandocError) {
      console.log('⚠️  Pandoc failed, trying alternative method...');
      
      // Fallback: Generate HTML and let user print to PDF
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evidence-Based Marketing Playbook - Executive Preview v0.1</title>
    <style>
        @page { 
            size: A4; 
            margin: 14mm; 
        }
        
        body { 
            font: 12pt/1.5 system-ui; 
            color: #111; 
            margin: 0;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        h1 { 
            font-size: 22pt; 
            margin: 0 0 8mm; 
            color: #1f2937;
        }
        
        h2 { 
            font-size: 14pt; 
            margin: 6mm 0 3mm; 
            color: #374151;
        }
        
        h3 {
            font-size: 12pt;
            margin: 4mm 0 2mm;
            color: #4b5563;
        }
        
        p {
            margin-bottom: 6pt;
            text-align: justify;
        }
        
        ul, ol {
            margin-bottom: 6pt;
            padding-left: 15pt;
        }
        
        li {
            margin-bottom: 3pt;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 6pt 0;
        }
        
        th, td {
            border: 1pt solid #ddd;
            padding: 4pt;
            text-align: left;
        }
        
        th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        
        img, pre, code { 
            page-break-inside: avoid; 
        }
        
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    ${combinedMarkdown.replace(/\n/g, '<br>')}
</body>
</html>`;
      
      const htmlPath = path.join(publicDir, 'ebm-2025-v0.1.html');
      fs.writeFileSync(htmlPath, htmlContent);
      console.log('✅ HTML generated as fallback:', htmlPath);
      console.log('📝 You can open this HTML file in a browser and print to PDF');
    }
    
    // Clean up temp file
    fs.unlinkSync(tempMarkdownPath);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
}

generateWhitepaperPDF();
