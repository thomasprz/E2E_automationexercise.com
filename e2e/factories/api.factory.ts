import { faker } from '@faker-js/faker';

export function createAccountUserApi() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    title: 'Mr',
    birth_date: faker.number.int({min:1,max:31}).toString(),
    birth_month: faker.date.month(),
    birth_year:faker.number.int({min:1920,max:2025}).toString(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'New Zealand',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile_number: faker.phone.number()
    };
}