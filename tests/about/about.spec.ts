import { test, expect } from "@playwright/test";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.locator("#navbarExample a", { hasText: "About us" }).click();
});

test("has necessary elements", async ({ page }) => {
  await expect(
    page.locator("html").getByRole("heading", { name: "About us" }),
  ).toBeVisible();

  await expect(page.locator("#example-video")).toBeVisible();
  await expect(
    page.locator("html").getByRole("button", { name: "Play Video" }),
  ).toBeVisible();
});

test("click on X closes the modal", async ({ page }) => {
  await expect(
    page.locator("html").getByRole("heading", { name: "About us" }),
  ).toBeVisible();
  await page.locator("#videoModal").getByLabel("Close").click();

  await expect(
    page
      .locator("html")
      .getByRole("heading", { name: "About us", exact: true }),
  ).not.toBeVisible();
});

test("click on Close closes the modal", async ({ page }) => {
  await expect(
    page.locator("html").getByRole("heading", { name: "About us" }),
  ).toBeVisible();
  await page.locator("#videoModal").getByText("Close").click();

  await expect(
    page
      .locator("html")
      .getByRole("heading", { name: "About us", exact: true }),
  ).not.toBeVisible();
});
