function e(n) {
  const t = Math.max(0, Math.floor(n / 1e3)), o = Math.floor(t / 3600), a = Math.floor(t % 3600 / 60), r = t % 60;
  return `${o}:${String(a).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function c(n, t) {
  try {
    return new Intl.DateTimeFormat(t === "en" ? "en-GB" : "ar-SA-u-nu-latn-ca-gregory", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC"
    }).format(n);
  } catch {
    return n.toISOString().slice(0, 10);
  }
}
export {
  e as a,
  c as f
};
