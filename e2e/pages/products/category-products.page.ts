import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../base.page';
import { SidebarComponent } from '../../components/sidebar.component';

export class CategoryProductsPage extends BasePage{
    readonly locatorCategoryProductHeader : Locator
    readonly sidebar : SidebarComponent


    constructor(page:Page){
        super(page)
        this.locatorCategoryProductHeader = page.locator('.features_items > h2')
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