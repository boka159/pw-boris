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

test("has working filters", async ({ page }) => {
  await expect(page.locator(".list-group-item")).toContainText([
    "CATEGORIES",
    "Phones",
    "Laptops",
    "Monitors",
  ]);

  await page.locator(".card").first().waitFor();
  const totalCount = await page.locator(".card-block").count();
  console.log(totalCount);

  await page.locator(".list-group-item", { hasText: "Phones" }).click();
  await expect(page.locator(".card")).not.toHaveCount(totalCount);

  const filterCount = await page.locator(".card-block").count();
  console.log(filterCount);

  expect(filterCount).toBeLessThan(totalCount);
});

test("product card leads to product page", async ({ page }) => {
  const productTitle = await page.locator(".card-title").first().innerText();
  await page.locator(".card-img-top").first().click();

  await expect(page.locator(".name")).toHaveText(productTitle);
});

test.only("has working pagination", async ({ page }) => {
  await page.locator(".card").first().waitFor();
  const pageOneProduct = await page.locator(".card-title").last().innerText();
  console.log(pageOneProduct);

  await page.locator(".page-item #next2", { hasText: "Next" }).click();
  await expect(page.locator(".card-title").last()).not.toHaveText(
    pageOneProduct,
  );

  await page.locator(".card").first().waitFor();
  await page.locator(".page-item #prev2", { hasText: "Previous" }).click();

  await expect(page.locator(".card-title")).toContainText([pageOneProduct]);
});
