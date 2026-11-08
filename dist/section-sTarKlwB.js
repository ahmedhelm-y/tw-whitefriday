import { LitElement as E, nothing as l, html as c } from "lit";
import { property as N, state as p } from "lit/decorators.js";
import { i as $, h as C, j as I, z as M, n as D, r as f, t as A, k as R, c as T, e as w, s as k, q as L, l as _ } from "./styles-DA4N1FjE.js";
const i = 36e5;
function q(e, t = 3) {
  if (typeof e != "string" || !e.trim()) return null;
  const r = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/.exec(e.trim());
  if (!r) return null;
  const [, n, o, s, a = "0", u = "0"] = r, g = Date.UTC(Number(n), Number(o) - 1, Number(s), Number(a), Number(u));
  return Number.isNaN(g) ? null : g - t * i;
}
function x(e, t, r) {
  return t !== null && e < t ? "before" : r !== null && e >= r ? "ended" : "live";
}
const y = "__wfSale", b = "wf-early";
function W(e) {
  window[y] = e, window.dispatchEvent(new CustomEvent("wf:sale", { detail: e }));
}
function S() {
  return window[y] || null;
}
function P(e, t) {
  const r = (n) => String(n ?? "").replace(/\s+/g, "").toLowerCase();
  return !!r(e) && r(e) === r(t);
}
function V(e) {
  if (!(e != null && e.earlyCode)) return !1;
  try {
    return P(localStorage.getItem(b), e.earlyCode);
  } catch {
    return !1;
  }
}
function K(e) {
  try {
    localStorage.setItem(b, e);
  } catch {
  }
  window.dispatchEvent(new CustomEvent("wf:sale", { detail: S() }));
}
function U(e = Date.now(), t = S(), r = V(t)) {
  if (!t) return !0;
  const n = x(e, t.start, t.end);
  return n === "live" || n === "before" && r;
}
function F(e) {
  const t = Math.max(0, Math.floor(e / 1e3));
  return { d: Math.floor(t / 86400), h: Math.floor(t % 86400 / 3600), m: Math.floor(t % 3600 / 60), s: t % 60 };
}
function z(e, t, r, n) {
  const o = (a) => new Date(a).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""), s = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//white-friday//landing//AR",
    "BEGIN:VEVENT",
    `UID:${t}-white-friday`,
    `DTSTAMP:${o(t)}`,
    `DTSTART:${o(t)}`,
    `DTEND:${o(r ?? t + i)}`,
    `SUMMARY:${e.replace(/[,;\n]/g, " ")}`,
    `URL:${n}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${e.replace(/[,;\n]/g, " ")}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(s.join(`\r
