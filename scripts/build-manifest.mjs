// Source of truth for the section schemas in twilight-bundle.json and the templates/*.json files.
// Run from the repo root: node scripts/build-manifest.mjs
import fs from "node:fs";
import { templates } from "./lib/templates.mjs";
import { L, area, checks, collection, color, colorFields, drop, icon, image, line, num, products, sectionBase, sw, text, url, datetime } from "./lib/fields.mjs";

const ROOT = process.cwd();

const components = [
  {
    title: "رأس الصفحة",
    icon: "sicon-store",
    name: "page-header",
    key: "860672c9-dd03-4677-8d26-f59e529307a4",
    image: "",
    props: { "min-height": "76px" },
    fields: [
      image("logo", "الشعار", "", "اتركه فارغاً لاستخدام شعار متجرك"),
      image("logo_dark", "شعار الوضع الداكن", "", "يظهر في الوضع الداكن وفوق الصور في الرأس الشفاف، وبدونه يظهر شعارك باللون الأبيض"),
      num("logo_height", "ارتفاع الشعار (px)", 56, 24, 140),
      drop("align", "مكان الشعار", [["center", "الوسط"], ["start", "البداية"]], "center"),
      line("hd-line-1"),
      sw("sticky", "تثبيت الرأس أعلى الصفحة عند التمرير", true),
      sw("transparent", "رأس شفاف فوق القسم الأول", false, "يظهر فوق صورة القسم الأول، وتظهر خلفيته عند التمرير"),
      sw("show_shadow", "خط سفلي للرأس", true),
      line("hd-line-2", "روابط أقسام الصفحة"),
      collection("nav", "رابط", [
        text("label", "النص", L("", "")),
        text("target", "معرّف القسم", "", { multilang: false, desc: "نفس المعرّف المكتوب في إعدادات القسم" }),
      ], [], 0, 6),
      line("hd-line-3", "زر الشراء"),
      sw("show_buy", "إظهار زر الشراء", true),
      text("buy_text", "نص الزر", L("اشتري الآن", "Buy now")),
      line("hd-line-4", "ألوان الصفحة"),
      color("brand_color", "لون البراند", "", "لون واحد تُبنى منه ألوان الصفحة كلها في الوضع الفاتح والداكن. اتركه فارغاً لاستخدام ألوان متجرك"),
      sw("show_mode_toggle", "زر التبديل بين الوضع الفاتح والداكن", true, "يتذكر اختيار العميل"),
      drop("default_mode", "الوضع الافتراضي للصفحة", [["light", "فاتح"], ["dark", "داكن"], ["system", "حسب جهاز الزائر"]], "light"),
      // Here the colors adjust the whole page palette, so the header has no scheme of its own
      ...colorFields({ scheme: false }),
    ],
  },
  {
    title: "العرض: قبل وأثناء وبعد",
    icon: "sicon-time",
    name: "sale-hero",
    key: "9cee4b57-38b9-4e2d-9971-dc2c19147f91",
    image: "",
    props: { "min-height": "520px" },
    fields: [
      line("sh-line-0", "مواعيد العرض"),
      datetime("start", "يبدأ في", "2026-11-20 00:00", "بتوقيت متجرك. قبله تظهر الصفحة بحالة \"قريباً\" والعداد"),
      datetime("end", "ينتهي في", "2026-11-30 23:59", "بعده تظهر حالة \"انتهى العرض\""),
      num("tz_offset", "فرق التوقيت عن UTC", 3, -12, 14, "السعودية +3"),
      drop("preview_phase", "الحالة اللي تشوفها في المحرر", [["auto", "حسب التاريخ"], ["before", "قبل العرض"], ["live", "أثناء العرض"], ["ended", "بعد العرض"]], "auto", "العملاء دايماً بيشوفوا الحالة الحقيقية"),
      image("image", "صورة الخلفية", "", "اتركها فارغة لخلفية بلون الصفحة"),
      num("overlay", "قوة الطبقة الداكنة فوق الصورة (%)", 45, 0, 85),
      line("sh-line-1", "قبل العرض"),
      text("before_badge", "شارة", L("قريباً", "Coming soon")),
      text("before_title", "العنوان", L("الجمعة البيضاء جاية", "White Friday is coming"), { max: 80 }),
      area("before_subtitle", "الوصف", L("أكبر تخفيضات السنة. سجّلي الموعد عشان ما يفوتك شيء", "The biggest sale of the year. Save the date so you never miss it")),
      text("before_label", "نص فوق العداد", L("يبدأ العرض بعد", "Starts in")),
      sw("show_reminder", "زرار \"ذكّريني بالموعد\" (يضيف الموعد لتقويم الجوال)", true),
      url("channel_url", "لينك قناة التنبيهات (واتساب، سناب، تيليجرام...)", ""),
      text("channel_label", "نص زرار القناة", L("تابعينا عشان أول ما يبدأ", "Follow us for the start")),
      line("sh-line-2", "الدخول المبكر"),
      text("early_code", "كود الدخول المبكر", "", { multilang: false, desc: "اكتبه لو عاوز عملاءك المميزين يشوفوا العروض قبل البداية. ابعته لهم انت" }),
      text("early_label", "النص داخل خانة الكود", L("عندك كود الدخول المبكر؟", "Have an early access code?")),
      line("sh-line-3", "أثناء العرض"),
      text("live_badge", "شارة", L("شغال دلوقتي", "Live now")),
      text("live_title", "العنوان", L("الجمعة البيضاء بدأت", "White Friday is on"), { max: 80 }),
      area("live_subtitle", "الوصف", L("خصومات لحد 70% على كل المتجر", "Up to 70% off the whole store")),
      text("live_label", "نص فوق العداد", L("ينتهي العرض بعد", "Ends in")),
      text("live_button", "نص الزرار", L("تسوّقي العروض", "Shop the deals")),
      text("offers_target", "معرّف القسم اللي الزرار ينزل له", "deals", { multilang: false }),
      line("sh-line-4", "بعد العرض"),
      text("ended_title", "العنوان", L("انتهت الجمعة البيضاء", "White Friday has ended"), { max: 80 }),
      area("ended_subtitle", "الوصف", L("شكراً إنك كنتي معانا. تقدري تتسوّقي باقي المنتجات من المتجر", "Thanks for joining us. You can still shop the store")),
      text("ended_button", "نص الزرار", L("تسوّقي من المتجر", "Shop the store")),
      url("ended_url", "لينك الزرار", "", "فارغ يروح للصفحة الرئيسية للمتجر"),
      ...colorFields(),
    ],
  },
  {
    title: "شبكة العروض",
    icon: "sicon-layout-grid",
    name: "deal-grid",
    key: "a0309da5-a779-4c1d-936c-cda4aae3b0d9",
    image: "",
    props: { "min-height": "480px" },
    fields: [
      ...sectionBase(L("عروض الجمعة البيضاء", "White Friday deals"), L("اختاري القسم ونسبة الخصم", "Pick a category and a discount"), "deals"),
      products("products", "منتجات العروض", "حتى 24 منتج. نسبة الخصم بتتحسب من السعر قبل وبعد", true),
      collection("tabs", "قسم", [text("label", "اسم القسم", L("", "")), products("products", "منتجات القسم", "", true)], [], 0, 6),
      text("discount_filters", "أزرار الخصم", "30,50", { multilang: false, desc: "نسب مفصولة بفاصلة، مثل 30,50. فارغ يخفيها" }),
      text("card_tag", "شارة على كل كارت", L("عرض لمدة محدودة", "Limited time")),
      num("columns", "عدد الأعمدة على الكمبيوتر", 4, 2, 5),
      text("buy_text", "نص الزرار", L("أضيفي للسلة", "Add to cart")),
      ...colorFields(),
    ],
  },
  {
    title: "عرض الساعة",
    icon: "sicon-stopwatch",
    name: "hour-deal",
    key: "c166d260-9b39-440d-b88f-2aab8f61c2eb",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("عرض الساعة", "Deal of the hour"), L("صفقة جديدة كل كام ساعة. الحقيها قبل ما تتغير", "A new deal every few hours. Grab it before it changes"), "hour"),
      collection("slots", "عرض", [
        products("product", "المنتج", ""),
        num("from_hour", "من الساعة (0 – 23)", 0, 0, 23),
        num("to_hour", "إلى الساعة (1 – 24)", 3, 1, 24),
        num("stock", "عدد القطع في العرض (اختياري)", 0, 0, 9999, "يظهر شريط \"باقي X من Y\" لو المنتج بيعرض الكمية الحقيقية"),
      ], [], 0, 12),
      line("hd-line-1", "العروض بتتكرر كل يوم من أيام العرض بنفس المواعيد"),
      num("tz_offset", "فرق التوقيت عن UTC", 3, -12, 14),
      text("live_label", "شارة العرض", L("عرض الساعة شغال دلوقتي", "Live hour deal")),
      text("buy_text", "نص الزرار", L("الحقي العرض", "Grab the deal")),
      ...colorFields(),
    ],
  },
  {
    title: "اكشطي عرضك المفاجئ",
    icon: "sicon-discount-coupon",
    name: "scratch-coupon",
    key: "9de9792d-6c48-46da-89f6-ff06b04bfdf1",
    image: "",
    props: { "min-height": "320px" },
    fields: [
      ...sectionBase(L("عرضك المفاجئ", "Your mystery offer"), L("اكشطي الكارت واكتشفي خصمك", "Scratch the card to find your discount"), "mystery"),
      collection("codes", "كود", [
        text("code", "الكود", "", { multilang: false, desc: "أنشئه أولاً من التسويق ← كوبونات التخفيض" }),
        text("label", "نص العرض بعد الكشط", L("", ""), { desc: "مثل خصم 25% على كل الطلب" }),
        num("weight", "فرصة الظهور", 10, 1, 100, "رقم نسبي: كود بـ 70 بيطلع أكتر 7 مرات من كود بـ 10"),
      ], [], 0, 6),
      text("code", "كود واحد (لو مفيش أكواد متعددة)", "", { multilang: false, desc: "أنشئ الكوبون أولاً من التسويق > كوبونات التخفيض في سلة" }),
      text("discount_text", "نص العرض", L("خصم 15% على طلبك", "15% off your order")),
      text("hint", "نص فوق الغطاء", L("اكشطي هنا لتكشفي الكود", "Scratch here to reveal the code")),
      color("cover_color", "لون الغطاء", "", "اتركه فارغاً لاستخدام لون الأزرار"),
      image("cover_image", "صورة الغطاء (اختياري)", ""),
      num("reveal_percent", "نسبة الكشط لإظهار الكود (%)", 50, 30, 80),
      datetime("expires", "ينتهي في (اختياري)", "", "بعد هذا الوقت يختفي القسم من الصفحة"),
      text("buy_text", "نص الزر", L("اشتري الآن", "Buy now")),
      sw("codes_ready", "عملت الأكواد دي في سلة (التسويق ← كوبونات التخفيض)", false, "الأكواد بتظهر للعملاء بس بعد ما تفعّل ده، عشان محدش يشوف كود مش شغال"),
      ...colorFields(),
    ],
  },
  {
    title: "صندوق المفاجآت",
    icon: "sicon-gift",
    name: "mystery-box",
    key: "4f85c0fd-8ddd-4347-9c8b-5d23163330cd",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("صندوق المفاجآت", "The mystery box"), L("ادفعي أقل، وخدي قيمة أكبر", "Pay less, get more"), "box"),
      products("product", "منتج الصندوق", "اعمل الصندوق منتج عادي في سلة بسعره"),
      num("value_amount", "قيمة اللي جوه الصندوق", 0, 0, 100000, "تظهر \"قيمته أكثر من\" ونسبة التوفير. اكتب القيمة الحقيقية"),
      image("image", "صورة الصندوق", "", "فارغ تظهر علامة استفهام"),
      collection("hints", "تلميح", [text("text", "التلميح", L("", ""))], [], 0, 5),
      collection("teasers", "صورة مموّهة", [image("image", "صورة", "")], [], 0, 4),
      num("stock_threshold", "اعرض \"باقي X صناديق\" لما الكمية تقل عن", 10, 1, 999),
      text("buy_text", "نص الزرار", L("اطلبي الصندوق", "Get the box")),
      ...colorFields(),
    ],
  },
  {
    title: "تقويم الأبواب",
    icon: "sicon-calendar-date",
    name: "advent-doors",
    key: "46ba19d4-18ff-48a1-ac8c-bea35e986d61",
    image: "",
    props: { "min-height": "360px" },
    fields: [
      ...sectionBase(L("كل يوم باب جديد", "A new door every day"), L("افتحي باب النهارده واكتشفي عرضه", "Open today's door to find its offer"), "doors"),
      line("ad-line-1", "الباب الأول بيتفتح أول يوم في العرض (من قسم العرض)، والتاني تاني يوم، وهكذا"),
      collection("days", "يوم", [
        text("title", "العرض", L("", "")),
        area("desc", "التفاصيل", L("", "")),
        text("code", "الكود", "", { multilang: false }),
      ], [], 0, 14),
      datetime("start", "أول يوم (لو مفيش قسم العرض)", ""),
      num("tz_offset", "فرق التوقيت عن UTC", 3, -12, 14),
      sw("codes_ready", "عملت الأكواد دي في سلة (التسويق ← كوبونات التخفيض)", false, "الأكواد بتظهر للعملاء بس بعد ما تفعّل ده، عشان محدش يشوف كود مش شغال"),
      ...colorFields(),
    ],
  },
  {
    title: "العبي واكسبي",
    icon: "sicon-game-controller-alt",
    name: "coupon-game",
    key: "f43db6bf-bf5d-4ec8-8631-9594371a8be5",
    image: "",
    props: { "min-height": "360px" },
    fields: [
      ...sectionBase(L("العبي واكسبي كود خصم", "Play and win a code"), L("", ""), "game"),
      drop("mode", "اللعبة", [["gifts", "اختاري هدية من 3"], ["match", "طابقي الكروت"]], "gifts"),
      text("hint", "نص فوق اللعبة", L("", "")),
      collection("codes", "جائزة", [
        text("code", "الكود", "", { multilang: false }),
        text("label", "نص الجائزة", L("", "")),
        num("weight", "فرصة الظهور", 10, 1, 100),
      ], [], 0, 6),
      sw("codes_ready", "عملت الأكواد دي في سلة (التسويق ← كوبونات التخفيض)", false, "الأكواد بتظهر للعملاء بس بعد ما تفعّل ده، عشان محدش يشوف كود مش شغال"),
      ...colorFields(),
    ],
  },
  {
    title: "كل ما تزيدي تكسبي أكتر",
    icon: "sicon-trend-up",
    name: "tier-bar",
    key: "86af27d3-9f11-417d-b47a-9f9905d0dcc1",
    image: "",
    props: { "min-height": "220px" },
    fields: [
      ...sectionBase(L("كل ما تزيدي تكسبي أكتر", "Spend more, save more"), L("", ""), "tiers"),
      collection("tiers", "مستوى", [num("amount", "لما الطلب يوصل (ريال)", 0, 0, 100000), text("reward", "المكافأة", L("", ""))], [], 0, 4),
      line("tb-line-1", "الخصومات نفسها فعّلها من العروض الخاصة في سلة، والقسم بيعرضها ويقيس السلة"),
      ...colorFields(),
    ],
  },
  {
    title: "باقات العرض",
    icon: "sicon-gift",
    name: "deal-bundles",
    key: "832570b9-06c8-4bf7-a80d-571cd737eb9e",
    image: "",
    props: { "min-height": "420px" },
    fields: [
      ...sectionBase(L("باقات الجمعة البيضاء", "White Friday sets"), L("اختاري قطعك وأضيفيها للسلة مرة واحدة", "Pick your pieces and add them in one go"), "sets"),
      products("products", "منتجات الباقة", "حتى 6 منتجات، والعميلة تختار منها", true),
      sw("preselect", "كل المنتجات مختارة من البداية", true),
      text("offer_text", "نص العرض", L("", ""), { desc: "مثل خصم 10% عند شراء 3. فعّل الخصم نفسه من العروض الخاصة في سلة" }),
      text("buy_text", "نص الزر", L("أضيفي الباقة للسلة", "Add the set")),
      ...colorFields(),
    ],
  },
  {
    title: "خصومات البنوك والدفع",
    icon: "sicon-credit-card",
    name: "bank-offers",
    key: "557b0306-f500-4571-bfeb-57ecb67300a3",
    image: "",
    props: { "min-height": "160px" },
    fields: [
      ...sectionBase(L("خصومات إضافية", "Extra savings"), L("", ""), "banks"),
      collection("offers", "عرض", [
        image("logo", "الشعار", ""),
        text("title", "العرض", L("", "")),
        text("desc", "التفاصيل", L("", "")),
        text("code", "الكود", "", { multilang: false }),
        datetime("ends", "ينتهي في (اختياري)", ""),
      ], [], 0, 6),
      sw("codes_ready", "عملت الأكواد دي في سلة (التسويق ← كوبونات التخفيض)", false, "الأكواد بتظهر للعملاء بس بعد ما تفعّل ده، عشان محدش يشوف كود مش شغال"),
      ...colorFields(),
    ],
  },
  {
    title: "أسئلة العرض",
    icon: "sicon-help",
    name: "sale-faq",
    key: "880fda50-1c31-42d9-a92d-2cfb0ab163d2",
    image: "",
    props: { "min-height": "240px" },
    fields: [
      ...sectionBase(L("أسئلة الجمعة البيضاء", "White Friday questions"), L("", ""), "faq"),
      sw("auto_date", "سؤال \"امتى يبدأ؟\" بمواعيد العرض تلقائياً", true),
      collection("faqs", "سؤال", [text("q", "السؤال", L("", "")), area("a", "الإجابة", L("", ""))], [], 0, 10),
      ...colorFields(),
    ],
  },
  {
    title: "تذييل الصفحة",
    icon: "sicon-window-layout",
    name: "page-footer",
    key: "e022438d-d96c-4ac7-902f-562117c1acca",
    image: "",
    props: { "min-height": "160px" },
    fields: [
      image("logo", "الشعار", "", "اتركه فارغاً لاستخدام شعار متجرك"),
      image("logo_dark", "شعار الوضع الداكن", ""),
      area("about", "نبذة قصيرة", L("", "")),
      line("ft-line-1", "التواصل"),
      text("phone", "رقم الجوال", "", { multilang: false, placeholder: "+966500000000" }),
      text("whatsapp", "رقم واتساب", "", { multilang: false, placeholder: "966500000000" }),
      text("email", "البريد الإلكتروني", "", { multilang: false }),
      collection("social", "حساب", [icon("icon", "الأيقونة", "sicon-instagram"), url("url", "الرابط", "")], [], 0, 6),
      line("ft-line-2"),
      sw("show_payments", "إظهار وسائل الدفع المفعلة في المتجر", true),
      text("copyright", "نص الحقوق", L("© {year} {store}", "© {year} {store}"), { desc: "{year} تصبح السنة الحالية و{store} اسم متجرك" }),
      ...colorFields(),
    ],
  },
  {
    title: "شريط الشراء الثابت",
    icon: "sicon-shopping-bag",
    name: "sticky-buy",
    key: "d305b872-5c9a-494b-a40a-147402f6b666",
    image: "",
    props: { "min-height": "64px" },
    fields: [
      line("sb-line-1", "يظهر أسفل الشاشة بعد تجاوز القسم الأول، ويختفي عند ظهور الشراء السريع"),
      drop("show_on", "يظهر على", [["both", "الجوال والكمبيوتر"], ["mobile", "الجوال فقط"], ["desktop", "الكمبيوتر فقط"]], "both"),
      sw("show_price", "إظهار اسم المنتج والسعر", true),
      sw("show_quantity", "إظهار الكمية", true, "الكمية المختارة تنتقل للشراء السريع"),
      text("buy_text", "نص الزر", L("اشتري الآن", "Buy now"), { desc: "في صفحة العروض يظهر نص الزر الرئيسي للصفحة إذا تركته فارغاً" }),
      ...colorFields(),
    ],
  },
];


