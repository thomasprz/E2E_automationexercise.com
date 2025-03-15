import {test,expect} from '../fixtures/base.fixture'
import {reviewProductFaker} from '../factories/product-details.factory'

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
        //Assert
        await products.expectSearchProduct(productData.name)
    })

    test('Afficher les produits d\'une catégorie', async ({products}) => {
        //Arrange
        const firstProductData = {
            category : "Women",
            product : "Dress",
            title :'Women - Dress Products',
        }
        const secondProductData = {
            category: 'Men',
            product: 'Jeans',
            title: 'Men - Jeans Products',
        }
        //Act
        await expect(products.sidebar.locatorCategoryHeading).toBeVisible()
        await products.sidebar.clickOnCategory(firstProductData.category)
        await products.sidebar.clickOnProduct(firstProductData.product)
        await products.category.expectCategoryProductsPage()
        await products.category.expectCategoryHeader(firstProductData.title)
        await products.category.sidebar.clickOnCategory(secondProductData.category)
        await products.category.sidebar.clickOnProduct(secondProductData.product)
        //Assert
        await products.category.expectCategoryProductsPage()
        await products.category.expectCategoryHeader(secondProductData.title) 
    })

    test('Afficher les produits par marques', async ({products}) => {
        //Arrange
        const brandFirstProductData = {
            brand : "Biba",
            title : 'Brand - Biba Products',
        }
        const brandSecondProductData = {
            brand : "Babyhug",
            title : 'Brand - Babyhug Products',
        }
        //Act
        await expect(products.sidebar.locatorBrandsHeading).toBeVisible()
        await products.sidebar.clickOnBrand(brandFirstProductData.brand)
        await products.brand.expectBrandProductsPage(brandFirstProductData.brand)
        await products.brand.expectBrandHeader(brandFirstProductData.title)
        await products.brand.sidebar.clickOnBrand(brandSecondProductData.brand)
        await products.brand.expectBrandProductsPage(brandSecondProductData.brand)
        await products.brand.expectBrandHeader(brandSecondProductData.title)
        //Assert
        await expect(products.brand.locatorProductsItems).toHaveCount(4)
    })

    test('Ajouter un avis sur un produit', async ({products}) => {
        //Arrange
        const reviewData = reviewProductFaker()
        //Act
        await products.clickFirstViewProduct()
        await expect(products.details.locatorWriteYourReviewHeader).toBeVisible()
        await products.details.fillReviewProductForm(reviewData)
        //Assert
        await expect(products.details.locatorAlertSuccess).toBeVisible()
        await expect(products.details.locatorAlertSuccess).toHaveText('Thank you for your review.')
    })
})