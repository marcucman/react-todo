import firebase, {firebaseRef} from 'app/firebase/'; // filename can be left off since it is index.js
import moment from 'moment';

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

// ADD TO_DO (OBJECT)
export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  }
};

// START ADD TO_DO
export var startAddTodo = (text) => {
  return (dispatch, getState) => { // dispatch will let you fire action after data gets saved
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(), // timestamp
      completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo); // push data to firebase

    return todoRef.then( () => { // when firebase has completed adding todo ...
      dispatch(addTodo({ // rerender component with new todo from firebase to browser
        ...todo,
        id: todoRef.key
      }));
    });
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
