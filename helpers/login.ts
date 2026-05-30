import { expect, Page } from "@playwright/test";
import { CREDENTIALS } from "../testData";
import { NavBar } from "../pages/navbar.page";
import { LoginModal } from "../pages/loginModal.page";

export async function login(
  page: Page,
  navbar: NavBar,
  loginModal: LoginModal,
) {
  await page.goto("/");
  await navbar.loginButton.click();
  await loginModal.login(CREDENTIALS.username, CREDENTIALS.password);

  await expect(navbar.logoutButton).toBeVisible();
}
