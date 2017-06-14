const express = require('express')
const browserify = require('browserify-middleware')
const sqlite3 = require('sqlite3')

const app = express()

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
  res.set({'content-type': 'text/html'})
  res.send(
    `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>todo app</title>
  </head>
  <body>
    <script src="bundle.js" defer></script>
  </body>
</html>
    `
  )
});

module.exports = app
