import { LitElement as E, nothing as c, html as u } from "lit";
import { property as v, state as w } from "lit/decorators.js";
import { a as N } from "./buy-Cnk1jDve.js";
import { i as C, e as I, b as $, v as D, c as M, r as d, t as A, h as R, n as T, s as L, d as k, o as P } from "./styles-CBhBCxUD.js";
const i = 36e5;
function W(t, e = 3) {
  if (typeof t != "string" || !t.trim()) return null;
  const r = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/.exec(t.trim());
  if (!r) return null;
  const [, n, o, s, a = "0", l = "0"] = r, g = Date.UTC(Number(n), Number(o) - 1, Number(s), Number(a), Number(l));
  return Number.isNaN(g) ? null : g - e * i;
}
function x(t, e, r) {
  return e !== null && t < e ? "before" : r !== null && t >= r ? "ended" : "live";
}
const p = "__wfSale", y = "wf-early";
function q(t) {
  window[p] = t, window.dispatchEvent(new CustomEvent("wf:sale", { detail: t }));
}
function b() {
  return window[p] || null;
}
function _(t, e) {
  const r = (n) => String(n ?? "").replace(/\s+/g, "").toLowerCase();
  return !!r(t) && r(t) === r(e);
}
function U(t) {
  if (!(t != null && t.earlyCode)) return !1;
  try {
    return _(localStorage.getItem(y), t.earlyCode);
  } catch {
    return !1;
  }
}
function K(t) {
  try {
    localStorage.setItem(y, t);
  } catch {
  }
  window.dispatchEvent(new CustomEvent("wf:sale", { detail: b() }));
}
function V(t = Date.now(), e = b(), r = U(e)) {
  if (!e) return !0;
  const n = x(t, e.start, e.end);
  return n === "live" || n === "before" && r;
}
function F(t) {
  const e = Math.max(0, Math.floor(t / 1e3));
  return { d: Math.floor(e / 86400), h: Math.floor(e % 86400 / 3600), m: Math.floor(e % 3600 / 60), s: e % 60 };
}
function J(t, e, r, n) {
  const o = (a) => new Date(a).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""), s = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//white-friday//landing//AR",
    "BEGIN:VEVENT",
    `UID:${e}-white-friday`,
    `DTSTAMP:${o(e)}`,
    `DTSTART:${o(e)}`,
    `DTEND:${o(r ?? e + i)}`,
    `SUMMARY:${t.replace(/[,;\n]/g, " ")}`,
    `URL:${n}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT30M",
    "ACTION:DISPLAY",
    `DESCRIPTION:${t.replace(/[,;\n]/g, " ")}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(s.join(`\r
`))}`;
}
function Q(t, e) {
  const r = t.filter((n) => n.from !== null && n.to !== null && n.to > n.from).sort((n, o) => n.from - o.from);
  return {
    current: r.find((n) => e >= n.from && e < n.to) || null,
    next: r.find((n) => n.from > e) || null
  };
}
function X(t, e, r = 3) {
  if (t === null) return null;
  const n = (s) => Math.floor((s + r * i) / 864e5), o = n(t) - n(e);
  return o < 0 ? "past" : o === 0 ? "today" : "future";
}
function B(t, e) {
  const r = t.filter((s) => s.code && s.weight > 0), n = r.reduce((s, a) => s + a.weight, 0);
  if (!n) return null;
  let o = e * n;
  for (const s of r) {
    if (o < s.weight) return s;
    o -= s.weight;
  }
  return r[r.length - 1];
}
function Z(t, e, r = Math.random()) {
  try {
    const o = localStorage.getItem(t), s = e.find((a) => a.code === o);
    if (s) return s;
  } catch {
  }
  const n = B(e, r);
  try {
    n && localStorage.setItem(t, n.code);
  } catch {
  }
  return n;
}
function z(t, e) {
  const r = e.filter((a) => a.amount > 0 && a.reward).sort((a, l) => a.amount - l.amount), n = r.filter((a) => t >= a.amount).length, o = r[n] || null, s = r.length ? r[r.length - 1].amount : 0;
  return {
    reached: n,
    next: o,
    left: o ? Math.max(0, Math.round((o.amount - t) * 100) / 100) : 0,
    percent: s ? Math.min(100, Math.round(t / s * 100)) : 0
  };
}
function tt(t) {
  const e = Number(t == null ? void 0 : t.regular_price) || 0, r = Number((t == null ? void 0 : t.sale_price) || (t == null ? void 0 : t.price)) || 0;
  return e > r && r > 0 ? Math.round((e - r) / e * 100) : 0;
}
const f = 864e5;
function S(t, e = 3) {
  return Math.floor((t + e * i) / f) * f - e * i;
}
function et(t, e, r = 3) {
  const n = S(e, r), o = t.filter((s) => s.fromHour >= 0 && s.toHour <= 24 && s.toHour > s.fromHour);
  return [n, n + f].flatMap((s) => o.map((a) => ({ from: s + a.fromHour * i, to: s + a.toHour * i, item: a.item })));
}
function rt(t, e, r = 3) {
  return S(t, r) + e * f;
}
var O = Object.defineProperty, h = (t, e, r, n) => {
  for (var o = void 0, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (o = a(e, r, o) || o);
  return o && O(e, r, o), o;
};
function nt(t, e = "product") {
  const r = P();
  if (r) return r;
  const n = t[e], o = Array.isArray(n) ? n[0] : n, s = o && typeof o == "object" ? o.value ?? o.id : o;
  return s ? String(s) : null;
}
class m extends E {
  constructor() {
    super(...arguments), this.busy = !1, this.error = "", this.gated = !1, this.onSale = () => this.requestUpdate();
  }
  /** True when a shopper should not see this section yet; the editor always shows it. */
  closed() {
    return this.gated && C() && !V();
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.classList.add("wf-host"), I(), $(`wf-${this.styleId}`, this.styles()), window.addEventListener("wf:sale", this.onSale);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("wf:sale", this.onSale);
  }
  firstUpdated() {
    const e = this.querySelector(".wf-section:not([data-wf-hero]) > .wf-container");
    e && D(e);
  }
  cfg() {
    return M(this.config);
  }
  styles() {
    return "";
  }
  buyLabel() {
    return d(this.cfg().buy_text) || A({ ar: "اشتري الآن", en: "Buy now" });
  }
  async press(e = {}) {
    var n, o;
    if (this.busy) return;
    this.busy = !0, this.error = "";
    let r;
    try {
      r = await N(e);
    } finally {
      this.busy = !1;
    }
    r.kind === "error" && (this.error = r.message || "", (o = (n = R()) == null ? void 0 : n.error) == null || o.call(n, r.message));
  }
  frame(e, r = {}) {
    const n = this.cfg(), o = r.title === !1 ? "" : d(n.title), s = r.title === !1 ? "" : d(n.subtitle), a = T(n.section_id), l = ["wf-block wf-section", L(n), r.extraClass || ""].filter(Boolean).join(" ");
    return u`<section class=${l} style=${k(n)} data-wf-section=${a || c}
      ?data-wf-hero=${!!r.hero}>
      <div class="wf-container">
        ${o || s ? u`<div class="wf-title">${o ? u`<h2>${o}</h2>` : c}${s ? u`<p>${s}</p>` : c}</div>` : c}
        ${e}
        ${this.error ? u`<p class="wf-error" role="alert">${this.error}</p>` : c}
      </div>
    </section>`;
  }
}
h([
  v({ type: Object })
], m.prototype, "config");
h([
  w()
], m.prototype, "busy");
h([
  w()
], m.prototype, "error");
export {
  m as W,
  X as a,
  Z as b,
  tt as c,
  rt as d,
  et as e,
  Q as f,
  q as g,
  x as h,
  _ as i,
  U as j,
  J as k,
  F as l,
  nt as p,
  b as r,
  W as s,
  z as t,
  K as u
};
