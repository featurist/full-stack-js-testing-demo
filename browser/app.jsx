/** @jsx plastiq.jsx */
import plastiq from 'plastiq'
import router from 'plastiq-router'
import Api from './api';

const routes = {
  home: router.route('/'),
  todos: router.route('/todos')
};
router.start();

function navigateTo(route) {
  route().push();
}

export default class App {
  constructor(api = Api) {
    this.api = api;
  }

  async loadTODOs() {
    this.todos = await this.api.loadTODOs();
  }

  render() {
    return <main>
      {
        routes.home(() => {
          return <button onclick={ () => navigateTo(routes.todos) }>Fetch me TODOs</button>
        })
      }
      {
        routes.todos({ onarrival: this.loadTODOs.bind(this) }, () => {
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
