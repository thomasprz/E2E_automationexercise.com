import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base.page";
import { PaymentDonePage } from "../payment/payment-done.page"

export class PaymentPage extends BasePage {
    //LOCATOR
    readonly locatorPaymentHeader : Locator
    readonly locatorPayConfirmOrderButton : Locator
    readonly locatorNameCardInput : Locator
    readonly locatorNumberCardInput : Locator
    readonly locatorCVCInput : Locator
    readonly locatorExpirationMonthInput : Locator
    readonly locatorExpirationYearInput : Locator
    readonly locatorSuccessOrderMessage : Locator
    //PAGE
    readonly done : PaymentDonePage

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorPaymentHeader = page.getByRole('heading', {name:'Payment'})
        this.locatorNameCardInput = page.getByTestId('name-on-card')
        this.locatorNumberCardInput = page.getByTestId('card-number')
        this.locatorCVCInput = page.getByTestId('cvc')
        this.locatorExpirationMonthInput = page.getByTestId('expiry-month')
        this.locatorExpirationYearInput = page.getByTestId('expiry-year')
        this.locatorPayConfirmOrderButton = page.getByRole('button', {name:'Pay and Confirm Order'})
        this.locatorSuccessOrderMessage = page.locator('#success_message')
        //PAGE
        this.done = new PaymentDonePage(page)
    }

    async expectPaymentPage(){
        await expect(this.page).toHaveURL('/payment')
        await expect(this.locatorPaymentHeader).toBeVisible()
    }

    async fillPaymentForm(card){
        await this.locatorNameCardInput.fill(card.name)
        await this.locatorNumberCardInput.fill(card.number)
        await this.locatorCVCInput.fill(card.cvc)
        await this.locatorExpirationMonthInput.fill(card.month)
        await this.locatorExpirationYearInput.fill(card.year)
        await this.locatorPayConfirmOrderButton.click()
    }

    async expectSuccessfullyOrder(){
        await expect(this.locatorSuccessOrderMessage).toContainText('Your order has been placed successfully!')
    }
}