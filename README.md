# My Electron App

A minimal Electron desktop app built with Electron Forge and covered by Playwright end-to-end tests.

## Overview

This project provides a small Electron application that loads a local HTML file and demonstrates a simple UI surface for test automation. The repository also includes Playwright-based Electron tests and a code generation helper for creating additional selectors and test flows.

## Tech Stack

- Electron 38
- Electron Forge 7
- Playwright Test
- Node.js

## Prerequisites

Use a current LTS version of Node.js. npm is used as the package manager throughout this repository.

## Getting Started

Hitting the ground running (i.e. do all of the things):

``` bash
npm install <- get reference packages listed in package.json
npm run make <- creates the executable via electron-forge

npm run start <- starts up the executable

npx playwright test <- runs playwright tests
npx playwright show-report <- opens the playwright test viewer

node playwright-codegen.js <- open the codegen interface
```

Install dependencies:

```bash
npm install
```

Start the app in development mode:

```bash
npm run start
```

## Available Scripts

```bash
npm run start
```

Launches the Electron app through Electron Forge.

```bash
npm run package
```

Packages the app without creating distributable installers.

```bash
npm run make
```

Builds distributable output through Electron Forge makers.

## Packaging

The Forge configuration currently includes:

- Squirrel.Windows for Windows installers
- ZIP output for macOS
- DEB packages for Debian-based Linux distributions
- RPM packages for RPM-based Linux distributions

Application packaging is configured to use ASAR, along with Electron fuses that tighten the packaged runtime.

## End-to-End Testing

Run the Playwright suite:

```bash
npx playwright test
```

Open the HTML test report:

```bash
npx playwright show-report
```

The Playwright configuration runs tests from `e2e/tests` and enables trace collection for test runs.

## Playwright Codegen

Open the Playwright inspector against the Electron app:

```bash
node playwright-codegen.js
```

This helper launches the app, waits for the first window to load, and pauses execution so you can record selectors and interactions.

## Project Structure

```text
.
|-- main.js
|-- index.html
|-- styles.css
|-- forge.config.js
|-- playwright.config.ts
`-- e2e/
	|-- playwrightUtilities.ts
	`-- tests/
		|-- basic.e2e.ts
		`-- codegen.e2e.ts
```

## Notes

- The Electron entry point is `main.js`.
- The renderer currently loads `index.html` directly.
- Test coverage includes both handwritten tests and codegen-based examples.
