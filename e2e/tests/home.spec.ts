import {test, expect} from '../fixtures/base.fixture'
import {fillSubscriptionFieldFaker} from '../factories/footer.factory'

test.describe('Page d\'accueil', {tag:'@regression'}, () => {

    test.beforeEach('Naviguer vers la page d\'accueil', async ({home}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
    })

    test('Vérifier l\'abonnement sur la page d\'accueil', async ({home}) =>{
        //Arrange
        const userEmailData = fillSubscriptionFieldFaker()

        //Act
        await home.scrollDown()
        await expect(home.footer.locatorSubscriptionHeader).toBeVisible()
        await home.footer.fillSubscriptionField(userEmailData.email)
        await home.footer.expectSucessfullySubscription()
    })
})