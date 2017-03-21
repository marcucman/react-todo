import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/'; // /index.js not required

// MIDDLEWARE for requiring a user to be logged in
var requireLogin = (nextState, replace, next) => { // replace = allows for switching URLs, next = for async actions
  if (!firebase.auth().currentUser) { // if no one is logged in (currentUser === null)
    replace('/'); // redirect to root
  }
  next();
}
// MIDDLEWARE for rerouting a user if logged in
var redirectIfLoggedIn = (nextState, replace, next) => { // replace = allows for switching URLs, next = for async actions
  if (firebase.auth().currentUser) { // if user is logged in (currentUser !== null)
    replace('/todos'); // redirect to /todos
  }
  next();
}

// use onEnter attribute to specify midleware for a route
export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp} onEnter={requireLogin} />
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
    </Route>
  </Router>
)
