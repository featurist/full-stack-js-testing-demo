/** @jsx plastiq.jsx */
import plastiq from 'plastiq'
import router from 'plastiq-router'
import httpism from 'httpism'

const routes = {
  home: router.route('/'),
  todos: router.route('/todos')
};
router.start();

function navigateTo(path) {
  window.history.pushState(null, path, '/' + path);
}

export default class App {

  loadTODOs() {
    return httpism.get('/api/todos').then(res => {
      this.todos = res.body;
    });
  }

  render() {
    return <main>
      {
        routes.home(() => {
          return <button onclick={ () => navigateTo('todos') }>Fetch me TODOs</button>
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
