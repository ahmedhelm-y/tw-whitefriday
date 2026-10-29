import { html as d, nothing as l } from "lit";
import { state as f } from "lit/decorators.js";
import { unsafeHTML as w } from "lit/directives/unsafe-html.js";
import { a as y, i as v } from "./fit-Ay1StKYC.js";
import { b as $ } from "./buy-Cnk1jDve.js";
import { a as x, t as h, m as _, f as k } from "./styles-CBhBCxUD.js";
import { W as S, c as z } from "./section-Bp25z5NG.js";
var P = Object.defineProperty, m = (n, i, e, t) => {
  for (var a = void 0, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (a = s(i, e, a) || a);
  return a && P(i, e, a), a;
};
function D(n, i = 24) {
  const e = Array.isArray(n) ? n : typeof n == "string" ? n.split(",") : n ? [n] : [];
  return [...new Set(e.map((t) => String((t && typeof t == "object" ? t.value ?? t.id : t) ?? "").trim()).filter(Boolean))].slice(0, i);
}
async function O(n) {
  return (await Promise.all(n.map((i) => k(i)))).filter((i) => i && v(i));
}
const T = `
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
class p extends S {
  constructor() {
    super(...arguments), this.picks = {}, this.invalid = {}, this.pressing = "";
  }
  pick(i, e, t) {
    const a = { ...this.picks[i] || {} };
    t ? a[String(e)] = Number(t) : delete a[String(e)], this.picks = { ...this.picks, [i]: a }, this.invalid[i] && (this.invalid = { ...this.invalid, [i]: this.invalid[i].filter((r) => r !== e) });
  }
  async buyCard(i) {
    var r;
    const e = String(i.id), t = this.picks[e] || {}, a = (i.options || []).filter((s) => (s == null ? void 0 : s.required) && (s.details || []).length && !t[String(s.id)]).map((s) => Number(s.id));
    if (a.length) {
      this.invalid = { ...this.invalid, [e]: a }, await this.updateComplete, (r = this.querySelector(`[data-card="${e}"] select[aria-invalid="true"]`)) == null || r.focus();
      return;
    }
    this.pressing = e, await this.press({ items: [{ id: e, quantity: 1, options: Object.keys(t).length ? t : void 0, max: Number(i.max_quantity) || void 0 }], product: i }), this.pressing = "";
  }
  /** The required option pickers of a product, each tied to its card for focus on a missed choice. */
  renderPickers(i) {
    const e = String(i.id), t = this.invalid[e] || [];
    return (i.options || []).filter((r) => (r == null ? void 0 : r.required) && (r.details || []).length).map((r) => {
      const s = `wf-${this.styleId}-${e}-${r.id}`, c = y(r, x());
      return d`<label class="wf-visually-hidden" for=${s}>${c}</label>
        <select id=${s} aria-invalid=${t.includes(Number(r.id)) ? "true" : "false"} @change=${(o) => this.pick(e, r.id, o.target.value)}>
          <option value="">${h({ ar: `اختاري ${c}`, en: `Choose ${c}` })}</option>
          ${r.details.map((o) => d`<option value=${o.id} ?disabled=${o.is_out}>${o.name}</option>`)}
        </select>`;
    });
  }
  renderBuy(i, e) {
    const t = String(i.id);
    return $({ items: [{ id: t, quantity: 1 }] }) !== "none" ? d`<button type="button" class="wf-btn" aria-busy=${this.pressing === t ? "true" : "false"} @click=${() => this.buyCard(i)}>${e || this.buyLabel()}</button>` : l;
  }
  renderCard(i, e = {}) {
    var o, g, u, b;
    const t = String(i.id), a = Number(i.sale_price || i.price) || 0, r = Number(i.regular_price) || 0, s = z(i), c = ((g = (o = i.images) == null ? void 0 : o[0]) == null ? void 0 : g.url) || ((u = i.image) == null ? void 0 : u.url);
    return d`<li class="wf-card" data-card=${t}>
      <div class="wf-card__img">
        ${c ? d`<img src=${c} alt=${((b = i.image) == null ? void 0 : b.alt) || ""} loading="lazy" />` : l}
        ${s ? d`<span class="wf-card__off">${h({ ar: `خصم ${s}%`, en: `${s}% off` })}</span>` : l}
        ${e.tag ? d`<span class="wf-card__tag">${e.tag}</span>` : l}
      </div>
      <div class="wf-card__body">
        <span class="wf-card__name">${i.name}</span>
        <span class="wf-card__price">${w(_(a))}${r > a ? d`<s>${w(_(r))}</s>` : l}</span>
        ${e.extra ?? l}
        ${this.renderPickers(i)}
        ${this.renderBuy(i, e.buyText)}
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
  T as c,
  O as l,
  D as p
};
