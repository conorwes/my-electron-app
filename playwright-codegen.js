// To codegen in electron, run the command 'node playwright-codegen.js'

const { _electron: electron } = require('playwright');

(async () => {
    // Launch the app
    const app = await electron.launch({ args: ['main.js'] });
    
    // Get the app context
    const context = await app.context();

    // Set up a network route which allows all network requests to proceed as normal
    await context.route('**/*', route => route.continue());

    // Tell node to wait 3 seconds, which should be enough time for the window to load
    await require('node:timers/promises').setTimeout(3000);
    
    // Get the first window for convenience
    const page = await app.firstWindow();

    // .pause() stops the script's execution and opens the Playwright inspector
    await page.pause();
})();