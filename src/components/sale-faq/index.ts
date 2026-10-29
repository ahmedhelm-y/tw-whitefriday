import { html, nothing } from "lit";
import { getCollectionItems, getLocale, resolveText, t } from "../../utils/config";
import { formatDay } from "../../utils/eta";
import { isLandingPage } from "../../utils/landing";
import { readSale } from "../../utils/sale";
import { WfSection } from "../../utils/section";

const css = `
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

export default class SaleFaq extends WfSection {
  protected readonly styleId = "sale-faq";

  protected styles() {
    return css;
  }

  /** "When does it start?" answered from the hero's own dates, so it never goes stale. */
  private dateQuestion(): { q: string; a: string } | null {
    if (this.cfg().auto_date === false) return null;
    const sale = readSale();
    if (!sale?.start) return null;
    const locale = getLocale();
    const day = (ms: number) => {
      const local = new Date(ms + 3 * 3600000);
      const time = `${String(local.getUTCHours()).padStart(2, "0")}:${String(local.getUTCMinutes()).padStart(2, "0")}`;
      return `${formatDay(local, locale)} ${t({ ar: "الساعة", en: "at" })} ${time}`;
    };
    return {
      q: t({ ar: "امتى يبدأ العرض وامتى يخلص؟", en: "When does the sale start and end?" }),
      a: `${t({ ar: "يبدأ", en: "Starts" })} ${day(sale.start)}${sale.end ? `، ${t({ ar: "ويخلص", en: "ends" })} ${day(sale.end)}` : ""}.`,
    };
  }

  render() {
    const own = getCollectionItems<{ q: unknown; a: unknown }>(this.cfg().faqs, "faqs").map((f) => ({ q: resolveText(f.q), a: resolveText(f.a) })).filter((f) => f.q && f.a);
    const auto = this.dateQuestion();
    const faqs = auto ? [auto, ...own] : own;
    if (!faqs.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-empty">${t({ ar: "أضف أسئلة العرض من إعدادات هذا القسم", en: "Add the sale questions in this section's settings" })}</p>`);
    }
    return this.frame(html`<div class="wf-fq__list">${faqs.map((f, i) => html`<details ?open=${i === 0}><summary>${f.q}</summary><p>${f.a}</p></details>`)}</div>`, { extraClass: "wf-fq" });
  }
}
