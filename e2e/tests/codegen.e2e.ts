import { expect } from "@playwright/test";
import { electronTest as test } from "../playwrightUtilities";

test.describe('codegen tests', () => {
    test.beforeEach(async ({page, trace}) => {
        // for now, manual tracing is required. see https://github.com/microsoft/playwright/issues/8208
        if (trace)
            await page.context().tracing.start({screenshots:true, snapshots:true});
    });
    
    test.afterEach(async ({page, trace}) => {
        // wrap up the tracing
        const path = test.info().outputPath(test.name + '.zip');
        if (trace)
            await page.context().tracing.stop({path});
            test.info().attachments.push({ name: 'trace', path, contentType: 'application/zip' });
    });

    test('visibility tests', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Hello from Electron renderer!' })).toBeVisible();
        await expect(page.getByText('👋')).toBeVisible();
        await expect(page.getByRole('paragraph').filter({ hasText: 'Click Me!' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Click Me!' })).toBeVisible();
        await expect(page.getByRole('paragraph').filter({ hasText: 'Check This Box!' })).toBeVisible();
        await expect(page.getByText('Check This Box!')).toBeVisible();
        await expect(page.getByRole('checkbox', { name: 'check1' })).toBeVisible();
        await expect(page.getByRole('paragraph').filter({ hasText: 'Text Entry:' })).toBeVisible();
        await expect(page.getByRole('textbox')).toBeVisible();
        await expect(page.getByText('Text Entry:')).toBeVisible();
        await expect(page.getByRole('paragraph').filter({ hasText: 'Click Me, I\'m Green!' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Click Me, I\'m Green!' })).toBeVisible();
        await expect(page.locator('body')).toMatchAriaSnapshot(`
        - heading "Hello from Electron renderer!" [level=1]
        - paragraph: 👋
        - paragraph:
            - button "Click Me!"
        - paragraph:
            - checkbox "check1"
            - text: Check This Box!
        - paragraph:
            - text: "Text Entry:"
            - textbox
        - paragraph:
            - button "Click Me, I'm Green!"
        `);
    });

    test('clickability tests', async ({page}) => {
        await page.getByRole('button', { name: 'Click Me!' }).click();
        await page.getByRole('button', { name: 'Click Me, I\'m Green!' }).click();
        await page.getByRole('checkbox', { name: 'check1' }).check();
        await page.getByRole('textbox').click();
    });

    test('text matching tests', async ({ page }) => {
      await expect(page.getByRole('heading')).toContainText('Hello from Electron renderer!');
      await expect(page.getByRole('heading')).toContainText('Electron');
      await expect(page.locator('body')).toContainText('👋');
      await expect(page.locator('body')).toContainText('Click Me!');
      await expect(page.locator('body')).toContainText('Click');
      await expect(page.locator('body')).toContainText('Check This Box!');
      await expect(page.locator('body')).toContainText('Text Entry:');
      await expect(page.locator('body')).toContainText('Click Me, I\'m Green!');
      await expect(page.locator('body')).toContainText('Green');
    });
});
