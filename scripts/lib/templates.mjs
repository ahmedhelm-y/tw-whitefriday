// Template content for the three White Friday templates. Products come from the preview store (1616473);
// the texts are written for this bundle. Sample codes never reach shoppers until the merchant turns on
// "codes_ready" in each section, after creating the same codes in Salla.
import { L, opt } from "./fields.mjs";

// Sample logo for the template previews; the merchant swaps it for their own, or clears it to use the store logo
const LOGO = "https://raw.githubusercontent.com/ahmedhelm-y/tw-whitefriday/store-assets/logo/";
const logo = { logo: `${LOGO}logo.png`, logo_dark: `${LOGO}logo-dark.png` };
const sel = (value, label) => [opt(value, label)];
const product = (id, name) => [{ label: name, value: id, key: String(id) }];
const many = (...list) => list.flatMap(([id, name]) => product(id, name));
const rows = (prefix, list) => list.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [`${prefix}.${k}`, v])));

export const ORDER = ["page-header", "sale-hero", "bank-offers", "deal-grid", "hour-deal", "tier-bar", "scratch-coupon", "deal-bundles",
  "mystery-box", "advent-doors", "coupon-game", "sale-faq", "page-footer", "sticky-buy"];

const DEALS = many([45289979, "فستان"], [530339837, "فستان"], [819393274, "فستان"], [1728697337, "فستان"], [1802683624, "فستان"], [1163912169, "فستان"],
  [1769567998, "بلوزة"], [2052836592, "بلوزة"], [1303857404, "جاكيت"], [1411443697, "تنورة"], [679390711, "تنورة"], [355251448, "بنطلون"]);
