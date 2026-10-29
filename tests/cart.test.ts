import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addAndStay, canRemove, cartState, loadCart, noteAdded, optionsText, removeLine, resetCart, syncLines, type Line } from "../src/utils/cart";

const dress = {
  id: 1, name: "فستان سهرة", price: 300, sale_price: 240, images: [{ url: "https://cdn/x.jpg" }],
  options: [{ id: 7, name: "المقاس", required: true, details: [{ id: 70, name: "S" }, { id: 71, name: "M", additional_price: 20 }] }],
};
const bag = { id: 2, name: "شنطة", price: 150, images: [] };

function setupSalla(landing = true, api: Record<string, any> = {}) {
  const config: Record<string, any> = { "page.is_landing_page": landing, "theme.settings": {} };
  const salla = { config: { get: (k: string) => config[k] }, cart: { api }, onReady: async () => {} };
  (window as any).Salla = salla;
  return salla;
}

const cartRes = (items: any[], subTotal: number) => ({ data: { cart: { sub_total: subTotal, items } } });

beforeEach(() => resetCart());
afterEach(() => {
  delete (window as any).Salla;
  vi.restoreAllMocks();
});

describe("optionsText", () => {
  it("names each chosen option", () => {
    expect(optionsText(dress, { 7: 71 })).toBe("المقاس: M");
    expect(optionsText(dress, {})).toBe("");
  });
});

describe("syncLines", () => {
  const line = (over: Partial<Line>): Line => ({ key: "p1", itemId: null, productId: "1", name: "a", image: "", detail: "", unit: 0, quantity: 1, ...over });

  it("gives a new line its cart item and price", () => {
    const out = syncLines([line({})], [{ id: 11, product_id: 1, quantity: 2, total: 480 }], new Map());
    expect(out).toEqual([expect.objectContaining({ key: "p1", itemId: 11, unit: 240, quantity: 2, name: "a" })]);
  });

  it("matches by item id first, keeps items added elsewhere and drops removed ones", () => {
    const lines = [line({ key: "p1", itemId: 11 }), line({ key: "p2", itemId: 12, productId: "2" })];
    const out = syncLines(lines, [{ id: 11, product_id: 1, quantity: 1, total: 240 }, { id: 13, product_id: 3, quantity: 1, total: 50 }], new Map([["3", { name: "c", image: "" }]]));
    expect(out.map((l) => [l.key, l.itemId, l.name])).toEqual([["p1", 11, "a"], ["c13", 13, "c"]]);
  });
});

describe("in a preview", () => {
  it("shows added items without touching any cart", async () => {
    const addItem = vi.fn();
    setupSalla(false, { addItem });
    await addAndStay(dress, { 7: 71 }, 1);
    await addAndStay(bag);
    const s = cartState();
    expect(addItem).not.toHaveBeenCalled();
    expect(s.demo).toBe(true);
    expect(s.count).toBe(2);
    expect(s.total).toBe(260 + 150);
    expect(s.lines[0].detail).toBe("المقاس: M");
    await removeLine(s.lines[0].key);
    expect(cartState().lines.map((l) => l.name)).toEqual(["شنطة"]);
    expect(cartState().total).toBe(150);
  });

  it("shows the pieces of a set", async () => {
    setupSalla(false);
    await noteAdded([{ product: dress, options: { 7: 70 } }, { product: bag, quantity: 2 }]);
    expect(cartState().count).toBe(3);
    expect(cartState().justAdded).toBe("فستان سهرة، شنطة");
  });
});

describe("on a landing page", () => {
  it("adds to Salla's cart and takes its items and total", async () => {
    const addItem = vi.fn(async () => cartRes([{ id: 11, product_id: 1, quantity: 1, total: 260 }], 260));
    setupSalla(true, { addItem });
    await addAndStay(dress, { 7: 71 }, 1);
    expect(addItem).toHaveBeenCalledWith({ id: 1, quantity: 1, options: { 7: 71 } });
    const s = cartState();
    expect(s.demo).toBe(false);
    expect(s.lines).toEqual([expect.objectContaining({ itemId: 11, name: "فستان سهرة", detail: "المقاس: M", unit: 260 })]);
    expect(s.total).toBe(260);
  });

  it("drops the line and passes on the store's message when the cart refuses", async () => {
    setupSalla(true, { addItem: vi.fn(async () => { throw { response: { data: { error: { message: "نفدت الكمية" } } } }; }) });
    await expect(addAndStay(bag)).rejects.toThrow("نفدت الكمية");
    expect(cartState().lines).toEqual([]);
  });

  it("reads the cart again when the answer has no items", async () => {
    const details = vi.fn(async () => cartRes([{ id: 21, product_id: 2, quantity: 1, total: 150 }], 150));
    setupSalla(true, { addItem: vi.fn(async () => ({ data: { cart: { sub_total: 150 } } })), details });
    await addAndStay(bag);
    expect(details).toHaveBeenCalled();
    expect(cartState().lines[0].itemId).toBe(21);
  });

  it("keeps the line, without a delete button, when the cart never names its item", async () => {
    setupSalla(true, { addItem: vi.fn(async () => ({ data: { cart: { sub_total: 150 } } })), details: vi.fn(async () => { throw new Error("x"); }) });
    await addAndStay(bag);
    const [line] = cartState().lines;
    expect(line.itemId).toBeNull();
    expect(canRemove(line)).toBe(false);
    expect(cartState().total).toBe(150);
  });

  it("removes through Salla's cart", async () => {
    const deleteItem = vi.fn(async () => cartRes([], 0));
    setupSalla(true, { addItem: vi.fn(async () => cartRes([{ id: 11, product_id: 1, quantity: 1, total: 240 }], 240)), deleteItem });
    await addAndStay(dress, { 7: 70 });
    await removeLine(cartState().lines[0].key);
    expect(deleteItem).toHaveBeenCalledWith(11);
    expect(cartState().count).toBe(0);
    expect(cartState().total).toBe(0);
  });

  it("shows a set added through the cart with its own names and prices", async () => {
    setupSalla(true, { details: vi.fn(async () => cartRes([{ id: 41, product_id: 1, quantity: 1 }, { id: 42, product_id: 2, quantity: 2 }], 0)) });
    await noteAdded([{ product: dress, options: { 7: 71 } }, { product: bag, quantity: 2 }]);
    expect(cartState().lines.map((l) => [l.itemId, l.name, l.unit])).toEqual([[41, "فستان سهرة", 260], [42, "شنطة", 150]]);
  });

  it("shows what was already in the cart when the page opens", async () => {
    setupSalla(true, { details: vi.fn(async () => cartRes([{ id: 31, product_id: 2, quantity: 2, total: 300 }], 300)) });
    (window as any).salla = undefined;
    await loadCart();
    expect(cartState().count).toBe(2);
    expect(cartState().lines[0].unit).toBe(150);
  });
});
