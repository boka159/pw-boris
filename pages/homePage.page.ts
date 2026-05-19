import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly cards: Locator;
  readonly cardTitles: Locator;
  readonly phonesFilter: Locator;
  readonly laptopsFilter: Locator;
  readonly monitorsFilter: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator(".navbar-brand");
    this.cards = page.locator(".card");
    this.cardTitles = page.locator(".card-title");
    this.phonesFilter = page.locator(".list-group-item", { hasText: "Phones" });
    this.laptopsFilter = page.locator(".list-group-item", {
      hasText: "Laptops",
    });
    this.monitorsFilter = page.locator(".list-group-item", {
      hasText: "Monitors",
    });
    this.nextButton = page.locator(".page-item #next2", { hasText: "Next" });
    this.prevButton = page.locator(".page-item #prev2", {
      hasText: "Previous",
    });
  }
}
