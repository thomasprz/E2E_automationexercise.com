import {Page, Locator} from '@playwright/test'

export class BasePage {
    readonly page : Page 
    readonly url : string
    readonly locatorPopup : Locator

    constructor(page:Page, url:string){
        this.page = page
        this.url = url
        this.locatorPopup = page.getByRole("button", {name:'Consent'});
      }

  async goTo() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle')
  }

  async popup(){
    await this.locatorPopup.click()
  }
}