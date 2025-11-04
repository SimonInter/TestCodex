import { describe, expect, it } from "vitest";
import { formatPrice } from "@/lib/utils";

describe("formatPrice", () => {
  it("formate en euros", () => {
    expect(formatPrice(1234)).toBe("12,34 €");
  });
});
