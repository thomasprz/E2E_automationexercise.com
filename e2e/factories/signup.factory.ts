import { DatatypeModule, faker } from '@faker-js/faker';

export function createAccountInformationFaker() {
  return {
    password: faker.internet.password(),
    day: faker.number.int({min:1,max:31}).toString(),
    month: faker.date.month(),
    year:faker.number.int({min:1920,max:2025}).toString(),
  };
}

export function createAccountAddressInformationFaker() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'New Zealand',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number()
  };
}

