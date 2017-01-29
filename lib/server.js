import app from './app'

var port = process.env.PORT || 4322;

app.listen(port, function () {
  console.log(`listening on http://localhost:${port}/`);
});
