import {test, expect} from '@playwright/test';
import { LoginPageMerchandiseDev } from '../../pages/login-page-merchandise-dev';
import userdata from '../../data/userdata-login.json';
import { AddItemMerchandiseDev } from '../../pages/add-item-merchandise-dev';
import { summaryPageMerchandise } from '../../pages/summary-page-merchandise';
import { checkoutInfoMerchandise } from '../../pages/checkout-info-merchandise';
import { gotoMailboxPage } from '../../pages/mailbox-page';    

test.afterEach(async ({ page }) => {
    await page.close();
});

test.describe.skip('ทดสอบซื้อของ Merchandise Dev', () => {
test('สามารถสั่งสินค้าจากระบบได้สำเร็จ', async ({ page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);
    const addItemPage = new AddItemMerchandiseDev(page);
    const summaryPage = new summaryPageMerchandise(page);
    const checkoutInfoPage = new checkoutInfoMerchandise(page);
    const mailboxPage = new gotoMailboxPage(page);
    await loginPage.openBrowserSuccess();
    await loginPage.login(userdata.valid_data.username, userdata.valid_data.password);
    await addItemPage.openAddItemForm();
    await summaryPage.proceedToCheckout();
    await checkoutInfoPage.fillCheckoutInfo('M', 'Buyer', 'm_buyer@mailinator.com', '12345');

    await mailboxPage.openMailboxPage();
    await mailboxPage.searchMailbox('m_buyer@mailinator.com');
    await mailboxPage.selectLatestEmail();

    await expect(page.getByRole('tabpanel')).toBeVisible();
    await expect(page.getByText('Your order #20251109141158MB has been confirmed')).toBeVisible();
    await expect(page.getByText('TerraFlex Hoodie')).toBeVisible();


        });
    });
