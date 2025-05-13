import { test as base } from './baseFixture';
import { HomePage } from '../../pages/homePage';

type Fixtures = {
    homePage: HomePage;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
    }
});
