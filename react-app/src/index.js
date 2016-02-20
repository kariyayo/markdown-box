var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var IndexRedirect = require('react-router').IndexRedirect;
var browserHistory =require('react-router').browserHistory;

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

var Welcome = require('./components/Welcome');
var App = require('./components/App');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/:path" component={App} />
  </Router>,
  document.getElementById('root')
);
