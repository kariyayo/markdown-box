var React = require('react');

require('react-treeview/react-treeview.css');
var TreeView = require('react-treeview');

module.exports = React.createClass({
  displayName: "FileTree",
  getInitialState: function() {
    var data = ['AAA', 'BBB', 'CCC'];
    return {data: data};
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
