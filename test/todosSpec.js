const fs = require('fs')
const server = require('../server/serverApp')
const sqlite3 = require('sqlite3')
const App = require('../browser/browserApp')
const mountApp = require('./mountApp')

let dbPath = process.env.DB = process.cwd() + '/test/test.db'

async function seedDb() {
  return new Promise((resolve, reject) => {
    fs.existsSync(dbPath) && fs.unlinkSync(dbPath)

    const db = new sqlite3.Database(dbPath)

    db.run('create table todos (id integer, title text)', (err) => {
      if (err) return reject(err)

      db.run("insert into todos values (1, 'one'), (2, 'two')", () => {
        db.close()
        resolve()
      })
    })
  })
}

describe('todos app', () => {
  let browser, backend, port = 6365

  beforeEach(async () => {
    await seedDb()
    backend = server.listen(port)
    browser = mountApp(new App(`http://localhost:${port}`))
  })

  afterEach(() => {
    backend.close()
  })

  context('when user lands on "/"', () => {
    before(() => {
      window.history.pushState(null, null, '/');
    });

    it('allows user to fetch todos', async () => {
      await browser.find('button').click()
      await browser.find('ul li').shouldHave({text: ['one', 'two']})
    });
  });

  context('when user lands on "/todos"', () => {
    before(() => {
      window.history.pushState(null, null, '/todos');
    });

    it('fetches todos automatically', async () => {
      await browser.find('ul li').shouldHave({text: ['one', 'two']})
    });
  });
});
