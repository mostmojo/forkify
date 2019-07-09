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

-----

## Remove 'loading' svg

* Create clearLoader function to `querySelect` the class `.loader` using: `if (loader) loader.parentElement.removeChild(loader);` - since it's a node in the DOM, go up to parent and use removeChild method with loader class (selected from before) as a parameter.
* Ensure to `export` clearLoader in base.js
* Ensure to `import` clearLoader in index.js

-----

* `slice()` - method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included)

```
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]
```

* `Math.ceil()` rounds up - always. Ex. 4.1 -> 5

-----

## Pagination

* Create renderResults() with start and end consts, new array using slice method to get recipes
* renderButtons to have pages, next/prev buttons with logical operators to render according to condition
* createButton - to render html with button / ternary operators to determine the type and page number

* `const btn = e.target.closest('.btn-inline');` - to get the target event closest to the given class

* `const goToPage = parseInt(btn.dataset.goto, 10);` - grab the data stored in the dataset within the html &rarr; `data-goto`

-----

## Recipe

* Create new Recipe class with constructor parameter `id` - that way we can have lots of id instances
* In same scope of Recipe class, make asynchronous getRecipe function, using axios to fetch recipe with `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}` - ` key & rId` from documentation.
* Log result to console to see what is being retrieved
* **Reusability** &rarr; create new `config.js` file with `proxy` & `keys`, import it into both `Search` and `Recipe` models
* `import Recipe from './models/Recipe';` and create a test `const r = new Recipe(33353);` with the ID fetched when pressing on a pizza recipe item. This new instance of recipe can be plugged into `r.getRecipe();` and due to prototypial inheritance, it'll trigger the getRecipe method in the model and log `res` string from axios
* In `getRecipe` function in the `Recipe.js model`, set the properties fetched from `axios API` to this variable like so: `this.title = res.data.recipe.title;` - this ensures that the call with the ID inputted, is related to its specific title, image, url, ingredients, etc. Thus, data will **only** refer to that specific recipe
* calcTime() function to get length of ingredients and divide it by 3 and * 15 minute intervals, assuming it takes 15 min per 3 ingredients. calcServings() function to show estimate of 4 servings.

-----

* How to read data from the page URL
* How to respond to the `hashchange` event
* How to add the same event listener to multiple events

* &rarr; Set an `.addEventListener` to the global `window` object, and set it to detect a `hashchange`. Use `const id = window.location.hash;` to use global window object, grab the location (in the search bar) of the hash, anything after the `#` ex. `#334554`;
* Replacee hash symbol `#` with nothing `''`
* Create new recipe object based on previous model (class Recipe) &rarr; `new Recipe(id)` and store it in `state.recipe` *(all our data is stored here, in one central place)*
* call state.recipe.getRecipe() with `await` - since it's an `async fn` it'll return a promise. It'll await for the promise to return back with the resolved value
* Then calc the time and servings and log it all to console

* `['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));` - 2 event listeners to global window object, instead of having to write:

```
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

```

* add `try {}` `catch(err) {}` around `awaits` in both search and recipe controllers to throw and error in case the awaits promise is faulty

-----

## Recipe model to process ingredient list

* Array methods like `map`, `slice`, `findIndex`, `includes`
* `Eval` function

* Create `parseIngredients` function that has a long form array of values and a short form array of their abbreviations.
* `Map` to make a new array on the `this.ingredients` values and lower case them
* Once lowercased, go through `unitsLong` with `forEach` and replace the current unit with the index of the 2nd `unitsShort` array at counter position `[i]`
* use `.replace(/ *\([^)]*\) */g, "");` to replace any string containing brackets, with an empty string &rarr; nothing. Ex. Mike (Greatest) -> Mike.
* `map()` method always needs a return to 'save' something into its current position
* **PARSE INGREDIENTS INTO COUNT, UNIT AND INGREDIENT**
* Take each ingredient and `.split(' ');`
* Use `.findIndex(el2 => unitShort.includes(el2));` &rarr; a new ES7 method to find the index of any element, which `includes()` that element. Ex. Does the array include an element called 'ounces', what's its index?
* Once the `unit index` is determined, if it's > -1, slice it into two parts Ex. `4 1/2 -> [ 4, 1/2 ]` after the first index `0`
* Use `eval()` to evaluate numbers and add them up if they are obscure. `4 + 1/2 = 4.5`, use `slice()` to slice methods up at a given index, and later `join()` them with `(' ')` empty space.
* Use `parseInt` to convert any numbered strings into integers
* Create a recipeView.js and import elements from base file which contain the querySelectors with class `.recipe`
* Create a clearRecipe function to set i`nnerHTML = ''` of class `.recipe`
* Make `createIngredient` function with ingredient parameter that has a list item with image, count, unit & ingredient
* Make `renderRecipe` function with recipe parameter that contains all the markup for the recipe - details, info, images, buttons, like
* Use `${recipe.ingredients.map(el => createIngredient(el)).join('')}` to render ingredient from `createIngredient` function
* Call `elements.recipe.insertAdjacentHTML('afterbegin', markup);` to render it
* `import * as recipeView from './views/recipeView';` into index.js to use in the controller
* add `renderLoader(elements.recipe)` and `recipeView.renderRecipe(state.recipe)` into the restaurant controller

