import { beforeEach, describe, expect, it } from "vitest";
import {
  calendarLink, currentSlot, dailySlots, doorDay, storeDayStart, discountPercent, doorState, isUnlocked, offersOpen, phaseAt, pickWeighted, publishSale, sameCode,
  splitCountdown, stickyPick, storeTime, tierProgress, unlock,
} from "../src/utils/sale";

const at = (iso: string) => new Date(iso).getTime();

describe("storeTime and phaseAt", () => {
  it("reads the editor's date as Saudi time", () => {
    expect(storeTime("2026-11-20 18:00")).toBe(at("2026-11-20T15:00:00Z"));
    expect(storeTime("2026-11-20")).toBe(at("2026-11-19T21:00:00Z"));
    expect(storeTime("")).toBeNull();
    expect(storeTime("soon")).toBeNull();
  });
  it("tells before, live and ended", () => {
    const start = at("2026-11-20T15:00:00Z");
    const end = at("2026-11-28T21:00:00Z");
    expect(phaseAt(start - 1, start, end)).toBe("before");
    expect(phaseAt(start, start, end)).toBe("live");
    expect(phaseAt(end, start, end)).toBe("ended");
    expect(phaseAt(0, null, null)).toBe("live");
  });
});

describe("early access", () => {
  beforeEach(() => {
    localStorage.clear();
    delete (window as any).__wfSale;
  });
  it("is open without a hero", () => {
    expect(offersOpen()).toBe(true);
  });
  it("opens before the start only with the right code", () => {
    const start = Date.now() + 86400000;
    publishSale({ start, end: null, earlyCode: "VIP2026" });
    expect(offersOpen()).toBe(false);
    unlock("vip 2026");
    expect(isUnlocked({ start, end: null, earlyCode: "VIP2026" })).toBe(true);
    expect(offersOpen()).toBe(true);
  });
  it("compares codes without case or spaces", () => {
    expect(sameCode("Vip 2026", "vip2026")).toBe(true);
    expect(sameCode("", "")).toBe(false);
  });
});

describe("helpers", () => {
  it("splits a countdown", () => {
    expect(splitCountdown(((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000)).toEqual({ d: 2, h: 3, m: 4, s: 5 });
  });
  it("builds a calendar file", () => {
    const link = decodeURIComponent(calendarLink("الجمعة البيضاء", at("2026-11-20T15:00:00Z"), null, "https://x.sa"));
    expect(link).toContain("DTSTART:20261120T150000Z");
    expect(link).toContain("DTEND:20261120T160000Z");
  });
  it("finds the running and the next slot", () => {
    const slots = [
      { from: 100, to: 200, item: "a" },
      { from: 200, to: 300, item: "b" },
      { from: null, to: 400, item: "bad" },
    ];
    expect(currentSlot(slots, 150)).toEqual({ current: slots[0], next: slots[1] });
    expect(currentSlot(slots, 350).current).toBeNull();
  });
  it("opens only today's door, by store day", () => {
    const now = at("2026-11-24T22:30:00Z"); // 01:30 on the 25th in Riyadh
    expect(doorState(storeTime("2026-11-25"), now)).toBe("today");
    expect(doorState(storeTime("2026-11-24"), now)).toBe("past");
    expect(doorState(storeTime("2026-11-26"), now)).toBe("future");
  });
  it("picks by weight and keeps the visitor's code", () => {
    const codes = [{ code: "A", label: "", weight: 3 }, { code: "B", label: "", weight: 1 }];
    expect(pickWeighted(codes, 0.5)?.code).toBe("A");
    expect(pickWeighted(codes, 0.9)?.code).toBe("B");
    expect(pickWeighted([], 0.5)).toBeNull();
    localStorage.clear();
    expect(stickyPick("k", codes, 0.9)?.code).toBe("B");
    expect(stickyPick("k", codes, 0.1)?.code).toBe("B");
  });
  it("measures tier progress", () => {
    const tiers = [{ amount: 500, reward: "15%" }, { amount: 300, reward: "10%" }, { amount: 800, reward: "هدية" }];
    expect(tierProgress(350, tiers)).toEqual({ reached: 1, next: tiers[0], left: 150, percent: 44 });
    expect(tierProgress(900, tiers).next).toBeNull();
  });
  it("computes an honest discount", () => {
    expect(discountPercent({ price: 70, regular_price: 100 })).toBe(30);
    expect(discountPercent({ price: 100, regular_price: 100 })).toBe(0);
    expect(discountPercent({ price: 100 })).toBe(0);
  });
});


describe("daily schedules", () => {
  it("turns hour slots into today's and tomorrow's times", () => {
    const now = at("2026-11-21T08:00:00Z"); // 11:00 in Riyadh
    const slots = dailySlots([{ fromHour: 9, toHour: 12, item: "a" }, { fromHour: 12, toHour: 15, item: "b" }], now);
    const { current, next } = currentSlot(slots, now);
    expect(current?.item).toBe("a");
    expect(next?.item).toBe("b");
    expect(new Date(current!.to!).toISOString()).toBe("2026-11-21T09:00:00.000Z");
  });
  it("wraps to tomorrow's first slot after the last one", () => {
    const now = at("2026-11-21T20:00:00Z"); // 23:00 in Riyadh
    const { current, next } = currentSlot(dailySlots([{ fromHour: 9, toHour: 12, item: "a" }], now), now);
    expect(current).toBeNull();
    expect(new Date(next!.from!).toISOString()).toBe("2026-11-22T06:00:00.000Z");
  });
  it("counts doors from the sale's first day", () => {
    const start = at("2026-11-20T15:00:00Z");
    expect(storeDayStart(start)).toBe(at("2026-11-19T21:00:00Z"));
    expect(doorDay(start, 2)).toBe(at("2026-11-21T21:00:00Z"));
  });
});
