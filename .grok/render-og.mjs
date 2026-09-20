import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const htmlPath = resolve("/workspace/.grok/og-card.html");
const logoPath = resolve("/workspace/.grok/wordmark-crop.png");
const outPath = resolve("/workspace/.grok/og-card-raw.png");

const logoB64 = readFileSync(logoPath).toString("base64");
const html = readFileSync(htmlPath, "utf8").replace(
  '<img class="wordmark" id="wordmark" alt="HiredFrex" />',
  `<img class="wordmark" id="wordmark" alt="HiredFrex" src="data:image/png;base64,${logoB64}" />`,
);

const browser = await chromium.launch({ args: ["--font-render-hinting=none"] });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.setContent(html, { waitUntil: "networkidle", timeout: 30000 });
await page.evaluate(async () => {
  if (document.fonts?.ready) await document.fonts.ready;
});
await page.waitForTimeout(400);
await page.screenshot({ path: outPath, type: "png", omitBackground: false });
await browser.close();
writeFileSync("/workspace/.grok/og-render-ok", "ok\n");
console.log("wrote", outPath);
