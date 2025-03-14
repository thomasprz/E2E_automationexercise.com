import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page'
import { FooterComponent } from '../components/footer.component';
import { ProductsPage } from './products/products.page';
import { MenuComponent } from '../components/menu.component';

export class HomePage extends BasePage {
    readonly locatorHomepageHeader : Locator
    readonly locatorRecommendedItemsHeader : Locator
    readonly locatorAddToCart : Locator
    readonly locatorContinueShoppingButton : Locator
    readonly locatorViewCartLink : Locator
    //PAGE
    readonly footer : FooterComponent
    readonly products : ProductsPage
    readonly menu : MenuComponent

    constructor(page:Page){
        super(page)
        this.locatorHomepageHeader = page.getByAltText('Website for automation practice');
        this.locatorRecommendedItemsHeader = page.getByRole('heading', {name:'recommended items'})
        this.locatorAddToCart = page.locator('.recommended_items .add-to-cart')
        this.locatorContinueShoppingButton = page.getByRole('button', {name:'Continue Shopping'})
        this.locatorViewCartLink =page.getByRole('link', {name:'View Cart'})
        //PAGE
        this.footer = new FooterComponent(page)
        this.products = new ProductsPage(page)
        this.menu = new MenuComponent(page)
    }

    async expectHomepage(){
        await expect(this.page).toHaveURL('/');
        await expect(this.locatorHomepageHeader).toBeVisible()
    }

    async addRecommendedProductToCart(){
        await this.locatorAddToCart.first().click()
        await this.locatorViewCartLink.click()
    }
}