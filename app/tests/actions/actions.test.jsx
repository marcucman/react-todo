var expect = require('expect');
import configureMockStore from 'redux-mock-store'; // for testing async store using firebase
import thunk from 'redux-thunk'; // actions expect thunk to be available

var actions = require('actions');

// create a mock store for tests
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    // call action generator and save response
    var res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '234sfsf',
        text: 'test stuff',
        completed: false,
        createdAt: 0
      }
    };
    var res = actions.addTodo(action.todo); // specifically pass the todo object

    expect(res).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    var res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });

  it('should generate add todos action object', () => {
    var todos = [{
      id: '111',
      text: 'anything',
      completed: false,
      completedAt: undefined,
      createdAt: 33000
    }];
    var action = {
      type: 'ADD_TODOS',
      todos // the todos array defined above
    };
    var res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 1
    };
    var res = actions.toggleTodo(action.id);

    expect(res).toEqual(action);
  });

  it('should create todo and dispatch ADD_TODO', (done) => { // done signifies asynchronous
    const store = createMockStore({}); // empty store
    const todoText = 'My todo item';

    store.dispatch(actions.startAddTodo(todoText)).then( () => {
      const actions = store.getActions(); // returns array of all actions fired on mockStore
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done(); // if you forget this, the test will return 'test timed out'
    }).catch(done);

  });
});
