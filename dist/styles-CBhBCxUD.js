function h() {
  return window.Salla;
}
function v() {
  var t, e;
  return ((e = (t = h()) == null ? void 0 : t.config) == null ? void 0 : e.get("theme.settings")) || {};
}
function I() {
  var t, e;
  return ((e = (t = h()) == null ? void 0 : t.config) == null ? void 0 : e.get("page.is_landing_page")) === !0;
}
function V() {
  var e;
  const t = v().page_for_product;
  return typeof t == "boolean" || t === void 0 || t === null ? t === !1 ? "promotion" : "product" : typeof t == "string" ? t === "promotion" ? "promotion" : "product" : Array.isArray(t) && ((e = t[0]) == null ? void 0 : e.value) === "promotion" ? "promotion" : "product";
}
function M() {
  var e, n;
  if (!I() || V() !== "product") return null;
  const t = (n = (e = v().product) == null ? void 0 : e.value) == null ? void 0 : n[0];
  return t ? String(t) : null;
}
function U() {
  const t = v();
  return { text: String(t.main_btn_text || ""), url: String(t.main_btn_url || "") };
}
const P = "1616473", _ = ["images", "rating", "sold_quantity", "options"];
async function y(t, e) {
  var n;
  try {
    const o = _.map((i) => `with[]=${i}`).join("&"), c = await (await fetch(`https://api.salla.dev/store/v1/products/${t}/details?${o}`, {
      headers: { "store-identifier": e, "accept-language": document.documentElement.lang === "en" ? "en" : "ar" }
    })).json();
    return (n = c == null ? void 0 : c.data) != null && n.id ? c.data : null;
  } catch {
    return null;
  }
}
async function G(t) {
  var o, r, c, i;
  const e = h();
  if (!t) return null;
  await ((o = e == null ? void 0 : e.onReady) == null ? void 0 : o.call(e));
  const n = String(((r = e == null ? void 0 : e.config) == null ? void 0 : r.get("store.id")) || "");
  if (I()) {
    if (String(t) !== M()) return n ? y(t, n) : null;
    try {
      const f = await ((c = e == null ? void 0 : e.product) == null ? void 0 : c.api.getDetails(t, _));
      return (i = f == null ? void 0 : f.data) != null && i.id ? f.data : null;
    } catch {
      return null;
    }
  }
  return n && await y(t, n) || y(t, P);
}
function Q() {
  const t = document.querySelector(".s-block--fast-checkout"), e = t == null ? void 0 : t.getAttribute("data-layout");
  if (window.innerWidth < 1024 || e === "side-drawer" || !t) {
    window.dispatchEvent(new CustomEvent("open-checkout-drawer"));
    return;
  }
  t.scrollIntoView({ behavior: "smooth", block: "center" });
}
function R(t, e = 20) {
  if (t <= 1) return;
  const n = document.querySelector(
    ".s-block--fast-checkout salla-quantity-input, .s-block--fast-checkout-main salla-quantity-input"
  );
  if (n != null && n.setValue) {
    n.setValue(t);
    return;
  }
  e > 0 && window.setTimeout(() => R(t, e - 1), 100);
}
function X(t) {
  const e = h();
  return e != null && e.money ? e.money(t) : String(t);
}
function Z(t) {
  return t ? t.component && typeof t.component == "object" ? t.component : t : {};
}
function E() {
  var t, e, n;
  return ((n = (e = (t = window.Salla) == null ? void 0 : t.lang) == null ? void 0 : e.getLocale) == null ? void 0 : n.call(e)) || document.documentElement.lang || "ar";
}
function tt(t) {
  if (t == null || t === "") return "";
  if (typeof t == "string") return t;
  if (typeof t == "object") {
    const e = t, n = E() === "en" ? "en" : "ar";
    return e[n] || e[n === "en" ? "ar" : "en"] || "";
  }
  return String(t);
}
function et(t) {
  return E() === "ar" ? t.ar : t.en;
}
function L(t) {
  var e;
  return Array.isArray(t) ? ((e = t[0]) == null ? void 0 : e.value) ?? t[0] ?? "" : t && typeof t == "object" && "value" in t ? t.value : t ?? "";
}
function nt(t, e) {
  return Array.isArray(t) ? t.map((n) => {
    if (!n || typeof n != "object") return {};
    const o = {};
    for (const [r, c] of Object.entries(n))
      o[r.startsWith(`${e}.`) ? r.slice(e.length + 1) : r] = c;
    return o;
  }) : [];
}
function rt(t) {
  return String(t ?? "").trim().replace(/^#+/, "").trim();
}
function ot(t) {
  const e = String(t ?? "").trim();
  return e ? /^(https?:|mailto:|tel:)/i.test(e) ? e : /^[a-z][a-z0-9+.-]*:/i.test(e) ? "" : /^[\w-]+(\.[\w-]+)+/.test(e) ? `https://${e}` : "" : "";
}
const N = ["bg", "card", "title", "text", "accent"], $ = "#111111", a = "#ffffff", j = 4.5;
function g(t) {
  if (typeof t != "string") return null;
  const e = t.trim().replace(/^#/, "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e)) return null;
  const n = e.length === 3 ? e.replace(/./g, (o) => o + o) : e;
  return [0, 2, 4].map((o) => parseInt(n.slice(o, o + 2), 16));
}
function A([t, e, n]) {
  return "#" + [t, e, n].map((o) => Math.round(o).toString(16).padStart(2, "0")).join("");
}
function b(t) {
  const e = g(t);
  return e ? A(e) : null;
}
function S(t) {
  const [e, n, o] = t.map((r) => {
    const c = r / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * e + 0.7152 * n + 0.0722 * o;
}
function d(t, e) {
  const n = g(t), o = g(e);
  if (!n || !o) return 1;
  const [r, c] = [S(n), S(o)].sort((i, f) => f - i);
  return (r + 0.05) / (c + 0.05);
}
function m(t) {
  const e = d($, t) >= d(a, t) ? $ : a;
  return d(e, t) >= j ? e : "#000000";
}
function l(t, e, n) {
  const o = g(t), r = g(e);
  return A(o.map((c, i) => c + (r[i] - c) * n));
}
function s(t, e, n, o = j) {
  let r = t;
  for (let c = 0; c < 20 && e.some((i) => d(r, i) < o); c++)
    r = l(r, n, 0.05 * (c + 1));
  return e.every((c) => d(r, c) >= o) ? r : n;
}
const w = "#000000", B = (t) => t === "light" ? w : a;
function p(t, e) {
  return {
    ...t,
    accentText: m(t.accent),
    accentInk: s(t.accent, [t.bg, t.card], B(e))
  };
}
const u = {
  light: p({ bg: "#ffffff", card: "#f7f4f0", title: "#1a1714", text: "#4a4440", accent: "#8a5a2b" }, "light"),
  dark: p({ bg: "#141210", card: "#1f1b18", title: "#f5efe8", text: "#c9bfb4", accent: "#d9a46a" }, "dark")
};
function q(t) {
  const e = b(t);
  if (!e) return structuredClone(u);
  const n = l(e, a, 0.94), o = l(e, a, 0.88), r = l(e, "#000000", 0.88), c = l(e, "#000000", 0.8);
  return {
    light: p({
      bg: n,
      card: o,
      title: s(l(e, "#000000", 0.8), [n, o], "#000000"),
      text: s(l(e, "#000000", 0.65), [n, o], "#000000"),
      accent: e
    }, "light"),
    dark: p({
      bg: r,
      card: c,
      title: s(l(e, a, 0.92), [r, c], a),
      text: s(l(e, a, 0.75), [r, c], a),
      // An accent that disappears into the dark background is lifted until it stands out
      accent: s(e, [r], a, 3)
    }, "dark")
  };
}
const D = (t) => t === "accentText" ? "accent-text" : t === "accentInk" ? "accent-ink" : t;
function O(t, e) {
  const n = {};
  for (const o of ["l", "d"]) {
    const r = {};
    for (const i of N) {
      const f = b(t[`${o}_${i}`]);
      f && (r[i] = f);
    }
    const c = o === "l" ? "light" : "dark";
    if (r.bg) {
      const i = m(r.bg);
      r.card ?? (r.card = l(r.bg, i, 0.08)), r.title ?? (r.title = s(i, [r.bg, r.card], i === a ? a : w)), r.text ?? (r.text = s(i, [r.bg, r.card], i === a ? a : w));
    }
    if (r.accent) {
      r["accent-text"] = m(r.accent);
      const i = [r.bg || u[c].bg, r.card || u[c].card];
      r["accent-ink"] = s(r.accent, i, m(i[0]) === a ? a : w);
    }
    for (const [i, f] of Object.entries(r)) n[`${e}${o}-${i}`] = f;
  }
  return n;
}
function ct(t) {
  const e = {};
  if (b(t.brand_color)) {
    const n = q(t.brand_color);
    for (const [o, r] of [["light", "l"], ["dark", "d"]])
      for (const [c, i] of Object.entries(n[o])) e[`--wf-${r}-${D(c)}`] = i;
  }
  return { ...e, ...O(t, "--wf-") };
}
function K(t) {
  const e = b(t);
  if (!e) return {};
  const n = {};
  let o = e;
  return d(e, u.dark.bg) < 3 && (o = s(e, [u.dark.bg], a, 3), n["--wf-d-accent"] = o, n["--wf-d-accent-text"] = m(o)), n["--wf-l-accent-ink"] = s(e, [u.light.bg, u.light.card], w), n["--wf-d-accent-ink"] = s(o, [u.dark.bg, u.dark.card], a), n;
}
function it(t) {
  return Object.entries(O(t, "--wf-s-")).map(([e, n]) => `${e}:${n}`).join(";");
}
function at(t) {
  const e = String(L(t.color_scheme) || "auto");
  return e === "dark" ? "wf-dark" : e === "light" ? "" : "wf-auto";
}
const z = "wf-mode";
let x = null;
function st(t) {
  if (x) return x;
  try {
    const e = JSON.parse(localStorage.getItem(z) || "null");
    if (((e == null ? void 0 : e.mode) === "light" || (e == null ? void 0 : e.mode) === "dark") && e.base === t) return e.mode;
  } catch {
  }
  return null;
}
function ft(t, e, n) {
  var o;
  return e && n ? n : t === "system" ? (o = window.matchMedia) != null && o.call(window, "(prefers-color-scheme: dark)").matches ? "dark" : "light" : t === "dark" ? "dark" : "light";
}
function lt(t, e) {
  x = t;
  try {
    localStorage.setItem(z, JSON.stringify({ mode: t, base: e }));
  } catch {
  }
}
function ut(t) {
  var r;
  if (typeof IntersectionObserver > "u" || (r = window.matchMedia) != null && r.call(window, "(prefers-reduced-motion: reduce)").matches) return;
  t.classList.add("wf-reveal");
  const e = () => {
    t.classList.add("is-in"), n.disconnect(), window.clearTimeout(o);
  }, n = new IntersectionObserver(
    (c) => {
      c.some((i) => i.isIntersecting) && e();
    },
    { rootMargin: "0px 0px -10% 0px" }
  ), o = window.setTimeout(e, 2500);
  n.observe(t);
}
const W = `
.wf-reveal { transition: opacity .6s ease, transform .6s ease; }
.wf-reveal:not(.is-in) { opacity: 0; transform: translateY(16px); }
@media (prefers-reduced-motion: reduce) { .wf-reveal, .wf-reveal:not(.is-in) { opacity: 1; transform: none; transition: none; } }
`;
function F(t, e) {
  if (document.getElementById(t)) return;
  const n = document.createElement("style");
  n.id = t, n.textContent = e, document.head.appendChild(n);
}
const H = ["bg", "card", "title", "text", "accent", "accent-text", "accent-ink"], T = (t, e) => u[t][e === "accent-text" ? "accentText" : e === "accent-ink" ? "accentInk" : e], Y = {
  accent: "--color-primary",
  "accent-text": "--color-primary-reverse"
}, k = (t) => H.map((e) => {
  const n = t === "l" ? "light" : "dark", o = Y[e], r = o ? `var(${o}, ${T(n, e)})` : T(n, e);
  return `--wf-${e}: var(--wf-s-${t}-${e}, var(--wf-${t}-${e}, ${r}));`;
}).join(" "), J = `
.wf-host { display: block; width: 100%; min-width: 0; container-type: inline-size; }
[data-wf-section] { scroll-margin-top: var(--wf-hd-h, 0px); }
/* The last block keeps clear of the sticky buy bar while it shows */
.wf-ft { padding-bottom: calc(1.25rem + var(--wf-sb-h, 0px)) !important; }
.component-card:has(> .wf-host:not(:empty)) { min-height: 0; }
.wf-block { ${k("l")}
  display: block; width: 100%; box-sizing: border-box; font-family: var(--font-main, inherit);
  color: var(--wf-text); background: var(--wf-bg); }
.wf-block.wf-dark, html.wf-mode-dark .wf-block.wf-auto { ${k("d")} }
@media (prefers-color-scheme: dark) { html:not(.wf-mode-light) .wf-block.wf-auto { ${k("d")} } }
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
.wf-visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.wf-error { margin-top: .5rem; color: #b42318; font-size: .875rem; }
.wf-block.wf-dark .wf-error, html.wf-mode-dark .wf-auto .wf-error { color: #fda29b; }
@media (prefers-color-scheme: dark) { html:not(.wf-mode-light) .wf-auto .wf-error { color: #fda29b; } }
@media (prefers-reduced-motion: reduce) { .wf-btn, html.wf-mode-ready .wf-block { transition: none; } .wf-btn:hover { transform: none; } }
${W}
`;
let C = !1;
function dt() {
  if (F("wf-base", J), C) return;
  C = !0;
  const t = document.documentElement;
  if (t.style.getPropertyValue("--wf-d-accent")) return;
  const e = getComputedStyle(t).getPropertyValue("--color-primary").trim();
  for (const [n, o] of Object.entries(K(e))) t.style.setProperty(n, o);
}
export {
  E as a,
  F as b,
  Z as c,
  it as d,
  dt as e,
  G as f,
  nt as g,
  h,
  I as i,
  ft as j,
  st as k,
  lt as l,
  X as m,
  rt as n,
  M as o,
  ct as p,
  U as q,
  tt as r,
  at as s,
  et as t,
  L as u,
  ut as v,
  ot as w,
  Q as x,
  R as y,
  V as z
};
