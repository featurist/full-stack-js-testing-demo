This is a demo of [browser-monkey](https://github.com/featurist/browser-monkey) testing library.

Usage
---------

Clone this and `npm install`. Then:

- [x] `npm start` to run the app

- [x] `npm test-karma` to run dom tests in karma/browserify+Chrome

- [x] `npm test-electron` to run the same tests in electron/node

- [x] `npm run test-vdom` to run the same tests in vdom/node (no browser!)

Test time
-----------

As seen on MBP 13" Core i7 (2015):

```
npm run test-karma  6.75s user 1.97s system 144% cpu 6.019 total
npm run test-electron  4.60s user 0.80s system 147% cpu 3.652 total
npm run test-vdom  1.19s user 0.21s system 95% cpu 1.469 total
```
