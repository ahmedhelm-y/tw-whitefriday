import { html as n, LitElement as k, nothing as f } from "lit";
import { property as $, state as m } from "lit/decorators.js";
import { a as M, b as C } from "./buy-Cnk1jDve.js";
import { c as d, e as B, b as P, p as j, j as E, k as S, u, l as K, h as y, g as z, n as L, r as b, t as g } from "./styles-CBhBCxUD.js";
var O = Object.defineProperty, c = (l, e, t, s) => {
  for (var o = void 0, r = l.length - 1, a; r >= 0; r--)
    (a = l[r]) && (o = a(e, t, o) || o);
  return o && O(e, t, o), o;
};
const _ = (l) => `
${l} .wf-hd__logo--light.has-dark { display: none; }
${l} .wf-hd__logo--dark { display: block; }
${l} .wf-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`, T = `
.wf-hd { position: relative; }
.wf-hd--shadow { box-shadow: 0 1px 0 color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-hd--trans:not(.is-solid) { background: transparent; box-shadow: none; --wf-title: #fff; --wf-text: #fff; }
.wf-hd.is-solid { background: color-mix(in srgb, var(--wf-bg) 78%, transparent); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--wf-text) 10%, transparent); }
/* Previews clip the section list with overflow: hidden, which blocks sticky; clip does not */
.components-grid:has(.wf-hd--sticky) { overflow: clip; }
.wf-hd__inner { display: flex; align-items: center; gap: .75rem 1.25rem; flex-wrap: wrap; max-width: 1200px; margin-inline: auto;
  padding: .625rem 1rem; min-height: calc(var(--wf-hd-logo, 56px) + 1.25rem); }
.wf-hd__brand { display: inline-flex; align-items: center; flex: 0 0 auto; text-decoration: none; }
.wf-hd__logo { display: block; height: var(--wf-hd-logo, 56px); width: auto; max-width: 45vw; object-fit: contain; }
.wf-hd .wf-hd__logo--dark { display: none; }
.wf-hd__name { font-size: 1.25rem; font-weight: 800; color: var(--wf-title); }
.wf-hd__nav { display: flex; gap: .25rem; flex: 1 1 auto; justify-content: center; min-width: 0; }
.wf-hd__nav a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 .75rem; border-radius: 999px; color: var(--wf-text);
  font-weight: 600; font-size: .9375rem; text-decoration: none; white-space: nowrap; }
.wf-hd__nav a:hover { background: color-mix(in srgb, var(--wf-text) 8%, transparent); }
.wf-hd__nav a:focus-visible, .wf-hd__toggle:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 2px; }
.wf-hd__actions { display: flex; align-items: center; gap: .5rem; margin-inline-start: auto; }
.wf-hd__toggle { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; padding: 0; border: 0; border-radius: 999px; background: none;
  color: var(--wf-title); cursor: pointer; }
.wf-hd__toggle svg { width: 22px; height: 22px; }
.wf-hd__buy { min-height: 2.75rem; padding: .5rem 1.25rem; font-size: .9375rem; }
/* Centered logo: links on one side, actions on the other */
@container (min-width: 768px) {
  .wf-hd--center .wf-hd__inner { display: grid; grid-template-columns: 1fr auto 1fr; }
  .wf-hd--center .wf-hd__brand { grid-column: 2; grid-row: 1; }
  .wf-hd--center .wf-hd__nav { grid-column: 1; grid-row: 1; justify-content: flex-start; }
  .wf-hd--center .wf-hd__actions { grid-column: 3; grid-row: 1; }
}
/* Phones: links move to their own scrolling row under the logo */
@container (max-width: 767px) {
  .wf-hd__nav { order: 3; flex-basis: 100%; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; margin-inline: -1rem; padding-inline: 1rem; }
  .wf-hd__nav::-webkit-scrollbar { display: none; }
  .wf-hd--center .wf-hd__brand { order: 0; }
}
${["html.wf-mode-dark .wf-hd.wf-auto", ".wf-hd.wf-hd--trans:not(.is-solid)"].map(_).join("")}
@media (prefers-color-scheme: dark) { ${_("html:not(.wf-mode-light) .wf-hd.wf-auto")} }
`, V = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" /><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>`, R = n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>`;
function I() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
class h extends k {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "" }, this.mode = "light", this.solid = !1, this.busy = !1, this.modeKey = "", this.paletteKey = "", this.paletteVars = [], this.onScroll = () => {
      const e = !!d(this.config).sticky && this.getBoundingClientRect().top <= 1 && I() > 1;
      e !== this.solid && (this.solid = e);
    };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var t, s, o;
    super.connectedCallback(), this.classList.add("wf-host"), B(), P("wf-page-header", T), document.addEventListener("scroll", this.onScroll, { capture: !0, passive: !0 }), this.resizer = new ResizeObserver(() => this.frame()), this.resizer.observe(this);
    for (const r of [300, 1500]) window.setTimeout(() => this.requestUpdate(), r);
    const e = y();
    await ((t = e == null ? void 0 : e.onReady) == null ? void 0 : t.call(e)), this.store = { logo: ((s = e == null ? void 0 : e.config) == null ? void 0 : s.get("store.logo")) || "", name: ((o = e == null ? void 0 : e.config) == null ? void 0 : o.get("store.name")) || "" };
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), document.removeEventListener("scroll", this.onScroll, { capture: !0 }), (e = this.resizer) == null || e.disconnect(), this.unframe(), this.clearPalette(), this.modeKey = this.paletteKey = "", document.documentElement.classList.remove("wf-mode-dark", "wf-mode-light", "wf-mode-ready");
  }
  // Palette and mode are applied before the first paint, so the page never flashes the wrong colors
  willUpdate() {
    const e = d(this.config), t = j(e), s = JSON.stringify(t);
    if (s !== this.paletteKey) {
      this.paletteKey = s, this.clearPalette();
      for (const [r, a] of Object.entries(t)) document.documentElement.style.setProperty(r, a);
      this.paletteVars = Object.keys(t);
    }
    const o = `${this.baseMode()}|${this.toggleShown()}`;
    o !== this.modeKey && (this.modeKey = o, this.applyMode(E(this.baseMode(), this.toggleShown(), S(this.baseMode()))));
  }
  updated() {
    this.frame(), this.onScroll();
  }
  clearPalette() {
    for (const e of this.paletteVars) document.documentElement.style.removeProperty(e);
    this.paletteVars = [];
  }
  baseMode() {
    return String(u(d(this.config).default_mode) || "light");
  }
  toggleShown() {
    return d(this.config).show_mode_toggle !== !1;
  }
  applyMode(e) {
    this.mode = e, document.documentElement.classList.toggle("wf-mode-dark", e === "dark"), document.documentElement.classList.toggle("wf-mode-light", e === "light");
  }
  toggleMode() {
    const e = this.mode === "dark" ? "light" : "dark";
    document.documentElement.classList.add("wf-mode-ready"), this.applyMode(e), K(e, this.baseMode());
  }
  /**
   * White-on-image only works over the hero: without one, the header would put white text on the page
   * background, so it stays solid.
   */
  transparent() {
    if (!d(this.config).transparent) return !1;
    const e = document.querySelector(".wf-section");
    return !!(e != null && e.matches("[data-wf-hero].wf-hero--overlay"));
  }
  /** Sticky and the transparent overlap go on the outermost box of the section, the editor's card included. */
  frame() {
    const e = d(this.config), t = this.closest(".component-card") || this;
    this.framed && this.framed !== t && this.unframe();
    const s = !!e.sticky, o = this.transparent();
    t.style.position = s ? "sticky" : o ? "relative" : "", t.style.top = s ? "0" : "", t.style.zIndex = s || o ? "30" : "", t.style.marginBottom = o ? `-${this.offsetHeight}px` : "", document.documentElement.style.setProperty("--wf-hd-h", s ? `${this.offsetHeight}px` : "0px"), this.framed = t;
  }
  unframe() {
    this.framed && (this.framed.style.position = this.framed.style.top = this.framed.style.zIndex = this.framed.style.marginBottom = "", document.documentElement.style.removeProperty("--wf-hd-h"), this.framed = void 0);
  }
  goTo(e, t) {
    var o;
    const s = document.querySelector(`[data-wf-section="${CSS.escape(t)}"]`);
    s && (e.preventDefault(), s.scrollIntoView({ behavior: (o = window.matchMedia) != null && o.call(window, "(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));
  }
  async onBuy() {
    var t, s;
    if (this.busy) return;
    this.busy = !0;
    let e;
    try {
      e = await M();
    } finally {
      this.busy = !1;
    }
    e.kind === "error" && ((s = (t = y()) == null ? void 0 : t.error) == null || s.call(t, e.message));
  }
  render() {
    const e = d(this.config), t = Math.min(Math.max(Number(e.logo_height) || 56, 24), 140), s = [
      "wf-block wf-hd wf-auto",
      u(e.align) === "start" ? "" : "wf-hd--center",
      e.show_shadow !== !1 ? "wf-hd--shadow" : "",
      this.transparent() ? "wf-hd--trans" : "",
      e.sticky ? "wf-hd--sticky" : "",
      this.solid ? "is-solid" : ""
    ].filter(Boolean).join(" "), o = e.logo || this.store.logo, r = e.logo_dark || "", a = this.store.name, w = z(e.nav, "nav").map((i) => ({ label: b(i.label), target: L(i.target) })).filter((i) => i.label && i.target), v = e.show_buy !== !1 && C() !== "none", p = this.mode === "dark";
    return n`<header class=${s} style=${`--wf-hd-logo:${t}px`}>
      <div class="wf-hd__inner">
        <span class="wf-hd__brand">
          ${o ? n`<img class="wf-hd__logo wf-hd__logo--light${r ? " has-dark" : ""}" src=${o} alt=${a} />
                ${r ? n`<img class="wf-hd__logo wf-hd__logo--dark" src=${r} alt=${a} />` : f}` : n`<span class="wf-hd__name">${a}</span>`}
        </span>
        ${w.length ? n`<nav class="wf-hd__nav" aria-label=${g({ ar: "أقسام الصفحة", en: "Page sections" })}>
              ${w.map((i) => n`<a href=${`#${i.target}`} @click=${(x) => this.goTo(x, i.target)}>${i.label}</a>`)}
            </nav>` : f}
        <div class="wf-hd__actions">
          ${this.toggleShown() ? n`<button type="button" class="wf-hd__toggle" @click=${() => this.toggleMode()} aria-pressed=${p ? "true" : "false"}
                aria-label=${g({ ar: "الوضع الداكن", en: "Dark mode" })}>${p ? V : R}</button>` : f}
          ${v ? n`<button type="button" class="wf-btn wf-hd__buy" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.onBuy()}>
                ${b(e.buy_text) || g({ ar: "اشتري الآن", en: "Buy now" })}</button>` : f}
        </div>
      </div>
    </header>`;
  }
}
c([
  $({ type: Object })
], h.prototype, "config");
c([
  m()
], h.prototype, "store");
c([
  m()
], h.prototype, "mode");
c([
  m()
], h.prototype, "solid");
c([
  m()
], h.prototype, "busy");
typeof h < "u" && h.registerSallaComponent("salla-page-header");
export {
  h as default
};
