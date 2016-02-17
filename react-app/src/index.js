var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRedirect = require('react-router').IndexRedirect;
var browserHistory =require('react-router').browserHistory;

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

var App = require('./components/App');
var ViewPage = require('./components/ViewPage');
var Content = require('./components/Content');
var EditPage = require('./components/EditPage');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route name="TOP" path="/" component={App}>
      <IndexRedirect from="*" to="viewer" />
      <Route path="viewer" component={ViewPage}>
        <Route path="preview/:path" component={Content} />
      </Route>
      <Route path="editor/:path" component={EditPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
