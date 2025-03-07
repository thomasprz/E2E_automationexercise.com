import {test,expect} from '../fixtures/base.fixture'

test.describe('Page des Produits', {tag:'@regression'}, () =>{
    test.beforeEach('Naviguer vers la page de connexion', async({home, menu, products}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
        await menu.visitProducts()
        await products.expectProductsPage()
    })

    test('Vérifier l\'affichage de la page produits et de la page détail d\'un produit', async ({products}) => {
        //Act
        await expect(products.locatorAllProductsHeader).toBeVisible()
        await expect(products.locatorListItems).toBeVisible()
        await products.clickFirstViewProduct()
        //Assert
        await products.details.expectProductDetailsPage()
        await products.details.expectProductDetail()
    })

    test('Rechercher un produit', async ({products}) => {
        //Arrange
        const productData = {
            name: 'blue',
        }
        //Act
        await products.expectProductsPage()
        await expect(products.locatorAllProductsHeader).toBeVisible()
        await products.searchProduct(productData.name)
        await expect(products.locatorSearchedProductsHeader).toBeVisible()
        await products.expectSearchProduct(productData.name)
    })
})