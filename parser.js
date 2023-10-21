"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer");
var fs = require("fs");
var path = require("path");
var pdf_lib_1 = require("pdf-lib");
var cliProgress = require("cli-progress");
function generatePDFForWebsite(url, outputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, links, pdfDoc, pdfPath, pdfBytes_1, progressBar, i, link, mainContent, pdfBytes_2, pdfDocToAdd, pagesToAdd, error_1, pdfBytes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(url, { waitUntil: 'networkidle0' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.$$eval('a', function (as) { return as.map(function (a) { return a.href; }); })];
                case 4:
                    links = _a.sent();
                    // Create the output directory if it does not exist
                    if (!fs.existsSync(outputPath)) {
                        fs.mkdirSync(outputPath, { recursive: true });
                    }
                    pdfPath = path.join(outputPath, 'output.pdf');
                    if (!fs.existsSync(pdfPath)) return [3 /*break*/, 6];
                    pdfBytes_1 = fs.readFileSync(pdfPath);
                    return [4 /*yield*/, pdf_lib_1.PDFDocument.load(pdfBytes_1)];
                case 5:
                    pdfDoc = _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, pdf_lib_1.PDFDocument.create()];
                case 7:
                    pdfDoc = _a.sent();
                    _a.label = 8;
                case 8:
                    progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
                    progressBar.start(links.length, 0);
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < links.length)) return [3 /*break*/, 19];
                    link = links[i];
                    _a.label = 10;
                case 10:
                    _a.trys.push([10, 17, , 18]);
                    return [4 /*yield*/, page.goto(link, { waitUntil: 'networkidle0' })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, page.$eval('main.content#quarto-document-content', function (main) { return main.innerHTML; })];
                case 12:
                    mainContent = _a.sent();
                    return [4 /*yield*/, page.setContent(mainContent)];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, page.pdf({ format: 'A4' })];
                case 14:
                    pdfBytes_2 = _a.sent();
                    return [4 /*yield*/, pdf_lib_1.PDFDocument.load(pdfBytes_2)];
                case 15:
                    pdfDocToAdd = _a.sent();
                    return [4 /*yield*/, pdfDoc.copyPages(pdfDocToAdd, pdfDocToAdd.getPageIndices())];
                case 16:
                    pagesToAdd = _a.sent();
                    pagesToAdd.forEach(function (page) { return pdfDoc.addPage(page); });
                    progressBar.update(i + 1);
                    return [3 /*break*/, 18];
                case 17:
                    error_1 = _a.sent();
                    console.error("\nError adding page for link ".concat(link, ": ").concat(error_1));
                    return [3 /*break*/, 18];
                case 18:
                    i++;
                    return [3 /*break*/, 9];
                case 19: return [4 /*yield*/, pdfDoc.save()];
                case 20:
                    pdfBytes = _a.sent();
                    fs.writeFileSync(pdfPath, pdfBytes);
                    progressBar.stop();
                    return [4 /*yield*/, browser.close()];
                case 21:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
generatePDFForWebsite('https://docs.modular.com/mojo/', 'output_pdf');
