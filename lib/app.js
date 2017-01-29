import express from 'express';
import babelify from 'express-babelify-middleware';
import sqlite3 from 'sqlite3'

const app = express();

app.get('/api/todos', (req, res) => {
  const db = new sqlite3.Database(process.env.DB || process.cwd() + '/app.db')

  db.all('select * from todos', (err, rows) => {
    res.send(rows)
    db.close()
  })
});

app.get('/bundle.js', babelify('browser/browser.js'));

app.get('*', (req, res) => {
  res.sendFile(process.cwd() + '/public/index.html');
});

export default app
