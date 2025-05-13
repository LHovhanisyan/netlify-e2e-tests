import { test as base } from '@playwright/test';
import { attachScreenshotOnFailure } from '../../utils/attachScreenshot';

export const test = base.extend({});

test.afterEach(async ({ page }, testInfo) => {
    await attachScreenshotOnFailure(page, testInfo);
});
