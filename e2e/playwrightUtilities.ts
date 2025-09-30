//import { resolve } from "node:path";

import { test as base, type ElectronApplication, type Page } from "@playwright/test"

/**
 * Single source of truth for timeouts used in tests.
 * @enum {number}
 */
const Timeouts = {
  KeyPress: 250,
  Short: 1_000,
  Medium: 2_000,
  Long: 3_000,
  Expect: 5 * 60 * 1_000,
  Test: 1_800_000,
};

const selectLabel = (value: string): string => `[aria-label="${value}"]`;
const selectPlaceholder = (value: string): string => `[placeholder="${value}"]`;
const selectRole = (value: string): string => `[role="${value}"]`;

/**
 * CSS selector builder with methods to generate selectors with the corresponding
 * attribute values.
 */
const $ = {
  withLabel: selectLabel,
  withPlaceholder: selectPlaceholder,
  withRole: selectRole,
  alertDialog: selectRole("alertdialog"),
  card: selectRole("article"),
  dialog: selectRole("dialog"),
  drawer: selectRole("complementary"),
  error: selectRole("alert"),
  notification: selectRole("status"),
};

export const electronTest = base.extend<{
    $: typeof $;
    timeouts: typeof Timeouts;
    app: ElectronApplication;
    page: Page;
}>({
    $,
    timeouts: Timeouts,

    app: async ({ playwright }, use): Promise<void> => {
        const app = await playwright._electron.launch({
            args: ["main.js"]
        });

        await use(app);

        await app.close();
    },

    page: async ({ app }, use) => {
        const page = await app.firstWindow();

        await use(page);
    },
});

export function convertHexToRGB(hex: string) {
    // Remove the '#' if it's included in the input
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values into separate R, G, and B values
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    
    // Return the RGB values in an object
    return {
        red: red,
        green: green,
        blue: blue,
    };
}