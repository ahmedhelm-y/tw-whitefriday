import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { cardCss, DealSection, loadProducts, productIds } from "../../utils/deals";
import { isLandingPage } from "../../utils/landing";
import { discountPercent } from "../../utils/sale";

const css = `${cardCss}
.wf-dg__bar { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-bottom: 1.5rem; }
.wf-dg__chip { min-height: 2.75rem; padding: 0 1.125rem; border: 1.5px solid color-mix(in srgb, var(--wf-text) 22%, transparent); border-radius: 999px;
  background: var(--wf-bg); color: var(--wf-title); font: inherit; font-weight: 700; font-size: .875rem; cursor: pointer; }
.wf-dg__chip[aria-pressed="true"] { border-color: var(--wf-title); background: var(--wf-title); color: var(--wf-bg); }
.wf-dg__chip--off[aria-pressed="true"] { border-color: #d92d20; background: #d92d20; color: #fff; }
.wf-dg__chip:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 2px; }
.wf-dg__grid { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 0; margin: 0; list-style: none; }
@container (min-width: 768px) { .wf-dg__grid { grid-template-columns: repeat(var(--wf-dg-cols, 4), minmax(0, 1fr)); gap: 1.25rem; } }
.wf-dg__none { padding: 2rem; text-align: center; }
`;

type Tab = { label: unknown; products: unknown };

export default class DealGrid extends DealSection {
  protected readonly styleId = "deal-grid";
  protected readonly gated = true;
  @state() private tabs: { label: string; products: any[] }[] = [];
  @state() private loaded = false;
  @state() private tab = 0;
  @state() private minOff = 0;

  protected styles() {
    return css;
  }

  async connectedCallback() {
    super.connectedCallback();
    const cfg = this.cfg();
    const defined = getCollectionItems<Tab>(cfg.tabs, "tabs").map((tab) => ({ label: resolveText(tab.label), ids: productIds(tab.products) })).filter((tab) => tab.label && tab.ids.length);
    // "All" leads, holding the section's own products plus every tab's, once each
    const all = productIds([...productIds(cfg.products), ...defined.flatMap((d) => d.ids)], 24);
    const cache = new Map((await loadProducts(all)).map((p) => [String(p.id), p]));
    const take = (ids: string[]) => ids.map((id) => cache.get(id)).filter(Boolean) as any[];
    this.tabs = [{ label: t({ ar: "كل العروض", en: "All deals" }), products: take(all) }, ...defined.map((d) => ({ label: d.label, products: take(d.ids) }))].filter((x) => x.products.length);
    this.loaded = true;
  }

  render() {
    if (this.closed()) return nothing;
    const cfg = this.cfg();
    if (!this.tabs.length) {
      if (!this.loaded || isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-empty">${t({ ar: "اختر منتجات العروض من إعدادات هذا القسم", en: "Pick the deal products in this section's settings" })}</p>`);
    }
    const current = this.tabs[Math.min(this.tab, this.tabs.length - 1)];
    const levels = String(cfg.discount_filters ?? "30,50").split(/[,،\s]+/).map(Number).filter((n) => n > 0 && n < 100).slice(0, 3);
    const shown = current.products.filter((p) => discountPercent(p) >= this.minOff);
    const cols = Math.min(Math.max(Number(cfg.columns) || 4, 2), 5);
    const tag = resolveText(cfg.card_tag);
    return this.frame(html`
      <div class="wf-dg__bar" role="group" aria-label=${t({ ar: "تصفية العروض", en: "Filter deals" })}>
        ${this.tabs.length > 1 ? this.tabs.map((tab, i) => html`<button type="button" class="wf-dg__chip" aria-pressed=${i === this.tab ? "true" : "false"} @click=${() => (this.tab = i)}>${tab.label}</button>`) : nothing}
        ${levels.map((n) => html`<button type="button" class="wf-dg__chip wf-dg__chip--off" aria-pressed=${this.minOff === n ? "true" : "false"}
          @click=${() => (this.minOff = this.minOff === n ? 0 : n)}>${t({ ar: `خصم ${n}% وأكثر`, en: `${n}% off or more` })}</button>`)}
      </div>
      ${shown.length
        ? html`<ul class="wf-dg__grid" style=${`--wf-dg-cols:${cols}`}>${shown.map((p) => this.renderCard(p, { tag }))}</ul>`
        : html`<p class="wf-dg__none">${t({ ar: "مفيش عروض بالخصم ده هنا، جربي خصم أقل", en: "No deals at this discount here, try a lower one" })}</p>`}`, { extraClass: "wf-dg" });
  }
}
