import { BasePage } from './base.page';
import {Page, Locator, expect} from '@playwright/test'

export class LoginPage extends BasePage {


    constructor(page:Page){
        super(page, "/login");    


    }
}