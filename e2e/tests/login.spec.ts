import {test, expect} from '../fixtures/base.fixture'
import {createAccountUserApi} from '../factories/api.factory'
import {loginToAccountFaker} from '../factories/login.factory'
import { Configuration } from '../config/configuration'

test.describe('Connexion', {tag:'@regression'}, () => {
    test.beforeEach('Naviguer vers la page de connexion', async ({home, menu, login}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
        await menu.visitSignupLogin()
        await login.expectLoginPage()
    })

    test("Connexion de l'utilisateur avec un email et un mot de passe corrects", async ({api, login, menu}) => {
        //Arrange
        const userDataApi = createAccountUserApi();
        //Act
        const response = await api.createUserAccountApi(userDataApi)
        const responseBody = await response.json()
        expect(response.status()).toBe(200)
        expect (responseBody.message).toBe('User created!')
        await login.fillLoginAccountForm(userDataApi)
        await menu.expectLoggedIn(userDataApi.name)
        await menu.clickDeleteAccount()
        //Assert
        await login.deleteAccount.expectDeleteAccountPage()
    })

    test("Connexion d'un utilisateur avec un email et un mot de passe incorrects", async ({login}) => {
        //Arrange
        const loginUserData = loginToAccountFaker()
        //Act
        await login.fillLoginAccountForm(loginUserData)
        //Assert
        await expect(login.locatorIncorrectMessageLogin).toBeVisible()
    })

    test("Déconnexion de l'utilisateur", async ({login, menu}) => {
        //Arrange
        const user = {
            email: Configuration.email, 
            password: Configuration.password,
            username: Configuration.username
        };
        //Act
        await login.fillLoginAccountForm(user)
        await menu.expectLoggedIn(user.username)
        await menu.clickLogout()
        //Assert
        await login.expectLoginPage()
    })
})
