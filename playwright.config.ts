import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  outputDir: './test-results',
  testDir: './features',
  /* Maximum time one test can run for. */
  snapshotDir:'./Screenshots',
  timeout: 80 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 8000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['monocart-reporter', {  
      name: "My Test Report",
      outputFile: 'playwright-report/monocart/monocartReport.html'
    }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video:'on',  
    contextOptions: {
      recordVideo: {
        dir: './Videos' // Or wherever you want the videos to be saved.
      }
    },
    screenshot:'on',
    extraHTTPHeaders:{
      "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIwZjQzZGMxNC1lYTQyLTQwZjYtOWYwMS00N2E1MTE0MGQ2ZTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYTMyOTliYmEtYWRlNi00OTY1LWIwMTEtYmFkYThkMWQ5NTU4L3YyLjAiLCJpYXQiOjE2NjQ1MTIyMTcsIm5iZiI6MTY2NDUxMjIxNywiZXhwIjoxNjY0NTE2MTE3LCJhaW8iOiJBVVFBdS84VEFBQUFjZjRMK1l1TUdOTHdEcnF6d3VRM0NlOVlQdWFQZ3NGeVlPbE5kUnpqZ1RCaTFPL3AvUmFZWXhmWnBDNGxXSjBtb1JMOEJxODV2REw4dVdYYTdXdmtXUT09IiwiZW1haWwiOiJBUkNIQU5BLk1FTkFTQU5HSUB3b29kc2lkZS5jb20uYXUiLCJuYW1lIjoiTWVuYXNhbmdpLCBBcmNoYW5hIChUQVRBIENPTlNVTFRBTkNZIFNFUlZJQ0VTIExURCkiLCJub25jZSI6IjQzYjIyYTI3LTExNzUtNGFhNC04NzRmLTYxMDZlZjk2MmExMiIsIm9pZCI6ImFmYjIwYjM2LWViMTgtNGE3Yy04MzQ5LTU0NzkyYzM5MGViYyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFyY2hhbmEubWVuYXNhbmdpQHdvb2RzaWRlLmNvbS5hdSIsInJoIjoiMC5BV1lBdXBzcG8tYXRaVW13RWJyYWpSMlZXQlRjUXc5QzZ2WkFud0ZIcFJGQTF1ZG1BTEEuIiwic3ViIjoiMlBaWl9qa29DZVl0cU03WXpIRm1yX0l5OVpkQWZ4R0NfTjJCWXpLeEh4VSIsInRpZCI6ImEzMjk5YmJhLWFkZTYtNDk2NS1iMDExLWJhZGE4ZDFkOTU1OCIsInV0aSI6Ii1uUmRCSmd0YVV1d29qdzVyWVphQUEiLCJ2ZXIiOiIyLjAifQ.M9vgWHnGxx58LoAkcwA2I6SVgu8vxkc800tAoC6ZSAVNyJQwVgo9k7ItwQ-N7HuZUDRnn8AGxJddTnOz53FKr9HB3uiLQcqSyTFPUSKc6a5TIy6Ik2cqgnZ-IaU9A4PfQ4JqRAVFIghLF7wyUi00eLLW2roik_GIN37kM3kbiEP-9lV3E8oeZRcnmwcCXLgUbK1fx5ryp3hkihPI1tna-2esGUZKEHsLBAH4Et4IAFTpkkQtM984baHy5PMWLlMTXVt8SQBwzpFeOo4MFgiWHD0q_fj02rTR4JADZgKhYoFqxo4w2te7gc-dx95uhVjJMCG5-bsDImGBrKJSvhzXXQ"},
    //viewport:null,
    //launchOptions:{args:["--start-maximized"]},
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'https://sar-test.dev.app.woodside',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
