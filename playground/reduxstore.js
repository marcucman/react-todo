var reduxState = {
  searchText: 'Dog',
  showCompleted: false,
  todos: [{
    id; '123',
    text: 'walk the dog'
  }]
};

// states are read only by default
// actions = used to update state
// 'dispatch actions' to update state

// actions = simple objects

var action = {
  type: 'CHANGE_SEARCH_TEXT', // action name
  searchText: 'something else' // things required to update state
}

// object = maintains state
// actions = changes data in state
