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
  },
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      // return each todo either if not completed, or showCompleted is checked to be true
      return !todo.completed || showCompleted;
    });

    // // Filter by searchText
    // if (searchText.length > 0) {
    //   var searchText = searchText.toLowerCase();
    //   filteredTodos = filteredTodos.filter((todo) => {
    //     return todo.text.indexOf(searchText) >= 0;
    //   });
    // }

    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase();

      // if (searchText.length > 0) { // not needed, since .toLowerCase() is done in TodoApp
      //   searchText = searchText.toLowerCase();
      // }

      return searchText.length === 0 || text.indexOf(searchText) > -1;
    });

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        // if a is not completed and b is, put b in front of a
        return -1;
      } else if (a.completed && !b.completed) {
        // if a is completed and b is not, put a in front of b
        return 1;
      } else {
        // both a and b have the same completed status, and don't need to move
        return 0;
      }
    });

    return filteredTodos;
  }
};
