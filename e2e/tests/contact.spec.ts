import {test,expect} from '../fixtures/base.fixture'
import {formContactDataFaker} from '../factories/contact.factory'

test.describe('Contact', {tag: "@regression"}, () => {
    test.beforeEach('Naviguer vers la page de ontact', async ({home, menu, contact}) => {
        await home.goTo()
        await home.popup()
        await home.expectHomepage()
        await menu.visitContactUs()
        await contact.expectContactPage()
    })

    test('Saisie du formulaire de contact', async ({contact, home}) => {
    //Arrange
    const userInfo = formContactDataFaker()

    //Act
    await contact.fillContactUsForm(userInfo)
    await contact.dialogPopup()
    await expect(contact.locatorSuccessMessage).toBeVisible()
    await contact.clickHomeButton()
    await home.expectHomepage()
    })
})