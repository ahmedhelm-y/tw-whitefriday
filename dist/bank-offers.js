import { nothing as s, html as r } from "lit";
import { state as m } from "lit/decorators.js";
import { a as p, d as g } from "./codecard-mxGB7zrM.js";
import { g as _, r as c, i as b, t as a } from "./styles-B5EzsqQ8.js";
import { i as u } from "./coupon-MHx38xkB.js";
import { W as w } from "./section-CJM2ceBk.js";
var h = Object.defineProperty, y = (n, o, i, e) => {
  for (var t = void 0, l = n.length - 1, f; l >= 0; l--)
    (f = n[l]) && (t = f(o, i, t) || t);
  return t && h(o, i, t), t;
};
const x = `
.wf-bo__list { display: grid; gap: .75rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); padding: 0; margin: 0; list-style: none; }
.wf-bo__item { display: flex; align-items: center; gap: .875rem; padding: 1rem; border-radius: 1.125rem; background: var(--wf-card); }
.wf-bo__logo { flex: 0 0 auto; width: 4rem; height: 3rem; display: grid; place-items: center; border-radius: .625rem; background: #fff; overflow: hidden; }
.wf-bo__logo img { max-width: 90%; max-height: 80%; object-fit: contain; }
.wf-bo__text { display: grid; gap: .125rem; flex: 1 1 auto; min-width: 0; }
.wf-bo__title { font-weight: 900; font-size: 1.0625rem; color: var(--wf-title); }
.wf-bo__desc { font-size: .8125rem; }
.wf-bo__code { flex: 0 0 auto; display: grid; justify-items: center; gap: .125rem; padding: .375rem .75rem; border: 1.5px dashed var(--wf-accent-ink); border-radius: .625rem;
  background: none; color: var(--wf-title); font: inherit; font-weight: 900; letter-spacing: .08em; cursor: pointer; direction: ltr; min-height: 2.75rem; }
.wf-bo__code small { font-size: .6875rem; font-weight: 700; letter-spacing: 0; color: var(--wf-accent-ink); }
.wf-bo__code:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 2px; }
`;
class d extends w {
  constructor() {
    super(...arguments), this.styleId = "bank-offers", this.copied = "";
  }
  styles() {
    return x;
  }
  render() {
    const o = _(this.cfg().offers, "offers").map((e) => ({ logo: String(e.logo || ""), title: c(e.title), desc: c(e.desc), code: String(e.code || "").trim(), ends: e.ends })).filter((e) => e.title && !u(e.ends));
    if (!o.length)
      return b() ? s : this.frame(r`<p class="wf-empty">${a({ ar: "أضف عروض البنوك وطرق الدفع", en: "Add the bank and payment offers" })}</p>`);
    const i = p(this.cfg());
    return this.frame(r`<ul class="wf-bo__list">${o.map((e) => r`<li class="wf-bo__item">
      ${e.logo ? r`<span class="wf-bo__logo"><img src=${e.logo} alt="" loading="lazy" /></span>` : s}
      <span class="wf-bo__text"><span class="wf-bo__title">${e.title}</span>${e.desc ? r`<span class="wf-bo__desc">${e.desc}</span>` : s}</span>
      ${e.code && i ? r`<button type="button" class="wf-bo__code" aria-label=${a({ ar: `انسخي الكود ${e.code}`, en: `Copy code ${e.code}` })}
            @click=${async (t) => {
      await g(e.code, t.currentTarget), this.copied = e.code;
    }}>
            ${e.code}<small>${this.copied === e.code ? a({ ar: "اتنسخ ✓", en: "Copied ✓" }) : a({ ar: "اضغطي للنسخ", en: "Tap to copy" })}</small></button>` : s}
    </li>`)}</ul>`, { extraClass: "wf-bo" });
  }
}
y([
  m()
], d.prototype, "copied");
typeof d < "u" && d.registerSallaComponent("salla-bank-offers");
export {
  d as default
};
