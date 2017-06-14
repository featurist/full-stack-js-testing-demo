const {html: h} = require('hyperdom')
const router = require('hyperdom/router')
const httpism = require('httpism')

const routes = {
  home: router.route('/'),
  todos: router.route('/todos')
}

module.exports = class App {
  constructor(serverUrl) {
    this.api = httpism.client(serverUrl)
    this.todos = []
  }

  routes() {
    return [
      routes.home({
        render: () => {
          return h('button', {onclick: () => routes.todos.push()}, 'Fetch me TODOs')
        }
      }),
      routes.todos({
        onload: async () => {
          this.todos = await this.api.get('/api/todos')
        },
        render: () => {
          return h('ul', this.todos.map(t => h('li', t.title)))
        }
      })
    ]
  }

  render(content) {
    return h('main', content)
  }
}
