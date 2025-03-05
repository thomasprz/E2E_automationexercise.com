import {Locator, Page, expect} from '@playwright/test'
import { BasePage } from './base.page';

export class AccountCreatedPage extends BasePage {
    readonly locatorAccountCreatedHeader : Locator
    readonly locatorContinueButton : Locator

    constructor(page:Page){
        super(page, '/account_created')
        this.locatorAccountCreatedHeader = page.getByRole('heading', {name:'Account Created!'})
        this.locatorContinueButton = page.getByTestId('continue-button')
    }

    async expectAccountCreatedPage(){
        await expect(this.page).toHaveURL(this.url)
        await expect(this.locatorAccountCreatedHeader).toBeVisible()
    }

    async clickContinue(){
        await this.locatorContinueButton.click()
    }
}