ng-hashtag-search-box
=====================

Angular directive which provides an **enhanced input box** to search hashtags.

![basic example of hashtag search box](http://zippy.gfycat.com/TerrificAnyDikdik.gif)

## Install

`npm install ng-hashtag-search-box`

## Component Behaviour

The component has the following behaviour:

- if `#` is typed then a new hashtag starts
- if `space` is typed then a new hashtag starts and `#` is prepended automatically
- when user is writing (after he has introduced `#` or `space`)  the letters of the hashtag the suggested one will be matched with the current written letters showing next to the input cursor the letters that left to match with it.
- when suggested letters appear (user is typing a hashtag), pressing `tab` autocomplete the hashtag with the suggestion.
- when `enter` is pressed the function registered is called with an array of words as a parameters; those words are the hashtags typed without the `#` prepended.

**Note** this component hasn't been designed to show different suggestions, if that is a requirement for you then it isn't the appropriated component.


## Usage

This component is basically an [AngularJS] directive; concretely an [element] witch has its isolated scope and communicate with your controller through exposed attributes.

### Component Rendering

To use it, you have to add `<tag-search-box/>` HTML element; it's an usual [AngularJS] directive.


### Component Interoperability

The HTML element has several attributes to set values or interoperate with the directive.

All of them except than one, `placeholder`, are mapped to the directive's scope, which means that they must be javascript values or instructions and if they are identifiers (variable names and functions) will be looked for in the scope which surrounds the directive (HTML element) as a controller, basically the usual behaviour of [AngularJS directive's scope];

The HTML element attributes used by the directive are:

* `tags` (optional): The list of initial tags to render; the value must be an `Array` of `Strings` which are the words (tags) to set, **with not `#` prepended**.
* `on-change`: A function which will be called each time that a letter in a hashtag is typed. This function receives the list of current tags (words without `#` prepended) which has been introduced; the last only contains the letters introduced until the moment to call this function.
The function must return a [`$q` promise] which has to be resolved with the letters left that should be written to fulfill with the suggested hashtag (word). A rejected promise is ignored and the promise will be a replaced for the next one, that means that the last one returned for this function will be assigned and the previous one discarded if it hasn't been resolved before.
* `on-press-enter`: A function which will be called each time that `enter` is pressed when the input box has the focus. The function receives the list of current tags (words without `#` prepended) which has been introduced until that time.
* `placeholder`: This attribute isn't a scope attribute, so it's a simple HTML element attribute. It's values is used as placeholder of the input box and is shown when any hashtag has been introduced.


## Development

### Setup the environment

Open a terminal and navigate until the directory where you have cloned this repository and execute `npm install`

### Run local server

In another terminal session (window, tab, pane, etc), navigate to the directory where this project is cloned and execute `npm run dev`

It will run a [browser-sync local server] on the port 3000; open a browser and load the URL `http://localhost:3000/test` (replace `localhost` by the IP that the virtual machine expose in case that you're using one).

### Making changes

This page which `http://localhost:3000/test` shows, loads the `index.html` file located in the `test folder`.

`index.html` load the directive from its source file which is located in `src/directive.js`.

You can start to make changes and the browser will be refreshed automatically by [browser-sync].

The process that you have run for the local server is not only refreshing your browser on each change, it also runs [eslint] to lint the source code of the directive, so you should take a look sometimes to make sure that your code doesn't have any reported linter issue.

The [eslint configuration file] is in `src` directory.


## TODO

* Write tests

## License

Just MIT, read [LICENSE file](#LICENSE) for more information.
