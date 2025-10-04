#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate HTML version that can be printed to PDF
function generateHTMLPDF() {
  console.log('🚀 Generating HTML version for PDF printing...');
  
  const contentDir = path.join(__dirname, '..', 'content', 'whitepaper', 'ebm-2025');
  const outputDir = path.join(__dirname, '..', 'public', 'whitepapers');
  const outputFile = path.join(outputDir, 'ebm-2025-v0.1.html');
  
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Read all markdown files in order
  const files = [
    '00-cover.md',
    '01-tldr.md', 
    '02-architecture.md',
    '03-dirichlet.md',
    '04-cep.md',
    '05-decision-bridge.md',
    '06-reproduction-checklist.md',
    '99-legal.md'
  ];
  
  let htmlContent = `<!DOCTYPE html>
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
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #333;
            margin: 0;
            padding: 0;
            max-width: none;
        }
        
        h1 { 
            font-size: 18pt;
            font-weight: bold;
            color: #1f2937;
            margin: 0 0 12pt 0;
            page-break-after: avoid;
        }
        
        h2 { 
            font-size: 14pt;
            font-weight: bold;
            color: #374151;
            margin: 16pt 0 8pt 0;
            page-break-after: avoid;
        }
        
        h3 {
            font-size: 12pt;
            font-weight: bold;
            color: #4b5563;
            margin: 12pt 0 6pt 0;
            page-break-after: avoid;
        }
        
        p {
            margin: 0 0 8pt 0;
            text-align: justify;
        }
        
        ul, ol {
            margin: 8pt 0;
            padding-left: 20pt;
        }
        
        li {
            margin: 2pt 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 8pt 0;
            font-size: 10pt;
        }
        
        th, td {
            border: 1pt solid #ddd;
            padding: 4pt 6pt;
            text-align: left;
            vertical-align: top;
        }
        
        th {
            background-color: #f5f5f5;
            font-weight: bold;
            color: #374151;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        code {
            font-family: "Consolas", "Monaco", "Courier New", monospace;
            font-size: 9pt;
            background-color: #f3f4f6;
            padding: 1pt 3pt;
            border-radius: 2pt;
            color: #d63384;
        }
        
        pre {
            background-color: #f8f9fa;
            border: 1pt solid #e9ecef;
            border-radius: 4pt;
            padding: 8pt;
            margin: 8pt 0;
            font-family: "Consolas", "Monaco", "Courier New", monospace;
            font-size: 9pt;
            line-height: 1.3;
            overflow-x: auto;
            page-break-inside: avoid;
        }
        
        pre code {
            background-color: transparent;
            padding: 0;
            border-radius: 0;
            color: #333;
        }
        
        blockquote {
            margin: 8pt 0;
            padding: 8pt 12pt;
            border-left: 3pt solid #3b82f6;
            background-color: #f8fafc;
            font-style: italic;
        }
        
        hr {
            border: none;
            border-top: 1pt solid #e5e7eb;
            margin: 16pt 0;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .cover-page {
            text-align: center;
            page-break-after: always;
        }
        
        .cover-page h1 {
            font-size: 24pt;
            margin: 40pt 0 20pt 0;
            color: #1f2937;
        }
        
        .cover-page .subtitle {
            font-size: 16pt;
            color: #6b7280;
            margin: 0 0 40pt 0;
        }
        
        .cover-page .description {
            font-size: 12pt;
            color: #9ca3af;
            margin: 0 0 60pt 0;
        }
        
        .section-header {
            border-bottom: 2pt solid #3b82f6;
            padding-bottom: 4pt;
            margin-bottom: 12pt;
        }
        
        img {
            max-width: 100%;
            height: auto;
            margin: 8pt 0;
            page-break-inside: avoid;
        }
        
        @media print {
            body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            .no-print {
                display: none;
            }
            
            h1, h2, h3 {
                page-break-after: avoid;
            }
            
            img, pre, table {
                page-break-inside: avoid;
            }
            
            p {
                orphans: 3;
                widows: 3;
            }
        }
    </style>
</head>
<body>
    <div class="cover-page">
        <h1>Evidence-Based Marketing Playbook</h1>
        <div class="subtitle">Executive Preview v0.1</div>
        <div class="description">Validating Ehrenberg-Bass Principles with Public Data</div>
        <p><strong>Author:</strong> Kyo Harada<br>
        <strong>Date:</strong> September 2025<br>
        <strong>Subject:</strong> Marketing Science Research</p>
    </div>
    
`;
  
  // Process each markdown file
  files.forEach((filename, index) => {
    const filePath = path.join(contentDir, filename);
    
    if (fs.existsSync(filePath)) {
      console.log(`📄 Processing ${filename}...`);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Convert markdown to HTML (basic conversion)
      content = convertMarkdownToHTML(content);
      
      // Add page break between sections (except first)
      if (index > 0) {
        htmlContent += '<div class="page-break"></div>\n';
      }
      
      htmlContent += `<div>${content}</div>\n\n`;
    } else {
      console.warn(`⚠️  File not found: ${filename}`);
    }
  });
  
  // Add footer
  htmlContent += `
    <hr>
    <p style="text-align: center; color: #6b7280; font-size: 10pt;">
        Visage AI Consulting • September 2025 • Executive Preview v0.1
    </p>
    
    <div class="no-print" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
        <button onclick="window.print()" style="
            background-color: #3b82f6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        ">Print to PDF</button>
    </div>
</body>
</html>`;
  
  fs.writeFileSync(outputFile, htmlContent);
  console.log(`✅ HTML file generated: ${outputFile}`);
  console.log(`📄 Open this file in your browser and print to PDF`);
  console.log(`🌐 Or visit: http://localhost:3000/whitepapers/ebm-2025-v0.1.html`);
}

function convertMarkdownToHTML(content) {
  return content
    // Headers
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Code blocks
    .replace(/```([\\s\\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    
    // Lists
    .replace(/^\\* (.+)$/gm, '<li>$1</li>')
    .replace(/^\\d+\\. (.+)$/gm, '<li>$1</li>')
    
    // Tables (basic)
    .replace(/^\\|(.+)\\|$/gm, (match, content) => {
      const cells = content.split('|').map(cell => cell.trim()).filter(cell => cell);
      if (cells.length > 1) {
        return '<tr><td>' + cells.join('</td><td>') + '</td></tr>';
      }
      return match;
    })
    
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
    
    // Line breaks
    .replace(/\\n\\n/g, '</p><p>')
    .replace(/\\n/g, '<br>')
    
    // Wrap in paragraphs
    .replace(/^(?!<[h1-6]|<ul|<ol|<li|<table|<tr|<td|<th|<hr|<pre|<code)(.+)$/gm, '<p>$1</p>');
}

// Run the script
if (require.main === module) {
  generateHTMLPDF();
}

module.exports = generateHTMLPDF;
