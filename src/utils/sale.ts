// The sale's clock: its dates in the store's time zone, which phase the page is in, and early access.

export type Phase = "before" | "live" | "ended";
export type SaleInfo = { start: number | null; end: number | null; earlyCode: string };

const HOUR = 3600000;

/**
 * "2026-11-20 18:00" (the editor's format) or ISO, read as the store's local time.
 * Returns epoch ms, or null for anything unreadable.
 */
export function storeTime(value: unknown, tzOffset = 3): number | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}))?/.exec(value.trim());
  if (!m) return null;
  const [, y, mo, d, h = "0", mi = "0"] = m;
  const utc = Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi));
  return Number.isNaN(utc) ? null : utc - tzOffset * HOUR;
}

export function phaseAt(now: number, start: number | null, end: number | null): Phase {
  if (start !== null && now < start) return "before";
  if (end !== null && now >= end) return "ended";
  return "live";
}

// The hero owns the dates; other sections read them from here, so one change in the hero moves the whole page
const KEY = "__wfSale";
const EARLY_KEY = "wf-early";

export function publishSale(info: SaleInfo): void {
  (window as any)[KEY] = info;
  window.dispatchEvent(new CustomEvent("wf:sale", { detail: info }));
}

export function readSale(): SaleInfo | null {
  return ((window as any)[KEY] as SaleInfo) || null;
}

/** Codes match without case or spaces, so "VIP 2026" and "vip2026" both open early access. */
export function sameCode(a: unknown, b: unknown): boolean {
  const norm = (v: unknown) => String(v ?? "").replace(/\s+/g, "").toLowerCase();
  return Boolean(norm(a)) && norm(a) === norm(b);
}

export function isUnlocked(info: SaleInfo | null): boolean {
  if (!info?.earlyCode) return false;
  try {
    return sameCode(localStorage.getItem(EARLY_KEY), info.earlyCode);
  } catch {
    return false;
  }
}

export function unlock(code: string): void {
  try {
    localStorage.setItem(EARLY_KEY, code);
  } catch {
    // storage blocked: the page still opens for this visit
  }
  window.dispatchEvent(new CustomEvent("wf:sale", { detail: readSale() }));
}

/** Whether sale offers show now: during the sale, or before it for early access. Without a hero the page is always live. */
export function offersOpen(now = Date.now(), info = readSale(), unlocked = isUnlocked(info)): boolean {
  if (!info) return true;
  const phase = phaseAt(now, info.start, info.end);
  return phase === "live" || (phase === "before" && unlocked);
}

export function splitCountdown(ms: number): { d: number; h: number; m: number; s: number } {
  const total = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(total / 86400), h: Math.floor((total % 86400) / 3600), m: Math.floor((total % 3600) / 60), s: total % 60 };
}

