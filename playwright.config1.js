// @ts-check
import { chromium, defineConfig, devices } from "@playwright/test";
import { workers } from "cluster";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retries: 1,
  testMatch: '**/*.spec.js',
  /* Run tests in files in parallel */
  workers: 3
  
  
  
  ,
  /* Maximum time one test can run for. */
  timeout: 100 * 1000,
  expect: {
    timeout: 12 * 1000,
  },

  reporter: "html",
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

projects: [

{

  name: 'firefox',
  use: {
    browserName: "firefox",
    headless: false,
    screenshot: 'off',
    trace: 'on', //off, on // 'retain-on-failure' 
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    viewport: { width: 720, height: 720 } ,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
  }
},
{

  name: 'chrome',
  use: {
    video: 'on-first-retry',
    browserName: "chromium",
    headless: false,
    screenshot: 'off',
    trace: 'on', //off, on // 'retain-on-failure' 
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    ignoreHttpsError:true,
    permissions: ['geolocation'],
    //...devices['iPhone 11']
   // viewport: { width: 720, height: 720 }


  }
}]


};

module.exports = config;
