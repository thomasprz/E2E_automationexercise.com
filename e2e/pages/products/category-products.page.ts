import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../base.page';
import { SidebarComponent } from '../../components/sidebar.component';

export class CategoryProductsPage extends BasePage{
    //LOCATOR
    readonly locatorCategoryProductHeader : Locator
    //PAGE
    readonly sidebar : SidebarComponent


    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorCategoryProductHeader = page.locator('.features_items > h2')
        //PAGE
        this.sidebar = new SidebarComponent(page)
    }

    async expectCategoryProductsPage(){
        await expect(this.page).toHaveURL(/category_products/)
    }

    async expectCategoryHeader(title){
        await expect(this.locatorCategoryProductHeader).toBeVisible()
        await expect(this.locatorCategoryProductHeader).toContainText(title)
    }
}