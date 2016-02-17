var React = require('react');

var Header = require('./Header');

module.exports = React.createClass({
  displayName: "App",
  render: function() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
});

