/** @jsx plastiq.jsx */
import plastiq from 'plastiq'
import router from 'plastiq-router'
import httpism from 'httpism'

const routes = {
  home: router.route('/'),
  todos: router.route('/todos')
};
router.start();

export default class App {
  constructor() {
    this.todos = [];
  }

  fetchTODOs() {
    return httpism.get('/todos').then(res => {
      this.todos = res.body;
      window.history.pushState(null, 'todos', '/todos');
    });
  }

  render() {
    return <main>
      {
        routes.home(() => {
          return <button onclick={ () => this.fetchTODOs() }>Fetch me TODOs</button>
        })
      }
      {
        routes.todos(() => {
          return <ul>
            {
              this.todos.map(t => <li>{ t.title }</li>)
            }
          </ul>
        })
      }
    </main>
  }
}
