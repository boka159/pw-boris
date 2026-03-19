import { Page } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await page.locator("#loginusername").fill(username);
  await page.locator("#loginpassword").fill(password);
  await page.locator("html").getByRole("button", { name: "Log in" }).click();
}
