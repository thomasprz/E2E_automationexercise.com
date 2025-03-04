import { BasePage } from './base.page';
import {Page, Locator, expect} from '@playwright/test'
import { LoginPage } from './login.page';

export class SignupPage extends BasePage {
    readonly locatorAccountHeader : Locator
    readonly locatorGender : Locator
    readonly locatorNameInput : Locator
    readonly locatorEmailInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorDayBirth : Locator
    readonly locatorMonthBirth : Locator
    readonly locatorYearBirth : Locator
    readonly locatorNewsletter : Locator
    readonly locatorSpecialOffers : Locator

    constructor(page:Page){
        super(page, "/signup")
        this.locatorAccountHeader = page.getByRole('heading', {name:'Enter Account Information'})
        //ACCOUNT INFORMATION
        this.locatorGender = page.getByLabel('Mr.')
        this.locatorNameInput = page.getByTestId('name')
        this.locatorEmailInput = page.getByTestId('email')
        this.locatorPasswordInput = page.getByTestId('password')
        this.locatorDayBirth = page.getByTestId('days')
        this.locatorMonthBirth = page.getByTestId('months')
        this.locatorYearBirth = page.getByTestId('years')
        this.locatorNewsletter = page.getByRole('checkbox', {name:'Sign up for our newsletter!'})
        this.locatorSpecialOffers = page.getByRole('checkbox', {name:'Receive special offers from our partners!'})
    }

    async expectSignupPage(){
        await expect(this.page).toHaveURL(this.url)
        await expect(this.locatorAccountHeader).toBeVisible()
    }

    async fillAccountInformation(user){
        await this.locatorGender.check()
        await this.locatorPasswordInput.fill(user.password)
        await this.locatorDayBirth.selectOption(user.day)
        await this.locatorMonthBirth.selectOption(user.month)
        await this.locatorYearBirth.selectOption(user.year)
        await this.locatorNewsletter.check()
        await this.locatorSpecialOffers.check()
    }
}