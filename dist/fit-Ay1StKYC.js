function o(e) {
  var t;
  return (((t = e.product) == null ? void 0 : t.options) || []).filter((i) => (i == null ? void 0 : i.required) && (i.details || []).length && !e.options[String(i.id)]).map((i) => Number(i.id));
}
function h(e, n = 0) {
  var r;
  const t = {}, i = e.filter((s) => s.selected);
  for (const s of i) {
    const a = o(s);
    a.length && (t[String((r = s.product) == null ? void 0 : r.id)] = a);
  }
  return { ok: i.length >= n && Object.keys(t).length === 0, missing: t };
}
const u = (e) => Number((e == null ? void 0 : e.sale_price) || (e == null ? void 0 : e.price)) || 0;
function l(e) {
  var t;
  let n = 0;
  for (const i of ((t = e.product) == null ? void 0 : t.options) || []) {
    const r = e.options[String(i.id)], s = (i.details || []).find((a) => Number(a.id) === Number(r));
    n += Number(s == null ? void 0 : s.additional_price) || 0;
  }
  return n;
}
function y(e) {
  return !((e == null ? void 0 : e.status) === "out" || (e == null ? void 0 : e.is_available) === !1 || (e == null ? void 0 : e.is_out_of_stock) === !0);
}
function _(e) {
  const n = e.filter((t) => t.selected);
  return {
    total: n.reduce((t, i) => t + (u(i.product) + l(i)) * i.quantity, 0),
    regular: n.reduce((t, i) => {
      var r;
      return t + (Math.max(Number((r = i.product) == null ? void 0 : r.regular_price) || 0, u(i.product)) + l(i)) * i.quantity;
    }, 0),
    count: n.length
  };
}
function x(e) {
  return e.filter((n) => n.selected).map((n) => {
    var t, i;
    return {
      id: String((t = n.product) == null ? void 0 : t.id),
      quantity: n.quantity,
      options: Object.keys(n.options).length ? n.options : void 0,
      max: Number((i = n.product) == null ? void 0 : i.max_quantity) || void 0
    };
  });
}
const c = "٠١٢٣٤٥٦٧٨٩";
function d(e) {
  return String(e ?? "").replace(/[٠-٩]/g, (n) => String(c.indexOf(n))).replace(/\s+/g, "").toLowerCase();
}
const g = /اسود|أسود|ابيض|أبيض|بيج|بني|رمادي|كحلي|ازرق|أزرق|اخضر|أخضر|زيتي|عنابي|نبيتي|احمر|أحمر|وردي|زهري|فوشي|موف|بنفسجي|ليلكي|ذهبي|فضي|نود|كريمي|black|white|beige|brown|grey|gray|navy|blue|green|olive|maroon|burgundy|red|pink|fuchsia|purple|lilac|gold|silver|nude|cream/i, f = /^(\d{2}\s*-\s*)?(xxs|xs|s|m|l|xl|xxl|xxxl|\dxl)(\s*-\s*\d{2})?$|free\s*size|فري\s*سايز|مقاس\s*واحد/i;
function m(e) {
  const n = ((e == null ? void 0 : e.details) || []).map((r) => d(r == null ? void 0 : r.name));
  if (!n.length) return null;
  const t = (r) => n.filter(r).length / n.length;
  if ((e == null ? void 0 : e.type) === "color" || t((r) => g.test(r)) >= 0.5) return "color";
  if (t((r) => f.test(r)) >= 0.5) return "size";
  const i = n.map((r) => /^\d{2}(\.\d)?(in|inch|انش|إنش|بوصة|")?$/.test(r) ? parseFloat(r) : NaN);
  return i.every((r) => r >= 48 && r <= 66) ? "length" : i.every((r) => r >= 30 && r <= 47) ? "size" : null;
}
function S(e, n) {
  const t = Number(e == null ? void 0 : e.quantity);
  return e != null && e.can_show_remained_quantity && !(e != null && e.is_hidden_quantity) && Number.isFinite(t) && t >= 0 ? t : null;
}
function N(e, n) {
  return e !== null && e > 0 && e <= Math.max(1, n) ? e : null;
}
const b = {
  size: { ar: "المقاس", en: "Size" },
  length: { ar: "الطول", en: "Length" },
  color: { ar: "اللون", en: "Color" }
};
function k(e, n) {
  const t = m(e);
  return t ? b[t][n === "en" ? "en" : "ar"] : String((e == null ? void 0 : e.name) || "");
}
export {
  k as a,
  _ as b,
  y as i,
  N as l,
  l as o,
  S as r,
  x as t,
  h as v
};
