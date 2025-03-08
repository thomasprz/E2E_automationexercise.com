import { faker } from "@faker-js/faker";

export function fillSubscriptionFieldFaker(){
    return{
        email: faker.internet.email(),
    }
}