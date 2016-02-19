var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var storage = require('../storage');

module.exports = React.createClass({
  displayName: "Header",
  getInitialState: function() {
    return {userInfo: {}};
  },
  componentDidMount: function() {
    var _this = this;
    storage.userInfo(function(userInfo) {
      _this.setState({userInfo: userInfo});
    });
  },
  render: function() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>Markdown-box</Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem href="https://www.dropbox.com/">{this.state.userInfo.name}</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

