import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../base.page';

export class PaymentDonePage extends BasePage{
    readonly locatorOrderPlacedHeader : Locator
    readonly locatorDownloadInvoiceButton : Locator
    readonly locatorContinueButton : Locator


    constructor(page:Page){
        super(page)
        this.locatorOrderPlacedHeader = page.getByRole('heading', {name:'Order Placed!'})
        this.locatorDownloadInvoiceButton = page.getByRole('link', {name:'Download Invoice'})
        this.locatorContinueButton = page.getByTestId('continue-button')
    }

    async expectPaymentDonePage(){
        await expect(this.page).toHaveURL(/payment_done/)
        await expect(this.locatorOrderPlacedHeader).toBeVisible()
    }

    async clickContinue(){
        await this.locatorContinueButton.click()
    }

    async clickDownloadInvoice(){
        await this.locatorDownloadInvoiceButton.click()
    }
}