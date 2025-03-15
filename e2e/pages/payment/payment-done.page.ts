import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from '../base.page';
import * as fs from 'fs';

export class PaymentDonePage extends BasePage{
    //LOCATOR
    readonly locatorOrderPlacedHeader : Locator
    readonly locatorDownloadInvoiceButton : Locator
    readonly locatorContinueButton : Locator


    constructor(page:Page){
        super(page)
        //LOCATOR
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
        const downloadPromise = this.page.waitForEvent('download');
        await this.locatorDownloadInvoiceButton.click();
        const download = await downloadPromise;
        if (download) {
          await download.saveAs('./e2e/download/invoice/invoice.txt');
          console.log('Fichier correctement téléchargé');
        } else {
          console.log('Erreur téléchargement du fichier');
        }
      }

      async expectInvoiceInformation(order, total){
        const invoice =  `Hi ${order.firstname} ${order.lastname}, Your total purchase amount is ${total.price}. Thank you`
        const fileContent = fs.readFileSync('./e2e/download/invoice/invoice.txt', 'utf8');
        expect(fileContent).toContain(invoice);
        fs.unlinkSync('./e2e/download/invoice/invoice.txt');
    }
}