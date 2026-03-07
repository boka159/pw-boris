import { test, expect } from "@playwright/test";
import { CATEGORIES } from "../../testData";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle(/STORE/);
});

test("has nav logo and links", async ({ page }) => {
  await expect.soft(page.locator(".navbar-brand")).toHaveText("PRODUCT STORE");
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
  await expect.soft(page.locator(".card").first()).toBeVisible();
  const count = await page.locator(".card").count();

  await expect(count).toEqual(9);
});

test("has card title and price", async ({ page }) => {
  await expect.soft(page.locator(".card").first()).toBeVisible();

  const cardCount = await page.locator(".card-block").count();
  await expect.soft(page.locator(".card-title")).toHaveCount(cardCount);
  await expect
    .soft(page.locator(".card-block h5", { hasText: "$" }))
    .toHaveCount(cardCount);
  await expect(page.locator(".card-text")).toHaveCount(cardCount);
});

test("phones filter shows only phones", async ({ page }) => {
  await page.locator(".list-group-item", { hasText: "Phones" }).click();
  await expect(page.locator(".card")).toContainText(CATEGORIES.phones);
  await expect(page.locator(".card")).not.toContainText([
    ...CATEGORIES.monitors,
    ...CATEGORIES.laptops,
  ]);
});

test("laptops filter shows only laptops", async ({ page }) => {
  await page.locator(".list-group-item", { hasText: "Laptops" }).click();
  await expect(page.locator(".card")).toContainText(CATEGORIES.laptops);
  await expect(page.locator(".card")).not.toContainText([
    ...CATEGORIES.monitors,
    ...CATEGORIES.phones,
  ]);
});

test("monitors filter shows only monitors", async ({ page }) => {
  await page.locator(".list-group-item", { hasText: "Monitors" }).click();
  await expect(page.locator(".card")).toContainText(CATEGORIES.monitors);
  await expect(page.locator(".card")).not.toContainText([
    ...CATEGORIES.phones,
    ...CATEGORIES.laptops,
  ]);
});

test("product card leads to product page", async ({ page }) => {
  const productTitle = await page.locator(".card-title").first().innerText();
  await page.locator(".card-img-top").first().click();

  await expect(page.locator(".name")).toHaveText(productTitle);
});

test("has working pagination", async ({ page }) => {
  await expect.soft(page.locator(".card").first()).toBeVisible();
  const pageOneProduct = await page.locator(".card-title").last().innerText();

  await page.locator(".page-item #next2", { hasText: "Next" }).click();
  await expect(page.locator(".card-title").last()).not.toHaveText(
    pageOneProduct,
  );

  await page.locator(".page-item #prev2", { hasText: "Previous" }).click();
  await expect(page.locator(".card-title")).toContainText([pageOneProduct]);
});
