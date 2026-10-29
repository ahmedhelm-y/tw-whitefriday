import { render as F, nothing as _, html as l } from "lit";
import { unsafeHTML as A } from "lit/directives/unsafe-html.js";
import { e as k, c as K } from "./buy-Dta8ARKq.js";
import { i as L, b as S, f as W, t as c, e as X, c as G, v as H, m as E } from "./styles-B5EzsqQ8.js";
import { t as U } from "./section-CJM2ceBk.js";
function Z(e) {
  var n;
  return (((n = e.product) == null ? void 0 : n.options) || []).filter((i) => (i == null ? void 0 : i.required) && (i.details || []).length && !e.options[String(i.id)]).map((i) => Number(i.id));
}
function xe(e, t = 0) {
  var r;
  const n = {}, i = e.filter((a) => a.selected);
  for (const a of i) {
    const d = Z(a);
    d.length && (n[String((r = a.product) == null ? void 0 : r.id)] = d);
  }
  return { ok: i.length >= t && Object.keys(n).length === 0, missing: n };
}
const R = (e) => Number((e == null ? void 0 : e.sale_price) || (e == null ? void 0 : e.price)) || 0;
function q(e) {
  var n;
  let t = 0;
  for (const i of ((n = e.product) == null ? void 0 : n.options) || []) {
    const r = e.options[String(i.id)], a = (i.details || []).find((d) => Number(d.id) === Number(r));
    t += Number(a == null ? void 0 : a.additional_price) || 0;
  }
  return t;
}
function $e(e) {
  return !((e == null ? void 0 : e.status) === "out" || (e == null ? void 0 : e.is_available) === !1 || (e == null ? void 0 : e.is_out_of_stock) === !0);
}
function ke(e) {
  const t = e.filter((n) => n.selected);
  return {
    total: t.reduce((n, i) => n + (R(i.product) + q(i)) * i.quantity, 0),
    regular: t.reduce((n, i) => {
      var r;
      return n + (Math.max(Number((r = i.product) == null ? void 0 : r.regular_price) || 0, R(i.product)) + q(i)) * i.quantity;
    }, 0),
    count: t.length
  };
}
function Ie(e) {
  return e.filter((t) => t.selected).map((t) => {
    var n, i;
    return {
      id: String((n = t.product) == null ? void 0 : n.id),
      quantity: t.quantity,
      options: Object.keys(t.options).length ? t.options : void 0,
      max: Number((i = t.product) == null ? void 0 : i.max_quantity) || void 0
    };
  });
}
const J = "٠١٢٣٤٥٦٧٨٩";
function Q(e) {
  return String(e ?? "").replace(/[٠-٩]/g, (t) => String(J.indexOf(t))).replace(/\s+/g, "").toLowerCase();
}
const V = /اسود|أسود|ابيض|أبيض|بيج|بني|رمادي|كحلي|ازرق|أزرق|اخضر|أخضر|زيتي|عنابي|نبيتي|احمر|أحمر|وردي|زهري|فوشي|موف|بنفسجي|ليلكي|ذهبي|فضي|نود|كريمي|black|white|beige|brown|grey|gray|navy|blue|green|olive|maroon|burgundy|red|pink|fuchsia|purple|lilac|gold|silver|nude|cream/i, ee = /^(\d{2}\s*-\s*)?(xxs|xs|s|m|l|xl|xxl|xxxl|\dxl)(\s*-\s*\d{2})?$|free\s*size|فري\s*سايز|مقاس\s*واحد/i;
function te(e) {
  const t = ((e == null ? void 0 : e.details) || []).map((r) => Q(r == null ? void 0 : r.name));
  if (!t.length) return null;
  const n = (r) => t.filter(r).length / t.length;
  if ((e == null ? void 0 : e.type) === "color" || n((r) => V.test(r)) >= 0.5) return "color";
  if (n((r) => ee.test(r)) >= 0.5) return "size";
  const i = t.map((r) => /^\d{2}(\.\d)?(in|inch|انش|إنش|بوصة|")?$/.test(r) ? parseFloat(r) : NaN);
  return i.every((r) => r >= 48 && r <= 66) ? "length" : i.every((r) => r >= 30 && r <= 47) ? "size" : null;
}
function Ne(e, t) {
  const n = Number(e == null ? void 0 : e.quantity);
  return e != null && e.can_show_remained_quantity && !(e != null && e.is_hidden_quantity) && Number.isFinite(n) && n >= 0 ? n : null;
}
function Se(e, t) {
  return e !== null && e > 0 && e <= Math.max(1, t) ? e : null;
}
const ne = {
  size: { ar: "المقاس", en: "Size" },
  length: { ar: "الطول", en: "Length" },
  color: { ar: "اللون", en: "Color" }
};
function ie(e, t) {
  const n = te(e);
  return n ? ne[n][t === "en" ? "en" : "ar"] : String((e == null ? void 0 : e.name) || "");
}
const o = { lines: [], count: 0, total: 0, justAdded: "", demo: !1 }, y = /* @__PURE__ */ new Map();
let re = 0;
function C() {
  return o;
}
function x() {
  window.dispatchEvent(new CustomEvent("wf:cart-state", { detail: o })), window.dispatchEvent(new Event("wf:cart"));
}
function j() {
  o.count = o.lines.reduce((e, t) => e + t.quantity, 0);
}
function ae(e, t = {}, n = "ar") {
  return ((e == null ? void 0 : e.options) || []).map((i) => {
    const r = (i.details || []).find((a) => Number(a.id) === Number(t[String(i.id)]));
    return r ? `${ie(i, n)}: ${r.name}` : "";
  }).filter(Boolean).join(" · ");
}
function T(e) {
  var a;
  const t = ((a = e == null ? void 0 : e.data) == null ? void 0 : a.cart) || (e == null ? void 0 : e.data);
  if (!t || typeof t != "object") return null;
  const n = Array.isArray(t.items) ? t.items : null, i = t.sub_total ?? t.total, r = Number(typeof i == "object" ? i == null ? void 0 : i.amount : i);
  return !n && !Number.isFinite(r) ? null : { items: n, total: Number.isFinite(r) ? r : null };
}
function oe(e, t, n) {
  const i = [...e], r = [];
  for (const a of t) {
    const d = String(a.product_id);
    let f = i.findIndex(($) => $.itemId === a.id);
    f < 0 && (f = i.findIndex(($) => $.itemId === null && $.productId === d));
    const s = f >= 0 ? i.splice(f, 1)[0] : null, w = Math.max(1, Number(a.quantity) || 1), p = Number(a.total) > 0 ? Math.round(Number(a.total) / w * 100) / 100 : Number(a.price ?? a.product_price ?? (s == null ? void 0 : s.unit) ?? 0), u = n.get(d);
    r.push({
      key: (s == null ? void 0 : s.key) || `c${a.id}`,
      itemId: a.id,
      productId: d,
      name: (s == null ? void 0 : s.name) || (u == null ? void 0 : u.name) || "",
      image: (s == null ? void 0 : s.image) || (u == null ? void 0 : u.image) || "",
      detail: (s == null ? void 0 : s.detail) || (u == null ? void 0 : u.detail) || "",
      unit: p,
      quantity: w
    });
  }
  return r;
}
async function se() {
  const e = [...new Set(o.lines.filter((t) => !t.name).map((t) => t.productId))];
  e.length && (await Promise.all(
    e.map(async (t) => {
      var i, r, a;
      const n = await W(t);
      n && y.set(t, { name: String(n.name || ""), image: String(((r = (i = n.images) == null ? void 0 : i[0]) == null ? void 0 : r.url) || ((a = n.image) == null ? void 0 : a.url) || "") });
    })
  ), o.lines = o.lines.map((t) => {
    var n, i;
    return t.name ? t : { ...t, name: ((n = y.get(t.productId)) == null ? void 0 : n.name) || c({ ar: "منتج", en: "Product" }), image: ((i = y.get(t.productId)) == null ? void 0 : i.image) || "" };
  }), x());
}
const ce = (e) => Math.round(e * 100) / 100, M = () => ce(o.lines.reduce((e, t) => e + t.unit * t.quantity, 0));
function z(e) {
  const t = T(e);
  return t != null && t.items && (o.lines = oe(o.lines, t.items, y)), j(), o.total = (t == null ? void 0 : t.total) ?? M(), x(), se(), !!(t != null && t.items);
}
async function de() {
  var t, n, i, r;
  if (!L()) {
    o.demo = !0;
    return;
  }
  const e = S();
  try {
    if (await ((t = e == null ? void 0 : e.onReady) == null ? void 0 : t.call(e)), typeof ((i = (n = e == null ? void 0 : e.cart) == null ? void 0 : n.api) == null ? void 0 : i.details) != "function") return;
    const a = await e.cart.api.details();
    (r = T(a)) != null && r.items && z(a);
  } catch {
  }
}
const le = 15e3;
function P(e, t) {
  const n = e.map(({ product: i, options: r = {}, quantity: a = 1 }) => {
    var w, p, u;
    const d = String(i.id), f = { name: String(i.name || ""), image: String(((p = (w = i.images) == null ? void 0 : w[0]) == null ? void 0 : p.url) || ((u = i.image) == null ? void 0 : u.url) || ""), detail: ae(i, r, t) };
    y.set(d, f);
    const s = (Number(i.sale_price || i.price) || 0) + q({ product: i, options: r });
    return { key: `p${++re}`, itemId: null, productId: d, ...f, unit: s, quantity: Math.max(1, a) };
  });
  return o.justAdded = n.map((i) => i.name).filter(Boolean).join("، "), n;
}
function B(e) {
  o.demo = !0, o.lines = [...o.lines, ...e], j(), o.total = M(), x();
}
async function je(e, t = {}, n = 1, i = "ar") {
  var f, s;
  const r = P([{ product: e, options: t, quantity: n }], i);
  if (!L()) return B(r);
  const a = (s = (f = S()) == null ? void 0 : f.cart) == null ? void 0 : s.api;
  if (!(a != null && a.addItem)) throw new Error(k(null));
  o.lines = [...o.lines, ...r];
  let d;
  try {
    d = await Promise.race([
      a.addItem({ id: e.id, quantity: n, options: Object.keys(t).length ? t : void 0 }),
      new Promise((w, p) => window.setTimeout(() => p(new Error(k(null))), le))
    ]);
  } catch (w) {
    throw o.lines = o.lines.filter((p) => !r.includes(p)), o.justAdded = "", new Error(k(w));
  }
  z(d) || await O();
}
async function ze(e, t = "ar") {
  const n = P(e, t);
  if (!L()) return B(n);
  o.lines = [...o.lines, ...n], await O();
}
async function O() {
  var e, t;
  try {
    const n = (t = (e = S()) == null ? void 0 : e.cart) == null ? void 0 : t.api;
    if (typeof (n == null ? void 0 : n.details) == "function" && z(await n.details())) return;
  } catch {
  }
  j(), x();
}
function Y(e) {
  return o.demo || e.itemId !== null;
}
async function fe(e) {
  var a, d, f;
  const t = o.lines.find((s) => s.key === e);
  if (!t || !Y(t)) return;
  const n = () => {
    o.lines = o.lines.filter((s) => s.key !== e), j();
  };
  if (o.demo) {
    n(), o.total = M(), x();
    return;
  }
  const i = (d = (a = S()) == null ? void 0 : a.cart) == null ? void 0 : d.api;
  if (!(i != null && i.deleteItem)) throw new Error(k(null));
  const r = await i.deleteItem(t.itemId);
  if ((f = T(r)) != null && f.items) return void z(r);
  n(), await O();
}
const ue = `
.wf-cd { position: fixed; inset: 0; z-index: 60; pointer-events: none; background: transparent; }
.wf-cd__fab { position: fixed; inset-inline-start: max(1rem, env(safe-area-inset-left, 0px)); bottom: calc(1rem + var(--wf-sb-h, 0px) + env(safe-area-inset-bottom, 0px));
  display: inline-flex; align-items: center; gap: .5rem; min-height: 3.25rem; padding: 0 1.125rem; border: 0; border-radius: 999px; pointer-events: auto;
  background: var(--wf-title); color: var(--wf-bg); font: inherit; font-weight: 800; box-shadow: 0 12px 30px -10px rgb(0 0 0 / 45%); cursor: pointer; }
.wf-cd__fab b { min-width: 1.5rem; height: 1.5rem; display: grid; place-items: center; padding: 0 .375rem; border-radius: 999px; background: var(--wf-accent); color: var(--wf-accent-text); font-size: .8125rem; }
.wf-cd__fab:focus-visible { outline: 3px solid var(--wf-accent-ink); outline-offset: 3px; }
.wf-cd__shade { position: fixed; inset: 0; background: rgb(0 0 0 / 45%); opacity: 0; transition: opacity .25s ease; }
.wf-cd.is-open .wf-cd__shade { opacity: 1; pointer-events: auto; }
.wf-cd__panel { position: fixed; top: 0; bottom: 0; inset-inline-end: 0; width: min(26rem, 100vw); display: flex; flex-direction: column; background: var(--wf-bg); color: var(--wf-text);
  box-shadow: 0 0 40px rgb(0 0 0 / 25%); transform: translateX(105%); transition: transform .3s ease, visibility .3s; pointer-events: auto; visibility: hidden; outline: none; }
.wf-cd.is-rtl .wf-cd__panel { transform: translateX(-105%); }
.wf-cd.is-open .wf-cd__panel, .wf-cd.is-rtl.is-open .wf-cd__panel { transform: none; visibility: visible; transition: transform .3s ease, visibility 0s; }
.wf-cd__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.125rem; border-bottom: 1px solid color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-cd__head h2 { margin: 0; font-size: 1.125rem; font-weight: 900; color: var(--wf-title); }
.wf-cd__x { width: 2.75rem; height: 2.75rem; border: 0; border-radius: 999px; background: var(--wf-card); color: var(--wf-title); font-size: 1.5rem; cursor: pointer; }
.wf-cd .wf-cd__added { margin: .75rem 1.125rem 0; padding: .625rem .875rem; border-radius: .75rem; background: color-mix(in srgb, #12b76a 14%, var(--wf-bg)); color: #067647; font-weight: 700; font-size: .875rem; }
html.wf-mode-dark .wf-cd__added { color: #6ce9a6; }
.wf-cd .wf-cd__list { flex: 1 1 auto; overflow-y: auto; display: grid; align-content: start; gap: .75rem; margin: 0; padding: 1rem 1.125rem; list-style: none; }
.wf-cd__line { display: grid; grid-template-columns: 4rem minmax(0, 1fr) auto; gap: .75rem; align-items: center; }
.wf-cd__line img, .wf-cd__ph { width: 4rem; height: 4rem; border-radius: .75rem; object-fit: cover; background: var(--wf-card); }
.wf-cd__name { display: block; font-weight: 700; color: var(--wf-title); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.wf-cd__meta { display: block; font-size: .8125rem; }
.wf-cd__del { width: 2.75rem; height: 2.75rem; border: 0; border-radius: .625rem; background: none; color: var(--wf-text); cursor: pointer; font-size: 1.125rem; }
.wf-cd__del:hover { background: var(--wf-card); color: #d92d20; }
.wf-cd .wf-cd__empty { padding: 2rem 1rem; text-align: center; }
.wf-cd__foot { display: grid; gap: .75rem; padding: 1rem 1.125rem calc(1rem + env(safe-area-inset-bottom, 0px)); border-top: 1px solid color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-cd__tier { display: grid; gap: .375rem; font-size: .875rem; font-weight: 700; color: var(--wf-title); }
.wf-cd__track { height: .5rem; border-radius: 999px; background: color-mix(in srgb, var(--wf-text) 15%, transparent); overflow: hidden; }
.wf-cd__track span { display: block; height: 100%; background: var(--wf-accent); }
.wf-cd__total { display: flex; justify-content: space-between; font-size: 1.125rem; font-weight: 900; color: var(--wf-title); }
.wf-cd .wf-cd__note { margin: 0; font-size: .8125rem; text-align: center; }
.wf-cd__ghost { background: transparent; color: var(--wf-title); border-color: color-mix(in srgb, var(--wf-text) 30%, transparent); }
@media (prefers-reduced-motion: reduce) { .wf-cd__panel, .wf-cd__shade { transition: none; } }
`;
let m = null, v = !1, I = !1, h = "", b = null;
function Ae(e) {
  window.__wfTiers = e;
}
function D() {
  return window.__wfTiers || [];
}
function N() {
  var e;
  v = !1, C().justAdded = "", g(), (e = b == null ? void 0 : b.focus) == null || e.call(b);
}
function me() {
  var e;
  ge(), b = document.activeElement, v = !0, g(), (e = m == null ? void 0 : m.querySelector(".wf-cd__panel")) == null || e.focus({ preventScroll: !0 });
}
async function we() {
  if (I || C().demo) return;
  I = !0, h = "", g();
  const e = await K();
  I = !1, e || (h = c({ ar: "تعذر فتح صفحة الدفع، حاولي مرة تانية", en: "Could not open checkout, please try again" })), g();
}
async function pe(e) {
  h = "";
  try {
    await fe(e);
  } catch {
    h = c({ ar: "تعذر حذف القطعة، حاولي مرة تانية", en: "Could not remove the item, please try again" }), g();
  }
}
function g() {
  if (!m) return;
  const e = C(), t = D().length ? U(e.total, D()) : null;
  F(l`
    <div class="wf-cd__shade" @click=${N}></div>
    ${e.count && !v ? l`<button type="button" class="wf-cd__fab" aria-label=${c({ ar: `السلة، ${e.count} قطع`, en: `Cart, ${e.count} items` })} @click=${me}>
          🛍️ ${c({ ar: "سلتك", en: "Your cart" })} <b>${e.count}</b></button>` : _}
    <aside class="wf-cd__panel" role="dialog" aria-modal="false" aria-label=${c({ ar: "سلتك", en: "Your cart" })} tabindex="-1">
      <div class="wf-cd__head"><h2>${c({ ar: "سلتك", en: "Your cart" })} (${e.count})</h2>
        <button type="button" class="wf-cd__x" aria-label=${c({ ar: "إغلاق", en: "Close" })} @click=${N}>×</button></div>
      ${e.justAdded ? l`<p class="wf-cd__added" role="status">✓ ${c({ ar: `اتضافت للسلة: ${e.justAdded}`, en: `Added: ${e.justAdded}` })}</p>` : _}
      ${e.lines.length ? l`<ul class="wf-cd__list">${e.lines.map((n) => l`<li class="wf-cd__line">
            ${n.image ? l`<img src=${n.image} alt="" loading="lazy" />` : l`<span class="wf-cd__ph"></span>`}
            <span><span class="wf-cd__name">${n.name}</span>${n.detail ? l`<span class="wf-cd__meta">${n.detail}</span>` : _}
              <span class="wf-cd__meta">${n.quantity} × ${A(E(n.unit))}</span></span>
            ${Y(n) ? l`<button type="button" class="wf-cd__del" aria-label=${c({ ar: `احذفي ${n.name}`, en: `Remove ${n.name}` })} @click=${() => pe(n.key)}>🗑</button>` : l`<span></span>`}
          </li>`)}</ul>` : l`<p class="wf-cd__empty">${c({ ar: "سلتك فاضية، اختاري من العروض", en: "Your cart is empty, pick from the deals" })}</p>`}
      <div class="wf-cd__foot">
        ${t && e.lines.length ? l`<div class="wf-cd__tier">${t.next ? l`<span>${c({ ar: "باقيلك", en: "Only" })} ${A(E(t.left))} ${c({ ar: `وتاخدي ${t.next.reward}`, en: `more for ${t.next.reward}` })}</span>` : l`<span>${c({ ar: "وصلتي لأعلى مستوى 🎉", en: "You reached the top tier" })}</span>`}
              <div class="wf-cd__track"><span style=${`width:${t.percent}%`}></span></div></div>` : _}
        <div class="wf-cd__total"><span>${c({ ar: "الإجمالي", en: "Total" })}</span><span>${A(E(e.total))}</span></div>
        <button type="button" class="wf-btn" aria-busy=${I ? "true" : "false"} ?disabled=${!e.lines.length || e.demo} @click=${we}>${c({ ar: "إتمام الطلب", en: "Complete the order" })}</button>
        ${e.demo ? l`<p class="wf-cd__note">${c({ ar: "دي معاينة: الدفع بيشتغل في صفحة الهبوط في متجرك", en: "Preview only: checkout works on your store's landing page" })}</p>` : _}
        <button type="button" class="wf-btn wf-cd__ghost" @click=${N}>${c({ ar: "كمّلي التسوّق", en: "Keep shopping" })}</button>
        ${h ? l`<p class="wf-error" role="alert">${h}</p>` : _}
      </div>
    </aside>`, m), m.classList.toggle("is-open", v);
}
function ge() {
  m || (X(), G("wf-cart-drawer", ue), m = document.createElement("div"), m.className = `wf-cd wf-block wf-auto${H() ? " is-rtl" : ""}`, document.body.appendChild(m), window.addEventListener("wf:cart-state", () => g()), document.addEventListener("keydown", (e) => {
    v && e.key === "Escape" && N();
  }), g(), de());
}
export {
  q as a,
  ie as b,
  ke as c,
  je as d,
  ge as e,
  $e as i,
  Se as l,
  ze as n,
  me as o,
  Ae as p,
  Ne as r,
  Ie as t,
  xe as v
};
