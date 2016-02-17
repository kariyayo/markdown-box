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
  contextTypes: {
    router: React.PropTypes.object
  },
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
  _onChangeText: function(evt) {
    this.setState({content: evt.target.value});
  },
  _update: function() {
    var _this = this;
    var content = this.refs.content.props.value;
    strage.writefile(this.props.params.path, content, function() {
      _this.context.router.push("/viewer/preview/" + encodeURIComponent(_this.props.params.path))
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
        <Input ref="content" type="textarea" style={style.textarea} value={this.state.content} onChange={this._onChangeText} />
        <Button bsStyle="primary" onClick={this._update}>Submit</Button>
      </div>
    );
  }
});


