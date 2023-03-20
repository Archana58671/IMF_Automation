module.exports = {
    preset: "jest-playwright-preset",
    testMatch: ["**/*.+(ts|js)"],
    transform: {
      "^.+\\.(ts)$": "ts-jest",
    },
    testEnvironmentOptions: {
    "jest-playwright": {
        browsers: ["chromium"],
        launchOptions: {
            channel:'chrome',
            headless: false,
          },
      },
    }
  };