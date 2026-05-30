import { Page } from "@playwright/test";

export async function waitForImages(page: Page) {
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll("img")).every((img) => img.complete),
  );
}
