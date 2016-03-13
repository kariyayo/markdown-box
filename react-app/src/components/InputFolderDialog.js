var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;


module.exports = React.createClass({
  displayName: "InputFolderDialog",
  _onSubmit: function() {
    var name = this.refs.name.refs.input.value;
    this.props.submitAction({
      name: name,
      parentFolder: this.props.parentFolder
    });
  },
  render: function() {
    var nameText;
    if (!this.props.isEdit) {
      nameText = (<Input placeholder="name" ref="name" type="text" />);
    }
    return (
      <Modal bsSize="large" onHide={this.props.closeAction} show={this.props.show}>
        <Modal.Header closeButton>
          <Modal.Title>Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input placeholder="folder name" ref="name" type="text" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeAction}>Cancel</Button>
          <Button bsStyle="primary" onClick={this._onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});



