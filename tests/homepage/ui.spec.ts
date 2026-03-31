import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has visible logo", async ({ page }) => {
  await expect(page.locator(".navbar-brand img")).toHaveAttribute(
    "src",
    /favicon/,
  );
});

test("product cards have rendered img", async ({ page }) => {
  await expect(page.locator(".card").first()).toBeVisible();

  const images = await page.locator(".card-img-top").all();

  for (const img of images) {
    await expect(img).toHaveAttribute("src", /.jpg/);
  }
});

test("carousel has rendered img", async ({ page }) => {});
