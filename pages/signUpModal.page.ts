import { Locator, Page } from "@playwright/test";

export class SignUpModal {
  readonly page: Page;
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator(".modal-header h5", { hasText: "Sign up" });
    this.usernameInput = page.locator("#sign-username");
    this.passwordInput = page.locator("#sign-password");
    this.signUpButton = page
      .locator("html")
      .getByRole("button", { name: "Sign up" });
  }

  async signUp(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }
}
