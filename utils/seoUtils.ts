import { APIRequestContext, Page, expect } from '@playwright/test';

export async function assertPageLoads(page: Page, url: string) {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
    const status = response?.status() ?? 0;
    expect(status, `Page failed to load: ${url}`).toBeLessThan(400);
    expect(await page.title()).not.toEqual('');
}

export async function assertNoRobotsNoindex(page: Page) {
    const robots = await page.evaluate(() => {
        const el = document.querySelector('meta[name="robots"]');
        return el ? el.getAttribute('content') ?? '' : '';
    });
    expect(robots).not.toMatch(/noindex|nofollow/);
}

export async function assertUrlsNotBroken(request: APIRequestContext, urls: string[]) {
    for (const url of urls) {
        const res = await request.get(url);
        expect(res.status(), `Broken URL: ${url}`).toBeLessThan(400);
    }
}
