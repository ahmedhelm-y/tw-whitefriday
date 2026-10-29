import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { codeBlock, codeCss, codesReady, copyCode } from "../../utils/codecard";
import { getCollectionItems, getLocale, resolveText, t } from "../../utils/config";
import { formatDay } from "../../utils/eta";
import { isLandingPage } from "../../utils/landing";
import { doorDay, doorState, readSale, storeTime, type DoorState } from "../../utils/sale";
import { WfSection } from "../../utils/section";

const css = `${codeCss}
.wf-ad__doors { display: grid; gap: .75rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 7.5rem), 1fr)); padding: 0; margin: 0; list-style: none; }
.wf-ad__door { position: relative; display: grid; place-items: center; gap: .25rem; width: 100%; aspect-ratio: 3 / 4; padding: .75rem; border: 2px solid transparent;
  border-radius: 1.125rem; background: var(--wf-card); color: var(--wf-title); font: inherit; text-align: center; }
.wf-ad__door b { font-size: 2.25rem; font-weight: 900; line-height: 1; }
.wf-ad__door small { font-size: .75rem; font-weight: 700; color: var(--wf-text); }
.wf-ad__door.is-today { border-color: var(--wf-accent-ink); background: var(--wf-accent); color: var(--wf-accent-text); cursor: pointer;
  box-shadow: 0 10px 30px -12px color-mix(in srgb, var(--wf-accent) 70%, transparent); }
.wf-ad__door.is-today small { color: inherit; }
.wf-ad__door.is-today:focus-visible { outline: 3px solid var(--wf-title); outline-offset: 3px; }
.wf-ad__door.is-past { opacity: .45; }
.wf-ad__door.is-past b { text-decoration: line-through; }
.wf-ad__door.is-future::after { content: "🔒"; position: absolute; top: .5rem; inset-inline-end: .5rem; font-size: .875rem; }
.wf-ad__open { display: grid; gap: .75rem; margin-top: 1.25rem; padding: 1.5rem; border-radius: 1.25rem; background: var(--wf-card); text-align: center; }
.wf-ad__open h3 { margin: 0; font-size: 1.375rem; font-weight: 900; color: var(--wf-title); }
.wf-ad__open p { margin: 0; }
`;

type Day = { title: unknown; desc: unknown; code: unknown };

export default class AdventDoors extends WfSection {
  protected readonly styleId = "advent-doors";
  @state() private now = Date.now();
  @state() private opened = -1;
  @state() private status = "";
  private timer?: number;

  protected styles() {
    return css;
  }

  connectedCallback() {
    super.connectedCallback();
    // Doors only change at midnight; a minute tick is plenty
    this.timer = window.setInterval(() => (this.now = Date.now()), 60000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  private days() {
    const tz = Number(this.cfg().tz_offset ?? 3) || 3;
    // Doors count from the hero's start date, or this section's own when there is no hero
    const start = storeTime(this.cfg().start, tz) ?? readSale()?.start ?? null;
    if (start === null) return [];
    return getCollectionItems<Day>(this.cfg().days, "days")
      .map((d) => ({ title: resolveText(d.title), desc: resolveText(d.desc), code: String(d.code || "").trim() }))
      .filter((d) => d.title)
      .map((d, i) => ({ ...d, at: doorDay(start, i, tz) }))
      // The editor shows the first door open and the rest locked, as on the sale's first day
      .map((d, i) => ({ ...d, state: (isLandingPage() ? doorState(d.at, this.now, tz) : i === 0 ? "today" : "future") as DoorState }));
  }

  render() {
    const days = this.days();
    if (!days.length) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-empty">${t({ ar: "أضف عروض الأيام، والتقويم بيبدأ من تاريخ بداية العرض", en: "Add the daily offers; the calendar starts on the sale start date" })}</p>`);
    }
    const shown = this.opened >= 0 ? days[this.opened] : null;
    const ready = codesReady(this.cfg());
    const locale = getLocale();
    return this.frame(html`
      <ul class="wf-ad__doors">${days.map((d, i) => {
        const label = formatDay(new Date(d.at + 3 * 3600000 + 1), locale).split(" ").slice(1).join(" ");
        if (d.state === "today") {
          return html`<li><button type="button" class="wf-ad__door is-today" aria-expanded=${this.opened === i ? "true" : "false"}
            @click=${() => { this.opened = this.opened === i ? -1 : i; this.status = ""; }}>
            <b>${i + 1}</b><small>${t({ ar: "افتحي باب النهارده", en: "Open today's door" })}</small></button></li>`;
        }
        return html`<li><div class=${`wf-ad__door is-${d.state}`} aria-label=${d.state === "past" ? t({ ar: "عرض فات", en: "Past offer" }) : t({ ar: "مقفول لسه", en: "Still locked" })}>
          <b>${i + 1}</b><small>${label}</small></div></li>`;
      })}</ul>
      ${shown
        ? html`<div class="wf-ad__open" aria-live="polite">
            <h3>${shown.title}</h3>${shown.desc ? html`<p>${shown.desc}</p>` : nothing}
            ${shown.code && ready ? codeBlock(shown.code, this.status, async (e) => { this.status = await copyCode(shown.code, (e.currentTarget as HTMLElement).previousElementSibling); }) : nothing}
          </div>`
        : nothing}`, { extraClass: "wf-ad" });
  }
}
