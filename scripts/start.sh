#!/usr/bin/env bash

if [ "$NODE_ENV" = 'production' ]; then
  node ./server/app.js
else
  node-dev --no-notify --respawn --inspect -- ./server/app.js
fi
