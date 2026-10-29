import { nothing as r, html as c } from "lit";
import { i as s, t as a } from "./styles-B5EzsqQ8.js";
async function l(t, o) {
  try {
    return await navigator.clipboard.writeText(t), a({ ar: "اتنسخ الكود ✓", en: "Code copied ✓" });
  } catch {
    if (o) {
      const n = document.createRange();
      n.selectNodeContents(o);
      const e = window.getSelection();
      e == null || e.removeAllRanges(), e == null || e.addRange(n);
    }
    return a({ ar: "حددنا الكود، انسخيه من قائمة النسخ", en: "The code is selected, copy it from your menu" });
  }
}
const f = `
.wf-code { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .625rem; }
.wf-code__value { padding: .5rem 1.125rem; border: 2px dashed var(--wf-accent-ink); border-radius: .75rem; font-size: 1.375rem; font-weight: 900; letter-spacing: .12em;
  color: var(--wf-title); direction: ltr; user-select: all; -webkit-user-select: all; }
.wf-code__copy { min-height: 2.75rem; }
.wf-code__status { flex-basis: 100%; text-align: center; font-size: .875rem; font-weight: 700; color: var(--wf-accent-ink); }
`;
function p(t, o, n) {
  return c`<div class="wf-code">
    <span class="wf-code__value">${t}</span>
    <button type="button" class="wf-btn wf-code__copy" @click=${n}>${a({ ar: "انسخي الكود", en: "Copy code" })}</button>
    ${o ? c`<span class="wf-code__status" role="status">${o}</span>` : r}
  </div>`;
}
function u(t) {
  return !s() || t.codes_ready === !0;
}
export {
  u as a,
  p as b,
  f as c,
  l as d
};
