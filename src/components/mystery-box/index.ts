import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { cardCss, DealSection, loadProducts } from "../../utils/deals";
import { lowStock, remaining } from "../../utils/fit";
import { isLandingPage, money } from "../../utils/landing";
import { productIdFrom } from "../../utils/section";

const css = `${cardCss}
.wf-mb__grid { display: grid; gap: 1.5rem; align-items: center; }
@container (min-width: 768px) { .wf-mb__grid { grid-template-columns: 1fr 1fr; gap: 3rem; } }
.wf-mb__box { position: relative; display: grid; place-items: center; aspect-ratio: 1 / 1; border-radius: 1.5rem; overflow: hidden;
  background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--wf-accent) 30%, var(--wf-card)), var(--wf-card)); }
.wf-mb__box img { width: 100%; height: 100%; object-fit: cover; }
.wf-mb__q { font-size: 9rem; font-weight: 900; line-height: 1; color: var(--wf-accent-ink); animation: wf-mb-bob 2.4s ease-in-out infinite; }
@keyframes wf-mb-bob { 50% { transform: translateY(-10px) rotate(-4deg); } }
@media (prefers-reduced-motion: reduce) { .wf-mb__q { animation: none; } }
.wf-mb__info { display: grid; gap: 1rem; }
.wf-mb__value { justify-self: start; padding: .375rem 1rem; border-radius: 999px; background: var(--wf-accent); color: var(--wf-accent-text); font-weight: 800; }
.wf-mb__price { display: flex; flex-wrap: wrap; align-items: baseline; gap: .75rem; font-size: 2.25rem; font-weight: 900; color: var(--wf-title); }
.wf-mb__save { font-size: 1rem; font-weight: 800; color: #d92d20; }
.wf-mb__hints { display: grid; gap: .5rem; margin: 0; padding: 0; list-style: none; }
.wf-mb__hints li { display: flex; gap: .625rem; align-items: center; padding: .625rem .875rem; border-radius: .75rem; background: var(--wf-card); font-weight: 600; }
.wf-mb__hints li::before { content: "؟"; flex: 0 0 auto; width: 1.75rem; height: 1.75rem; display: grid; place-items: center; border-radius: 999px; background: var(--wf-title); color: var(--wf-bg); font-weight: 900; }
.wf-mb__teasers { display: flex; gap: .5rem; }
.wf-mb__teasers img { width: 4rem; height: 4rem; border-radius: .75rem; object-fit: cover; filter: blur(5px) saturate(.6); }
.wf-mb__left { font-weight: 800; color: #b42318; }
.wf-mb__info select { width: 100%; min-height: 2.75rem; padding: 0 .625rem; border: 1px solid color-mix(in srgb, var(--wf-text) 25%, transparent); border-radius: .625rem;
  background: var(--wf-bg); color: var(--wf-title); font: inherit; }
`;

export default class MysteryBox extends DealSection {
  protected readonly styleId = "mystery-box";
  protected readonly gated = true;
  @state() private product: any = null;
  @state() private loaded = false;

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    const id = productIdFrom(this.cfg());
    this.product = id ? (await loadProducts([id]))[0] || null : null;
    this.loaded = true;
  }

  render() {
    if (this.closed()) return nothing;
    const cfg = this.cfg();
    const p = this.product;
    if (!p) {
      if (!this.loaded || isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-empty">${t({ ar: "اختر منتج الصندوق من إعدادات هذا القسم", en: "Pick the box product in this section's settings" })}</p>`);
    }
    const price = Number(p.sale_price || p.price) || 0;
    const value = Number(cfg.value_amount) || 0;
    const hints = getCollectionItems<{ text: unknown }>(cfg.hints, "hints").map((h) => resolveText(h.text)).filter(Boolean);
    const teasers = getCollectionItems<{ image: unknown }>(cfg.teasers, "teasers").map((x) => String(x.image || "")).filter(Boolean).slice(0, 4);
    const left = lowStock(remaining(p), Number(cfg.stock_threshold) || 10);
    const cover = String(cfg.image || "");
    return this.frame(html`<div class="wf-mb__grid" data-card=${String(p.id)}>
      <div class="wf-mb__box">${cover ? html`<img src=${cover} alt="" loading="lazy" />` : html`<span class="wf-mb__q" aria-hidden="true">?</span>`}</div>
      <div class="wf-mb__info">
        ${value > price ? html`<span class="wf-mb__value">${t({ ar: "قيمته أكثر من", en: "Worth over" })} ${unsafeHTML(money(value))}</span>` : nothing}
        <span class="wf-mb__price">${unsafeHTML(money(price))}
          ${value > price ? html`<span class="wf-mb__save">${t({ ar: `وفّري ${Math.round(((value - price) / value) * 100)}%`, en: `Save ${Math.round(((value - price) / value) * 100)}%` })}</span>` : nothing}</span>
        ${hints.length ? html`<ul class="wf-mb__hints">${hints.map((h) => html`<li>${h}</li>`)}</ul>` : nothing}
        ${teasers.length ? html`<div class="wf-mb__teasers" aria-hidden="true">${teasers.map((src) => html`<img src=${src} alt="" loading="lazy" />`)}</div>` : nothing}
        ${left !== null ? html`<span class="wf-mb__left" role="status">${t({ ar: `باقي ${left} صناديق بس`, en: `Only ${left} boxes left` })}</span>` : nothing}
        ${this.renderPickers(p)}
        ${this.renderBuy(p, resolveText(cfg.buy_text) || t({ ar: "اطلبي الصندوق", en: "Get the box" }))}
      </div>
    </div>`, { extraClass: "wf-mb" });
  }
}
