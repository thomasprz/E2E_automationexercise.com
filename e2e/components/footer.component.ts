import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../pages/base.page'
import { SignupPage } from '../pages/account/signup.page'
import { HomePage } from '../pages/home.page'

export class FooterComponent {
    readonly page : Page
    readonly locatorSubscriptionHeader : Locator
    readonly locatorEmailSubscribeInput : Locator
    readonly locatorSubscribeButton : Locator
    readonly locatorSuccessfullySubscribedMessage : Locator

    constructor(page:Page){
        this.page = page // MenuComponent n'a pas besoin d'utiliser les fonctionnalités de BasePage (comme la navigation vers une URL), donc supprimer l'appel à super(page) et ne pas hériter de BasePage.
        this.locatorSubscriptionHeader = page.getByRole('heading', {name:'Subscription'})
        this.locatorEmailSubscribeInput = page.locator('#susbscribe_email')
        this.locatorSubscribeButton = page.locator('#subscribe')
        this.locatorSuccessfullySubscribedMessage = page.locator('.alert-success')
    }

    async fillSubscriptionField(email){
        await this.locatorEmailSubscribeInput.fill(email)
        await this.locatorSubscribeButton.click()
    }

    async expectSucessfullySubscription(){
    await expect(this.locatorSuccessfullySubscribedMessage).toBeVisible
    await expect(this.locatorSuccessfullySubscribedMessage).toContainText('You have been successfully subscribed!')
    }
}