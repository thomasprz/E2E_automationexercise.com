import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../pages/base.page'
import { SignupPage } from '../pages/signup.page'
import { HomePage } from '../pages/home.page'

export class MenuComponent {
    readonly page : Page
    readonly home : Locator
    readonly products : Locator
    readonly cart : Locator
    readonly signupLogin : Locator
    readonly testCases : Locator
    readonly apiTesting : Locator
    readonly videoTutorials : Locator
    readonly contactUs : Locator

    constructor(page:Page){
        this.page = page // MenuComponent n'a pas besoin d'utiliser les fonctionnalités de BasePage (comme la navigation vers une URL), donc supprimer l'appel à super(page) et ne pas hériter de BasePage.
        this.home = page.getByRole('link', {name:'Home'})
        this.signupLogin = page.getByRole('link', {name: ' Signup / Login'})
    }

    async visitHome(){
        await this.home.click()
        return new HomePage(this.page) // Retourne une instance de HomePage.
    }

    async visitSignupLogin(){
        await this.signupLogin.click()
        return new SignupPage(this.page)
    }
}