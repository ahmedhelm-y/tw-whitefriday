import { nothing as m, html as i } from "lit";
import { a as d, t as r, g as c, r as o, i as u } from "./styles-CBhBCxUD.js";
import { f as p } from "./eta-DuPtGS8w.js";
import { W as g, r as h } from "./section-Bp25z5NG.js";
const q = `
.wf-fq__list { display: grid; gap: .5rem; max-width: 52rem; margin-inline: auto; }
.wf-fq__list details { border-radius: 1rem; background: var(--wf-card); }
.wf-fq__list summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3.25rem; padding: .75rem 1.125rem;
  font-weight: 800; color: var(--wf-title); cursor: pointer; list-style: none; }
.wf-fq__list summary::-webkit-details-marker { display: none; }
.wf-fq__list summary::after { content: "+"; font-size: 1.375rem; line-height: 1; color: var(--wf-accent-ink); }
.wf-fq__list details[open] summary::after { content: "−"; }
.wf-fq__list summary:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: -2px; border-radius: 1rem; }
.wf-fq__list p { margin: 0; padding: 0 1.125rem 1rem; line-height: 1.8; white-space: pre-line; }
`;
class l extends g {
  constructor() {
    super(...arguments), this.styleId = "sale-faq";
  }
  styles() {
    return q;
  }
  /** "When does it start?" answered from the hero's own dates, so it never goes stale. */
  dateQuestion() {
    if (this.cfg().auto_date === !1) return null;
    const t = h();
    if (!(t != null && t.start)) return null;
    const n = d(), a = (e) => {
      const s = new Date(e + 108e5), f = `${String(s.getUTCHours()).padStart(2, "0")}:${String(s.getUTCMinutes()).padStart(2, "0")}`;
      return `${p(s, n)} ${r({ ar: "الساعة", en: "at" })} ${f}`;
    };
    return {
      q: r({ ar: "امتى يبدأ العرض وامتى يخلص؟", en: "When does the sale start and end?" }),
      a: `${r({ ar: "يبدأ", en: "Starts" })} ${a(t.start)}${t.end ? `، ${r({ ar: "ويخلص", en: "ends" })} ${a(t.end)}` : ""}.`
    };
  }
  render() {
    const t = c(this.cfg().faqs, "faqs").map((e) => ({ q: o(e.q), a: o(e.a) })).filter((e) => e.q && e.a), n = this.dateQuestion(), a = n ? [n, ...t] : t;
    return a.length ? this.frame(i`<div class="wf-fq__list">${a.map((e, s) => i`<details ?open=${s === 0}><summary>${e.q}</summary><p>${e.a}</p></details>`)}</div>`, { extraClass: "wf-fq" }) : u() ? m : this.frame(i`<p class="wf-empty">${r({ ar: "أضف أسئلة العرض من إعدادات هذا القسم", en: "Add the sale questions in this section's settings" })}</p>`);
  }
}
typeof l < "u" && l.registerSallaComponent("salla-sale-faq");
export {
  l as default
};
