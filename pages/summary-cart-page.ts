import { Locator, Page, expect } from "@playwright/test";

export class SummaryCartPage {
  private page: Page;
  private cartProductsList: Locator;
  private quantityBox: Locator;
  private quantityIncreaseButton: Locator;
  private quantityDecreaseButton: Locator;
  private removeProductButton: Locator;
  private emptyContainer: Locator;
  private checkout_button: Locator;

  constructor(page: Page) {
    this.page = page;
      this.cartProductsList = page
        .locator('[data-testid="cart-items-container"] [data-testid="title"]');
    this.quantityBox = page.getByTestId('quantity');
    this.quantityIncreaseButton = page.getByTestId('quantity-increase-button');
    this.quantityDecreaseButton = page.getByTestId('quantity-decrease-button');
    this.removeProductButton = page.getByTestId('remove-from-cart-button');
    this.emptyContainer = page.getByTestId('empty-cart-container');
    this.checkout_button = page.getByTestId('checkout-button');
  }

  async getCartProductsList(): Promise<string[]> {
  return await this.cartProductsList.allTextContents();
  }

  async expectProductsInCart(productNames: string[]) {
  const itemNames = await this.getCartProductsList();
  for (const name of productNames) {
    expect(itemNames).toContain(name);
    }
  }

  async fillInQuantityBox(quantity: number) {
    await this.quantityBox.fill(quantity.toString());
    await this.quantityBox.blur();
  }

  async increaseItemQuantity() {
    await this.quantityIncreaseButton.click();
  }

  async decreaseItemQuantity() {
    await this.quantityDecreaseButton.click();
  }

  async removeItemFromCart() {
    await this.removeProductButton.click();
  }

  async getEmptyCartMessage() {
    return await this.emptyContainer.textContent();
  }

  async proceedToCheckout() {
    await this.checkout_button.click();
  }

  }