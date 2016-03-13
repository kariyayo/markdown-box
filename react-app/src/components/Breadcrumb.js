var React = require('react');

var Breadcrumb = require('react-bootstrap').Breadcrumb;
var BreadcrumbItem = require('react-bootstrap').BreadcrumbItem;

module.exports = React.createClass({
  displayName: "Content",
  render: function() {
    var _this = this;
    var breadcrumbItems;

    if (this.props.entry.path != '/') {
      var f = function(evt) {
        var name = evt.target.textContent;
        var nextPath;
        if (name == 'Top') {
          nextPath = '/';
        } else {
          var p = _this.props.entry.path.split(name)[0];
          nextPath = p + name;
        }
        _this.props.onEntryClick({
          isFolder: true,
          path: nextPath,
          name: name,
          children: []
        });
      };
      var paths = _this.props.entry.path.split("/");
      breadcrumbItems = paths
        .slice(0, paths.length - 1)
        .map(function(s, i) {
          return (
            <BreadcrumbItem key={i} onClick={f}>
              {s == "" ? "Top" : s}
            </BreadcrumbItem>
          );
        });
    }
    return (
      <Breadcrumb>
        {breadcrumbItems}
        <BreadcrumbItem active>{this.props.entry.name}</BreadcrumbItem>
      </Breadcrumb>
    );
  }
});
