import {test as pagesTest} from '@playwright/test'
import { HomePage } from '../pages/home.page'
import { LoginPage } from '../pages/login.page'
import { RegisterPage } from '../pages/register.page'

interface Pages {
    home : HomePage,
    login : LoginPage,
    register : RegisterPage,
}

export const pages = pagesTest.extend<Pages>({
    home: async({page}, use) => {
        await use(new HomePage(page))
    },
    login: async ({page}, use) => {
        await use(new LoginPage(page))
    },
    register: async ({page}, use) => {
        await use(new RegisterPage(page))
    }
})