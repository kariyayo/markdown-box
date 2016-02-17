var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var strage = require('../strage');

module.exports = React.createClass({
  displayName: "Content",
  getInitialState: function() {
    return {content: ""};
  },
  componentDidMount: function() {
    this._fetch();
  },
  componentDidUpdate: function(prevProps) {
    var oldPath = prevProps.params.path;
    var newPath = this.props.params.path;
    if (oldPath != newPath) {
      this._fetch();
    }
  },
  _fetch: function() {
    var _this = this;
    strage.readfile(this.props.params.path, function(content) {
      _this.setState({content: content});
    });
  },
  render: function() {
    return (
      <div>
        <Navbar>
          <Navbar.Brand>{this.props.params.path}</Navbar.Brand>
        </Navbar>
        <div>{this.state.content}</div>
      </div>
    );
  }
});