`))}`;
}
function J(e, t) {
  const r = e.filter((n) => n.from !== null && n.to !== null && n.to > n.from).sort((n, o) => n.from - o.from);
  return {
    current: r.find((n) => t >= n.from && t < n.to) || null,
    next: r.find((n) => n.from > t) || null
  };
}
function Q(e, t, r = 3) {
  if (e === null) return null;
  const n = (s) => Math.floor((s + r * i) / 864e5), o = n(e) - n(t);
  return o < 0 ? "past" : o === 0 ? "today" : "future";
}
function j(e, t) {
  const r = e.filter((s) => s.code && s.weight > 0), n = r.reduce((s, a) => s + a.weight, 0);
  if (!n) return null;
  let o = t * n;
  for (const s of r) {
    if (o < s.weight) return s;
    o -= s.weight;
  }
  return r[r.length - 1];
}
function X(e, t, r = Math.random()) {
  try {
    const o = localStorage.getItem(e), s = t.find((a) => a.code === o);
    if (s) return s;
  } catch {
  }
  const n = j(t, r);
  try {
    n && localStorage.setItem(e, n.code);
  } catch {
  }
  return n;
}
function Z(e, t) {
  const r = t.filter((a) => a.amount > 0 && a.reward).sort((a, u) => a.amount - u.amount), n = r.filter((a) => e >= a.amount).length, o = r[n] || null, s = r.length ? r[r.length - 1].amount : 0;
  return {
    reached: n,
    next: o,
    left: o ? Math.max(0, Math.round((o.amount - e) * 100) / 100) : 0,
    percent: s ? Math.min(100, Math.round(e / s * 100)) : 0
  };
}
function tt(e) {
  const t = Number(e == null ? void 0 : e.regular_price) || 0, r = Number((e == null ? void 0 : e.sale_price) || (e == null ? void 0 : e.price)) || 0;
  return t > r && r > 0 ? Math.round((t - r) / t * 100) : 0;
}
const d = 864e5;
function v(e, t = 3) {
  return Math.floor((e + t * i) / d) * d - t * i;
}
function et(e, t, r = 3) {
  const n = v(t, r), o = e.filter((s) => s.fromHour >= 0 && s.toHour <= 24 && s.toHour > s.fromHour);
  return [n, n + d].flatMap((s) => o.map((a) => ({ from: s + a.fromHour * i, to: s + a.toHour * i, item: a.item })));
}
function rt(e, t, r = 3) {
  return v(e, r) + t * d;
}
var B = Object.defineProperty, h = (e, t, r, n) => {
  for (var o = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = a(t, r, o) || o);
  return o && B(t, r, o), o;
};
function O(e) {
  var n;
  const t = document.querySelector(`[data-wf-section="${CSS.escape(e)}"]`), r = (n = window.matchMedia) == null ? void 0 : n.call(window, "(prefers-reduced-motion: reduce)").matches;
  t == null || t.scrollIntoView({ behavior: r ? "auto" : "smooth", block: "start" });
}
function nt(e, t = "product") {
  const r = _();
  if (r) return r;
  const n = e[t], o = Array.isArray(n) ? n[0] : n, s = o && typeof o == "object" ? o.value ?? o.id : o;
  return s ? String(s) : null;
}
class m extends E {
  constructor() {
    super(...arguments), this.busy = !1, this.error = "", this.gated = !1, this.onSale = () => this.requestUpdate();
  }
  /** True when a shopper should not see this section yet; the editor always shows it. */
  closed() {
    return this.gated && $() && !U();
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("wf-host"), C(), I(`wf-${this.styleId}`, this.styles()), window.addEventListener("wf:sale", this.onSale);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("wf:sale", this.onSale);
  }
  firstUpdated() {
    const t = this.querySelector(".wf-section:not([data-wf-hero]) > .wf-container");
    t && M(t);
  }
  cfg() {
    return D(this.config);
  }
  styles() {
    return "";
  }
  buyLabel() {
    return f(this.cfg().buy_text) || A({ ar: "اشتري الآن", en: "Buy now" });
  }
  async press(t = {}) {
    var n, o;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let r;
    try {
      r = await R(t);
    } finally {
      this.busy = !1;
    }
    r.kind === "error" && (this.error = r.message || "", (o = (n = T()) == null ? void 0 : n.error) == null || o.call(n, r.message));
  }
  /**
   * The page's one primary action, repeated at the end of a section: the same button that takes the
   * shopper down to the deals. Hidden when the merchant clears its text.
   */
  renderCta() {
    const t = this.cfg(), r = f(t.cta_text), n = w(t.cta_target) || "deals";
    return !r || t.show_cta === !1 ? l : c`<div class="wf-cta"><button type="button" class="wf-btn" @click=${() => O(n)}>${r}</button></div>`;
  }
  frame(t, r = {}) {
    const n = this.cfg(), o = r.title === !1 ? "" : f(n.title), s = r.title === !1 ? "" : f(n.subtitle), a = w(n.section_id), u = ["wf-block wf-section", k(n), r.extraClass || ""].filter(Boolean).join(" ");
    return c`<section class=${u} style=${L(n)} data-wf-section=${a || l}
      ?data-wf-hero=${!!r.hero}>
      <div class="wf-container">
        ${o || s ? c`<div class="wf-title">${o ? c`<h2>${o}</h2>` : l}${s ? c`<p>${s}</p>` : l}</div>` : l}
        ${t}
        ${this.error ? c`<p class="wf-error" role="alert">${this.error}</p>` : l}
      </div>
    </section>`;
  }
}
h([
  N({ type: Object })
], m.prototype, "config");
h([
  p()
], m.prototype, "busy");
h([
  p()
], m.prototype, "error");
export {
  m as W,
  Q as a,
  X as b,
  tt as c,
  rt as d,
  et as e,
  J as f,
  W as g,
  x as h,
  P as i,
  O as j,
  V as k,
  z as l,
  F as m,
  nt as p,
  S as r,
  q as s,
  Z as t,
  K as u
};
