import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { FooterComponent } from '../components/footer.component';
import { ProductsPage } from './products/products.page';
import { MenuComponent } from '../components/menu.component';

export class HomePage extends BasePage {
    readonly locatorHomepageHeader : Locator
    //PAGE
    readonly footer : FooterComponent
    readonly products : ProductsPage
    readonly menu : MenuComponent

    constructor(page:Page){
        super(page)
        this.locatorHomepageHeader = page.getByAltText('Website for automation practice');
        //PAGE
        this.footer = new FooterComponent(page)
        this.products = new ProductsPage(page)
        this.menu = new MenuComponent(page)
    }

    async expectHomepage(){
        await expect(this.page).toHaveURL('/');
        await expect(this.locatorHomepageHeader).toBeVisible()
    }
}