/** @jsx hyperdom.jsx */
import hyperdom from 'hyperdom';
import router from 'hyperdom-router';
import httpism from 'httpism'

function navigateTo(route) {
  route().push();
}

export default class App {
  constructor(serverUrl) {
    router.clear()
    router.start()

    this.api = httpism.api(serverUrl)

    this.routes = {
      home: router.route('/'),
      todos: router.route('/todos')
    };
  }

  async loadTODOs() {
    this.todos = (await this.api.get('/api/todos')).body
  }

  render() {
    return <main>
      {
        this.routes.home(() => {
          return <button onclick={ () => navigateTo(this.routes.todos) }>Fetch me TODOs</button>
        })
      }
      {
        this.routes.todos({ onarrival: () => this.loadTODOs() }, () => {
          return this.todos
            ?
              <ul>{ this.todos.map(t => <li>{ t.title }</li>) }</ul>
            :
              <div class="loading">Loading...</div>
        })
      }
    </main>
  }
}
