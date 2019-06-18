const {existsSync, unlinkSync} = require('fs')
const ReactDOM = require('react-dom')
const React = require('react')
const createMonkey = require('browser-monkey/create')
const createTestDiv = require('browser-monkey/lib/createTestDiv')
const {Database} = require('sqlite3')
const App = require('../browser/app')
const createServer = require('../server/app')

let dbPath = process.env.DB = process.cwd() + '/test/test.db'

function seedDb () {
  return new Promise((resolve, reject) => {
    existsSync(dbPath) && unlinkSync(dbPath)

    const db = new Database(dbPath)

    db.run('create table todos (id integer, title text, user text)', (err) => {
      if (err) return reject(err)

      db.run("insert into todos values (1, 'one', 'Alice'), (2, 'two', 'Alice')", () => {
        db.close()
        resolve()
      })
    })
  })
}

const port = 6365

describe('todos app', () => {
  let page
  let server

  beforeEach(async () => {
    await seedDb()
    server = createServer().listen(port)

    const $testContainer = createTestDiv()

    ReactDOM.render(
      React.createElement(App, {apiUrl: `http://localhost:${port}/`}),
      $testContainer
    )

    page = createMonkey($testContainer)
    page.set({timeout: process.env.BM_TIMEOUT || 1000})
  })

  afterEach(() => server.close())

  describe('user exists', () => {
    test('it shows TODOs', async () => {
      console.log('xxxx');
      await page.find('input[name=user]').typeIn('Alice')
      await page.click('Fetch TODOs')
      await page.find('ul li').shouldHave({text: ['one', 'two']})
    })
  })

  describe('user does not exist', () => {
    test('it shows a message', async () => {
      console.log('yyyyy');
      await page.find('input[name=user]').typeIn('Bob')
      await page.click('Fetch TODOs')
      await page.shouldHave({text: "Could not find Bob's TODOs"})
    })
  })
})
