import { nothing as t, html as r } from "lit";
import { g as m, r as i, i as w, t as l } from "./styles-DA4N1FjE.js";
import { W as c } from "./section-sTarKlwB.js";
const f = `
.wf-wu .wf-wu__worry { max-width: 44rem; margin: -.75rem auto 2rem; padding: 1rem 1.25rem; border-radius: 1rem; text-align: center;
  background: color-mix(in srgb, var(--wf-accent) 10%, var(--wf-card)); color: var(--wf-title); font-weight: 700; line-height: 1.8; }
.wf-wu__grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); }
.wf-wu__item { display: grid; align-content: start; gap: .625rem; padding: 1.5rem 1.25rem; border-radius: 1.25rem; background: var(--wf-card); }
.wf-wu__icon { width: 3rem; height: 3rem; display: grid; place-items: center; border-radius: .875rem;
  background: color-mix(in srgb, var(--wf-accent) 14%, var(--wf-bg)); color: var(--wf-accent-ink); font-size: 1.5rem; font-style: normal; }
.wf-wu .wf-wu__item h3 { font-size: 1.0625rem; font-weight: 800; line-height: 1.5; color: var(--wf-title); }
.wf-wu .wf-wu__item p { font-size: .9375rem; line-height: 1.7; }
.wf-wu__empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--wf-text) 35%, transparent); border-radius: 1rem; text-align: center; }
`;
class o extends c {
  constructor() {
    super(...arguments), this.styleId = "why-us";
  }
  styles() {
    return f;
  }
  render() {
    const s = this.cfg(), a = m(s.items, "items").map((e) => ({ icon: String(e.icon || "sicon-check"), title: i(e.title), text: i(e.text) })).filter((e) => e.title);
    if (!a.length)
      return w() ? t : this.frame(r`<p class="wf-wu__empty">${l({ ar: "أضف مميزات متجرك من إعدادات هذا القسم", en: "Add your store's benefits in this section's settings" })}</p>`);
    const n = i(s.worry);
    return this.frame(r`
      ${n ? r`<p class="wf-wu__worry">${n}</p>` : t}
      <ul class="wf-wu__grid">${a.map((e) => r`<li class="wf-wu__item">
        <i class=${`wf-wu__icon ${e.icon}`} aria-hidden="true"></i>
        <h3>${e.title}</h3>${e.text ? r`<p>${e.text}</p>` : t}</li>`)}</ul>
      ${this.renderCta()}`, { extraClass: "wf-wu" });
  }
}
typeof o < "u" && o.registerSallaComponent("salla-why-us");
export {
  o as default
};
