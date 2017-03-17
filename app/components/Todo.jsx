var React = require('react');
var {connect} = require('react-redux'); // connect child component to Provider so it can access store
var moment = require('moment');
var actions = require('actions'); // load in actions module

// this export will be used for tests
export var Todo = React.createClass({
  render: function () {
    // dispatch is now available as a prop because of connect
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm A');
    };
    return (
      <div className={todoClassName} onClick={() => {
          // this.props.onToggle(id)
          dispatch(actions.toggleTodo(id)); // dispatch method from state
        }}>
        <div>
          <input type="checkbox" checked={completed}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    )
  }
});

// connect Todo component to store
// module.exports = connect()(Todo);

// this is the new way to export the component
export default connect()(Todo); // this expects a store to exist
