import { html as o, nothing as i } from "lit";
import { state as b } from "lit/decorators.js";
import { p as j, u as T, d as O, i as U, t as n, c as N, w as S, r as p, e as D } from "./styles-DA4N1FjE.js";
import { W as I, s as C, g as L, h as q, i as M, u as W, j as E, k as F, l as H, m as V } from "./section-sTarKlwB.js";
let g = "", w = [];
function A(c) {
  const e = j(c), r = String(T(c.default_mode) || "light"), a = `${JSON.stringify(e)}|${r}`, t = document.documentElement, s = O(r);
  if (a === g) return s;
  g = a;
  for (const l of w) t.style.removeProperty(l);
  for (const [l, f] of Object.entries(e)) t.style.setProperty(l, f);
  return w = Object.keys(e), t.classList.toggle("wf-mode-dark", s === "dark"), t.classList.toggle("wf-mode-light", s === "light"), s;
}
function B() {
  const c = document.documentElement;
  for (const e of w) c.style.removeProperty(e);
  w = [], g = "", c.classList.remove("wf-mode-dark", "wf-mode-light");
}
var J = Object.defineProperty, _ = (c, e, r, a) => {
  for (var t = void 0, s = c.length - 1, l; s >= 0; s--)
    (l = c[s]) && (t = l(e, r, t) || t);
  return t && J(e, r, t), t;
};
const K = `
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
`, R = [
  { key: "d", ar: "يوم", en: "Days" },
  { key: "h", ar: "ساعة", en: "Hours" },
  { key: "m", ar: "دقيقة", en: "Min" },
  { key: "s", ar: "ثانية", en: "Sec" }
];
class h extends I {
  constructor() {
    super(...arguments), this.styleId = "sale-hero", this.now = Date.now(), this.code = "", this.codeError = !1;
  }
  styles() {
    return K;
  }
  connectedCallback() {
    super.connectedCallback(), this.publish(), this.timer = window.setInterval(() => this.now = Date.now(), 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer), B();
  }
  dates() {
    const e = this.cfg(), r = Number.isFinite(Number(e.tz_offset)) && e.tz_offset !== "" ? Number(e.tz_offset) : 3;
    return { start: C(e.start, r), end: C(e.end, r), tz: r };
  }
  publish() {
    const { start: e, end: r } = this.dates();
    L({ start: e, end: r, earlyCode: String(this.cfg().early_code || "").trim() });
  }
  willUpdate() {
    const e = this.cfg();
    A({ brand_color: e.brand_color, default_mode: e.default_mode });
    const { start: r, end: a } = this.dates(), t = this.phase(r, a);
    t !== this.lastPhase && (this.lastPhase = t, this.publish());
  }
  /** In the editor the merchant picks which phase to look at; shoppers see the real one. */
  phase(e, r) {
    var t, s;
    const a = String(((s = (t = this.cfg().preview_phase) == null ? void 0 : t[0]) == null ? void 0 : s.value) ?? this.cfg().preview_phase ?? "auto");
    return !U() && (a === "before" || a === "live" || a === "ended") ? a : q(this.now, e, r);
  }
  tryCode(e) {
    e.preventDefault(), M(this.code, this.cfg().early_code) ? (W(this.code.trim()), this.codeError = !1, this.requestUpdate()) : this.codeError = !0;
  }
  scrollToOffers() {
    const e = String(this.cfg().offers_target || "deals").replace(/^#/, "");
    E(e);
  }
  renderClock(e, r) {
    const a = V(e);
    return o`<span class="wf-sh__label">${r}</span>
      <div class="wf-sh__clock" role="timer" aria-label=${r}>
        ${R.map((t) => o`<div class="wf-sh__unit"><b>${String(a[t.key]).padStart(2, "0")}</b><span>${n(t)}</span></div>`)}
      </div>`;
  }
  render() {
    var k, x;
    const e = this.cfg(), { start: r, end: a } = this.dates(), t = this.phase(r, a), s = (d) => p(e[`${t}_${d}`]), l = String(e[`${t}_image`] || e.image || ""), f = F({ start: r, end: a, earlyCode: String(e.early_code || "") }), y = ((x = (k = N()) == null ? void 0 : k.config) == null ? void 0 : x.get("store.url")) || location.origin, v = s("title") || n({ ar: "الجمعة البيضاء", en: "White Friday" });
    let m = i;
    t === "before" && r !== null && (m = this.renderClock(r - this.now, s("label") || n({ ar: "يبدأ العرض بعد", en: "Starts in" }))), t === "live" && a !== null && (m = this.renderClock(a - this.now, s("label") || n({ ar: "ينتهي العرض بعد", en: "Ends in" })));
    const $ = S(e.channel_url), z = S(e.ended_url) || y, P = t === "before" && String(e.early_code || "").trim(), u = p(e.before_button);
    return this.frame(o`
      ${l ? o`<img class="wf-sh__bg" src=${l} alt="" fetchpriority="high" /><span class="wf-sh__veil" style=${`--wf-sh-veil:${Math.min(Math.max(Number(e.overlay ?? 45), 0), 85) / 100}`}></span>` : i}
      <div class="wf-sh__body">
        ${s("badge") ? o`<span class="wf-sh__badge">${s("badge")}</span>` : i}
        <h1 class="wf-sh__title">${v}</h1>
        ${s("subtitle") ? o`<p class="wf-sh__sub">${s("subtitle")}</p>` : i}
        ${m}
        <div class="wf-sh__actions">
          ${t === "before" && u && !f ? o`<button type="button" class="wf-btn" @click=${() => E(D(e.before_target) || "game")}>${u}</button>` : i}
          ${t === "before" && r !== null && e.show_reminder !== !1 ? o`<a class=${`wf-btn${u && !f ? " wf-sh__ghost" : ""}`} href=${H(v, r, a, y)} download="white-friday.ics">${n({ ar: "ذكّريني بالموعد", en: "Remind me" })}</a>` : i}
          ${t === "before" && $ ? o`<a class="wf-btn wf-sh__ghost" href=${$} target="_blank" rel="noopener">${p(e.channel_label) || n({ ar: "تابعينا عشان أول ما يبدأ", en: "Follow us for the start" })}</a>` : i}
          ${t === "live" || t === "before" && f ? o`<button type="button" class="wf-btn" @click=${() => this.scrollToOffers()}>${s("button") || n({ ar: "تسوّقي العروض", en: "Shop the deals" })}</button>` : i}
          ${t === "ended" ? o`<a class="wf-btn" href=${z}>${s("button") || n({ ar: "تسوّقي من المتجر", en: "Shop the store" })}</a>` : i}
        </div>
        ${P ? f ? o`<p class="wf-sh__ok" role="status">${n({ ar: "الدخول المبكر مفتوح لك. العروض تحت 👇", en: "Early access is open for you. Deals below" })}</p>` : o`<form class="wf-sh__early" @submit=${(d) => this.tryCode(d)}>
                <label class="wf-visually-hidden" for="wf-sh-code">${n({ ar: "كود الدخول المبكر", en: "Early access code" })}</label>
                <input id="wf-sh-code" autocomplete="off" .value=${this.code} placeholder=${p(e.early_label) || n({ ar: "عندك كود الدخول المبكر؟", en: "Have an early access code?" })}
                  @input=${(d) => {
      this.code = d.target.value, this.codeError = !1;
    }} />
                <button type="submit" class="wf-btn wf-sh__ghost">${n({ ar: "افتحي العروض", en: "Open the deals" })}</button>
                ${this.codeError ? o`<span class="wf-error" role="alert">${n({ ar: "الكود ده مش صح", en: "That code is not right" })}</span>` : i}
              </form>` : i}
      </div>`, { extraClass: `wf-sh${l ? " wf-sh--media" : ""}`, hero: !0, title: !1 });
  }
}
_([
  b()
], h.prototype, "now");
_([
  b()
], h.prototype, "code");
_([
  b()
], h.prototype, "codeError");
typeof h < "u" && h.registerSallaComponent("salla-sale-hero");
export {
  h as default
};
