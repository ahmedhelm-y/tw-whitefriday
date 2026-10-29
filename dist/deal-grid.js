import { nothing as g, html as o } from "lit";
import { state as c } from "lit/decorators.js";
import { g as b, r as u, t as d, i as _ } from "./styles-B5EzsqQ8.js";
import { D as w, c as v, p as m, l as $ } from "./deals-jAjnTdGt.js";
import { c as x } from "./section-CJM2ceBk.js";
var y = Object.defineProperty, f = (p, s, i, n) => {
  for (var r = void 0, a = p.length - 1, t; a >= 0; a--)
    (t = p[a]) && (r = t(s, i, r) || r);
  return r && y(s, i, r), r;
};
const k = `${v}
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
class l extends w {
  constructor() {
    super(...arguments), this.styleId = "deal-grid", this.gated = !0, this.tabs = [], this.loaded = !1, this.tab = 0, this.minOff = 0;
  }
  styles() {
    return k;
  }
  async connectedCallback() {
    super.connectedCallback();
    const s = this.cfg(), i = b(s.tabs, "tabs").map((t) => ({ label: u(t.label), ids: m(t.products) })).filter((t) => t.label && t.ids.length), n = m([...m(s.products), ...i.flatMap((t) => t.ids)], 24), r = new Map((await $(n)).map((t) => [String(t.id), t])), a = (t) => t.map((e) => r.get(e)).filter(Boolean);
    this.tabs = [{ label: d({ ar: "كل العروض", en: "All deals" }), products: a(n) }, ...i.map((t) => ({ label: t.label, products: a(t.ids) }))].filter((t) => t.products.length), this.loaded = !0;
  }
  render() {
    if (this.closed()) return g;
    const s = this.cfg();
    if (!this.tabs.length)
      return !this.loaded || _() ? g : this.frame(o`<p class="wf-empty">${d({ ar: "اختر منتجات العروض من إعدادات هذا القسم", en: "Pick the deal products in this section's settings" })}</p>`);
    const i = this.tabs[Math.min(this.tab, this.tabs.length - 1)], n = String(s.discount_filters ?? "30,50").split(/[,،\s]+/).map(Number).filter((e) => e > 0 && e < 100).slice(0, 3), r = i.products.filter((e) => x(e) >= this.minOff), a = Math.min(Math.max(Number(s.columns) || 4, 2), 5), t = u(s.card_tag);
    return this.frame(o`
      <div class="wf-dg__bar" role="group" aria-label=${d({ ar: "تصفية العروض", en: "Filter deals" })}>
        ${this.tabs.length > 1 ? this.tabs.map((e, h) => o`<button type="button" class="wf-dg__chip" aria-pressed=${h === this.tab ? "true" : "false"} @click=${() => this.tab = h}>${e.label}</button>`) : g}
        ${n.map((e) => o`<button type="button" class="wf-dg__chip wf-dg__chip--off" aria-pressed=${this.minOff === e ? "true" : "false"}
          @click=${() => this.minOff = this.minOff === e ? 0 : e}>${d({ ar: `خصم ${e}% وأكثر`, en: `${e}% off or more` })}</button>`)}
      </div>
      ${r.length ? o`<ul class="wf-dg__grid" style=${`--wf-dg-cols:${a}`}>${r.map((e) => this.renderCard(e, { tag: t }))}</ul>` : o`<p class="wf-dg__none">${d({ ar: "مفيش عروض بالخصم ده هنا، جربي خصم أقل", en: "No deals at this discount here, try a lower one" })}</p>`}`, { extraClass: "wf-dg" });
  }
}
f([
  c()
], l.prototype, "tabs");
f([
  c()
], l.prototype, "loaded");
f([
  c()
], l.prototype, "tab");
f([
  c()
], l.prototype, "minOff");
typeof l < "u" && l.registerSallaComponent("salla-deal-grid");
export {
  l as default
};
