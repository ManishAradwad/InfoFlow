import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument } from 'pdf-lib';
import * as cliProgress from 'cli-progress';

async function generatePDFForWebsite(url: string, outputPath: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Get all the links on the page
  const links = await page.$$eval('a', (as) => as.map((a) => a.href));

  // Create the output directory if it does not exist
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // Get the existing PDF file, or create a new one if it does not exist
  let pdfDoc: PDFDocument;
  const pdfPath = path.join(outputPath, 'output.pdf');
  if (fs.existsSync(pdfPath)) {
    const pdfBytes = fs.readFileSync(pdfPath);
    pdfDoc = await PDFDocument.load(pdfBytes);
  } else {
    pdfDoc = await PDFDocument.create();
  }

  // Create a progress bar
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(links.length, 0);

  // Add pages to the PDF file for each valid link
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    try {
      await page.goto(link, { waitUntil: 'networkidle0' });
      const mainContent = await page.$eval('main.content#quarto-document-content', (main) => main.innerHTML);
      await page.setContent(mainContent);
      const pdfBytes = await page.pdf({ format: 'A4' });
      const pdfDocToAdd = await PDFDocument.load(pdfBytes);
      const pagesToAdd = await pdfDoc.copyPages(pdfDocToAdd, pdfDocToAdd.getPageIndices());
      pagesToAdd.forEach((page) => pdfDoc.addPage(page));
      progressBar.update(i + 1);
    } catch (error) {
      console.error(`\nError adding page for link ${link}: ${error}`);
    }
  }

  // Save the updated PDF file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfBytes);

  progressBar.stop();
  await browser.close();
}

generatePDFForWebsite('https://docs.modular.com/mojo/', 'output_pdf');