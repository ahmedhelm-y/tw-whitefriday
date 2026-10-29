import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { buy, buyAction } from "../../utils/buy";
import { anchorId, getCollectionItems, getConfig, resolveText, t, unwrapValue } from "../../utils/config";
import { getColorMode, type Mode, pagePaletteVars, resolveColorMode, setColorMode } from "../../utils/colors";
import { getSalla } from "../../utils/landing";
import { ensureBase, injectStyles } from "../../utils/styles";

// Every state where the header sits on a dark background: dark page mode, or transparent over the hero
const darkRules = (scope: string) => `
${scope} .wf-hd__logo--light.has-dark { display: none; }
${scope} .wf-hd__logo--dark { display: block; }
${scope} .wf-hd__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`;

const css = `
.wf-hd { position: relative; }
.wf-hd--shadow { box-shadow: 0 1px 0 color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-hd--trans:not(.is-solid) { background: transparent; box-shadow: none; --wf-title: #fff; --wf-text: #fff; }
.wf-hd.is-solid { background: color-mix(in srgb, var(--wf-bg) 78%, transparent); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  box-shadow: 0 1px 0 color-mix(in srgb, var(--wf-text) 10%, transparent); }
/* Previews clip the section list with overflow: hidden, which blocks sticky; clip does not */
.components-grid:has(.wf-hd--sticky) { overflow: clip; }
.wf-hd__inner { display: flex; align-items: center; gap: .75rem 1.25rem; flex-wrap: wrap; max-width: 1200px; margin-inline: auto;
  padding: .625rem 1rem; min-height: calc(var(--wf-hd-logo, 56px) + 1.25rem); }
.wf-hd__brand { display: inline-flex; align-items: center; flex: 0 0 auto; text-decoration: none; }
.wf-hd__logo { display: block; height: var(--wf-hd-logo, 56px); width: auto; max-width: 45vw; object-fit: contain; }
.wf-hd .wf-hd__logo--dark { display: none; }
.wf-hd__name { font-size: 1.25rem; font-weight: 800; color: var(--wf-title); }
.wf-hd__nav { display: flex; gap: .25rem; flex: 1 1 auto; justify-content: center; min-width: 0; }
.wf-hd__nav a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 .75rem; border-radius: 999px; color: var(--wf-text);
  font-weight: 600; font-size: .9375rem; text-decoration: none; white-space: nowrap; }
.wf-hd__nav a:hover { background: color-mix(in srgb, var(--wf-text) 8%, transparent); }
.wf-hd__nav a:focus-visible, .wf-hd__toggle:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 2px; }
.wf-hd__actions { display: flex; align-items: center; gap: .5rem; margin-inline-start: auto; }
.wf-hd__toggle { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; padding: 0; border: 0; border-radius: 999px; background: none;
  color: var(--wf-title); cursor: pointer; }
.wf-hd__toggle svg { width: 22px; height: 22px; }
.wf-hd__buy { min-height: 2.75rem; padding: .5rem 1.25rem; font-size: .9375rem; }
/* Centered logo: links on one side, actions on the other */
@container (min-width: 768px) {
  .wf-hd--center .wf-hd__inner { display: grid; grid-template-columns: 1fr auto 1fr; }
  .wf-hd--center .wf-hd__brand { grid-column: 2; grid-row: 1; }
  .wf-hd--center .wf-hd__nav { grid-column: 1; grid-row: 1; justify-content: flex-start; }
  .wf-hd--center .wf-hd__actions { grid-column: 3; grid-row: 1; }
}
/* Phones: links move to their own scrolling row under the logo */
@container (max-width: 767px) {
  .wf-hd__nav { order: 3; flex-basis: 100%; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; margin-inline: -1rem; padding-inline: 1rem; }
  .wf-hd__nav::-webkit-scrollbar { display: none; }
  .wf-hd--center .wf-hd__brand { order: 0; }
}
${["html.wf-mode-dark .wf-hd.wf-auto", ".wf-hd.wf-hd--trans:not(.is-solid)"].map(darkRules).join("")}
@media (prefers-color-scheme: dark) { ${darkRules("html:not(.wf-mode-light) .wf-hd.wf-auto")} }
`;

