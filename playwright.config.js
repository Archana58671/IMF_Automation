"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const config = {
    outputDir: './test-results',
    testDir: './features',
    snapshotDir: './Screenshots',
    timeout: 80 * 1000,
    expect: {
        timeout: 8000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html'],
        ['monocart-reporter', {
                name: "My Test Report",
                outputFile: 'playwright-report/monocart/monocartReport.html'
            }]
    ],
    use: {
        video: 'on',
        contextOptions: {
            recordVideo: {
                dir: './Videos'
            }
        },
        screenshot: 'on',
        extraHTTPHeaders: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIwZjQzZGMxNC1lYTQyLTQwZjYtOWYwMS00N2E1MTE0MGQ2ZTciLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vYTMyOTliYmEtYWRlNi00OTY1LWIwMTEtYmFkYThkMWQ5NTU4L3YyLjAiLCJpYXQiOjE2NjQ1MTIyMTcsIm5iZiI6MTY2NDUxMjIxNywiZXhwIjoxNjY0NTE2MTE3LCJhaW8iOiJBVVFBdS84VEFBQUFjZjRMK1l1TUdOTHdEcnF6d3VRM0NlOVlQdWFQZ3NGeVlPbE5kUnpqZ1RCaTFPL3AvUmFZWXhmWnBDNGxXSjBtb1JMOEJxODV2REw4dVdYYTdXdmtXUT09IiwiZW1haWwiOiJBUkNIQU5BLk1FTkFTQU5HSUB3b29kc2lkZS5jb20uYXUiLCJuYW1lIjoiTWVuYXNhbmdpLCBBcmNoYW5hIChUQVRBIENPTlNVTFRBTkNZIFNFUlZJQ0VTIExURCkiLCJub25jZSI6IjQzYjIyYTI3LTExNzUtNGFhNC04NzRmLTYxMDZlZjk2MmExMiIsIm9pZCI6ImFmYjIwYjM2LWViMTgtNGE3Yy04MzQ5LTU0NzkyYzM5MGViYyIsInByZWZlcnJlZF91c2VybmFtZSI6ImFyY2hhbmEubWVuYXNhbmdpQHdvb2RzaWRlLmNvbS5hdSIsInJoIjoiMC5BV1lBdXBzcG8tYXRaVW13RWJyYWpSMlZXQlRjUXc5QzZ2WkFud0ZIcFJGQTF1ZG1BTEEuIiwic3ViIjoiMlBaWl9qa29DZVl0cU03WXpIRm1yX0l5OVpkQWZ4R0NfTjJCWXpLeEh4VSIsInRpZCI6ImEzMjk5YmJhLWFkZTYtNDk2NS1iMDExLWJhZGE4ZDFkOTU1OCIsInV0aSI6Ii1uUmRCSmd0YVV1d29qdzVyWVphQUEiLCJ2ZXIiOiIyLjAifQ.M9vgWHnGxx58LoAkcwA2I6SVgu8vxkc800tAoC6ZSAVNyJQwVgo9k7ItwQ-N7HuZUDRnn8AGxJddTnOz53FKr9HB3uiLQcqSyTFPUSKc6a5TIy6Ik2cqgnZ-IaU9A4PfQ4JqRAVFIghLF7wyUi00eLLW2roik_GIN37kM3kbiEP-9lV3E8oeZRcnmwcCXLgUbK1fx5ryp3hkihPI1tna-2esGUZKEHsLBAH4Et4IAFTpkkQtM984baHy5PMWLlMTXVt8SQBwzpFeOo4MFgiWHD0q_fj02rTR4JADZgKhYoFqxo4w2te7gc-dx95uhVjJMCG5-bsDImGBrKJSvhzXXQ"
        },
        actionTimeout: 0,
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...test_1.devices['Desktop Chrome'],
            },
        },
    ],
};
exports.default = config;
