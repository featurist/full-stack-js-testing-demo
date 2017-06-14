PATH := node_modules/.bin:$(PATH)
.PHONY: test

test:
	electron-mocha --renderer test/**/*Spec.js

test-debug:
	DEBUG=error*,browser-monkey BM_TIMEOUT=false electron-mocha --interactive --renderer test/**/*Spec.js
