import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page'

export class HomePage extends BasePage {
    readonly locatorHomepageHeader : Locator

    constructor(page:Page){
        super(page, '/')
        this.locatorHomepageHeader = page.getByAltText('Website for automation practice');
    }

    async expectHomepage(){
        await expect(this.page).toHaveURL(this.url);
        await expect(this.locatorHomepageHeader).toBeVisible()
    }
}