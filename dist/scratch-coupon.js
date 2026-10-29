import { nothing as m, html as f } from "lit";
import { state as b } from "lit/decorators.js";
import { b as y } from "./buy-Cnk1jDve.js";
import { g as x, r as w, t as c, i as C } from "./styles-CBhBCxUD.js";
import { r as v, i as k } from "./coupon-MHx38xkB.js";
import { W as $, b as S } from "./section-Bp25z5NG.js";
import { a as z } from "./codecard-Bd17k6Ma.js";
var I = Object.defineProperty, _ = (g, e, s, i) => {
  for (var t = void 0, r = g.length - 1, o; r >= 0; r--)
    (o = g[r]) && (t = o(e, s, t) || t);
  return t && I(e, s, t), t;
};
const d = 24, p = 22, M = `
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
class u extends $ {
  constructor() {
    super(...arguments), this.styleId = "scratch-coupon", this.revealed = !1, this.status = "", this.cells = /* @__PURE__ */ new Set(), this.drawing = !1, this.moves = 0;
  }
  styles() {
    return M;
  }
  connectedCallback() {
    super.connectedCallback();
    const e = this.code();
    try {
      this.revealed = !!(e && localStorage.getItem(v(e)));
    } catch {
    }
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.resizer) == null || e.disconnect();
  }
  updated() {
    const e = this.canvas();
    !e || this.revealed || this.resizer || (this.resizer = new ResizeObserver(() => this.paintCover()), this.resizer.observe(e), this.paintCover());
  }
  /** The mystery codes with their chances, or the single code; each visitor keeps the one they got. */
  picked() {
    if (this.pickCache !== void 0) return this.pickCache;
    const e = this.cfg(), s = x(e.codes, "codes").map((t) => ({ code: String(t.code || "").trim(), label: w(t.label), weight: Number(t.weight) || 0 })).filter((t) => t.code && t.weight > 0), i = String(e.code || "").trim();
    return this.pickCache = s.length ? S("wf-mystery", s) : i ? { code: i, label: "", weight: 1 } : null, this.pickCache;
  }
  code() {
    var e;
    return ((e = this.picked()) == null ? void 0 : e.code) || "";
  }
  canvas() {
    return this.querySelector(".wf-sc__canvas");
  }
  /** Paints the cover at the canvas's real size; scratches restart when the size changes. */
  paintCover() {
    const e = this.canvas();
    if (!e || this.revealed) return;
    const s = e.getBoundingClientRect();
    if (!s.width) return;
    const i = window.devicePixelRatio || 1;
    e.width = Math.round(s.width * i), e.height = Math.round(s.height * i);
    const t = e.getContext("2d");
    if (!t) return;
    t.scale(i, i), this.cells.clear();
    const r = this.cfg(), o = this.querySelector(".wf-block") || this, l = getComputedStyle(o).getPropertyValue("--wf-accent").trim() || "#8a5a2b";
    t.globalCompositeOperation = "source-over", t.fillStyle = String(r.cover_color || l), t.fillRect(0, 0, s.width, s.height);
    const n = () => {
      t.fillStyle = "rgb(255 255 255 / 92%)", t.font = `700 15px ${getComputedStyle(this).fontFamily}`, t.textAlign = "center", t.textBaseline = "middle", t.fillText(w(r.hint) || c({ ar: "اكشط هنا لتكشف الكود", en: "Scratch here to reveal the code" }), s.width / 2, s.height / 2);
    };
    if (r.cover_image) {
      const a = new Image();
      a.onload = () => {
        this.revealed || (t.globalCompositeOperation = "source-over", t.drawImage(a, 0, 0, s.width, s.height), n());
      }, a.src = String(r.cover_image);
    }
    n();
  }
  scratchAt(e) {
    const s = this.canvas(), i = s == null ? void 0 : s.getContext("2d");
    if (!s || !i) return;
    const t = s.getBoundingClientRect(), r = e.clientX - t.left, o = e.clientY - t.top;
    i.globalCompositeOperation = "destination-out", i.beginPath(), i.arc(r, o, p, 0, Math.PI * 2), i.fill();
    const l = t.width / d, n = t.height / d;
    for (let a = Math.floor((r - p) / l); a <= Math.floor((r + p) / l); a++)
      for (let h = Math.floor((o - p) / n); h <= Math.floor((o + p) / n); h++)
        a >= 0 && h >= 0 && a < d && h < d && this.cells.add(h * d + a);
    ++this.moves % 10 === 0 && this.checkDone();
  }
  checkDone() {
    const e = Math.min(Math.max(Number(this.cfg().reveal_percent) || 50, 30), 80) / 100;
    this.cells.size / (d * d) >= e && this.reveal();
  }
  reveal() {
    var e;
    if (!this.revealed) {
      this.revealed = !0, this.status = c({ ar: "مبروك! هذا كود الخصم", en: "Here is your discount code" }), (e = this.resizer) == null || e.disconnect();
      try {
        localStorage.setItem(v(this.code()), "1");
      } catch {
      }
    }
  }
  async copy() {
    var s;
    const e = this.code();
    try {
      await navigator.clipboard.writeText(e), this.status = c({ ar: "تم نسخ الكود", en: "Code copied" });
    } catch {
      const i = this.querySelector(".wf-sc__code");
      i && ((s = window.getSelection()) == null || s.selectAllChildren(i)), this.status = c({ ar: "حددنا الكود، انسخه من قائمة النسخ", en: "The code is selected, copy it from your menu" });
    }
  }
  render() {
    var r;
    const e = this.cfg(), s = z(e) ? this.code() : "", i = k(e.expires);
    if (!s || i)
      return C() ? m : this.frame(f`<p class="wf-sc__note">${s ? c({ ar: "انتهى هذا الكوبون، ولن يظهر للعملاء", en: "This coupon has expired and is hidden from shoppers" }) : c({ ar: "اكتب كود الخصم في إعدادات هذا القسم", en: "Add the discount code in this section's settings" })}</p>`);
    const t = this.revealed && ((r = this.picked()) == null ? void 0 : r.label) || w(e.discount_text) || c({ ar: "خصم خاص على طلبك", en: "A special discount on your order" });
    return this.frame(f`<div class="wf-sc__card">
        <p class="wf-sc__deal">${t}</p>
        <div class=${`wf-sc__area${this.revealed ? " is-open" : ""}`}>
          <span class="wf-sc__code" aria-hidden=${this.revealed ? "false" : "true"}>${s}</span>
          <canvas class="wf-sc__canvas${this.revealed ? " is-gone" : ""}" aria-hidden="true"
            @pointerdown=${(o) => {
      var l, n;
      this.drawing = !0, (n = (l = o.target).setPointerCapture) == null || n.call(l, o.pointerId), this.scratchAt(o);
    }}
            @pointermove=${(o) => {
      this.drawing && this.scratchAt(o);
    }}
            @pointerup=${() => {
      this.drawing = !1, this.checkDone();
    }}
            @pointercancel=${() => {
      this.drawing = !1;
    }}></canvas>
        </div>
        <p class="wf-sc__status" aria-live="polite">${this.status}</p>
        <div class="wf-sc__actions">
          ${this.revealed ? f`<button type="button" class="wf-btn wf-sc__ghost" @click=${() => this.copy()}>${c({ ar: "نسخ الكود", en: "Copy code" })}</button>` : f`<button type="button" class="wf-btn wf-sc__ghost" @click=${() => this.reveal()}>${c({ ar: "اكشف الكود", en: "Reveal the code" })}</button>`}
          ${y() !== "none" ? f`<button type="button" class="wf-btn" aria-busy=${this.busy ? "true" : "false"} @click=${() => this.press({ quantity: 1 })}>${this.buyLabel()}</button>` : m}
        </div>
      </div>`, { extraClass: "wf-sc" });
  }
}
_([
  b()
], u.prototype, "revealed");
_([
  b()
], u.prototype, "status");
typeof u < "u" && u.registerSallaComponent("salla-scratch-coupon");
export {
  u as default
};
