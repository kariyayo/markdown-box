var React = require('react');
var marked = require('marked');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var InputDialog = require('./EditDialog');


module.exports = React.createClass({
  displayName: "FileContent",
  getInitialState: function() {
    return {
      isDisplayEditDialog: false
    };
  },
  _showEditDialog: function() {
    this.setState({isDisplayEditDialog: true});
  },
  _hideEditDialog: function() {
    this.setState({isDisplayEditDialog: false});
  },
  _rawMarkupContent: function() {
    return {__html: marked(this.props.content, {sanitize: false})};
  },
  render: function() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>{this.props.entry.path}</Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem onClick={this._showEditDialog}>Edit</NavItem>
          </Nav>
        </Navbar>
        <div dangerouslySetInnerHTML={this._rawMarkupContent()} />
        <InputDialog
            content={this.props.content}
            closeAction={this._hideEditDialog}
            show={this.state.showEditDialog}
            submitAction={this.props.updateContentAction} />
      </div>
    );
  }
});

