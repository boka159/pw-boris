import { test, expect } from "@playwright/test";
import { expectDialog } from "../../helpers/dialog";
import { ProductPage } from "../../pages/productPage.page";

test.describe("Product", async () => {
  let product: ProductPage;

  test.beforeEach(async ({ page }) => {
    product = new ProductPage(page);

    await page.goto("/prod.html?idp_=1");
  });

  test("product page has necessary elements ", async ({ page }) => {
    await expect(product.name).toBeVisible();
    await expect(product.price).toBeVisible();
    await expect(product.description).toBeVisible();
    await expect(product.addToCartButton).toBeVisible();
    await expect(product.image).toBeVisible();
  });

  test("successfully adds product to cart ", async ({ page }) => {
    expectDialog(page, "Product added");

    await product.addToCartButton.click();
  });
});
