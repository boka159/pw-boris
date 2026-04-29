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

test("carousel has rendered img", async ({ page }) => {
  await expect(page.locator(".carousel-item").first()).toBeVisible();

  const carouselImages = await page.locator(".carousel-item img").all();

  for (const img of carouselImages) {
    await expect(img).toHaveAttribute("src", /.jpg/);
  }
});

test("categories filter has linear gradient", async ({ page }) => {
  await expect(page.locator("#cat")).toHaveCSS(
    "background-image",
    "linear-gradient(135deg, rgb(76, 0, 255), rgb(0, 207, 255))",
  );
});
