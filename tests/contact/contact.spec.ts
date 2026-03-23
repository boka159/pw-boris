import { test, expect } from "@playwright/test";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator("#navbarExample a", { hasText: "Contact" }).click();
});

test("has necessary elements", async ({ page }) => {
  await expect(
    page.locator("html").getByRole("heading", { name: "New message" }),
  ).toBeVisible();

  await expect(page.locator(".form-control-label")).toContainText([
    "Contact Email:",
    "Contact Name:",
    "Message:",
  ]);

  await expect(
    page.locator("#recipient-email, #recipient-name, #message-text"),
  ).toHaveCount(3);

  await expect(
    page.locator("html").getByRole("button", { name: "Send message" }),
  ).toBeVisible();
});

test("sends message sucessfully", async ({ page }) => {
  await page.locator("#recipient-email").fill("test+1@test.test");
  await page.locator("#recipient-name").fill("Boris");
  await page.locator("#message-text").fill("Test message one two three");

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Thanks for the message!!");
    await dialog.accept();
  });

  await page
    .locator("html")
    .getByRole("button", { name: "Send message" })
    .click();
});

test("click on X closes the modal", async ({ page }) => {
  await closeModalOnX(page, "New message");

  await expect(
    page.locator(".modal-header h5", { hasText: "New message" }),
  ).not.toBeVisible();
});

test("click on Close closes the modal", async ({ page }) => {
  await closeModalOnButton(page, "New message");

  await expect(
    page.locator(".modal-header h5", { hasText: "New message" }),
  ).not.toBeVisible();
});
