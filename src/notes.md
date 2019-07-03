# Modern JS setup

* Babel - convert ES6 to ES5
* Weboack - ES6 module bundler, JS bundle size, SASS bundling
* NodeJS, npm - 3 party packages

-----

## Terminal

* `cp fileName ..` &larr; destination // copy
* `mv test.js ..` &larr; destination // move
* `rm test.js` // delete
* `rm -r test` // remove entire folder
* `open index.html` // open file
* `npm init` - create npm file which is package.json
* `npm install webpack --save-dev` &rarr; saves webpack as dev dependency
* `npm uninstall jQuery --save` &rarr; remove dependency
* `sudo npm install live-server --global`
* Webpack bundles (js, css, jpg, png)
* `npm install webpack-cli --save-dev` (command line interface for webpack as dev dependency)
* `npm install webpack-dev-server --save-dev` &rarr; to install dev server and create local server
* `npm run start`, after adding `"start": "webpack-dev-server --mode development --open"` to `package.json`
* `npm install html-webpack-plugin` in terminal then add `const HtmlWebpackPlugin = require('html-webpack-plugin);` to the webpack.config.js file and add the `plugins` with destination and file name &rarr; `./src/index.html`.
* `npm run start` will load the server
* `npm run dev` will start the dev server with the 'production' based site that is bundled into `bundle.js`
* `npm install babel-core babel-preset-env babel-loader --save dev` &rarr; install babel core, presets and loader packages to dev dependency to compile ES6 back to ES5. Add `modules` rules to `webpack.config.js`
* create `.babelrc` file and add the presets to check for browsers and compile according to versions
* `npm install babel-polyfill --save` to polyfill any JS features we can't convert to ES5, with babel loaders, also add `babel-polyfill` to `module.exports`

* **Bug fix**: change polyfil presets for babel to:

```
{
    "presets": [
        ["@babel/env", {
            "targets": {
                "browsers": [
                    "last 5 versions",
                    "ie >= 8"
                ]
            }
        }]
    ]
}

& =>
npm install --save-dev @babel/core @babel/preset-env babel-loader
npm install --save @babel/polyfill
```

-----

## MVC - Model View Controller

Search.js &rarr; index.js &rarr; searchView.js

* Covention - write model files in capital letters. Ex. **Search.js**

-----

## APIs

* Use [food2fork](https://www.food2fork.com/about/api) API to grab search queries
* Use axios with `npm install axios` to handle the equivalent of `fetch`
* Log recipe data to console

-----

## Search model

* Create default class constructor Search with query parameter and property used to fetch data

-----

* **State**: storing some value or values. In contrast, something that is stateless does not store any values between point in time A and point in time B.

* Create control Search function to be called on submit event that - gets a query from view, makes new search object and adds it to state, fetches results from API request and renders results to console.

-----

## Render svg 'loading' with animation

* Style the `.loader svg` class in CSS and use `animation: rotate 1.5s infinite linear` to trigger `@keyframes rotate` which has states 0-100% with a `360deg` rotation.
* Create a `export const renderLoader` function with a parent param that injects the svg with template literals `afterbegin` with `insertAdjacentHTML`. ENSURE **EXPORT** IS USED.
* `import` the `renderLoader` function into `index.js` from the `base.js` file and put it `elements.searchRes` as param, which contains the `.results` class. So the magic will be inserted into that class 👽