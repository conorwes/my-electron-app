import { expect } from "@playwright/test";
import { convertHexToRGB, electronTest as test } from "../playwrightUtilities";

test.describe('basic tests', () => {
    test.beforeEach(async ({page, trace}) => {
        // for now, manual tracing is required. see https://github.com/microsoft/playwright/issues/8208
        if (trace)
            await page.context().tracing.start({screenshots:true, snapshots:true});
    })

    test.afterEach(async ({page, trace}) => {
        // wrap up the tracing
        const path = test.info().outputPath(test.name + '.zip');
        if (trace)
            await page.context().tracing.stop({path});
            test.info().attachments.push({ name: 'trace', path, contentType: 'application/zip' });
    })

    test('has title', async ({page}) => {  
        await expect(page).toHaveTitle(/Hello from Electron renderer!/)
    });

    test('has heading', async ({page}) => {
        const heading = page.getByRole('heading');
        await expect(heading).toHaveText(/Hello from Electron renderer!/);
    });

    test('has button', async ({page}) => {
        const button = page.getByRole('button', { name: 'Click Me!', exact:true});
        await expect(button).toBeVisible();

        await button.click();
    });

    test('has green button', async ({page}) => {
        const greenButton = page.getByRole('button', { name: /Click Me, I'm Green!/, exact:true });
        await expect(greenButton).toBeVisible();

        const rgbColors = convertHexToRGB('#04AA6D');
        await expect(greenButton).toHaveCSS('background-color', `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`)
    })

    test('has checkbox', async({page}) => {
        const checkbox = page.getByLabel('check1');
        await expect(checkbox).toBeVisible();

        await expect(checkbox).not.toBeChecked();
        checkbox.check();
        await expect(checkbox).toBeChecked();
        checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    });

    test('has textbox', async({page}) => {
        const textbox = page.getByRole('textbox');
        await expect(textbox).toBeVisible();

        await expect(textbox).toBeEmpty();

        await textbox.fill('This is a textbox');
        await expect (textbox).toHaveValue('This is a textbox');
    })
});