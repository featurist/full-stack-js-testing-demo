const fs = require('fs')
const vineHill = require('vinehill')
const server = require('../lib/app')
const sqlite3 = require('sqlite3')
const App = require('../browser/app')
const mountApp = require('./mountApp')
const pageHelper = require('./pageHelper')

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
  let page

  beforeEach(async () => {
    await seedDb()
    vineHill({'http://todos.com': server})
    const browser = mountApp(new App('http://todos.com'));
    page = pageHelper(browser);
  });

  context('when user lands on "/"', () => {
    before(() => {
      window.history.pushState(null, null, '/');
    });

    it('allows user to fetch todos', async () => {
      await page.fetchTODOsButton().click();
      await page.expectTODOs('one', 'two');
    });
  });

  context('when user lands on "/todos"', () => {
    before(() => {
      window.history.pushState(null, null, '/todos');
    });

    it('fetches todos automatically', async () => {
      await page.expectTODOs('one', 'two');
    });
  });
});
