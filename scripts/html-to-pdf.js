#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple HTML to PDF conversion using browser print
function convertHTMLToPDF() {
  console.log('🚀 Converting HTML to PDF...');
  
  const htmlFile = path.join(__dirname, '..', 'public', 'whitepapers', 'ebm-2025-v0.1.html');
  const pdfFile = path.join(__dirname, '..', 'public', 'whitepapers', 'ebm-2025-v0.1.pdf');
  
  if (!fs.existsSync(htmlFile)) {
    console.error('❌ HTML file not found. Run "npm run generate-pdf" first.');
    process.exit(1);
  }
  
  // Read the HTML content
  let htmlContent = fs.readFileSync(htmlFile, 'utf8');
  
  // Add JavaScript to automatically print and close
  const printScript = `
    <script>
      window.onload = function() {
        setTimeout(function() {
          window.print();
          setTimeout(function() {
            window.close();
          }, 1000);
        }, 1000);
      };
    </script>
  `;
  
  // Insert the script before closing body tag
  htmlContent = htmlContent.replace('</body>', printScript + '</body>');
  
  // Write the modified HTML
  fs.writeFileSync(htmlFile, htmlContent);
  
  console.log('✅ HTML file updated with print script');
  console.log('📄 Open the HTML file in your browser to generate PDF');
  console.log(`🌐 File: ${htmlFile}`);
  console.log('💡 The page will automatically print when loaded');
  console.log('📝 Save as PDF when the print dialog appears');
}

// Run the script
if (require.main === module) {
  convertHTMLToPDF();
}

module.exports = convertHTMLToPDF;
