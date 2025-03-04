import { DatatypeModule, faker } from '@faker-js/faker';

export function createAccountInformationFaker() {
  return {
    password: faker.internet.password(),
    day: faker.number.int({min:1,max:31}).toString(),
    month: faker.date.month(),
    year:faker.number.int({min:1920,max:2025}).toString(),
  };
}