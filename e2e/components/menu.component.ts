import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../pages/base.page'
import { SignupPage } from '../pages/signup.page'
import { HomePage } from '../pages/home.page'

export class MenuComponent {
    readonly page : Page
    readonly locatorhome : Locator
    readonly locatorproducts : Locator
    readonly locatorcart : Locator
    readonly locatorlogout : Locator
    readonly locatordeleteAccount : Locator
    readonly locatorsignupLogin : Locator
    readonly locatortestCases : Locator
    readonly locatorapiTesting : Locator
    readonly locatorvideoTutorials : Locator
    readonly locatorcontactUs : Locator

    constructor(page:Page){
        this.page = page // MenuComponent n'a pas besoin d'utiliser les fonctionnalités de BasePage (comme la navigation vers une URL), donc supprimer l'appel à super(page) et ne pas hériter de BasePage.
        this.locatorhome = page.getByRole('link', {name:'Home'})
        this.locatorproducts = page.getByRole('link', {name: ' Products'})
        this.locatorsignupLogin = page.getByRole('link', {name: ' Signup / Login'})
        this.locatorlogout = page.getByRole('link', {name:' Logout'})
        this.locatordeleteAccount = page.getByRole('link', {name:' Delete Account'})
        this.locatortestCases = page.getByRole('link', {name:' Test Cases',  exact: true})
        this.locatorcontactUs = page.getByRole('link', {name:' Contact us'})
    }

    async visitHome(){
        await this.locatorhome.click()
    }
    async visitProducts(){
        await this.locatorproducts.click()
    }
    async visitSignupLogin(){
        await this.locatorsignupLogin.click()
    }
    async expectLoggedIn(username){
        await expect(this.page.getByRole('listitem').filter({ hasText: `Logged in as ${username}`})).toBeVisible()
    }
    async clickDeleteAccount(){
        await this.locatordeleteAccount.click()
    }
    async clickLogout(){
        await this.locatorlogout.click()
    }
    async visitContactUs(){
        await this.locatorcontactUs.click()
    }
    async visitTestCases(){
        await this.locatortestCases.click()
    }
}