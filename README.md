# Electron, React, & Typescript with Hot Reloading <!-- omit in toc -->
After picking through endless boilerplates and getting started guides with varying levels of success, I decided to build this repo as a working, low-overhead (not quite minimal) example with detailed documentation explain *why* we need each component, not just a copy-paste solution.

## Table of Contents <!-- omit in toc -->
- [Build Tools & Major Libraries](#Build-Tools--Major-Libraries)
  - [Babel](#Babel)
  - [Electron](#Electron)
  - [React](#React)
  - [Typescript](#Typescript)
  - [Webpack](#Webpack)
- [Documentation](#Documentation)
  - [`package.json`](#packagejson)
  - [`tsconfig.json`](#tsconfigjson)
- [Using This Repository as a Boilerplate](#Using-This-Repository-as-a-Boilerplate)

## Build Tools & Major Libraries
### Babel
Babel lets us write fancy Javascript based on new standards while still compiling down to Javascript that runs in old browsers (or new browsers that don't have the latest Javascript standards yet).

### Electron
Electron allows us to take our web app and run it via Node and Chromium as a standalone desktop app.

### React
React gives us a nice, object-oriented way to build UI components for our app.

### Typescript
Strict type checking for Javascript. A must for developing robust applications.

### Webpack
Webpack packages our source files and uses the Typescript and Babel compilers. It can generate regular or minified output depending on if we're in development or production mode.

## Documentation
Most of the documenation is in the source files. However, since comments are not permitted in JSON files, descriptions of `package.json` and `tsconfig.json` are included here.

### `package.json`
The `package.json` file contains the following sections beyond the basic `name`, `version`, and `description` fields:
- `scripts`
    - `build`: Here we call the webpack script to build using the production config file. Note that because the `NODE_ENV` variable is set to `production`, the Electron main process file will load from the static `dist/render` directory (look at `electron.ts` to see where this check happens).
    - `start`: Kick off the electron app
    - `build:dev`: Build the webpack script with the server (dev) config. Note that because `NODE_ENV` was set to `development`, the compiled Electron main process script (built from `electron.ts`) will load the `https://localhost:9000` URL
    - `start:dev`: Start the `webpack-dev-server` (which enables hot compiling and reloading of the Electron renderer code), wait for the web server to come up, and then kick off Electron.
    - `server`: Run the `build:dev` and `start:dev` scripts. This makes sure that the Electron main process file is re-built before the webpack dev server is booted up.
- `main`: This is where we tell Electron our app's main Electron Javascript file. In our case, we want to point this at the compiled file that the Typescript compiler generates. In `webpack.config.base.js` we set this location and filename so the output will be `./dist/main/main.js`.
- `devDependencies`: Here we list all the dependencies we need for compiling and developing our app.
    - `@babel/core`: Core Babel package
    - `@babel/polyfill`: Babel polyfill package. When imported, it let's us use fancy Javascript
    - `@babel/preset-env`: Package that lets us tell Babel what environment to target
    - `@babel/preset-react`: Packet that tells Babel to handle React stuff like JSX
    - `@babel/preset-typescript`: Babel's Typescript loader
    - `@types/react`: Import the Typescript type definitions for `react`
    - `@types/react-dom`: Import the Typescript type definitions for `react-dom`
    - `babel-loader`: Import the Babel loader to use with webpack
    - `concurrently`: Handy package we use in the scripts to start the dev server and simultaneously kick off Electron
    - `cross-env`: Another utility that lets us set environment variables in a cross-platform way (note that I'm using version 5.1.6 since the latest version seems to be broken on Windows)
    - `css-loader`: A CSS file loader for webpack
    - `electron`: The Electron library
    - `html-webpack-plugin`: A plugin that will auto-generate our `index.html` file for us
    - `react-hot-loader`: Package to enable hot reloading of our React app
    - `style-loader`: A loader that will take the CSS resolved by `css-loader` and pack it into our webpack output
    - `typescript`: Include Typescript support
    - `wait-on`: Another script utility to wait for the dev server to spin up
    - `webpack`: Package that packs our source files into static files 
    - `webpack-cli`: CLI for webpack
    - `webpack-dev-server`: Server to host webpack output and enable hot reloading
- `dependencies`: Here we list all of our app's runtime dependencies.
    - `react`: Use React components
    - `react-dom`: Use the ReactDOM to render our root React component into the page

### `tsconfig.json`
The `tsconfig.json` file defines configuration data for Typescript.
- `compilerOptions`: Define the options to pass to the Typescript compiler. I think these are most important for telling the IDE (VS Code in my case) how to inspect any Typescript code
    - `"allowJs": true`: Permit Javascript file compilation
    - `"jsx": "react"`: Allow files to have JSX
    - `"target": "es5"`: Tell Typescript to target ES2015 JS
    - `"lib"` include  `dom` (`document` object) and `esnext` (e.g., `flatMap`) support
    - `"outDir": "./dist/"`: Not exactly necessary since we're using webpack, but I included it to make the VS Code `tsconfig.json` inpsector happy.
    - `"strict": true`: Use strict mode
- `"exclude" : [ "./node_modules/" ]`: Don't apply this config to the `node_modules` directory

## Using This Repository as a Boilerplate
To use this repo as a boilerplate for your Electron/React/Typescript app, do a shallow clone:
```
git clone --depth=1 https://github.com/mbr4477/electron-react-ts-starter.git <your-project-name>
```