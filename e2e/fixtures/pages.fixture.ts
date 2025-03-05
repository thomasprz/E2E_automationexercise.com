import {test as pagesTest} from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { SignupPage } from '../pages/signup.page'
import { RequestApiPage } from '../pages/api/api.page'

interface Pages {
    home : HomePage,
    login : LoginPage,
    signup : SignupPage,
    api: RequestApiPage
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
})