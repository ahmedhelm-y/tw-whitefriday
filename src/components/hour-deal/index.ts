import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { cardCss, DealSection, loadProducts, productIds } from "../../utils/deals";
import { formatCountdown } from "../../utils/eta";
import { lowStock, remaining } from "../../utils/fit";
import { isLandingPage, money } from "../../utils/landing";
import { currentSlot, dailySlots, discountPercent, type Slot } from "../../utils/sale";

const css = `${cardCss}
.wf-hd__grid { display: grid; gap: 1.5rem; align-items: center; }
@container (min-width: 768px) { .wf-hd__grid { grid-template-columns: 1fr 1fr; gap: 3rem; } }
.wf-hd__media { position: relative; border-radius: 1.5rem; overflow: hidden; background: var(--wf-card); aspect-ratio: 1 / 1; }
.wf-hd__media img { width: 100%; height: 100%; object-fit: cover; }
.wf-hd__off { position: absolute; top: 1rem; inset-inline-start: 1rem; padding: .5rem 1rem; border-radius: .75rem; background: #d92d20; color: #fff; font-size: 1.25rem; font-weight: 900; }
.wf-hd__info { display: grid; gap: 1rem; }
.wf-hd__live { justify-self: start; display: inline-flex; align-items: center; gap: .5rem; padding: .25rem .875rem; border-radius: 999px; background: color-mix(in srgb, #d92d20 12%, var(--wf-bg));
  color: #b42318; font-weight: 800; font-size: .875rem; }
.wf-hd__live::before { content: ""; width: .5rem; height: .5rem; border-radius: 999px; background: currentColor; animation: wf-hd-pulse 1.2s ease-in-out infinite; }
@keyframes wf-hd-pulse { 50% { opacity: .25; } }
@media (prefers-reduced-motion: reduce) { .wf-hd__live::before { animation: none; } }
.wf-hd__name { margin: 0; font-size: clamp(1.5rem, 5cqi, 2.25rem); font-weight: 900; line-height: 1.25; color: var(--wf-title); }
.wf-hd__price { display: flex; flex-wrap: wrap; align-items: baseline; gap: .75rem; font-size: 2rem; font-weight: 900; color: #d92d20; }
.wf-hd__price s { font-size: 1.125rem; font-weight: 500; color: var(--wf-text); }
.wf-hd__clock { display: flex; align-items: center; gap: .75rem; padding: .875rem 1rem; border-radius: 1rem; background: var(--wf-card); }
.wf-hd__clock b { font-size: 1.75rem; font-weight: 900; font-variant-numeric: tabular-nums; color: var(--wf-title); direction: ltr; }
.wf-hd__stock { display: grid; gap: .375rem; font-size: .875rem; font-weight: 700; }
.wf-hd__stockbar { height: .5rem; border-radius: 999px; background: color-mix(in srgb, var(--wf-text) 15%, transparent); overflow: hidden; }
.wf-hd__stockbar span { display: block; height: 100%; background: #d92d20; }
.wf-hd__next { display: flex; align-items: center; gap: .75rem; padding: .75rem 1rem; border: 1px dashed color-mix(in srgb, var(--wf-text) 35%, transparent); border-radius: 1rem; }
.wf-hd__next img { width: 3.5rem; height: 3.5rem; border-radius: .75rem; object-fit: cover; filter: blur(6px) grayscale(.4); }
.wf-hd__info select { width: 100%; min-height: 2.75rem; padding: 0 .625rem; border: 1px solid color-mix(in srgb, var(--wf-text) 25%, transparent); border-radius: .625rem;
  background: var(--wf-bg); color: var(--wf-title); font: inherit; }
`;

type Row = { product: unknown; from_hour: unknown; to_hour: unknown; stock: unknown };

