var express = require('express');
var babelify = require('express-babelify-middleware');

var app = express();

var todos = [
  {id: 1, title: 'buy beer'},
  {id: 2, title: 'call Dave'},
  {id: 3, title: 'drink beer'},
]

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.get('/bundle.js', babelify('browser.js', null, {
  presets: ['react', 'es2015'],
  plugins: ['transform-regenerator']
}));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 4322;

app.listen(port, function () {
  console.log(`listening on http://localhost:${port}/`);
});
