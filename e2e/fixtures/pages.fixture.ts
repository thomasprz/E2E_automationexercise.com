import {test as pagesTest} from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { SignupPage } from '../pages/signup.page'
import { RequestApiPage } from '../pages/api/api.page'
import { ContactPage } from '../pages/contact.page'
import { TestCasesPage } from '../pages/test-cases.page'
import { ProductsPage } from '../pages/products.page'

interface Pages {
    home : HomePage,
    login : LoginPage,
    signup : SignupPage,
    api: RequestApiPage
    contact : ContactPage
    testCases : TestCasesPage
    products: ProductsPage
}

export const pages = pagesTest.extend<Pages>({
    home: async({page}, use) => {
        await use(new HomePage(page))
    },
    login: async ({page}, use) => {
        await use(new LoginPage(page))
    },
    signup: async ({page}, use) => {
        await use(new SignupPage(page))
    },
    api: async ({request}, use) => {
        await use(new RequestApiPage(request))
    },
    contact: async ({page}, use) => {
        await use(new ContactPage(page))
    },
    testCases: async({page}, use) => {
        await use(new TestCasesPage(page))
    },
    products: async({page}, use) => {
        await use(new ProductsPage(page))
    },
})