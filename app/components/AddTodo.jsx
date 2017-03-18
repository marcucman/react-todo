var React = require('react');
var {connect} = require('react-redux'); // REDUX
var actions = require('actions');

export var AddTodo = React.createClass({ // export used for tests

  // HANDLE SUBMIT retrieve form data and new todo
  handleSubmit: function (e) {
    e.preventDefault();
    var {dispatch} = this.props; // bring in action dispatcher as a prop
    var newTodo = this.refs.newTodo.value; // get text from form

    if (newTodo.length > 0) { // if there is text
      this.refs.newTodo.value = ''; // clear the input
      dispatch(actions.addTodo(newTodo)); // use action dispatch to add todo to state
    } else {
      this.refs.newTodo.focus(); // place attention in text box
    }
  },
  // RENDER FUNCTION
  render: function () {
    var {id, text} = this.props;

    // PRESENTATION
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.handleSubmit}>
          <input type="text" ref="newTodo" placeholder="Add new todo"/>
          <button className="button expanded">Add Todo</button>
        </form>
      </div>
    )
  }
});
// connect to redux store
export default connect()(AddTodo); // export used for app
