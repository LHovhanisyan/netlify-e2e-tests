import { test, expect } from '@playwright/test';
import { getSitemapUrls } from '../../utils/sitemapUtils';
import { assertNoRobotsNoindex, assertPageLoads, assertUrlsNotBroken } from '../../utils/seoUtils';

test.describe('Sitemap and Crawlability Verification @seo', () => {
    test('sitemap.xml should exist and be valid', async ({ request }) => {
        const res = await request.get('https://www.netlify.com/sitemap.xml');
        expect(res.status()).toBe(200);
        expect(await res.text()).toContain('<urlset');
    });

    test('URLs in sitemap should return 2xx or 3xx status', async ({ request }) => {
        const urls = await getSitemapUrls(request);
        const sampleUrls = urls.slice(0, 15);
        await assertUrlsNotBroken(request, sampleUrls);
    });

    test('important pages should not have noindex meta tags', async ({ page }) => {
        const importantPages = [
            'https://www.netlify.com/',
            'https://www.netlify.com/products/',
            'https://www.netlify.com/contact/',
            'https://www.netlify.com/blog/',
        ];

        for (const url of importantPages) {
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await assertNoRobotsNoindex(page);
        }
    });

    test('important pages should be crawlable and render correctly', async ({ page }) => {
        const crawlablePages = [
            'https://www.netlify.com/',
            'https://www.netlify.com/docs/',
            'https://www.netlify.com/contact/',
        ];

        for (const url of crawlablePages) {
            await assertPageLoads(page, url);
        }
    });
});
