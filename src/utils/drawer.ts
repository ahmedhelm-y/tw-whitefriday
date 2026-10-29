// The side cart: a floating cart button and a panel listing what the shopper added, with the tier hint,
// the total and "complete the order". One per page, shared by every deal section.
import { html, nothing, render } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { checkout } from "./buy";
import { canRemove, cartState, loadCart, removeLine } from "./cart";
import { isRtl, t } from "./config";
import { money } from "./landing";
import { tierProgress, type Tier } from "./sale";
import { ensureBase, injectStyles } from "./styles";

const css = `
.wf-cd { position: fixed; inset: 0; z-index: 60; pointer-events: none; background: transparent; }
.wf-cd__fab { position: fixed; inset-inline-start: max(1rem, env(safe-area-inset-left, 0px)); bottom: calc(1rem + var(--wf-sb-h, 0px) + env(safe-area-inset-bottom, 0px));
  display: inline-flex; align-items: center; gap: .5rem; min-height: 3.25rem; padding: 0 1.125rem; border: 0; border-radius: 999px; pointer-events: auto;
  background: var(--wf-title); color: var(--wf-bg); font: inherit; font-weight: 800; box-shadow: 0 12px 30px -10px rgb(0 0 0 / 45%); cursor: pointer; }
.wf-cd__fab b { min-width: 1.5rem; height: 1.5rem; display: grid; place-items: center; padding: 0 .375rem; border-radius: 999px; background: var(--wf-accent); color: var(--wf-accent-text); font-size: .8125rem; }
.wf-cd__fab:focus-visible { outline: 3px solid var(--wf-accent-ink); outline-offset: 3px; }
.wf-cd__shade { position: fixed; inset: 0; background: rgb(0 0 0 / 45%); opacity: 0; transition: opacity .25s ease; }
.wf-cd.is-open .wf-cd__shade { opacity: 1; pointer-events: auto; }
.wf-cd__panel { position: fixed; top: 0; bottom: 0; inset-inline-end: 0; width: min(26rem, 100vw); display: flex; flex-direction: column; background: var(--wf-bg); color: var(--wf-text);
  box-shadow: 0 0 40px rgb(0 0 0 / 25%); transform: translateX(105%); transition: transform .3s ease, visibility .3s; pointer-events: auto; visibility: hidden; outline: none; }
.wf-cd.is-rtl .wf-cd__panel { transform: translateX(-105%); }
.wf-cd.is-open .wf-cd__panel, .wf-cd.is-rtl.is-open .wf-cd__panel { transform: none; visibility: visible; transition: transform .3s ease, visibility 0s; }
.wf-cd__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.125rem; border-bottom: 1px solid color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-cd__head h2 { margin: 0; font-size: 1.125rem; font-weight: 900; color: var(--wf-title); }
.wf-cd__x { width: 2.75rem; height: 2.75rem; border: 0; border-radius: 999px; background: var(--wf-card); color: var(--wf-title); font-size: 1.5rem; cursor: pointer; }
.wf-cd .wf-cd__added { margin: .75rem 1.125rem 0; padding: .625rem .875rem; border-radius: .75rem; background: color-mix(in srgb, #12b76a 14%, var(--wf-bg)); color: #067647; font-weight: 700; font-size: .875rem; }
html.wf-mode-dark .wf-cd__added { color: #6ce9a6; }
.wf-cd .wf-cd__list { flex: 1 1 auto; overflow-y: auto; display: grid; align-content: start; gap: .75rem; margin: 0; padding: 1rem 1.125rem; list-style: none; }
.wf-cd__line { display: grid; grid-template-columns: 4rem minmax(0, 1fr) auto; gap: .75rem; align-items: center; }
.wf-cd__line img, .wf-cd__ph { width: 4rem; height: 4rem; border-radius: .75rem; object-fit: cover; background: var(--wf-card); }
.wf-cd__name { display: block; font-weight: 700; color: var(--wf-title); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.wf-cd__meta { display: block; font-size: .8125rem; }
.wf-cd__del { width: 2.75rem; height: 2.75rem; border: 0; border-radius: .625rem; background: none; color: var(--wf-text); cursor: pointer; font-size: 1.125rem; }
.wf-cd__del:hover { background: var(--wf-card); color: #d92d20; }
.wf-cd .wf-cd__empty { padding: 2rem 1rem; text-align: center; }
.wf-cd__foot { display: grid; gap: .75rem; padding: 1rem 1.125rem calc(1rem + env(safe-area-inset-bottom, 0px)); border-top: 1px solid color-mix(in srgb, var(--wf-text) 12%, transparent); }
.wf-cd__tier { display: grid; gap: .375rem; font-size: .875rem; font-weight: 700; color: var(--wf-title); }
.wf-cd__track { height: .5rem; border-radius: 999px; background: color-mix(in srgb, var(--wf-text) 15%, transparent); overflow: hidden; }
.wf-cd__track span { display: block; height: 100%; background: var(--wf-accent); }
.wf-cd__total { display: flex; justify-content: space-between; font-size: 1.125rem; font-weight: 900; color: var(--wf-title); }
.wf-cd .wf-cd__note { margin: 0; font-size: .8125rem; text-align: center; }
.wf-cd__ghost { background: transparent; color: var(--wf-title); border-color: color-mix(in srgb, var(--wf-text) 30%, transparent); }
@media (prefers-reduced-motion: reduce) { .wf-cd__panel, .wf-cd__shade { transition: none; } }
`;

let host: HTMLElement | null = null;
let open = false;
let busy = false;
let error = "";
let lastFocus: Element | null = null;

