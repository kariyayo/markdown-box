var React = require('react');
var ReactDOM = require('react-dom');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var storage = require('../storage');


var style = {
  textarea: {
    height: "400px"
  },
  fileForm: {
    display: "none"
  }
};

module.exports = React.createClass({
  displayName: "EditDialog",
  _onSubmit: function() {
    var name;
    if (!this.props.isEdit) {
      name = this.refs.name.refs.input.value;
    }
    var content = this.refs.content.refs.input.value;
    this.props.submitAction({
      content: content,
      name: name,
      parentFolder: this.props.parentFolder
    });
  },
  _showFiler: function() {
    var domFileInput = ReactDOM.findDOMNode(this.refs.file);
    domFileInput.firstChild.click();
  },
  _attachImage: function(evt) {
    var _this = this;
    var imageFile = evt.target.files[0];
    storage.writeimage(imageFile, function(imageUrl) {
      var pos = _this.refs.content.refs.input.selectionStart;
      var content = _this.refs.content.refs.input.value;
      var newContent = _this._insertImageMarkdown(content, imageUrl, imageFile.name, pos);
      _this.refs.content.refs.input.value = newContent;
    });
  },
  _insertImageMarkdown: function(originStr, imageUrl, altStr, pos) {
    var imageStr = "![" + altStr + "](" + imageUrl + ")";
    var leftPart = originStr.substr(0, pos);
    var rightPart = originStr.substr(pos, originStr.length);
    return leftPart + "\n\n" + imageStr + "\n\n" + rightPart;
  },
  render: function() {
    var nameText;
    if (!this.props.isEdit) {
      nameText = (<Input placeholder="name" ref="name" type="text" />);
    }
    return (
      <Modal
          bsSize="large"
          onHide={this.props.closeAction}
          show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {nameText}
          <Input defaultValue={this.props.content} placeholder="Markdown content" ref="content" style={style.textarea} type="textarea" />
          <Input onChange={this._attachImage} ref="file" style={style.fileForm} type="file" />
          <Button onClick={this._showFiler}>+ Attach image</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeAction}>Cancel</Button>
          <Button bsStyle="primary" onClick={this._onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


