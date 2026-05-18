import { test, expect } from "@playwright/test";
import { CREDENTIALS } from "../../testData";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { LoginModal } from "../../pages/loginModal.page";
import { expectDialog } from "../../helpers/dialog";
import { NavBar } from "../../pages/navbar.page";

test.describe("NavBar", () => {
  let navbar: NavBar;
  let loginModal: LoginModal;

  test.beforeEach(async ({ page }) => {
    navbar = new NavBar(page);
    loginModal = new LoginModal(page);

    await page.goto("/");
  });

  test("click on Sign up opens sign up modal", async ({ page }) => {
    await navbar.signUpButton.click();

    await expect(
      page.locator(".modal-header h5", { hasText: "Sign up" }),
    ).toBeVisible();
  });

  test("successful sign up", async ({ page }) => {
    const username = "user_" + Date.now();

    await navbar.signUpButton.click();
    await page.locator("#sign-username").fill(username);
    await page.locator("#sign-password").fill(CREDENTIALS.password);

    expectDialog(page, "Sign up successful.");

    await page.locator("html").getByRole("button", { name: "Sign up" }).click();

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

  test("empty credential field returns error", async ({ page }) => {
    await navbar.signUpButton.click();

    expectDialog(page, "Please fill out Username and Password.");

    await page.locator("html").getByRole("button", { name: "Sign up" }).click();
  });

  test("existing username returns error", async ({ page }) => {
    await navbar.signUpButton.click();
    await page.locator("#sign-username").fill(CREDENTIALS.username);
    await page.locator("#sign-password").fill(CREDENTIALS.password);

    expectDialog(page, "This user already exist.");

    await page.locator("html").getByRole("button", { name: "Sign up" }).click();
  });

  test("click on X closes the modal", async ({ page }) => {
    await navbar.signUpButton.click();
    await closeModalOnX(page, "Sign up");

    await expect(
      page.locator(".modal-header h5", { hasText: "Sign up" }),
    ).not.toBeVisible();
  });

  test("click on Close closes the modal", async ({ page }) => {
    await navbar.signUpButton.click();
    await closeModalOnButton(page, "Sign up");

    await expect(
      page.locator(".modal-header h5", { hasText: "Sign up" }),
    ).not.toBeVisible();
  });
});
