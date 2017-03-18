var uuid = require('node-uuid');
var moment = require('moment');

// REDUCERS handle ACTIONS

// searchText
export var searchTextReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
};

// showCompleted
export var showCompletedReducer = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
};

// todos
export var todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
              ...state,
              action.todo // new todo content received from action
            ];
        case 'TOGGLE_TODO':
            return state.map((todo) => {
              if (todo.id === action.id) { // the todo being searched for
                return {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? moment().unix() : undefined
                };
              } else { // all the other todos
                return {...todo}; // OR return todo;
              }
            });
        case 'ADD_TODOS': // add an array of todos
            return [
              ...state,
              ...action.todos
            ];
        default:
            return state;
    }
};
