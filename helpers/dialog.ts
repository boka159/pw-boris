import { Page, expect } from "@playwright/test";

export function expectDialog(page: Page, message: string) {
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe(message);
    await dialog.accept();
  });
}
