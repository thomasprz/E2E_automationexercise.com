import { faker } from "@faker-js/faker";

export function reviewProductFaker(){
    return{
        name: faker.person.firstName(),
        email : faker.internet.email(),
        message: faker.lorem.paragraph(),
    }
}