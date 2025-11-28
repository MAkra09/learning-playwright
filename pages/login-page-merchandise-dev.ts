import { Page, Locator } from '@playwright/test';

export class LoginPageMerchandiseDev {
  private page: Page;
  private login_box: Locator;
  private password_box: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.login_box = page.getByTestId('login-field');
    this.password_box = page.getByTestId('password-field');
    this.loginButton = page.getByTestId('submit-button');
  }

  async openBrowserSuccess() {
    await this.page.goto('https://merchandise-dev.odds.team');
  }

  async login(username: string, password: string) {
    await this.login_box.fill(username);
    await this.password_box.fill(password);
    await this.loginButton.click();
  }
}