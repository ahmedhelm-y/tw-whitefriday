import { LitElement as v, nothing as l, html as n } from "lit";
import { property as g, state as c } from "lit/decorators.js";
import { unsafeHTML as h } from "lit/directives/unsafe-html.js";
import { a as x, b as k } from "./buy-Cnk1jDve.js";
import { e as $, b as q, f as S, o as I, h as H, m, c as B, u as C, r as P, q as E, t as b, s as z, d as L } from "./styles-CBhBCxUD.js";
var O = Object.defineProperty, a = (d, t, s, e) => {
  for (var i = void 0, r = d.length - 1, u; r >= 0; r--)
    (u = d[r]) && (i = u(t, s, i) || i);
  return i && O(t, s, i), i;
};
const j = `
.wf-sb { position: fixed; inset-inline: 0; bottom: 0; z-index: 40; padding-bottom: env(safe-area-inset-bottom);
  background: color-mix(in srgb, var(--wf-bg) 92%, transparent); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 -1px 0 color-mix(in srgb, var(--wf-text) 12%, transparent), 0 -12px 32px -24px rgb(0 0 0 / 45%);
  transform: translateY(110%); visibility: hidden; transition: transform .35s ease, visibility 0s linear .35s; }
.wf-sb.is-shown { transform: none; visibility: visible; transition: transform .35s ease; }
/* In the editor and previews the bar sits in the page, so the merchant can see and edit it */
.wf-sb--inline { position: static; transform: none; visibility: visible; transition: none; }
@media (prefers-reduced-motion: reduce) { .wf-sb, .wf-sb.is-shown { transition: none; } }
.wf-sb__inner { display: flex; align-items: center; gap: .75rem; max-width: 1200px; margin-inline: auto; padding: .625rem 1rem; }
.wf-sb__info { display: flex; align-items: center; gap: .75rem; flex: 1 1 auto; min-width: 0; }
.wf-sb__img { width: 2.75rem; height: 2.75rem; flex: 0 0 auto; border-radius: .5rem; object-fit: cover; background: var(--wf-card); }
.wf-sb__name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: 700; font-size: .9375rem; color: var(--wf-title); }
.wf-sb__price { display: flex; align-items: baseline; gap: .375rem; font-size: .875rem; color: var(--wf-text); }
.wf-sb__price b { color: var(--wf-title); font-size: 1rem; }
.wf-sb__price s { opacity: .7; }
.wf-sb__qty { display: flex; align-items: center; height: 2.75rem; flex: 0 0 auto; border: 1px solid color-mix(in srgb, var(--wf-text) 25%, transparent); border-radius: .625rem; }
.wf-sb__qty button { width: 2.5rem; height: 100%; border: 0; background: none; color: var(--wf-title); font-size: 1.25rem; cursor: pointer; }
.wf-sb__qty button:disabled { opacity: .35; cursor: default; }
.wf-sb__qty output { min-width: 1.75rem; text-align: center; font-weight: 700; color: var(--wf-title); }
.wf-sb__buy { flex: 0 0 auto; }
@media (max-width: 767px) {
  .wf-sb--desktop { display: none; }
  .wf-sb__img { display: none; }
  .wf-sb__buy { flex: 1 1 auto; }
  .wf-sb__info { flex: 0 1 auto; max-width: 40%; flex-direction: column; align-items: flex-start; gap: 0; }
}
@media (min-width: 768px) { .wf-sb--mobile { display: none; } }
`;
class o extends v {
  constructor() {
    super(...arguments), this.product = null, this.pastHero = !1, this.checkoutInView = !1, this.quantity = 1, this.busy = !1, this.error = "", this.observers = [], this.noHero = !1, this.onScroll = () => {
      this.noHero && (this.pastHero = (window.scrollY || document.documentElement.scrollTop) > 600);
    };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    super.connectedCallback(), this.classList.add("wf-host"), $(), q("wf-sticky-buy", j), window.setTimeout(() => this.watch(), 0), this.product = await S(I());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.observers.forEach((t) => t.disconnect()), this.observers = [], window.removeEventListener("scroll", this.onScroll), document.documentElement.style.removeProperty("--wf-sb-h");
  }
  updated() {
    const t = this.querySelector(".wf-sb"), s = !!(t != null && t.classList.contains("is-shown"));
    document.documentElement.style.setProperty("--wf-sb-h", s ? `${t.offsetHeight}px` : "0px");
  }
  inline() {
    return !!this.closest(".component-card");
  }
  watch() {
    if (typeof IntersectionObserver > "u") {
      this.pastHero = !0;
      return;
    }
    const t = document.querySelector("[data-wf-hero]");
    if (t) {
      const e = new IntersectionObserver(([i]) => {
        this.pastHero = !i.isIntersecting && i.boundingClientRect.bottom < 0;
      });
      e.observe(t), this.observers.push(e);
    } else
      this.noHero = !0, window.addEventListener("scroll", this.onScroll, { passive: !0 }), this.onScroll();
    const s = document.querySelector(".s-block--fast-checkout");
    if (s) {
      const e = new IntersectionObserver(([i]) => {
        this.checkoutInView = i.isIntersecting;
      });
      e.observe(s), this.observers.push(e);
    }
  }
  async onBuy() {
    var s, e;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let t;
    try {
      t = await x({ quantity: this.quantity, product: this.product });
    } finally {
      this.busy = !1;
    }
    t.kind === "error" && (this.error = t.message || "", (e = (s = H()) == null ? void 0 : s.error) == null || e.call(s, t.message));
  }
  renderPrice() {
    const t = this.product, s = Number(t.is_on_sale ? t.sale_price : t.price) || 0, e = Number(t.regular_price) || 0;
    return n`<span class="wf-sb__price"><b>${h(m(s))}</b>
      ${t.is_on_sale && e > s ? n`<s>${h(m(e))}</s>` : l}</span>`;
  }
  render() {
    var p;
    const t = B(this.config), s = k();
    if (s === "none") return l;
    const e = this.product, i = this.inline(), r = i || this.pastHero && !this.checkoutInView, u = String(C(t.show_on) || "both"), w = P(t.buy_text) || (s === "link" ? E().text : "") || b({ ar: "اشتري الآن", en: "Buy now" }), f = Number(e == null ? void 0 : e.max_quantity) || 99, y = t.show_quantity !== !1 && s !== "link", _ = [
      "wf-block wf-sb",
      z(t),
      i ? "wf-sb--inline" : "",
      u === "mobile" ? "wf-sb--mobile" : u === "desktop" ? "wf-sb--desktop" : "",
      r ? "is-shown" : ""
    ].filter(Boolean).join(" ");
    return n`<div class=${_} style=${L(t)} role="region" aria-label=${b({ ar: "شراء سريع", en: "Quick buy" })} aria-hidden=${r ? "false" : "true"}>
      <div class="wf-sb__inner">
        ${e ? n`<div class="wf-sb__info">
              ${(p = e.image) != null && p.url ? n`<img class="wf-sb__img" src=${e.image.url} alt="" loading="lazy" />` : l}
              <div style="min-width:0">
                <div class="wf-sb__name">${e.name}</div>
                ${t.show_price !== !1 ? this.renderPrice() : l}
              </div>
            </div>` : n`<div class="wf-sb__info"></div>`}
        ${y ? n`<div class="wf-sb__qty" role="group" aria-label=${b({ ar: "الكمية", en: "Quantity" })}>
              <button type="button" aria-label=${b({ ar: "زيادة الكمية", en: "Increase quantity" })} tabindex=${r ? 0 : -1} ?disabled=${this.quantity >= f} @click=${() => this.quantity = Math.min(f, this.quantity + 1)}>+</button>
              <output aria-live="polite">${this.quantity}</output>
              <button type="button" aria-label=${b({ ar: "تقليل الكمية", en: "Decrease quantity" })} tabindex=${r ? 0 : -1} ?disabled=${this.quantity <= 1} @click=${() => this.quantity = Math.max(1, this.quantity - 1)}>−</button>
            </div>` : l}
        <button type="button" class="wf-btn wf-sb__buy" tabindex=${r ? 0 : -1} aria-busy=${this.busy ? "true" : "false"} @click=${() => this.onBuy()}>${w}</button>
      </div>
      ${this.error ? n`<p class="wf-error wf-container" role="alert">${this.error}</p>` : l}
    </div>`;
  }
}
a([
  g({ type: Object })
], o.prototype, "config");
a([
  c()
], o.prototype, "product");
a([
  c()
], o.prototype, "pastHero");
a([
  c()
], o.prototype, "checkoutInView");
a([
  c()
], o.prototype, "quantity");
a([
  c()
], o.prototype, "busy");
a([
  c()
], o.prototype, "error");
typeof o < "u" && o.registerSallaComponent("salla-sticky-buy");
export {
  o as default
};
