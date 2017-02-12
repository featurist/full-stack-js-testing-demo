Full stack (spa + express backend + db) integration tests that run in a single browser process.
--------

As a result, it is fast and debuggable.

This is made possible by the following tech:

- [electron-mocha](https://github.com/jprichardson/electron-mocha) runs tests in a browser that's also a node.js

- [browser-monkey](https://github.com/featurist/browser-monkey) interacts with web pages and asserts DOM

Usage
--------

Requires Node 7 or higher.

Clone this repositoty and `npm install`. Then:

- `npm start` starts the app

- `make test` runs tests in electron/node headlessly

- `make test-debug` runs tests and opens up browser window

- `make test-vdom` runs the same tests in virtual-dom/node (no browser!)
