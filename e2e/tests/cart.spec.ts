import {test, expect} from '../fixtures/base.fixture'
import {fillSubscriptionFieldFaker} from '../factories/footer.factory'
import { privateDecrypt } from 'crypto'

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
        await expect(cart.locatorProduct).toHaveCount(2)
        await cart.expectProductsInCart(dataProducts)
    })

    test('Vérifier la quantité des produits dans le panier', async ({home, menu, cart,products}) => {
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
})