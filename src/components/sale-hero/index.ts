import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { resolveText, t, webUrl } from "../../utils/config";
import { getSalla, isLandingPage } from "../../utils/landing";
import { calendarLink, isUnlocked, phaseAt, publishSale, sameCode, splitCountdown, storeTime, unlock, type Phase } from "../../utils/sale";
import { WfSection } from "../../utils/section";

const css = `
.wf-sh { position: relative; overflow: hidden; }
/* Without a photo: a soft glow in the accent and a giant outlined percent sign behind the text */
.wf-sh:not(.wf-sh--media) { background: radial-gradient(60% 70% at 85% 0%, color-mix(in srgb, var(--wf-accent) 16%, transparent), transparent 70%),
  radial-gradient(50% 60% at 10% 100%, color-mix(in srgb, var(--wf-accent) 12%, transparent), transparent 70%), var(--wf-bg); }
.wf-sh:not(.wf-sh--media)::before { content: "%"; position: absolute; inset-inline-end: -2rem; top: 50%; transform: translateY(-50%); font-size: min(60cqi, 34rem);
  font-weight: 900; line-height: 1; color: transparent; -webkit-text-stroke: 2px color-mix(in srgb, var(--wf-accent) 22%, transparent); pointer-events: none; }
.wf-sh__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.wf-sh__veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(0 0 0 / var(--wf-sh-veil, .45)), rgb(0 0 0 / calc(var(--wf-sh-veil, .45) + .15))); }
.wf-sh--media { color: #fff; --wf-title: #fff; --wf-text: rgb(255 255 255 / 88%); }
.wf-sh__body { position: relative; display: grid; justify-items: center; gap: 1.25rem; max-width: 52rem; margin-inline: auto; padding: 4.5rem 1rem; text-align: center; }
@container (min-width: 768px) { .wf-sh__body { padding-block: 6.5rem; } }
.wf-sh__badge { padding: .3rem 1rem; border-radius: 999px; background: var(--wf-accent); color: var(--wf-accent-text); font-weight: 800; font-size: .875rem; letter-spacing: .02em; }
.wf-sh__title { margin: 0; font-size: clamp(2.25rem, 9cqi, 4.5rem); line-height: 1.1; font-weight: 900; color: var(--wf-title); text-wrap: balance; }
.wf-sh__sub { margin: 0; max-width: 40rem; font-size: 1.0625rem; line-height: 1.8; color: var(--wf-text); }
.wf-sh__label { font-weight: 700; font-size: .9375rem; color: var(--wf-text); }
.wf-sh__clock { display: flex; gap: .625rem; direction: ltr; }
.wf-sh__unit { display: grid; justify-items: center; gap: .25rem; min-width: 4.25rem; padding: .875rem .5rem; border-radius: 1rem; background: var(--wf-card); color: var(--wf-title); }
.wf-sh--media .wf-sh__unit { background: rgb(255 255 255 / 14%); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #fff; }
.wf-sh__unit b { font-size: clamp(1.75rem, 7cqi, 2.75rem); line-height: 1; font-weight: 900; font-variant-numeric: tabular-nums; }
.wf-sh__unit span { font-size: .75rem; font-weight: 700; opacity: .8; }
.wf-sh__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: .75rem; }
.wf-sh__ghost { background: transparent; color: var(--wf-title); border-color: currentColor; }
.wf-sh--media .wf-sh__ghost { color: #fff; }
.wf-sh__early { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; width: min(100%, 26rem); }
.wf-sh__early input { flex: 1 1 10rem; min-width: 0; min-height: 2.75rem; padding: 0 1rem; border: 1px solid color-mix(in srgb, currentColor 35%, transparent); border-radius: .625rem;
  background: transparent; color: inherit; font: inherit; text-align: center; letter-spacing: .08em; }
.wf-sh__early input::placeholder { color: inherit; opacity: .6; }
.wf-sh__early input:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 2px; }
.wf-sh__ok { font-weight: 700; color: var(--wf-accent-ink); }
.wf-sh--media .wf-sh__ok { color: #fff; }
`;

const UNITS = [
  { key: "d", ar: "يوم", en: "Days" },
  { key: "h", ar: "ساعة", en: "Hours" },
  { key: "m", ar: "دقيقة", en: "Min" },
  { key: "s", ar: "ثانية", en: "Sec" },
] as const;

export default class SaleHero extends WfSection {
  protected readonly styleId = "sale-hero";
  @state() private now = Date.now();
  @state() private code = "";
  @state() private codeError = false;
  private timer?: number;
  private lastPhase?: Phase;

  protected styles() {
    return css;
  }

