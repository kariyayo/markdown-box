var React = require('react');

var Modal = require('react-bootstrap').Modal;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;


var style = {
  textarea: {
    height: "400px"
  }
}

module.exports = React.createClass({
  displayName: "EditDialog",
  _onSubmit: function() {
    var content = this.refs.content.refs.input.value;
    this.props.submitAction(content);
  },
  render: function() {
    return (
      <Modal
          bsSize="large"
          show={this.props.show}
          onHide={this.props.closeAction}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input ref="content" type="textarea" style={style.textarea} defaultValue={this.props.content} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeAction}>Cancel</Button>
          <Button bsStyle="primary" onClick={this._onSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});


