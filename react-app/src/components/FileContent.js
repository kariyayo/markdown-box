var React = require('react');
var marked = require('marked');
require('highlight.js/styles/github.css');
var highlight = require('highlight.js');

var Button = require('react-bootstrap').Button;

var ContentHeader = require('./ContentHeader');
var InputFileDialog = require('./InputFileDialog');


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
    marked.setOptions({
      highlight: function(code, lang) {
        return highlight.highlightAuto(code, [lang]).value;
      },
      langPrefix: ''
    });
    return {__html: marked(this.props.content, {sanitize: false})};
  },
  _onSubmit: function(params) {
    this.props.updateContentAction(params);
    this._hideEditDialog();
  },
  render: function() {
    return (
      <div>
        <ContentHeader
            entry={this.props.entry}
            selectEntryAction={this.props.selectEntryAction}>
          <Button bsStyle="primary" onClick={this._showEditDialog}>Edit</Button>
        </ContentHeader>
        <div>
          <div dangerouslySetInnerHTML={this._rawMarkupContent()} />
          <InputFileDialog
              closeAction={this._hideEditDialog}
              content={this.props.content}
              isEdit
              show={this.state.isDisplayEditDialog}
              submitAction={this._onSubmit} />
        </div>
      </div>
    );
  }
});

