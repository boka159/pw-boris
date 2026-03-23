import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /* retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,*/
  reporter: "html",
  timeout: 10000,

  use: {
    baseURL: "https://www.demoblaze.com",
    //headless: false,
    trace: "on-first-retry",
  },

  expect: {
    timeout: 7000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
