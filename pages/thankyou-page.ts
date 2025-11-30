import { Locator, Page } from "@playwright/test";

export class ThankYouPage {
    private page: Page
    private headerPage: Locator;
    private thankYouMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerPage = page.getByTestId('shop-title');
        this.thankYouMessage = page.locator('[data-testid="thank-you-container"] .rubik-italic-bold.text-3xl');
    }

    async getThankYouHeaderText() {
        return await this.headerPage.textContent();
    }

    async getThankYouMessageText() {
        return await this.thankYouMessage.textContent();
    }
}