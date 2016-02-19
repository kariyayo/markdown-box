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
}

module.exports = React.createClass({
  displayName: "EditDialog",
  _onSubmit: function() {
    var content = this.refs.content.refs.input.value;
    this.props.submitAction(content);
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
    console.log(pos);
    var leftPart = originStr.substr(0, pos);
    var rightPart = originStr.substr(pos, originStr.length);
    return leftPart + "\n\n" + imageStr + "\n\n" + rightPart;
  },
  render: function() {
    var nameText;
    if (!this.props.isEdit) {
      nameText = (<Input ref="name" type="text" placeholder="name" />);
    }
    return (
      <Modal
          bsSize="large"
          show={this.props.show}
          onHide={this.props.closeAction}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {nameText}
          <Input ref="content" type="textarea" style={style.textarea} defaultValue={this.props.content} placeholder="Markdown content" />
          <Input ref="file" type="file" style={style.fileForm} onChange={this._attachImage} />
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


