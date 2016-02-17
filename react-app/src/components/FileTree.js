var React = require('react');

require('react-treeview/react-treeview.css');
var TreeView = require('react-treeview');

var strage = require('../strage');

var TreeNode = React.createClass({
  displayName: "TreeNode",
  _onClick: function() {
    this.props.onClick(this.props.entry);
  },
  render: function() {
    var entry = this.props.entry;
    if (entry.isFolder) {
      return (
        <TreeView
            key={entry.path}
            nodeLabel={entry.name}
            onClick={this._onClick}
        >
          {this.props.entry.children.map(function(d, i) {
            return (
              <TreeNode key={i} entry={d} onClick={this._onClick} />
            );
          })}
        </TreeView>
      );
    } else {
      return (
        <div key={entry.path}>{entry.name}</div>
      );
    }
  }
});

module.exports = React.createClass({
  displayName: "FileTree",
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var _this = this;
    strage.rootFiles(function(entries) {
      _this.setState({data: entries});
    });
  },
  onNodeClick: function(entry) {
    console.log(entry);
  },
  render: function() {
    var _this = this;
    return (
      <div>
        {this.state.data.map(function(d, i) {
          return (
            <TreeNode key={i} entry={d} onClick={_this.onNodeClick} />
          );
        })}
      </div>
    );
  }
});

