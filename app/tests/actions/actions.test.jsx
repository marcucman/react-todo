var expect = require('expect');
import configureMockStore from 'redux-mock-store'; // for testing async store using firebase
import thunk from 'redux-thunk'; // actions expect thunk to be available

import firebase, {firebaseRef} from 'app/firebase/';
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

  it('should generate update todo action', () => {
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {completed: false}
    };
    var res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  it('should generate login action object', () => {
    const action = {
      type: 'LOGIN',
      uid: '123abc'
    };
    const res = actions.login(action.uid);

    expect(res).toEqual(action);
  });

  it('should generate logout action object', () => {
    const action = {
      type: 'LOGOUT'
    };
    const res = actions.logout();

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

  // LIFE CYCLE METHODS to run before and after tests
  describe('Tests with firebase todos', () => {
    var testTodoRef;

    beforeEach( (done) => { // fired before every test case
      var todosRef = firebaseRef.child('todos');

      todosRef.remove().then( () => { // wipe all todo items
        testTodoRef = firebaseRef.child('todos').push(); // generate reference

        return testTodoRef.set({ // add todo
          text: 'Something to do',
          completed: false,
          createdAt: 23443253
        })
      })
      .then( () => done() ) // if success
      .catch(done); // if error
    });

    afterEach( (done) => { // fired after every test case
      testTodoRef.remove().then( () => done() );
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then( () => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });

        expect(mockActions[0].updates).toInclude({
          completed: true
        });

        expect(mockActions[0].updates.completedAt).toExist();

        done();
      }, done); // if done gets passed like this (without arguments), mocha assumes a failure and print
    });

    it('should populate todos and dispatch ADD_TODOS', (done) => {
      const store = createMockStore({}); // create a fake store
      const action = actions.startAddTodos(); // return startAddTodos action

      store.dispatch(action).then( () => {
        const mockActions = store.getActions(); // returns array of all actions dispatched since store was created

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('Something to do');

        done();
      }, done);
    })
  });
});
