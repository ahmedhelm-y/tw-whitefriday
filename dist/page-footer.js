import { LitElement as v, nothing as f, html as e } from "lit";
import { property as u, state as b } from "lit/decorators.js";
import { e as x, b as k, c as z, r as d, g as C, w as j, s as L, d as P, t as w, h as R } from "./styles-CBhBCxUD.js";
var F = Object.defineProperty, h = (c, t, l, n) => {
  for (var o = void 0, a = c.length - 1, s; a >= 0; a--)
    (s = c[a]) && (o = s(t, l, o) || o);
  return o && F(t, l, o), o;
};
const _ = (c) => `
${c} .wf-ft__logo--light.has-dark { display: none; }
${c} .wf-ft__logo--dark { display: block; }
${c} .wf-ft__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`, O = `
.wf-ft { padding-block: 2.5rem 1.25rem; border-top: 1px solid color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-ft__top { display: grid; gap: 1.75rem; }
@container (min-width: 768px) { .wf-ft__top { grid-template-columns: 2fr 1fr; align-items: start; } }
.wf-ft__logo { display: block; height: 48px; width: auto; max-width: 60%; object-fit: contain; }
.wf-ft .wf-ft__logo--dark { display: none; }
.wf-ft__name { font-size: 1.25rem; font-weight: 800; color: var(--wf-title); }
.wf-ft__about { margin-top: .75rem; max-width: 36rem; font-size: .9375rem; line-height: 1.8; color: var(--wf-text); }
.wf-ft__contact { display: grid; gap: .25rem; }
.wf-ft__contact a { display: inline-flex; align-items: center; gap: .5rem; min-height: 2.75rem; color: var(--wf-text); text-decoration: none; font-weight: 600; }
.wf-ft__contact a:hover { color: var(--wf-accent-ink); }
.wf-ft__contact i { font-size: 1.125rem; color: var(--wf-accent-ink); }
.wf-ft__social { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; }
.wf-ft__social a { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; border-radius: 999px; background: var(--wf-card);
  color: var(--wf-title); font-size: 1.125rem; text-decoration: none; }
.wf-ft__social a:hover { background: var(--wf-accent); color: var(--wf-accent-text); }
.wf-ft a:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 2px; }
.wf-ft__bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.25rem;
  border-top: 1px solid color-mix(in srgb, var(--wf-text) 10%, transparent); }
.wf-ft__payments { display: flex; flex-wrap: wrap; gap: .5rem; }
.wf-ft__payments img { width: 3rem; height: 2rem; object-fit: contain; padding: .25rem; border-radius: .375rem; background: #fff; }
.wf-ft__copy { font-size: .8125rem; color: var(--wf-text); }
${[".wf-ft.wf-dark", "html.wf-mode-dark .wf-ft.wf-auto"].map(_).join("")}
@media (prefers-color-scheme: dark) { ${_("html:not(.wf-mode-light) .wf-ft.wf-auto")} }
`;
class m extends v {
  constructor() {
    super(...arguments), this.store = { logo: "", name: "", payments: [] };
  }
  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    var n, o, a, s;
    super.connectedCallback(), this.classList.add("wf-host"), x(), k("wf-page-footer", O);
    const t = R();
    await ((n = t == null ? void 0 : t.onReady) == null ? void 0 : n.call(t));
    const l = ((o = t == null ? void 0 : t.config) == null ? void 0 : o.get("store.settings.payments")) || [];
    this.store = {
      logo: ((a = t == null ? void 0 : t.config) == null ? void 0 : a.get("store.logo")) || "",
      name: ((s = t == null ? void 0 : t.config) == null ? void 0 : s.get("store.name")) || "",
      payments: l.map((i) => {
        var p, g;
        return { src: ((g = (p = t == null ? void 0 : t.url) == null ? void 0 : p.cdn) == null ? void 0 : g.call(p, `images/payment/${i}_mini.png`, 116, 116)) || "", name: i };
      }).filter((i) => i.src)
    };
  }
  render() {
    const t = z(this.config), l = t.logo || this.store.logo, n = this.store.name, o = d(t.about), a = String(t.phone || "").trim(), s = String(t.whatsapp || "").replace(/[^\d]/g, ""), i = String(t.email || "").trim(), p = C(t.social, "social").map((r) => ({ icon: String(r.icon || "sicon-link"), url: j(r.url) })).filter((r) => r.url), g = (/* @__PURE__ */ new Date()).getFullYear(), $ = (d(t.copyright) || "© {year} {store}").replace("{year}", String(g)).replace("{store}", n), y = a || s || i;
    return e`<footer class=${`wf-block wf-ft ${L(t)}`} style=${P(t)}>
      <div class="wf-container">
        <div class="wf-ft__top">
          <div>
            ${l ? e`<img class="wf-ft__logo wf-ft__logo--light${t.logo_dark ? " has-dark" : ""}" src=${l} alt=${n} loading="lazy" />
                  ${t.logo_dark ? e`<img class="wf-ft__logo wf-ft__logo--dark" src=${t.logo_dark} alt=${n} loading="lazy" />` : f}` : e`<span class="wf-ft__name">${n}</span>`}
            ${o ? e`<p class="wf-ft__about">${o}</p>` : f}
            ${p.length ? e`<div class="wf-ft__social">${p.map((r) => e`<a href=${r.url} target="_blank" rel="noopener" aria-label=${r.icon.replace(/^sicon-/, "")}><i class=${r.icon}></i></a>`)}</div>` : f}
          </div>
          ${y ? e`<div class="wf-ft__contact" aria-label=${w({ ar: "تواصل معنا", en: "Contact us" })}>
                ${a ? e`<a href=${`tel:${a.replace(/[^\d+]/g, "")}`}><i class="sicon-phone"></i><span dir="ltr">${a}</span></a>` : f}
                ${s ? e`<a href=${`https://wa.me/${s}`} target="_blank" rel="noopener"><i class="sicon-whatsapp"></i>${w({ ar: "واتساب", en: "WhatsApp" })}</a>` : f}
                ${i ? e`<a href=${`mailto:${i}`}><i class="sicon-mail"></i><span dir="ltr">${i}</span></a>` : f}
              </div>` : f}
        </div>
        <div class="wf-ft__bottom">
          ${t.show_payments !== !1 && this.store.payments.length ? e`<div class="wf-ft__payments">${this.store.payments.map((r) => e`<img src=${r.src} alt=${r.name} loading="lazy" />`)}</div>` : f}
          <p class="wf-ft__copy">${$}</p>
        </div>
      </div>
    </footer>`;
  }
}
h([
  u({ type: Object })
], m.prototype, "config");
h([
  b()
], m.prototype, "store");
typeof m < "u" && m.registerSallaComponent("salla-page-footer");
export {
  m as default
};
