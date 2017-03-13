var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var TodoApp = require('TodoApp');

// Load foundation, not needed after including sassLoader to webpack.config.js
// require('style!css!foundation-sites/dist/foundation.min.css'); // use style-loader and css-loader module
$(document).foundation(); // attach foundation to document

// app css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);
