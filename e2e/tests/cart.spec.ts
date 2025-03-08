import {test, expect} from '../fixtures/base.fixture'
import {fillSubscriptionFieldFaker} from '../factories/footer.factory'

test.describe('Panier', {tag:'@regression'}, () => {

    test.beforeEach('Naviguer vers la page d\'accueil', async ({home, menu, cart}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
        await menu.visitCart()
        await cart.expectCartPage()
    })

    test('Vérifier l\'abonnement sur la page du panier', async ({cart}) =>{
        //Arrange
        const userEmailData = fillSubscriptionFieldFaker()

        //Act
        await cart.scrollDown()
        await expect(cart.footer.locatorSubscriptionHeader).toBeVisible()
        await cart.footer.fillSubscriptionField(userEmailData.email)
        await cart.footer.expectSucessfullySubscription()
    })
})