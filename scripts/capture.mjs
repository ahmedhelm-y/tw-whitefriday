// Store screenshots (1600×1200 JPEG, under 200 KB): each one shows a feature on a laptop and a phone, with no
// added text or logos, as Salla's listing rules ask. Also renders the template thumbnails (768×1195).
// Run `pnpm build`, serve the repo (node scripts/serve.mjs 5195), then:
//   OUT=<folder> node scripts/capture.mjs [market|thumbs|help]
// "help" writes one phone-width shot per section for the help page into <OUT>/help.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.HARNESS || "http://127.0.0.1:5195/harness/landing.html";
const OUT = process.env.OUT || ".";
const SHOWCASE = "../harness/showcase.json";

/** Opens the harness, optionally scrolls a section to the top and acts on the page, and returns a PNG. */
async function shoot(browser, { query, focus, act, mobile, viewport, landing = false, wait = 7000 }) {
  const page = await browser.newPage(viewport ? { viewport } : mobile ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}?clean=1&filler=0&layout=none${landing ? "" : "&landing=0"}&${query}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(wait);
  // Room under the last section so it can scroll to the top, painted in the page's own background
  await page.evaluate(() => {
    let el = document.querySelector(".wf-block"), bg = "";
    while (el && (!bg || bg === "rgba(0, 0, 0, 0)")) { bg = getComputedStyle(el).backgroundColor; el = el.parentElement; }
    if (bg) document.documentElement.style.background = document.body.style.background = bg;
    document.body.style.paddingBottom = "100vh";
  });
  if (focus) {
    await page.evaluate((id) => {
      const el = document.querySelector(`[data-wf-section="${id}"]`);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    }, focus);
    await page.waitForTimeout(1500);
  }
  if (act) await act(page);
  const png = await page.screenshot();
  await page.close();
  return png;
}

// Pick every option on the first deal card and add it: the side cart opens with the line in it
const addToCart = async (page) => {
  const card = page.locator(".wf-card").first();
  for (const select of await card.locator("select").all()) {
    const values = await select.locator("option").evaluateAll((opts) => opts.map((o) => o.value).filter(Boolean));
    if (values.length) await select.selectOption(values[0]);
  }
  await card.locator("button.wf-btn").last().click();
  await page.waitForTimeout(2500);
};
// "Reveal the code" uncovers the card the same way scratching does
const scratch = async (page) => {
  await page.locator(".wf-sc__ghost").first().click().catch(() => {});
  await page.waitForTimeout(1200);
};
const openDoor = async (page) => {
  const door = page.locator(".wf-ad__doors button:not([disabled])").first();
  if (await door.count()) await door.click().catch(() => {});
  await page.waitForTimeout(1200);
};
const pickGift = async (page) => {
  const gift = page.locator(".wf-cg__boxes button").first();
  if (await gift.count()) await gift.click().catch(() => {});
  await page.waitForTimeout(1500);
};

const show = (only, extra = "") => `template=${SHOWCASE}&only=sale-hero,${only}${extra}`;
const MARKET = [
  { file: "01-sale-live", tone: "#c8102e", desk: { query: "template=white-classic&only=sale-hero,deal-grid" }, phone: { query: "template=white-classic&only=sale-hero,deal-grid" } },
  { file: "02-before-the-sale", tone: "#c2185b", desk: { query: "template=coming-soon&only=sale-hero,coupon-game" }, phone: { query: "template=coming-soon&only=sale-hero,coupon-game" } },
  { file: "03-deal-grid", tone: "#c8102e", desk: { query: show("deal-grid"), focus: "deals" }, phone: { query: show("deal-grid"), focus: "deals" } },
  { file: "04-hour-deal", tone: "#b08d57", dark: true, desk: { query: "template=black-luxe&only=sale-hero,hour-deal", focus: "hour" }, phone: { query: "template=black-luxe&only=sale-hero,hour-deal", focus: "hour" } },
  { file: "05-sets-and-tiers", tone: "#c8102e", desk: { query: show("deal-bundles,tier-bar"), focus: "sets" }, phone: { query: show("tier-bar"), focus: "tiers" } },
  { file: "06-scratch-coupon", tone: "#c8102e", desk: { query: show("scratch-coupon"), focus: "mystery" }, phone: { query: show("scratch-coupon"), focus: "mystery", act: scratch } },
  { file: "07-mystery-box", tone: "#c8102e", desk: { query: show("mystery-box"), focus: "box" }, phone: { query: show("mystery-box"), focus: "box" } },
  { file: "08-doors-and-game", tone: "#c2185b", desk: { query: "template=coming-soon&only=sale-hero,advent-doors", focus: "doors", act: openDoor }, phone: { query: "template=coming-soon&only=sale-hero,coupon-game", focus: "game", act: pickGift } },
  { file: "09-side-cart", tone: "#c8102e", desk: { query: `${show("deal-grid")}&c.sale-hero.start=2026-01-01 00:00&c.sale-hero.end=2030-01-01 00:00`, focus: "deals", landing: true, act: addToCart },
    phone: { query: `${show("deal-grid")}&c.sale-hero.start=2026-01-01 00:00&c.sale-hero.end=2030-01-01 00:00`, focus: "deals", landing: true, act: addToCart } },
  { file: "10-trust-and-reviews", tone: "#c8102e", desk: { query: show("why-us,sale-reviews"), focus: "why" }, phone: { query: show("sale-reviews"), focus: "reviews" } },
  { file: "11-bank-offers-and-faq", tone: "#c8102e", desk: { query: show("bank-offers,sale-faq"), focus: "banks" }, phone: { query: show("sale-faq"), focus: "faq" } },
];

