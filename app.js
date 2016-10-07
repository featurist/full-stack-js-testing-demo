var express = require('express');
var babelify = require('express-babelify-middleware');

var app = express();

var todos = [
  {id: 1, title: 'buy beer'},
  {id: 2, title: 'call Dave'},
  {id: 3, title: 'watch tv'},
]

app.get('/api/todos', (req, res) => {
  setTimeout(() => res.send(todos), 1000);
});

app.get('/bundle.js', babelify('browser.js', null, {
  presets: ['react', 'es2015']
}));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 4322;

app.listen(port, function () {
  console.log(`listening on http://localhost:${port}/`);
});
