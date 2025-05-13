import { faker } from '@faker-js/faker';

/**
 * Generate a valid, realistic test email.
 */
export function generateValidEmail(): string {
    const prefix = faker.internet.username().toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${prefix}+qa@gmail.com`;
}

/**
 * Generate an intentionally malformed email for negative testing.
 */
export function generateInvalidEmail(): string {
    const formats = [
        () => faker.word.words(1),
        () => faker.internet.username(),
        () => `${faker.internet.username()}@invalid`,
        () => faker.internet.email().split('@')[0],   // remove domain
        () => 'noatsymbol.com',
        () => 'missing@tld',
    ];
    const index = Math.floor(Math.random() * formats.length);
    return formats[index]();
}
