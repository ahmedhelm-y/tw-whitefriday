import { describe, expect, it, vi } from "vitest";
import { addAndStay, resetCart } from "../src/utils/cart";
import { ensureDrawer, openDrawer, publishTiers } from "../src/utils/drawer";

describe("side cart", () => {
  it("lists what was added, the next reward and the total, and closes on Escape", async () => {
    resetCart();
    (window as any).Salla = { config: { get: () => false }, cart: { api: { addItem: vi.fn() } } };
    ensureDrawer();
    publishTiers([{ amount: 500, reward: "خصم 15%" }]);
    await addAndStay({ id: 1, name: "فستان", price: 300 });
    const host = document.querySelector(".wf-cd")!;
    expect(host.querySelector(".wf-cd__fab b")?.textContent).toBe("1");
    openDrawer();
    expect(host.classList.contains("is-open")).toBe(true);
    expect(host.querySelectorAll(".wf-cd__line")).toHaveLength(1);
    expect(host.querySelector(".wf-cd__tier")?.textContent).toContain("خصم 15%");
    expect(host.querySelector(".wf-cd__note")).not.toBeNull();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(host.classList.contains("is-open")).toBe(false);
    host.querySelector<HTMLButtonElement>(".wf-cd__fab")!.click();
    host.querySelector<HTMLButtonElement>(".wf-cd__del")!.click();
    await Promise.resolve();
    expect(host.querySelectorAll(".wf-cd__line")).toHaveLength(0);
  });
});
