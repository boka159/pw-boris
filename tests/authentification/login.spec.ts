import { test, expect } from "@playwright/test";
import { CREDENTIALS } from "../../testData";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { NavBar } from "../../pages/navbar.page";
import { LoginModal } from "../../pages/loginModal.page";
import { expectDialog } from "../../helpers/dialog";

test.describe("NavBar", () => {
  let navbar: NavBar;
  let loginModal: LoginModal;

  test.beforeEach(async ({ page }) => {
    navbar = new NavBar(page);
    loginModal = new LoginModal(page);

    await page.goto("/");
  });

  test("Click on Log in opens login modal", async ({ page }) => {
    await navbar.loginButton.click();
    await expect(
      page.locator(".modal-header h5", { hasText: "Log in" }),
    ).toBeVisible();
  });

  test("successful login shows welcome user and log out links", async ({
    page,
  }) => {
    await navbar.loginButton.click();
    await loginModal.login(CREDENTIALS.username, CREDENTIALS.password);

    await expect.soft(navbar.logoutButton).toBeVisible();
    await expect(
      page.locator("#nameofuser", {
        hasText: "Welcome " + CREDENTIALS.username,
      }),
    ).toBeVisible();
  });

  test("empty credential field returns error", async ({ page }) => {
    await navbar.loginButton.click();

    expectDialog(page, "Please fill out Username and Password.");

    await loginModal.loginButton.click();
  });

  test("incorrect username returns error", async ({ page }) => {
    await navbar.loginButton.click();
    await loginModal.login("wrong username", CREDENTIALS.password);

    expectDialog(page, "User does not exist.");
  });

  test("incorrect password returns error", async ({ page }) => {
    await navbar.loginButton.click();
    await loginModal.login(CREDENTIALS.username, "wrong_password");

    expectDialog(page, "Wrong password.");
  });

  test("click on X closes the modal", async ({ page }) => {
    await navbar.loginButton.click();
    await closeModalOnX(page, "Log in");

    await expect(
      page.locator(".modal-header h5", { hasText: "Log in" }),
    ).not.toBeVisible();
  });

  test("click on Close closes the modal", async ({ page }) => {
    await navbar.loginButton.click();
    await closeModalOnButton(page, "Log in");

    await expect(
      page.locator(".modal-header h5", { hasText: "Log in" }),
    ).not.toBeVisible();
  });

  test("click on Log out logs the user out", async ({ page }) => {
    await navbar.loginButton.click();
    await loginModal.login(CREDENTIALS.username, CREDENTIALS.password);

    await expect.soft(navbar.logoutButton).toBeVisible();
    await navbar.logoutButton.click();

    await expect.soft(navbar.loginButton).toBeVisible();
    await expect(navbar.signUpButton).toBeVisible();
  });
});
