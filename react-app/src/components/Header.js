var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

module.exports = React.createClass({
  displayName: "Header",
  render: function() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>MD-Box</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
});

