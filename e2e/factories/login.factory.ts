import { faker } from '@faker-js/faker';

export function createSignupUserFaker() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
  };
}

export function loginToAccountFaker() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}