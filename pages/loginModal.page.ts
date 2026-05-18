import { Locator, Page } from "@playwright/test";

export class LoginModal {
  readonly page: Page;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator(".modal-header h5", { hasText: "Log in" });
    this.usernameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.loginButton = page
      .locator("html")
      .getByRole("button", { name: "Log in" });
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
