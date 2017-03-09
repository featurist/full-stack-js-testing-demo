const hyperdom = require('hyperdom')
const App = require('./browserApp')
const router = require('hyperdom-router')

router.start()
hyperdom.append(document.body, new App())
