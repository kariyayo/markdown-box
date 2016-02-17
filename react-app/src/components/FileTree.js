var React = require('react');

require('react-treeview/react-treeview.css');
var TreeView = require('react-treeview');

var strage = require('../strage');

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
  render: function() {
    return (
      <div>
        {this.state.data.map(function(s, i) {
          return (
            <TreeView
                key={s + '|' + i}
                nodeLabel={s}
            />
          );
        })}
      </div>
    );
  }
});
