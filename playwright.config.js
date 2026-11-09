// @ts-check
import { chromium, defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  testMatch: '**/*.spec.js',
  retries: 2,
  //workers: '100%',
  /* Run tests in files in parallel */


  /* Maximum time one test can run for. */
  timeout: 100 * 1000,
  expect: {

    timeout: 12 * 1000,
  },

  reporter: "html",
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    browserName: "chromium",
    //headless: true,
    screenshot: 'on',
    trace: 'on', //off, on // 'retain-on-failure' 
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  },

};

module.exports = config;
