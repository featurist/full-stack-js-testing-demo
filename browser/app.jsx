/** @jsx hyperdom.jsx */
import hyperdom from 'hyperdom';
import Api from './api';

function navigateTo(route) {
  route().push();
}

export default class App {
  constructor({api, router}) {
    this.api = api || Api;
    this.router = router;

    this.routes = {
      home: this.router.route('/'),
      todos: this.router.route('/todos')
    };
  }

  async loadTODOs() {
    this.todos = await this.api.loadTODOs();
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
