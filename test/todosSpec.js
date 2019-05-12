const fs = require('fs')
const hyperdom = require('hyperdom')
const {router: createRouter, memory: createMemoryHistory} = require('hyperdom/router')
const createMonkey = require('browser-monkey/create')
const createTestDiv = require('browser-monkey/lib/createTestDiv')
const sqlite3 = require('sqlite3')
const App = require('../browser/app')
const createServer = require('../server/app')

let dbPath = process.env.DB = process.cwd() + '/test/test.db'

function seedDb () {
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

const port = 6365

function navigateTo(path) {
  const router = createRouter({history: createMemoryHistory()})
  router.push(path)

  const $testContainer = createTestDiv()
  hyperdom.append(
    $testContainer,
    new App({apiUrl: `http://localhost:${port}`, router}),
    {router}
  )

  const browser = createMonkey($testContainer)
  browser.set({timeout: process.env.BM_TIMEOUT || 1000})

  return browser
}

describe('todos app', () => {
  let browser
  let server

  beforeEach(async () => {
    await seedDb()
    server = createServer().listen(port)
  })

  afterEach(() => server.close())

  context('when user lands on "/"', () => {
    beforeEach(() => browser = navigateTo('/'))

    it('allows user to fetch todos', async () => {
      await browser.find('button').click()
      await browser.find('ul li').shouldHave({text: ['one', 'two']})
    })
  })

  context('when user lands on "/todos"', () => {
    beforeEach(() => browser = navigateTo('/todos'))

    it('fetches todos automatically', async () => {
      await browser.find('ul li').shouldHave({text: ['one', 'two']})
    })
  })
})
