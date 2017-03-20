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

// START ADD TO_DO --ASYNC
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

// START ADD TO_DO_S (ARRAY todos) --ASYNC
export var startAddTodos = (todos) => {
  return (dispatch, getState) => {
    var todosRef = firebaseRef.child('todos'); // set reference

    return todosRef.once('value').then( (snapshot) => {
      var todos = snapshot.val() || {}; // the data returned from firebase
      var parsedTodos = [];

      Object.keys(todos).forEach( (todoId) => {
        parsedTodos.push({
          id: todoId,
          ...todos[todoId] // grab the object whose key matches the todoId from above
        });
      });

      dispatch(addTodos(parsedTodos)); // update redux store (which will rerender display)
    });
  }
};

// UPDATE TO_DO (STRING id, OBJECT updates)
export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  }
};

// START TOGGLE TO_DO --ASYNC
export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    // PREPARE UPDATE FIREBASE
    var todoRef = firebaseRef.child(`todos/${id}`); // identify correct todo
    var updates = { // set update object
      completed, // set completed to the value passed from Todo.jsx
      completedAt: completed ? moment().unix() : null
    };

    // UPDATE FIREBASE, THEN UPDATE STATE
    return todoRef.update(updates).then( () => { // return the promise so you can chain onto it in tests
      dispatch(updateTodo(id, updates)); // update the todo in the state
    });
  }
}
