import {test,expect} from '../fixtures/base.fixture'

test.describe('Page d\'accueil', () =>{
    test.beforeEach('Naviguer vers la page de connexion', async({home}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
    })

    test('Vérification du Scroll Up avec la flèche @regression', async ({home}) => {
        //Act
        await home.scrollDown()
        await expect(home.footer.locatorSubscriptionHeader).toBeVisible()
        await home.clickArrowScrollUp()
        //Assert
        await expect(home.locatorFullFledgedHeader).toBeInViewport()
    })

    test('Vérification du Scroll Up sans la flèche @regression', async ({home}) => {
        //Act
        await home.scrollDown()
        await expect(home.footer.locatorSubscriptionHeader).toBeVisible()
        await home.scrollUp()
        //Assert
        await expect(home.locatorFullFledgedHeader).toBeInViewport()
    })
})