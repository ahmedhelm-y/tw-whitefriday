import { nothing as s, html as t } from "lit";
import { state as h } from "lit/decorators.js";
import { unsafeHTML as g } from "lit/directives/unsafe-html.js";
import { i as v, t as d, g as b, r as u, m as _ } from "./styles-B5EzsqQ8.js";
import { D as x, c as y, l as $ } from "./deals-jAjnTdGt.js";
import { l as k, r as C } from "./drawer-Bsbz3Eou.js";
import { p as S } from "./section-CJM2ceBk.js";
var P = Object.defineProperty, w = (f, r, a, n) => {
  for (var e = void 0, o = f.length - 1, l; o >= 0; o--)
    (l = f[o]) && (e = l(r, a, e) || e);
  return e && P(r, a, e), e;
};
const z = `${y}
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
class m extends x {
  constructor() {
    super(...arguments), this.styleId = "mystery-box", this.gated = !0, this.product = null, this.loaded = !1;
  }
  styles() {
    return z;
  }
  async connectedCallback() {
    super.connectedCallback();
    const r = S(this.cfg());
    this.product = r && (await $([r]))[0] || null, this.loaded = !0;
  }
  render() {
    if (this.closed()) return s;
    const r = this.cfg(), a = this.product;
    if (!a)
      return !this.loaded || v() ? s : this.frame(t`<p class="wf-empty">${d({ ar: "اختر منتج الصندوق من إعدادات هذا القسم", en: "Pick the box product in this section's settings" })}</p>`);
    const n = Number(a.sale_price || a.price) || 0, e = Number(r.value_amount) || 0, o = b(r.hints, "hints").map((i) => u(i.text)).filter(Boolean), l = b(r.teasers, "teasers").map((i) => String(i.image || "")).filter(Boolean).slice(0, 4), c = k(C(a), Number(r.stock_threshold) || 10), p = String(r.image || "");
    return this.frame(t`<div class="wf-mb__grid" data-card=${String(a.id)}>
      <div class="wf-mb__box">${p ? t`<img src=${p} alt="" loading="lazy" />` : t`<span class="wf-mb__q" aria-hidden="true">?</span>`}</div>
      <div class="wf-mb__info">
        ${e > n ? t`<span class="wf-mb__value">${d({ ar: "قيمته أكثر من", en: "Worth over" })} ${g(_(e))}</span>` : s}
        <span class="wf-mb__price">${g(_(n))}
          ${e > n ? t`<span class="wf-mb__save">${d({ ar: `وفّري ${Math.round((e - n) / e * 100)}%`, en: `Save ${Math.round((e - n) / e * 100)}%` })}</span>` : s}</span>
        ${o.length ? t`<ul class="wf-mb__hints">${o.map((i) => t`<li>${i}</li>`)}</ul>` : s}
        ${l.length ? t`<div class="wf-mb__teasers" aria-hidden="true">${l.map((i) => t`<img src=${i} alt="" loading="lazy" />`)}</div>` : s}
        ${c !== null ? t`<span class="wf-mb__left" role="status">${d({ ar: `باقي ${c} صناديق بس`, en: `Only ${c} boxes left` })}</span>` : s}
        ${this.renderPickers(a)}
        ${this.renderBuy(a, u(r.buy_text) || d({ ar: "اطلبي الصندوق", en: "Get the box" }))}
      </div>
    </div>`, { extraClass: "wf-mb" });
  }
}
w([
  h()
], m.prototype, "product");
w([
  h()
], m.prototype, "loaded");
typeof m < "u" && m.registerSallaComponent("salla-mystery-box");
export {
  m as default
};