/** A calendar file for "remind me", as a data link the browser downloads or opens in the calendar app. */
export function calendarLink(title: string, start: number, end: number | null, url: string): string {
  const stamp = (t: number) => new Date(t).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//white-friday//landing//AR", "BEGIN:VEVENT",
    `UID:${start}-white-friday`, `DTSTAMP:${stamp(start)}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end ?? start + HOUR)}`,
    `SUMMARY:${title.replace(/[,;\n]/g, " ")}`, `URL:${url}`,
    "BEGIN:VALARM", "TRIGGER:-PT30M", "ACTION:DISPLAY", `DESCRIPTION:${title.replace(/[,;\n]/g, " ")}`, "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}

export type Slot<T> = { from: number | null; to: number | null; item: T };

/** The slot running now and the next one to start; slots without a valid time are skipped. */
export function currentSlot<T>(slots: Slot<T>[], now: number): { current: Slot<T> | null; next: Slot<T> | null } {
  const valid = slots.filter((s) => s.from !== null && s.to !== null && s.to > s.from).sort((a, b) => a.from! - b.from!);
  return {
    current: valid.find((s) => now >= s.from! && now < s.to!) || null,
    next: valid.find((s) => s.from! > now) || null,
  };
}

export type DoorState = "past" | "today" | "future";

/** Each door belongs to one store-local day; only today's opens. */
export function doorState(day: number | null, now: number, tzOffset = 3): DoorState | null {
  if (day === null) return null;
  const local = (t: number) => Math.floor((t + tzOffset * HOUR) / 86400000);
  const diff = local(day) - local(now);
  return diff < 0 ? "past" : diff === 0 ? "today" : "future";
}

export type Code = { code: string; label: string; weight: number };

/** A code picked by its weight; rand is in [0, 1). */
export function pickWeighted(codes: Code[], rand: number): Code | null {
  const valid = codes.filter((c) => c.code && c.weight > 0);
  const total = valid.reduce((sum, c) => sum + c.weight, 0);
  if (!total) return null;
  let at = rand * total;
  for (const c of valid) {
    if (at < c.weight) return c;
    at -= c.weight;
  }
  return valid[valid.length - 1];
}

/** The code this visitor got before, so reloading never rolls again; a removed code rolls once more. */
export function stickyPick(key: string, codes: Code[], rand = Math.random()): Code | null {
  try {
    const saved = localStorage.getItem(key);
    const found = codes.find((c) => c.code === saved);
    if (found) return found;
  } catch {
    // no storage: a fresh pick for this visit
  }
  const pick = pickWeighted(codes, rand);
  try {
    if (pick) localStorage.setItem(key, pick.code);
  } catch {
    // ignore
  }
  return pick;
}

export type Tier = { amount: number; reward: string };

/** Which tiers the cart reached, the next one, and how much is left to reach it. */
export function tierProgress(total: number, tiers: Tier[]): { reached: number; next: Tier | null; left: number; percent: number } {
  const sorted = tiers.filter((t) => t.amount > 0 && t.reward).sort((a, b) => a.amount - b.amount);
  const reached = sorted.filter((t) => total >= t.amount).length;
  const next = sorted[reached] || null;
  const top = sorted.length ? sorted[sorted.length - 1].amount : 0;
  return {
    reached,
    next,
    left: next ? Math.max(0, Math.round((next.amount - total) * 100) / 100) : 0,
    percent: top ? Math.min(100, Math.round((total / top) * 100)) : 0,
  };
}

/** Percent off between the regular and the sale price, or 0 when there is no real discount. */
export function discountPercent(product: any): number {
  const regular = Number(product?.regular_price) || 0;
  const price = Number(product?.sale_price || product?.price) || 0;
  if (!(regular > price && price > 0)) return 0;
  return Math.round(((regular - price) / regular) * 100);
}

const DAY = 86400000;

/** Start of the store-local day holding t, as epoch ms. */
export function storeDayStart(t: number, tzOffset = 3): number {
  return Math.floor((t + tzOffset * HOUR) / DAY) * DAY - tzOffset * HOUR;
}

export type DailySlot<T> = { fromHour: number; toHour: number; item: T };

/**
 * Daily hour slots (9 to 12, 12 to 15...) turned into today's and tomorrow's real times, so the running slot
 * and the next one can be found with currentSlot.
 */
export function dailySlots<T>(slots: DailySlot<T>[], now: number, tzOffset = 3): Slot<T>[] {
  const today = storeDayStart(now, tzOffset);
  const valid = slots.filter((s) => s.fromHour >= 0 && s.toHour <= 24 && s.toHour > s.fromHour);
  return [today, today + DAY].flatMap((day) => valid.map((s) => ({ from: day + s.fromHour * HOUR, to: day + s.toHour * HOUR, item: s.item })));
}

/** Door n (from 0) opens on the n-th store-local day after the sale starts. */
export function doorDay(start: number, index: number, tzOffset = 3): number {
  return storeDayStart(start, tzOffset) + index * DAY;
}