const TABS = rows("tabs", [
  { label: L("فساتين", "Dresses"), products: many([45289979, "فستان"], [530339837, "فستان"], [819393274, "فستان"], [1728697337, "فستان"], [1802683624, "فستان"], [1163912169, "فستان"]) },
  { label: L("بلوزات وجاكيتات", "Tops and jackets"), products: many([1769567998, "بلوزة"], [2052836592, "بلوزة"], [1303857404, "جاكيت"]) },
  { label: L("تنانير وبناطيل", "Skirts and trousers"), products: many([1411443697, "تنورة"], [679390711, "تنورة"], [355251448, "بنطلون"]) },
]);
const SLOTS = rows("slots", [
  { product: product(994547199, "فستان"), from_hour: 0, to_hour: 6, stock: 0 },
  { product: product(1627464171, "فستان"), from_hour: 6, to_hour: 12, stock: 0 },
  { product: product(388236010, "فستان"), from_hour: 12, to_hour: 18, stock: 0 },
  { product: product(1586597622, "تنورة"), from_hour: 18, to_hour: 24, stock: 0 },
]);
const TIERS = rows("tiers", [
  { amount: 300, reward: L("خصم 10%", "10% off") },
  { amount: 500, reward: L("خصم 15%", "15% off") },
  { amount: 800, reward: L("خصم 20% وشحن مجاني", "20% off and free shipping") },
]);
const MYSTERY = rows("codes", [
  { code: "WF10", label: L("خصم 10% على طلبك", "10% off your order"), weight: 70 },
  { code: "WF20", label: L("خصم 20% على طلبك", "20% off your order"), weight: 25 },
  { code: "WF40", label: L("خصم 40%! أنتِ محظوظة", "40% off! Lucky you"), weight: 5 },
]);
const PRIZES = rows("codes", [
  { code: "PLAY10", label: L("كسبتي خصم 10%", "You won 10% off"), weight: 80 },
  { code: "PLAY25", label: L("كسبتي خصم 25%", "You won 25% off"), weight: 20 },
]);
const DAYS = rows("days", [
  { title: L("شحن مجاني", "Free shipping"), desc: L("على كل الطلبات النهارده", "On every order today"), code: "DAY1" },
  { title: L("خصم 15% على الفساتين", "15% off dresses"), desc: L("", ""), code: "DAY2" },
  { title: L("هدية مع كل طلب", "A gift with every order"), desc: L("فوق 300 ريال", "Over 300 SAR"), code: "DAY3" },
  { title: L("خصم 20% على البلوزات", "20% off tops"), desc: L("", ""), code: "DAY4" },
  { title: L("اشتري 2 والتالتة مجاناً", "Buy 2, get the third free"), desc: L("", ""), code: "DAY5" },
  { title: L("خصم 25% لمدة 24 ساعة", "25% off for 24 hours"), desc: L("", ""), code: "DAY6" },
  { title: L("آخر يوم: خصم 30%", "Last day: 30% off"), desc: L("", ""), code: "DAY7" },
]);
const BANKS = rows("offers", [
  { logo: "", title: L("خصم إضافي 10% بالتقسيط", "Extra 10% with pay later"), desc: L("على الطلبات فوق 500 ريال", "On orders over 500 SAR"), code: "PAYLATER", ends: "" },
  { logo: "", title: L("خصم 15% لبطاقات مدى", "15% off with mada cards"), desc: L("حد أقصى 150 ريال", "Up to 150 SAR"), code: "MADA15", ends: "" },
]);
const FAQS = rows("faqs", [
  { q: L("هل الخصم على كل المنتجات؟", "Is everything on sale?"), a: L("الخصومات على المنتجات المعروضة في الصفحة، ونسبة الخصم مكتوبة على كل منتج.", "Discounts apply to the products on this page; each shows its own discount.") },
  { q: L("أقدر أجمع أكثر من كود؟", "Can I combine codes?"), a: L("كود واحد لكل طلب، ومستويات \"كل ما تزيدي تكسبي\" بتتطبق لوحدها.", "One code per order; the spend-more tiers apply on their own.") },
  { q: L("الشحن بياخد قد إيه؟", "How long is shipping?"), a: L("الطلبات بتتشحن خلال 1 لـ 3 أيام عمل، وممكن تتأخر شوية أيام العرض.", "Orders ship in 1 to 3 working days, a little longer during the sale.") },
  { q: L("أقدر أرجّع منتج من العرض؟", "Can I return a sale item?"), a: L("أيوه، خلال 7 أيام من الاستلام بنفس سياسة الاسترجاع.", "Yes, within 7 days of delivery under the usual policy.") },
]);
const BUNDLE = { products: many([1769567998, "بلوزة"], [1411443697, "تنورة"], [1303857404, "جاكيت"]), offer_text: L("اشتري 2 ووفّري 30%", "Buy 2, save 30%") };
const BOX = { product: product(854474996, "صندوق المفاجآت"), value_amount: 450,
  hints: rows("hints", [{ text: L("3 قطع مختارة من أفضل مبيعاتنا", "Three pieces from our bestsellers") }, { text: L("مقاسك اللي تختاريه", "In the size you choose") }, { text: L("ممكن يطلع فيه قطعة من الإصدار الجديد", "It might hold a new release") }]) };
const footer = (about) => ({ about, show_payments: true });

