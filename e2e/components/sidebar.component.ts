import {Page,Locator,expect} from '@playwright/test'

export class SidebarComponent {
    readonly page : Page
    readonly locatorCategoryHeading : Locator
    readonly locatorBrandsHeading : Locator

    constructor(page:Page){
        this.page = page
        this.locatorCategoryHeading = page.getByRole('heading', {name:'Category'})
        this.locatorBrandsHeading =  page.getByRole('heading', {name:'Brands'})

    }
    async clickOnCategory(category){
        await this.page.getByRole('link', { name: ` ${category}` }).click()
    }

    async clickOnProduct(product){
        await this.page.getByRole('link', {name:product}).click()
    }

    async clickOnBrand(brand){
        await this.page.getByRole('link', {name:brand}).click()
    }
}