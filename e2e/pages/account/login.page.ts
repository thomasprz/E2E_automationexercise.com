import { BasePage } from '../base.page';
import {Page, Locator, expect} from '@playwright/test'
import { DeleteAccountPage } from './delete-account.page';

export class LoginPage extends BasePage {
    //SIGNUP
    readonly locatorSignupHeader: Locator
    readonly locatorNameInput : Locator
    readonly locatorEmailInput : Locator
    readonly locatorSignupButton : Locator
    readonly locatorIncorrectMessageSignup : Locator
    //LOGIN
    readonly locatorLoginHeader: Locator
    readonly locatorloginButton : Locator
    readonly locatorEmailLoginInput : Locator
    readonly locatorPasswordInput : Locator
    readonly locatorIncorrectMessageLogin : Locator
    //PAGE
    readonly deleteAccount : DeleteAccountPage

    constructor(page:Page){
        super(page);
        //SIGNUP
        this.locatorSignupHeader = page.getByRole('heading', {name:'New User Signup!'})
        this.locatorNameInput = page.getByTestId('signup-name')
        this.locatorEmailInput = page.getByTestId('signup-email')
        this.locatorSignupButton = page.getByRole('button', {name: 'Signup'})
        this.locatorIncorrectMessageSignup = page.locator('.signup-form p')

        //LOGIN
        this.locatorLoginHeader = page.getByRole('heading', {name:'Login to your account'})
        this.locatorEmailLoginInput = page.getByTestId('login-email')
        this.locatorPasswordInput =  page.getByTestId('login-password')
        this.locatorloginButton =  page.getByTestId('login-button')
        this.locatorIncorrectMessageLogin = page.locator('.login-form p')
        //PAGE
        this.deleteAccount = new DeleteAccountPage(page)
    }

    async expectLoginPage(){
        await expect(this.page).toHaveURL('/login')
        await expect(this.locatorSignupHeader).toBeVisible()
        await expect(this.locatorLoginHeader).toBeVisible()
    }

    async fillUserSignupForm(user){
        await this.locatorNameInput.fill(user.name)
        await this.locatorEmailInput.fill(user.email)
        await this.locatorSignupButton.click()
    }

    async fillLoginAccountForm(user){
        await this.locatorEmailLoginInput.fill(user.email)
        await this.locatorPasswordInput.fill(user.password)
        await this.locatorloginButton.click()
    }
}