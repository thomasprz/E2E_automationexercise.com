import { BasePage } from './base.page';
import {Page, Locator, expect} from '@playwright/test'
import { LoginPage } from './login.page';
import { AccountCreatedPage } from './account-created.page';
import { DeleteAccountPage } from './delete-account.page';

export class SignupPage extends BasePage {
    readonly locatorAccountHeader : Locator
    //ACCOUNT INFORMATION
    readonly locatorGender : Locator
    readonly locatorNameInput : Locator
    readonly locatorEmailInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorDayBirth : Locator
    readonly locatorMonthBirth : Locator
    readonly locatorYearBirth : Locator
    readonly locatorNewsletter : Locator
    readonly locatorSpecialOffers : Locator
    //ADDRESS INFORMATION
    readonly locatorFirstNameInput : Locator
    readonly locatorLastNameInput : Locator
    readonly locatorCompanyInput : Locator
    readonly locatorAddressInput : Locator
    readonly locatorAddress2Input : Locator
    readonly locatorCountry : Locator
    readonly locatorStateInput : Locator
    readonly locatorCityInput : Locator
    readonly locatorZipcodeInput : Locator
    readonly locatorMobileInput : Locator
    readonly locatorCreateAccountButton : Locator
    //PAGE
    readonly accountCreated : AccountCreatedPage
    readonly deleteAccount : DeleteAccountPage

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
        //ADDRESS INFORMATION
        this.locatorFirstNameInput = page.getByTestId('first_name')
        this.locatorLastNameInput = page.getByTestId('last_name')
        this.locatorCompanyInput = page.getByTestId('company')
        this.locatorAddressInput = page.getByTestId('address')
        this.locatorAddress2Input = page.getByTestId('address2')
        this.locatorCountry = page.getByTestId('country')
        this.locatorStateInput = page.getByTestId('state')
        this.locatorCityInput = page.getByTestId('city')
        this.locatorZipcodeInput = page.getByTestId('zipcode')
        this.locatorMobileInput = page.getByTestId('mobile_number')
        this.locatorCreateAccountButton = page.getByTestId('create-account')
        //PAGE
        this.accountCreated = new AccountCreatedPage(page)
        this.deleteAccount = new DeleteAccountPage(page)
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

    async fillAddressInformation(user){
        await this.locatorFirstNameInput.fill(user.firstname)
        await this.locatorLastNameInput.fill(user.lastname)
        await this.locatorCompanyInput.fill(user.company)
        await this.locatorAddressInput.fill(user.address)
        await this.locatorAddress2Input.fill(user.address2)
        await this.locatorCountry.selectOption(user.country)
        await this.locatorStateInput.fill(user.state)
        await this.locatorCityInput.fill(user.city)
        await this.locatorZipcodeInput.fill(user.zipcode)
        await this.locatorMobileInput.fill(user.mobile)
        await this.locatorCreateAccountButton.click()
    }
}