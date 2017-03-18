var React = require('react');
var {connect} = require('react-redux'); // REDUX
var actions = require('actions');

export var TodoSearch = React.createClass({ // export for tests
  // RENDER FUNCTION
  render: function () {
    var {dispatch, showCompleted, searchText} = this.props; // bring in action dispatcher through props

    // PRESENTATION
    return (
      <div className="container__header">
        <div>
          <input type="search" ref="searchText" placeholder="Search todos" value={searchText} onChange={ () => {
            var searchText = this.refs.searchText.value;
            dispatch(actions.setSearchText(searchText)); // dispatch action for setting searchText
          }}/>
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" checked={showCompleted} onChange={ () => {
              dispatch(actions.toggleShowCompleted()); // dispatch action to toggle showCompleted
            }}/>
            Show completed todos
          </label>
        </div>
      </div>
    )
  }
});

export default connect( // export for app
  (state) => {
    return { // connect only to parts of state needed
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }
)(TodoSearch);
