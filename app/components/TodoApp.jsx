var React = require('react'); // 3RD PARTY MODULES
var uuid = require('node-uuid');

var TodoList = require('TodoList'); // DEVELOPED MODULES
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');


var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      showCompleted: false, // show only uncompleted
      searchText: '', // return all Todo items
      todos: TodoAPI.getTodos() // use localStorage API to get todos
    };
  },
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos); // save todos using localStage API
  },
  handleAddTodo: function (text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false
        }
      ]
    });
  },
  handleToggle: function (id) {
    var updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed; // set to the opposite of what it was
      }
      return todo;
    });

    this.setState({todos: updatedTodos});
  },
  handleSearch: function (showCompleted, searchText) {
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  render: function () {
    var {todos, showCompleted, searchText} = this.state;
    var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        <TodoSearch onSearch={this.handleSearch}/>
        <TodoList todos={filteredTodos} onToggle={this.handleToggle}/>
        <AddTodo onAddTodo={this.handleAddTodo}/>
      </div>
    )
  }
});

module.exports = TodoApp;
