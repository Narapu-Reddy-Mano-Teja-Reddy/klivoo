const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.createContext({
    viewport: { width: 375, height: 812 }
  });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3001/#waitlist', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'waitlist-mobile.png' });
  
  console.log('Screenshot saved: waitlist-mobile.png');
  await browser.close();
})();
