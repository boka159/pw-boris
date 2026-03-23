import { test, expect } from "@playwright/test";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { login } from "../../helpers/login";
import { CREDENTIALS, BUYER } from "../../testData";

test.describe("empty cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await login(page, CREDENTIALS.username, CREDENTIALS.password);

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
  let productTitle: string;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await login(page, CREDENTIALS.username, CREDENTIALS.password);

    await page.goto("/prod.html?idp_=1");
    productTitle = await page.locator(".name").innerText();

    await page
      .locator("html")
      .getByRole("link", { name: "Add to cart" })
      .click();
    await page.goto("/cart.html");
  });

  test("added product is visible in cart", async ({ page }) => {
    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).toBeVisible();
  });

  test("Delete removes product from cart", async ({ page }) => {
    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).toBeVisible();

    await page
      .locator("html")
      .getByRole("link", { name: "Delete" })
      .first()
      .click();

    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).not.toBeVisible();
  });

  test("Total price shows correctly", async ({ page }) => {
    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).toBeVisible();

    const productPrice = await page
      .locator("html")
      .getByRole("cell")
      .nth(2)
      .innerText();

    await expect(
      page.locator("html").getByRole("heading", { name: productPrice }),
    ).toBeVisible();
  });

  test("places order successfully", async ({ page }) => {
    await page
      .locator("html")
      .getByRole("button", { name: "Place Order" })
      .click();

    await expect
      .soft(page.locator("html").getByRole("heading", { name: "Place order" }))
      .toBeVisible();

    await page.locator("#name").fill(BUYER.name);
    await page.locator("#country").fill(BUYER.country);
    await page.locator("#city").fill(BUYER.city);
    await page.locator("#card").fill(BUYER.card);
    await page.locator("#month").fill(BUYER.month);
    await page.locator("#year").fill(BUYER.year);

    await page
      .locator("html")
      .getByRole("button", { name: "Purchase" })
      .click();

    await expect(
      page.locator(".sweet-alert h2", {
        hasText: "Thank you for your purchase!",
      }),
    ).toBeVisible;
    await page.locator("html").getByRole("button", { name: "OK" }).click();
  });

  test("mandatory empty fields return error", async ({ page }) => {
    await page
      .locator("html")
      .getByRole("button", { name: "Place Order" })
      .click();

    await expect
      .soft(page.locator("html").getByRole("heading", { name: "Place order" }))
      .toBeVisible();

    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Please fill out Name and Creditcard.");
      await dialog.accept();
    });

    await page
      .locator("html")
      .getByRole("button", { name: "Purchase" })
      .click();
  });
});
