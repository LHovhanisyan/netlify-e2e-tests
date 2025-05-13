import { randomUUID } from 'crypto';
import type { Page, TestInfo } from '@playwright/test';

export async function attachScreenshotOnFailure(
    page: Page,
    testInfo: TestInfo,
    name?: string
): Promise<void> {
    if (testInfo.status !== testInfo.expectedStatus) {
        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach(name || `failure-screenshot-${randomUUID()}`, {
            body: screenshot,
            contentType: 'image/png',
        });
    }
}
