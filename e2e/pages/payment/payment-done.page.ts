import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../base.page';
import * as fs from 'fs';

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

    async downloadInvoice() {
        await this.locatorDownloadInvoiceButton.click();
        const download = await this.page.waitForEvent('download');
        if (download) {
          await download.saveAs('./e2e/download/invoice/invoice.txt');
          console.log('Fichier téléchargé.');
        } else {
          console.log('Erreur téléchargement du fichier.');
        }
      }

    async expectInvoiceInformation(order, total){
        const invoice =  `Hi ${order.firstname} ${order.lastname}, Your total purchase amount is ${total.price}. Thank you`
        const fileContent = fs.readFileSync(('e2e/download/invoice/invoice.txt'), 'utf8');
        expect(fileContent).toContain(invoice);
    }
}