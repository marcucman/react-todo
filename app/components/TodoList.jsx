var React = require('react');
var {connect} = require('react-redux'); // REDUX
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({ // export for tests

    // RENDER FUNCTION
    render: function () {
      var {todos, showCompleted, searchText} = this.props; // destructure props

      var renderTodos = () => {
        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText); // filer todos

        if (filteredTodos.length === 0) { // if no todos OR all todos are completed
          return (
            <p className="container__message">Nothing to do</p>
          )
        } else {
          return filteredTodos.map((todo) => {
            return ( // each individual component needs a unique key prop
              <Todo key={todo.id} {...todo}/> // SPREAD OPERATOR passes key / values as props
            )
          });
        }
      };

    // PRESENTATION
    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

export default connect( // connect to redux action dispatcher
  (state) => { // access state. you can return whole state or subdocuments within state
    return state; // give access to everything in the state tree
    // // set the todos prop as the todos from the state
    // todos: state.todos // todos gets set on the props for the component
  }
)(TodoList);
