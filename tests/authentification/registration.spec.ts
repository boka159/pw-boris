import { test, expect } from "../../fixtures";
import { CREDENTIALS } from "../../testData";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { expectDialog } from "../../helpers/dialog";

test.describe("Registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("click on Sign up opens sign up modal", async ({
    navbar,
    signUpModal,
  }) => {
    await navbar.signUpButton.click();

    await expect(signUpModal.heading).toBeVisible();
  });

  test("successful sign up", async ({
    page,
    navbar,
    loginModal,
    signUpModal,
  }) => {
    const username = "user_" + Date.now();

    await navbar.signUpButton.click();
    expectDialog(page, "Sign up successful.");
    await signUpModal.signUp(username, CREDENTIALS.password);

    await navbar.loginButton.click();
    await loginModal.login(username, CREDENTIALS.password);

    await expect
      .soft(page.locator("#logout2", { hasText: "Log out" }))
      .toBeVisible();
    await expect(
      page.locator("#nameofuser", {
        hasText: "Welcome " + username,
      }),
    ).toBeVisible();
  });

  test("empty credential field returns error", async ({
    page,
    navbar,
    signUpModal,
  }) => {
    await navbar.signUpButton.click();
    expectDialog(page, "Please fill out Username and Password.");
    await signUpModal.signUpButton.click();
  });

  test("existing username returns error", async ({
    page,
    navbar,
    signUpModal,
  }) => {
    await navbar.signUpButton.click();
    expectDialog(page, "This user already exist.");
    await signUpModal.signUp(CREDENTIALS.username, CREDENTIALS.password);
  });

  test("click on X closes the modal", async ({ page, navbar }) => {
    await navbar.signUpButton.click();
    await closeModalOnX(page, "Sign up");

    await expect(
      page.locator(".modal-header h5", { hasText: "Sign up" }),
    ).not.toBeVisible();
  });

  test("click on Close closes the modal", async ({ page, navbar }) => {
    await navbar.signUpButton.click();
    await closeModalOnButton(page, "Sign up");

    await expect(
      page.locator(".modal-header h5", { hasText: "Sign up" }),
    ).not.toBeVisible();
  });
});
