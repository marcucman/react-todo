import React from 'react'; // 3RD PARTY MODULES
import * as Redux from 'react-redux';

import TodoList from 'TodoList';  // DEVELOPED MODULES
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export var TodoApp = React.createClass({ // export for tests

  onLogout(e) {
    var {dispatch} = this.props;
    e.preventDefault(); // prevent page from reloading

    dispatch(actions.startLogout());
  },

  // RENDER FUNCTION
  render() { // ES6 shortcut for function def

    // PRESENTATION
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout}>Logout</a>
        </div>

        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            <div className="container">
              <TodoSearch/>
              <TodoList/>
              <AddTodo/>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

// module.exports = TodoApp;
export default Redux.connect()(TodoApp); // connect TodoApp to redux
// no functions are needed to reduce redux state to props
