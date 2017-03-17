import { combineReducers, createStore, compose } from 'redux';
import { searchTextReducer, showCompletedReducer, todosReducer } from 'reducers';

export const configure = (initialState = {}) => {
    const reducer = combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: todosReducer
    });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, initialState, composeEnhancers());
    return store;
};

// the code above using composeEnhancers works for some undescribed reason
// var redux = require('redux');
// var {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');
//
// export var configure = () => {
//   var reducer = redux.combineReducers({
//     searchText: searchTextReducer,
//     showCompleted: showCompletedReducer,
//     todos: todosReducer
//   });
//
//   var store = redux.createStore(reducer, redux.compose(
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
//   ));
//
//   return store;
// };
