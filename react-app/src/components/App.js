var React = require('react');
var hashHistory = require('react-router').hashHistory

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Header = require('./Header');
var FileTree = require('./FileTree');
var Content = require('./Content');

var storage = require('../storage');


module.exports = React.createClass({
  displayName: "App",
  getInitialState: function() {
    return {
      data: [],
      selectedEntry: {
        isFolder: true,
        path: "/",
        name: "/",
        children: []
      }
    };
  },
  componentDidMount: function() {
    this._fetchRoot();
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.routeParams.filePath != prevProps.routeParams.filePath) {
      var _this = this;
      var path = decodeURIComponent(this.props.routeParams.filePath || '/');
      storage.readEntry(path, function(entry) {
        _this.setState({selectedEntry: entry});
        if (entry.isFolder && entry.children.length == 0) {
          _this._fetchChildren(entry);
        }
      });
    }
  },
  _fetchRoot: function() {
    var _this = this;
    storage.rootFiles(function(entries) {
      _this.state.selectedEntry.children = entries;
      _this.setState({
        data: entries,
        selectedEntry: _this.state.selectedEntry
      });
    });
  },
  _fetchChildren: function(entry) {
    var _this = this;
    storage.readdir(entry.path, function(entries) {
      entry.children = entries;
      _this.setState({data: _this.state.data});
    });
  },
  _selectEntry: function(entry) {
    hashHistory.push({
      pathname: encodeURIComponent(entry.path)
    });
  },
  _isRootFolder: function(entry) {
    return entry.path == "/";
  },
  _createFile: function(params) {
    var _this = this;
    var filepath;
    if (_this._isRootFolder(params.parentFolder)) {
      filepath = "/" + params.name;
    } else {
      filepath = params.parentFolder.path + "/" + params.name;
    }
    storage.writefile(filepath, params.content, function() {
      if (_this._isRootFolder(params.parentFolder)) {
        _this._fetchRoot();
      } else {
        _this._fetchChildren(params.parentFolder);
      }
    });
  },
  _createFolder: function(params) {
    var _this = this;
    var dirpath;
    if (_this._isRootFolder(params.parentFolder)) {
      dirpath = "/" + params.name;
    } else {
      dirpath = params.parentFolder.path + "/" + params.name;
    }
    storage.makedir(dirpath, function() {
      if (_this._isRootFolder(params.parentFolder)) {
        _this._fetchRoot();
      } else {
        _this._fetchChildren(params.parentFolder);
      }
    });
  },
  render: function() {
    return (
      <div>
        <Header />
        <Grid>
          <Row className="show-grid">
            <Col
                md={2}
                xs={12}>
              <FileTree
                  entries={this.state.data}
                  onEntryClick={this._selectEntry}
                  onToggleButtonClick={this._fetchChildren} />
            </Col>
            <Col
                md={10}
                xs={12}>
              <Content
                  createFileAction={this._createFile}
                  createFolderAction={this._createFolder}
                  entry={this.state.selectedEntry}
                  onEntryClick={this._selectEntry} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

