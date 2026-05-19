import { Locator, Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly name: Locator;
  readonly price: Locator;
  readonly description: Locator;
  readonly image: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.locator(".name");
    this.price = page.locator(".price-container", { hasText: "$" });
    this.description = page.locator("#more-information", {
      hasText: "Product description",
    });
    this.image = page.locator("#imgp img");
    this.addToCartButton = page
      .locator("html")
      .getByRole("link", { name: "Add to cart" });
  }
}
