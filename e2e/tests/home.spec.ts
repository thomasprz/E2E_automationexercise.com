import {test,expect} from '../fixtures/base.fixture'

test.describe('Page d\'accueil', {tag:'@regression'}, () =>{
    test.beforeEach('Naviguer vers la page de connexion', async({home}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
    })

    test('Vérification du Scroll Up avec la flèche', async ({home}) => {
        //Act
        await home.scrollDown()
        await expect(home.footer.locatorSubscriptionHeader).toBeVisible()
        await home.clickArrowScrollUp()
        //Assert
        await expect(home.locatorFullFledgedHeader).toBeInViewport()
    })

    test('Vérification du Scroll Up sans la flèche', async ({home}) => {
        //Act
        await home.scrollDown()
        await expect(home.footer.locatorSubscriptionHeader).toBeVisible()
        await home.scrollUp()
        //Assert
        await expect(home.locatorFullFledgedHeader).toBeInViewport()
    })
})