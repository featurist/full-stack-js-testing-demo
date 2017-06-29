let g:ale_linters = {
      \   'javascript': ['standard'],
      \}

set conceallevel=0

let g:vigun_commands = [
      \ {
      \   'pattern': 'Spec.js$',
      \   'normal': 'electron-mocha --renderer',
      \   'debug': 'DEBUG=error*,browser-monkey BM_TIMEOUT=false electron-mocha --interactive --no-timeouts',
      \ },
      \]
