import { html, LitElement, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { buy, type BuyRequest } from "./buy";
import { schemeClass, sectionStyle } from "./colors";
import { anchorId, getConfig, resolveText, t } from "./config";
import { getSalla, isLandingPage, landingProductId } from "./landing";
import { offersOpen } from "./sale";
import { reveal } from "./reveal";
import { ensureBase, injectStyles } from "./styles";

/** The page's own product on a product page, else the product picked in the section's field. */
export function productIdFrom(cfg: Record<string, any>, field = "product"): string | null {
  const own = landingProductId();
  if (own) return own;
  const value = cfg[field];
  const first = Array.isArray(value) ? value[0] : value;
  const id = first && typeof first === "object" ? first.value ?? first.id : first;
  return id ? String(id) : null;
}

/**
 * Shared base for the bundle's sections: light DOM, one stylesheet per section type, the section frame
 * with its colors, title and anchor, the reveal animation, and the buy button's busy and error states.
 */
export abstract class WfSection extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() protected busy = false;
  @state() protected error = "";

  /** Sale sections stay hidden from shoppers until the sale opens (or early access does). */
  protected readonly gated: boolean = false;
  private onSale = () => this.requestUpdate();

  /** True when a shopper should not see this section yet; the editor always shows it. */
  protected closed(): boolean {
    return this.gated && isLandingPage() && !offersOpen();
  }

  /** Short id for this section type's stylesheet, e.g. "hero". */
  protected abstract readonly styleId: string;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("wf-host");
    ensureBase();
    injectStyles(`wf-${this.styleId}`, this.styles());
    window.addEventListener("wf:sale", this.onSale);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("wf:sale", this.onSale);
  }

  protected firstUpdated() {
    const container = this.querySelector(".wf-section:not([data-wf-hero]) > .wf-container");
    if (container) reveal(container);
  }

  protected cfg(): Record<string, any> {
    return getConfig(this.config);
  }

  protected styles(): string {
    return "";
  }

  protected buyLabel(): string {
    return resolveText(this.cfg().buy_text) || t({ ar: "اشتري الآن", en: "Buy now" });
  }

  protected async press(req: BuyRequest = {}): Promise<void> {
    if (this.busy) return;
    this.busy = true;
    this.error = "";
    let result;
    try {
      result = await buy(req);
    } finally {
      this.busy = false;
    }
    if (result.kind === "error") {
      this.error = result.message || "";
      (getSalla() as any)?.error?.(result.message);
    }
  }

  protected frame(body: TemplateResult | typeof nothing, o: { extraClass?: string; hero?: boolean; title?: boolean } = {}) {
    const cfg = this.cfg();
    const title = o.title === false ? "" : resolveText(cfg.title);
    const subtitle = o.title === false ? "" : resolveText(cfg.subtitle);
    const anchor = anchorId(cfg.section_id);
    const classes = ["wf-block wf-section", schemeClass(cfg), o.extraClass || ""].filter(Boolean).join(" ");
    return html`<section class=${classes} style=${sectionStyle(cfg)} data-wf-section=${anchor || nothing}
      ?data-wf-hero=${Boolean(o.hero)}>
      <div class="wf-container">
        ${title || subtitle
          ? html`<div class="wf-title">${title ? html`<h2>${title}</h2>` : nothing}${subtitle ? html`<p>${subtitle}</p>` : nothing}</div>`
          : nothing}
        ${body}
        ${this.error ? html`<p class="wf-error" role="alert">${this.error}</p>` : nothing}
      </div>
    </section>`;
  }
}
