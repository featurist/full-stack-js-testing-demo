const {html: h} = require('hyperdom')
const httpism = require('httpism')

module.exports = class App {
  constructor ({router = require('hyperdom/router'), apiUrl}) {
    this.api = httpism.client(apiUrl)
    this.router = router
    this.todos = []
  }

  routes () {
    const todosRoute = this.router.route('/todos')

    return [
      this.router.route('/')({
        render: () => {
          return h('button', {onclick: () => todosRoute.push()}, 'Fetch me TODOs')
        }
      }),
      todosRoute({
        onload: async () => {
          this.todos = await this.api.get('/api/todos')
        },
        render: () => {
          return h('ul', this.todos.map(t => h('li', t.title)))
        }
      })
    ]
  }

  renderLayout (content) {
    return h('main', content)
  }
}
