import { html as i, nothing as o } from "lit";
import { state as w } from "lit/decorators.js";
import { i as C, t as n, b as z, w as $, r as p } from "./styles-B5EzsqQ8.js";
import { W as E, s as k, g as j, h as U, i as T, u as q, j as D, k as I, l as N } from "./section-CJM2ceBk.js";
var P = Object.defineProperty, m = (h, e, t, s) => {
  for (var r = void 0, a = h.length - 1, l; a >= 0; a--)
    (l = h[a]) && (r = l(e, t, r) || r);
  return r && P(e, t, r), r;
};
const O = `
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
`, W = [
  { key: "d", ar: "يوم", en: "Days" },
  { key: "h", ar: "ساعة", en: "Hours" },
  { key: "m", ar: "دقيقة", en: "Min" },
  { key: "s", ar: "ثانية", en: "Sec" }
];
class f extends E {
  constructor() {
    super(...arguments), this.styleId = "sale-hero", this.now = Date.now(), this.code = "", this.codeError = !1;
  }
  styles() {
    return O;
  }
  connectedCallback() {
    super.connectedCallback(), this.publish(), this.timer = window.setInterval(() => this.now = Date.now(), 1e3);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  dates() {
    const e = this.cfg(), t = Number.isFinite(Number(e.tz_offset)) && e.tz_offset !== "" ? Number(e.tz_offset) : 3;
    return { start: k(e.start, t), end: k(e.end, t), tz: t };
  }
  publish() {
    const { start: e, end: t } = this.dates();
    j({ start: e, end: t, earlyCode: String(this.cfg().early_code || "").trim() });
  }
  willUpdate() {
    const { start: e, end: t } = this.dates(), s = this.phase(e, t);
    s !== this.lastPhase && (this.lastPhase = s, this.publish());
  }
  /** In the editor the merchant picks which phase to look at; shoppers see the real one. */
  phase(e, t) {
    var r, a;
    const s = String(((a = (r = this.cfg().preview_phase) == null ? void 0 : r[0]) == null ? void 0 : a.value) ?? this.cfg().preview_phase ?? "auto");
    return !C() && (s === "before" || s === "live" || s === "ended") ? s : U(this.now, e, t);
  }
  tryCode(e) {
    e.preventDefault(), T(this.code, this.cfg().early_code) ? (q(this.code.trim()), this.codeError = !1, this.requestUpdate()) : this.codeError = !0;
  }
  scrollToOffers() {
    var t;
    const e = String(this.cfg().offers_target || "deals").replace(/^#/, "");
    (t = document.querySelector(`[data-wf-section="${e}"]`)) == null || t.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  renderClock(e, t) {
    const s = N(e);
    return i`<span class="wf-sh__label">${t}</span>
      <div class="wf-sh__clock" role="timer" aria-label=${t}>
        ${W.map((r) => i`<div class="wf-sh__unit"><b>${String(s[r.key]).padStart(2, "0")}</b><span>${n(r)}</span></div>`)}
      </div>`;
  }
  render() {
    var v, y;
    const e = this.cfg(), { start: t, end: s } = this.dates(), r = this.phase(t, s), a = (c) => p(e[`${r}_${c}`]), l = String(e[`${r}_image`] || e.image || ""), g = D({ start: t, end: s, earlyCode: String(e.early_code || "") }), u = ((y = (v = z()) == null ? void 0 : v.config) == null ? void 0 : y.get("store.url")) || location.origin, b = a("title") || n({ ar: "الجمعة البيضاء", en: "White Friday" });
    let d = o;
    r === "before" && t !== null && (d = this.renderClock(t - this.now, a("label") || n({ ar: "يبدأ العرض بعد", en: "Starts in" }))), r === "live" && s !== null && (d = this.renderClock(s - this.now, a("label") || n({ ar: "ينتهي العرض بعد", en: "Ends in" })));
    const _ = $(e.channel_url), x = $(e.ended_url) || u, S = r === "before" && String(e.early_code || "").trim();
    return this.frame(i`
      ${l ? i`<img class="wf-sh__bg" src=${l} alt="" fetchpriority="high" /><span class="wf-sh__veil" style=${`--wf-sh-veil:${Math.min(Math.max(Number(e.overlay ?? 45), 0), 85) / 100}`}></span>` : o}
      <div class="wf-sh__body">
        ${a("badge") ? i`<span class="wf-sh__badge">${a("badge")}</span>` : o}
        <h1 class="wf-sh__title">${b}</h1>
        ${a("subtitle") ? i`<p class="wf-sh__sub">${a("subtitle")}</p>` : o}
        ${d}
        <div class="wf-sh__actions">
          ${r === "before" && t !== null && e.show_reminder !== !1 ? i`<a class="wf-btn" href=${I(b, t, s, u)} download="white-friday.ics">${n({ ar: "ذكّريني بالموعد", en: "Remind me" })}</a>` : o}
          ${r === "before" && _ ? i`<a class="wf-btn wf-sh__ghost" href=${_} target="_blank" rel="noopener">${p(e.channel_label) || n({ ar: "تابعينا عشان أول ما يبدأ", en: "Follow us for the start" })}</a>` : o}
          ${r === "live" || r === "before" && g ? i`<button type="button" class="wf-btn" @click=${() => this.scrollToOffers()}>${a("button") || n({ ar: "تسوّقي العروض", en: "Shop the deals" })}</button>` : o}
          ${r === "ended" ? i`<a class="wf-btn" href=${x}>${a("button") || n({ ar: "تسوّقي من المتجر", en: "Shop the store" })}</a>` : o}
        </div>
        ${S ? g ? i`<p class="wf-sh__ok" role="status">${n({ ar: "الدخول المبكر مفتوح لك. العروض تحت 👇", en: "Early access is open for you. Deals below" })}</p>` : i`<form class="wf-sh__early" @submit=${(c) => this.tryCode(c)}>
                <label class="wf-visually-hidden" for="wf-sh-code">${n({ ar: "كود الدخول المبكر", en: "Early access code" })}</label>
                <input id="wf-sh-code" autocomplete="off" .value=${this.code} placeholder=${p(e.early_label) || n({ ar: "عندك كود الدخول المبكر؟", en: "Have an early access code?" })}
                  @input=${(c) => {
      this.code = c.target.value, this.codeError = !1;
    }} />
                <button type="submit" class="wf-btn wf-sh__ghost">${n({ ar: "افتحي العروض", en: "Open the deals" })}</button>
                ${this.codeError ? i`<span class="wf-error" role="alert">${n({ ar: "الكود ده مش صح", en: "That code is not right" })}</span>` : o}
              </form>` : o}
      </div>`, { extraClass: `wf-sh${l ? " wf-sh--media" : ""}`, hero: !0, title: !1 });
  }
}
m([
  w()
], f.prototype, "now");
m([
  w()
], f.prototype, "code");
m([
  w()
], f.prototype, "codeError");
typeof f < "u" && f.registerSallaComponent("salla-sale-hero");
export {
  f as default
};
