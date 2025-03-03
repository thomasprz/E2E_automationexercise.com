import {Page, Locator} from '@playwright/test'

export class BasePage {
    readonly page : Page 
    readonly url : string

    constructor(page:Page, url:string){
        this.page = page
        this.url = url
    }

  async goTo() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('networkidle')
  }
}