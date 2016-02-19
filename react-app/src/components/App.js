var React = require('react');

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
    var _this = this;
    storage.rootFiles(function(entries) {
      _this.setState({data: entries});
      _this.setState({selectedEntry: {
        isFolder: true,
        path: "/",
        name: "/",
        children: entries
      }});
    });
  },
  componentDidUpdate: function(prevProps) {
    var oldPath = prevProps.params.path;
    var newPath = this.props.params.path;
    if (newPath && oldPath != newPath) {
      this._fetch(newPath);
    }
  },
  _fetchChildren: function(entry) {
    var _this = this;
    storage.readdir(entry.path, function(entries) {
      entry.children = entries;
      _this.setState({data: _this.state.data});
    });
  },
  _selectEntry: function(entry) {
    this.setState({selectedEntry: entry});
    if (entry.isFolder && entry.children.length == 0) {
      this._fetchChildren(entry);
    }
  },
  _createFile: function(parentEntry, name, content) {
    var _this = this;
    storage.writefile(parentEntry.path + "/" + name, content, function() {
      _this._fetchChildren(parentEntry);
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
                  createEntry={this._createEntry}
                  entry={this.state.selectedEntry}
                  onEntryClick={this._selectEntry} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

