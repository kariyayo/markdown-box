var React = require('react');
var marked = require('marked');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var LinkContainer = require('react-router-bootstrap').LinkContainer;

var EditDialog = require('./EditDialog');

var storage = require('../storage');


module.exports = React.createClass({
  displayName: "Content",
  getInitialState: function() {
    return {
      content: '',
      showEditDialog: false
    };
  },
  componentDidMount: function() {
    this._fetchContent();
  },
  componentDidUpdate: function(prevProps) {
    var oldEntry = prevProps.entry;
    var newEntry = this.props.entry;
    if (newEntry && oldEntry.path != newEntry.path) {
      this._fetchContent(newEntry.path);
    }
  },
  _fetchContent: function() {
    var _this = this;
    if (this.props.entry.isFolder) {
    } else {
      storage.readfile(this.props.entry.path, function(content) {
        _this.setState({content: content});
      });
    }
  },
  _update: function(newContent) {
    var _this = this;
    storage.writefile(this.props.entry.path, newContent, function() {
      _this.setState({content: newContent});
      _this.setState({showEditDialog: false});
    });
  },
  _showDialog: function() {
    this.setState({showEditDialog: true});
  },
  _hideDialog: function() {
    this.setState({showEditDialog: false});
  },
  _rawMarkupContent: function() {
    return {__html: marked(this.state.content, {sanitize: false})};
  },
  render: function() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>{this.props.entry.path || "/"}</Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem onClick={this._showDialog}>Edit</NavItem>
          </Nav>
        </Navbar>
        <div dangerouslySetInnerHTML={this._rawMarkupContent()} />
        <EditDialog
            content={this.state.content}
            closeAction={this._hideDialog}
            show={this.state.showEditDialog}
            submitAction={this._update} />
      </div>
    );
  }
});

