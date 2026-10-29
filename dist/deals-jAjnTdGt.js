import { html as c, nothing as l } from "lit";
import { state as f } from "lit/decorators.js";
import { unsafeHTML as w } from "lit/directives/unsafe-html.js";
import { e as $, d as v, o as k, b as x, i as S } from "./drawer-Bsbz3Eou.js";
import { b as C } from "./buy-Dta8ARKq.js";
import { a as h, b as z, t as _, m as y, f as P } from "./styles-B5EzsqQ8.js";
import { W as A, c as N } from "./section-CJM2ceBk.js";
var q = Object.defineProperty, m = (o, r, e, a) => {
  for (var s = void 0, i = o.length - 1, n; i >= 0; i--)
    (n = o[i]) && (s = n(r, e, s) || s);
  return s && q(r, e, s), s;
};
function M(o, r = 24) {
  const e = Array.isArray(o) ? o : typeof o == "string" ? o.split(",") : o ? [o] : [];
  return [...new Set(e.map((a) => String((a && typeof a == "object" ? a.value ?? a.id : a) ?? "").trim()).filter(Boolean))].slice(0, r);
}
async function O(o) {
  return (await Promise.all(o.map((r) => P(r)))).filter((r) => r && S(r));
}
const E = `
.wf-card { display: flex; flex-direction: column; min-width: 0; border-radius: 1.25rem; background: var(--wf-card); overflow: hidden; }
.wf-card__img { position: relative; aspect-ratio: 1 / 1; background: var(--wf-bg); }
.wf-card__img img { width: 100%; height: 100%; object-fit: cover; }
.wf-card__off { position: absolute; top: .625rem; inset-inline-start: .625rem; padding: .25rem .625rem; border-radius: .5rem; background: #d92d20; color: #fff;
  font-size: .8125rem; font-weight: 800; }
.wf-card__tag { position: absolute; bottom: .625rem; inset-inline-start: .625rem; padding: .125rem .625rem; border-radius: 999px; background: var(--wf-title);
  color: var(--wf-bg); font-size: .75rem; font-weight: 700; }
.wf-card__body { display: flex; flex-direction: column; gap: .5rem; padding: .875rem; flex: 1 1 auto; }
.wf-card__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--wf-title); }
.wf-card__price { display: flex; flex-wrap: wrap; gap: .5rem; align-items: baseline; font-weight: 900; font-size: 1.125rem; color: #d92d20; }
.wf-block.wf-dark .wf-card__price, html.wf-mode-dark .wf-auto .wf-card__price { color: #ff8a80; }
.wf-card__price s { font-weight: 500; font-size: .8125rem; color: var(--wf-text); opacity: .75; }
.wf-card__body select { width: 100%; min-height: 2.75rem; padding: 0 .625rem; border: 1px solid color-mix(in srgb, var(--wf-text) 25%, transparent); border-radius: .625rem;
  background: var(--wf-bg); color: var(--wf-title); font: inherit; font-size: .875rem; }
.wf-card__body select[aria-invalid="true"] { border-color: #d92d20; }
.wf-card__body .wf-btn { margin-top: auto; padding-inline: .75rem; font-size: .9375rem; }
.wf-empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--wf-text) 35%, transparent); border-radius: 1rem; text-align: center; }
`;
class p extends A {
  constructor() {
    super(...arguments), this.picks = {}, this.invalid = {}, this.pressing = "";
  }
  connectedCallback() {
    super.connectedCallback(), $();
  }
  pick(r, e, a) {
    const s = { ...this.picks[r] || {} };
    a ? s[String(e)] = Number(a) : delete s[String(e)], this.picks = { ...this.picks, [r]: s }, this.invalid[r] && (this.invalid = { ...this.invalid, [r]: this.invalid[r].filter((i) => i !== e) });
  }
  async buyCard(r) {
    var i, n, d;
    const e = String(r.id), a = this.picks[e] || {}, s = (r.options || []).filter((t) => (t == null ? void 0 : t.required) && (t.details || []).length && !a[String(t.id)]).map((t) => Number(t.id));
    if (s.length) {
      this.invalid = { ...this.invalid, [e]: s }, await this.updateComplete, (i = this.querySelector(`[data-card="${e}"] select[aria-invalid="true"]`)) == null || i.focus();
      return;
    }
    if (!this.pressing) {
      this.pressing = e, this.error = "";
      try {
        await v(r, a, 1, h()), k();
      } catch (t) {
        this.error = (t == null ? void 0 : t.message) || "", (d = (n = z()) == null ? void 0 : n.error) == null || d.call(n, this.error);
      } finally {
        this.pressing = "";
      }
    }
  }
  /** The required option pickers of a product, each tied to its card for focus on a missed choice. */
  renderPickers(r) {
    const e = String(r.id), a = this.invalid[e] || [];
    return (r.options || []).filter((i) => (i == null ? void 0 : i.required) && (i.details || []).length).map((i) => {
      const n = `wf-${this.styleId}-${e}-${i.id}`, d = x(i, h());
      return c`<label class="wf-visually-hidden" for=${n}>${d}</label>
        <select id=${n} aria-invalid=${a.includes(Number(i.id)) ? "true" : "false"} @change=${(t) => this.pick(e, i.id, t.target.value)}>
          <option value="">${_({ ar: `اختاري ${d}`, en: `Choose ${d}` })}</option>
          ${i.details.map((t) => c`<option value=${t.id} ?disabled=${t.is_out}>${t.name}</option>`)}
        </select>`;
    });
  }
  renderBuy(r, e) {
    const a = String(r.id);
    return C({ items: [{ id: a, quantity: 1 }] }) !== "none" ? c`<button type="button" class="wf-btn" aria-busy=${this.pressing === a ? "true" : "false"} @click=${() => this.buyCard(r)}>${e || this.buyLabel()}</button>` : l;
  }
  renderCard(r, e = {}) {
    var t, g, u, b;
    const a = String(r.id), s = Number(r.sale_price || r.price) || 0, i = Number(r.regular_price) || 0, n = N(r), d = ((g = (t = r.images) == null ? void 0 : t[0]) == null ? void 0 : g.url) || ((u = r.image) == null ? void 0 : u.url);
    return c`<li class="wf-card" data-card=${a}>
      <div class="wf-card__img">
        ${d ? c`<img src=${d} alt=${((b = r.image) == null ? void 0 : b.alt) || ""} loading="lazy" />` : l}
        ${n ? c`<span class="wf-card__off">${_({ ar: `خصم ${n}%`, en: `${n}% off` })}</span>` : l}
        ${e.tag ? c`<span class="wf-card__tag">${e.tag}</span>` : l}
      </div>
      <div class="wf-card__body">
        <span class="wf-card__name">${r.name}</span>
        <span class="wf-card__price">${w(y(s))}${i > s ? c`<s>${w(y(i))}</s>` : l}</span>
        ${e.extra ?? l}
        ${this.renderPickers(r)}
        ${this.renderBuy(r, e.buyText)}
      </div>
    </li>`;
  }
}
m([
  f()
], p.prototype, "picks");
m([
  f()
], p.prototype, "invalid");
m([
  f()
], p.prototype, "pressing");
export {
  p as D,
  E as c,
  O as l,
  M as p
};
