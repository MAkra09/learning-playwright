import { Locator, Page } from "@playwright/test";

export class ProductPage {
  private page: Page;
  private addProductButton_Hoodie: Locator;
  private addProductButton_Jacket: Locator;
  private removeProductButton_Hoodie: Locator;
  private removeProductButton_Jacket: Locator;
  private cart_button: Locator;
  private cartProductCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addProductButton_Hoodie = page
      .locator('[data-testid="product-item"][data-sku="0000000001"]')
      .getByTestId('add-to-cart-button');
    this.addProductButton_Jacket = page
      .locator('[data-testid="product-item"][data-sku="0000000002"]')
      .getByTestId('add-to-cart-button');
    this.removeProductButton_Hoodie = page
      .locator('[data-testid="product-item"][data-sku="0000000001"]')
      .getByTestId('remove-from-cart-button');
    this.removeProductButton_Jacket = page
      .locator('[data-testid="product-item"][data-sku="0000000002"]')
      .getByTestId('remove-from-cart-button');
    this.cart_button = page.getByTestId('cart').locator('path');
    this.cartProductCount = page.getByTestId('cart-items-count');

  }

  async addProductHoodie() {
    await this.addProductButton_Hoodie.click();
  }

  async addProductJacket() {
    await this.addProductButton_Jacket.click();
  }

  async removeProductHoodie() {
    await this.removeProductButton_Hoodie.click();
  }

  async removeProductJacket() {
    await this.removeProductButton_Jacket.click();
  }

  async getCartProductCount(): Promise<string> {
    return await this.cartProductCount.innerText();
  }

  async clickCartButtonGoToCart() {
    await this.cart_button.click();
  }
}