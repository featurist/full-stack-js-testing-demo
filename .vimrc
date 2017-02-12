let g:vigun_mocha_commands = [
      \ {
      \   'pattern': 'Spec.js$',
      \   'normal': 'mocha',
      \   'debug': 'BM_TIMEOUT=false electron-mocha --js-flags="--harmony-async-await" --interactive --no-timeouts',
      \ },
      \]
