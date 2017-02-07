const hyperdom = require('hyperdom')
const hyperx = require('hyperx')
const h = hyperx(hyperdom.html)

const router = require('hyperdom-router')
const httpism = require('httpism')

function navigateTo(route) {
  route().push();
}

module.exports = class App {
  constructor(serverUrl) {
    router.clear()
    router.start()

    this.api = httpism.api(serverUrl)

    this.routes = {
      home: router.route('/'),
      todos: router.route('/todos')
    };

    this.todos = []
  }

  async loadTODOs() {
    this.todos = (await this.api.get('/api/todos')).body
  }

  render() {
    return h`
      <main>
        ${
          this.routes.home(() => {
            return h`<button onclick=${ () => navigateTo(this.routes.todos) }>Fetch me TODOs</button>`
          })
        }
        ${
          this.routes.todos({ onarrival: () => this.loadTODOs() }, () => {
            return h`<ul>${ this.todos.map(t => h`<li>${ t.title }</li>`) }</ul>`
          })
        }
      </main>`
  }
}
