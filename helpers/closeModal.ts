import { Page } from "@playwright/test";

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
