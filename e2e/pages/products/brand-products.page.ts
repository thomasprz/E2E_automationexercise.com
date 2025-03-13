import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../base.page';
import { SidebarComponent } from '../../components/sidebar.component';

export class BrandProductsPage extends BasePage{
    readonly locatorBrandHeader : Locator
    readonly locatorProductsItems : Locator
    //PAGE
    readonly sidebar : SidebarComponent


    constructor(page:Page){
        super(page)
        this.locatorBrandHeader = page.locator('.features_items > h2')
        this.locatorProductsItems = page.locator('.features_items .single-products')
        //PAGE
        this.sidebar = new SidebarComponent(page)
    }

    async expectBrandProductsPage(brand){
        await expect(this.page).toHaveURL(`/brand_products/${brand}`);
    }

    async expectBrandHeader(title){
        await expect(this.locatorBrandHeader).toBeVisible()
        await expect(this.locatorBrandHeader).toContainText(title)
    }

}