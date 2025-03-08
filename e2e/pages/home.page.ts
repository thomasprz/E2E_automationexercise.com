import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { FooterComponent } from '../components/footer.component';

export class HomePage extends BasePage {
    readonly locatorHomepageHeader : Locator
    //PAGE
    readonly footer : FooterComponent

    constructor(page:Page){
        super(page)
        this.locatorHomepageHeader = page.getByAltText('Website for automation practice');
        //PAGE
        this.footer = new FooterComponent(page)
    }

    async expectHomepage(){
        await expect(this.page).toHaveURL('/');
        await expect(this.locatorHomepageHeader).toBeVisible()
    }
}