  connectedCallback() {
    super.connectedCallback();
    this.publish();
    this.timer = window.setInterval(() => (this.now = Date.now()), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private dates() {
    const cfg = this.cfg();
    const tz = Number.isFinite(Number(cfg.tz_offset)) && cfg.tz_offset !== "" ? Number(cfg.tz_offset) : 3;
    return { start: storeTime(cfg.start, tz), end: storeTime(cfg.end, tz), tz };
  }

  private publish() {
    const { start, end } = this.dates();
    publishSale({ start, end, earlyCode: String(this.cfg().early_code || "").trim() });
  }

  protected willUpdate() {
    // A phase change (the sale starting or ending while the page is open) tells the other sections
    const { start, end } = this.dates();
    const phase = this.phase(start, end);
    if (phase !== this.lastPhase) {
      this.lastPhase = phase;
      this.publish();
    }
  }

  /** In the editor the merchant picks which phase to look at; shoppers see the real one. */
  private phase(start: number | null, end: number | null): Phase {
    const preview = String(this.cfg().preview_phase?.[0]?.value ?? this.cfg().preview_phase ?? "auto");
    if (!isLandingPage() && (preview === "before" || preview === "live" || preview === "ended")) return preview;
    return phaseAt(this.now, start, end);
  }

  private tryCode(e: Event) {
    e.preventDefault();
    if (sameCode(this.code, this.cfg().early_code)) {
      unlock(this.code.trim());
      this.codeError = false;
      this.requestUpdate();
    } else this.codeError = true;
  }

  private scrollToOffers() {
    const target = String(this.cfg().offers_target || "deals").replace(/^#/, "");
    document.querySelector(`[data-wf-section="${target}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  private renderClock(ms: number, label: string) {
    const parts = splitCountdown(ms);
    return html`<span class="wf-sh__label">${label}</span>
      <div class="wf-sh__clock" role="timer" aria-label=${label}>
        ${UNITS.map((u) => html`<div class="wf-sh__unit"><b>${String(parts[u.key]).padStart(2, "0")}</b><span>${t(u)}</span></div>`)}
      </div>`;
  }

  render() {
    const cfg = this.cfg();
    const { start, end } = this.dates();
    const phase = this.phase(start, end);
    const pick = (key: string) => resolveText(cfg[`${phase}_${key}`]);
    const image = String(cfg[`${phase}_image`] || cfg.image || "");
    const unlocked = isUnlocked({ start, end, earlyCode: String(cfg.early_code || "") });
    const storeUrl = (getSalla()?.config?.get("store.url") as string) || location.origin;
    const title = pick("title") || t({ ar: "الجمعة البيضاء", en: "White Friday" });

    let middle: unknown = nothing;
    if (phase === "before" && start !== null) middle = this.renderClock(start - this.now, pick("label") || t({ ar: "يبدأ العرض بعد", en: "Starts in" }));
    if (phase === "live" && end !== null) middle = this.renderClock(end - this.now, pick("label") || t({ ar: "ينتهي العرض بعد", en: "Ends in" }));

    const channel = webUrl(cfg.channel_url);
    const endedUrl = webUrl(cfg.ended_url) || storeUrl;
    const showEarly = phase === "before" && String(cfg.early_code || "").trim();

    return this.frame(html`
      ${image ? html`<img class="wf-sh__bg" src=${image} alt="" fetchpriority="high" /><span class="wf-sh__veil" style=${`--wf-sh-veil:${Math.min(Math.max(Number(cfg.overlay ?? 45), 0), 85) / 100}`}></span>` : nothing}
      <div class="wf-sh__body">
        ${pick("badge") ? html`<span class="wf-sh__badge">${pick("badge")}</span>` : nothing}
        <h1 class="wf-sh__title">${title}</h1>
        ${pick("subtitle") ? html`<p class="wf-sh__sub">${pick("subtitle")}</p>` : nothing}
        ${middle}
        <div class="wf-sh__actions">
          ${phase === "before" && start !== null && cfg.show_reminder !== false
            ? html`<a class="wf-btn" href=${calendarLink(title, start, end, storeUrl)} download="white-friday.ics">${t({ ar: "ذكّريني بالموعد", en: "Remind me" })}</a>`
            : nothing}
          ${phase === "before" && channel ? html`<a class="wf-btn wf-sh__ghost" href=${channel} target="_blank" rel="noopener">${resolveText(cfg.channel_label) || t({ ar: "تابعينا عشان أول ما يبدأ", en: "Follow us for the start" })}</a>` : nothing}
          ${phase === "live" || (phase === "before" && unlocked)
            ? html`<button type="button" class="wf-btn" @click=${() => this.scrollToOffers()}>${pick("button") || t({ ar: "تسوّقي العروض", en: "Shop the deals" })}</button>`
            : nothing}
          ${phase === "ended" ? html`<a class="wf-btn" href=${endedUrl}>${pick("button") || t({ ar: "تسوّقي من المتجر", en: "Shop the store" })}</a>` : nothing}
        </div>
        ${showEarly
          ? unlocked
            ? html`<p class="wf-sh__ok" role="status">${t({ ar: "الدخول المبكر مفتوح لك. العروض تحت 👇", en: "Early access is open for you. Deals below" })}</p>`
            : html`<form class="wf-sh__early" @submit=${(e: Event) => this.tryCode(e)}>
                <label class="wf-visually-hidden" for="wf-sh-code">${t({ ar: "كود الدخول المبكر", en: "Early access code" })}</label>
                <input id="wf-sh-code" autocomplete="off" .value=${this.code} placeholder=${resolveText(cfg.early_label) || t({ ar: "عندك كود الدخول المبكر؟", en: "Have an early access code?" })}
                  @input=${(e: Event) => { this.code = (e.target as HTMLInputElement).value; this.codeError = false; }} />
                <button type="submit" class="wf-btn wf-sh__ghost">${t({ ar: "افتحي العروض", en: "Open the deals" })}</button>
                ${this.codeError ? html`<span class="wf-error" role="alert">${t({ ar: "الكود ده مش صح", en: "That code is not right" })}</span>` : nothing}
              </form>`
          : nothing}
      </div>`, { extraClass: `wf-sh${image ? " wf-sh--media" : ""}`, hero: true, title: false });
  }
}
