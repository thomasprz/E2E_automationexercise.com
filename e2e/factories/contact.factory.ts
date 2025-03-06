import { faker } from "@faker-js/faker";

export function formContactDataFaker(){
    return{
        name: faker.person.firstName(),
        email: faker.internet.email(),
        subject: faker.lorem.words(),
        message: faker.lorem.paragraph(),
    }
}