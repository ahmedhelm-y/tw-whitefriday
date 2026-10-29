import { html as r, nothing as l } from "lit";
import { state as g } from "lit/decorators.js";
import { unsafeHTML as m } from "lit/directives/unsafe-html.js";
import { i as S, v as z, t as P, o as j, a as B, b as q } from "./fit-Ay1StKYC.js";
import { b as A } from "./buy-Cnk1jDve.js";
import { f as L, t as c, m as u, a as N, i as O, r as C } from "./styles-CBhBCxUD.js";
import { W as T } from "./section-Bp25z5NG.js";
var E = Object.defineProperty, _ = (o, e, t, i) => {
  for (var s = void 0, a = o.length - 1, p; a >= 0; a--)
    (p = o[a]) && (s = p(e, t, s) || s);
  return s && E(e, t, s), s;
};
const H = `
.wf-bb__grid { display: grid; gap: .875rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
@container (min-width: 768px) { .wf-bb__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; } }
.wf-bb__card { position: relative; display: flex; flex-direction: column; border: 2px solid color-mix(in srgb, var(--wf-text) 15%, transparent);
  border-radius: 1rem; background: var(--wf-card); overflow: hidden; transition: border-color .2s ease; }
.wf-bb__card.is-on { border-color: var(--wf-accent-ink); }
.wf-bb__pick { display: flex; flex-direction: column; width: 100%; padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: start; cursor: pointer; }
.wf-bb__pick:focus-visible { outline: 2px solid var(--wf-accent-ink); outline-offset: -4px; }
.wf-bb__img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; background: var(--wf-bg); }
.wf-bb__check { position: absolute; top: .625rem; inset-inline-start: .625rem; width: 1.75rem; height: 1.75rem; display: grid; place-items: center;
  border: 2px solid #fff; border-radius: .5rem; background: rgb(0 0 0 / 30%); color: #fff; }
.wf-bb__card.is-on .wf-bb__check { border-color: var(--wf-accent-ink); background: var(--wf-accent); color: var(--wf-accent-text); }
.wf-bb__check svg { width: 1rem; height: 1rem; opacity: 0; }
.wf-bb__card.is-on .wf-bb__check svg { opacity: 1; }
.wf-bb__info { display: flex; flex-direction: column; gap: .25rem; padding: .75rem .875rem 0; }
.wf-bb__name { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; font-weight: 700; font-size: .9375rem; line-height: 1.5; color: var(--wf-title); }
.wf-bb__price { font-weight: 800; color: var(--wf-title); }
.wf-bb__opts { display: grid; gap: .375rem; padding: .625rem .875rem .875rem; margin-top: auto; }
.wf-bb__opts select { width: 100%; min-height: 2.75rem; padding: 0 .625rem; border: 1px solid color-mix(in srgb, var(--wf-text) 25%, transparent);
  border-radius: .625rem; background: var(--wf-bg); color: var(--wf-title); font: inherit; font-size: .875rem; }
.wf-bb__opts select[aria-invalid="true"] { border-color: #d92d20; }
.wf-bb__miss { color: #d92d20; font-size: .8125rem; font-weight: 600; }
.wf-bb__bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 1.5rem; padding: 1rem 1.25rem;
  border-radius: 1rem; background: var(--wf-card); }
.wf-bb__sum { display: flex; flex-direction: column; gap: .125rem; }
.wf-bb__total { display: flex; align-items: baseline; gap: .5rem; font-size: 1.375rem; font-weight: 800; color: var(--wf-title); }
.wf-bb__total s { font-size: 1rem; font-weight: 500; opacity: .7; }
.wf-bb__offer { font-size: .875rem; }
.wf-bb__bar .wf-btn { flex: 1 1 14rem; }
.wf-bb__empty { padding: 2rem; border: 1px dashed color-mix(in srgb, var(--wf-text) 35%, transparent); border-radius: 1rem; text-align: center; }
`, I = r`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 8.5 3 3 7-7" /></svg>`;
function W(o) {
  return (Array.isArray(o) ? o : typeof o == "string" ? o.split(",") : o ? [o] : []).map((t) => t && typeof t == "object" ? t.value ?? t.id : t).map((t) => String(t ?? "").trim()).filter(Boolean).slice(0, 6);
}
class f extends T {
  constructor() {
    super(...arguments), this.styleId = "deal-bundles", this.gated = !0, this.lines = [], this.loaded = !1, this.missing = {};
  }
  styles() {
    return H;
  }
  async connectedCallback() {
    super.connectedCallback();
    const e = this.cfg(), t = (await Promise.all(W(e.products).map((i) => L(i)))).filter((i) => i && S(i));
    this.lines = t.map((i) => ({ product: i, selected: e.preselect !== !1, quantity: 1, options: {} })), this.loaded = !0;
  }
  update_(e, t) {
    this.lines = this.lines.map((s, a) => a === e ? { ...s, ...t } : s);
    const i = String(this.lines[e].product.id);
    if (this.missing[i]) {
      const { [i]: s, ...a } = this.missing;
      this.missing = a;
    }
  }
  setOption(e, t, i) {
    const s = { ...this.lines[e].options };
    i ? s[String(t)] = Number(i) : delete s[String(t)], this.update_(e, { options: s, selected: !0 });
  }
  async onBuy() {
    var t;
    const e = z(this.lines, 1);
    if (this.missing = e.missing, !e.ok) {
      this.error = Object.keys(e.missing).length ? c({ ar: "اختاري المقاس لكل قطعة في الباقة", en: "Choose a size for every piece in the set" }) : c({ ar: "اختاري قطعة واحدة على الأقل", en: "Pick at least one piece" }), await this.updateComplete, (t = this.querySelector('select[aria-invalid="true"]')) == null || t.focus();
      return;
    }
    await this.press({ items: P(this.lines) });
  }
  renderCard(e, t) {
    var h, w, y, v, $;
    const i = e.product, s = (i.options || []).filter((n) => (n == null ? void 0 : n.required) && (n.details || []).length), a = this.missing[String(i.id)] || [], p = (Number(i.sale_price || i.price) || 0) + j(e);
    return r`<li class="wf-bb__card${e.selected ? " is-on" : ""}">
      <button type="button" class="wf-bb__pick" role="checkbox" aria-checked=${e.selected ? "true" : "false"}
        @click=${() => this.update_(t, { selected: !e.selected })}>
        <span class="wf-bb__check">${I}</span>
        ${(w = (h = i.images) == null ? void 0 : h[0]) != null && w.url || (y = i.image) != null && y.url ? r`<img class="wf-bb__img" src=${(($ = (v = i.images) == null ? void 0 : v[0]) == null ? void 0 : $.url) || i.image.url} alt="" loading="lazy" />` : l}
        <span class="wf-bb__info">
          <span class="wf-bb__name">${i.name}</span>
          <span class="wf-bb__price">${m(u(p))}</span>
        </span>
      </button>
      ${s.length ? r`<div class="wf-bb__opts">${s.map((n) => {
      const x = a.includes(Number(n.id)), k = `wf-bb-${i.id}-${n.id}`, b = B(n, N());
      return r`<label class="wf-visually-hidden" for=${k}>${b}</label>
              <select id=${k} aria-invalid=${x ? "true" : "false"} @change=${(d) => this.setOption(t, n.id, d.target.value)}>
                <option value="">${c({ ar: `اختاري ${b}`, en: `Choose ${b}` })}</option>
                ${n.details.map((d) => r`<option value=${d.id} ?disabled=${d.is_out} ?selected=${e.options[String(n.id)] === Number(d.id)}>${d.name}</option>`)}
              </select>
              ${x ? r`<span class="wf-bb__miss">${c({ ar: `اختاري ${b}`, en: `Choose ${b}` })}</span>` : l}`;
    })}</div>` : l}
    </li>`;
  }
  render() {
    if (this.closed()) return l;
    if (!this.lines.length)
      return !this.loaded || O() ? l : this.frame(r`<p class="wf-bb__empty">${c({ ar: "اختر منتجات الباقة من إعدادات هذا القسم", en: "Pick the set's products in this section's settings" })}</p>`);
    const e = q(this.lines), t = C(this.cfg().offer_text), i = A({ items: [{ id: "x", quantity: 1 }] }) !== "none";
    return this.frame(r`<ul class="wf-bb__grid">${this.lines.map((s, a) => this.renderCard(s, a))}</ul>
      <div class="wf-bb__bar">
        <div class="wf-bb__sum" aria-live="polite">
          <span>${c({ ar: e.count === 1 ? "قطعة واحدة" : e.count === 2 ? "قطعتين" : `${e.count} قطع`, en: `${e.count} pieces` })}</span>
          <span class="wf-bb__total">${m(u(e.total))}
            ${e.regular > e.total ? r`<s>${m(u(e.regular))}</s>` : l}</span>
          ${t ? r`<span class="wf-bb__offer">${t}</span>` : l}
        </div>
        ${i ? r`<button type="button" class="wf-btn" aria-busy=${this.busy ? "true" : "false"} ?disabled=${!e.count}
              @click=${() => this.onBuy()}>${C(this.cfg().buy_text) || c({ ar: "أضيفي الباقة للسلة", en: "Add the set" })}</button>` : l}
      </div>`, { extraClass: "wf-bb" });
  }
}
_([
  g()
], f.prototype, "lines");
_([
  g()
], f.prototype, "loaded");
_([
  g()
], f.prototype, "missing");
typeof f < "u" && f.registerSallaComponent("salla-deal-bundles");
export {
  f as default
};
