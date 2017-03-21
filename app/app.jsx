var React = require('react'); // NPM MODULES
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

// DEVELOPED MODULES
var actions = require('actions'); // REQUIRE REDUX FUNCTIONALITY
var store = require('configureStore').configure();
import firebase from 'app/firebase/';
import router from 'app/router/'; // /index.jsx not required

// HANDLE LOG IN / LOG OUT
firebase.auth().onAuthStateChanged( (user) => { // gets called every time auth state changes
  if (user) { // user logged in
    store.dispatch(actions.login(user.uid)); // log user in to store
    store.dispatch(actions.startAddTodos()); // fetch todos from firebase and add to store
    hashHistory.push('/todos'); // redirect to /todos
  } else { // user logged out
    store.dispatch(actions.logout()); // log user out from store
    hashHistory.push('/'); // redirect to /
  }
});

// Foundation loaded after including sassLoader to webpack.config.js so you don't need require('style!css!foundation-sites/dist/foundation.min.css'); // use style-loader and css-loader module
$(document).foundation(); // attach foundation to document

// app css
require('style!css!sass!applicationStyles');

// every child element of a parent element wrapped in <Provider> has access to its store
// {router} brings in app/router/index.jsx
ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
