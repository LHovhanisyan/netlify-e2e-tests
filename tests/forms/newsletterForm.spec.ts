import { test } from '../fixtures/homePageFixture';
import { generateValidEmail, generateInvalidEmail } from '../../utils/emailUtils';

test.describe('Newsletter Signup Form', () => {

    test('should submit valid email and show success message @smoke @ui', async ({ homePage }, testInfo) => {
        const validEmail = generateValidEmail();

        await test.step('Scroll to the newsletter form', async () => {
            await homePage.scrollToNewsletter();
        });

        await test.step(`Submit a valid email: ${validEmail}`, async () => {
            await homePage.submitEmail(validEmail);
        });

        await test.step('Attach the submitted email to test report', async () => {
            await testInfo.attach('submitted-email', {
                body: validEmail,
                contentType: 'text/plain',
            });
        });

        await test.step('Verify that thank-you message is visible', async () => {
            await homePage.expectThankYouMessageVisible();
        });
    });

    test('should NOT submit invalid email and should stay on homepage @regression @ui', async ({ homePage }, testInfo) => {
        const invalidEmail = generateInvalidEmail();

        await test.step('Scroll to the newsletter form', async () => {
            await homePage.scrollToNewsletter();
        });

        await test.step(`Submit an invalid email: ${invalidEmail}`, async () => {
            await homePage.submitEmail(invalidEmail);
        });

        await test.step('Attach the invalid email to test report', async () => {
            await testInfo.attach('submitted-invalid-email', {
                body: invalidEmail,
                contentType: 'text/plain',
            });
        });

        await test.step('Verify that thank-you message is NOT visible', async () => {
            await homePage.expectThankYouMessageNotVisible();
        });
    });

    test('should display error message when email is empty @regression @ui', async ({ homePage }) => {
        await test.step('Scroll to the newsletter form', async () => {
            await homePage.scrollToNewsletter();
        });

        await test.step('Submit with empty email', async () => {
            await homePage.submitEmail('');
        });

        await test.step('Verify validation message is shown', async () => {

        });
    });

    test('should handle email with special characters @regression @ui', async ({ homePage }, testInfo) => {
        const specialEmail = 'test@domain!.com';

        await test.step('Scroll to the newsletter form', async () => {
            await homePage.scrollToNewsletter();
        });

        await test.step(`Submit email with special characters: ${specialEmail}`, async () => {
            await homePage.submitEmail(specialEmail);
        });

        await test.step('Attach the special email to test report', async () => {
            await testInfo.attach('submitted-special-email', {
                body: specialEmail,
                contentType: 'text/plain',
            });
        });

        await test.step('Verify that thank-you message is NOT visible', async () => {
            await homePage.expectThankYouMessageNotVisible();
        });
    });

});
