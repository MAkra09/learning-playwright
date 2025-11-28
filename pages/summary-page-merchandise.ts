import { Locator, Page } from "@playwright/test";

export class summaryPageMerchandise {
  private page: Page;
  private checkout_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkout_button = page.getByTestId('checkout-button');
  }

  async proceedToCheckout() {
    await this.checkout_button.click();
  }

  }