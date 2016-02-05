# ractive-grid-list
A ractive component for displaying a grid of squares from an arbitrary list. Shows just the number of rows and columns as are specified and guarantees the items to be square and evenly distributed upon resizing.

[Live Demo](http://rangermauve.github.io/ractive-grid-list/example/)

## Installing
Works with [browserify](http://browserify.org/). You can build a [standalone](http://www.forbeslindesay.co.uk/post/46324645400/standalone-browserify-builds) bundle yourself if that's something that's needed.

```
npm install --save ractive-grid-list
```

## Example
index.js

```javascript
var Ractive = require("ractive");
var fs = require("fs");

// Register the components with Ractive
require("ractive-swipe-pages");

var template = fs.readFileSync(__dirname + "/template.html", "utf8");

new Ractive({
    el: document.querySelector("main"),
    template: template,
    data: {
        items: [{
            name: "Alice"
        }, {
            name: "Bob"
        }, {
            name: "Carol"
        }, {
            name: "Dave"
        }, {
            name: "Eve"
        }, {
            name: "Faythe"
        }
    }
});
```

template.html

```html
<RMGrid gridItems="{{items}}" gridRows="2" gridColumns="3">
    <div>
        {{name}}
    </div>
</RMGrid>
```

## Usage
Pass in the list of `gridItems` to the `RMGrid` component and it'll automatically iterate through them and render out perfect squares with your content. The content within the component will be called for each item to form the boxes. Your content should automagically stretch to fill the square, so feel free to style it and make it look pretty.

You can specify the number of `gridRows` and `gridColumns` to use for rendering the grid. If you have more or fewer items in your list than can fit in the grid, those items will be ignored.

You can also specify a `gridClass` to apply on the grid's container if you want to add additional styles to it. Try not to mess with flexbox/padding settings since that can mess up the layout.
