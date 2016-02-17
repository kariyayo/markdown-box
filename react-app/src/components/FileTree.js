var React = require('react');
var Link = require('react-router').Link;

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
          {this.props.entry.children.map(function(child, i) {
            return (
              <TreeNode key={i} entry={child} onClick={_this.props.onClick} />
            );
          })}
        </TreeView>
      );
    } else {
      return (
        <div key={entry.path}>
          <Link to={"/viewer/preview/" + encodeURIComponent(entry.path)}>{entry.name}</Link>
        </div>
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
      entry.children = entries;
      _this.setState({data: _this.state.data});
    });
  },
  render: function() {
    var _this = this;
    return (
      <div>
        {this.state.data.map(function(entry, i) {
          return (
            <TreeNode key={i} entry={entry} onClick={_this.onNodeClick} />
          );
        })}
      </div>
    );
  }
});

