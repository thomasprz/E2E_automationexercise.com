import {test, expect} from '../fixtures/base.fixture' //Importation des fixtures pour ne pas devoir importer toutes les pages.

test.describe('Login', {tag: '@regression'}, () => {
    test.beforeEach('Naviguer vers la page de connexion', async ({login}) => {
        await login.goTo();
    })

    test('Login User with correct email and password', async ({login}) => {
    })
})