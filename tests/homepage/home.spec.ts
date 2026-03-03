import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/STORE/);
});

test("has nav logo and links", async ({ page }) => {
  await expect(page.locator(".navbar-brand")).toHaveText("PRODUCT STORE");
  await expect(page.locator("#navbarExample a")).toContainText([
    "Home",
    "Contact",
    "About us",
    "Cart",
    "Log in",
    "Sign up",
  ]);
});

test("has products", async ({ page }) => {
  await page.locator(".card").first().waitFor();
  const count = await page.locator(".card").count();

  await expect(count).toBeGreaterThan(0);
});

test("has card title and price", async ({ page }) => {
  await page.locator(".card").first().waitFor();

  const cardCount = await page.locator(".card-block").count();
  console.log(cardCount);
  await expect(page.locator(".card-title")).toHaveCount(cardCount);
  await expect(page.locator(".card-block h5", { hasText: "$" })).toHaveCount(
    cardCount,
  );
  await expect(page.locator(".card-text")).toHaveCount(cardCount);
});
