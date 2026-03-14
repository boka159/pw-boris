import { test, expect } from "@playwright/test";
import { CREDENTIALS } from "../../testData";
import { login } from "../../helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Click on Log in opens login modal", async ({ page }) => {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await expect(
    page.locator(".modal-header h5", { hasText: "Log in" }),
  ).toBeVisible();
});

test("successful login shows welcome user and log out links", async ({
  page,
}) => {
  await login(page, CREDENTIALS.username, CREDENTIALS.password);

  await expect
    .soft(page.locator("#logout2", { hasText: "Log out" }))
    .toBeVisible();
  await expect(
    page.locator("#nameofuser", { hasText: "Welcome " + CREDENTIALS.username }),
  ).toBeVisible();
});

test("empty credential field returns error", async ({ page }) => {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Please fill out Username and Password.");
    await dialog.accept();
  });

  await page.locator("html").getByRole("button", { name: "Log in" }).click();
});

test("incorrect username returns error", async ({ page }) => {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await page.locator("#loginusername").fill("wrong username");
  await page.locator("#loginpassword").fill(CREDENTIALS.password);

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("User does not exist.");
    await dialog.accept();
  });

  await page.locator("html").getByRole("button", { name: "Log in" }).click();
});

test("incorrect password returns error", async ({ page }) => {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await page.locator("#loginusername").fill(CREDENTIALS.username);
  await page.locator("#loginpassword").fill("wrong_password");

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Wrong password.");
    await dialog.accept();
  });

  await page.locator("html").getByRole("button", { name: "Log in" }).click();
});

test("click on X closes the modal", async ({ page }) => {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await page
    .locator("html")
    .getByRole("dialog", { name: "Log in" })
    .getByLabel("Close")
    .click();

  await expect(
    page.locator(".modal-header h5", { hasText: "Log in" }),
  ).not.toBeVisible();
});

test("click on Close closes the modal", async ({ page }) => {
  await page.locator("#navbarExample a", { hasText: "Log in" }).click();
  await page.locator("html").getByLabel("Log in").getByText("Close").click();

  await expect(
    page.locator(".modal-header h5", { hasText: "Log in" }),
  ).not.toBeVisible();
});

test("click on Log out logs the user out", async ({ page }) => {
  await login(page, CREDENTIALS.username, CREDENTIALS.password);

  await expect
    .soft(page.locator("#logout2", { hasText: "Log out" }))
    .toBeVisible();
  await page.locator("#navbarExample a", { hasText: "Log out" }).click();

  await expect
    .soft(page.locator("#navbarExample a", { hasText: "Log in" }))
    .toBeVisible();
  await expect(
    page.locator("#navbarExample a", { hasText: "Sign up" }),
  ).toBeVisible();
});
