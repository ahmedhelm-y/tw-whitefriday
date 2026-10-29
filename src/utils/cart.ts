// The page's mini cart: what the shopper added from this page, kept in step with Salla's real cart.
// Only documented cart calls are used: addItem, details and deleteItem; checkout goes through buy.checkout.
import { optionExtras } from "./bundle";
import { errorMessage } from "./buy";
import { t } from "./config";
import { optionLabel } from "./fit";
import { fetchProduct, getSalla, isLandingPage } from "./landing";

export type Line = {
  key: string;
  itemId: number | null;
  productId: string;
  name: string;
  image: string;
  detail: string;
  unit: number;
  quantity: number;
};

export type CartState = { lines: Line[]; count: number; total: number; justAdded: string; demo: boolean };

const state: CartState = { lines: [], count: 0, total: 0, justAdded: "", demo: false };
type Known = { name: string; image: string; detail?: string };
const known = new Map<string, Known>();
let seq = 0;

export function cartState(): CartState {
  return state;
}

function emit() {
  window.dispatchEvent(new CustomEvent("wf:cart-state", { detail: state }));
  window.dispatchEvent(new Event("wf:cart"));
}

function recount() {
  state.count = state.lines.reduce((n, l) => n + l.quantity, 0);
}

/** "المقاس: M · اللون: أسود" from the picked option values. */
export function optionsText(product: any, chosen: Record<string, number> = {}, locale = "ar"): string {
  return (product?.options || [])
    .map((o: any) => {
      const value = (o.details || []).find((v: any) => Number(v.id) === Number(chosen[String(o.id)]));
      return value ? `${optionLabel(o, locale)}: ${value.name}` : "";
    })
    .filter(Boolean)
    .join(" · ");
}

type CartItem = { id: number; product_id: number; quantity: number; total?: number; price?: number; product_price?: number };

function summaryFrom(res: any): { items: CartItem[] | null; total: number | null } | null {
  const cart = res?.data?.cart || res?.data;
  if (!cart || typeof cart !== "object") return null;
  // items is optional in Salla's cart summary: without it the lines stay as they are
  const items = Array.isArray(cart.items) ? cart.items : null;
  const value = cart.sub_total ?? cart.total;
  const total = Number(typeof value === "object" ? value?.amount : value);
  if (!items && !Number.isFinite(total)) return null;
  return { items, total: Number.isFinite(total) ? total : null };
}

/**
 * Brings the page's lines in step with Salla's cart: each cart item claims its line (by item id, then by
 * product), items added elsewhere get a line of their own, and lines the cart no longer has are dropped.
 */
export function syncLines(lines: Line[], items: CartItem[], names: Map<string, Known>): Line[] {
  const free = [...lines];
  const out: Line[] = [];
  for (const item of items) {
    const pid = String(item.product_id);
    let i = free.findIndex((l) => l.itemId === item.id);
    if (i < 0) i = free.findIndex((l) => l.itemId === null && l.productId === pid);
    const base = i >= 0 ? free.splice(i, 1)[0] : null;
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const unit = Number(item.total) > 0 ? Math.round((Number(item.total) / quantity) * 100) / 100 : Number(item.price ?? item.product_price ?? base?.unit ?? 0);
    const info = names.get(pid);
    out.push({
      key: base?.key || `c${item.id}`,
      itemId: item.id,
      productId: pid,
      name: base?.name || info?.name || "",
      image: base?.image || info?.image || "",
      detail: base?.detail || info?.detail || "",
      unit,
      quantity,
    });
  }
  return out;
}

async function fillNames() {
  const missing = [...new Set(state.lines.filter((l) => !l.name).map((l) => l.productId))];
  if (!missing.length) return;
  await Promise.all(
    missing.map(async (id) => {
      const p = await fetchProduct(id);
      if (p) known.set(id, { name: String(p.name || ""), image: String(p.images?.[0]?.url || p.image?.url || "") });
    })
  );
  state.lines = state.lines.map((l) => (l.name ? l : { ...l, name: known.get(l.productId)?.name || t({ ar: "منتج", en: "Product" }), image: known.get(l.productId)?.image || "" }));
  emit();
}

const cents = (n: number) => Math.round(n * 100) / 100;
const localTotal = () => cents(state.lines.reduce((sum, l) => sum + l.unit * l.quantity, 0));

/** Takes Salla's answer as the truth; false when it does not carry the cart's items. */
function apply(res: any): boolean {
  const summary = summaryFrom(res);
  if (summary?.items) state.lines = syncLines(state.lines, summary.items, known);
  recount();
  state.total = summary?.total ?? localTotal();
  emit();
  void fillNames();
  return Boolean(summary?.items);
}

