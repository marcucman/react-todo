var React = require('react');
var TodoList = require('TodoList');

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      todos: [
        {
          id: 1,
          text: "walk dog"
        },
        {
          id: 2,
          text: "call person"
        },
        {
          id: 3,
          text: "eat food"
        },
        {
          id: 4,
          text: "sleep eventually"
        }
      ]
    }
  },
  render: function () {
    var {todos} = this.state;

    return (
      <div>
        <TodoList todos={todos}/>
      </div>
    )
  }
});

module.exports = TodoApp;
