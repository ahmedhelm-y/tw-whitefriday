import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { getSalla, isLandingPage, money } from "../../utils/landing";
import { tierProgress, type Tier } from "../../utils/sale";
import { WfSection } from "../../utils/section";

const css = `
.wf-tb__steps { position: relative; display: grid; grid-template-columns: repeat(var(--wf-tb-n, 3), minmax(0, 1fr)); gap: .75rem; padding: 0; margin: 0; list-style: none; }
.wf-tb__step { display: grid; gap: .375rem; justify-items: center; padding: 1.125rem .75rem; border-radius: 1.125rem; background: var(--wf-card); text-align: center; }
.wf-tb__step b { font-size: 1.375rem; font-weight: 900; color: var(--wf-title); line-height: 1.3; }
.wf-tb__step span { font-size: .875rem; }
.wf-tb__step.is-on { background: var(--wf-accent); }
.wf-tb__step.is-on b, .wf-tb__step.is-on span { color: var(--wf-accent-text); }
.wf-tb__track { height: .625rem; margin-top: 1.25rem; border-radius: 999px; background: color-mix(in srgb, var(--wf-text) 15%, transparent); overflow: hidden; }
.wf-tb__fill { height: 100%; border-radius: 999px; background: var(--wf-accent); transition: width .5s ease; }
.wf-tb__msg { margin: .75rem 0 0; text-align: center; font-weight: 700; color: var(--wf-title); }
@container (max-width: 520px) { .wf-tb__steps { grid-template-columns: minmax(0, 1fr); } }
@media (prefers-reduced-motion: reduce) { .wf-tb__fill { transition: none; } }
`;

/** The cart's total from whichever shape the cart API answers with; null when it cannot be read. */
function cartTotal(res: any): number | null {
  const cart = res?.data?.cart || res?.data || res?.cart;
  const value = cart?.sub_total ?? cart?.total ?? cart?.total_price;
  const n = Number(typeof value === "object" ? value?.amount : value);
  return Number.isFinite(n) ? n : null;
}

export default class TierBar extends WfSection {
  protected readonly styleId = "tier-bar";
  @state() private total: number | null = null;
  private onCart = () => this.readCart();

  protected styles() {
    return css;
  }

  connectedCallback() {
    super.connectedCallback();
    this.readCart();
    window.addEventListener("wf:cart", this.onCart);
    window.addEventListener("focus", this.onCart);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("wf:cart", this.onCart);
    window.removeEventListener("focus", this.onCart);
  }

  private async readCart() {
    try {
      const Salla = getSalla() as any;
      await Salla?.onReady?.();
      const details = Salla?.cart?.api?.details;
      if (typeof details !== "function") return;
      this.total = cartTotal(await details.call(Salla.cart.api));
    } catch {
      // no cart yet, or the page cannot read it: the tiers still show without progress
    }
  }

  render() {
    const cfg = this.cfg();
    const tiers: Tier[] = getCollectionItems<{ amount: unknown; reward: unknown }>(cfg.tiers, "tiers")
      .map((x) => ({ amount: Number(x.amount) || 0, reward: resolveText(x.reward) }))
      .filter((x) => x.amount > 0 && x.reward)
      .sort((a, b) => a.amount - b.amount)
      .slice(0, 4);
    if (!tiers.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-empty">${t({ ar: "أضف المستويات: المبلغ والمكافأة", en: "Add the tiers: amount and reward" })}</p>`);
    }
    const progress = this.total !== null ? tierProgress(this.total, tiers) : null;
    return this.frame(html`
      <ol class="wf-tb__steps" style=${`--wf-tb-n:${tiers.length}`}>
        ${tiers.map((tier, i) => html`<li class=${`wf-tb__step${progress && i < progress.reached ? " is-on" : ""}`}>
          <span>${t({ ar: "اشتري بـ", en: "Spend" })} ${unsafeHTML(money(tier.amount))}</span><b>${tier.reward}</b></li>`)}
      </ol>
      ${progress
        ? html`<div class="wf-tb__track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow=${progress.percent}>
            <div class="wf-tb__fill" style=${`width:${progress.percent}%`}></div></div>
          <p class="wf-tb__msg" aria-live="polite">${progress.next
            ? html`${t({ ar: "باقيلك", en: "Only" })} ${unsafeHTML(money(progress.left))} ${t({ ar: `وتاخدي ${progress.next.reward}`, en: `more for ${progress.next.reward}` })}`
            : t({ ar: "وصلتي لأعلى مستوى 🎉", en: "You reached the top tier" })}</p>`
        : nothing}`, { extraClass: "wf-tb" });
  }
}
