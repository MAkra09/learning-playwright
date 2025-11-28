import { test, expect } from '@playwright/test';
import { LoginPageMerchandiseDev } from '../../pages/login-page-merchandise-dev';
import userdata from '../../data/userdata-login.json';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);
    await loginPage.openBrowserSuccess();
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test.describe('Login Functionality',{
    tag: ['@login', '@Positive', '@ui'],
    annotation: [{
        type: 'feature',
        description: 'Login Functionality Tests',
    },
],
    },() => {
    test('Login with valid credentials (customer1)', async ({ page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);

    await loginPage.login(
    userdata.valid_data.username,
    userdata.valid_data.password
        );

    await expect(page).toHaveURL('https://merchandise-dev.odds.team/store.html');
    await expect(page.getByTestId('shop-title')).toBeVisible();
    await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        });

    test('Login with valid credentials (customer2)', async ({ page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);

    await loginPage.login(
    userdata.valid_data_2.username,
    userdata.valid_data_2.password
        );

    await expect(page).toHaveURL('https://merchandise-dev.odds.team/store.html');
    await expect(page.getByTestId('shop-title')).toBeVisible();
    await expect(page.getByTestId('shop-title')).toHaveText('ODT x merchandise');
        });
});

test.describe('Login Functionality',{
    tag: ['@login', '@Negative', '@ui'],
    annotation: [{
        type: 'feature',
        description: 'Login Functionality Tests',
    },
],
    },() => {
    test('Login with invalid user credentials', async ({ page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);

    await loginPage.login(
    userdata.invalid_user_data.username,
    userdata.valid_data.password
    );

    await expect(page.getByTestId('error-message-label')).toBeVisible();
    await expect(page.getByTestId('error-message-label')).toHaveText('Invalid username or password.');
    });

    test('Login with invalid password credentials', async ({ page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);

    await loginPage.login(
    userdata.valid_data.username,
    userdata.invalid_password_data.password
    );

    await expect(page.getByTestId('error-message-label')).toBeVisible();
    await expect(page.getByTestId('error-message-label')).toHaveText('Invalid username or password.');
        });

    test('Login with empty username and password', async ({ page }) => {
    const loginPage = new LoginPageMerchandiseDev(page);

    await loginPage.login(
    userdata.invalid_empty_data.username,
    userdata.invalid_empty_data.password
    );

    await expect(page.getByTestId('error-message-label')).toBeVisible();
    await expect(page.getByTestId('error-message-label')).toHaveText('Invalid username or password.');
        });
});   