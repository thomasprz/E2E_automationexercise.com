import {test, expect} from '../fixtures/base.fixture'
import {createSignupUserFaker} from '../factories/login.factory'
import {createAccountInformationFaker} from '../factories/signup.factory'
import {createAccountAddressInformationFaker} from '../factories/signup.factory'
import {commentAreaFaker} from '../factories/checkout.factory'
import {cardDataFaker} from '../factories/payment.factory'
import {createAccountUserApi} from '../factories/api.factory'


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
        //Assert
        await payment.done.expectPaymentDonePage()
        await payment.done.clickContinue()
    })

    test('Vérifier les détails de l\'adresse sur la page de paiement', async ({home, api, login,menu, products, cart, checkout}) => {
        //Arrange
        const userDataApi = createAccountUserApi()

        //Act
        await menu.visitSignupLogin()
        const response = await api.createUserAccountApi(userDataApi)
        const responseBody = await response.json()
        expect(response.status()).toBe(200)
        expect (responseBody.message).toBe('User created!')
        await login.fillLoginAccountForm(userDataApi)
        await menu.expectLoggedIn(userDataApi.name)
        await home.products.clickFirstAddToCart()
        await products.clickViewCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckout()
        await checkout.expectDeliveryAddress(userDataApi)
        await checkout.expectBillingyAddress(userDataApi)
        await checkout.menu.clickDeleteAccount()
        //Assert
        await login.deleteAccount.expectDeleteAccountPage()
        await login.deleteAccount.clickContinue()
    })

    test('Télécharger la facture après une commande', async ({home, cart, login, signup, checkout, payment}) => {
        //Arrange
        const userData = createSignupUserFaker()
        const userAccountData = createAccountInformationFaker()
        const userAdressData = createAccountAddressInformationFaker()
        const orderCommentData = commentAreaFaker()
        const paymentData = cardDataFaker()

        const productData = {
            name: 'Blue Top',
            price: 500,
            quantity: '1',
        }
        //Act
        await home.products.clickFirstAddToCart()
        await home.products.clickViewCart()
        await cart.expectCartPage()
        await cart.clickProceedToCheckoutAndLogin()
        await login.fillUserSignupForm(userData)
        await signup.fillAccountInformation(userAccountData)
        await signup.fillAddressInformation(userAdressData)
        await signup.accountCreated.expectAccountCreatedPage()
        await signup.accountCreated.clickContinue()
        await home.menu.expectLoggedIn(userData.name)
        await home.menu.visitCart()
        await cart.clickProceedToCheckout()
        await checkout.expectDeliveryAddress(userAdressData)
        await checkout.expectBillingyAddress(userAdressData)
        await checkout.expectReviewOrderOneProduct(productData)
        await checkout.fillCommentArea(orderCommentData)
        await checkout.clickPlaceOrder()
        await payment.fillPaymentForm(paymentData)
        await payment.done.clickDownloadInvoice()
        await payment.done.downloadInvoice()
        //Assert
        await payment.done.expectInvoiceInformation(userAdressData,productData)
        await payment.done.clickContinue()
        await home.menu.clickDeleteAccount()
        await signup.deleteAccount.expectDeleteAccountPage()
        await signup.deleteAccount.clickContinue()
    })
})