import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { codeBlock, codeCss, codesReady, copyCode } from "../../utils/codecard";
import { getCollectionItems, resolveText, t, unwrapValue } from "../../utils/config";
import { isLandingPage } from "../../utils/landing";
import { stickyPick, type Code } from "../../utils/sale";
import { WfSection } from "../../utils/section";

const css = `${codeCss}
.wf-cg__stage { display: grid; justify-items: center; gap: 1.25rem; padding: 1.5rem; border-radius: 1.5rem; background: var(--wf-card); text-align: center; }
.wf-cg__boxes { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
.wf-cg__gift { width: 7.5rem; height: 7.5rem; display: grid; place-items: center; border: 0; border-radius: 1.25rem; background: var(--wf-bg); font-size: 3.5rem; cursor: pointer;
  transition: transform .2s ease; }
.wf-cg__gift:hover { transform: translateY(-4px) rotate(-3deg); }
.wf-cg__gift:focus-visible { outline: 3px solid var(--wf-accent-ink); outline-offset: 3px; }
.wf-cg__gift.is-open { background: var(--wf-accent); transform: scale(1.06); }
.wf-cg__gift[disabled] { cursor: default; opacity: .5; }
.wf-cg__cards { display: grid; gap: .625rem; grid-template-columns: repeat(3, minmax(0, 5.5rem)); }
.wf-cg__card { aspect-ratio: 3 / 4; border: 0; border-radius: .875rem; background: var(--wf-title); color: var(--wf-bg); font-size: 2rem; cursor: pointer; }
.wf-cg__card.is-up, .wf-cg__card.is-done { background: var(--wf-bg); color: var(--wf-title); }
.wf-cg__card.is-done { outline: 2px solid var(--wf-accent-ink); }
.wf-cg__card:focus-visible { outline: 3px solid var(--wf-accent-ink); outline-offset: 2px; }
.wf-cg__win { margin: 0; font-size: 1.375rem; font-weight: 900; color: var(--wf-title); }
@media (prefers-reduced-motion: reduce) { .wf-cg__gift { transition: none; } }
`;

const FACES = ["🎁", "⭐", "💎", "🛍️", "🎀", "🌙"];

function shuffled<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default class CouponGame extends WfSection {
  protected readonly styleId = "coupon-game";
  @state() private chosen = -1;
  @state() private deck: string[] = [];
  @state() private up: number[] = [];
  @state() private done = new Set<number>();
  @state() private status = "";
  private prize?: Code | null;

  protected styles() {
    return css;
  }

  connectedCallback() {
    super.connectedCallback();
    const faces = FACES.slice(0, 3);
    this.deck = shuffled([...faces, ...faces]);
  }

  private code(): Code | null {
    if (this.prize !== undefined) return this.prize;
    const codes = getCollectionItems<{ code: unknown; label: unknown; weight: unknown }>(this.cfg().codes, "codes")
      .map((c) => ({ code: String(c.code || "").trim(), label: resolveText(c.label), weight: Number(c.weight) || 1 }))
      .filter((c) => c.code);
    this.prize = codes.length ? stickyPick("wf-game", codes) : null;
    return this.prize;
  }

  private flip(i: number) {
    if (this.done.has(i) || this.up.includes(i) || this.up.length === 2) return;
    const up = [...this.up, i];
    this.up = up;
    if (up.length < 2) return;
    const [a, b] = up;
    window.setTimeout(() => {
      if (this.deck[a] === this.deck[b]) this.done = new Set([...this.done, a, b]);
      this.up = [];
    }, this.deck[a] === this.deck[b] ? 250 : 800);
  }

  render() {
    const cfg = this.cfg();
    const prize = codesReady(cfg) ? this.code() : null;
    if (!prize) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-empty">${t({ ar: "أضف أكواد الجوائز من إعدادات هذا القسم", en: "Add the prize codes in this section's settings" })}</p>`);
    }
    const mode = unwrapValue(cfg.mode) === "match" ? "match" : "gifts";
    const won = mode === "gifts" ? this.chosen >= 0 : this.done.size === this.deck.length;
    const result = won
      ? html`<p class="wf-cg__win">${prize.label || t({ ar: "مبروك! ده كودك", en: "You won! Here is your code" })}</p>
          ${codeBlock(prize.code, this.status, async (e) => { this.status = await copyCode(prize.code, (e.currentTarget as HTMLElement).previousElementSibling); })}`
      : nothing;
    if (mode === "gifts") {
      return this.frame(html`<div class="wf-cg__stage">
        <p>${resolveText(cfg.hint) || t({ ar: "اختاري هدية من التلاتة", en: "Pick one of the three gifts" })}</p>
        <div class="wf-cg__boxes">${[0, 1, 2].map((i) => html`<button type="button" class=${`wf-cg__gift${this.chosen === i ? " is-open" : ""}`}
          aria-label=${t({ ar: `الهدية ${i + 1}`, en: `Gift ${i + 1}` })} ?disabled=${this.chosen >= 0 && this.chosen !== i}
          @click=${() => { if (this.chosen < 0) this.chosen = i; }}>${this.chosen === i ? "🎉" : "🎁"}</button>`)}</div>
        ${result}
      </div>`, { extraClass: "wf-cg" });
    }
    return this.frame(html`<div class="wf-cg__stage">
      <p>${resolveText(cfg.hint) || t({ ar: "طابقي الكروت اللي شبه بعض عشان تكسبي", en: "Match the pairs to win" })}</p>
      <div class="wf-cg__cards">${this.deck.map((face, i) => {
        const open = this.up.includes(i) || this.done.has(i);
        return html`<button type="button" class=${`wf-cg__card${this.done.has(i) ? " is-done" : open ? " is-up" : ""}`}
          aria-label=${open ? face : t({ ar: `كارت ${i + 1}`, en: `Card ${i + 1}` })} @click=${() => this.flip(i)}>${open ? face : "?"}</button>`;
      })}</div>
      ${result}
    </div>`, { extraClass: "wf-cg" });
  }
}
