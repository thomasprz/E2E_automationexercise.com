import {Page,Locator,expect} from '@playwright/test'
import { BasePage } from './base.page';

export class ContactPage extends BasePage{
    readonly locatorContactHeader : Locator
    readonly locatorNameInput : Locator
    readonly locatorEmailInput : Locator
    readonly locatorSubjectInput : Locator
    readonly locatorMessageInput : Locator
    readonly locatorUploadFile : Locator
    readonly locatorSubmitButton : Locator
    readonly locatorAcceptDialog : Locator
    readonly locatorSuccessMessage : Locator
    readonly locatorHomeButton : Locator

    constructor(page:Page){
        super(page)
        this.locatorContactHeader = page.getByRole('heading', {name:'Get In Touch'})
        this.locatorNameInput = page.getByTestId('name')
        this.locatorEmailInput = page.getByTestId('email')
        this.locatorSubjectInput = page.getByTestId('subject')
        this.locatorMessageInput = page.getByTestId('message')
        this.locatorUploadFile = page.locator('[name="upload_file"]')
        this.locatorSubmitButton = page.getByTestId('submit-button')
        this.locatorAcceptDialog = page.getByRole('button', { name: 'Submit' });
        this.locatorSuccessMessage = page.locator('.contact-form .alert-success')
        this.locatorHomeButton = page.locator('.btn-success')
    }

    async expectContactPage(){
        await expect(this.page).toHaveURL('/contact_us')
        await expect(this.locatorContactHeader).toBeVisible()
    }

    async fillContactUsForm(info){
        await this.locatorNameInput.fill(info.name)
        await this.locatorEmailInput.fill(info.email)
        await this.locatorSubjectInput.fill(info.subject)
        await this.locatorMessageInput.fill(info.message)
        await this.uploadFile()
        await this.locatorSubmitButton.click()
    }

    async uploadFile() {
        const filePath = 'e2e/test-data/contact/Logo.jpg';
        await this.locatorUploadFile.setInputFiles(filePath);
    }

    async dialogPopup() {
        this.page.on('dialog', (dialog) => {
          dialog.accept();
        }),
        await this.locatorAcceptDialog.click()
      }

    async clickHomeButton(){
        await this.locatorHomeButton.click()
    }

}


