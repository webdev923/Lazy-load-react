# react-lazyload [![npm version](https://badge.fury.io/js/react-lazyload.svg)](http://badge.fury.io/js/react-lazyload)

Lazyload your Components, Images or anything matters the performance.

[Online Demo](//jasonslyvia.github.io/react-lazyload/examples/)

## Why it's better

 - Take performance in mind, only 2 event listeners for all lazy-loaded components
 - Support both `one-time lazy load` and `continuous lazy load` mode
 - `wheel` / `mousewheel` / `resize` event handler is debounced so you won't suffer frequent update
 - IE 8 compatible

## Who should use it

Let's say there is a `fixed` date picker on the page, when user pick a different date, all components displaying data should send ajax request with new date parameter to retreive updated data, even many of them aren't visible in viewport. This makes server load furious when there are too many requests in one page.

Using `LazyLoad` component will help ease this situation by only update components in viewport.

## Installation

```
$ npm install --save react-lazyload

// If you tend to support React v0.13, you should use v0.2.4 which is the
// latest compatible version
$ npm install --save react-lazyload@0.2.4
```

## Usage

```
import React from 'react';
import ReacrDOM from 'react-dom';
import createLazyLoad from 'react-lazyload';
import MyComponent from './MyComponent';

const LazyLoad = createLazyLoad({
  eventType: 'scroll resize wheel',
  rateLimit: 'debounce',
  wait: 300
});

const App = React.createClass({
  render() {
    return (
      <div className="list">
        <LazyLoad>
          <MyComponent />
        </LazyLoad>
        <LazyLoad>
          <MyComponent />
        </LazyLoad>
        <LazyLoad once >        /* Once this component is loaded, LazyLoad will
                                   not care about it anymore, stuff like images
                                   should add `once` props to reduce listeners for
                                   scroll/resize event and improve performance */
          <MyComponent />
        </LazyLoad>
        <LazyLoad offset={100}> /* This component will be loaded when it's top
                                   edge is 100px from viewport. It's useful to
                                   make user ignorant about lazy load effect. */
          <MyComponent />
        </LazyLoad>
        <LazyLoad>
          <MyComponent />
        </LazyLoad>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.body);
```

## Options

By default, you will import a factory from `react-lazyload` which will create a `LazyLoad` component according to options you passed in.

### eventType

Type: String Default: 'scroll'

Which kind of events should LazyLoad listen to. Multiple event types can be a string separated by a white space. Eg. 'scroll wheel'.

Other options would be `'wheel'` or `'resize'`.

For overflow containers, scroll event not propagated to `window`, so you should use `wheel` props to make LazyLoad listen `wheel` event instead of `scroll`. Check [this demo](https://jasonslyvia.github.io/react-lazyload/examples/overflow.html) for detail.

**NOTICE** If you tend to support legacy IE, set this props carefully, refer to [this question](http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer) for further reading.

### rateLimit

Type: String Default: 'debounce'

Which kind of rate limit method should we use. It is highly recommended to use at lease one kind of rate limit method because of the high invoke frequency of `scroll` event.

An alternative option would be `'throttle'`.

### wait

Type: Number Default: 300

How many ms should rate limit method wait.

## Props

### once

Type: Bool Default: false

Once the lazy loaded component is loaded, do not detect scroll/resize event anymore. Useful for images or simple components.

### offset

Type: Number/Array(Number) Default: 0

Say if you want to preload a module even if it's 100px below the viewport (user have to scroll 100px more to see this module), you can set `offset` props to `100`. On the other hand, if you want to delay loading a module even if it's top edge has already appeared at viewport, set `offset` props to negative number will make it delay loading.

If you provide this props with array like `[200, 200]`, it will set top edge offset and bottom edge offset respectively.

## Props added to children

Like the example above, `<MyComponent>` will get following extra props:

### visible

Type: Bool

Is component currently visible

### firstTimeVisible

Is component first time visible, useful for children component's `componentWillReceiveProps` detect whether or not should query new data.

## Scripts

```
$ npm run demo:watch
$ npm run build
```

## Contributors

1. [lancehub](https://github.com/lancehub)


## License

MIT
