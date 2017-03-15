var React = require('react');

var AddTodo = React.createClass({
  propTypes: {
    onAddTodo: React.PropTypes.func.isRequired
  },
  onSubmit: function (e) {
    e.preventDefault();
    var newTodo = this.refs.newTodo.value;

    if (newTodo.length > 0) {
      this.refs.newTodo.value = ''; // clear the input
      this.props.onAddTodo(String(newTodo)); // add todo
    } else {
      this.refs.newTodo.focus();
    }


  },
  render: function () {
    var {id, text} = this.props;
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.onSubmit}>
          <input type="text" ref="newTodo" placeholder="Add new todo"/>
          <button className="button expanded">Add Todo</button>
        </form>
      </div>
    )
  }
});

module.exports = AddTodo;
