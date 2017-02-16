let g:vigun_mocha_commands = [
      \ {
      \   'pattern': 'Spec.js$',
      \   'normal': 'mocha',
      \   'debug': 'DEBUG=browser-monkey BM_TIMEOUT=false electron-mocha --js-flags="--harmony-async-await" --interactive --no-timeouts',
      \ },
      \]
