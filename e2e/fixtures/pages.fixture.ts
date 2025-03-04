import {test as pagesTest} from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { SignupPage } from '../pages/signup.page'

interface Pages {
    home : HomePage,
    login : LoginPage,
    signup : SignupPage,
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
    }
})