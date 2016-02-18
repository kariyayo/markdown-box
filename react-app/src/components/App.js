var React = require('react');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var Header = require('./Header');
var FileTree = require('./FileTree');
var Content = require('./Content');

var strage = require('../strage');


module.exports = React.createClass({
  displayName: "App",
  getInitialState: function() {
    return {
      data: [],
      selectedEntry: {
        isFolder: true,
        name: ""
      }
    };
  },
  componentDidMount: function() {
    var _this = this;
    strage.rootFiles(function(entries) {
      _this.setState({data: entries});
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
    strage.readdir(entry.path, function(entries) {
      entry.children = entries;
      _this.setState({data: _this.state.data});
    });
  },
  _selectEntry: function(entry) {
    this.setState({selectedEntry: entry});
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
                  onToggleButtonClick={this._fetchChildren}/>
            </Col>
            <Col
                md={10}
                xs={12}>
              <Content entry={this.state.selectedEntry} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

