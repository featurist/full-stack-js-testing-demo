Full stack (spa + express backend + db) integration test that runs in a single process.
--------

As a result, it is fast and debuggable.

The key tech that makes this possible is [electron-mocha](https://github.com/jprichardson/electron-mocha) (runs tests in a browser that's also a node.js), [browser-monkey](https://github.com/featurist/browser-monkey)(interacts with web pages and asserts) and [vinehill](https://github.com/dereke/vinehill) (cuts out HTTP to keep server in the same test process).

Usage
--------

Clone this and `npm install`. Then:

- `npm start` starts the app

- `npm test` runs tests in electron/node (add `-- --interactive` to see the browser window)

- `npm run test-vdom` runs the same tests in vdom/node (no browser!)
