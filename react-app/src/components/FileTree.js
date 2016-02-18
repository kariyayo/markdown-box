var React = require('react');
var Link = require('react-router').Link;

var strage = require('../strage');


var style = {
  rootTreeContainer: {
    paddingLeft: "16px"
  },
  showChildrenTreeContainer: {
    display: "block",
    paddingLeft: "16px"
  },
  hideChildrenTreeContainer: {
    display: "none",
    paddingLeft: "16px"
  },
  node: {
    listStyle: "none"
  },
  toggleButton: {
    cursor: "pointer"
  }
};

var TreeNode = React.createClass({
  displayName: "TreeNode",
  getInitialState: function() {
    return {collapse: true};
  },
  _onClick: function() {
    this.props.onClick(this.props.entry);
    this.setState({collapse: !this.state.collapse});
  },
  _showChildStyle: function() {
    if (this.state.collapse) {
      return style.hideChildrenTreeContainer;
    } else {
      return style.showChildrenTreeContainer;
    }
  },
  _allow: function() {
    if (this.state.collapse) {
      return '[+]';
    } else {
      return '[-]';
    }
  },
  render: function() {
    var entry = this.props.entry;
    var _this = this;
    if (entry.isFolder) {
      return (
        <li
            key={entry.path}
            style={style.node}>
          <div>
            <Link to={"/viewer/preview/" + encodeURIComponent(entry.path)}>
              {entry.name}
            </Link>
            {" "}
            <span
              onClick={this._onClick}
              style={style.toggleButton}>
              {this._allow()}
            </span>
          </div>
          <ul style={this._showChildStyle()}>
            {this.props.entry.children.map(function(child, i) {
              return (
                <TreeNode
                    entry={child}
                    key={i}
                    onClick={_this.props.onClick} />
              );
            })}
          </ul>
        </li>
      );
    } else {
      return (
        <li
            key={entry.path}
            style={style.node}>
          <Link to={"/viewer/preview/" + encodeURIComponent(entry.path)}>
            {entry.name}
          </Link>
        </li>
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
      <ul style={style.rootTreeContainer}>
        {this.state.data.map(function(entry, i) {
          return (
            <TreeNode
                entry={entry}
                key={i}
                onClick={_this.onNodeClick} />
          );
        })}
      </ul>
    );
  }
});

