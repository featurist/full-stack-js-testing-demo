import {existsSync, unlinkSync} from 'fs'
import ReactDOM from 'react-dom'
import React from 'react'
import createMonkey from 'browser-monkey/create'
import createTestDiv from 'browser-monkey/lib/createTestDiv'
import {Database} from 'sqlite3'
import createServer from '../server/app'
import App from '../browser/app'

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

  context('user exists', () => {
    it('shows TODOs', async () => {
      await page.find('input[name=user]').typeIn('Alice')
      await page.click('Fetch TODOs')
      await page.find('ul li').shouldHave({text: ['one', 'two']})
    })
  })

  context('user does not exist', () => {
    it('shows a "not found" message', async () => {
      await page.find('input[name=user]').typeIn('Bob')
      await page.click('Fetch TODOs')
      await page.shouldHave({text: "Could not find Bob's TODOs"})
    })
  })
})