export default class HourDeal extends DealSection {
  protected readonly styleId = "hour-deal";
  protected readonly gated = true;
  @state() private products = new Map<string, any>();
  @state() private loaded = false;
  @state() private now = Date.now();
  private timer?: number;

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = Date.now()), 1000);
    const ids = productIds(this.rows().map((r) => productIds(r.product)[0]).filter(Boolean));
    this.products = new Map((await loadProducts(ids)).map((p) => [String(p.id), p]));
    this.loaded = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private rows() {
    return getCollectionItems<Row>(this.cfg().slots, "slots");
  }

  private slots(): Slot<{ id: string; stock: number }>[] {
    const tz = Number(this.cfg().tz_offset ?? 3) || 3;
    const daily = this.rows().map((r) => ({
      fromHour: Number(r.from_hour),
      toHour: Number(r.to_hour),
      item: { id: productIds(r.product)[0] || "", stock: Number(r.stock) || 0 },
    }));
    return dailySlots(daily, this.now, tz);
  }

  render() {
    if (this.closed()) return nothing;
    const slots = this.slots().filter((s) => this.products.has(s.item.id));
    let { current, next } = currentSlot(slots, this.now);
    // The editor shows the first deal so the merchant can see it between slots
    if (!current && !isLandingPage()) current = slots[0] || null;
    if (!current) {
      if (!this.loaded) return nothing;
      if (isLandingPage()) {
        if (!next) return nothing;
        const p = this.products.get(next.item.id);
        return this.frame(html`<div class="wf-hd__next">${p?.image?.url ? html`<img src=${p.image.url} alt="" />` : nothing}
          <span>${t({ ar: "عرض الساعة الجاي يبدأ بعد", en: "The next hour deal starts in" })} <b>${formatCountdown(next.from! - this.now)}</b></span></div>`, { extraClass: "wf-hd" });
      }
      return this.frame(html`<p class="wf-empty">${t({ ar: "أضف عروض الساعة: المنتج ومن الساعة كام لكام", en: "Add hour deals: product and hours" })}</p>`);
    }
    const p = this.products.get(current.item.id);
    const price = Number(p.sale_price || p.price) || 0;
    const regular = Number(p.regular_price) || 0;
    const off = discountPercent(p);
    const left = lowStock(remaining(p), current.item.stock || 999);
    const nextProduct = next ? this.products.get(next.item.id) : null;
    const buyText = resolveText(this.cfg().buy_text) || t({ ar: "الحقي العرض", en: "Grab the deal" });
    return this.frame(html`<div class="wf-hd__grid" data-card=${String(p.id)}>
      <div class="wf-hd__media">
        ${p.images?.[0]?.url || p.image?.url ? html`<img src=${p.images?.[0]?.url || p.image.url} alt=${p.name} loading="lazy" />` : nothing}
        ${off ? html`<span class="wf-hd__off">${t({ ar: `خصم ${off}%`, en: `${off}% off` })}</span>` : nothing}
      </div>
      <div class="wf-hd__info">
        <span class="wf-hd__live">${resolveText(this.cfg().live_label) || t({ ar: "عرض الساعة شغال دلوقتي", en: "Live hour deal" })}</span>
        <h3 class="wf-hd__name">${p.name}</h3>
        <span class="wf-hd__price">${unsafeHTML(money(price))}${regular > price ? html`<s>${unsafeHTML(money(regular))}</s>` : nothing}</span>
        <div class="wf-hd__clock"><span>${t({ ar: "العرض ينتهي بعد", en: "Ends in" })}</span><b role="timer">${formatCountdown(current.to! - this.now)}</b></div>
        ${left !== null && current.item.stock
          ? html`<div class="wf-hd__stock"><span>${t({ ar: `باقي ${left} من ${current.item.stock}`, en: `${left} of ${current.item.stock} left` })}</span>
              <div class="wf-hd__stockbar"><span style=${`width:${Math.max(4, Math.round((left / current.item.stock) * 100))}%`}></span></div></div>`
          : nothing}
        ${this.renderPickers(p)}
        ${this.renderBuy(p, buyText)}
        ${nextProduct
          ? html`<div class="wf-hd__next">${nextProduct.image?.url ? html`<img src=${nextProduct.image.url} alt="" />` : nothing}
              <span>${t({ ar: "العرض الجاي سر 🤫 يبدأ بعد", en: "Next deal is a secret, starts in" })} <b>${formatCountdown(next!.from! - this.now)}</b></span></div>`
          : nothing}
      </div>
    </div>`, { extraClass: "wf-hd" });
  }
}
