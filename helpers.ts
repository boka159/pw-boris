import { Page } from "@playwright/test";
import { CREDENTIALS } from "./testData";

export async function login(page: Page) {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await page.locator("#loginusername").fill(CREDENTIALS.username);
  await page.locator("#loginpassword").fill(CREDENTIALS.password);
  await page.locator("html").getByRole("button", { name: "Log in" }).click();
}
