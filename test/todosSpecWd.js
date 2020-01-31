const {existsSync, unlinkSync} = require('fs')
const {Builder, By, Key} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const {Database} = require('sqlite3')
const createServer = require('../server/app')
const assert = require('assert')

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
  let driver, server

  before(async () => {
    let builder = new Builder().forBrowser('chrome')
    if (!process.env.GUI) {
      builder = builder.setChromeOptions(new chrome.Options().headless())
    }
    driver = await builder.build()
  })

  after(() => driver.quit())

  beforeEach(async () => {
    await seedDb()
    server = createServer().listen(port)
    await driver.get('http://localhost:6365')
  })

  afterEach(() => server.close())

  context('user exists', () => {
    it('shows TODOs', async () => {
      await driver.findElement(By.name('user')).sendKeys('Alice', Key.RETURN)
      const todos = await Promise.all(
        (await driver.findElements(By.css('ul li'))).map(e => e.getText())
      )
      assert.deepEqual(todos, ['one', 'two'])
    })
  })

  context('user does not exist', () => {
    it('shows a "not found" message', async () => {
      await driver.findElement(By.name('user')).sendKeys('Bob', Key.RETURN)
      const alert = await (await driver.findElement(By.css('h3'))).getText()
      assert.equal(alert, "Could not find Bob's TODOs")
    })
  })
})
