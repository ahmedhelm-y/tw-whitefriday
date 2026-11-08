import { html as a, nothing as n } from "lit";
import { g as d, r as o, i as v, t as s } from "./styles-DA4N1FjE.js";
import { W as g } from "./section-sTarKlwB.js";
const w = `
.wf-rv__summary { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .5rem 1rem; margin: -.5rem 0 1.75rem; text-align: center; }
.wf-rv__avg { font-size: 2.5rem; font-weight: 900; line-height: 1; color: var(--wf-title); }
.wf-rv__count { font-size: .9375rem; font-weight: 600; }
.wf-rv__stars { display: inline-flex; gap: .125rem; color: #f5a623; direction: ltr; }
.wf-rv__stars svg { width: 1.125rem; height: 1.125rem; }
.wf-rv__stars .is-off { color: color-mix(in srgb, var(--wf-text) 25%, transparent); }
.wf-rv__list { display: grid; grid-auto-flow: column; grid-auto-columns: min(85%, 20rem); gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory;
  margin-inline: -1rem; padding: 0 1rem .5rem; scrollbar-width: thin; }
@container (min-width: 900px) { .wf-rv__list { grid-auto-flow: row; grid-template-columns: repeat(3, minmax(0, 1fr)); overflow: visible; margin: 0; padding: 0; } }
.wf-rv__card { scroll-snap-align: start; display: grid; align-content: start; gap: .75rem; padding: 1.25rem; border-radius: 1.25rem; background: var(--wf-card); }
.wf-rv .wf-rv__text { font-size: .9688rem; line-height: 1.8; color: var(--wf-title); }
.wf-rv__photo { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: .875rem; }
.wf-rv__who { display: flex; align-items: center; gap: .625rem; }
.wf-rv__avatar { width: 2.5rem; height: 2.5rem; flex: 0 0 auto; display: grid; place-items: center; border-radius: 999px; object-fit: cover;
  background: color-mix(in srgb, var(--wf-accent) 16%, var(--wf-bg)); color: var(--wf-accent-ink); font-weight: 800; }
.wf-rv__who div b { display: block; font-size: .9375rem; color: var(--wf-title); }
.wf-rv__who div span { display: block; font-size: .8125rem; }
.wf-rv__verified { color: #12805c; font-weight: 700; }
.wf-rv__empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--wf-text) 35%, transparent); border-radius: 1rem; text-align: center; }
`, p = a`<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="m10 1.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" /></svg>`;
function _(t) {
  const e = Number(t);
  return !Number.isFinite(e) || e <= 0 ? 5 : Math.min(5, Math.max(1, Math.round(e * 2) / 2));
}
function u(t) {
  return t.length ? Math.round(t.reduce((e, i) => e + i, 0) / t.length * 10) / 10 : 0;
}
function h(t) {
  return t.trim().split(/\s+/).slice(0, 2).map((e) => e[0] || "").join("");
}
function m(t) {
  return a`<span class="wf-rv__stars" role="img" aria-label=${s({ ar: `${t} من 5`, en: `${t} out of 5` })}>
    ${[1, 2, 3, 4, 5].map((e) => a`<span class=${e <= Math.round(t) ? "" : "is-off"}>${p}</span>`)}</span>`;
}
class c extends g {
  constructor() {
    super(...arguments), this.styleId = "sale-reviews";
  }
  styles() {
    return w;
  }
  render() {
    const e = this.cfg(), i = d(e.items, "items").map((r) => ({
      name: o(r.name),
      city: o(r.city),
      rate: _(r.rate),
      text: o(r.text),
      image: String(r.image || ""),
      avatar: String(r.avatar || ""),
      verified: r.verified === !0,
      bought: o(r.bought)
    })).filter((r) => r.text);
    if (!i.length)
      return v() ? n : this.frame(a`<p class="wf-rv__empty">${s({ ar: "أضف آراء عملائك من إعدادات هذا القسم", en: "Add your customers' reviews in this section's settings" })}</p>`);
    const f = u(i.map((r) => r.rate)), l = Math.max(0, Math.round(Number(e.total_count) || 0));
    return this.frame(a`
      ${e.show_summary !== !1 ? a`<div class="wf-rv__summary"><span class="wf-rv__avg">${f.toFixed(1)}</span>${m(f)}
            <span class="wf-rv__count">${l ? s({ ar: `من ${l} تقييم في متجرنا`, en: `from ${l} reviews in our store` }) : s({ ar: `من ${i.length} آراء`, en: `from ${i.length} reviews` })}</span></div>` : n}
      <ul class="wf-rv__list">${i.map((r) => a`<li class="wf-rv__card">
        ${m(r.rate)}
        <p class="wf-rv__text">${r.text}</p>
        ${r.image ? a`<img class="wf-rv__photo" src=${r.image} alt="" loading="lazy" />` : n}
        <div class="wf-rv__who">
          ${r.avatar ? a`<img class="wf-rv__avatar" src=${r.avatar} alt="" loading="lazy" />` : a`<span class="wf-rv__avatar" aria-hidden="true">${h(r.name)}</span>`}
          <div><b>${r.name}</b>
            <span>${[r.city, r.bought].filter(Boolean).join(" · ")}</span>
            ${r.verified ? a`<span class="wf-rv__verified">✓ ${s({ ar: "اشترى من المتجر", en: "Verified buyer" })}</span>` : n}</div>
        </div></li>`)}</ul>
      ${this.renderCta()}`, { extraClass: "wf-rv" });
  }
}
typeof c < "u" && c.registerSallaComponent("salla-sale-reviews");
export {
  u as averageRate,
  c as default,
  h as initials,
  _ as starValue
};
