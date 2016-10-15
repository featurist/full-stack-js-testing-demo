/** @jsx plastiq.jsx */
import plastiq from 'plastiq';
import router from 'plastiq-router';
import Api from './api';

function navigateTo(route) {
  route().push();
}

export default class App {
  constructor({api, routerOptions} = {}) {
    this.api = api || Api;

    this.routes = {
      home: router.route('/'),
      todos: router.route('/todos')
    };
    router.start(routerOptions);
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
        this.routes.todos({ onarrival: this.loadTODOs.bind(this) }, () => {
          return this.todos
            ?
              <ul>{ this.todos.map(t => <li>{ t.title }</li>) }</ul>
            :
              <div>Loading...</div>
        })
      }
    </main>
  }
}
