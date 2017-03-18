var $ = require('jquery');

// FUNCTIONS TO BE USED ELSEWHERE
module.exports = {
  // LOCAL STORAGE MANAGEMENT
  // *******************************************
  // SET TODOS (ARRAY todos) saves todos in localStorage and RETURNS ARRAY todos
  setTodos: function(todos) {
    if ($.isArray(todos)) { // check that it is an array
      localStorage.setItem('todos', JSON.stringify(todos)); // convert todos array to a string
      return todos;
    }
  },
  // GET TODOS () RETURNS ARRAY todos
  getTodos: function () {
    var stringTodos = localStorage.getItem('todos'); // returns a string
    var todos = []; // empty array to store parsed JSON

    try { // convert string to array
      todos = JSON.parse(stringTodos);
    } catch (e) {
      console.log(e);
    }

    // ensure that todos is an array
    return $.isArray(todos) ? todos : []; // return the array if true, return a blank array if false
  },
  // FILTER TODOS (ARRAY todos, BOOLEAN showCompleted, STRING searchText) RETURN ARRAY filteredTodos
  filterTodos: function (todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      // return each todo either if not completed, or showCompleted is checked to be true
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      var text = todo.text.toLowerCase(); // get lowercased text for each todo

      // return every todo is no searchText, or only todos with text that match searchText
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
