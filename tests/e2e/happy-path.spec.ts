import { test, expect } from "@playwright/test";

test.describe("Parcours achat", () => {
  test("accès page produit", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Sublimez votre intérieur/ })).toBeVisible();
    await page.getByRole("link", { name: "Personnaliser" }).click();
    await expect(page.getByRole("heading", { name: "Housse de coussin terracotta" })).toBeVisible();
  });
});
