import { test, expect } from "@playwright/test";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { CONTACT } from "../../testData";
import { expectDialog } from "../../helpers/dialog";
import { NavBar } from "../../pages/navbar.page";
import { ContactModal } from "../../pages/contactModal.page";

test.describe("NavBar", () => {
  let navbar: NavBar;
  let contactModal: ContactModal;

  test.beforeEach(async ({ page }) => {
    navbar = new NavBar(page);
    contactModal = new ContactModal(page);

    await page.goto("/");
    await navbar.contactButton.click();
  });

  test("has necessary elements", async ({ page }) => {
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

  test("sends message successfully", async ({ page }) => {
    expectDialog(page, "Thanks for the message!!");
    await contactModal.sendMessage(
      CONTACT.email,
      CONTACT.name,
      CONTACT.message,
    );

    await expect(contactModal.heading).not.toBeVisible();
  });

  test("click on X closes the modal", async ({ page }) => {
    await closeModalOnX(page, "New message");

    await expect(contactModal.heading).not.toBeVisible();
  });

  test("click on Close closes the modal", async ({ page }) => {
    await closeModalOnButton(page, "New message");

    await expect(contactModal.heading).not.toBeVisible();
  });
});
