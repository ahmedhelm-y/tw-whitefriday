// Template content for the three White Friday templates. Products come from the preview store (1616473);
// the texts are written for this bundle. Sample codes never reach shoppers until the merchant turns on
// "codes_ready" in each section, after creating the same codes in Salla.
import { L, opt } from "./fields.mjs";

const sel = (value, label) => [opt(value, label)];
const product = (id, name) => [{ label: name, value: id, key: String(id) }];
const many = (...list) => list.flatMap(([id, name]) => product(id, name));
const rows = (prefix, list) => list.map((row) => Object.fromEntries(Object.entries(row).map(([k, v]) => [`${prefix}.${k}`, v])));

// Each template has one goal and only the sections that serve it; the rest of the bundle stays available in the editor

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
const WHY = (worry) => ({ worry, items: rows("items", [
  { icon: "sicon-shipping-fast", title: L("توصيل سريع حتى في العرض", "Fast delivery, even in the sale"), text: L("نشحن خلال 1 لـ 3 أيام عمل، وتتابعي طلبك برسالة", "We ship in 1 to 3 working days, with tracking by message") },
  { icon: "sicon-rotate", title: L("استرجاع خلال 7 أيام", "7-day returns"), text: L("المقاس ما ضبط؟ رجّعيه أو بدّليه بنفس السياسة", "Wrong size? Return or swap it under the same policy") },
  { icon: "sicon-wallet", title: L("ادفعي بالطريقة اللي تريحك", "Pay the way you like"), text: L("مدى وفيزا وأبل باي، وقسّميها على 4 دفعات", "mada, Visa, Apple Pay, or split it in 4") },
  { icon: "sicon-gift", title: L("أسعار حقيقية", "Real prices"), text: L("السعر قبل الخصم هو سعرنا طول السنة، والخصم واضح على كل قطعة", "The before price is our price all year, and every discount is shown") },
]) });
const REVIEWS = rows("items", [
  { name: L("نورة", "Noura"), city: L("الرياض", "Riyadh"), rate: 5, text: L("اشتريت فستانين من عرض السنة اللي فاتت، المقاس مظبوط والتوصيل كان بعد يومين بس.", "I bought two dresses in last year's sale. The fit was right and it arrived in two days."), bought: L("فستان سهرة", "Evening dress"), verified: true },
  { name: L("ريم", "Reem"), city: L("جدة", "Jeddah"), rate: 5, text: L("الخصم كان حقيقي فعلاً، قارنت الأسعار قبل العرض بأسبوع.", "The discount was real. I checked the prices a week before the sale."), bought: L("جاكيت", "Jacket"), verified: true },
  { name: L("سارة", "Sarah"), city: L("الدمام", "Dammam"), rate: 4, text: L("بدّلت المقاس بدون أي تعقيد، وخدمة العملاء ردّت بسرعة.", "I swapped the size with no hassle, and support replied fast."), bought: L("تنورة", "Skirt"), verified: true },
]);
const BEAUTY_REVIEWS = rows("items", [
  { name: L("هيا", "Haya"), city: L("الرياض", "Riyadh"), rate: 5, text: L("كسبت كود من اللعبة قبل العرض واستخدمته أول يوم، وفّرت كتير.", "I won a code from the game before the sale and used it on day one. I saved a lot."), verified: true },
  { name: L("لمى", "Lama"), city: L("الخبر", "Khobar"), rate: 5, text: L("كل يوم كنت أفتح باب جديد، وعرض اليوم الخامس كان الأحلى.", "I opened a new door every day, and day five had the best offer."), verified: true },
  { name: L("دانة", "Dana"), city: L("مكة", "Makkah"), rate: 4, text: L("المنتجات أصلية والتغليف ممتاز، وصلت قبل الموعد.", "Genuine products and lovely packing. It arrived early."), verified: true },
]);
const cta = (text, target = "deals") => ({ cta_text: text, cta_target: target });

