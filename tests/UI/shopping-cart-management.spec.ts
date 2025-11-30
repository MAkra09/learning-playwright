import { test, expect, Page } from '@playwright/test';
import { LoginPageMerchandiseDev } from '../../pages/login-page-merchandise-dev';
import { ProductPage } from '../../pages/product-page';
import { SummaryCartPage } from '../../pages/summary-cart-page';
import userdata from '../../data/userdata-login.json';

test.beforeEach(async ({ page }: { page: Page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);
    await loginPage.openBrowserSuccess();
    await loginPage.login(
        userdata.valid_data.username,
        userdata.valid_data.password
    );
});

test.describe('Shopping Cart Management', {
    tag: ['@shopping-cart', '@Positive', '@ui'],
    annotation: [{
        type: 'feature',
        description: 'Shopping Cart Management Tests',
    }],
}, () => {
    test('Add item to cart and verify', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC006: Add product to cart" }
        ]
        const productPage = new ProductPage(page);

        await productPage.addProductHoodie();

        await expect(page.getByTestId('cart-items-count')).toContainText('1');
        await expect(page
                .locator('[data-testid="product-item"][data-sku="0000000001"]')
                .getByTestId('remove-from-cart-button')).toBeVisible();
    });

    test('Update item quantity in cart and verify', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC007: Update product quantity in cart" }
        ]
        const productPage = new ProductPage(page);
        const summaryCartPage = new SummaryCartPage(page);
        const productPricePerUnit = '79.69';
        const quantityToSet = 3;

        await productPage.addProductHoodie();
        await productPage.clickCartButtonGoToCart();
        await summaryCartPage.fillInQuantityBox(quantityToSet);

        await expect(page.getByTestId('quantity')).toHaveValue(quantityToSet.toString());
        await expect(page.getByTestId('subtotal-price')).toContainText((parseFloat(productPricePerUnit) * quantityToSet).toString());
    });

    test('Remove item from cart and verify', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC008: Remove product from cart" }
        ]
        const productPage = new ProductPage(page);
        const summaryCartPage = new SummaryCartPage(page);

        await productPage.addProductHoodie();
        await productPage.clickCartButtonGoToCart();
        await summaryCartPage.removeItemFromCart();

        expect(await summaryCartPage.getEmptyCartMessage()).toContain('No item in cart');
    });

    test('View Empty Cart', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC009: View empty cart" }
        ]
        const productPage = new ProductPage(page);
        const summaryCartPage = new SummaryCartPage(page);

        await productPage.clickCartButtonGoToCart();

        expect(await summaryCartPage.getEmptyCartMessage()).toContain('No item in cart');
    });

    test('Add multiple items to cart and verify', async ({ page }: { page: Page }) => {
        annotation: [
            { type: "test-id", description: "TC010: Add multiple products to cart" }
        ]
        const productPage = new ProductPage(page);
        const summaryCartPage = new SummaryCartPage(page);

        await productPage.addProductHoodie();
        await productPage.addProductJacket();
        await productPage.clickCartButtonGoToCart();

        const products = await summaryCartPage.getCartProductsList();
        expect(products).toContain('TerraFlex Hoodie');
        expect(products).toContain('NordicPeak Jacket');

    });
});
