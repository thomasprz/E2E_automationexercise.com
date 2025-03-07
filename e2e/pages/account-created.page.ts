import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page';

export class AccountCreatedPage extends BasePage {
    readonly locatorAccountCreatedHeader : Locator
    readonly locatorContinueButton : Locator

    constructor(page:Page){
        super(page)
        this.locatorAccountCreatedHeader = page.getByRole('heading', {name:'Account Created!'})
        this.locatorContinueButton = page.getByTestId('continue-button')
    }

    async expectAccountCreatedPage(){
        await expect(this.page).toHaveURL('/account_created')
        await expect(this.locatorAccountCreatedHeader).toBeVisible()
    }

    async clickContinue(){
        await this.locatorContinueButton.click()
    }
}