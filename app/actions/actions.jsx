import firebase, {firebaseRef, githubProvider} from 'app/firebase/'; // filename can be left off since it is index.js
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
    var uid = getState().auth.uid; // get auth uid from state
    var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo); // push data to firebase

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
    var uid = getState().auth.uid; // get auth uid from state
    var todosRef = firebaseRef.child(`users/${uid}/todos`); // set reference

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
    var uid = getState().auth.uid; // get auth uid from state
    var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`); // identify correct todo
    var updates = { // set update object
      completed, // set completed to the value passed from Todo.jsx
      completedAt: completed ? moment().unix() : null
    };

    // UPDATE FIREBASE, THEN UPDATE STATE
    return todoRef.update(updates).then( () => { // return the promise so you can chain onto it in tests
      dispatch(updateTodo(id, updates)); // update the todo in the state
    });
  }
};

// REMOVE TODOS () when user logs out
export var removeTodos = () => {
  return {
    type: 'REMOVE_TODOS'
  }
}

// HANDLE USER LOG IN
// ************************************************
// LOG IN
export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  }
};

// LOG OUT
export var logout = () => {
  return {
    type: 'LOGOUT'
  }
};

// LOG IN USER TO FIREBASE
export var startLogin = () => {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(githubProvider).then( (result) => { // success
      console.log('Auth worked', result);
    }, (error) => { // error
      console.log('Unable to auth', error);
    });
  }
};
// LOG OUT USER FROM FIREBASE
export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then( () => { // success
      console.log('Logged out');
    });
  }
};
