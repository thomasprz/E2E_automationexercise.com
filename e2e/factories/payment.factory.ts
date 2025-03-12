import { faker } from "@faker-js/faker";

export function cardDataFaker(){
    return{
        name: faker.person.fullName(),
        number: faker.finance.creditCardNumber(),
        cvc: faker.finance.creditCardCVV(),
        month: faker.date.month(),
        year: faker.number.int({ min: 2026, max: 2028 }).toString(),
    }
}