var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var InputDialog = require('./EditDialog');


module.exports = React.createClass({
  displayName: "FolderContent",
  getInitialState: function() {
    return {
      isDisplayCreateDialog: false
    };
  },
  _showCreateDialog: function() {
    this.setState({isDisplayCreateDialog: true});
  },
  _hideCreateDialog: function() {
    this.setState({isDisplayCreateDialog: false});
  },
  _onListItemClick: function() {
    this.props.selectEntryAction(this.props.entry);
  },
  render: function() {
    var _this = this;
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>{_this.props.entry.path}</Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem onClick={_this._showCreateDialog}>Create file</NavItem>
            <NavItem onClick={_this._showDialog}>Create folder</NavItem>
          </Nav>
        </Navbar>
        <ListGroup>
          {_this.props.entry.children.map(function(entry, i) {
            return (
              <ListGroupItem
                  key={i}
                  onClick={function() {
                    _this.props.selectEntryAction(entry)
                  }}>
                {entry.name + (entry.isFolder ? "/" : "")}
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <InputDialog
            content={""}
            closeAction={this._hideCreateDialog}
            show={this.state.isDisplayCreateDialog}
            submitAction={this.props.createEntryAction} />
      </div>
    );
  }
});

