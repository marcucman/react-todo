import { combineReducers, createStore, compose } from 'redux';
import * as redux from 'redux';
import thunk from 'redux-thunk';

import { searchTextReducer, showCompletedReducer, todosReducer } from 'reducers';

// CONFIGURE attaches STATES to REDUCERS

export const configure = (initialState = {}) => {
    const reducer = combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: todosReducer
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, initialState, redux.applyMiddleware(thunk), composeEnhancers());
    return store;
};

// // the code above using composeEnhancers works for some undescribed reason
// import * as redux from 'redux';
// import thunk from 'redux-thunk';
// import {searchTextReducer, showCompletedReducer, todosReducer} from 'reducers';
//
// export var configure = (initialState = {}) => {
//   var reducer = redux.combineReducers({
//     searchText: searchTextReducer,
//     showCompleted: showCompletedReducer,
//     todos: todosReducer
//   });
//
//   var store = redux.createStore(reducer, initialState, redux.compose(
//     redux.applyMiddleware(thunk), // include thunk middleware
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
//   ));
//
//   return store;
// };
