var React = require('react');
var {connect} = require('react-redux'); // connect child component to Provider so it can access store
var moment = require('moment'); // for timestamp formatting
var actions = require('actions'); // load in actions module

export var Todo = React.createClass({ // export used for tests
  // RENDER FUNCTION
  render: function () {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props; // dispatch is now available as a prop because of redux and connect
    var todoClassName = completed ? 'todo todo-completed' : 'todo'; // change className for CSS based on completed status
    var renderDate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      if (completed) { // if todo is completed
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm A');
    };

    // PRESENTATION
    return (
      <div className={todoClassName} onClick={() => {
          dispatch(actions.toggleTodo(id)); // dispatch action from state
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
// connect to redux store
export default connect()(Todo); // this expects a store to exist
