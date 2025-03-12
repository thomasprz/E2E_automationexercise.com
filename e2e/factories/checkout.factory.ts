import { faker } from "@faker-js/faker";

export function commentAreaFaker(){
    return {
        section: faker.lorem.text()
    }
}