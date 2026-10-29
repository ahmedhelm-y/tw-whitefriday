import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { getCollectionItems, getConfig, resolveText, t, webUrl } from "../../utils/config";
import { schemeClass, sectionStyle } from "../../utils/colors";
import { getSalla } from "../../utils/landing";
import { ensureBase, injectStyles } from "../../utils/styles";

const darkLogo = (scope: string) => `
${scope} .wf-ft__logo--light.has-dark { display: none; }
${scope} .wf-ft__logo--dark { display: block; }
${scope} .wf-ft__logo--light:not(.has-dark) { filter: brightness(0) invert(1); }`;

const css = `
.wf-ft { padding-block: 2.5rem 1.25rem; border-top: 1px solid color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-ft__top { display: grid; gap: 1.75rem; }
@container (min-width: 768px) { .wf-ft__top { grid-template-columns: 2fr 1fr; align-items: start; } }
.wf-ft__logo { display: block; height: 48px; width: auto; max-width: 60%; object-fit: contain; }
.wf-ft .wf-ft__logo--dark { display: none; }
.wf-ft__name { font-size: 1.25rem; font-weight: 800; color: var(--wf-title); }
.wf-ft__about { margin-top: .75rem; max-width: 36rem; font-size: .9375rem; line-height: 1.8; color: var(--wf-text); }
.wf-ft__contact { display: grid; gap: .25rem; }
.wf-ft__contact a { display: inline-flex; align-items: center; gap: .5rem; min-height: 2.75rem; color: var(--wf-text); text-decoration: none; font-weight: 600; }
.wf-ft__contact a:hover { color: var(--wf-accent-ink); }
.wf-ft__contact i { font-size: 1.125rem; color: var(--wf-accent-ink); }
.wf-ft__social { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; }
.wf-ft__social a { width: 2.75rem; height: 2.75rem; display: grid; place-items: center; border-radius: 999px; background: var(--wf-card);
  color: var(--wf-title); font-size: 1.125rem; text-decoration: none; }
.wf-ft__social a:hover { background: var(--wf-accent); color: var(--wf-accent-text); }
.wf-ft a:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 2px; }
.wf-ft__bottom { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.25rem;
  border-top: 1px solid color-mix(in srgb, var(--wf-text) 10%, transparent); }
.wf-ft__payments { display: flex; flex-wrap: wrap; gap: .5rem; }
.wf-ft__payments img { width: 3rem; height: 2rem; object-fit: contain; padding: .25rem; border-radius: .375rem; background: #fff; }
.wf-ft__copy { font-size: .8125rem; color: var(--wf-text); }
${[".wf-ft.wf-dark", "html.wf-mode-dark .wf-ft.wf-auto"].map(darkLogo).join("")}
@media (prefers-color-scheme: dark) { ${darkLogo("html:not(.wf-mode-light) .wf-ft.wf-auto")} }
`;

type Social = { icon: string; url: string };

export default class PageFooter extends LitElement {
  @property({ type: Object }) config?: Record<string, any>;
  @state() private store = { logo: "", name: "", payments: [] as { src: string; name: string }[] };

  protected createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add("wf-host");
    ensureBase();
    injectStyles("wf-page-footer", css);
    const Salla = getSalla() as any;
    await Salla?.onReady?.();
    const slugs: string[] = Salla?.config?.get("store.settings.payments") || [];
    this.store = {
      logo: Salla?.config?.get("store.logo") || "",
      name: Salla?.config?.get("store.name") || "",
      payments: slugs.map((slug) => ({ src: Salla?.url?.cdn?.(`images/payment/${slug}_mini.png`, 116, 116) || "", name: slug })).filter((p) => p.src),
    };
  }

  render() {
    const cfg = getConfig(this.config);
    const logo = cfg.logo || this.store.logo;
    const name = this.store.name;
    const about = resolveText(cfg.about);
    const phone = String(cfg.phone || "").trim();
    const whatsapp = String(cfg.whatsapp || "").replace(/[^\d]/g, "");
    const email = String(cfg.email || "").trim();
    const social = getCollectionItems<Social>(cfg.social, "social")
      .map((item) => ({ icon: String(item.icon || "sicon-link"), url: webUrl(item.url) }))
      .filter((item) => item.url);
    const year = new Date().getFullYear();
    const copyright = (resolveText(cfg.copyright) || "© {year} {store}").replace("{year}", String(year)).replace("{store}", name);
    const contact = phone || whatsapp || email;

    return html`<footer class=${`wf-block wf-ft ${schemeClass(cfg)}`} style=${sectionStyle(cfg)}>
      <div class="wf-container">
        <div class="wf-ft__top">
          <div>
            ${logo
              ? html`<img class="wf-ft__logo wf-ft__logo--light${cfg.logo_dark ? " has-dark" : ""}" src=${logo} alt=${name} loading="lazy" />
                  ${cfg.logo_dark ? html`<img class="wf-ft__logo wf-ft__logo--dark" src=${cfg.logo_dark} alt=${name} loading="lazy" />` : nothing}`
              : html`<span class="wf-ft__name">${name}</span>`}
            ${about ? html`<p class="wf-ft__about">${about}</p>` : nothing}
            ${social.length
              ? html`<div class="wf-ft__social">${social.map((s) => html`<a href=${s.url} target="_blank" rel="noopener" aria-label=${s.icon.replace(/^sicon-/, "")}><i class=${s.icon}></i></a>`)}</div>`
              : nothing}
          </div>
          ${contact
            ? html`<div class="wf-ft__contact" aria-label=${t({ ar: "تواصل معنا", en: "Contact us" })}>
                ${phone ? html`<a href=${`tel:${phone.replace(/[^\d+]/g, "")}`}><i class="sicon-phone"></i><span dir="ltr">${phone}</span></a>` : nothing}
                ${whatsapp ? html`<a href=${`https://wa.me/${whatsapp}`} target="_blank" rel="noopener"><i class="sicon-whatsapp"></i>${t({ ar: "واتساب", en: "WhatsApp" })}</a>` : nothing}
                ${email ? html`<a href=${`mailto:${email}`}><i class="sicon-mail"></i><span dir="ltr">${email}</span></a>` : nothing}
              </div>`
            : nothing}
        </div>
        <div class="wf-ft__bottom">
          ${cfg.show_payments !== false && this.store.payments.length
            ? html`<div class="wf-ft__payments">${this.store.payments.map((p) => html`<img src=${p.src} alt=${p.name} loading="lazy" />`)}</div>`
            : nothing}
          <p class="wf-ft__copy">${copyright}</p>
        </div>
      </div>
    </footer>`;
  }
}
