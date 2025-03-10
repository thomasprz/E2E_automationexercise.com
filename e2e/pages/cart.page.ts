import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';
import { FooterComponent } from '../components/footer.component';

export class CartPage extends BasePage {
    readonly footer : FooterComponent
    readonly locatorCartName : Locator
    readonly locatorCartPrice : Locator
    readonly locatorCartQuantity : Locator
    readonly locatorCartTotal : Locator
    readonly locatorCartDelete : Locator
    readonly locatorProduct : Locator

    constructor(page:Page){
        super(page)
        this.locatorProduct = page.locator('tbody tr')
        this.locatorCartName = page.locator('.cart_description h4')
        this.locatorCartPrice = page.locator('.cart_price')
        this.locatorCartQuantity = page.locator('.cart_quantity')
        this.locatorCartTotal = page.locator('.cart_total')
        this.locatorCartDelete = page.locator('.cart_delete')
        //PAGE
        this.footer = new FooterComponent(page)
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
}