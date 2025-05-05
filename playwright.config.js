// @ts-check
import { defineConfig } from '@playwright/test'

// In playwright.config.js
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests',
  timeout: isCI ? 120000 : 30000, // Longer timeout in CI
  expect: {
    timeout: isCI ? 10000 : 5000, // Longer expect timeout in CI
  },
  fullyParallel: !isCI, // Sequential in CI for stability
  workers: isCI ? 1 : undefined, // Single worker in CI
  reporter: isCI ? [['html'], ['github']] : 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: isCI ? 'on' : 'on-first-retry',
    screenshot: isCI ? 'on' : 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    // Only run other browsers locally, not in CI
    ...(!isCI
      ? [
          {
            name: 'firefox',
            use: { browserName: 'firefox' },
          },
          {
            name: 'webkit',
            use: { browserName: 'webkit' },
          },
        ]
      : []),
  ],
  webServer: {
    command: 'npm run start:test',
    url: 'http://localhost:5173',
    reuseExistingServer: !isCI,
    timeout: isCI ? 180000 : 60000,
  },
})
