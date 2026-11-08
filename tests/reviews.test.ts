import { describe, expect, it } from "vitest";
import { averageRate, initials, starValue } from "../src/components/sale-reviews/index";

describe("reviews", () => {
  it("rounds ratings to half stars between 1 and 5, and treats empty as 5", () => {
    expect(starValue(4.3)).toBe(4.5);
    expect(starValue(9)).toBe(5);
    expect(starValue(0.2)).toBe(1);
    expect(starValue(0)).toBe(5);
    expect(starValue("")).toBe(5);
    expect(starValue(1)).toBe(1);
  });

  it("averages to one decimal", () => {
    expect(averageRate([5, 5, 4])).toBe(4.7);
    expect(averageRate([])).toBe(0);
  });

  it("takes the first letters of up to two words", () => {
    expect(initials("نورة العتيبي")).toBe("نا");
    expect(initials("  Sarah  ")).toBe("S");
  });
});