/** Reads the cart once when the page opens, so items added before (or on another tab) show too. */
export async function loadCart(): Promise<void> {
  if (!isLandingPage()) {
    state.demo = true;
    return;
  }
  const Salla = getSalla() as any;
  try {
    await Salla?.onReady?.();
    if (typeof Salla?.cart?.api?.details !== "function") return;
    const res = await Salla.cart.api.details();
    if (summaryFrom(res)?.items) apply(res);
  } catch {
    // no cart yet: it starts empty
  }
}

export type Added = { product: any; options?: Record<string, number>; quantity?: number };

const ADD_TIMEOUT_MS = 15000;

function remember(entries: Added[], locale: string): Line[] {
  const lines = entries.map(({ product, options = {}, quantity = 1 }) => {
    const id = String(product.id);
    const info = { name: String(product.name || ""), image: String(product.images?.[0]?.url || product.image?.url || ""), detail: optionsText(product, options, locale) };
    known.set(id, info);
    const unit = (Number(product.sale_price || product.price) || 0) + optionExtras({ product, options, quantity, selected: true });
    return { key: `p${++seq}`, itemId: null, productId: id, ...info, unit, quantity: Math.max(1, quantity) };
  });
  state.justAdded = lines.map((l) => l.name).filter(Boolean).join("، ");
  return lines;
}

function showLocal(lines: Line[]) {
  state.demo = true;
  state.lines = [...state.lines, ...lines];
  recount();
  state.total = localTotal();
  emit();
}

/**
 * Adds a product to Salla's cart and keeps the shopper on the page. Outside a real landing page (the editor
 * and template previews) the line is only shown, so the drawer can be seen without touching any cart.
 * Throws the store's message when the cart refuses the item.
 */
export async function addAndStay(product: any, options: Record<string, number> = {}, quantity = 1, locale = "ar"): Promise<void> {
  const lines = remember([{ product, options, quantity }], locale);
  if (!isLandingPage()) return showLocal(lines);
  const cart = (getSalla() as any)?.cart?.api;
  if (!cart?.addItem) throw new Error(errorMessage(null));
  // The new line goes in first, so the item the cart answers with claims it (and its option text)
  state.lines = [...state.lines, ...lines];
  let res: any;
  try {
    res = await Promise.race([
      cart.addItem({ id: product.id, quantity, options: Object.keys(options).length ? options : undefined }),
      new Promise((_, reject) => window.setTimeout(() => reject(new Error(errorMessage(null))), ADD_TIMEOUT_MS)),
    ]);
  } catch (error) {
    state.lines = state.lines.filter((l) => !lines.includes(l));
    state.justAdded = "";
    throw new Error(errorMessage(error));
  }
  if (!apply(res)) await refresh();
}

/** After a set was added through the cart (the bundles section), shows its pieces in the side cart. */
export async function noteAdded(entries: Added[], locale = "ar"): Promise<void> {
  const lines = remember(entries, locale);
  if (!isLandingPage()) return showLocal(lines);
  // The pieces go in first, so the cart items claim them (with their names, options and prices)
  state.lines = [...state.lines, ...lines];
  await refresh();
}

/** Reads the cart again for its items; keeps what is shown when the cart cannot be read. */
async function refresh() {
  try {
    const cart = (getSalla() as any)?.cart?.api;
    if (typeof cart?.details === "function" && apply(await cart.details())) return;
  } catch {
    // keep the lines as they are
  }
  recount();
  emit();
}

/** True when the line can be removed from here: always in a preview, else once Salla gave its item id. */
export function canRemove(line: Line): boolean {
  return state.demo || line.itemId !== null;
}

export async function removeLine(key: string): Promise<void> {
  const line = state.lines.find((l) => l.key === key);
  if (!line || !canRemove(line)) return;
  const drop = () => {
    state.lines = state.lines.filter((l) => l.key !== key);
    recount();
  };
  if (state.demo) {
    drop();
    state.total = localTotal();
    emit();
    return;
  }
  const cart = (getSalla() as any)?.cart?.api;
  if (!cart?.deleteItem) throw new Error(errorMessage(null));
  const res = await cart.deleteItem(line.itemId);
  if (summaryFrom(res)?.items) return void apply(res);
  drop();
  await refresh();
}

/** For tests: start from an empty cart. */
export function resetCart(): void {
  state.lines = [];
  state.count = 0;
  state.total = 0;
  state.justAdded = "";
  state.demo = false;
  known.clear();
}
