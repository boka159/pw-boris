import { test, expect } from "../../fixtures";
import { CATEGORIES } from "../../testData";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/STORE/);
  });

  test("has nav logo and links", async ({ page, homepage }) => {
    await expect.soft(homepage.logo).toHaveText("PRODUCT STORE");
    await expect(page.locator("#navbarExample a")).toContainText([
      "Home",
      "Contact",
      "About us",
      "Cart",
      "Log in",
      "Sign up",
    ]);
  });

  test("has products", async ({ homepage }) => {
    await expect.soft(homepage.cards.first()).toBeVisible();
    const count = await homepage.cards.count();

    await expect(count).toEqual(9);
  });

  test("has card title and price", async ({ page, homepage }) => {
    await expect.soft(homepage.cards.first()).toBeVisible();

    const cardCount = await page.locator(".card-block").count();
    await expect.soft(homepage.cardTitles).toHaveCount(cardCount);
    await expect
      .soft(page.locator(".card-block h5", { hasText: "$" }))
      .toHaveCount(cardCount);
    await expect(page.locator(".card-text")).toHaveCount(cardCount);
  });

  test("phones filter shows only phones", async ({ homepage }) => {
    await homepage.phonesFilter.click();
    await expect(homepage.cards).toContainText(CATEGORIES.phones);
    await expect(homepage.cards).not.toContainText([
      ...CATEGORIES.monitors,
      ...CATEGORIES.laptops,
    ]);
  });

  test("laptops filter shows only laptops", async ({ homepage }) => {
    await homepage.laptopsFilter.click();
    await expect(homepage.cards).toContainText(CATEGORIES.laptops);
    await expect(homepage.cards).not.toContainText([
      ...CATEGORIES.monitors,
      ...CATEGORIES.phones,
    ]);
  });

  test("monitors filter shows only monitors", async ({ homepage }) => {
    await homepage.monitorsFilter.click();
    await expect(homepage.cards).toContainText(CATEGORIES.monitors);
    await expect(homepage.cards).not.toContainText([
      ...CATEGORIES.phones,
      ...CATEGORIES.laptops,
    ]);
  });

  test("product card leads to product page", async ({ page, homepage }) => {
    const productTitle = await homepage.cardTitles.first().innerText();
    await page.locator(".card-img-top").first().click();

    await expect(page.locator(".name")).toHaveText(productTitle);
  });

  test("has working pagination", async ({ homepage }) => {
    await expect.soft(homepage.cards.first()).toBeVisible();
    const pageOneProduct = await homepage.cardTitles.last().innerText();

    await homepage.nextButton.click();
    await expect(homepage.cardTitles.last()).not.toHaveText(pageOneProduct);

    await homepage.prevButton.click();
    await expect(homepage.cardTitles).toContainText([pageOneProduct]);
  });

  test("footer has necessary elements", async ({ page }) => {
    await expect
      .soft(page.locator(".caption h4", { hasText: "About Us" }))
      .toBeVisible();
    await expect
      .soft(page.locator(".caption h4", { hasText: "Get in Touch" }))
      .toBeVisible();
    await expect
      .soft(page.locator("html").getByText("Address: 2390 El Camino Real"))
      .toBeVisible();
    await expect
      .soft(page.locator("html").getByText("Phone: +440 123456"))
      .toBeVisible();
    await expect
      .soft(page.locator("html").getByText("Email: demo@blazemeter.com"))
      .toBeVisible();
    await expect(
      page.locator("html").getByRole("heading", { name: "PRODUCT STORE" }),
    ).toBeVisible();
  });
});
