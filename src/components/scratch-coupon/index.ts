import { html, nothing } from "lit";
import { state } from "lit/decorators.js";
import { buyAction } from "../../utils/buy";
import { getCollectionItems, resolveText, t } from "../../utils/config";
import { isExpired, revealedKey } from "../../utils/coupon";
import { stickyPick, type Code } from "../../utils/sale";
import { codesReady } from "../../utils/codecard";
import { isLandingPage } from "../../utils/landing";
import { WfSection } from "../../utils/section";

const GRID = 24;
const BRUSH = 22;

const css = `
.wf-sc__card { display: flex; flex-direction: column; align-items: center; gap: 1rem; max-width: 30rem; margin-inline: auto; padding: 1.75rem 1.25rem;
  border-radius: 1.5rem; background: var(--wf-card); text-align: center; user-select: none; -webkit-user-select: none; }
.wf-sc__deal { margin: 0; font-size: 1.5rem; font-weight: 800; line-height: 1.35; color: var(--wf-title); }
.wf-sc__area { position: relative; width: 100%; height: 6.5rem; border-radius: 1rem; overflow: hidden;
  border: 2px dashed var(--wf-accent-ink); background: var(--wf-bg); }
.wf-sc__code { position: absolute; inset: 0; display: grid; place-items: center; font-size: 2rem; font-weight: 800; letter-spacing: .15em;
  color: var(--wf-title); direction: ltr; }
.wf-sc__area.is-open .wf-sc__code { user-select: all; -webkit-user-select: all; }
.wf-sc__canvas { position: absolute; inset: 0; width: 100%; height: 100%; touch-action: none; cursor: grab; transition: opacity .5s ease; }
.wf-sc__canvas.is-gone { opacity: 0; pointer-events: none; }
.wf-sc__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: .75rem; width: 100%; }
.wf-sc__actions .wf-btn { flex: 1 1 10rem; }
.wf-sc__ghost { background: transparent; color: var(--wf-title); border-color: color-mix(in srgb, var(--wf-text) 30%, transparent); }
.wf-sc__status { min-height: 1.5em; margin: 0; font-size: .875rem; color: var(--wf-text); }
.wf-sc__note { padding: 1.5rem; border: 1px dashed color-mix(in srgb, var(--wf-text) 35%, transparent); border-radius: 1rem; text-align: center; }
@media (prefers-reduced-motion: reduce) { .wf-sc__canvas { transition: none; } }
`;

export default class ScratchCoupon extends WfSection {
  protected readonly styleId = "scratch-coupon";
  @state() private revealed = false;
  @state() private status = "";

  private cells = new Set<number>();
  private drawing = false;
  private moves = 0;
  private resizer?: ResizeObserver;

  protected styles() {
    return css;
  }

