import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/prod.html?idp_=1");
});

test("product page has necessary elements ", async ({ page }) => {
  await expect(page.locator(".name")).toBeVisible();
  await expect(
    page.locator(".price-container", { hasText: "$" }),
  ).toBeVisible();
  await expect(
    page.locator("#more-information", { hasText: "Product description" }),
  ).toBeVisible();
  await expect(
    page.locator("html").getByRole("link", { name: "Add to cart" }),
  ).toBeVisible();
  await expect(page.locator("#imgp img")).toBeVisible();
});

test("successfully adds product to cart ", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Product added");
    await dialog.accept();
  });

  await page.locator("html").getByRole("link", { name: "Add to cart" }).click();
});
