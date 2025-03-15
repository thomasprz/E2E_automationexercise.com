import {Page, Locator} from '@playwright/test'

export class BasePage {
    readonly page : Page 
    readonly locatorTitleCookies : Locator
    readonly locatorPopup : Locator

    constructor(page:Page){
        this.page = page
        this.locatorTitleCookies = page.getByText('This site asks for consent to use your data')
        this.locatorPopup = page.getByRole("button", {name:'Consent'});
      }

  async goTo() {
    await this.page.goto('/');
  }

  async popup() {
    await this.page.addLocatorHandler(this.locatorTitleCookies, async () => {
        await this.locatorPopup.click();
    });
  }

  async scrollDown(){
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  }

  async scrollUp(){
    await this.page.evaluate(() => window.scrollTo(0, 0))
  }

  async waitFor(){
    await this.page.waitForTimeout(1000)
  }
}