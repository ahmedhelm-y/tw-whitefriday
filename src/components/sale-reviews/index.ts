import { html, nothing } from "lit";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { isLandingPage } from "../../utils/landing";
import { WfSection } from "../../utils/section";

const css = `
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
`;

const STAR = html`<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="m10 1.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" /></svg>`;

type Item = { name: unknown; city: unknown; rate: unknown; text: unknown; image: unknown; avatar: unknown; verified: unknown; bought: unknown };

/** Rounded to the nearest half star, between 1 and 5. */
export function starValue(rate: unknown): number {
  const n = Number(rate);
  if (!Number.isFinite(n) || n <= 0) return 5;
  return Math.min(5, Math.max(1, Math.round(n * 2) / 2));
}

/** The average of the shown reviews, with one decimal. */
export function averageRate(rates: number[]): number {
  if (!rates.length) return 0;
  return Math.round((rates.reduce((a, b) => a + b, 0) / rates.length) * 10) / 10;
}

export function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0] || "").join("");
}

function stars(value: number) {
  return html`<span class="wf-rv__stars" role="img" aria-label=${t({ ar: `${value} من 5`, en: `${value} out of 5` })}>
    ${[1, 2, 3, 4, 5].map((i) => html`<span class=${i <= Math.round(value) ? "" : "is-off"}>${STAR}</span>`)}</span>`;
}

/** Social proof for the sale: what shoppers said, written in by the merchant from real orders. */
export default class SaleReviews extends WfSection {
  protected readonly styleId = "sale-reviews";

  protected styles() {
    return css;
  }

  render() {
    const cfg = this.cfg();
    const items = getCollectionItems<Item>(cfg.items, "items")
      .map((r) => ({ name: resolveText(r.name), city: resolveText(r.city), rate: starValue(r.rate), text: resolveText(r.text),
        image: String(r.image || ""), avatar: String(r.avatar || ""), verified: r.verified === true, bought: resolveText(r.bought) }))
      .filter((r) => r.text);
    if (!items.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-rv__empty">${t({ ar: "أضف آراء عملائك من إعدادات هذا القسم", en: "Add your customers' reviews in this section's settings" })}</p>`);
    }
    const avg = averageRate(items.map((r) => r.rate));
    const total = Math.max(0, Math.round(Number(cfg.total_count) || 0));
    return this.frame(html`
      ${cfg.show_summary !== false
        ? html`<div class="wf-rv__summary"><span class="wf-rv__avg">${avg.toFixed(1)}</span>${stars(avg)}
            <span class="wf-rv__count">${total
              ? t({ ar: `من ${total} تقييم في متجرنا`, en: `from ${total} reviews in our store` })
              : t({ ar: `من ${items.length} آراء`, en: `from ${items.length} reviews` })}</span></div>`
        : nothing}
      <ul class="wf-rv__list">${items.map((r) => html`<li class="wf-rv__card">
        ${stars(r.rate)}
        <p class="wf-rv__text">${r.text}</p>
        ${r.image ? html`<img class="wf-rv__photo" src=${r.image} alt="" loading="lazy" />` : nothing}
        <div class="wf-rv__who">
          ${r.avatar ? html`<img class="wf-rv__avatar" src=${r.avatar} alt="" loading="lazy" />` : html`<span class="wf-rv__avatar" aria-hidden="true">${initials(r.name)}</span>`}
          <div><b>${r.name}</b>
            <span>${[r.city, r.bought].filter(Boolean).join(" · ")}</span>
            ${r.verified ? html`<span class="wf-rv__verified">✓ ${t({ ar: "اشترى من المتجر", en: "Verified buyer" })}</span>` : nothing}</div>
        </div></li>`)}</ul>
      ${this.renderCta()}`, { extraClass: "wf-rv" });
  }
}
