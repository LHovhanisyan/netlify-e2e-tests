import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly newsletterSection: Locator;
    readonly emailInput: Locator;
    readonly subscribeButton: Locator;
    readonly thankYouHeading: Locator;
    private readonly baseUrl = 'https://www.netlify.com/';

    constructor(page: Page) {
        this.page = page;
        this.newsletterSection = page.locator('.newsletter-form');
        this.emailInput = page.locator('[name="email"]');
        this.subscribeButton = page.locator('input[type="submit"][value="Subscribe"]');
        this.thankYouHeading = page.locator('h1', { hasText: 'Thank you for signing up!' });
    }

    async goto() {
        await this.page.goto(this.baseUrl);
    }

    async scrollToNewsletter() {
        await this.newsletterSection.scrollIntoViewIfNeeded();
    }

    async submitEmail(email: string) {
        await this.emailInput.fill(email);
        await this.subscribeButton.click();
    }


    async expectThankYouMessageVisible() {
        await expect(this.thankYouHeading).toBeVisible({timeout:4000});
    }

    async expectThankYouMessageNotVisible() {
        await expect(this.thankYouHeading).not.toBeVisible({timeout:4000});
    }


}
