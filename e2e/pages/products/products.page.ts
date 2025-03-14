import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../base.page';
import { ProductDetailsPage } from './product-details.page';
import { CategoryProductsPage } from './category-products.page';
import { SidebarComponent } from '../../components/sidebar.component';
import { BrandProductsPage } from './brand-products.page';
import { MenuComponent } from '../../components/menu.component';

export class ProductsPage extends BasePage{
    readonly locatorAllProductsHeader : Locator
    readonly locatorSearchedProductsHeader : Locator
    readonly locatorListItems : Locator
    readonly locatorViewProductButton : Locator
    readonly locatorAddToCartButton : Locator
    readonly locatorSearchInput : Locator
    readonly locatorSearchButton : Locator
    readonly locatorContinueShoppingButton : Locator
    readonly locatorViewCart : Locator
    //PAGE
    readonly details : ProductDetailsPage
    readonly category : CategoryProductsPage
    readonly sidebar : SidebarComponent
    readonly brand : BrandProductsPage
    readonly menu : MenuComponent

    constructor(page:Page){
        super(page)
        this.locatorAllProductsHeader = page.getByRole('heading', {name:'All Products'})
        this.locatorSearchedProductsHeader = page.getByRole('heading', {name:'Searched Products'})
        this.locatorListItems = page.locator('.features_items')
        this.locatorViewProductButton = page.getByRole('link', {name:'View Product'})
        this.locatorAddToCartButton = page.locator('.add-to-cart')
        this.locatorSearchInput = page.getByRole('textbox', { name: 'Search Product' })
        this.locatorSearchButton = page.locator('#submit_search')
        this.locatorContinueShoppingButton = page.getByRole('button', {name:"Continue Shopping"})
        this.locatorViewCart = page.getByRole('link', {name:'View Cart'})

        //PAGE
        this.details = new ProductDetailsPage(page)
        this.category = new CategoryProductsPage(page)
        this.sidebar = new SidebarComponent(page)
        this.brand = new BrandProductsPage(page)
        this.menu = new MenuComponent(page)
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

    async clickFirstAddToCart(){
        await this.locatorAddToCartButton.first().click()
    }

    async searchProduct(product){
        await this.locatorSearchInput.fill(product)
        await this.locatorSearchButton.click()
    }

    async expectSearchProduct(name){
        const products = await this.page.locator('.single-products').all()
        for (const singleProduct of products) {
            const productName = await singleProduct.locator('.productinfo p').innerText();
            await expect(productName).toContain(name);
        }
    }

    async addProductsFromSearchToCart(){
        const products = await this.page.locator('.single-products').all()
        for (const singleProduct of products) {
            await this.locatorAddToCartButton.first().click()
            await this.locatorContinueShoppingButton.click()
        }
    }
    async clickContinueShopping(){
        await this.locatorContinueShoppingButton.click()
    }

    async clickViewCart(){
        await this.locatorViewCart.click()
    }
}