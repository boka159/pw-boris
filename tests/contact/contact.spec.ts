import { test, expect } from "../../fixtures";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { CONTACT } from "../../testData";
import { expectDialog } from "../../helpers/dialog";

test.describe("Contact modal", () => {
  test.beforeEach(async ({ page, navbar }) => {
    await page.goto("/");
    await navbar.contactButton.click();
  });

  test("has necessary elements", async ({ page, contactModal }) => {
    await expect(contactModal.heading).toBeVisible();

    await expect(page.locator(".form-control-label")).toContainText([
      "Contact Email:",
      "Contact Name:",
      "Message:",
    ]);

    await expect(contactModal.emailInput).toBeVisible();
    await expect(contactModal.nameInput).toBeVisible();
    await expect(contactModal.messageInput).toBeVisible();
  });

  test("sends message successfully", async ({ page, contactModal }) => {
    expectDialog(page, "Thanks for the message!!");
    await contactModal.sendMessage(
      CONTACT.email,
      CONTACT.name,
      CONTACT.message,
    );

    await expect(contactModal.heading).not.toBeVisible();
  });

  test("click on X closes the modal", async ({ page, contactModal }) => {
    await closeModalOnX(page, "New message");

    await expect(contactModal.heading).not.toBeVisible();
  });

  test("click on Close closes the modal", async ({ page, contactModal }) => {
    await closeModalOnButton(page, "New message");

    await expect(contactModal.heading).not.toBeVisible();
  });
});
