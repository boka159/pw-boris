import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly placeOrderButton: Locator;
  readonly productsHeading: Locator;
  readonly totalHeading: Locator;
  readonly table: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderButton = page
      .locator("html")
      .getByRole("button", { name: "Place Order" });
    this.productsHeading = page.locator("h2", { hasText: "Products" });
    this.totalHeading = page.locator("h2", { hasText: "Total" });
    this.table = page.locator(".table-responsive");
    this.deleteButton = page
      .locator("html")
      .getByRole("link", { name: "Delete" });
  }
}
