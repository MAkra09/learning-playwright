import { Locator, Page } from "@playwright/test";

export class checkoutInfoMerchandise {
  private page: Page;
  private firstNameBox: Locator;
  private lastNameBox: Locator;
  private emailBox: Locator;
  private zipCodeBox: Locator;
  private errorEmailMessage: Locator;
  private confirmButton: Locator;

    constructor(page: Page) {
      this.page = page;
      this.firstNameBox = page.getByTestId('firstname-field');
      this.lastNameBox = page.getByTestId('lastname-field');
      this.emailBox = page.getByTestId('email-field');
      this.zipCodeBox = page.getByTestId('zipcode-field');
      this.errorEmailMessage = page.getByTestId('error-message-label');
      this.confirmButton = page.getByTestId('confirm-payment-button');
    }

    async fillCheckoutInfo(firstName: string, lastName: string, email: string, zipCode: string) {
      await this.firstNameBox.fill(firstName);
      await this.lastNameBox.fill(lastName);
      await this.emailBox.fill(email);
      await this.zipCodeBox.fill(zipCode);
    }

    async getErrorMessageText() {
      return await this.errorEmailMessage.textContent();
    }

    async clickConfirmButton() {
      await this.confirmButton.click();
    }
}
