import { Locator, Page } from "@playwright/test";

export class NavBar {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator("#login2");
    this.signUpButton = page.locator("#signin2");
  }

  async clickOnLogIn() {
    await this.loginButton.click();
  }
  async clickOnSignUp() {
    await this.signUpButton.click();
  }
}
