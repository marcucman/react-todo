var React = require('react'); // NPM MODULES
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp'); // DEVELOPED MODULES
var TodoAPI = require('TodoAPI');
var actions = require('actions'); // REQUIRE REDUX FUNCTIONALITY
var store = require('configureStore').configure();

// import './../playground/firebase/index';

// // STORE SUBSCRIBE
// store.subscribe(() => { // have the store listen for action dispatchers
//   var state = store.getState();
//   console.log('New state', state);
//
//   TodoAPI.setTodos(state.todos); // store todos from state into localStorage
// });

// // INITIALIZE APP WITH DATA from localStorage
// var initialTodos = TodoAPI.getTodos(); // fetch todos array from localStorage
// store.dispatch(actions.addTodos(initialTodos)); // add array of todos to state

store.dispatch(actions.startAddTodos()); // fetch todos from firebase and add to store

// Foundation loaded after including sassLoader to webpack.config.js so you don't need require('style!css!foundation-sites/dist/foundation.min.css'); // use style-loader and css-loader module
$(document).foundation(); // attach foundation to document

// app css
require('style!css!sass!applicationStyles');

// every child element of a parent element wrapped in <Provider> has access to its store
ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
