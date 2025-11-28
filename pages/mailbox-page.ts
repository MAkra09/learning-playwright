import { Locator, Page } from "@playwright/test";

export class gotoMailboxPage {
  private page: Page;
  private mailbox_search: Locator;
  private firstEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mailbox_search = page.getByPlaceholder('Search mailbox');
    this.firstEmail = page.locator('//*[@id="UMib4AsTU379actFKb5rdJ"]');
  }

  async openMailboxPage() {
    await this.page.goto('https://mailpit.odds.team/');
  }

  async searchMailbox(query: string) {
    await this.mailbox_search.fill(query);
    await this.mailbox_search.press('Enter');
    await this.page.waitForTimeout(1000); 
  }

  async selectLatestEmail() {
    await this.firstEmail.waitFor({ state: 'visible' }); 
    await this.firstEmail.click();
  }

}