const SUN = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
  <circle cx="12" cy="12" r="4.5" /><path d="M12 1.5v2M12 20.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1.5 12h2M20.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>`;
const MOON = html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" /></svg>`;

type NavLink = { label: unknown; target: unknown };

function scrollTop(): number {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export default class PageHeader extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private store = { logo: "", name: "" };
  @state() private mode: Mode = "light";
  @state() private solid = false;
  @state() private busy = false;

  private modeKey = "";
  private paletteKey = "";
  private paletteVars: string[] = [];
  private framed?: HTMLElement;
  private resizer?: ResizeObserver;

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add("wf-host");
    ensureBase();
    injectStyles("wf-page-header", css);
    document.addEventListener("scroll", this.onScroll, { capture: true, passive: true });
    this.resizer = new ResizeObserver(() => this.frame());
    this.resizer.observe(this);
    // The hero renders after the header, so whether the header can be transparent is checked again shortly
    for (const delay of [300, 1500]) window.setTimeout(() => this.requestUpdate(), delay);
    const Salla = getSalla() as any;
    await Salla?.onReady?.();
    this.store = { logo: Salla?.config?.get("store.logo") || "", name: Salla?.config?.get("store.name") || "" };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("scroll", this.onScroll, { capture: true });
    this.resizer?.disconnect();
    this.unframe();
    this.clearPalette();
    this.modeKey = this.paletteKey = "";
    document.documentElement.classList.remove("wf-mode-dark", "wf-mode-light", "wf-mode-ready");
  }

  // Palette and mode are applied before the first paint, so the page never flashes the wrong colors
  protected willUpdate() {
    const cfg = getConfig(this.config);
    const vars = pagePaletteVars(cfg);
    const paletteKey = JSON.stringify(vars);
    if (paletteKey !== this.paletteKey) {
      this.paletteKey = paletteKey;
      this.clearPalette();
      for (const [name, value] of Object.entries(vars)) document.documentElement.style.setProperty(name, value);
      this.paletteVars = Object.keys(vars);
    }
    const modeKey = `${this.baseMode()}|${this.toggleShown()}`;
    if (modeKey !== this.modeKey) {
      this.modeKey = modeKey;
      this.applyMode(resolveColorMode(this.baseMode(), this.toggleShown(), getColorMode(this.baseMode())));
    }
  }

  protected updated() {
    this.frame();
    this.onScroll();
  }

  private clearPalette() {
    for (const name of this.paletteVars) document.documentElement.style.removeProperty(name);
    this.paletteVars = [];
  }

  private baseMode(): string {
    return String(unwrapValue(getConfig(this.config).default_mode) || "light");
  }

  private toggleShown(): boolean {
    return getConfig(this.config).show_mode_toggle !== false;
  }

  private applyMode(mode: Mode) {
    this.mode = mode;
    document.documentElement.classList.toggle("wf-mode-dark", mode === "dark");
    document.documentElement.classList.toggle("wf-mode-light", mode === "light");
  }

  private toggleMode() {
    const next: Mode = this.mode === "dark" ? "light" : "dark";
    // Colors only fade once the shopper switches, so the first paint never fades from the system mode
    document.documentElement.classList.add("wf-mode-ready");
    this.applyMode(next);
    setColorMode(next, this.baseMode());
  }

  /**
   * White-on-image only works over the hero: without one, the header would put white text on the page
   * background, so it stays solid.
   */
  private transparent(): boolean {
    if (!getConfig(this.config).transparent) return false;
    const first = document.querySelector(".wf-section");
    return Boolean(first?.matches("[data-wf-hero].wf-hero--overlay"));
  }

  /** Sticky and the transparent overlap go on the outermost box of the section, the editor's card included. */
  private frame() {
    const cfg = getConfig(this.config);
    const outer = (this.closest(".component-card") as HTMLElement | null) || this;
    if (this.framed && this.framed !== outer) this.unframe();
    const sticky = Boolean(cfg.sticky);
    const trans = this.transparent();
    outer.style.position = sticky ? "sticky" : trans ? "relative" : "";
    outer.style.top = sticky ? "0" : "";
    outer.style.zIndex = sticky || trans ? "30" : "";
    outer.style.marginBottom = trans ? `-${this.offsetHeight}px` : "";
    // Links land below a sticky header
    document.documentElement.style.setProperty("--wf-hd-h", sticky ? `${this.offsetHeight}px` : "0px");
    this.framed = outer;
  }

  private unframe() {
    if (!this.framed) return;
    this.framed.style.position = this.framed.style.top = this.framed.style.zIndex = this.framed.style.marginBottom = "";
    document.documentElement.style.removeProperty("--wf-hd-h");
    this.framed = undefined;
  }

  private onScroll = () => {
    const solid = Boolean(getConfig(this.config).sticky) && this.getBoundingClientRect().top <= 1 && scrollTop() > 1;
    if (solid !== this.solid) this.solid = solid;
  };

  private goTo(e: Event, target: string) {
    const section = document.querySelector(`[data-wf-section="${CSS.escape(target)}"]`);
    if (!section) return;
    e.preventDefault();
    section.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }

  private async onBuy() {
    if (this.busy) return;
    this.busy = true;
    let result;
    try {
      result = await buy();
    } finally {
      this.busy = false;
    }
    if (result.kind === "error") (getSalla() as any)?.error?.(result.message);
  }

  render() {
    const cfg = getConfig(this.config);
    const height = Math.min(Math.max(Number(cfg.logo_height) || 56, 24), 140);
    const classes = [
      "wf-block wf-hd wf-auto",
      unwrapValue(cfg.align) === "start" ? "" : "wf-hd--center",
      cfg.show_shadow !== false ? "wf-hd--shadow" : "",
      this.transparent() ? "wf-hd--trans" : "",
      cfg.sticky ? "wf-hd--sticky" : "",
      this.solid ? "is-solid" : "",
    ].filter(Boolean).join(" ");
    const logo = cfg.logo || this.store.logo;
    const darkLogo = cfg.logo_dark || "";
    const name = this.store.name;
    const links = getCollectionItems<NavLink>(cfg.nav, "nav")
      .map((link) => ({ label: resolveText(link.label), target: anchorId(link.target) }))
      .filter((link) => link.label && link.target);
    const showBuy = cfg.show_buy !== false && buyAction() !== "none";
    const dark = this.mode === "dark";

    return html`<header class=${classes} style=${`--wf-hd-logo:${height}px`}>
      <div class="wf-hd__inner">
        <span class="wf-hd__brand">
          ${logo
            ? html`<img class="wf-hd__logo wf-hd__logo--light${darkLogo ? " has-dark" : ""}" src=${logo} alt=${name} />
                ${darkLogo ? html`<img class="wf-hd__logo wf-hd__logo--dark" src=${darkLogo} alt=${name} />` : nothing}`
            : html`<span class="wf-hd__name">${name}</span>`}
        </span>
        ${links.length
          ? html`<nav class="wf-hd__nav" aria-label=${t({ ar: "أقسام الصفحة", en: "Page sections" })}>
              ${links.map((link) => html`<a href=${`#${link.target}`} @click=${(e: Event) => this.goTo(e, link.target)}>${link.label}</a>`)}
            </nav>`
          : nothing}
        <div class="wf-hd__actions">
          ${this.toggleShown()
            ? html`<button type="button" class="wf-hd__toggle" @click=${() => this.toggleMode()} aria-pressed=${dark ? "true" : "false"}
                aria-label=${t({ ar: "الوضع الداكن", en: "Dark mode" })}>${dark ? SUN : MOON}</button>`
            : nothing}
          ${showBuy
            ? html`<button type="button" class="wf-btn wf-hd__buy" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.onBuy()}>
                ${resolveText(cfg.buy_text) || t({ ar: "اشتري الآن", en: "Buy now" })}</button>`
            : nothing}
        </div>
      </div>
    </header>`;
  }
}
