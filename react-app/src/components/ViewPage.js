var React = require('react');

var Content = require('./Content');

module.exports = React.createClass({
  displayName: "ViewPage",
  render: function() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

