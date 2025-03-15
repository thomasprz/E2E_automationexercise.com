import {test, expect} from '../fixtures/base.fixture'
import {fillSubscriptionFieldFaker} from '../factories/footer.factory'
import { Configuration } from '../config/configuration'

test.describe('Panier', {tag:'@regression'}, () => {

    test.beforeEach('Naviguer vers la page d\'accueil', async ({home, menu, cart}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
    })

    test('Vérifier l\'abonnement sur la page du panier', async ({cart, menu}) =>{
        //Arrange
        const userEmailData = fillSubscriptionFieldFaker()
        //Act
        await menu.visitCart()
        await cart.expectCartPage()
        await cart.scrollDown()
        await expect(cart.footer.locatorSubscriptionHeader).toBeVisible()
        await cart.footer.fillSubscriptionField(userEmailData.email)
        //Assert
        await cart.footer.expectSucessfullySubscription()
    })

    test('Ajouter des produits au panier', async ({cart, menu, products}) => {
        //Arrange
        const dataProducts = [
            {
                id: 0,
                name: "Blue Top",
                price: 500,
                quantity: "1",
            },
            {
                id: 2,
                name: "Men Tshirt", 
                price: 400,
                quantity: "1",
            }
        ];
        //Act
        await menu.visitProducts()
        await products.clickAddToCart(dataProducts[0].id)
        await products.clickContinueShopping()
        await products.clickAddToCart(dataProducts[1].id)
        await products.clickViewCart()
        //Assert
        await expect(cart.locatorProduct).toHaveCount(2)
        await cart.expectProductsInCart(dataProducts)
    })

    test('Vérifier la quantité des produits dans le panier', async ({menu, cart,products}) => {
        //Arrange
        const dataProduct = {
            id:4,
            name: 'Winter Top',
            price: 600,
            quantity: '4',
        }
        //Act
        await menu.visitProducts()
        await products.clickViewProduct(dataProduct.id)
        await products.details.expectProductDetailsPage()
        await products.details.fillQuantityProduct(dataProduct.quantity)
        await products.details.AddProductToCartViewCart()
        //Assert
        await cart.expectOneProductInCart(dataProduct)
    })

    test('Supprimer un produit et vérifier que le panier est vide', async ({cart, home}) => {
         //Arrange
        const product = {
            id:4,
            name: 'Winter Top',
            price: 600,
            quantity: '4',
        }
        //Act
        await home.products.clickAddToCart(product.id)
        await home.products.clickViewCart()
        await cart.expectCartPage()
        await cart.removeOneProduct()
        //Assert
        await cart.expectEmptyCart()
    })

    test('Supprimer un produit et vérifier que le panier contient un produit de moins', async ({cart, home}) => {
        //Arrange
        const productFirst = [{
            id:4,
            name: 'Sleeveless Dress',
            price: 1000,
            quantity: '1',
        },
        {
            id: 0,
            name: "Blue Top",
            price: 500,
            quantity: "1",
        }]
        //Act
        await home.products.clickAddToCart(productFirst[0].id)
        await home.products.clickContinueShopping()
        await home.products.clickAddToCart(productFirst[1].id)
        await home.products.clickViewCart()
        await cart.expectCartPage()
        //Assert
        await cart.removeOneProductExpectOneProductLessInCart(productFirst[0].name)
    })

    test('Rechercher des produits et vérifier le panier après connexion', async ({home, products, cart, login}) => {
        //Arrange
        const productData = {
            name: 'Frozen Tops For Kids',
            price: 278,
            quantity: '1',
        }
        const userLoginData = {
            email: Configuration.email, 
            password: Configuration.password,
            username: Configuration.username
        };        
        //Act
        await home.menu.visitSignupLogin()
        await login.fillLoginAccountForm(userLoginData)
        await home.menu.expectLoggedIn(userLoginData.username)
        await home.menu.visitCart()
        await cart.cleanCartPage()
        await cart.menu.clickLogout()
        await cart.menu.visitProducts()
        await expect(products.locatorAllProductsHeader).toBeVisible()
        await products.searchProduct(productData.name)
        await products.expectSearchProduct(productData.name)
        await products.addProductsFromSearchToCart()
        await products.menu.visitCart()
        await cart.expectOneProductInCart(productData)
        await cart.menu.visitSignupLogin()
        await login.fillLoginAccountForm(userLoginData)
        await home.menu.expectLoggedIn(userLoginData.username)
        await home.menu.visitCart()
        //Assert
        await cart.expectOneProductInCart(productData)
    })

    test('Ajouter au panier à partir des articles recommandés', async ({home, cart}) => {
        await home.scrollDown()
        await expect(home.locatorRecommendedItemsHeader).toBeVisible()
        await home.addRecommendedProductToCart()
        await cart.expectCartPage()
        //Assert
        await expect(cart.locatorProduct).toBeVisible()
        await expect(cart.locatorProduct).toHaveCount(1)
    })

})