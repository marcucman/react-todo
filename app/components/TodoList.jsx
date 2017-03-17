var React = require('react');
var {connect} = require('react-redux'); // can now access state properties and dispatch methods
import Todo from 'Todo';
// var Todo = require('Todo');
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
  render: function () {
    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {
      if (todos.length === 0) {
        return (
          <p className="container__message">Nothing to do</p>
        )
      }
      // render JSX code for every element in the array using .map()
      return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
        return (
          // each individual component needs a unique key prop
          // {...} is SPREAD OPERATOR which passes the values within each todo object as props
          <Todo key={todo.id} {...todo}/>
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

// TodoList component can now request data as it likes
export default connect(
  (state) => {
    // return { // return what you need from the state
    //   // set the todos prop as the todos from the state
    //   todos: state.todos // todos gets set on the props for the component
    // }
    return state; // give access to everything in the state tree
  }
)(TodoList);
