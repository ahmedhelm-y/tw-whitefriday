import { nothing as i, html as s } from "lit";
import { state as w } from "lit/decorators.js";
import { unsafeHTML as z } from "lit/directives/unsafe-html.js";
import { g as I, i as N, t as o, r as P, m as S } from "./styles-B5EzsqQ8.js";
import { D as M, c as j, p as u, l as H } from "./deals-jAjnTdGt.js";
import { a as g } from "./eta-DuPtGS8w.js";
import { l as T, r as L } from "./drawer-Bsbz3Eou.js";
import { e as B, f as q, c as A } from "./section-CJM2ceBk.js";
var E = Object.defineProperty, _ = (m, a, r, t) => {
  for (var e = void 0, n = m.length - 1, l; n >= 0; n--)
    (l = m[n]) && (e = l(a, r, e) || e);
  return e && E(a, r, e), e;
};
const G = `${j}
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
class c extends M {
  constructor() {
    super(...arguments), this.styleId = "hour-deal", this.gated = !0, this.products = /* @__PURE__ */ new Map(), this.loaded = !1, this.now = Date.now();
  }
  styles() {
    return G;
  }
  async connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this.now = Date.now(), 1e3);
    const a = u(this.rows().map((r) => u(r.product)[0]).filter(Boolean));
    this.products = new Map((await H(a)).map((r) => [String(r.id), r])), this.loaded = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  rows() {
    return I(this.cfg().slots, "slots");
  }
  slots() {
    const a = Number(this.cfg().tz_offset ?? 3) || 3, r = this.rows().map((t) => ({
      fromHour: Number(t.from_hour),
      toHour: Number(t.to_hour),
      item: { id: u(t.product)[0] || "", stock: Number(t.stock) || 0 }
    }));
    return B(r, this.now, a);
  }
  render() {
    var b, v, x, $, k, y, C;
    if (this.closed()) return i;
    const a = this.slots().filter((d) => this.products.has(d.item.id));
    let { current: r, next: t } = q(a, this.now);
    if (!r && !N() && (r = a[0] || null), !r) {
      if (!this.loaded) return i;
      if (N()) {
        if (!t) return i;
        const d = this.products.get(t.item.id);
        return this.frame(s`<div class="wf-hd__next">${(b = d == null ? void 0 : d.image) != null && b.url ? s`<img src=${d.image.url} alt="" />` : i}
          <span>${o({ ar: "عرض الساعة الجاي يبدأ بعد", en: "The next hour deal starts in" })} <b>${g(t.from - this.now)}</b></span></div>`, { extraClass: "wf-hd" });
      }
      return this.frame(s`<p class="wf-empty">${o({ ar: "أضف عروض الساعة: المنتج ومن الساعة كام لكام", en: "Add hour deals: product and hours" })}</p>`);
    }
    const e = this.products.get(r.item.id), n = Number(e.sale_price || e.price) || 0, l = Number(e.regular_price) || 0, h = A(e), f = T(L(e), r.item.stock || 999), p = t ? this.products.get(t.item.id) : null, D = P(this.cfg().buy_text) || o({ ar: "الحقي العرض", en: "Grab the deal" });
    return this.frame(s`<div class="wf-hd__grid" data-card=${String(e.id)}>
      <div class="wf-hd__media">
        ${(x = (v = e.images) == null ? void 0 : v[0]) != null && x.url || ($ = e.image) != null && $.url ? s`<img src=${((y = (k = e.images) == null ? void 0 : k[0]) == null ? void 0 : y.url) || e.image.url} alt=${e.name} loading="lazy" />` : i}
        ${h ? s`<span class="wf-hd__off">${o({ ar: `خصم ${h}%`, en: `${h}% off` })}</span>` : i}
      </div>
      <div class="wf-hd__info">
        <span class="wf-hd__live">${P(this.cfg().live_label) || o({ ar: "عرض الساعة شغال دلوقتي", en: "Live hour deal" })}</span>
        <h3 class="wf-hd__name">${e.name}</h3>
        <span class="wf-hd__price">${z(S(n))}${l > n ? s`<s>${z(S(l))}</s>` : i}</span>
        <div class="wf-hd__clock"><span>${o({ ar: "العرض ينتهي بعد", en: "Ends in" })}</span><b role="timer">${g(r.to - this.now)}</b></div>
        ${f !== null && r.item.stock ? s`<div class="wf-hd__stock"><span>${o({ ar: `باقي ${f} من ${r.item.stock}`, en: `${f} of ${r.item.stock} left` })}</span>
              <div class="wf-hd__stockbar"><span style=${`width:${Math.max(4, Math.round(f / r.item.stock * 100))}%`}></span></div></div>` : i}
        ${this.renderPickers(e)}
        ${this.renderBuy(e, D)}
        ${p ? s`<div class="wf-hd__next">${(C = p.image) != null && C.url ? s`<img src=${p.image.url} alt="" />` : i}
              <span>${o({ ar: "العرض الجاي سر 🤫 يبدأ بعد", en: "Next deal is a secret, starts in" })} <b>${g(t.from - this.now)}</b></span></div>` : i}
      </div>
    </div>`, { extraClass: "wf-hd" });
  }
}
_([
  w()
], c.prototype, "products");
_([
  w()
], c.prototype, "loaded");
_([
  w()
], c.prototype, "now");
typeof c < "u" && c.registerSallaComponent("salla-hour-deal");
export {
  c as default
};
