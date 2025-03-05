import {APIRequestContext} from "@playwright/test";
import { createAccountInformationFaker, createAccountAddressInformationFaker } from "../../factories/signup.factory";
import {createSignupUserFaker} from '../../factories/login.factory'
import { expect } from "@playwright/test";

export class RequestApiPage {
    readonly request : APIRequestContext


    constructor(request:APIRequestContext){
        this.request=request
    }

    async createUserAccountApi(user){
        return this.request.post('/api/createAccount', {
            form: {
              name: user.name,
              email: user.email,
              password: user.password,
              title: user.title,
              birth_date: user.birth_date,
              birth_month: user.birth_month,
              birth_year: user.birth_year,
              firstname: user.firstname,
              lastname: user.lastname,
              company: user.company,
              address1: user.address1,
              address2: user.address2,
              country: user.country,
              zipcode: user.zipcode,
              state: user.state,
              city: user.city,
              mobile_number: user.mobile_number,
            },
          });
        }
}