import { Locator, Page } from "@playwright/test";

export class NavBar {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;
  readonly logoutButton: Locator;
  readonly contactButton: Locator;
  readonly aboutUsButton: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator("#login2");
    this.signUpButton = page.locator("#signin2");
    this.logoutButton = page.locator("#logout2");
    this.contactButton = page.locator("#navbarExample a", {
      hasText: "Contact",
    });
    this.aboutUsButton = page.locator("#navbarExample a", {
      hasText: "About us",
    });
    this.cartButton = page.locator("#navbarExample a", {
      hasText: "Cart",
    });
  }


}