/** The tiers the tier bar publishes, so the drawer can say how far the next reward is. */
export function publishTiers(tiers: Tier[]): void {
  (window as any).__wfTiers = tiers;
}

function tiers(): Tier[] {
  return ((window as any).__wfTiers as Tier[]) || [];
}

function close() {
  open = false;
  cartState().justAdded = "";
  paint();
  (lastFocus as HTMLElement | null)?.focus?.();
}

export function openDrawer(): void {
  ensureDrawer();
  lastFocus = document.activeElement;
  open = true;
  paint();
  host?.querySelector<HTMLElement>(".wf-cd__panel")?.focus({ preventScroll: true });
}

async function onCheckout() {
  if (busy || cartState().demo) return;
  busy = true;
  error = "";
  paint();
  const ok = await checkout();
  busy = false;
  if (!ok) error = t({ ar: "تعذر فتح صفحة الدفع، حاولي مرة تانية", en: "Could not open checkout, please try again" });
  paint();
}

async function onRemove(key: string) {
  error = "";
  try {
    await removeLine(key);
  } catch {
    error = t({ ar: "تعذر حذف القطعة، حاولي مرة تانية", en: "Could not remove the item, please try again" });
    paint();
  }
}

function paint() {
  if (!host) return;
  const s = cartState();
  const progress = tiers().length ? tierProgress(s.total, tiers()) : null;
  render(html`
    <div class="wf-cd__shade" @click=${close}></div>
    ${s.count && !open
      ? html`<button type="button" class="wf-cd__fab" aria-label=${t({ ar: `السلة، ${s.count} قطع`, en: `Cart, ${s.count} items` })} @click=${openDrawer}>
          🛍️ ${t({ ar: "سلتك", en: "Your cart" })} <b>${s.count}</b></button>`
      : nothing}
    <aside class="wf-cd__panel" role="dialog" aria-modal="false" aria-label=${t({ ar: "سلتك", en: "Your cart" })} tabindex="-1">
      <div class="wf-cd__head"><h2>${t({ ar: "سلتك", en: "Your cart" })} (${s.count})</h2>
        <button type="button" class="wf-cd__x" aria-label=${t({ ar: "إغلاق", en: "Close" })} @click=${close}>×</button></div>
      ${s.justAdded ? html`<p class="wf-cd__added" role="status">✓ ${t({ ar: `اتضافت للسلة: ${s.justAdded}`, en: `Added: ${s.justAdded}` })}</p>` : nothing}
      ${s.lines.length
        ? html`<ul class="wf-cd__list">${s.lines.map((l) => html`<li class="wf-cd__line">
            ${l.image ? html`<img src=${l.image} alt="" loading="lazy" />` : html`<span class="wf-cd__ph"></span>`}
            <span><span class="wf-cd__name">${l.name}</span>${l.detail ? html`<span class="wf-cd__meta">${l.detail}</span>` : nothing}
              <span class="wf-cd__meta">${l.quantity} × ${unsafeHTML(money(l.unit))}</span></span>
            ${canRemove(l)
              ? html`<button type="button" class="wf-cd__del" aria-label=${t({ ar: `احذفي ${l.name}`, en: `Remove ${l.name}` })} @click=${() => onRemove(l.key)}>🗑</button>`
              : html`<span></span>`}
          </li>`)}</ul>`
        : html`<p class="wf-cd__empty">${t({ ar: "سلتك فاضية، اختاري من العروض", en: "Your cart is empty, pick from the deals" })}</p>`}
      <div class="wf-cd__foot">
        ${progress && s.lines.length
          ? html`<div class="wf-cd__tier">${progress.next
              ? html`<span>${t({ ar: "باقيلك", en: "Only" })} ${unsafeHTML(money(progress.left))} ${t({ ar: `وتاخدي ${progress.next.reward}`, en: `more for ${progress.next.reward}` })}</span>`
              : html`<span>${t({ ar: "وصلتي لأعلى مستوى 🎉", en: "You reached the top tier" })}</span>`}
              <div class="wf-cd__track"><span style=${`width:${progress.percent}%`}></span></div></div>`
          : nothing}
        <div class="wf-cd__total"><span>${t({ ar: "الإجمالي", en: "Total" })}</span><span>${unsafeHTML(money(s.total))}</span></div>
        <button type="button" class="wf-btn" aria-busy=${busy ? "true" : "false"} ?disabled=${!s.lines.length || s.demo} @click=${onCheckout}>${t({ ar: "إتمام الطلب", en: "Complete the order" })}</button>
        ${s.demo ? html`<p class="wf-cd__note">${t({ ar: "دي معاينة: الدفع بيشتغل في صفحة الهبوط في متجرك", en: "Preview only: checkout works on your store's landing page" })}</p>` : nothing}
        <button type="button" class="wf-btn wf-cd__ghost" @click=${close}>${t({ ar: "كمّلي التسوّق", en: "Keep shopping" })}</button>
        ${error ? html`<p class="wf-error" role="alert">${error}</p>` : nothing}
      </div>
    </aside>`, host);
  host.classList.toggle("is-open", open);
}

/** Creates the drawer once per page and loads the cart it shows. */
export function ensureDrawer(): void {
  if (host) return;
  ensureBase();
  injectStyles("wf-cart-drawer", css);
  host = document.createElement("div");
  // The block classes give the drawer the page palette in both modes
  host.className = `wf-cd wf-block wf-auto${isRtl() ? " is-rtl" : ""}`;
  document.body.appendChild(host);
  window.addEventListener("wf:cart-state", () => paint());
  document.addEventListener("keydown", (e) => {
    if (open && e.key === "Escape") close();
  });
  paint();
  void loadCart();
}
