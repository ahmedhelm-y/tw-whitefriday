import { nothing as d, html as s } from "lit";
import { state as f } from "lit/decorators.js";
import { c as h, a as g, b as _, d as y } from "./codecard-Bd17k6Ma.js";
import { g as b, r as m, i as u, t as l, a as v } from "./styles-CBhBCxUD.js";
import { f as x } from "./eta-DuPtGS8w.js";
import { W as $, s as k, r as C, d as S, a as z } from "./section-Bp25z5NG.js";
var D = Object.defineProperty, p = (c, o, a, i) => {
  for (var t = void 0, e = c.length - 1, r; e >= 0; e--)
    (r = c[e]) && (t = r(o, a, t) || t);
  return t && D(o, a, t), t;
};
const I = `${h}
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
class n extends $ {
  constructor() {
    super(...arguments), this.styleId = "advent-doors", this.now = Date.now(), this.opened = -1, this.status = "";
  }
  styles() {
    return I;
  }
  connectedCallback() {
    super.connectedCallback(), this.timer = window.setInterval(() => this.now = Date.now(), 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.clearInterval(this.timer);
  }
  days() {
    var i;
    const o = Number(this.cfg().tz_offset ?? 3) || 3, a = k(this.cfg().start, o) ?? ((i = C()) == null ? void 0 : i.start) ?? null;
    return a === null ? [] : b(this.cfg().days, "days").map((t) => ({ title: m(t.title), desc: m(t.desc), code: String(t.code || "").trim() })).filter((t) => t.title).map((t, e) => ({ ...t, at: S(a, e, o) })).map((t, e) => ({ ...t, state: u() ? z(t.at, this.now, o) : e === 0 ? "today" : "future" }));
  }
  render() {
    const o = this.days();
    if (!o.length)
      return u() ? d : this.frame(s`<p class="wf-empty">${l({ ar: "أضف عروض الأيام، والتقويم بيبدأ من تاريخ بداية العرض", en: "Add the daily offers; the calendar starts on the sale start date" })}</p>`);
    const a = this.opened >= 0 ? o[this.opened] : null, i = g(this.cfg()), t = v();
    return this.frame(s`
      <ul class="wf-ad__doors">${o.map((e, r) => {
      const w = x(new Date(e.at + 108e5 + 1), t).split(" ").slice(1).join(" ");
      return e.state === "today" ? s`<li><button type="button" class="wf-ad__door is-today" aria-expanded=${this.opened === r ? "true" : "false"}
            @click=${() => {
        this.opened = this.opened === r ? -1 : r, this.status = "";
      }}>
            <b>${r + 1}</b><small>${l({ ar: "افتحي باب النهارده", en: "Open today's door" })}</small></button></li>` : s`<li><div class=${`wf-ad__door is-${e.state}`} aria-label=${e.state === "past" ? l({ ar: "عرض فات", en: "Past offer" }) : l({ ar: "مقفول لسه", en: "Still locked" })}>
          <b>${r + 1}</b><small>${w}</small></div></li>`;
    })}</ul>
      ${a ? s`<div class="wf-ad__open" aria-live="polite">
            <h3>${a.title}</h3>${a.desc ? s`<p>${a.desc}</p>` : d}
            ${a.code && i ? _(a.code, this.status, async (e) => {
      this.status = await y(a.code, e.currentTarget.previousElementSibling);
    }) : d}
          </div>` : d}`, { extraClass: "wf-ad" });
  }
}
p([
  f()
], n.prototype, "now");
p([
  f()
], n.prototype, "opened");
p([
  f()
], n.prototype, "status");
typeof n < "u" && n.registerSallaComponent("salla-advent-doors");
export {
  n as default
};