-----

## 🐥 VS & Git Shortcuts
* **`cmd + alt + &rarr;` to toggle between tabs in VS Code**
* **`alt + &rarr;` to toggle through words in VS Code**
* **`ctrl + g` to go to specific line in VS Code**
* **`git commit --amend -m "an updated commit message"` ammend a typo in previous git message**
* **`cmd + -> / <-` jump to end of the current line**

-----

## List model, controller and view

* Unique IDs with external package
* `Array.slice` and  `Array.splice`; `Array.findIndex` & `Array.find`

* Create new list model and build a list class with a constructor pointing to an empty array
* create `addItem` function with params `count, unit, ingredient` and set an item object to `count: count, unit: unit and ingredient: ingredient`
* Install `uniqid` library and import it to list model
* Add `deleteItem()` function which iterates through `this.items`, takes an item and checks whether its `id` is equal to the passed in `id` to `findIndex` & use `this.items.splice(index, 1)` to remove or 'splice' one element at that index only
* make `updateCount` function with params `(id, count)`, loop through items object with `find()` ES6 method and check whether id is equal to id being passed in, then set the count to the newCount. Ex. List item is apple 2, count makes it 3, set the new count of 3 to the apple list item.
* By exporting `export default class List {}` and `import List from './models/List';` in the index.js controller, we can run a test to see if we can access the new instance of list.
* set `window.l = new List();` and call `window.l` in the console. Empty list array 🧙‍♂️
* `this.items.push(item)` when new `addItems` call is made to ensure item ends up in items array.
* Test in console `l.addItem(2, 'tbsp', 'salt')`, `deleteItem` & `updateItem` to see changes in array - marking List model 'backend' complete ☑
* Create `deleteItem()` function with an `id` parameter, containing a `const item = document.querySelector([date-itemid="${id}"]);` - the `[]` is the way to access data attributes. Since the items are part of a node list, select the `.item.parentElement` and `.removeChild(item)`.
* make `controlList` function to create a new list in `state object` if it doesn't exist, with `new List()` instance. Add ingredients to the list by looping through `state.recipe.ingredients` and calling `addItems` function with `el.count, el.unit, el.ingredient`, then call `listView.renderItem(item)` from the `listView` view, and render the items to the UI.
* add event listeners to trigger events and get the shopping items data attributes' and set them = `id`, then `state.list.deleteItem` to get rid of it in the model and also `listView.deleteItem(id)` to delete it from the UI, do the same for update.

-----

## Likes

### Model
* Create likes model with a `class Likes constructor` that holds an empty array of `likes`
* Make `addLike`, `deleteLike`, `getNumLikes` and `isLiked` methods, similar to `List` model
* Since relative, we need to have `id`, `author`, `title` and `image` - that'll be displayed

### Controller
* If `!state.likes` doesn't exist, create a new instance of `Likes()` from the model
* set the `currentID` to `state.recipe.id;`
* If the like button instance has not been liked, `addLike` to the `state.likes object` and save that as `newLike` var
* `newLike` should hold `currentID`, `state.recipe.title`, `author` and `img`
* If user has already liked the current recipe, and they've reclicked the like button, like has to be removed from state object using `state.likes.deleteLike(currentID)`, which contains the `splice` method once id is found and compared with `findIndex`

-----
