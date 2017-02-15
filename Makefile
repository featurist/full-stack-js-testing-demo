PATH := node_modules/.bin:$(PATH)
.PHONY: test test-vdom

test:
	electron-rebuild && electron-mocha --js-flags='--harmony-async-await' --renderer test/**/*Spec.js

test-debug:
	electron-rebuild && electron-mocha --interactive --js-flags='--harmony-async-await' --renderer test/**/*Spec.js

test-vdom:
	mocha test/**/*Spec.js
