var React = require('react');

var Breadcrumb = require('react-bootstrap').Breadcrumb;
var BreadcrumbItem = require('react-bootstrap').BreadcrumbItem;

var FileContent = require('./FileContent');
var FolderContent = require('./FolderContent');

var storage = require('../storage');


module.exports = React.createClass({
  displayName: "Content",
  getInitialState: function() {
    return {
      content: ''
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
      _this.setState({content: ""});
    } else {
      storage.readfile(this.props.entry.path, function(content) {
        _this.setState({content: content});
      });
    }
  },
  _updateContent: function(params) {
    var _this = this;
    storage.writefile(this.props.entry.path, params.content, function() {
      _this.setState({content: params.content});
    });
  },
  render: function() {
    var _this = this;
    var breadcrumb;

    if (this.props.entry.path != '/') {
      var f = function(evt) {
        var name = evt.target.textContent;
        var nextPath;
        if (name == 'Top') {
          nextPath = '/';
        } else {
          var p = _this.props.entry.path.split(name)[0];
          nextPath = p + name;
        }
        _this.props.onEntryClick({
          isFolder: true,
          path: nextPath,
          name: name,
          children: []
        });
      };
      var paths = this.props.entry.path.split("/");
      var breadcrumbItems = paths
        .slice(0, paths.length - 1)
        .map(function(s, i) {
          return (
            <BreadcrumbItem key={i} onClick={f}>
              {s == "" ? "Top" : s}
            </BreadcrumbItem>
          );
        });
      breadcrumb = (<Breadcrumb>{breadcrumbItems}</Breadcrumb>);
    }
    var content;
    if (this.props.entry.isFolder) {
      content = (
        <FolderContent
            createFileAction={this.props.createFileAction}
            createFolderAction={this.props.createFolderAction}
            entry={this.props.entry}
            selectEntryAction={this.props.onEntryClick} />
      );
    } else {
      content = (
        <FileContent
            content={this.state.content}
            entry={this.props.entry}
            updateContentAction={this._updateContent} />
      );
    }
    return (
      <div>
        {breadcrumb}
        {content}
      </div>
    );
  }
});

