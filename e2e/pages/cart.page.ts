import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';
import { FooterComponent } from '../components/footer.component';
import { MenuComponent } from '../components/menu.component';

export class CartPage extends BasePage {
    //LOCATOR
    readonly footer : FooterComponent
    readonly locatorCartName : Locator
    readonly locatorCartPrice : Locator
    readonly locatorCartQuantity : Locator
    readonly locatorCartTotal : Locator
    readonly locatorCartDelete : Locator
    readonly locatorProduct : Locator
    readonly locatorProceedToCheckout : Locator
    readonly locatorRegisterLogin : Locator
    readonly locatorContinueOnCart : Locator
    readonly locatorEmptyCart : Locator
    //PAGE
    readonly menu : MenuComponent

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorProduct = page.locator('tbody tr')
        this.locatorCartName = page.locator('.cart_description h4')
        this.locatorCartPrice = page.locator('.cart_price')
        this.locatorCartQuantity = page.locator('.cart_quantity')
        this.locatorCartTotal = page.locator('.cart_total')
        this.locatorCartDelete = page.locator('.cart_quantity_delete')
        this.locatorProceedToCheckout = page.locator('.check_out')
        this.locatorRegisterLogin = page.getByRole('link', {name:'Register / Login'})
        this.locatorContinueOnCart = page.getByRole('button', {name:'Continue On Cart'})
        this.locatorEmptyCart = page.locator('#empty_cart')
        //PAGE
        this.footer = new FooterComponent(page)
        this.menu = new MenuComponent(page)
    }

    async expectCartPage(){
        await expect(this.page).toHaveURL('/view_cart')
    }

    async expectProductsInCart(products){
    for (const product of products) {
        const totalPrice = product.price * Number(product.quantity);
        await expect(this.page.getByRole('row', { name: product.name }).locator(this.locatorCartPrice)).toHaveText(`Rs. ${product.price}`);
        await expect(this.page.getByRole('row', { name: product.name }).locator(this.locatorCartQuantity)).toHaveText(product.quantity);
        await expect(this.page.getByRole('row', { name: product.name }).locator(this.locatorCartTotal)).toHaveText(`Rs. ${totalPrice}`);
      }
    }

    async expectOneProductInCart(product){
            const totalPrice = product.price * Number(product.quantity);
            await expect(this.page.getByRole('row', { name: product.name }).locator(this.locatorCartPrice)).toHaveText(`Rs. ${product.price}`);
            await expect(this.page.getByRole('row', { name: product.name }).locator(this.locatorCartQuantity)).toHaveText(product.quantity);
            await expect(this.page.getByRole('row', { name: product.name }).locator(this.locatorCartTotal)).toHaveText(`Rs. ${totalPrice}`);
    }

    async clickProceedToCheckoutAndContinue(){
        await this.locatorProceedToCheckout.click()
        await this.locatorContinueOnCart.click()
    }

    async clickProceedToCheckoutAndLogin(){
        await this.locatorProceedToCheckout.click()
        await this.locatorRegisterLogin.click()
    }

    async clickProceedToCheckout(){
        await this.locatorProceedToCheckout.click()
    }

    async removeOneProduct(){
        await this.locatorCartDelete.click()
    }

    async removeOneProductExpectOneProductLessInCart(product){
        const products = await this.locatorProduct.count()
        await this.locatorCartDelete.first().click()
        await expect(this.locatorProduct).toHaveCount(products-1)
    }

    async expectEmptyCart(){
        await expect(this.locatorEmptyCart).toBeVisible()
        await expect(this.locatorEmptyCart).toContainText('Cart is empty!')
    }

    async cleanCartPage() {
        if (await this.locatorEmptyCart.isVisible()) {
            return;
        }
        while (await this.locatorCartDelete.count() > 0) {
            await this.locatorCartDelete.first().click();
            await this.page.waitForTimeout(500);
        }
        await expect(this.locatorEmptyCart).toBeVisible();
    }
}
