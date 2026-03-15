import { test, expect } from "@playwright/test";
import { addToCart } from "../../helpers";

test.describe("empty cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cart.html");
  });

  test("page has neccessary elements", async ({ page }) => {});
  test("Place order opens modal with necessary elements", async ({
    page,
  }) => {});
  test("click on X closes modal", async ({ page }) => {});
  test("click on Close closes modal", async ({ page }) => {});
});

test.describe("cart has items", () => {
  test.beforeEach(async ({ page }) => {
    await addToCart(page);
    await page.goto("/cart.html");
  });
  test("added products are visible in cart", async ({ page }) => {});
  test("Delete removes product from cart", async ({ page }) => {});
  test("Total price shows correctly", async ({ page }) => {});
  test("places order successfully", async ({ page }) => {});
  test("mandatory empty fields return error", async ({ page }) => {});
});
