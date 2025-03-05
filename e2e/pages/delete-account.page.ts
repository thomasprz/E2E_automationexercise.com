import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';

export class DeleteAccountPage extends BasePage {
    readonly locatorAccountDeletedHeader: Locator
    readonly locatorContinueButton : Locator

    constructor(page:Page){
        super(page, '/delete_account')
        this.locatorAccountDeletedHeader = page.getByRole('heading', {name:'Account Deleted!'})
        this.locatorContinueButton = page.getByTestId('continue-button')
    }

    async expectDeleteAccountPage(){
        await expect(this.page).toHaveURL(this.url)
    }

    async clickContinue(){
        await this.locatorContinueButton.click()
    }
}