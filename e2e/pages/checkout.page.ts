import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';
import { MenuComponent } from '../components/menu.component';

export class CheckoutPage extends BasePage {
    //LOCATOR
    readonly locatorAddressDelivery : Locator
    readonly locatorAddressDetailsHeader : Locator
    readonly locatorCartPrice : Locator
    readonly locatorCartQuantity : Locator
    readonly locatorCartTotal : Locator
    readonly locatorTextArea : Locator
    readonly locatorPlaceOrderButton : Locator
    readonly locatorInvoiceAddress : Locator
    //PAGE
    readonly menu : MenuComponent

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorAddressDelivery = page.locator('#address_delivery')
        this.locatorInvoiceAddress = page.locator('#address_invoice');
        this.locatorAddressDetailsHeader = page.getByRole('heading', {name:'Address Details'})
        this.locatorCartPrice = page.locator('.cart_price')
        this.locatorCartQuantity = page.locator('.cart_quantity')
        this.locatorCartTotal = page.locator('.cart_total')
        this.locatorTextArea = page.locator('.form-control')
        this.locatorPlaceOrderButton = page.getByRole('link', {name:'Place Order'})
        //PAGE
        this.menu = new MenuComponent(page)
    }

    async expectCheckoutPage(){
        await expect(this.page).toHaveURL('/checkout')
        await expect(this.locatorAddressDetailsHeader).toBeVisible()
    }

    async expectDeliveryAddress(address) {
        const strAddress = `Mr. ${address.firstname} ${address.lastname} ${address.company} ${address.address1} ${address.address2} ${address.city} ${address.state} ${address.zipcode} ${address.country} ${address.mobile_number}`;
        await expect.soft(this.locatorAddressDelivery).toContainText(strAddress);
      }
    
      async expectBillingyAddress(address) {
        const strAddress = `Mr. ${address.firstname} ${address.lastname} ${address.company} ${address.address1} ${address.address2} ${address.city} ${address.state} ${address.zipcode} ${address.country} ${address.mobile_number}`;
        await expect.soft(this.locatorInvoiceAddress).toContainText(strAddress);
      }

    async expectReviewOrderOneProduct(product){
        const totalPrice = product.price * Number(product.quantity)
        await expect(this.page.getByRole('row', {name:product.name}).locator(this.locatorCartPrice)).toHaveText(`Rs. ${product.price}`)
        await expect(this.page.getByRole('row', {name:product.name}).locator(this.locatorCartQuantity)).toHaveText(product.quantity)
        await expect(this.page.getByRole('row', {name:product.name}).locator(this.locatorCartTotal)).toHaveText(`Rs. ${totalPrice}`)
    }

    async fillCommentArea(comment){
        await this.locatorTextArea.fill(comment.section)
    }

    async clickPlaceOrder(){
        await this.locatorPlaceOrderButton.click()
    }

}