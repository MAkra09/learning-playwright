import { test, expect, Page } from '@playwright/test';
import { LoginPageMerchandiseDev } from '../../pages/login-page-merchandise-dev';
import { ProductPage } from '../../pages/product-page';
import { SummaryCartPage } from '../../pages/summary-cart-page';
import { checkoutInfoMerchandise } from '../../pages/checkout-info-merchandise';
import { ThankYouPage } from '../../pages/thankyou-page';
import userdata from '../../data/userdata-login.json';
import userinfo from '../../data/user-information.json';

test.beforeEach(async ({ page }: { page: Page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);
    const productPage = new ProductPage(page);
    const summaryCartPage = new SummaryCartPage(page);
    await loginPage.openBrowserSuccess();
    await loginPage.login(
        userdata.valid_data.username,
        userdata.valid_data.password
    );
    await productPage.addProductHoodie();
    await productPage.clickCartButtonGoToCart();
    await summaryCartPage.proceedToCheckout();
});

test.describe('Checkout Form Validation', {
    tag: ['@checkout-form', '@Positive', '@ui'],
    annotation: [{
        type: 'feature',
        description: 'Checkout Form Validation Tests',
    }],
}, () => {
    test('Fill in checkout form with valid data and verify', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC011: Checkout with all valid information" }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        const thankYouPage = new ThankYouPage(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.valid_information_data.firstName,
            userinfo.valid_information_data.lastName,
            userinfo.valid_information_data.email,
            userinfo.valid_information_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const text = await thankYouPage.getThankYouHeaderText();
        expect((text ?? '').replace(/\s+/g, ' ')).toContain('ODT x merchandise');
        expect(await thankYouPage.getThankYouMessageText()).toContain('Thank you for your order.');
    });
});

test.describe('Checkout Form Validation', {
    tag: ['@checkout-form', '@Negative', '@ui'],
    annotation: [{
        type: 'feature',
        description: 'Checkout Form Validation Tests',
    }],
}, () => {
    test('Attempt checkout with invalid email domain', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC012: Checkout with invalid email domain" }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.valid_information_data.firstName,
            userinfo.valid_information_data.lastName,
            userinfo.invalid_information_data.email,
            userinfo.valid_information_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const errorMessage = await checkoutInfoPage.getErrorMessageText();
        expect(errorMessage).toContain('We support only email address with domain mailinator.com.');
    });

    test('Attempt checkout with missing ZIP Code Format', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC013: Checkout with invalid zip code format " }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.valid_information_data.firstName,
            userinfo.valid_information_data.lastName,
            userinfo.valid_information_data.email,
            userinfo.invalid_information_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const errorMessage = await checkoutInfoPage.getErrorMessageText();
        expect(errorMessage).toContain('We support only 5 digits zip code.');
    });

    test('Attempt checkout with missing First Name', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC014-1: Checkout with missing first name" }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.empty_information_data.firstName,
            userinfo.valid_information_data.lastName,
            userinfo.valid_information_data.email,
            userinfo.valid_information_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const errorMessage = await checkoutInfoPage.getErrorMessageText();
        expect(errorMessage).toContain('First name is required.');
    });

    test('Attempt checkout with missing Last Name', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC014-2: Checkout with missing last name" }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.valid_information_data.firstName,
            userinfo.empty_information_data.lastName,
            userinfo.valid_information_data.email,
            userinfo.valid_information_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const errorMessage = await checkoutInfoPage.getErrorMessageText();
        expect(errorMessage).toContain('Last name is required.');
    });

    test('Attempt checkout with missing Email', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC014-3: Checkout with missing email" }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.valid_information_data.firstName,
            userinfo.valid_information_data.lastName,
            userinfo.empty_information_data.email,
            userinfo.valid_information_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const errorMessage = await checkoutInfoPage.getErrorMessageText();
        expect(errorMessage).toContain('Email address is required.');
    });

    test('Attempt checkout with missing ZIP Code', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC014-4: Checkout with missing zip code" }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.valid_information_data.firstName,
            userinfo.valid_information_data.lastName,
            userinfo.valid_information_data.email,
            userinfo.empty_information_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const errorMessage = await checkoutInfoPage.getErrorMessageText();
        expect(errorMessage).toContain('Zip code is required.');
    });

        test('Attempt checkout with missing ZIP Code number', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC015: Checkout with zip code containing non-numeric characters" }
        ]
        const checkoutInfoPage = new checkoutInfoMerchandise(page);
        await checkoutInfoPage.fillCheckoutInfo(
            userinfo.valid_information_data.firstName,
            userinfo.valid_information_data.lastName,
            userinfo.valid_information_data.email,
            userinfo.wrong_format_data.postalCode
        );
        await checkoutInfoPage.clickConfirmButton();

        const errorMessage = await checkoutInfoPage.getErrorMessageText();
        expect(errorMessage).toContain('We support only 5 digits zip code.');
    });
});
