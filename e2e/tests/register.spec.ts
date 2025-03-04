import {test, expect} from '../fixtures/base.fixture'
import {createSignupUserFaker} from '../factories/login.factory'
import {createAccountInformationFaker} from '../factories/signup.factory'

test.describe('Inscription', {tag:'@regression'}, () => {
    test.beforeEach('Naviguer vers la page de connexion', async ({home, menu, login}) => {
        await home.goTo()
        await login.popup()
        await home.expectHomepage()
        await menu.visitSignupLogin()
        await login.expectLoginPage()
    })

    test('Inscription utilisateur', async ({login, signup}) => {
        //Arrange
        const userData = createSignupUserFaker()
        const userInformation = createAccountInformationFaker()
        //Act
        await login.fillUserSignupForm(userData)
        await signup.expectSignupPage()
        await signup.fillAccountInformation(userInformation)
        //Assert
    })
})