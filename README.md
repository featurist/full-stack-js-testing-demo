Full stack (spa + express backend + db) integration tests that run in a single browser process.
--------

As a result, it is fast and debuggable.

This is made possible by the following tech:

- [electron-mocha](https://github.com/jprichardson/electron-mocha) runs mocha tests in Electron browser - a browser that's also a Node runtime

- [browser-monkey](https://github.com/featurist/browser-monkey) interacts with web pages and asserts DOM

Usage
--------

Clone this repositoty and `yarn install`. Then:

- `yarn start` starts the app

- `yarn test` runs tests in electron/node headlessly

- `yarn test --interactive` runs tests and opens up browser window

For comparison, there is a selenium webdriver version of the same tests. Can be run like this:

- `yarn test-wd` - headless

- `GUI=1 yarn test-wd` - with browser window

## We're Hiring!

Join our remote team and help us build amazing software. Check out [our career opportunities](https://www.featurist.co.uk/careers/).
