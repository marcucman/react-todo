import React from 'react';
import * as Redux from 'react-redux'; // need to connect to redux to receive ability to dispatch action

import * as actions from 'actions';

export var Login = React.createClass({ // export for tests

  onLogin() { // ES6 shortcut for defining functions
    var {dispatch} = this.props;
    dispatch(actions.startLogin());
  },

  render() { // ES6 shortcut for making render function
    return (
      <div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>
                Login with GitHub account below.
              </p>
              <button className="button" onClick={this.onLogin}>Login with Github</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default Redux.connect()(Login); // default is connected for app
