import { i as w, x as M, y as T, h as k, o as f, t as b, q as p, z as x } from "./styles-CBhBCxUD.js";
const I = { go: (t) => window.location.assign(t) }, N = (t) => !!t && Object.keys(t).length > 0;
function v(t = {}) {
  var n;
  return w() ? (n = t.items) != null && n.length ? "cart" : x() === "product" ? f() ? N(t.options) ? "cart" : "fast-checkout" : "none" : p().url || t.fallbackUrl ? "link" : "none" : "fast-checkout";
}
const E = 15e3;
let s = null;
window.addEventListener("pageshow", () => {
  s = null;
});
function U(t = {}) {
  if (s) return s;
  const n = _(P(t)).then((e) => (e.kind !== "cart" && s === n && (s = null), e));
  return s = n, n;
}
function _(t) {
  return new Promise((n) => {
    const e = window.setTimeout(() => n({ kind: "error", message: d(null) }), E);
    t.then(n, (a) => n({ kind: "error", message: d(a) })).finally(() => window.clearTimeout(e));
  });
}
function y(t) {
  var n, e, a;
  return ((e = (n = t == null ? void 0 : t.data) == null ? void 0 : n.cart) == null ? void 0 : e.items) || ((a = t == null ? void 0 : t.data) == null ? void 0 : a.items) || [];
}
async function L(t, n, e) {
  var u, c;
  const a = new Map(n.map((o) => [String(o.id), Number(o.quantity) || 0]));
  for (const o of e) {
    const i = a.get(String(o.id)) || 0;
    if (!((Number(o.quantity) || 0) <= i))
      try {
        i ? await ((u = t.updateItem) == null ? void 0 : u.call(t, { id: o.id, quantity: i })) : await ((c = t.deleteItem) == null ? void 0 : c.call(t, o.id));
      } catch {
      }
  }
}
function O(t, n, e) {
  var u, c, o;
  const a = k();
  try {
    const i = t.product;
    (o = a == null ? void 0 : a.analytics) == null || o.track("Buy Now", {
      source: "white-friday",
      action: n,
      product_id: i != null && i.id ? String(i.id) : f(),
      items: ((u = t.items) == null ? void 0 : u.length) || 1,
      quantity: e,
      price: i != null && i.id ? Number(i.sale_price || i.price || 0) * e : null,
      currency: (i == null ? void 0 : i.currency) || ((c = a == null ? void 0 : a.config) == null ? void 0 : c.get("user.currency_code")) || null
    });
  } catch {
  }
}
function d(t) {
  var n, e, a;
  return ((a = (e = (n = t == null ? void 0 : t.response) == null ? void 0 : n.data) == null ? void 0 : e.error) == null ? void 0 : a.message) || (t == null ? void 0 : t.message) || b({ ar: "تعذر إكمال الطلب، حاول مرة أخرى", en: "We couldn't complete the order, please try again" });
}
async function P(t) {
  var a, u, c, o;
  const n = v(t), e = Math.max(1, Number(t.quantity) || 1);
  if (n !== "none" && O(t, n, e), n === "fast-checkout")
    return w() && (M(), T(e)), { kind: n };
  if (n === "cart") {
    const i = (u = (a = k()) == null ? void 0 : a.cart) == null ? void 0 : u.api, m = (c = t.items) != null && c.length ? t.items : [{ id: String(f()), quantity: e, options: t.options }];
    if (m.some((r) => r.max && r.quantity > r.max))
      return { kind: "error", message: b({ ar: "الكمية أكبر من المتاح", en: "The quantity is more than what is available" }) };
    if (!i) return { kind: "error", message: d(null) };
    let l = [];
    try {
      l = y(await ((o = i.details) == null ? void 0 : o.call(i)));
    } catch {
    }
    let g = l;
    try {
      for (const r of m) {
        const h = y(await i.addItem({ id: r.id, quantity: r.quantity, options: r.options, ...r.notes ? { notes: r.notes } : {} }));
        h.length && (g = h);
      }
    } catch (r) {
      return await L(i, l, g), { kind: "error", message: d(r) };
    }
    window.dispatchEvent(new Event("wf:cart"));
    try {
      return await i.submit(), { kind: n };
    } catch (r) {
      return { kind: "error", message: d(r) };
    }
  }
  return n === "link" ? (I.go(p().url || t.fallbackUrl || ""), { kind: n }) : { kind: "none" };
}
export {
  U as a,
  v as b
};
