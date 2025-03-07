import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';
import { ProductDetailsPage } from './product-details.page';

export class ProductsPage extends BasePage{
    readonly locatorAllProductsHeader : Locator
    readonly locatorSearchedProductsHeader : Locator
    readonly locatorListItems : Locator
    readonly locatorViewProductButton : Locator
    readonly locatorAddToCartButton : Locator
    readonly locatorSearchInput : Locator
    readonly locatorSearchButton : Locator
    //PAGE
    readonly details : ProductDetailsPage

    constructor(page:Page){
        super(page)
        this.locatorAllProductsHeader = page.getByRole('heading', {name:'All Products'})
        this.locatorSearchedProductsHeader = page.getByRole('heading', {name:'Searched Products'})
        this.locatorListItems = page.locator('.features_items')
        this.locatorViewProductButton = page.getByRole('link', {name:'View Product'})
        this.locatorAddToCartButton = page.locator('.add-to-cart')
        this.locatorSearchInput = page.getByRole('textbox', { name: 'Search Product' })
        this.locatorSearchButton = page.locator('#submit_search')

        //PAGE
        this.details = new ProductDetailsPage(page)
    }

    async expectProductsPage(){
        await expect(this.page).toHaveURL('products')
    }

    async clickViewProduct(index){
        await this.locatorViewProductButton.nth(index).click()
    }

    async clickFirstViewProduct(){
        await this.locatorViewProductButton.first().click()
    }

    async clickAddToCart(index){
        await this.locatorAddToCartButton.nth(index).click()
    }

    async searchProduct(product){
        await this.locatorSearchInput.fill(product)
        await this.locatorSearchButton.click()
    }

    async expectSearchProduct(productName){
        const products = await this.page.locator('.single-products').all()
        for (const singleProduct of products) {
            const productName = await singleProduct.locator('.productinfo p').innerText();
            await expect(productName).toContain(productName);
            console.log(productName)
        }
    }
}