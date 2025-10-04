#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');
  
  // Check if puppeteer is available
  try {
    require.resolve('puppeteer');
  } catch (e) {
    console.error('❌ Puppeteer not found. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install puppeteer --save-dev', { stdio: 'inherit' });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set viewport for A4
    await page.setViewport({ width: 794, height: 1123 }); // A4 at 96 DPI
    
    // Navigate to the print page
    const printUrl = 'http://localhost:3000/en/whitepaper/ebm-2025/print';
    console.log(`📄 Loading print page: ${printUrl}`);
    
    await page.goto(printUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // Wait for content to load
    await page.waitForSelector('.print-page', { timeout: 10000 });
    
    // Generate PDF
    const pdfPath = path.join(process.cwd(), 'public', 'whitepapers', 'ebm-2025-v0.1.pdf');
    
    // Ensure directory exists
    const pdfDir = path.dirname(pdfPath);
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    console.log('📝 Generating PDF...');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '14mm',
        right: '14mm',
        bottom: '14mm',
        left: '14mm'
      },
      printBackground: true,
      preferCSSPageSize: true
    });

    console.log(`✅ PDF generated successfully: ${pdfPath}`);
    
    // Check file size
    const stats = fs.statSync(pdfPath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error('❌ Error generating PDF:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Check if we're running this script directly
if (require.main === module) {
  generatePDF().catch(console.error);
}

module.exports = generatePDF;