export const templates = [
  {
    // Goal: buy the deals
    name: "white-classic",
    id: "3461ff15-d406-440c-8c3b-9dd6c881d264",
    // الأزياء
    category_id: "814202285",
    is_default: true,
    order: ["sale-hero", "deal-grid", "deal-bundles", "tier-bar", "why-us", "sale-reviews", "sale-faq"],
    values: {
      "sale-hero": { preview_phase: sel("live", "أثناء العرض"), start: "2026-11-20 00:00", end: "2026-11-30 23:59", brand_color: "#c8102e", default_mode: sel("light", "فاتح") },
      "deal-grid": { products: DEALS, tabs: TABS },
      "deal-bundles": BUNDLE,
      "tier-bar": { tiers: TIERS },
      "why-us": { ...WHY(L("خايفة المقاس ما يضبط أو الطلب يتأخر في زحمة العروض؟", "Worried about the fit, or a late order in the sale rush?")), ...cta(L("تسوّقي العروض", "Shop the deals")) },
      "sale-reviews": { items: REVIEWS, total_count: 1240, ...cta(L("تسوّقي العروض", "Shop the deals")) },
      "sale-faq": { faqs: FAQS },
    },
  },
  {
    // Goal: grab the deal of the hour before it changes
    name: "black-luxe",
    id: "bb41157f-525c-486a-99b8-844ec03ea5eb",
    category_id: "814202285",
    is_default: false,
    order: ["sale-hero", "hour-deal", "deal-grid", "mystery-box", "why-us", "sale-reviews", "sale-faq"],
    values: {
      "sale-hero": { preview_phase: sel("live", "أثناء العرض"), start: "2026-11-20 00:00", end: "2026-11-30 23:59", brand_color: "#b08d57", default_mode: sel("dark", "داكن"),
        offers_target: "hour", live_badge: L("لفترة محدودة", "Limited time"), live_title: L("الجمعة البيضاء بلمسة فاخرة", "A luxe White Friday"),
        live_subtitle: L("كل كام ساعة قطعة فاخرة بخصم أكبر. الحقيها قبل ما تتغير", "Every few hours, a luxe piece at a bigger discount. Grab it before it changes"), live_button: L("شوفي عرض الساعة", "See the hour deal") },
      "hour-deal": { slots: SLOTS },
      "deal-grid": { products: DEALS, tabs: TABS, columns: 3, title: L("قطع مختارة بخصم", "Curated pieces on sale") },
      "mystery-box": BOX,
      "why-us": { ...WHY(L("القطع الفاخرة لازم توصل مظبوطة. عشان كده:", "Luxe pieces should arrive just right. That's why:")), ...cta(L("شوفي عرض الساعة", "See the hour deal"), "hour") },
      "sale-reviews": { items: REVIEWS, total_count: 860, ...cta(L("شوفي عرض الساعة", "See the hour deal"), "hour") },
      "sale-faq": { faqs: FAQS },
    },
  },
  {
    // Goal: win a code before the sale and come back on day one
    name: "coming-soon",
    id: "10c10321-034a-4dac-8887-eb4746082b27",
    // مستحضرات التجميل والعناية
    category_id: "665151403",
    is_default: false,
    order: ["sale-hero", "coupon-game", "advent-doors", "why-us", "sale-reviews", "sale-faq"],
    values: {
      "sale-hero": { preview_phase: sel("before", "قبل العرض"), start: "2026-11-20 00:00", end: "2026-11-30 23:59", brand_color: "#c2185b", default_mode: sel("light", "فاتح"),
        before_title: L("استعدي للجمعة البيضاء", "Get ready for White Friday"), before_subtitle: L("العبي من دلوقتي واكسبي كود تستخدميه أول ما يبدأ العرض", "Play now and win a code to use the moment the sale starts"),
        before_button: L("العبي واكسبي كودك", "Play for your code"), before_target: "game" },
      "coupon-game": { codes: PRIZES, mode: sel("gifts", "اختاري هدية من 3") },
      "advent-doors": { days: DAYS },
      "why-us": { ...WHY(L("", "")), ...cta(L("العبي واكسبي كودك", "Play for your code"), "game") },
      "sale-reviews": { items: BEAUTY_REVIEWS, total_count: 530, ...cta(L("العبي واكسبي كودك", "Play for your code"), "game") },
      "sale-faq": { faqs: FAQS },
    },
  },
];

// Every section filled in, for the harness, the store screenshots and the help page. Not a Salla template.
const classic = templates[0].values;
export const showcase = {
  name: "showcase",
  order: ["sale-hero", "deal-grid", "hour-deal", "deal-bundles", "tier-bar", "scratch-coupon", "mystery-box", "advent-doors", "coupon-game",
    "bank-offers", "why-us", "sale-reviews", "sale-faq", "sticky-buy"],
  values: {
    ...classic,
    "hour-deal": { slots: SLOTS },
    "scratch-coupon": { codes: MYSTERY, discount_text: L("اكشطي واعرفي خصمك: من 10% لحد 40%", "Scratch to find your discount: 10% to 40%") },
    "mystery-box": BOX,
    "advent-doors": { days: DAYS },
    "coupon-game": { codes: PRIZES, mode: sel("gifts", "اختاري هدية من 3") },
    "bank-offers": { offers: BANKS },
  },
};
