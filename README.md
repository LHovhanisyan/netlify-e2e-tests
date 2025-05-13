#  Netlify QA Automation Assessment

This repository contains a **Playwright** test suite built using **TypeScript** for the **Netlify website**. It demonstrates best practices in automation testing, including **test architecture**, **CI integration**, **code modularity**, and **robust reporting**.

---

##  Project Structure

netlify-playwright-tests/
├── tests/
│   ├── forms/                      # Test Case 1: Newsletter form
│   │   └── newsletterForm.spec.ts
│   ├── seo/                        # Test Case 2: Sitemap + crawlability
│   │   └── sitemap.spec.ts
│   └── links/                      # Test Case 3: 404 link check
│       └── brokenLinks.spec.ts
├── pages/                          # Page Object Models
│   └── homePage.ts
├── utils/                          # Shared functions/helpers
│   ├── sitemapUtils.ts
│   ├── emailUtils.ts
│   ├── seoUtils.ts
│   └── attachScreenshot.ts
├── tests/fixtures/                 
│   ├── baseFixture.ts
│   └── homePageFixture.ts
├── .github/workflows/              # CI pipeline (e2e-tests.yml)
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # NPM dependencies and scripts
├── .gitignore                      # Ignored files and folders
└── README.md                       # Project documentation


---


##  Approach
 - **Page Object Model (POM)**: Separate classes for each page ensure that all interactions with the page are encapsulated. This makes the tests easier to maintain and extend.

 - **Fixtures**: Reusable logic for setting up test states, like page loading and interaction with common components.

 - **Tagging and Test Suite Management**: Tags such as @smoke, @ui, @regression allow for flexible test execution, targeting specific sets of tests based on the scenario (e.g., smoke tests for quick checks).

 - **CI Integration**: GitHub Actions automates the testing process, ensuring tests are run automatically on code changes, pull requests, and on a defined schedule.


##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/netlify-playwright-tests.git
cd netlify-playwright-tests
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

### 4. Install TypeScript (if not already installed)

```bash
npm install --save-dev typescript
```

### 4. Verify TypeScript installation (Optional but recommended)

```bash
npx tsc --version
```


### 5. Run all tests

```bash
npx playwright test
```

### 6. Run a single test file

```bash
npx playwright test tests/forms/newsletterForm.spec.ts
```

### 7. Open the Playwright HTML Report

```bash
npx playwright show-report
```

## Test Execution Instructions

You can run the tests using the following methods:

### 1. **Run all tests automatically**
This will run the full suite of tests in headless mode.

```bash
npm run netlify:e2e
```
### 2. **Run all tests in headed mode**

```bash
npm run netlify:e2e:headed
```

### 3. **Open Playwright HTML Report**

```bash
npx playwright show-report
```

## Technology Stack

- **Playwright**: Used for browser automation (Chromium, WebKit, Firefox)
- **TypeScript**: Strong typing for maintainable, reliable tests
- **Page Object Model (POM)**: Scalable, clean test design pattern
- **Fixtures**: Reusable setup for common logic
- **GitHub Actions**: Continuous integration and delivery
- **Playwright HTML Reporter**: Visual and interactive test results
- **npm**: Dependency management and package scripts

---

##  Test Cases Covered

###  Test Case 1: Lead Capture Form Validation

**Objective**: Validate the newsletter form functionality.

**Steps**:
1. Test with valid and invalid email formats.
2. Confirm success feedback is displayed for valid input.
3. Ensure proper validation feedback is shown for invalid input.

###  Test Case 2: Sitemap & Crawlability Verification

**Objective**: Verify sitemap and crawlability for SEO.

**Steps**:
1. Confirm `sitemap.xml` exists.
2. Validate URLs listed in the sitemap are accessible and return 2xx or 3xx status.
3. Ensure no unintended `noindex` meta tags are present.
4. Validate important pages are crawlable by search engines.

###  Test Case 3: 404 Link Verification

**Objective**: Ensure no broken links exist across the site.

**Steps**:
1. Extract all internal links from key pages.
2. Ensure no links return a 404 status code.
3. Exclude anchor links (`#`), `mailto` links, and `tel` links from the checks.

---

##  Approach

- **Page Object Model (POM)**: Separate classes for each page ensure that all interactions with the page are encapsulated. This makes the tests easier to maintain and extend.

- **Fixtures**: Reusable logic for setting up test states, like page loading and interaction with common components.

- **Tagging and Test Suite Management**: Tags such as `@smoke`, `@ui`, `@regression` allow for flexible test execution, targeting specific sets of tests based on the scenario (e.g., smoke tests for quick checks).

- **CI Integration**: GitHub Actions automates the testing process, ensuring tests are run automatically on code changes, pull requests, and on a defined schedule.



Playwright Test Report
The test suite generates an HTML report that includes detailed test execution steps, pass/fail status, and screenshots for failed tests.

To view the report:

Run the tests using the command:


```bash
npx playwright test --reporter=html

```
After the test run is complete, open the report:

```bash
npx playwright show-report

```
Share the Playwright HTML report by downloading the playwright-report/ folder as a zip and attaching it or uploading it alongside the GitHub repository.

