import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

(async () => {
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });

  const page = await browser.newPage();
  await page.goto('https://docs.modular.com/mojo/', {waitUntil: 'networkidle0'});
  const pdf = await page.pdf({ format: 'A4' });

  await browser.close();
})();