/** A laptop and a phone on a soft background in the template's color; no words, no logos. */
function mockup(desk, phone, tone, dark) {
  const bg = dark
    ? `radial-gradient(70% 80% at 85% 10%, color-mix(in srgb, ${tone} 35%, #14110d), transparent 70%), radial-gradient(60% 70% at 10% 95%, color-mix(in srgb, ${tone} 22%, #14110d), transparent 70%), #14110d`
    : `radial-gradient(70% 80% at 85% 10%, color-mix(in srgb, ${tone} 22%, #fff), transparent 70%), radial-gradient(60% 70% at 10% 95%, color-mix(in srgb, ${tone} 14%, #fff), transparent 70%), #f7f4f2`;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;width:1600px;height:1200px;overflow:hidden;background:${bg}}
.laptop{position:absolute;left:70px;top:150px;width:1130px}
.lid{background:#1b1b1d;border-radius:28px 28px 10px 10px;padding:22px 22px 26px;box-shadow:0 40px 80px -30px rgb(0 0 0/.45)}
.lid img{display:block;width:100%;border-radius:6px}
.deck{height:26px;margin:0 -60px;background:linear-gradient(#d9d9dd,#a9a9ae);border-radius:0 0 26px 26px;position:relative}
.deck::before{content:"";position:absolute;left:50%;top:0;width:180px;height:10px;margin-left:-90px;background:#8e8e93;border-radius:0 0 10px 10px}
.phone{position:absolute;right:90px;top:250px;width:330px;padding:14px;background:#111;border-radius:56px;box-shadow:0 40px 80px -24px rgb(0 0 0/.55),inset 0 0 0 2px #333}
.phone img{display:block;width:100%;border-radius:44px}
.phone::before{content:"";position:absolute;left:50%;top:26px;width:96px;height:28px;margin-left:-48px;background:#111;border-radius:20px;z-index:2}
</style></head><body>
<div class="laptop"><div class="lid"><img src="data:image/png;base64,${desk.toString("base64")}"></div><div class="deck"></div></div>
<div class="phone"><img src="data:image/png;base64,${phone.toString("base64")}"></div>
</body></html>`;
}

/** JPEG at the highest quality that stays under the byte limit. */
async function toJpeg(png, out, width, height, limit) {
  for (let quality = 88; quality >= 40; quality -= 4) {
    const buffer = await sharp(png).resize(width, height, { fit: "cover", position: "top" }).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (!limit || buffer.length <= limit || quality <= 40) {
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, buffer);
      console.log(`${out}  ${Math.round(buffer.length / 1024)} KB  q${quality}`);
      return;
    }
  }
}

const only = process.argv[2];
const pick = process.argv[3]?.split(",");
const browser = await chromium.launch();
if (!only || only === "market") {
  for (const spec of MARKET.filter((s) => !pick || pick.some((p) => s.file.startsWith(p)))) {
    const [desk, phone] = await Promise.all([shoot(browser, spec.desk), shoot(browser, { ...spec.phone, mobile: true })]);
    const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
    await page.setContent(mockup(desk, phone, spec.tone, spec.dark), { waitUntil: "load" });
    const png = await page.screenshot();
    await page.close();
    await toJpeg(png, path.join(OUT, "marketplace", `${spec.file}.jpg`), 1600, 1200, 200 * 1024);
  }
}
if (!only || only === "thumbs") {
  for (const name of ["white-classic", "black-luxe", "coming-soon"]) {
    const png = await shoot(browser, { query: `template=${name}`, viewport: { width: 768, height: 1195 }, wait: 8000 });
    await toJpeg(png, path.join(OUT, "templates-thumbs", `${name}.jpg`), 768, 1195, 0);
  }
}
if (only === "help") {
  const sections = [["sale-hero", ""], ["deal-grid", "deals"], ["hour-deal", "hour"], ["deal-bundles", "sets"], ["tier-bar", "tiers"], ["scratch-coupon", "mystery"],
    ["mystery-box", "box"], ["advent-doors", "doors"], ["coupon-game", "game"], ["bank-offers", "banks"], ["why-us", "why"], ["sale-reviews", "reviews"], ["sale-faq", "faq"],
    ["sticky-buy", ""]];
  // The sticky bar shows in the page, as in the editor, under the end of the reviews
  const showBar = async (page) => {
    await page.evaluate(() => document.querySelector(".wf-sb")?.scrollIntoView({ block: "end" }));
    await page.waitForTimeout(800);
  };
  for (const [name, focus] of sections) {
    const query = name === "sticky-buy" ? `${show("sale-reviews,sticky-buy")}&cards=1` : show(name === "sale-hero" ? "deal-grid" : name);
    const png = await shoot(browser, { query, focus: focus || undefined, mobile: true, act: name === "sticky-buy" ? showBar : undefined });
    const out = path.join(OUT, "help", `${name}.jpg`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(png).resize(390).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
    console.log(out);
  }
}
await browser.close();
