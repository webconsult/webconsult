webconsu.lt
==========

Source code for the http://webconsu.lt website.

The site is really just a plain one-page design in HTML, CSS and Javascript, but there is one thing I'd like to draw attention to:

The fact that all the skeumorphic styling for the paper-like background is made entirely in css and javascript. 

A repeating png to create a paper-like texture is the only bitmap based graphics file, besides the images in the content.

Since I wanted the textarea on the paper to be one big div, rather than breaking it up for each fold in the paper, I had to use javascript to determine the hight of the paper and divide that into a "reasonable" amount of folds (a fold has a minimum height of 400px, so a 800px high content-area would yield two folds at 400px each, while a 1260px high content-area would yield 3 folds at 420px each).

The folds themselves are rendered by applying a linear gradient to the entire content-div with 4 gradient-stops for each fold.

Finally, to achieve the smooth angled shadows in the crease where the paper is supposed to lift from the background behind it, I used a transparent oval div (using border-radius) with a box-shadow, which I then placed behind each crease. You can easily see this when the page reloads, as the shadow is loaded before the paper.

A fun little side project - just a shame everybody wants flat designs these days :)
