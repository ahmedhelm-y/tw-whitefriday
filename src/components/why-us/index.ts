import { html, nothing } from "lit";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { isLandingPage } from "../../utils/landing";
import { WfSection } from "../../utils/section";

const css = `
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

type Item = { icon: unknown; title: unknown; text: unknown };

/** Why buy here: the shopper's worry about sale shopping, then what the store does about it. */
export default class WhyUs extends WfSection {
  protected readonly styleId = "why-us";

  protected styles() {
    return css;
  }

  render() {
    const cfg = this.cfg();
    const items = getCollectionItems<Item>(cfg.items, "items")
      .map((i) => ({ icon: String(i.icon || "sicon-check"), title: resolveText(i.title), text: resolveText(i.text) }))
      .filter((i) => i.title);
    if (!items.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-wu__empty">${t({ ar: "أضف مميزات متجرك من إعدادات هذا القسم", en: "Add your store's benefits in this section's settings" })}</p>`);
    }
    const worry = resolveText(cfg.worry);
    return this.frame(html`
      ${worry ? html`<p class="wf-wu__worry">${worry}</p>` : nothing}
      <ul class="wf-wu__grid">${items.map((i) => html`<li class="wf-wu__item">
        <i class=${`wf-wu__icon ${i.icon}`} aria-hidden="true"></i>
        <h3>${i.title}</h3>${i.text ? html`<p>${i.text}</p>` : nothing}</li>`)}</ul>
      ${this.renderCta()}`, { extraClass: "wf-wu" });
  }
}
