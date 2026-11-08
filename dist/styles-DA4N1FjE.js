function m() {
  return window.Salla;
}
function O() {
  var t, n;
  return ((n = (t = m()) == null ? void 0 : t.config) == null ? void 0 : n.get("theme.settings")) || {};
}
function E() {
  var t, n;
  return ((n = (t = m()) == null ? void 0 : t.config) == null ? void 0 : n.get("page.is_landing_page")) === !0;
}
function R() {
  var n;
  const t = O().page_for_product;
  return typeof t == "boolean" || t === void 0 || t === null ? t === !1 ? "promotion" : "product" : typeof t == "string" ? t === "promotion" ? "promotion" : "product" : Array.isArray(t) && ((n = t[0]) == null ? void 0 : n.value) === "promotion" ? "promotion" : "product";
}
function I() {
  var n, e;
  if (!E() || R() !== "product") return null;
  const t = (e = (n = O().product) == null ? void 0 : n.value) == null ? void 0 : e[0];
  return t ? String(t) : null;
}
function B() {
  const t = O();
  return { text: String(t.main_btn_text || ""), url: String(t.main_btn_url || "") };
}
const Y = "1616473", U = ["images", "rating", "sold_quantity", "options"];
async function C(t, n) {
  var e;
  try {
    const r = U.map((c) => `with[]=${c}`).join("&"), i = await (await fetch(`https://api.salla.dev/store/v1/products/${t}/details?${r}`, {
      headers: { "store-identifier": n, "accept-language": document.documentElement.lang === "en" ? "en" : "ar" }
    })).json();
    return (e = i == null ? void 0 : i.data) != null && e.id ? i.data : null;
  } catch {
    return null;
  }
}
async function pt(t) {
  var r, o, i, c;
  const n = m();
  if (!t) return null;
  await ((r = n == null ? void 0 : n.onReady) == null ? void 0 : r.call(n));
  const e = String(((o = n == null ? void 0 : n.config) == null ? void 0 : o.get("store.id")) || "");
  if (E()) {
    if (String(t) !== I()) return e ? C(t, e) : null;
    try {
      const a = await ((i = n == null ? void 0 : n.product) == null ? void 0 : i.api.getDetails(t, U));
      return (c = a == null ? void 0 : a.data) != null && c.id ? a.data : null;
    } catch {
      return null;
    }
  }
  return e && await C(t, e) || C(t, Y);
}
function Q() {
  const t = document.querySelector(".s-block--fast-checkout"), n = t == null ? void 0 : t.getAttribute("data-layout");
  if (window.innerWidth < 1024 || n === "side-drawer" || !t) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  t.scrollIntoView({ behavior: "smooth", block: "center" });
}
function W(t, n = 20) {
  if (t <= 1) return;
  const e = document.querySelector(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (e != null && e.setValue) {
    e.setValue(t);
    return;
  }
  n > 0 && window.setTimeout(() => W(t, n - 1), 100);
}
function bt(t) {
  const n = m();
  return n != null && n.money ? n.money(t) : String(t);
}
function yt(t) {
  return t ? t.component && typeof t.component == "object" ? t.component : t : {};
}
function L() {
  var t, n, e;
  return ((e = (n = (t = window.Salla) == null ? void 0 : t.lang) == null ? void 0 : n.getLocale) == null ? void 0 : e.call(n)) || document.documentElement.lang || "ar";
}
function kt() {
  return (document.documentElement.dir || (L() === "ar" ? "rtl" : "ltr")) === "rtl";
}
function xt(t) {
  if (t == null || t === "") return "";
  if (typeof t == "string") return t;
  if (typeof t == "object") {
    const n = t, e = L() === "en" ? "en" : "ar";
    return n[e] || n[e === "en" ? "ar" : "en"] || "";
  }
  return String(t);
}
function D(t) {
  return L() === "ar" ? t.ar : t.en;
}
function X(t) {
  var n;
  return Array.isArray(t) ? ((n = t[0]) == null ? void 0 : n.value) ?? t[0] ?? "" : t && typeof t == "object" && "value" in t ? t.value : t ?? "";
}
function vt(t, n) {
  return Array.isArray(t) ? t.map((e) => {
    if (!e || typeof e != "object") return {};
    const r = {};
    for (const [o, i] of Object.entries(e))
      r[o.startsWith(`${n}.`) ? o.slice(n.length + 1) : o] = i;
    return r;
  }) : [];
}
function $t(t) {
  return String(t ?? "").trim().replace(/^#+/, "").trim();
}
function Tt(t) {
  const n = String(t ?? "").trim();
  return n ? /^(https?:|mailto:|tel:)/i.test(n) ? n : /^[a-z][a-z0-9+.-]*:/i.test(n) ? "" : /^[\w-]+(\.[\w-]+)+/.test(n) ? `https://${n}` : "" : "";
}
const K = { go: (t) => window.location.assign(t) }, G = (t) => !!t && Object.keys(t).length > 0;
function J(t = {}) {
  var n;
  return E() ? (n = t.items) != null && n.length ? "cart" : R() === "product" ? I() ? G(t.options) ? "cart" : "fast-checkout" : "none" : B().url || t.fallbackUrl ? "link" : "none" : "fast-checkout";
}
const Z = 15e3;
let h = null;
window.addEventListener("pageshow", () => {
  h = null;
});
function Et(t = {}) {
  if (h) return h;
  const n = tt(ct(t)).then((e) => ((e.kind !== "cart" || t.stay) && h === n && (h = null), e));
  return h = n, n;
}
function tt(t) {
  return new Promise((n) => {
    const e = window.setTimeout(() => n({ kind: "error", message: k(null) }), Z);
    t.then(n, (r) => n({ kind: "error", message: k(r) })).finally(() => window.clearTimeout(e));
  });
}
function P(t) {
  var n, e, r;
  return ((e = (n = t == null ? void 0 : t.data) == null ? void 0 : n.cart) == null ? void 0 : e.items) || ((r = t == null ? void 0 : t.data) == null ? void 0 : r.items) || [];
}
async function nt(t, n, e) {
  var o, i;
  const r = new Map(n.map((c) => [String(c.id), Number(c.quantity) || 0]));
  for (const c of e) {
    const a = r.get(String(c.id)) || 0;
    if (!((Number(c.quantity) || 0) <= a))
      try {
        a ? await ((o = t.updateItem) == null ? void 0 : o.call(t, { id: c.id, quantity: a })) : await ((i = t.deleteItem) == null ? void 0 : i.call(t, c.id));
      } catch {
      }
  }
}
function et(t, n, e) {
  var o, i, c;
  const r = m();
  try {
    const a = t.product;
    (c = r == null ? void 0 : r.analytics) == null || c.track("Buy Now", {
      source: "white-friday",
      action: n,
      product_id: a != null && a.id ? String(a.id) : I(),
      items: ((o = t.items) == null ? void 0 : o.length) || 1,
      quantity: e,
      price: a != null && a.id ? Number(a.sale_price || a.price || 0) * e : null,
      currency: (a == null ? void 0 : a.currency) || ((i = r == null ? void 0 : r.config) == null ? void 0 : i.get("user.currency_code")) || null
    });
  } catch {
  }
}
function k(t) {
  var n, e, r;
  return ((r = (e = (n = t == null ? void 0 : t.response) == null ? void 0 : n.data) == null ? void 0 : e.error) == null ? void 0 : r.message) || (t == null ? void 0 : t.message) || D({ ar: "تعذر إكمال الطلب، حاول مرة أخرى", en: "We couldn't complete the order, please try again" });
}
function rt() {
  var e, r, o;
  const t = m();
  try {
    const i = (r = (e = t == null ? void 0 : t.url) == null ? void 0 : e.get) == null ? void 0 : r.call(e, "cart");
    if (i) return String(i);
  } catch {
  }
  return `${String(((o = t == null ? void 0 : t.config) == null ? void 0 : o.get("store.url")) || location.origin).replace(/\/+$/, "")}/cart`;
}
const ot = { ms: 6e3 };
async function it() {
  var g, w, S, f, y;
  const t = m(), n = (g = t == null ? void 0 : t.cart) == null ? void 0 : g.api, e = () => (K.go(rt()), !0);
  if (!(n != null && n.submit)) return e();
  let r = !1;
  const o = () => r = !!document.querySelector("salla-login-modal"), i = () => r = !0, c = location.href, a = () => location.href !== c;
  try {
    (S = (w = t == null ? void 0 : t.event) == null ? void 0 : w.on) == null || S.call(w, "login::open", o);
  } catch {
  }
  window.addEventListener("pagehide", i, { once: !0 }), window.addEventListener("beforeunload", i, { once: !0 });
  const b = new Promise((j) => window.setTimeout(() => j("wait"), ot.ms));
  try {
    const j = Promise.resolve(n.submit()).then(() => "ok");
    return await Promise.race([j, b]), r || await b, !r && !a() ? e() : !0;
  } catch {
    return r ? !0 : e();
  } finally {
    try {
      (y = (f = t == null ? void 0 : t.event) == null ? void 0 : f.off) == null || y.call(f, "login::open", o);
    } catch {
    }
  }
}
async function ct(t) {
  var r, o, i, c;
  const n = J(t), e = Math.max(1, Number(t.quantity) || 1);
  if (n !== "none" && et(t, n, e), n === "fast-checkout")
    return E() && (Q(), W(e)), { kind: n };
  if (n === "cart") {
    const a = (o = (r = m()) == null ? void 0 : r.cart) == null ? void 0 : o.api, b = (i = t.items) != null && i.length ? t.items : [{ id: String(I()), quantity: e, options: t.options }];
    if (b.some((f) => f.max && f.quantity > f.max))
      return { kind: "error", message: D({ ar: "الكمية أكبر من المتاح", en: "The quantity is more than what is available" }) };
    if (!a) return { kind: "error", message: k(null) };
    let g = [];
    try {
      g = P(await ((c = a.details) == null ? void 0 : c.call(a)));
    } catch {
    }
    let w = g;
    try {
      for (const f of b) {
        const y = P(await a.addItem({ id: f.id, quantity: f.quantity, options: f.options, ...f.notes ? { notes: f.notes } : {} }));
        y.length && (w = y);
      }
    } catch (f) {
      return await nt(a, g, w), { kind: "error", message: k(f) };
    }
    return window.dispatchEvent(new Event("wf:cart")), t.stay ? { kind: n } : await it() ? { kind: n } : { kind: "error", message: k(null) };
  }
  return n === "link" ? (K.go(B().url || t.fallbackUrl || ""), { kind: n }) : { kind: "none" };
}
const at = ["bg", "card", "title", "text", "accent"], z = "#111111", s = "#ffffff", q = 4.5;
function $(t) {
  if (typeof t != "string") return null;
  const n = t.trim().replace(/^#/, "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(n)) return null;
  const e = n.length === 3 ? n.replace(/./g, (r) => r + r) : n;
  return [0, 2, 4].map((r) => parseInt(e.slice(r, r + 2), 16));
}
function F([t, n, e]) {
  return "#" + [t, n, e].map((r) => Math.round(r).toString(16).padStart(2, "0")).join("");
}
function _(t) {
  const n = $(t);
  return n ? F(n) : null;
}
function M(t) {
  const [n, e, r] = t.map((o) => {
    const i = o / 255;
    return i <= 0.03928 ? i / 12.92 : ((i + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * n + 0.7152 * e + 0.0722 * r;
}
function p(t, n) {
  const e = $(t), r = $(n);
  if (!e || !r) return 1;
  const [o, i] = [M(e), M(r)].sort((c, a) => a - c);
  return (o + 0.05) / (i + 0.05);
}
function x(t) {
  const n = p(z, t) >= p(s, t) ? z : s;
  return p(n, t) >= q ? n : "#000000";
}
function l(t, n, e) {
  const r = $(t), o = $(n);
  return F(r.map((i, c) => i + (o[c] - i) * e));
}
function u(t, n, e, r = q) {
  let o = t;
  for (let i = 0; i < 20 && n.some((c) => p(o, c) < r); i++)
    o = l(o, e, 0.05 * (i + 1));
  return n.every((i) => p(o, i) >= r) ? o : e;
}
const v = "#000000", st = (t) => t === "light" ? v : s;
function T(t, n) {
  return {
    ...t,
    accentText: x(t.accent),
    accentInk: u(t.accent, [t.bg, t.card], st(n))
  };
}
const d = {
  light: T({ bg: "#ffffff", card: "#f7f4f0", title: "#1a1714", text: "#4a4440", accent: "#8a5a2b" }, "light"),
  dark: T({ bg: "#141210", card: "#1f1b18", title: "#f5efe8", text: "#c9bfb4", accent: "#d9a46a" }, "dark")
};
function ft(t) {
  const n = _(t);
  if (!n) return structuredClone(d);
  const e = l(n, s, 0.94), r = l(n, s, 0.88), o = l(n, "#000000", 0.88), i = l(n, "#000000", 0.8);
  return {
    light: T({
      bg: e,
      card: r,
      title: u(l(n, "#000000", 0.8), [e, r], "#000000"),
      text: u(l(n, "#000000", 0.65), [e, r], "#000000"),
      accent: n
    }, "light"),
    dark: T({
      bg: o,
      card: i,
      title: u(l(n, s, 0.92), [o, i], s),
      text: u(l(n, s, 0.75), [o, i], s),
      // An accent that disappears into the dark background is lifted until it stands out
      accent: u(n, [o], s, 3)
    }, "dark")
  };
}
const ut = (t) => t === "accentText" ? "accent-text" : t === "accentInk" ? "accent-ink" : t;
function H(t, n) {
  const e = {};
  for (const r of ["l", "d"]) {
    const o = {};
    for (const c of at) {
      const a = _(t[`${r}_${c}`]);
      a && (o[c] = a);
    }
    const i = r === "l" ? "light" : "dark";
    if (o.bg) {
      const c = x(o.bg);
      o.card ?? (o.card = l(o.bg, c, 0.08)), o.title ?? (o.title = u(c, [o.bg, o.card], c === s ? s : v)), o.text ?? (o.text = u(c, [o.bg, o.card], c === s ? s : v));
    }
    if (o.accent) {
      o["accent-text"] = x(o.accent);
      const c = [o.bg || d[i].bg, o.card || d[i].card];
      o["accent-ink"] = u(o.accent, c, x(c[0]) === s ? s : v);
    }
    for (const [c, a] of Object.entries(o)) e[`${n}${r}-${c}`] = a;
  }
  return e;
}
function It(t) {
  const n = {};
  if (_(t.brand_color)) {
    const e = ft(t.brand_color);
    for (const [r, o] of [["light", "l"], ["dark", "d"]])
      for (const [i, c] of Object.entries(e[r])) n[`--wf-${o}-${ut(i)}`] = c;
  }
  return { ...n, ...H(t, "--wf-") };
}
function lt(t) {
  const n = _(t);
  if (!n) return {};
  const e = {};
  let r = n;
  return p(n, d.dark.bg) < 3 && (r = u(n, [d.dark.bg], s, 3), e["--wf-d-accent"] = r, e["--wf-d-accent-text"] = x(r)), e["--wf-l-accent-ink"] = u(n, [d.light.bg, d.light.card], v), e["--wf-d-accent-ink"] = u(r, [d.dark.bg, d.dark.card], s), e;
}
function _t(t) {
  return Object.entries(H(t, "--wf-s-")).map(([n, e]) => `${n}:${e}`).join(";");
}
function St(t) {
  const n = String(X(t.color_scheme) || "auto");
  return n === "dark" ? "wf-dark" : n === "light" ? "" : "wf-auto";
}
function jt(t, n, e) {
  var r;
  return t === "system" ? (r = window.matchMedia) != null && r.call(window, "(prefers-color-scheme: dark)").matches ? "dark" : "light" : t === "dark" ? "dark" : "light";
}
function Ct(t) {
  var o;
  if (typeof IntersectionObserver > "u" || (o = window.matchMedia) != null && o.call(window, "(prefers-reduced-motion: reduce)").matches) return;
  t.classList.add("wf-reveal");
  const n = () => {
    t.classList.add("is-in"), e.disconnect(), window.clearTimeout(r);
  }, e = new IntersectionObserver(
    (i) => {
      i.some((c) => c.isIntersecting) && n();
    },
    { rootMargin: "0px 0px -10% 0px" }
  ), r = window.setTimeout(n, 2500);
  e.observe(t);
}
const dt = `
.wf-reveal { transition: opacity .6s ease, transform .6s ease; }
.wf-reveal:not(.is-in) { opacity: 0; transform: translateY(16px); }
@media (prefers-reduced-motion: reduce) { .wf-reveal, .wf-reveal:not(.is-in) { opacity: 1; transform: none; transition: none; } }
`;
function mt(t, n) {
  if (document.getElementById(t)) return;
  const e = document.createElement("style");
  e.id = t, e.textContent = n, document.head.appendChild(e);
}
const wt = ["bg", "card", "title", "text", "accent", "accent-text", "accent-ink"], V = (t, n) => d[t][n === "accent-text" ? "accentText" : n === "accent-ink" ? "accentInk" : n], gt = {
  accent: "--color-primary",
  "accent-text": "--color-primary-reverse"
}, A = (t) => wt.map((n) => {
  const e = t === "l" ? "light" : "dark", r = gt[n], o = r ? `var(${r}, ${V(e, n)})` : V(e, n);
  return `--wf-${n}: var(--wf-s-${t}-${n}, var(--wf-${t}-${n}, ${o}));`;
}).join(" "), ht = `
.wf-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
[data-wf-section] { scroll-margin-top: var(--wf-hd-h, 0px); }
/* The page's end keeps clear of the sticky buy bar while it shows */
.wf-host:has(> .wf-sb:not(.wf-sb--inline)) { height: var(--wf-sb-h, 0px); }
.component-card:has(> .wf-host:not(:empty)) { min-height: 0; }
.wf-block { ${A("l")}
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit);
  color: var(--wf-text); background: var(--wf-bg); }
.wf-block.wf-dark, html.wf-mode-dark .wf-block.wf-auto { ${A("d")} }
@media (prefers-color-scheme: dark) { html:not(.wf-mode-light) .wf-block.wf-auto { ${A("d")} } }
html.wf-mode-ready .wf-block { transition: background-color .3s ease, color .3s ease; }
.wf-block *, .wf-block *::before, .wf-block *::after { box-sizing: border-box; }
.wf-block img, .wf-block video { display: block; max-width: 100%; }
.wf-block h2, .wf-block h3, .wf-block p, .wf-block ul { margin: 0; padding: 0; }
.wf-block ul { list-style: none; }
.wf-container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: 1rem; }
.wf-section { padding-block: 2.5rem; }
@container (min-width: 768px) { .wf-section { padding-block: 4rem; } }
.wf-title { text-align: center; margin-bottom: 1.75rem; }
.wf-title h2 { font-size: 1.75rem; line-height: 1.3; font-weight: 700; color: var(--wf-title); }
.wf-title p { margin-top: .5rem; font-size: 1rem; line-height: 1.7; color: var(--wf-text); }
@container (min-width: 768px) { .wf-title h2 { font-size: 2.25rem; } }
.wf-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; min-height: 2.75rem;
  padding: .75rem 1.75rem; border: 1px solid transparent; border-radius: var(--wf-radius, .625rem);
  background: var(--wf-accent); color: var(--wf-accent-text); font: inherit; font-weight: 700; font-size: 1rem;
  line-height: 1.2; text-decoration: none; cursor: pointer; transition: transform .2s ease, opacity .2s ease; }
.wf-btn:hover { transform: translateY(-1px); opacity: .92; }
.wf-btn:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: 3px; }
.wf-btn[disabled], .wf-btn[aria-busy="true"] { opacity: .6; cursor: progress; transform: none; }
.wf-cta { display: flex; justify-content: center; margin-top: 2rem; }
.wf-cta .wf-btn { min-width: min(100%, 16rem); }
.wf-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.wf-error { margin-top: .5rem; color: #b42318; font-size: .875rem; }
.wf-block.wf-dark .wf-error, html.wf-mode-dark .wf-auto .wf-error { color: #fda29b; }
@media (prefers-color-scheme: dark) { html:not(.wf-mode-light) .wf-auto .wf-error { color: #fda29b; } }
@media (prefers-reduced-motion: reduce) { .wf-btn, html.wf-mode-ready .wf-block { transition: none; } .wf-btn:hover { transform: none; } }
${dt}
`;
let N = !1;
function At() {
  if (mt("wf-base", ht), N) return;
  N = !0;
  const t = document.documentElement;
  if (t.style.getPropertyValue("--wf-d-accent")) return;
  const n = getComputedStyle(t).getPropertyValue("--color-primary").trim();
  for (const [e, r] of Object.entries(lt(n))) t.style.setProperty(e, r);
}
export {
  L as a,
  J as b,
  m as c,
  jt as d,
  $t as e,
  pt as f,
  vt as g,
  At as h,
  E as i,
  mt as j,
  Et as k,
  I as l,
  bt as m,
  yt as n,
  B as o,
  It as p,
  _t as q,
  xt as r,
  St as s,
  D as t,
  X as u,
  k as v,
  Tt as w,
  kt as x,
  it as y,
  Ct as z
};
