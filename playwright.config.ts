import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  testMatch: "*.e2e.ts",
  reporter: 'html',

  use: {
    trace: 'on',
  },

  projects: [
    {
      name: 'electron',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },
  ],
});
