import { faker } from '@faker-js/faker';

export function createSignupUserFaker() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
  };
}