import {Page, Locator} from '@playwright/test'

export class BasePage {
    readonly page : Page 
    readonly locatorPopup : Locator

    constructor(page:Page){
        this.page = page
        this.locatorPopup = page.getByRole("button", {name:'Consent'});
      }

  async goTo() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle')
  }

  async popup(){
    await this.locatorPopup.click()
  }

  async scrollDown(){
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  }

  async waitFor(){
    await this.page.waitForTimeout(1000)
  }
}