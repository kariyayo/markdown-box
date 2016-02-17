var React = require('react');
var marked = require('marked');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var LinkContainer = require('react-router-bootstrap').LinkContainer;

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
  _rawMarkupContent: function() {
    return {__html: marked(this.state.content, {sanitize: false})};
  },
  render: function() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>{this.props.params.path}</Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <LinkContainer to={"/editor/" + encodeURIComponent(this.props.params.path)}>
              <NavItem>Edit</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
        <div dangerouslySetInnerHTML={this._rawMarkupContent()} />
      </div>
    );
  }
});

