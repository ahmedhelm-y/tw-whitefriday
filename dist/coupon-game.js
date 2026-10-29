import { nothing as g, html as c } from "lit";
import { state as l } from "lit/decorators.js";
import { c as m, a as w, b as _, d as b } from "./codecard-Bd17k6Ma.js";
import { g as v, r as u, i as k, t as d, u as $ } from "./styles-CBhBCxUD.js";
import { W as y, b as x } from "./section-Bp25z5NG.js";
var C = Object.defineProperty, p = (f, e, t, r) => {
  for (var i = void 0, n = f.length - 1, s; n >= 0; n--)
    (s = f[n]) && (i = s(e, t, i) || i);
  return i && C(e, t, i), i;
};
const z = `${m}
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
`, S = ["🎁", "⭐", "💎", "🛍️", "🎀", "🌙"];
function P(f) {
  const e = [...f];
  for (let t = e.length - 1; t > 0; t--) {
    const r = Math.floor(Math.random() * (t + 1));
    [e[t], e[r]] = [e[r], e[t]];
  }
  return e;
}
class o extends y {
  constructor() {
    super(...arguments), this.styleId = "coupon-game", this.chosen = -1, this.deck = [], this.up = [], this.done = /* @__PURE__ */ new Set(), this.status = "";
  }
  styles() {
    return z;
  }
  connectedCallback() {
    super.connectedCallback();
    const e = S.slice(0, 3);
    this.deck = P([...e, ...e]);
  }
  code() {
    if (this.prize !== void 0) return this.prize;
    const e = v(this.cfg().codes, "codes").map((t) => ({ code: String(t.code || "").trim(), label: u(t.label), weight: Number(t.weight) || 1 })).filter((t) => t.code);
    return this.prize = e.length ? x("wf-game", e) : null, this.prize;
  }
  flip(e) {
    if (this.done.has(e) || this.up.includes(e) || this.up.length === 2) return;
    const t = [...this.up, e];
    if (this.up = t, t.length < 2) return;
    const [r, i] = t;
    window.setTimeout(() => {
      this.deck[r] === this.deck[i] && (this.done = /* @__PURE__ */ new Set([...this.done, r, i])), this.up = [];
    }, this.deck[r] === this.deck[i] ? 250 : 800);
  }
  render() {
    const e = this.cfg(), t = w(e) ? this.code() : null;
    if (!t)
      return k() ? g : this.frame(c`<p class="wf-empty">${d({ ar: "أضف أكواد الجوائز من إعدادات هذا القسم", en: "Add the prize codes in this section's settings" })}</p>`);
    const r = $(e.mode) === "match" ? "match" : "gifts", n = (r === "gifts" ? this.chosen >= 0 : this.done.size === this.deck.length) ? c`<p class="wf-cg__win">${t.label || d({ ar: "مبروك! ده كودك", en: "You won! Here is your code" })}</p>
          ${_(t.code, this.status, async (s) => {
      this.status = await b(t.code, s.currentTarget.previousElementSibling);
    })}` : g;
    return r === "gifts" ? this.frame(c`<div class="wf-cg__stage">
        <p>${u(e.hint) || d({ ar: "اختاري هدية من التلاتة", en: "Pick one of the three gifts" })}</p>
        <div class="wf-cg__boxes">${[0, 1, 2].map((s) => c`<button type="button" class=${`wf-cg__gift${this.chosen === s ? " is-open" : ""}`}
          aria-label=${d({ ar: `الهدية ${s + 1}`, en: `Gift ${s + 1}` })} ?disabled=${this.chosen >= 0 && this.chosen !== s}
          @click=${() => {
      this.chosen < 0 && (this.chosen = s);
    }}>${this.chosen === s ? "🎉" : "🎁"}</button>`)}</div>
        ${n}
      </div>`, { extraClass: "wf-cg" }) : this.frame(c`<div class="wf-cg__stage">
      <p>${u(e.hint) || d({ ar: "طابقي الكروت اللي شبه بعض عشان تكسبي", en: "Match the pairs to win" })}</p>
      <div class="wf-cg__cards">${this.deck.map((s, a) => {
      const h = this.up.includes(a) || this.done.has(a);
      return c`<button type="button" class=${`wf-cg__card${this.done.has(a) ? " is-done" : h ? " is-up" : ""}`}
          aria-label=${h ? s : d({ ar: `كارت ${a + 1}`, en: `Card ${a + 1}` })} @click=${() => this.flip(a)}>${h ? s : "?"}</button>`;
    })}</div>
      ${n}
    </div>`, { extraClass: "wf-cg" });
  }
}
p([
  l()
], o.prototype, "chosen");
p([
  l()
], o.prototype, "deck");
p([
  l()
], o.prototype, "up");
p([
  l()
], o.prototype, "done");
p([
  l()
], o.prototype, "status");
typeof o < "u" && o.registerSallaComponent("salla-coupon-game");
export {
  o as default
};
