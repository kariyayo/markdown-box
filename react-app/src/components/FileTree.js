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
    var _this = this;
    if (entry.isFolder) {
      return (
        <TreeView
            defaultCollapsed={true}
            key={entry.path}
            nodeLabel={entry.name}
            onClick={this._onClick}
        >
          {Object.keys(this.props.entry.children).map(function(key, i) {
            return (
              <TreeNode key={i} entry={_this.props.entry.children[key]} onClick={_this.props.onClick} />
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
    var _this = this;
    strage.readdir(entry.path, function(entries) {
      var paths = entry.path.split("/").filter(function(s) { return !!s });
      var target = {
        children: _this.state.data
      };
      for (i = 0; i < paths.length; i++) {
        target = target.children[paths[i]];
      }
      target.children = entries;
      _this.setState({data: _this.state.data});
    });
  },
  render: function() {
    var _this = this;
    return (
      <div>
        {Object.keys(_this.state.data).map(function(key, i) {
          return (
            <TreeNode key={i} entry={_this.state.data[key]} onClick={_this.onNodeClick} />
          );
        })}
      </div>
    );
  }
});

