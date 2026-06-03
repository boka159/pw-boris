import { test, expect } from "../../fixtures";
import { login } from "../../helpers/login";
import { waitForImages } from "../../helpers/waitForImages";
import { CATEGORIES } from "../../testData";

test.describe("Homepage visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("homepage", async ({ page, homepage }) => {
    await expect(homepage.cards.first()).toBeVisible();
    await waitForImages(page);
    await expect(page).toHaveScreenshot("homepage.png");
  });
});

test.describe("Product page visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/prod.html?idp_=1");
  });

  test("Samsung Galaxy S6", async ({ page, product }) => {
    await expect(product.name).toBeVisible();
    await waitForImages(page);
    await expect(page).toHaveScreenshot("samsung_galaxy_s6.png");
  });
});

test.describe("Empty cart page visual regression", () => {
  test.beforeEach(async ({ page, navbar, loginModal }) => {
    await login(page, navbar, loginModal);

    await page.goto("/cart.html");
  });

  test("empty cart page", async ({ page, cartPage }) => {
    await expect(cartPage.placeOrderButton).toBeVisible();
    await waitForImages(page);
    await expect(page).toHaveScreenshot("empty_cart.png");
  });
});

test.describe("Populated cart page visual regression", () => {
  let productTitle: string;

  test.beforeEach(async ({ page, navbar, loginModal, product }) => {
    await login(page, navbar, loginModal);
    await page.goto("/prod.html?idp_=1");

    productTitle = await product.name.innerText();

    const dialogPromise = page.waitForEvent("dialog");

    await product.addToCartButton.click();

    const dialog = await dialogPromise;
    await dialog.accept();

    await page.goto("/cart.html");
  });

  test.afterEach(async ({ page, cartPage }) => {
    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).toBeVisible();

    await cartPage.deleteButton.first().click();

    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).not.toBeVisible();
  });

  test("populated cart page", async ({ page, cartPage }) => {
    await expect(cartPage.deleteButton.first()).toBeVisible();
    await waitForImages(page);
    await expect(page).toHaveScreenshot("populated_cart.png");
  });
});

test.describe("Logged in navbar visual regression", () => {
  test("logged in navbar", async ({ page, navbar, loginModal }) => {
    await login(page, navbar, loginModal);
    await waitForImages(page);
    await expect(page).toHaveScreenshot("homepage_logged_in.png");
  });
});

test.describe("Login modal visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("login modal", async ({ page, navbar, loginModal }) => {
    await navbar.loginButton.click();
    await expect(loginModal.heading).toBeVisible();
    await expect(page.getByRole("dialog", { name: "Log in" })).toHaveScreenshot(
      "login_modal.png",
    );
  });
});

test.describe("Sign up modal visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("sign up modal", async ({ page, navbar, signUpModal }) => {
    await navbar.signUpButton.click();
    await expect(signUpModal.heading).toBeVisible();
    await expect(
      page.getByRole("dialog", { name: "Sign up" }),
    ).toHaveScreenshot("sign_up_modal.png");
  });
});

test.describe("Contact modal visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("contact modal", async ({ page, navbar }) => {
    await navbar.contactButton.click();
    await expect(
      page.getByRole("dialog", { name: "New message" }),
    ).toHaveScreenshot("contact_modal.png");
  });
});

test.describe("About modal visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("about modal", async ({ page, navbar }) => {
    await navbar.aboutUsButton.click();
    await expect(
      page.locator("html").getByRole("heading", { name: "About us" }),
    ).toBeVisible();
    await expect(page.locator("#videoModal .modal-dialog")).toHaveScreenshot(
      "about_modal.png",
    );
  });
});

test.describe("Place order modal visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("place order modal", async ({ page, navbar, cartPage }) => {
    await navbar.cartButton.click();
    await cartPage.placeOrderButton.click();

    await expect(
      page.getByRole("dialog", { name: "Place order" }),
    ).toHaveScreenshot("place_order_modal.png");
  });
});

test.describe("Category filters visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("phones filter", async ({ page, homepage }) => {
    await homepage.phonesFilter.click();
    await expect(homepage.cards).not.toContainText([
      ...CATEGORIES.monitors,
      ...CATEGORIES.laptops,
    ]);
    await waitForImages(page);
    await expect(page).toHaveScreenshot("phones_filter.png");
  });

  test("laptops filter", async ({ page, homepage }) => {
    await homepage.laptopsFilter.click();
    await expect(homepage.cards).not.toContainText([
      ...CATEGORIES.monitors,
      ...CATEGORIES.phones,
    ]);
    await waitForImages(page);
    await expect(page).toHaveScreenshot("laptops_filter.png");
  });

  test("monitors filter", async ({ page, homepage }) => {
    await homepage.monitorsFilter.click();
    await expect(homepage.cards).not.toContainText([
      ...CATEGORIES.phones,
      ...CATEGORIES.laptops,
    ]);
    await waitForImages(page);
    await expect(page).toHaveScreenshot("monitors_filter.png");
  });
});
