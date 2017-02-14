const fs = require('fs')
const vineHill = require('vinehill')
const server = require('../server/serverApp')
const sqlite3 = require('sqlite3')
const App = require('../browser/browserApp')
const mountApp = require('./mountApp')
const { expect } = require('chai')

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

async function expectTODOs(browser, ...expectedTodos) {
  const $ = browser.get('$')
  const actualTodos = (await browser.find('ul li').elements())
    .map(e => $(e).innerText())

  expect(actualTodos.sort()).to.eql(expectedTodos.sort())
}

describe('todos app', () => {
  let browser

  beforeEach(async () => {
    await seedDb()
    vineHill({'http://todos.com': server})
    browser = mountApp(new App('http://todos.com'))
  });

  context('when user lands on "/"', () => {
    before(() => {
      window.history.pushState(null, null, '/');
    });

    it('allows user to fetch todos', async () => {
      await browser.find('button').click()
      await expectTODOs(browser, 'one', 'two')
    });
  });

  context('when user lands on "/todos"', () => {
    before(() => {
      window.history.pushState(null, null, '/todos');
    });

    it('fetches todos automatically', async () => {
      await expectTODOs(browser, 'one', 'two')
    });
  });
});