  connectedCallback() {
    super.connectedCallback();
    const code = this.code();
    try {
      this.revealed = Boolean(code && localStorage.getItem(revealedKey(code)));
    } catch {
      // storage blocked: the card starts covered
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizer?.disconnect();
  }

  protected updated() {
    const canvas = this.canvas();
    if (!canvas || this.revealed || this.resizer) return;
    this.resizer = new ResizeObserver(() => this.paintCover());
    this.resizer.observe(canvas);
    this.paintCover();
  }

  private pickCache?: Code | null;

  /** The mystery codes with their chances, or the single code; each visitor keeps the one they got. */
  private picked(): Code | null {
    if (this.pickCache !== undefined) return this.pickCache;
    const cfg = this.cfg();
    const codes = getCollectionItems<{ code: unknown; label: unknown; weight: unknown }>(cfg.codes, "codes")
      .map((c) => ({ code: String(c.code || "").trim(), label: resolveText(c.label), weight: Number(c.weight) || 0 }))
      .filter((c) => c.code && c.weight > 0);
    const single = String(cfg.code || "").trim();
    this.pickCache = codes.length ? stickyPick("wf-mystery", codes) : single ? { code: single, label: "", weight: 1 } : null;
    return this.pickCache;
  }

  private code(): string {
    return this.picked()?.code || "";
  }

  private canvas(): HTMLCanvasElement | null {
    return this.querySelector(".wf-sc__canvas");
  }

  /** Paints the cover at the canvas's real size; scratches restart when the size changes. */
  private paintCover() {
    const canvas = this.canvas();
    if (!canvas || this.revealed) return;
    const box = canvas.getBoundingClientRect();
    if (!box.width) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(box.width * ratio);
    canvas.height = Math.round(box.height * ratio);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    this.cells.clear();
    const cfg = this.cfg();
    const block = this.querySelector(".wf-block") || this;
    const color = getComputedStyle(block).getPropertyValue("--wf-accent").trim() || "#8a5a2b";
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = String(cfg.cover_color || color);
    ctx.fillRect(0, 0, box.width, box.height);
    const hint = () => {
      ctx.fillStyle = "rgb(255 255 255 / 92%)";
      ctx.font = `700 15px ${getComputedStyle(this).fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(resolveText(cfg.hint) || t({ ar: "اكشط هنا لتكشف الكود", en: "Scratch here to reveal the code" }), box.width / 2, box.height / 2);
    };
    if (cfg.cover_image) {
      const img = new Image();
      img.onload = () => {
        if (this.revealed) return;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(img, 0, 0, box.width, box.height);
        hint();
      };
      img.src = String(cfg.cover_image);
    }
    hint();
  }

  private scratchAt(e: PointerEvent) {
    const canvas = this.canvas();
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const box = canvas.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
    // Scratched area is tracked on a grid, so it works even when the cover image cannot be read back
    const cw = box.width / GRID;
    const ch = box.height / GRID;
    for (let gx = Math.floor((x - BRUSH) / cw); gx <= Math.floor((x + BRUSH) / cw); gx++) {
      for (let gy = Math.floor((y - BRUSH) / ch); gy <= Math.floor((y + BRUSH) / ch); gy++) {
        if (gx >= 0 && gy >= 0 && gx < GRID && gy < GRID) this.cells.add(gy * GRID + gx);
      }
    }
    if (++this.moves % 10 === 0) this.checkDone();
  }

  private checkDone() {
    const need = Math.min(Math.max(Number(this.cfg().reveal_percent) || 50, 30), 80) / 100;
    if (this.cells.size / (GRID * GRID) >= need) this.reveal();
  }

  private reveal() {
    if (this.revealed) return;
    this.revealed = true;
    this.status = t({ ar: "مبروك! هذا كود الخصم", en: "Here is your discount code" });
    this.resizer?.disconnect();
    try {
      localStorage.setItem(revealedKey(this.code()), "1");
    } catch {
      // the code stays visible for this visit
    }
  }

  private async copy() {
    const code = this.code();
    try {
      await navigator.clipboard.writeText(code);
      this.status = t({ ar: "تم نسخ الكود", en: "Code copied" });
    } catch {
      // Older browsers: select the code so the shopper can copy it by hand
      const el = this.querySelector(".wf-sc__code");
      if (el) window.getSelection()?.selectAllChildren(el);
      this.status = t({ ar: "حددنا الكود، انسخه من قائمة النسخ", en: "The code is selected, copy it from your menu" });
    }
  }

  render() {
    const cfg = this.cfg();
    const code = codesReady(cfg) ? this.code() : "";
    const expired = isExpired(cfg.expires);
    if (!code || expired) {
      if (isLandingPage()) return nothing;
      return this.frame(html`<p class="wf-sc__note">${!code
        ? t({ ar: "اكتب كود الخصم في إعدادات هذا القسم", en: "Add the discount code in this section's settings" })
        : t({ ar: "انتهى هذا الكوبون، ولن يظهر للعملاء", en: "This coupon has expired and is hidden from shoppers" })}</p>`);
    }
    const deal = (this.revealed && this.picked()?.label) || resolveText(cfg.discount_text) || t({ ar: "خصم خاص على طلبك", en: "A special discount on your order" });

    return this.frame(html`<div class="wf-sc__card">
        <p class="wf-sc__deal">${deal}</p>
        <div class=${`wf-sc__area${this.revealed ? " is-open" : ""}`}>
          <span class="wf-sc__code" aria-hidden=${this.revealed ? "false" : "true"}>${code}</span>
          <canvas class="wf-sc__canvas${this.revealed ? " is-gone" : ""}" aria-hidden="true"
            @pointerdown=${(e: PointerEvent) => { this.drawing = true; (e.target as Element).setPointerCapture?.(e.pointerId); this.scratchAt(e); }}
            @pointermove=${(e: PointerEvent) => { if (this.drawing) this.scratchAt(e); }}
            @pointerup=${() => { this.drawing = false; this.checkDone(); }}
            @pointercancel=${() => { this.drawing = false; }}></canvas>
        </div>
        <p class="wf-sc__status" aria-live="polite">${this.status}</p>
        <div class="wf-sc__actions">
          ${this.revealed
            ? html`<button type="button" class="wf-btn wf-sc__ghost" @click=${() => this.copy()}>${t({ ar: "نسخ الكود", en: "Copy code" })}</button>`
            : html`<button type="button" class="wf-btn wf-sc__ghost" @click=${() => this.reveal()}>${t({ ar: "اكشف الكود", en: "Reveal the code" })}</button>`}
          ${buyAction() !== "none"
            ? html`<button type="button" class="wf-btn" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.press({ quantity: 1 })}>${this.buyLabel()}</button>`
            : nothing}
        </div>
      </div>`, { extraClass: "wf-sc" });
  }
}
