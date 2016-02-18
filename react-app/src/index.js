var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRedirect = require('react-router').IndexRedirect;
var browserHistory =require('react-router').browserHistory;

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

var App = require('./components/App');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route name="TOP" path="/" component={App} />
    <Route path="viewer" component={App} />
    <Route path="viewer/:path" component={App} />
  </Router>,
  document.getElementById('root')
);
