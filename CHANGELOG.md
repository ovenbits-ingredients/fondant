## Fondant 0.6.1 ##

* Add a class of 'contenteditable' to the actual contenteditable section for semantic css

## Fodnant 0.6.0 ##

* Simple toolbar customization - Allow for an array to be passed in defining which buttons to show
  in the editor. (see [#14](https://github.com/ovenbits-ingredients/fondant/issues/14))

* Ensure the correct editable field is being refocused when the buttons are clicked.
  (see [#13](https://github.com/ovenbits-ingredients/fondant/issues/13))

## Fondant 0.5.0 ##

* Allow users to pass in a string or a function to generate the toolbar html
  (see [#12](https://github.com/ovenbits-ingredients/fondant/issues/12))

## Fondant 0.4.1 ##

* Fix up the initializer (`$.fn.fondant`) so that it returns the correct things

* Add some initial tests (see [#6](https://github.com/ovenbits-ingredients/fondant/issues/6)).

## Fondant 0.4.0 ##

* Get the currently selected text. It will grab any html that is selected, so
  use with caution.
  Fixes [#10](https://github.com/ovenbits-ingredients/fondant/issues/10)

## Fondant 0.3.0 ##

* Add custom HTML insertion for IE9 (using document selection ranges).
  Fixes [#1](https://github.com/ovenbits-ingredients/fondant/issues/1).

* Prevent default actions on toolbar buttons (keeps #'s out of the URL)


## Fondant 0.2.4 ##

* Apply `outdent` before `p`. This allows us to switch from lists and
  blockquotes to paragraphs.
  Fixes [#7](https://github.com/ovenbits-ingredients/fondant/issues/7).

* Refocus `contenteditable` element after applying format in Firefox.
  Fixes [#8](https://github.com/ovenbits-ingredients/fondant/issues/8).

* Fix example js and css paths.


## Fondant 0.2.3 ##

* Add Jasmine test framework and reorganize folder structure to support testing


## Fondant 0.2.3 ##

* Return value of first matched element for certain functions. This is
  necessary to get the html content of the editor in a string.

* Add VERSION file to help keep track of the version for the
  [`fondant-rails`][fr] gem.

  [fr]: https://github.com/ovenbits-ingredients/fondant-rails


## Fondant 0.2.1 ##

* Add classes to inner toolbar elements for easy targeting with CSS.
  Fixes [#4](https://github.com/ovenbits-ingredients/fondant/issues/4).

## Fondant 0.2.0 ##

* Add a `focus` method to focus the editor content.
  Fixes [#2](https://github.com/ovenbits-ingredients/fondant/issues/2).

* Add a `value` method to get and set the editor content.
  Fixes [#3](https://github.com/ovenbits-ingredients/fondant/issues/3).

* Add an example.


## Fondant 0.1.0 ##

* Initial release

