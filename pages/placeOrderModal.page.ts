import { Locator, Page } from "@playwright/test";

export class PlaceOrderModal {
  readonly page: Page;
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly countryInput: Locator;
  readonly cityInput: Locator;
  readonly cardInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly purchaseButton: Locator;
  readonly successMessage: Locator;
  readonly okButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page
      .locator("html")
      .getByRole("heading", { name: "Place order" });
    this.nameInput = page.locator("#name");
    this.countryInput = page.locator("#country");
    this.cityInput = page.locator("#city");
    this.cardInput = page.locator("#card");
    this.monthInput = page.locator("#month");
    this.yearInput = page.locator("#year");
    this.purchaseButton = page
      .locator("html")
      .getByRole("button", { name: "Purchase" });
    this.successMessage = page.locator(".sweet-alert h2", {
      hasText: "Thank you for your purchase!",
    });
    this.okButton = page.locator("html").getByRole("button", { name: "OK" });
  }

  async fillOrder(
    name: string,
    country: string,
    city: string,
    card: string,
    month: string,
    year: string,
  ) {
    await this.nameInput.fill(name);
    await this.countryInput.fill(country);
    await this.cityInput.fill(city);
    await this.cardInput.fill(card);
    await this.monthInput.fill(month);
    await this.yearInput.fill(year);
    await this.purchaseButton.click();
  }
}
