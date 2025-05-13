import {  expect } from '@playwright/test';
import { test } from '../fixtures/baseFixture';

test.describe('404 Link Verification @links', () => {
    const pagesToCheck = [
        'https://www.netlify.com/',
        'https://www.netlify.com/products/',
        'https://www.netlify.com/contact/',
    ];

    test('should ensure all internal links on selected pages do not return 404', async ({ page, request }) => {
        for (const url of pagesToCheck) {
            await page.goto(url, { waitUntil: 'domcontentloaded' });

            const hrefs = await page.$$eval('a[href]', (anchors) =>
                anchors.map((a) => (a as HTMLAnchorElement).href)
            );

            const internalLinks = hrefs
                .filter((href) => href.startsWith('https://www.netlify.com'))
                .filter((href) => !href.includes('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
                .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates

            for (const link of internalLinks) {
                const response = await request.get(link);
                expect(response.status(), `Broken link: ${link}`).not.toBe(404);
            }
        }
    });
});
