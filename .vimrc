let g:ale_linters = {
      \   'javascript': ['standard'],
      \}

set conceallevel=0

let g:vigun_commands = [
      \ {
      \   'pattern': 'Spec.js$',
      \   'normal': './node_modules/.bin/electron-mocha --renderer --color',
      \   'debug': 'DEBUG=error*,browser-monkey BM_TIMEOUT=false ./node_modules/.bin/electron-mocha --renderer --interactive --no-timeouts --color',
      \ },
      \]
