import { Page } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await page.locator("#loginusername").fill(username);
  await page.locator("#loginpassword").fill(password);
  await page.locator("html").getByRole("button", { name: "Log in" }).click();
}

export async function addToCart(page: Page) {
  await page.goto("/prod.html?idp_=1");
  await page.locator("html").getByRole("link", { name: "Add to cart" }).click();
}

export async function closeModalOnButton(page: Page, modalName: string) {
  await page
    .locator("html")
    .getByRole("dialog", { name: modalName })
    .getByText("Close")
    .click();
}

export async function closeModalOnX(page: Page, modalName: string) {
  await page
    .locator("html")
    .getByRole("dialog", { name: modalName })
    .getByLabel("Close")
    .click();
}
