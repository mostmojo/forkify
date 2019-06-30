# Modern JS setup

* Babel - convert ES6 to ES5
* Weboack - ES6 module bundler, JS bundle size, SASS bundling
* NodeJS, npm - 3 party packages

## Terminal

* cp fileName .. &larr; destination // copy
* mv test.js .. &larr; destination // move
* rm test.js // delete
* rm -r test // remove entire folder
* open index.html // open file
* npm init - create npm file which is package.json
* npm install webpack --save-dev &rarr; saves webpack as dev dependency
* npm uninstall jQuery --save &rarr; remove dependency
* sudo npm install live-server --global
* Webpack bundles (js, css, jpg, png)
* npm install webpack-cli --save-dev (command line interface for webpack as dev dependency)
* npm install webpack-dev-server --save-dev &rarr; to install dev server and create local server
* npm run start, after adding `"start": "webpack-dev-server --mode development --open"` to `package.json`
* `npm install html-webpack-plugin` in terminal then add `const HtmlWebpackPlugin = require('html-webpack-plugin);` to the webpack.config.js file and add the `plugins` with destination and file name &rarr; `./src/index.html`.
