import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../base.page';

export class DeleteAccountPage extends BasePage {
    //LOCATOR
    readonly locatorAccountDeletedHeader: Locator
    readonly locatorContinueButton : Locator

    constructor(page:Page){
        super(page)
        //LOCATOR
        this.locatorAccountDeletedHeader = page.getByRole('heading', {name:'Account Deleted!'})
        this.locatorContinueButton = page.getByTestId('continue-button')
    }

    async expectDeleteAccountPage(){
        await expect(this.page).toHaveURL('/delete_account')
        await expect(this.locatorAccountDeletedHeader).toBeVisible()
    }

    async clickContinue(){
        await this.locatorContinueButton.click()
    }
}