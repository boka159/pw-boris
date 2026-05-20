import { test, expect } from "@playwright/test";
import { closeModalOnButton, closeModalOnX } from "../../helpers/closeModal";
import { LoginModal } from "../../pages/loginModal.page";
import { NavBar } from "../../pages/navbar.page";
import { CREDENTIALS, BUYER } from "../../testData";
import { expectDialog } from "../../helpers/dialog";
import { ProductPage } from "../../pages/productPage.page";
import { PlaceOrderModal } from "../../pages/placeOrderModal.page";
import { CartPage } from "../../pages/cartPage.page";

test.describe("empty cart", () => {
  let navbar: NavBar;
  let loginModal: LoginModal;
  let placeOrderModal: PlaceOrderModal;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    navbar = new NavBar(page);
    loginModal = new LoginModal(page);
    placeOrderModal = new PlaceOrderModal(page);
    cartPage = new CartPage(page);

    await page.goto("/");
    await navbar.loginButton.click();
    await loginModal.login(CREDENTIALS.username, CREDENTIALS.password);

    await page.goto("/cart.html");
  });

  test("page has necessary elements", async ({ page }) => {
    await expect
      .soft(page.locator("html").getByRole("navigation"))
      .toBeVisible();
    await expect.soft(cartPage.productsHeading).toBeVisible();
    await expect.soft(cartPage.table).toBeVisible();
    await expect.soft(cartPage.totalHeading).toBeVisible();
    await expect(cartPage.placeOrderButton).toBeVisible();
  });

  test("Place order opens modal with necessary elements", async ({ page }) => {
    await cartPage.placeOrderButton.click();

    await expect.soft(placeOrderModal.heading).toBeVisible();

    await expect
      .soft(
        page
          .locator("html")
          .getByRole("dialog", { name: "Place order" })
          .getByLabel("Close"),
      )
      .toBeVisible();
    await expect.soft(page.locator("html").getByText("Total:")).toBeVisible();
    await expect(page.locator(".form-control-label")).toContainText([
      "Name:",
      "Country:",
      "City:",
      "Credit card:",
      "Month:",
      "Year:",
    ]);

    await expect(
      page.locator("#name, #country, #city, #card, #month, #year"),
    ).toHaveCount(6);
  });

  test("click on X closes modal", async ({ page }) => {
    await cartPage.placeOrderButton.click();

    await closeModalOnX(page, "Place order");

    await expect(placeOrderModal.heading).not.toBeVisible();
  });

  test("click on Close closes modal", async ({ page }) => {
    await cartPage.placeOrderButton.click();

    await closeModalOnButton(page, "Place order");

    await expect(placeOrderModal.heading).not.toBeVisible();
  });
});

test.describe("cart has items", () => {
  let navbar: NavBar;
  let loginModal: LoginModal;
  let product: ProductPage;
  let placeOrderModal: PlaceOrderModal;
  let cartPage: CartPage;

  let productTitle: string;

  test.beforeEach(async ({ page }) => {
    navbar = new NavBar(page);
    loginModal = new LoginModal(page);
    product = new ProductPage(page);
    placeOrderModal = new PlaceOrderModal(page);
    cartPage = new CartPage(page);

    await page.goto("/");
    await navbar.loginButton.click();
    await loginModal.login(CREDENTIALS.username, CREDENTIALS.password);

    await page.goto("/prod.html?idp_=1");
    productTitle = await product.name.innerText();

    const dialogPromise = page.waitForEvent("dialog");

    await product.addToCartButton.click();

    const dialog = await dialogPromise;
    await dialog.accept();

    await page.goto("/cart.html");
  });

  test("added product is visible in cart", async ({ page }) => {
    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).toBeVisible();
  });

  test("Delete removes product from cart", async ({ page }) => {
    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).toBeVisible();

    await cartPage.deleteButton.first().click();

    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).not.toBeVisible();
  });

  test("Total price shows correctly", async ({ page }) => {
    await expect(
      page.locator("html").getByRole("cell", { name: productTitle }).first(),
    ).toBeVisible();

    const productPrice = await page
      .locator(".success", { hasText: productTitle })
      .getByRole("cell")
      .nth(2)
      .innerText();

    await expect(
      page.locator("html").getByRole("heading", { name: productPrice }),
    ).toBeVisible();
  });

  test("places order successfully", async ({ page }) => {
    await cartPage.placeOrderButton.click();

    await expect(placeOrderModal.heading).toBeVisible();

    await placeOrderModal.fillOrder(
      BUYER.name,
      BUYER.country,
      BUYER.city,
      BUYER.card,
      BUYER.month,
      BUYER.year,
    );

    await expect(placeOrderModal.successMessage).toBeVisible();
    await placeOrderModal.okButton.click();
    await expect(placeOrderModal.successMessage).not.toBeVisible();
  });

  test("mandatory empty fields return error", async ({ page }) => {
    await cartPage.placeOrderButton.click();

    await expect.soft(placeOrderModal.heading).toBeVisible();

    expectDialog(page, "Please fill out Name and Creditcard.");

    await placeOrderModal.purchaseButton.click();
  });
});
