var React = require('react');

var Main = (props) => {
  return (
    <div className="row">
      <div className="column small-centered medium-6 large-4">
        <h1>Main</h1>
        {props.children}
      </div>
    </div>
  );
};

module.exports = Main;
