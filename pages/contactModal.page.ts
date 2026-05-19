import { Locator, Page } from "@playwright/test";

export class ContactModal {
  readonly page: Page;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page
      .locator("html")
      .getByRole("heading", { name: "New message" });
    this.emailInput = page.locator("#recipient-email");
    this.nameInput = page.locator("#recipient-name");
    this.messageInput = page.locator("#message-text");
    this.sendButton = page
      .locator("html")
      .getByRole("button", { name: "Send message" });
  }

  async sendMessage(email: string, name: string, message: string) {
    await this.emailInput.fill(email);
    await this.nameInput.fill(name);
    await this.messageInput.fill(message);
    await this.sendButton.click();
  }
}
