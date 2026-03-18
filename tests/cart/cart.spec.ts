import { test, expect } from "@playwright/test";
import { addToCart, closeModalOnButton, closeModalOnX } from "../../helpers";

test.describe("empty cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/cart.html");
  });

  test("page has necessary elements", async ({ page }) => {
    await expect
      .soft(page.locator("html").getByRole("navigation"))
      .toBeVisible();
    await expect
      .soft(page.locator("h2", { hasText: "Products" }))
      .toBeVisible();
    await expect.soft(page.locator(".table-responsive")).toBeVisible();
    await expect.soft(page.locator("h2", { hasText: "Total" })).toBeVisible();
    await expect(
      page.locator("html").getByRole("button", { name: "Place Order" }),
    ).toBeVisible();
  });

  test("Place order opens modal with necessary elements", async ({ page }) => {
    await page
      .locator("html")
      .getByRole("button", { name: "Place Order" })
      .click();

    await expect
      .soft(page.locator("html").getByRole("heading", { name: "Place order" }))
      .toBeVisible();

    await expect
      .soft(
        page
          .locator("html")
          .getByRole("dialog", { name: "Place order" })
          .getByLabel("Close"),
      )
      .toBeVisible();
    await expect.soft(page.locator("html").getByText("Total:")).toBeVisible();
    await expect(page.locator(".form-control-label")).toContainText([
      "Name:",
      "Country:",
      "City:",
      "Credit card:",
      "Month:",
      "Year:",
    ]);

    await expect(
      page.locator("#name, #country, #city, #card, #month, #year"),
    ).toHaveCount(6);
  });

  test("click on X closes modal", async ({ page }) => {
    await page
      .locator("html")
      .getByRole("button", { name: "Place Order" })
      .click();

    await closeModalOnX(page, "Place order");

    await expect(
      page.locator("html").getByRole("heading", { name: "Place order" }),
    ).not.toBeVisible();
  });

  test("click on Close closes modal", async ({ page }) => {
    await page
      .locator("html")
      .getByRole("button", { name: "Place Order" })
      .click();

    await closeModalOnButton(page, "Place order");

    await expect(
      page.locator("html").getByRole("heading", { name: "Place order" }),
    ).not.toBeVisible();
  });
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
