import { BasePage } from './base.page';
import {Page, Locator, expect} from '@playwright/test'

export class RegisterPage extends BasePage {


    constructor(page:Page){
        super(page, "/signup")

    }
}