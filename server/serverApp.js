const express = require('express')
const browserify = require('browserify-middleware')
const sqlite3 = require('sqlite3')

const app = express();

app.get('/api/todos', (req, res) => {
  const db = new sqlite3.Database(process.env.DB || process.cwd() + '/app.db')

  db.all('select * from todos', (err, rows) => {
    res.send(rows)
    db.close()
  })
});

app.get('/bundle.js', browserify('browser/mount.js', {
  transform: ['babelify'],
}));

app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

module.exports = app
