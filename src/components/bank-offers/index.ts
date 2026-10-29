import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { codesReady, copyCode } from "../../utils/codecard";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { isExpired } from "../../utils/coupon";
import { isLandingPage } from "../../utils/landing";
import { WfSection } from "../../utils/section";

const css = `
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

type Offer = { logo: unknown; title: unknown; desc: unknown; code: unknown; ends: unknown };

export default class BankOffers extends WfSection {
  protected readonly styleId = "bank-offers";
  @state() private copied = "";

  protected styles() {
    return css;
  }

  render() {
    const offers = getCollectionItems<Offer>(this.cfg().offers, "offers")
      .map((o) => ({ logo: String(o.logo || ""), title: resolveText(o.title), desc: resolveText(o.desc), code: String(o.code || "").trim(), ends: o.ends }))
      .filter((o) => o.title && !isExpired(o.ends));
    if (!offers.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-empty">${t({ ar: "أضف عروض البنوك وطرق الدفع", en: "Add the bank and payment offers" })}</p>`);
    }
    const ready = codesReady(this.cfg());
    return this.frame(html`<ul class="wf-bo__list">${offers.map((o) => html`<li class="wf-bo__item">
      ${o.logo ? html`<span class="wf-bo__logo"><img src=${o.logo} alt="" loading="lazy" /></span>` : nothing}
      <span class="wf-bo__text"><span class="wf-bo__title">${o.title}</span>${o.desc ? html`<span class="wf-bo__desc">${o.desc}</span>` : nothing}</span>
      ${o.code && ready
        ? html`<button type="button" class="wf-bo__code" aria-label=${t({ ar: `انسخي الكود ${o.code}`, en: `Copy code ${o.code}` })}
            @click=${async (e: Event) => { await copyCode(o.code, e.currentTarget as Element); this.copied = o.code; }}>
            ${o.code}<small>${this.copied === o.code ? t({ ar: "اتنسخ ✓", en: "Copied ✓" }) : t({ ar: "اضغطي للنسخ", en: "Tap to copy" })}</small></button>`
        : nothing}
    </li>`)}</ul>`, { extraClass: "wf-bo" });
  }
}
