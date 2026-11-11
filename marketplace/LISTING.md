# الجمعة البيضاء (White Friday): بيانات النشر في متجر الثيمات

## الاسم
- AR: الجمعة البيضاء
- EN: White Friday

## الوصف

الاسم والوصف القصير متكتبين في `twilight-bundle.json`. لو حفظت أي إعداد من البوابة، اعمل `git pull` واتأكد إن الوصف والاسم والتصنيف لسه سليمين.

**AR (قصير):** صفحة هبوط لعروض الجمعة البيضاء بعداد وعروض الساعة وألعاب الخصم

**AR (طويل):**
صفحة هبوط لعروض الجمعة البيضاء بهدف واحد واضح: العميل يشتري العروض. الصفحة بتتغير لوحدها حسب التاريخ: قبل العرض عدّاد للبداية ولعبة يكسب منها كود، وأثناءه العروض وعدّاد للنهاية، وبعده رسالة "انتهى العرض".
14 قسماً، وكل قسم بيشتغل لوحده:
- العرض بثلاث حالات، ومنه لون البراند ووضع الصفحة.
- شبكة العروض بأزرار الأقسام ونسب الخصم.
- عرض الساعة اللي بيتغير كل كام ساعة.
- اكشط عرضك المفاجئ، وصندوق المفاجآت.
- تقويم الأبواب (كل يوم باب جديد)، والعب واكسب كود خصم.
- مستويات "كل ما تزيد تكسب أكتر"، وباقات العرض، وخصومات البنوك وطرق الدفع.
- ليه تتسوّق معانا، وآراء العملاء، وأسئلة العرض، وشريط الشراء الثابت.

سلة جانبية: العميل يضيف كذا منتج وهو في الصفحة، ويشوف الإجمالي وفاضل كام للمستوى الجاي، وبعدين يكمّل الطلب.
ثلاثة قوالب جاهزة، كل واحد بهدف: الكلاسيك الأبيض (شراء العروض)، والأسود الفاخر (عرض الساعة)، وقريباً (كسب كود قبل العرض).
الأكواد بتظهر للعملاء بس بعد ما تأكد إنك عملتها في سلة.
كل النصوص بالعربي والإنجليزي، والتصميم متوافق مع الجوال، وفيه وضع داكن.

**EN (short):** A White Friday landing page with a countdown, hour deals and discount games

**EN (long):**
A White Friday landing page with one clear goal: shoppers buy the deals. It changes by itself with the date: before the sale a countdown and a game that wins a code, during it the deals and a countdown to the end, and after it a "sale ended" message.
14 sections, each one works on its own:
- The three-phase sale hero, which also sets the brand color and page mode.
- A deal grid with category and discount filters.
- An hour deal that changes every few hours.
- A scratch-to-reveal offer and a mystery box.
- A door-a-day calendar and a play-to-win code game.
- Spend-more-save-more tiers, sale sets, and bank and payment offers.
- Why us, customer reviews, sale FAQs and a sticky buy bar.

A side cart: shoppers add several products without leaving the page, see the total and how far the next tier is, then check out.
Three ready templates, each with one goal: white classic (buy the deals), black luxe (the hour deal) and coming soon (win a code before the sale).
Codes show to shoppers only after you confirm you created them in Salla.
Every text is in Arabic and English, every section works on phones, and there is a dark mode.

## السعر المقترح
299 ريال (مرة واحدة). البوابة بتقبل من 250 لـ 5000.

## التصنيف
`white-classic` و`black-luxe` على "أزياء" (`814202285`)، و`coming-soon` على "مستحضرات التجميل والعناية" (`665151403`).

## الصور (بالترتيب ده، 1600×1200، أقل من 200KB)

كل صورة بتعرض ميزة على لابتوب وجوال، من غير كتابة أو شعار فوق الصورة (قاعدة سلة 4.9).
الصور والأيقونة في branch `store-assets` جوه `marketplace/`، عشان حجم المجموعة يفضل أقل من 1 MB:
https://github.com/ahmedhelm-y/tw-whitefriday/tree/store-assets/marketplace

| الملف | العنوان AR | Title EN | الوصف AR | Description EN |
|---|---|---|---|---|
| `01-sale-live.jpg` | صفحة بتتغير مع موعد العرض | A page that follows the sale clock | قبل العرض وأثناءه وبعده، من غير ما تعدّل حاجة | Before, during and after the sale, with no edits |
| `02-before-the-sale.jpg` | تشويق قبل العرض | Build hype before the sale | عدّاد للبداية، وزرار ذكّريني، ولعبة يكسب منها العميل كود | A start countdown, a reminder and a game that wins a code |
| `03-deal-grid.jpg` | كل العروض بفلاتر | Every deal, filtered | أقسام ونسب خصم، والإضافة للسلة من الكارت | Category and discount filters, add to cart from the card |
| `04-hour-deal.jpg` | عرض الساعة | Deal of the hour | صفقة بتتغير كل كام ساعة، بعدّاد وكمية باقية | A deal that changes every few hours, with a timer and stock left |
| `05-sets-and-tiers.jpg` | باقات ومستويات خصم | Sets and spend tiers | قطع تتضاف مرة واحدة، وفاضل كام للمكافأة الجاية | Pieces added at once, and how far the next reward is |
| `06-scratch-coupon.jpg` | اكشط واكسب | Scratch to win | كارت يكشطه العميل فيظهر له كود خصم | A card the shopper scratches to reveal a code |
| `07-mystery-box.jpg` | صندوق المفاجآت | The mystery box | قيمته أكبر من سعره، بتلميحات وصور مموّهة | Worth more than its price, with hints and blurred previews |
| `08-doors-and-game.jpg` | باب كل يوم ولعبة هدايا | A door a day and a gift game | عرض جديد كل يوم، وهدية يختارها العميل | A new offer daily, and a gift the shopper picks |
| `09-side-cart.jpg` | سلة جانبية | A side cart | يضيف كذا منتج ويكمّل الطلب من غير ما يسيب الصفحة | Add several products and check out without leaving the page |
| `10-trust-and-reviews.jpg` | ثقة وآراء العملاء | Trust and reviews | رد على قلق العميل، وآراء بمتوسط التقييم | Answers to shopper worries, and reviews with an average rating |
| `11-bank-offers-and-faq.jpg` | خصومات الدفع والأسئلة | Payment offers and FAQs | عروض البنوك بأكوادها، وأسئلة بمواعيد العرض تلقائياً | Bank offers with codes, and FAQs that fill in the sale dates |

**الأيقونة:** `icon.png` (1024×1024) في نفس الفولدر.

## بيانات الدعم

سلة رفضت موقع الشركة لأن الحساب فردي، فموقع الدعم بقى حساب X الشخصي، ومعاه رقم الجوال ولينك الواتساب.

| الخانة | القيمة |
|---|---|
| Support email | ahmedhelmy2722@gmail.com |
| Support website | https://x.com/ah_helmy22 |
| Support phone | +966545178179 |
| Live chat | https://wa.me/966545178179 |
| Documentation link | https://ahmedhelm-y.github.io/tw-whitefriday/marketplace/help.html (بعد تفعيل GitHub Pages) |
| Support service | Email Support |

## سجل التحديثات
`CHANGELOG.md` في الريبو: https://github.com/ahmedhelm-y/tw-whitefriday/blob/main/CHANGELOG.md
