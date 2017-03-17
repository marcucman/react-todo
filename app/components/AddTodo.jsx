var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
  propTypes: {
    onAddTodo: React.PropTypes.func.isRequired
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var {dispatch} = this.props; // bring in action dispatcher as a prop
    var newTodo = this.refs.newTodo.value;

    if (newTodo.length > 0) {
      this.refs.newTodo.value = ''; // clear the input
      // this.props.onAddTodo(String(newTodo)); // add todo
      dispatch(actions.addTodo(newTodo));
    } else {
      this.refs.newTodo.focus();
    }


  },
  render: function () {
    var {id, text} = this.props;
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

// module.exports = AddTodo;
export default connect()(AddTodo);
