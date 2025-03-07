import {test,expect} from '../fixtures/base.fixture'

test.describe('Test Cases', {tag:'@regression'}, () => {
    test.beforeEach('Naviguer vers la page principale', async ({home}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
    })

    test('Vérifier l\'affichage de la page des cas de test', async ({menu, testCases}) => {
        //Act
        await menu.visitTestCases()
        //Assert
        await testCases.expectTestCasesPage()
        await expect(testCases.locatorTestCasesHeader).toBeVisible()
    })
})