export const templates = [
  {
    name: "white-classic",
    id: "3461ff15-d406-440c-8c3b-9dd6c881d264",
    // الأزياء
    category_id: "814202285",
    is_default: true,
    order: ORDER,
    values: {
      "page-header": { ...logo, brand_color: "#c8102e", default_mode: sel("light", "فاتح"), sticky: true,
        nav: rows("nav", [{ label: L("العروض", "Deals"), target: "deals" }, { label: L("عرض الساعة", "Hour deal"), target: "hour" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      "sale-hero": { preview_phase: sel("live", "أثناء العرض"), start: "2026-11-20 00:00", end: "2026-11-30 23:59" },
      "bank-offers": { offers: BANKS },
      "deal-grid": { products: DEALS, tabs: TABS },
      "hour-deal": { slots: SLOTS },
      "tier-bar": { tiers: TIERS },
      "scratch-coupon": { codes: MYSTERY, discount_text: L("اكشطي واعرفي خصمك: من 10% لحد 40%", "Scratch to find your discount: 10% to 40%") },
      "deal-bundles": BUNDLE,
      "mystery-box": BOX,
      "advent-doors": { days: DAYS },
      "coupon-game": { codes: PRIZES, mode: sel("gifts", "اختاري هدية من 3") },
      "sale-faq": { faqs: FAQS },
      "page-footer": footer(L("أكبر تخفيضات السنة على كل المتجر", "The biggest sale of the year, store-wide")),
    },
  },
  {
    name: "black-luxe",
    id: "bb41157f-525c-486a-99b8-844ec03ea5eb",
    category_id: "814202285",
    is_default: false,
    order: ORDER,
    values: {
      "page-header": { ...logo, brand_color: "#b08d57", default_mode: sel("dark", "داكن"), sticky: true,
        nav: rows("nav", [{ label: L("العروض", "Deals"), target: "deals" }, { label: L("الصندوق", "The box"), target: "box" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      "sale-hero": { preview_phase: sel("live", "أثناء العرض"), start: "2026-11-20 00:00", end: "2026-11-30 23:59",
        live_badge: L("لفترة محدودة", "Limited time"), live_title: L("الجمعة البيضاء بلمسة فاخرة", "A luxe White Friday"), live_subtitle: L("قطع مختارة بخصومات لحد 60%", "Curated pieces up to 60% off") },
      "bank-offers": { offers: BANKS },
      "deal-grid": { products: DEALS, tabs: TABS, columns: 3 },
      "hour-deal": { slots: SLOTS },
      "tier-bar": { tiers: TIERS },
      "scratch-coupon": { codes: MYSTERY, discount_text: L("اكشطي واعرفي خصمك: من 10% لحد 40%", "Scratch to find your discount: 10% to 40%") },
      "deal-bundles": BUNDLE,
      "mystery-box": BOX,
      "advent-doors": { days: DAYS },
      "coupon-game": { codes: PRIZES, mode: sel("match", "طابقي الكروت") },
      "sale-faq": { faqs: FAQS },
      "page-footer": footer(L("قطع مختارة بخصومات الجمعة البيضاء", "Curated pieces at White Friday prices")),
    },
  },
  {
    name: "coming-soon",
    id: "10c10321-034a-4dac-8887-eb4746082b27",
    // مستحضرات التجميل والعناية
    category_id: "665151403",
    is_default: false,
    order: ["page-header", "sale-hero", "advent-doors", "coupon-game", "tier-bar", "deal-grid", "hour-deal", "scratch-coupon", "deal-bundles",
      "mystery-box", "bank-offers", "sale-faq", "page-footer", "sticky-buy"],
    values: {
      "page-header": { ...logo, brand_color: "#c2185b", default_mode: sel("light", "فاتح"), sticky: true,
        nav: rows("nav", [{ label: L("التقويم", "Calendar"), target: "doors" }, { label: L("العبي", "Play"), target: "game" }, { label: L("الأسئلة", "FAQ"), target: "faq" }]) },
      "sale-hero": { preview_phase: sel("before", "قبل العرض"), start: "2026-11-20 00:00", end: "2026-11-30 23:59", early_code: "VIP2026",
        before_title: L("استعدي للجمعة البيضاء", "Get ready for White Friday"), before_subtitle: L("سجّلي الموعد، والعبي من دلوقتي واكسبي كود تستخدميه أول ما يبدأ", "Save the date, and play now for a code to use on day one") },
      "advent-doors": { days: DAYS },
      "coupon-game": { codes: PRIZES, mode: sel("gifts", "اختاري هدية من 3") },
      "tier-bar": { tiers: TIERS },
      "deal-grid": { products: DEALS, tabs: TABS },
      "hour-deal": { slots: SLOTS },
      "scratch-coupon": { codes: MYSTERY, discount_text: L("اكشطي واعرفي خصمك: من 10% لحد 40%", "Scratch to find your discount: 10% to 40%") },
      "deal-bundles": BUNDLE,
      "mystery-box": BOX,
      "bank-offers": { offers: BANKS },
      "sale-faq": { faqs: FAQS },
      "page-footer": footer(L("عروض الجمعة البيضاء على الجمال والعناية", "White Friday offers on beauty and care")),
    },
  },
];
