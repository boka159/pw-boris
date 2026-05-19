import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage.page";

test.describe("Homepage", async () => {
  let homepage: HomePage;

  test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);

    await page.goto("/");
  });

  test("has visible logo", async ({ page }) => {
    await expect(page.locator(".navbar-brand img")).toHaveAttribute(
      "src",
      /favicon/,
    );
  });

  test("product cards have rendered img", async ({ page }) => {
    await expect(homepage.cards.first()).toBeVisible();

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

  test("navbar links have hover effect", async ({ page }) => {
    await expect(page.locator("#navbarExample")).toBeVisible();

    const navbarLinks = await page
      .locator("#navbarExample a")
      .filter({ visible: true })
      .all();

    for (const a of navbarLinks) {
      await a.hover();

      await expect.soft(a).toHaveCSS("color", "rgb(0, 170, 255)");
      await expect(a).toHaveCSS(
        "text-shadow",
        "rgba(0, 170, 255, 0.5) 0px 0px 8px",
      );
    }
  });

  test("product title has hover effect", async ({ page }) => {
    await expect(homepage.cards.first()).toBeVisible();

    const productTitles = await page
      .locator(".card a")
      .filter({ visible: true })
      .all();

    for (const a of productTitles) {
      await a.hover();

      await expect
        .soft(a)
        .toHaveCSS("text-decoration-color", "rgb(1, 76, 140)");
      await expect.soft(a).toHaveCSS("text-decoration-style", "solid");
      await expect.soft(a).toHaveCSS("text-decoration-thickness", "auto");
      await expect(a).toHaveCSS("text-decoration-line", "underline");
      await expect(a).toHaveCSS("color", "rgb(1, 76, 140)");
    }
  });

  test("navbar has linear gradient background", async ({ page }) => {
    await expect(page.locator(".navbar")).toHaveCSS(
      "background-image",
      "linear-gradient(135deg, rgb(76, 0, 255), rgb(0, 207, 255))",
    );
  });

  test("footer has linear gradient background", async ({ page }) => {
    await expect(page.locator("#footc")).toHaveCSS(
      "background-image",
      "linear-gradient(135deg, rgb(76, 0, 255), rgb(0, 207, 255))",
    );
  });
});
