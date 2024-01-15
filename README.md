# Code Journal

---

## A browser-based, multi-cell JavaScript code-editor and MD note-taker

![demo](/demoScreen1.png?raw=true)

From your command line, `code-journal` will start up and run from a server on your local machine, and allow you to add, edit, reorder, and delete multiple cells of either JavaScript code, or markdown. Your cell data will be saved to a local JavaScript file, and will therefore persist when next you next run the package.

---

## To Install/Run:

- ### Recommended

Run the package from your terminal:

```
npx @code-journal/cli serve
```

- #### Global Installation:

Alternatively, you can install the project globally:

```
npm install -g @code-journal/cli
```

Then, run the following command:

```
npm @code-journal/cli serve
```

- #### Directly from the browser:
  If you want to simply try the package out from the browser, [you can do so here](https://main--heroic-bunny-d1831f.netlify.app/)! However, none of your inputs will persist (on refresh on restart). Also, when I deployed the web version of the project, there were still some bugs with bundling - you may notice the some unending loading of preview windows when the app starts or when you add code cells; to get around this, just enter some code as normal, and it will correct itself. These issues have been corrected in the main version that is deployed on NPM.

### Defaults and options when running from the command line:

- #### Port

The package will run on port 4005. If you want to run on a different port, add the `-p` or `--port` flag to your entry.

- #### File path and name

By default, the package will create a local JavaScript file called `notebook.js` which will then be read from/written to so that all of your entries persist. It will be created the same directory from which you run the startup command.

_To change the name or location of the file_, simply indicate this in the startup command as follows:

```
npx @code-journal/cli serve path/to/directory/myFileName.js
```

If the file already exists, the package will attempt to read from it. If the file does not exist, it will be created.

- #### Example:
  I want to run the package on port `5001`, and place the data file - 'myNewNotebook.js' in my `working_directory`, which is one folder level down from my current directory position in the terminal:

```
npx @code-journal/cli serve -p 5001 working_directory/myNewNotebook.js
```

---

## Using the Browser Interface:

---

The package allows two types of different cells, a `code-cell` or a `text-cell`, each of which can be individually created, edited, re-ordered, or deleted. Each time a cell is manipulated, this change it will be automatically written to the local `notebook.js` file (or the custom file name you used.)

---

- ### Cell Actions:

The interface will allow you to add any number of cell-types (either code-cells or text-cells) to your page. On initial start with a new notebook, there will be no cells in your page. Both cells can then be added to the page using the `+ Code` or `+ Text buttons`.

Additionally, you are able to re-position the order of cells by using the up and down arrow buttons in the action bar (located in the upper right of each cell.) To delete a cell, click on the `X` in the top-right corner.

Each cell action will be updated in the local notebook file being used, and will therefore persist on restart or browser refresh.

- ### Code Cell:

Each code-cell uses `esbuild-wasm` to read, transpile, and bundle any JavaScript that is entered into that specific cell. User input is automatically bundled every 1.5 seconds. If the bundler is unable to read the input, the relevant error message will automatically appear in the code-cell's preview window.

- #### Code Continuity:

While each code-cell is presented separately and has it's own preview window, the code you write will 'carry over' into subsequent windows.

Code-cell 1:

```
const num1 = 1;
```

Code-cell 2:

```
const num2 = 4;
console.log(num1 + num2);
//Will correctly output the number 5 to the browser console
```

- #### Displaying out to the preview window - `show()`:

To display any output to the preview window of a specific cell, use the `show()` function as demonstrated below:

```
const sumTwo = (a, b) => a + b;

show(sumTwo(2, 5));

//Displays the number 5 in the preview window.
```

_Note: Each code-cell can use it's own `show()` function, but it can only be used once in each code-cell. However, you can pass in multiple arguments to the `show()` function, and therefore display mutliple items._

Using `console.log()` to display output will print to the console of the browser.

- #### `jsx`:

Code-cells are 'jsx'-friendly - `React` and `React-DOM` are already pre-imported, so feel free to create components straight away! While you do not need to use any import statements to access these two packages, you are able to do so without any naming conflicts.

- #### Directly importing packages from NPM:

Each code-cell is able to import _most_ packages from NPM. Simply use an import statement as you would in any Node/NPM module - example below:

```
import lodash from 'lodash';

// Your code...

```

_Note: Owing to a CORS issue, packages are actually imported from [Unpkg.com](https://www.unpkg.com/). If you are trying to import a relatively new or unknown package, there is a very small chance the import will not work._

- #### Directly importing CSS packages:

Each code cell is able to handle basic CSS imports! However, this is extremely limited.

`esbuild-wasm` handles CSS imports in the browser by bundling them into a separate file, with the expectation that this file is stored and then subsequently accessed. Since we have to to get around this issue, the `code-journal` bundling process each code cell will attempt automatically insert the CSS import directly into the of `<head />` of the preview window (which itself is an `<iframe />`). This allows for basic CSS imports, but is extremely limited.

Below is an example of directly importing `bootstrap` CSS library, and using that library with a basic `React` component. The component will be be styled as per the library class names, and then displayed to the code-cell preview window with the `show()` function.

```
import "bootstrap@4.1.1/dist/css/bootstrap.min.css";

const MyComponent = () => {

  return (
        <button className='p-2 bg-info rounded' onClick={() => console.log('Button was clicked!')
        }>Click Me!</button>
  );
}

show(<MyComponent />);
```

---

- ### Text Cell:

Text-cells use a markdown editor.

To edit a text-cell, simply click on the cell once it has been created. Your edits will be done on the left-hand side, with a preview pane on the right.

To complete editing, click off of the focused cell.
