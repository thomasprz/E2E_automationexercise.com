import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from './base.page';

export class TestCasesPage extends BasePage{
    //LOCATOR
    readonly locatorTestCasesHeader : Locator

    constructor(page:Page){
    super(page)
    //LOCATOR
    this.locatorTestCasesHeader = page.getByRole('heading', {name:'Test Cases', exact: true })
    }

    async expectTestCasesPage(){
        await expect(this.page).toHaveURL('/test_cases')
    }
}