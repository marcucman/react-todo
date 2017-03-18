var React = require('react'); // NPM MODULES
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp'); // DEVELOPED MODULES
var TodoAPI = require('TodoAPI');
var actions = require('actions'); // REQUIRE REDUX FUNCTIONALITY
var store = require('configureStore').configure();

store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);

  TodoAPI.setTodos(state.todos); // with this, you can store todos in localStorage and this will allow you to set those todos in your state
});

// INITIALIZE APP WITH DATA from localStorage
var initialTodos = TodoAPI.getTodos(); // fetch todos array from localStorage
store.dispatch(actions.addTodos(initialTodos)); // add array of todos to state

// store.dispatch(actions.addTodo('Clean the yard'));
// store.dispatch(actions.setSearchText('yard'));
// store.dispatch(actions.toggleShowCompleted());

// Load foundation, not needed after including sassLoader to webpack.config.js
// require('style!css!foundation-sites/dist/foundation.min.css'); // use style-loader and css-loader module
$(document).foundation(); // attach foundation to document

// app css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  // every child element of a parent element wrapped in <Provider> has access to its store
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
