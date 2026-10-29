import { html, nothing, type TemplateResult } from "lit";
import { state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { isAvailable } from "./bundle";
import { buyAction } from "./buy";
import { getLocale, t } from "./config";
import { optionLabel } from "./fit";
import { fetchProduct, money } from "./landing";
import { discountPercent } from "./sale";
import { WfSection } from "./section";

/** Product ids from the editor's multi-select, a single value, or "1,2,3". */
export function productIds(value: unknown, max = 24): string[] {
  const list = Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : value ? [value] : [];
  return [...new Set(list.map((item: any) => String((item && typeof item === "object" ? item.value ?? item.id : item) ?? "").trim()).filter(Boolean))].slice(0, max);
}

/** Loads products in order, dropping missing and sold out ones. */
export async function loadProducts(ids: string[]): Promise<any[]> {
  return (await Promise.all(ids.map((id) => fetchProduct(id)))).filter((p) => p && isAvailable(p));
}

export const cardCss = `
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

/** A section that sells product cards: each card keeps its own option picks and buys on its own. */
export abstract class DealSection extends WfSection {
  @state() protected picks: Record<string, Record<string, number>> = {};
  @state() protected invalid: Record<string, number[]> = {};
  @state() protected pressing = "";

  protected pick(id: string, optionId: number, value: string) {
    const current = { ...(this.picks[id] || {}) };
    if (value) current[String(optionId)] = Number(value);
    else delete current[String(optionId)];
    this.picks = { ...this.picks, [id]: current };
    if (this.invalid[id]) this.invalid = { ...this.invalid, [id]: this.invalid[id].filter((o) => o !== optionId) };
  }

  protected async buyCard(product: any) {
    const id = String(product.id);
    const chosen = this.picks[id] || {};
    const missing = (product.options || []).filter((o: any) => o?.required && (o.details || []).length && !chosen[String(o.id)]).map((o: any) => Number(o.id));
    if (missing.length) {
      this.invalid = { ...this.invalid, [id]: missing };
      await this.updateComplete;
      this.querySelector<HTMLSelectElement>(`[data-card="${id}"] select[aria-invalid="true"]`)?.focus();
      return;
    }
    this.pressing = id;
    await this.press({ items: [{ id, quantity: 1, options: Object.keys(chosen).length ? chosen : undefined, max: Number(product.max_quantity) || undefined }], product });
    this.pressing = "";
  }

  /** The required option pickers of a product, each tied to its card for focus on a missed choice. */
  protected renderPickers(p: any) {
    const id = String(p.id);
    const invalid = this.invalid[id] || [];
    const selects = (p.options || []).filter((opt: any) => opt?.required && (opt.details || []).length);
    return selects.map((opt: any) => {
      const sid = `wf-${this.styleId}-${id}-${opt.id}`;
      const label = optionLabel(opt, getLocale());
      return html`<label class="wf-visually-hidden" for=${sid}>${label}</label>
        <select id=${sid} aria-invalid=${invalid.includes(Number(opt.id)) ? "true" : "false"} @change=${(e: Event) => this.pick(id, opt.id, (e.target as HTMLSelectElement).value)}>
          <option value="">${t({ ar: `اختاري ${label}`, en: `Choose ${label}` })}</option>
          ${(opt.details as any[]).map((v) => html`<option value=${v.id} ?disabled=${v.is_out}>${v.name}</option>`)}
        </select>`;
    });
  }

  protected renderBuy(p: any, text?: string) {
    const id = String(p.id);
    return buyAction({ items: [{ id, quantity: 1 }] }) !== "none"
      ? html`<button type="button" class="wf-btn" aria-busy=${this.pressing === id ? "true" : "false"} @click=${() => this.buyCard(p)}>${text || this.buyLabel()}</button>`
      : nothing;
  }

  protected renderCard(p: any, o: { tag?: string; buyText?: string; extra?: TemplateResult | typeof nothing } = {}) {
    const id = String(p.id);
    const price = Number(p.sale_price || p.price) || 0;
    const regular = Number(p.regular_price) || 0;
    const off = discountPercent(p);
    const image = p.images?.[0]?.url || p.image?.url;
    return html`<li class="wf-card" data-card=${id}>
      <div class="wf-card__img">
        ${image ? html`<img src=${image} alt=${p.image?.alt || ""} loading="lazy" />` : nothing}
        ${off ? html`<span class="wf-card__off">${t({ ar: `خصم ${off}%`, en: `${off}% off` })}</span>` : nothing}
        ${o.tag ? html`<span class="wf-card__tag">${o.tag}</span>` : nothing}
      </div>
      <div class="wf-card__body">
        <span class="wf-card__name">${p.name}</span>
        <span class="wf-card__price">${unsafeHTML(money(price))}${regular > price ? html`<s>${unsafeHTML(money(regular))}</s>` : nothing}</span>
        ${o.extra ?? nothing}
        ${this.renderPickers(p)}
        ${this.renderBuy(p, o.buyText)}
      </div>
    </li>`;
  }
}
