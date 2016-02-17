var React = require('react');

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var strage = require('../strage');

var style = {
  textarea: {
    height: "400px"
  }
}

module.exports = React.createClass({
  displayName: "EditPage",
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
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>{this.props.params.path}</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Input type="textarea" style={style.textarea} value={this.state.content} />
        <Button bsStyle="primary">Submit</Button>
      </div>
    );
  }
});


