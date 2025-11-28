import { Locator, Page } from "@playwright/test";

export class AddItemMerchandiseDev {
  private page: Page;
  private addItemButton: Locator;
  private cart_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addItemButton = page.getByTestId('add-to-cart-button');
    this.cart_button = page.getByTestId('cart-items-count');

  }

  async openAddItemForm() {
    await this.addItemButton.first().click();
    await this.cart_button.click();
  }

  }