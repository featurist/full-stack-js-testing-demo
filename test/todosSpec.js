const fs = require('fs')
const router = require('hyperdom/router')
const server = require('../server/serverApp')
const sqlite3 = require('sqlite3')
const App = require('../browser/browserApp')
const mountApp = require('browser-monkey/hyperdom')
const reloadButton = require('browser-monkey/lib/reloadButton')

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

describe('todos app', () => {
  let browser
  let backend
  let startUrl
  let port = 6365

  beforeEach(async () => {
    await seedDb()
    backend = server.listen(port)
    browser = mountApp(new App(`http://localhost:${port}`), {url: startUrl, router})
    browser.set({timeout: process.env.BM_TIMEOUT || 1000})
    reloadButton()
  })

  afterEach(() => {
    backend.close()
  })

  context('when user lands on "/"', () => {
    before(() => {
      startUrl = '/'
    })

    it('allows user to fetch todos', async () => {
      await browser.find('button').click()
      await browser.find('ul li').shouldHave({text: ['one', 'two']})
    })
  })

  context('when user lands on "/todos"', () => {
    before(() => {
      startUrl = '/todos'
    })

    it('fetches todos automatically', async () => {
      await browser.find('ul li').shouldHave({text: ['one', 'two']})
    })
  })
})
