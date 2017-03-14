var $ = require('jquery');

// this will fetch items from localStorage
module.exports = {
  setTodos: function(todos) {
    if ($.isArray(todos)) {
      // convert todos array to a string
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function () {
    var stringTodos = localStorage.getItem('todos'); // returns a string
    var todos = [];

    // convert string to array
    try {
      // set todos to a new array
      todos = JSON.parse(stringTodos);
    } catch (e) {

    }

    // // if todos is an object, you don't want to return it
    // if ($.isArray(todos)) {
    //   return todos;
    // } else {
    //   return [];
    // }
    // this does the same as above but it more concise
    return $.isArray(todos) ? todos : []; // return the array if true, return a blank array if false
  }
};
