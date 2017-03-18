var React = require('react'); // 3RD PARTY MODULES
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList';  // DEVELOPED MODULES
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

var TodoApp = React.createClass({

  // RENDER FUNCTION
  render: function () {

    // PRESENTATION
    return (
      <div>
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

module.exports = TodoApp;
