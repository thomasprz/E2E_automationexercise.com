import {Page, Locator, expect} from '@playwright/test'
import { BasePage } from '../base.page';

export class ProductDetailsPage extends BasePage {
    readonly locatorProductName : Locator
    readonly locatorCategoryProduct : Locator
    readonly locatorPriceProduct : Locator
    readonly locatorAvailabilityProduct : Locator
    readonly locatorConditionProduct : Locator
    readonly locatorBrandProduct : Locator
    readonly locatorquantityInput : Locator
    readonly locatorAddToCartButton : Locator
    readonly locatorContinueShoppingButton : Locator
    readonly locatorViewCart : Locator
    readonly locatorWriteYourReviewHeader : Locator
    readonly locatorNameInput : Locator
    readonly locatorEmailInput : Locator
    readonly locatorReviewMessageInput : Locator
    readonly locatorSubmitButton : Locator
    readonly locatorAlertSuccess : Locator

    constructor(page:Page,){
        super(page)
        this.locatorProductName = page.locator('.product-information h2')
        this.locatorCategoryProduct = page.locator('.product-information p:has-text("Category:")');
        this.locatorPriceProduct = page.locator('.product-information span:has-text("Rs.")');
        this.locatorAvailabilityProduct = page.locator('.product-information p:has-text("Availability:")');
        this.locatorConditionProduct = page.locator('.product-information p:has-text("Condition:")');
        this.locatorBrandProduct = page.locator('.product-information p:has-text("Brand:")');
        this.locatorquantityInput = page.locator('#quantity')
        this.locatorAddToCartButton = page.getByRole('button', {name:' Add to cart'})
        this.locatorContinueShoppingButton = page.getByRole('button', {name:"Continue Shopping"})
        this.locatorViewCart = page.getByRole('link', {name:'View Cart'})
        this.locatorWriteYourReviewHeader = page.getByRole('link', {name:'Write Your Review'})
        this.locatorNameInput = page.locator('#name')
        this.locatorEmailInput = page.locator('#email')
        this.locatorReviewMessageInput = page.locator('#review')
        this.locatorSubmitButton =page.getByRole('button', {name:"Submit"})
        this.locatorAlertSuccess = page.locator('#review-section .alert-success')
    }

    async expectProductDetailsPage(){
        await expect(this.page).toHaveURL(/product_details/);
    }

    async expectProductDetail(){
        await expect(this.locatorProductName).toBeVisible()
        await expect(this.locatorCategoryProduct).toBeVisible()
        await expect(this.locatorPriceProduct.first()).toBeVisible()
        await expect(this.locatorAvailabilityProduct).toBeVisible()
        await expect(this.locatorConditionProduct).toBeVisible()
        await expect(this.locatorBrandProduct).toBeVisible()
    }

    async fillQuantityProduct(quantity){
        await this.locatorquantityInput.fill(quantity)
    }

    async AddProductToCartContinueShopping(){
        await this.locatorAddToCartButton.click()
        await this.locatorContinueShoppingButton.click()
    }
    async AddProductToCartViewCart(){
        await this.locatorAddToCartButton.click()
        await this.locatorViewCart.click()
    }

    async fillReviewProductForm(review){
        await this.locatorNameInput.fill(review.name)
        await this.locatorEmailInput.fill(review.email)
        await this.locatorReviewMessageInput.fill(review.message)
        await this.locatorSubmitButton.click()
    }
}