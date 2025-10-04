#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate HTML version that can be printed to PDF
function generatePDF() {
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
            max-width: 720px;
            margin: 0 auto;
            padding: 20px;
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
        
        .cover-page p {
            text-indent: 0;
        }
        
        .content-section p {
            text-indent: 1.5em;
        }
        
        .content-section p:first-child {
            text-indent: 0;
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
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .cover-page .author-info {
            text-align: left;
            margin: 40pt 0;
        }
        
        .cover-page .author-info p {
            margin: 8pt 0;
            text-indent: 0;
        }
        
        .cover-page h1 {
            font-size: 24pt;
            margin: 40pt 0 20pt 0;
            color: #1f2937;
            line-height: 1.2;
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
        
        .cover-page .stats {
            font-size: 14pt;
            font-weight: bold;
            color: #3b82f6;
            margin: 20pt 0;
            padding: 10pt;
            background-color: #f8fafc;
            border-radius: 8pt;
            border: 1pt solid #e2e8f0;
        }
        
        .content-section {
            max-width: 680px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .content-section h1,
        .content-section h2,
        .content-section h3 {
            text-indent: 0;
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
                font-size: 11.5pt;
                line-height: 1.5;
            }
            
            main {
                max-width: 720px;
                margin: 0 auto;
            }
            
            .no-print {
                display: none;
            }
            
            h1, h2, h3 {
                page-break-after: avoid;
                break-after: avoid;
            }
            
            img, pre, table, figure {
                page-break-inside: avoid;
                break-inside: avoid;
            }
            
            .page-break {
                page-break-before: page;
                break-before: page;
            }
            
            p {
                orphans: 3;
                widows: 3;
                margin: 0.75rem 0;
            }
            
            table {
                break-inside: avoid;
            }
            
            pre, code {
                break-inside: avoid;
            }
        }
    </style>
</head>
<body>
`;
  
  // Process each markdown file
  files.forEach((filename, index) => {
    const filePath = path.join(contentDir, filename);
    
    if (fs.existsSync(filePath)) {
      console.log(`📄 Processing ${filename}...`);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Convert markdown to HTML (simple conversion)
      content = convertMarkdownToHTML(content);
      
      // Add page break between sections (except first)
      if (index > 0) {
        htmlContent += '<div class="page-break"></div>\n';
      }
      
      htmlContent += `<div class="content-section">${content}</div>\n\n`;
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
  let html = content;
  
  // Headers
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  
  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Code blocks
  html = html.replace(/```([\\s\\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');
  
  // Tables - handle markdown tables properly
  const lines = html.split('\n');
  let inTable = false;
  let tableRows = [];
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a table row
    if (line.includes('|') && line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      
      // Skip separator lines (---|---)
      if (!line.includes('---')) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        if (cells.length > 1) {
          tableRows.push(cells);
        }
      }
    } else {
      // Not a table row
      if (inTable && tableRows.length > 0) {
        // Process the table
        result.push('<table>');
        tableRows.forEach((row, index) => {
          const tag = index === 0 ? 'th' : 'td';
          result.push('<tr>');
          row.forEach(cell => {
            result.push(`<${tag}>${cell}</${tag}>`);
          });
          result.push('</tr>');
        });
        result.push('</table>');
        tableRows = [];
        inTable = false;
      }
      result.push(line);
    }
  }
  
  // Handle table at end of content
  if (inTable && tableRows.length > 0) {
    result.push('<table>');
    tableRows.forEach((row, index) => {
      const tag = index === 0 ? 'th' : 'td';
      result.push('<tr>');
      row.forEach(cell => {
        result.push(`<${tag}>${cell}</${tag}>`);
      });
      result.push('</tr>');
    });
    result.push('</table>');
  }
  
  html = result.join('\n');
  
  // Lists
  html = html.replace(/^\\* (.+)$/gm, '<li>$1</li>');
  html = html.replace(/^\\d+\\. (.+)$/gm, '<li>$1</li>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  // Line breaks
  html = html.replace(/\\n\\n/g, '</p><p>');
  html = html.replace(/\\n/g, '<br>');
  
  // Wrap in paragraphs (but not for existing HTML elements)
  html = html.replace(/^(?!<[h1-6]|<ul|<ol|<li|<table|<tr|<td|<th|<hr|<pre|<code)(.+)$/gm, '<p>$1</p>');
  
  return html;
}

// Run the script
if (require.main === module) {
  generatePDF();
}

module.exports = generatePDF;
