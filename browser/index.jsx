import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(<App apiUrl={window.location.href}/>, document.body)