const applyValues = (component, values = {}) => {
  const copy = structuredClone(component);
  for (const field of copy.fields || []) {
    if (!(field.id in values)) continue;
    field.value = values[field.id];
    if (field.format === "dropdown-list" || field.format === "switch") field.selected = values[field.id];
  }
  return copy;
};

const file = `${ROOT}/twilight-bundle.json`;
const bundle = JSON.parse(fs.readFileSync(file, "utf8"));
bundle.components = components;
const previous = new Map((bundle.templates || []).map((t) => [t.path, t]));
bundle.templates = templates.map((t) => ({
  id: t.id,
  path: `templates.${t.name}`,
  category_id: t.category_id,
  primary_color: "",
  // RESET_THUMBS=1 points back at the local thumbnails so tw-preview uploads the new ones
  thumbnail: (!process.env.RESET_THUMBS && previous.get(`templates.${t.name}`)?.thumbnail) || `templates-thumbs/${t.name}.jpg`,
  is_default: t.is_default,
  ...(previous.get(`templates.${t.name}`)?.public_preview_url ? { public_preview_url: previous.get(`templates.${t.name}`).public_preview_url } : {}),
}));
fs.writeFileSync(file, JSON.stringify(bundle, null, 4) + "\n");

if (templates.length) fs.mkdirSync(`${ROOT}/templates`, { recursive: true });
for (const t of templates) {
  const unknown = t.order.filter((name) => !components.some((c) => c.name === name));
  if (unknown.length) throw new Error(`unknown component in ${t.name}: ${unknown.join(", ")}`);
  const list = t.order.map((name) => applyValues(components.find((c) => c.name === name), t.values[name]));
  fs.writeFileSync(`${ROOT}/templates/${t.name}.json`, JSON.stringify({ id: t.id, components: list }, null, 2) + "\n");
}
console.log("components:", components.map((c) => c.name).join(", ") || "(none)");
console.log("templates:", templates.map((t) => `${t.name}(${t.order.length})`).join(", ") || "(none)");
