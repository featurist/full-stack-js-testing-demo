Full stack (spa + express backend + db) integration tests that run in a single browser process.
--------

As a result, it is fast and debuggable.

This is made possible by the following tech:

- [electron-mocha](https://github.com/jprichardson/electron-mocha) runs tests in a browser that's also a node.js

- [browser-monkey](https://github.com/featurist/browser-monkey) interacts with web pages and asserts DOM

Usage
--------

Requires Node 7.6 or higher.

Clone this repositoty and `yarn install`. Then:

- `yarn start` starts the app

- `yarn test` runs tests in electron/node headlessly

- `yarn test-debug` runs tests and opens up browser window

## We're Hiring!
Featurist provides full stack, feature driven development teams. Want to join us? Check out [our career opportunities](https://www.featurist.co.uk/careers/).
