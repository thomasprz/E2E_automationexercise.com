import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';
import { FooterComponent } from '../components/footer.component';

export class CartPage extends BasePage {
    readonly footer : FooterComponent

    constructor(page:Page){
        super(page)
        //PAGE
        this.footer = new FooterComponent(page)
    }

    async expectCartPage(){
        await expect(this.page).toHaveURL('/view_cart')
    }
}