# CircIdenticon
Provides circular identicons for web pages.

## Why:

Most identicons seen on various websites have a blockish look to them.  They have a design that promotes such a look
and feel.  But aesthetically, circles appeal to people more.  So, I wanted to build identicons that had a nicer aesthetic
using circles and curves instead of blocks and triangles.

## Usage:

Create a variable using a new CircIdenticon object, passing in the string for which you wish to create a CircIdenticon.
Then call that variable's 'buildSVG()' function to generate the SVG.  Set your element's innerHTML to display it.


## Dependencies:

CircIdenticon relies upon a stable, reproducable random number generator.  It calls `new Math.seedrandom(textVar)` to create
a variable that it calls for a random number between 0 and 1.0.  I've used the one from [seedrandom](https://github.com/davidbau/seedrandom) without issue.

## Example:

```html
<html>
 <body>
  <h1>Header</h1>
  <div id="identicon"></div>
  <input id="name" type="text"/>
<!-- Not needed for CircIdenticon, but makes this example shorter. -->
<script src="https://code.jquery.com/jquery-3.5.1.min.js"
	integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
	crossorigin="anonymous"></script>
<!-- The one true dependency this project has...
	 we need a way to seed the random number generator reliably. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js"></script>
<!-- Sorry, no CDN for this... but it's fairly small.
	 Just download it and put it where you like. -->
<script src="js/circidenticon.js"></script>
<script>
$(function(){
  // For any character one types in the edit box...
  $('#name').on('input propertychange',function() {
    // Create the object from whatever someone typed.
    var icon = new CircIdenticon($('#name').val());
    // Generate the SVG and put it in the element.
    $('#identicon').html(icon.buildSVG());
  })
});
</script>
 </body>
</html>
```

## Customizations:

### Available colors

You can modify CircIdenticon's available colors by modifying the generated colors attribute:

```javascript
var myCustomColors = [
'Yellow',
'Blue',
'Red',
'Green',
'Orange',
'Purple'
];
var icon = new CircIdenticon('myusername');
icon.colors = myCustomColors;
```

### Background colors

The background circle, and the circle-over-the-background-circle colors pull from the same pool of background colors,
which you may modify:

```javascript
var myCustomBgColors = [
'Black',
'DarkGrey',
'White'
];
var icon = new CircIdenticon('myusername');
icon.bgColors = myCustomBgColors;
```

### Usage within another SVG

If you want to embed the CircIdenticon within another SVG you're generating, call `createIdenticon()` instead of `buildSVG()`
to generate the guts of the identicon without the SVG wrapper.

## Example implementation

You can see this in action at my personal site on [fleeb.com](https://www.fleeb.com/circidenticon/).

