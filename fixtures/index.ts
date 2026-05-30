import { test as base } from "@playwright/test";
import { NavBar } from "../pages/navbar.page";
import { LoginModal } from "../pages/loginModal.page";
import { SignUpModal } from "../pages/signUpModal.page";
import { ContactModal } from "../pages/contactModal.page";
import { HomePage } from "../pages/homePage.page";
import { ProductPage } from "../pages/productPage.page";
import { PlaceOrderModal } from "../pages/placeOrderModal.page";
import { CartPage } from "../pages/cartPage.page";

type Fixtures = {
  navbar: NavBar;
  loginModal: LoginModal;
  signUpModal: SignUpModal;
  contactModal: ContactModal;
  homepage: HomePage;
  product: ProductPage;
  placeOrderModal: PlaceOrderModal;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  navbar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
  loginModal: async ({ page }, use) => {
    await use(new LoginModal(page));
  },
  signUpModal: async ({ page }, use) => {
    await use(new SignUpModal(page));
  },
  contactModal: async ({ page }, use) => {
    await use(new ContactModal(page));
  },
  homepage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  product: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  placeOrderModal: async ({ page }, use) => {
    await use(new PlaceOrderModal(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from "@playwright/test";
