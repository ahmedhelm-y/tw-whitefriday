import { nothing as c, html as s } from "lit";
import { state as p } from "lit/decorators.js";
import { unsafeHTML as f } from "lit/directives/unsafe-html.js";
import { h as w, g as u, r as b, i as g, t as o, m } from "./styles-CBhBCxUD.js";
import { W as _, t as h } from "./section-Bp25z5NG.js";
var v = Object.defineProperty, $ = (n, e, r, a) => {
  for (var t = void 0, i = n.length - 1, d; i >= 0; i--)
    (d = n[i]) && (t = d(e, r, t) || t);
  return t && v(e, r, t), t;
};
const y = `
.wf-tb__steps { position: relative; display: grid; grid-template-columns: repeat(var(--wf-tb-n, 3), minmax(0, 1fr)); gap: .75rem; padding: 0; margin: 0; list-style: none; }
.wf-tb__step { display: grid; gap: .375rem; justify-items: center; padding: 1.125rem .75rem; border-radius: 1.125rem; background: var(--wf-card); text-align: center; }
.wf-tb__step b { font-size: 1.375rem; font-weight: 900; color: var(--wf-title); line-height: 1.3; }
.wf-tb__step span { font-size: .875rem; }
.wf-tb__step.is-on { background: var(--wf-accent); }
.wf-tb__step.is-on b, .wf-tb__step.is-on span { color: var(--wf-accent-text); }
.wf-tb__track { height: .625rem; margin-top: 1.25rem; border-radius: 999px; background: color-mix(in srgb, var(--wf-text) 15%, transparent); overflow: hidden; }
.wf-tb__fill { height: 100%; border-radius: 999px; background: var(--wf-accent); transition: width .5s ease; }
.wf-tb__msg { margin: .75rem 0 0; text-align: center; font-weight: 700; color: var(--wf-title); }
@container (max-width: 520px) { .wf-tb__steps { grid-template-columns: minmax(0, 1fr); } }
@media (prefers-reduced-motion: reduce) { .wf-tb__fill { transition: none; } }
`;
function x(n) {
  var t;
  const e = ((t = n == null ? void 0 : n.data) == null ? void 0 : t.cart) || (n == null ? void 0 : n.data) || (n == null ? void 0 : n.cart), r = (e == null ? void 0 : e.sub_total) ?? (e == null ? void 0 : e.total) ?? (e == null ? void 0 : e.total_price), a = Number(typeof r == "object" ? r == null ? void 0 : r.amount : r);
  return Number.isFinite(a) ? a : null;
}
class l extends _ {
  constructor() {
    super(...arguments), this.styleId = "tier-bar", this.total = null, this.onCart = () => this.readCart();
  }
  styles() {
    return y;
  }
  connectedCallback() {
    super.connectedCallback(), this.readCart(), window.addEventListener("wf:cart", this.onCart), window.addEventListener("focus", this.onCart);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("wf:cart", this.onCart), window.removeEventListener("focus", this.onCart);
  }
  async readCart() {
    var e, r, a;
    try {
      const t = w();
      await ((e = t == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
      const i = (a = (r = t == null ? void 0 : t.cart) == null ? void 0 : r.api) == null ? void 0 : a.details;
      if (typeof i != "function") return;
      this.total = x(await i.call(t.cart.api));
    } catch {
    }
  }
  render() {
    const e = this.cfg(), r = u(e.tiers, "tiers").map((t) => ({ amount: Number(t.amount) || 0, reward: b(t.reward) })).filter((t) => t.amount > 0 && t.reward).sort((t, i) => t.amount - i.amount).slice(0, 4);
    if (!r.length)
      return g() ? c : this.frame(s`<p class="wf-empty">${o({ ar: "أضف المستويات: المبلغ والمكافأة", en: "Add the tiers: amount and reward" })}</p>`);
    const a = this.total !== null ? h(this.total, r) : null;
    return this.frame(s`
      <ol class="wf-tb__steps" style=${`--wf-tb-n:${r.length}`}>
        ${r.map((t, i) => s`<li class=${`wf-tb__step${a && i < a.reached ? " is-on" : ""}`}>
          <span>${o({ ar: "اشتري بـ", en: "Spend" })} ${f(m(t.amount))}</span><b>${t.reward}</b></li>`)}
      </ol>
      ${a ? s`<div class="wf-tb__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${a.percent}>
            <div class="wf-tb__fill" style=${`width:${a.percent}%`}></div></div>
          <p class="wf-tb__msg" aria-live="polite">${a.next ? s`${o({ ar: "باقيلك", en: "Only" })} ${f(m(a.left))} ${o({ ar: `وتاخدي ${a.next.reward}`, en: `more for ${a.next.reward}` })}` : o({ ar: "وصلتي لأعلى مستوى 🎉", en: "You reached the top tier" })}</p>` : c}`, { extraClass: "wf-tb" });
  }
}
$([
  p()
], l.prototype, "total");
typeof l < "u" && l.registerSallaComponent("salla-tier-bar");
export {
  l as default
};
