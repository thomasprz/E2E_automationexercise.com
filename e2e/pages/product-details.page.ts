import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
    readonly locatorProductName : Locator
    readonly locatorCategoryProduct : Locator
    readonly locatorPriceProduct : Locator
    readonly locatorAvailabilityProduct : Locator
    readonly locatorConditionProduct : Locator
    readonly locatorBrandProduct : Locator

    constructor(page:Page,){
        super(page)
        this.locatorProductName = page.locator('.product-information h2')
        this.locatorCategoryProduct = page.locator('.product-information p:has-text("Category:")');
        this.locatorPriceProduct = page.locator('.product-information span:has-text("Rs.")');
        this.locatorAvailabilityProduct = page.locator('.product-information p:has-text("Availability:")');
        this.locatorConditionProduct = page.locator('.product-information p:has-text("Condition:")');
        this.locatorBrandProduct = page.locator('.product-information p:has-text("Brand:")');

    }

    async expectProductDetailsPage(){
        await expect(this.page).toHaveURL(/product_details/);
    }

    async expectProductDetail(){
        await expect(this.locatorProductName).toBeVisible()
        await expect(this.locatorCategoryProduct).toBeVisible()
        await expect(this.locatorPriceProduct.first()).toBeVisible()
        await expect(this.locatorAvailabilityProduct).toBeVisible()
        await expect(this.locatorConditionProduct).toBeVisible()
        await expect(this.locatorBrandProduct).toBeVisible()
    }
}