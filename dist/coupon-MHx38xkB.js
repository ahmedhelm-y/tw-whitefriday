function r(e) {
  if (typeof e != "string" || !e.trim()) return null;
  const n = e.trim().replace(/^(\d{4}-\d{2}-\d{2})\s+/, "$1T");
  if (!/^\d{4}-\d{2}-\d{2}/.test(n)) return null;
  const t = new Date(n);
  return Number.isNaN(t.getTime()) ? null : t;
}
function i(e, n = /* @__PURE__ */ new Date()) {
  const t = r(e);
  return t !== null && t.getTime() <= n.getTime();
}
function u(e) {
  return `wf-coupon:${e}`;
}
export {
  i,
  u as r
};
