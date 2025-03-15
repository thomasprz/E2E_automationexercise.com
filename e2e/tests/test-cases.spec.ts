import {test,expect} from '../fixtures/base.fixture'

test.describe('Test Cases', () => {
    test.beforeEach('Naviguer vers la page principale @regression', async ({home}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
    })

    test('Vérifier l\'affichage de la page des cas de test @regression', async ({menu, testCases}) => {
        //Act
        await menu.visitTestCases()
        //Assert
        await testCases.expectTestCasesPage()
        await expect(testCases.locatorTestCasesHeader).toBeVisible()
    })
})