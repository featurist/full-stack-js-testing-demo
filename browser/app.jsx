const React = require('react')

module.exports = class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
  }

  handleNameChange(event) {
    this.setState({user: event.target.value});
  }

  async fetchTodos(event) {
    event.preventDefault()

    const response = await fetch(`${this.props.apiUrl}api/todos/${this.state.user}`)

    if (response.status === 200) {
      this.setState({todos: await response.json()})
    } else {
      this.setState({error: await response.text()})
    }
  }

  render () {
    if (this.state.error) {
      return <h3>{this.state.error}</h3>
    }

    return this.state.todos
      ?
        <>
          <h1>{this.state.user}'s TODOs</h1>
          <ul>
            {this.state.todos.map((todo, n) => <li key={n}>{todo.title}</li>)}
          </ul>
        </>
      :
        <form onSubmit={this.fetchTodos}>
          <label>
            Name:
            <input type="text" name="user" value={this.state.user} onChange={this.handleNameChange} />
          </label>
          <input type="submit" value="Fetch TODOs" />
        </form>
  }
}
