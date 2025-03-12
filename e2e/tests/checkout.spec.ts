import {test, expect} from '../fixtures/base.fixture'
import {createSignupUserFaker} from '../factories/login.factory'
import {createAccountInformationFaker} from '../factories/signup.factory'
import {createAccountAddressInformationFaker} from '../factories/signup.factory'
import {commentAreaFaker} from '../factories/checkout.factory'
import {cardDataFaker} from '../factories/payment.factory'
import { Configuration } from '../config/configuration'

test.describe("Processus de commande", {tag:'@regression'}, () => {
    test.beforeEach('Naviguer vers la page d\'accueil', async ({home}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
    })

    test('Vérifier que l\'utilisateur peut créer un compte pendant le processus de commande', async({menu, products, cart, login, signup, checkout, payment}) => {
        //Arrange
        const userData = createSignupUserFaker()
        const userAccountData = createAccountInformationFaker()
        const userAddressData = createAccountAddressInformationFaker()
        const textArea = commentAreaFaker()
        const cardData = cardDataFaker()
        const productData = {
            name: 'Blue Top',
            price: 500,
            quantity: '1',
        }
        //Act
        await menu.visitProducts()
        await products.clickAddToCart(0)
        await products.clickViewCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckoutAndLogin()
        await login.expectLoginPage()
        await login.fillUserSignupForm(userData)
        await signup.fillAccountInformation(userAccountData)
        await signup.fillAddressInformation(userAddressData)
        await signup.accountCreated.expectAccountCreatedPage()
        await signup.accountCreated.clickContinue()
        await menu.expectLoggedIn(userData.name)
        await menu.visitCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckout()
        await checkout.expectCheckoutPage()
        await checkout.expectDeliveryAddress(userAddressData)
        await checkout.expectReviewOrderOneProduct(productData)
        await checkout.fillCommentArea(textArea)
        await checkout.clickPlaceOrder()
        await payment.fillPaymentForm(cardData)
        await payment.done.expectPaymentDonePage()
        await payment.done.clickContinue()
        await menu.clickDeleteAccount()
        //Assert
        await signup.deleteAccount.expectDeleteAccountPage()
        await signup.deleteAccount.clickContinue()
    })

    test('Vérifier que l\'utilisateur peut créer un compte avant le processus de commande', async ({home,menu,login, signup, cart, checkout, payment}) => {
        //Arrange
        const userBaseData = createSignupUserFaker()
        const userInformationData = createAccountInformationFaker()
        const userAddressData = createAccountAddressInformationFaker()
        const textArea = commentAreaFaker()
        const cardData = cardDataFaker()
        const productData = {
            name: 'Blue Top',
            price: 500,
            quantity: '1',
        }
        //Act
        await menu.visitSignupLogin()
        await login.fillUserSignupForm(userBaseData)
        await signup.fillAccountInformation(userInformationData)
        await signup.fillAddressInformation(userAddressData)
        await signup.accountCreated.expectAccountCreatedPage()
        await signup.accountCreated.clickContinue()
        await menu.expectLoggedIn(userBaseData.name)
        await home.products.clickAddToCart(0)
        await home.products.clickViewCart()
        await cart.expectCartPage()
        await cart.expectCartPage()
        await cart.clickProceedToCheckout()
        await checkout.expectCheckoutPage()
        await checkout.expectDeliveryAddress(userAddressData)
        await checkout.expectReviewOrderOneProduct(productData)
        await checkout.fillCommentArea(textArea)
        await checkout.clickPlaceOrder()
        await payment.fillPaymentForm(cardData)
        await payment.done.expectPaymentDonePage()
        await payment.done.clickContinue()
        await menu.clickDeleteAccount()
        //Assert
        await signup.deleteAccount.expectDeleteAccountPage()
        await signup.deleteAccount.clickContinue()
    })

    test('Vérifier que l\'utilisateur peut se connecter avant le processus de commande', async ({home,menu,login, signup, cart, checkout, payment}) => {
        //Arrange
        const userBaseData = createSignupUserFaker()
        const userInformationData = createAccountInformationFaker()
        const userAddressData = createAccountAddressInformationFaker()
        const textArea = commentAreaFaker()
        const cardData = cardDataFaker()
        const productData = {
            name: 'Blue Top',
            price: 500,
            quantity: '1',
        }
        const loginUser = {
            email : userBaseData.email,
            password : userInformationData.password,
        }

        //Act
        await menu.visitSignupLogin()
        await login.fillUserSignupForm(userBaseData)
        await signup.fillAccountInformation(userInformationData)
        await signup.fillAddressInformation(userAddressData)
        await signup.accountCreated.clickContinue()
        await menu.clickLogout()
        await login.fillLoginAccountForm(loginUser)
        await menu.expectLoggedIn(userBaseData.name)
        await home.products.clickAddToCart(0)
        await home.products.clickViewCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckout()
        await checkout.expectCheckoutPage()
        await checkout.expectDeliveryAddress(userAddressData)
        await checkout.expectReviewOrderOneProduct(productData)
        await checkout.fillCommentArea(textArea)
        await checkout.clickPlaceOrder()
        await payment.fillPaymentForm(cardData)
        await payment.done.expectPaymentDonePage()
        await payment.done.clickContinue()
    })
})