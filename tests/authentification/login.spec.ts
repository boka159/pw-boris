import { test, expect } from "@playwright/test";
import { CREDENTIALS } from "../../testData";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { login } from "../../helpers/login";
import { NavBar } from "../../pages/navbar.page";
import { expectDialog } from "../../helpers/dialog";

test.describe("NavBar", () => {
  let navbar: NavBar;

  test.beforeEach(async ({ page }) => {
    navbar = new NavBar(page);

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
    await login(page, CREDENTIALS.username, CREDENTIALS.password);

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

    await page.locator("html").getByRole("button", { name: "Log in" }).click();
  });

  test("incorrect username returns error", async ({ page }) => {
    await navbar.loginButton.click();
    await page.locator("#loginusername").fill("wrong username");
    await page.locator("#loginpassword").fill(CREDENTIALS.password);

    expectDialog(page, "User does not exist.");

    await page.locator("html").getByRole("button", { name: "Log in" }).click();
  });

  test("incorrect password returns error", async ({ page }) => {
    await navbar.loginButton.click();
    await page.locator("#loginusername").fill(CREDENTIALS.username);
    await page.locator("#loginpassword").fill("wrong_password");

    expectDialog(page, "Wrong password.");

    await page.locator("html").getByRole("button", { name: "Log in" }).click();
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
    await login(page, CREDENTIALS.username, CREDENTIALS.password);

    await expect.soft(navbar.logoutButton).toBeVisible();
    await navbar.logoutButton.click();

    await expect.soft(navbar.loginButton).toBeVisible();
    await expect(navbar.signUpButton).toBeVisible();
  });
});
