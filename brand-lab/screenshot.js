const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Starting screenshot script...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to a wide screen width to capture layout correctly
  await page.setViewportSize({ width: 1600, height: 2000 });
  
  const filePath = path.join(__dirname, 'social-banners.html');
  console.log(`Loading file: file://${filePath}`);
  await page.goto(`file://${filePath}`);
  
  // Wait for Google Fonts to load and render
  await page.waitForTimeout(2000);
  
  // Ensure previews directory exists
  const previewsDir = path.join(__dirname, 'previews');
  if (!fs.existsSync(previewsDir)) {
    fs.mkdirSync(previewsDir, { recursive: true });
  }
  
  const outputPath = path.join(previewsDir, 'social-banners-preview.png');
  await page.screenshot({ path: outputPath, fullPage: true });
  console.log(`Success! Screenshot saved to: ${outputPath}`);
  
  await browser.close();
})().catch(err => {
  console.error('Error running screenshot:', err);
  process.exit(1);
});
