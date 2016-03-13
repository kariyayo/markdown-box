var React = require('react');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

var ContentHeader = require('./ContentHeader');
var InputFileDialog = require('./InputFileDialog');
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
        <ContentHeader
            entry={this.props.entry}
            selectEntryAction={this.props.selectEntryAction}>
          <ButtonToolbar>
            <DropdownButton title="+" noCaret bsStyle="primary" id="plusButton">
              <MenuItem onClick={_this._showFileDialog}>Create file</MenuItem>
              <MenuItem onClick={_this._showFolderDialog}>Create folder</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </ContentHeader>
        <div>
          <ListGroup>
            {_this.props.entry.children.map(function(entry, i) {
              return (
                <ListGroupItem
                    key={i}
                    onClick={function() {
                      _this.props.selectEntryAction(entry);
                    }}>
                  {entry.name + (entry.isFolder ? "/" : "")}
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <InputFileDialog
              closeAction={this._hideFileDialog}
              content={""}
              parentFolder={this.props.entry}
              show={this.state.isDispFileDialog}
              submitAction={this._onSubmitFileDialog} />
          <InputFolderDialog
              closeAction={this._hideFolderDialog}
              content={""}
              parentFolder={this.props.entry}
              show={this.state.isDispFolderDialog}
              submitAction={this._onSubmitFolderDialog} />
        </div>
      </div>
    );
  }
});

