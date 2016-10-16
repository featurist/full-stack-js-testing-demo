import express from 'express';
import babelify from 'express-babelify-middleware';

const app = express();

var todos = [
  {id: 1, title: 'buy beer'},
  {id: 2, title: 'call Dave'},
  {id: 3, title: 'watch tv'},
]

// setTimeout emulates long request
app.get('/api/todos', (req, res) => {
  setTimeout(() => res.send(todos), 1000);
});

app.get('/bundle.js', babelify('browser/browser.js'));

app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

var port = process.env.PORT || 4322;

app.listen(port, function () {
  console.log(`listening on http://localhost:${port}/`);
});
