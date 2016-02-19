var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var InputFileDialog = require('./EditDialog');
var InputFolderDialog = require('./InputFolderDialog');


module.exports = React.createClass({
  displayName: "FolderContent",
  getInitialState: function() {
    return {
      isDispFileDialog: false,
      isDispFolderDialog: false
    };
  },
  _showFileDialog: function() {
    this.setState({isDispFileDialog: true});
  },
  _hideFileDialog: function() {
    this.setState({isDispFileDialog: false});
  },
  _onSubmitFileDialog: function(params) {
    this.props.createFileAction(params);
    this._hideFileDialog();
  },
  _showFolderDialog: function() {
    this.setState({isDispFolderDialog: true});
  },
  _hideFolderDialog: function() {
    this.setState({isDispFolderDialog: false});
  },
  _onSubmitFolderDialog: function(params) {
    this.props.createFolderAction(params);
    this._hideFolderDialog();
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
            <NavItem onClick={_this._showFileDialog}>Create file</NavItem>
            <NavItem onClick={_this._showFolderDialog}>Create folder</NavItem>
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
        <InputFileDialog
            content={""}
            closeAction={this._hideFileDialog}
            show={this.state.isDispFileDialog}
            submitAction={this._onSubmitFileDialog}
            parentFolder={this.props.entry} />
        <InputFolderDialog
            content={""}
            closeAction={this._hideFolderDialog}
            show={this.state.isDispFolderDialog}
            submitAction={this._onSubmitFolderDialog}
            parentFolder={this.props.entry} />
      </div>
    );
  }
});

