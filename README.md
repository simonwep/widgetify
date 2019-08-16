<h1 align="center">
    <img src="https://user-images.githubusercontent.com/30767528/63179442-6705ed80-c04c-11e9-8f2b-6b2297e66961.png" alt="Logo">
</h1>

<h3 align="center">
    Simple widget library.
</h3>

<p align="center">
  <img alt="gzip size" src="https://img.badgesize.io/https://raw.githubusercontent.com/Simonwep/widgetify/master/dist/widgetify.min.js?compression=gzip&style=flat-square">
  <img alt="brotli size" src="https://img.badgesize.io/https://raw.githubusercontent.com/Simonwep/widgetify/master/dist/widgetify.min.js?compression=brotli&style=flat-square">
  <a href="https://travis-ci.org/Simonwep/widgetify"><img
     alt="Build Status"
     src="https://img.shields.io/travis/Simonwep/widgetify.svg?style=popout-square"></a>
  <a href="https://www.npmjs.com/package/@simonwep/widgetify"><img
     alt="Download count"
     src="https://img.shields.io/npm/dm/@simonwep/widgetify.svg?style=popout-square"></a>
  <img alt="No dependencies" src="https://img.shields.io/badge/dependencies-none-27ae60.svg?style=popout-square">
  <img alt="Current version"
       src="https://img.shields.io/github/tag/Simonwep/widgetify.svg?color=3498DB&label=version&style=flat-square">
  <a href="https://www.patreon.com/simonwep"><img
     alt="Support me"
     src="https://img.shields.io/badge/patreon-support-3498DB.svg?style=popout-square"></a>
</p>

<br>

<h4 align="center">
  <a href="https://simonwep.github.io/widgetify/">Fully Featured demo</a>
</h4>

### Features
* Integrated positioning engine
* Simple usage
* Handling of hiding / showing
* Ultra small _(2.2kB gzip)_
* No dependencies
* Supports touch devices

## Getting Started
### Node
Note: The readme is always up-to-date with the latest commit. See [Releases](https://github.com/Simonwep/widgetify/releases) for installation instructions regarding to the latest version.

Install via npm:
```shell
$ npm install @simonwep/widgetify
```

Install via yarn:
```shell
$ yarn add @simonwep/widgetify
```

## Usage
```javascript
// Simple example, see optional options for more configuration.
const widget = Widgetify({
    el: '.my-button',
    ref: '.my-widget'
});
```

## Options
```javascript
const widget = Widgetify({

    // Widget element with all its content
    el: '.widget',

    // Reference element, used for positioning
    ref: '.reference',

    // Disables auto-positioning aka fixed widget
    inline: false,

    // Distance of widget (el) to button (ref) in pixels
    padding: 8,

    // Defines the position of the widget.
    // Any combinations of top, left, bottom or right with one of these optional modifiers: start, middle, end
    // Examples: top-start / right-end
    // If clipping occurs, the widget will automatically choose its position.
    position: 'bottom-middle',

    // Start state. If true 'disabled' will be added to the classlist of your ref element.
    disabled: false,

    // Close widget with keyboard-key
    closeWithKey: 'Escape',

    // Event listeners
    onShow(instance) {},
    onHide(instance) {}
});
```

## Methods
* widgetify.show() _- Shows the widget, returns instance._
* widgetify.hide() _- Hides the widget, returns instance._
* widgetify.disable() _- Disables the widget and adds the `disabled` class to the button, returns instance._
* widgetify.enable() _- Enables the widget  and removes the `disabled` class from the button, returns instance._
* widgetify.isVisible() _- Returns true if the widget is currently open._
* widgetify.destroy() _- Destroys all functionality._
* widgetify.destroyAndRemove() _- Destroys all functionality and removes the widget element including the reference._

## Static properties
**Widgetify.utils**
* on(elements`:HTMLElement(s)`, events`:String(s)`, fn`:Function`[, options `:Object`]) _- Attach an event handler function._
* off(elements`:HTMLElement(s)`, event`:String(s)`, fn`:Function`[, options `:Object`]) _- Remove an event handler._
* eventPath(evt`:Event`)`:[HTMLElement]` _- A polyfill for the event-path event propery._
