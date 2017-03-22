// // WITH THIS CODE ALL TESTS WORK, BUT THE REDUX DEV TOOL FAILS
// import { combineReducers, createStore, compose } from 'redux';
// import * as redux from 'redux';
// import thunk from 'redux-thunk';
//
// import { searchTextReducer, showCompletedReducer, todosReducer, authReducer } from 'reducers';
//
// // CONFIGURE attaches STATES to REDUCERS
//
// export const configure = (initialState = {}) => {
//     const reducer = combineReducers({
//         searchText: searchTextReducer,
//         showCompleted: showCompletedReducer,
//         todos: todosReducer,
//         auth: authReducer
//     });
//     const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose;
//     const store = createStore(reducer, initialState, redux.applyMiddleware(thunk), composeEnhancers());
//     return store;
// };


// the code above using composeEnhancers works for some undescribed reason
// WITH THIS CODE, SOME TESTS FAIL, BUT THE REDUX DEV TOOL IS AVAILABLE
import * as redux from 'redux';
import thunk from 'redux-thunk';
import {searchTextReducer, showCompletedReducer, todosReducer, authReducer } from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    todos: todosReducer,
    auth: authReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk), // include thunk middleware
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));

  return store;
};
