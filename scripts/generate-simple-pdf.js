#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple PDF generation by combining markdown files
function generateSimplePDF() {
  console.log('🚀 Generating simple PDF from markdown files...');
  
  const contentDir = path.join(__dirname, '..', 'content', 'whitepaper', 'ebm-2025');
  const outputDir = path.join(__dirname, '..', 'public', 'whitepapers');
  const outputFile = path.join(outputDir, 'ebm-2025-v0.1.pdf');
  
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
  
  let combinedContent = '';
  
  // Add PDF header
  combinedContent += `% Evidence-Based Marketing Playbook
% Executive Preview v0.1
% Kyo Harada
% September 2025

\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=20mm]{geometry}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{array}
\\usepackage{listings}
\\usepackage{xcolor}
\\usepackage{hyperref}

\\title{Evidence-Based Marketing Playbook\\\\Executive Preview v0.1}
\\author{Kyo Harada}
\\date{September 2025}

\\begin{document}

\\maketitle

\\tableofcontents
\\newpage

`;
  
  // Process each markdown file
  files.forEach((filename, index) => {
    const filePath = path.join(contentDir, filename);
    
    if (fs.existsSync(filePath)) {
      console.log(`📄 Processing ${filename}...`);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Convert markdown to LaTeX
      content = convertMarkdownToLatex(content);
      
      // Add page break between sections (except first)
      if (index > 0) {
        combinedContent += '\\newpage\n\n';
      }
      
      combinedContent += content + '\n\n';
    } else {
      console.warn(`⚠️  File not found: ${filename}`);
    }
  });
  
  // Add PDF footer
  combinedContent += `
\\end{document}
`;
  
  // Write the LaTeX file
  const latexFile = path.join(outputDir, 'ebm-2025-v0.1.tex');
  fs.writeFileSync(latexFile, combinedContent);
  
  console.log(`✅ LaTeX file generated: ${latexFile}`);
  console.log(`📝 To generate PDF, run: pdflatex ${latexFile}`);
  console.log(`📄 Or use online LaTeX compiler like Overleaf`);
  
  // Create a simple HTML version as fallback
  createHTMLFallback();
}

function convertMarkdownToLatex(content) {
  // Basic markdown to LaTeX conversion
  return content
    // Headers
    .replace(/^# (.+)$/gm, '\\section{$1}')
    .replace(/^## (.+)$/gm, '\\subsection{$1}')
    .replace(/^### (.+)$/gm, '\\subsubsection{$1}')
    
    // Bold and italic
    .replace(/\\*\\*(.+?)\\*\\*/g, '\\textbf{$1}')
    .replace(/\\*(.+?)\\*/g, '\\textit{$1}')
    
    // Code blocks
    .replace(/```([\\s\\S]*?)```/g, '\\begin{lstlisting}\n$1\\end{lstlisting}')
    .replace(/`(.+?)`/g, '\\texttt{$1}')
    
    // Lists
    .replace(/^\\* (.+)$/gm, '\\item $1')
    .replace(/^\\d+\\. (.+)$/gm, '\\item $1')
    
    // Tables (basic)
    .replace(/\\|(.+)\\|/g, (match, content) => {
      const cells = content.split('|').map(cell => cell.trim()).filter(cell => cell);
      if (cells.length > 1) {
        return cells.join(' & ') + ' \\\\';
      }
      return match;
    })
    
    // Line breaks
    .replace(/\\n\\n/g, '\\n\\n')
    .replace(/\\n/g, '\\n');
}

function createHTMLFallback() {
  console.log('📄 Creating HTML fallback...');
  
  const contentDir = path.join(__dirname, '..', 'content', 'whitepaper', 'ebm-2025');
  const outputDir = path.join(__dirname, '..', 'public', 'whitepapers');
  const outputFile = path.join(outputDir, 'ebm-2025-v0.1.html');
  
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
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        h1 { color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
        h2 { color: #374151; margin-top: 30px; }
        h3 { color: #4b5563; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f5f5f5; }
        code { background-color: #f3f4f6; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
        pre { background-color: #f8f9fa; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .page-break { page-break-before: always; }
        @media print { body { margin: 0; } .page-break { page-break-before: always; } }
    </style>
</head>
<body>
    <h1>Evidence-Based Marketing Playbook</h1>
    <h2>Executive Preview v0.1</h2>
    <p><strong>Author:</strong> Kyo Harada<br>
    <strong>Date:</strong> September 2025<br>
    <strong>Subject:</strong> Marketing Science Research</p>
    
    <hr>
    
`;
  
  files.forEach((filename, index) => {
    const filePath = path.join(contentDir, filename);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Convert markdown to HTML (basic)
      content = content
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
        .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\\n\\n/g, '</p><p>')
        .replace(/\\n/g, '<br>');
      
      if (index > 0) {
        htmlContent += '<div class="page-break"></div>';
      }
      
      htmlContent += `<div>${content}</div>\n\n`;
    }
  });
  
  htmlContent += `
    <hr>
    <p style="text-align: center; color: #6b7280; font-size: 12px;">
        Visage AI Consulting • September 2025 • Executive Preview v0.1
    </p>
</body>
</html>`;
  
  fs.writeFileSync(outputFile, htmlContent);
  console.log(`✅ HTML fallback created: ${outputFile}`);
  console.log(`📄 You can print this HTML to PDF from your browser`);
}

// Run the script
if (require.main === module) {
  generateSimplePDF();
}

module.exports = generateSimplePDF;
