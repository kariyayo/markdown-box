var React = require('react');


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
  },
  entryName: {
    cursor: "pointer",
    textDecoration: "underline"
  }
};

var TreeNode = React.createClass({
  displayName: "TreeNode",
  getInitialState: function() {
    return {collapse: true};
  },
  _onEntryClick: function() {
    this.props.onEntryClick(this.props.entry);
  },
  _onToggleButtonClick: function() {
    this.props.onToggleButtonClick(this.props.entry);
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
            <span
                onClick={this._onEntryClick}
                style={style.entryName}>
              {entry.name}
            </span>
            {" "}
            <span
                onClick={this._onToggleButtonClick}
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
                    onEntryClick={_this.props.onEntryClick}
                    onToggleButtonClick={_this.props.onToggleButtonClick} />
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
          <span
              onClick={this._onEntryClick}
              style={style.entryName}>
            {entry.name}
          </span>
        </li>
      );
    }
  }
});

module.exports = React.createClass({
  displayName: "FileTree",
  render: function() {
    var _this = this;
    return (
      <ul style={style.rootTreeContainer}>
        {this.props.entries.map(function(entry, i) {
          return (
            <TreeNode
                entry={entry}
                key={i}
                onEntryClick={_this.props.onEntryClick}
                onToggleButtonClick={_this.props.onToggleButtonClick} />
          );
        })}
      </ul>
    );
  }
});

