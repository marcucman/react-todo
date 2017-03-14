var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function () {
    var {todos} = this.props;
    var renderTodos = () => {
      // render JSX code for every element in the array using .map()
      return todos.map((todo) => {
        return (
          // each individual component needs a unique key prop
          // {...} is SPREAD OPERATOR which passes the values within each todo object as props
          <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
        )
      });
    };

    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

module.exports = TodoList;
