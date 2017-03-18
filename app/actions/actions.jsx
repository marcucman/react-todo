// ACTIONS
// *******************************************
// SET SEARCH TEXT (STRING searchText)
export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  }
};

// TOGGLE SHOW COMPLETED ()
export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  }
};

// ADD TO_DO (STRING text)
export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  }
};

// ADD TO_DO_S (ARRAY todos)
export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  }
};

// TOGGLE TO_DO (STRING id)
export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
};
