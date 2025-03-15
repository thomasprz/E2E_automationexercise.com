import {test, expect} from '../fixtures/base.fixture'
import {createSignupUserFaker} from '../factories/login.factory'
import {createAccountInformationFaker} from '../factories/signup.factory'
import {createAccountAddressInformationFaker} from '../factories/signup.factory'
import { Configuration } from '../config/configuration'

test.describe('Inscription', () => {
    test.beforeEach('Naviguer vers la page de connexion', async ({home, menu, login}) => {
        await home.goTo()
        await login.popup()
        await home.expectHomepage()
        await menu.visitSignupLogin()
        await login.expectLoginPage()
    })

    test('Inscription utilisateur @smoke', async  ({home, login, signup, menu}) => {
        //Arrange
        const userData = createSignupUserFaker()
        const userInformation = createAccountInformationFaker()
        const userAddressInformation = createAccountAddressInformationFaker()
        //Act
        await login.fillUserSignupForm(userData)
        await signup.expectSignupPage()
        await signup.fillAccountInformation(userInformation)
        await signup.fillAddressInformation(userAddressInformation)
        await signup.accountCreated.expectAccountCreatedPage()
        await signup.accountCreated.clickContinue()
        await menu.expectLoggedIn(userData.name)
        await menu.clickDeleteAccount()
        //Assert
        await signup.deleteAccount.expectDeleteAccountPage()
        await signup.deleteAccount.clickContinue()
        await home.expectHomepage()
    })

    test("Inscription d'un utilisateur avec un e-mail existant @regression", async ({login}) => {
        //Arrange
        const userData = {
            name: Configuration.username,
            email : Configuration.email
        }
        //Act
        await login.fillUserSignupForm(userData)
        await expect(login.locatorIncorrectMessageSignup).toBeVisible()
    })
})