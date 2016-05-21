var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRedirect = require('react-router').IndexRedirect;
var hashHistory = require('react-router').hashHistory

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

var App = require('./components/App');

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path="/(:filePath)" component={App}></Route>
  </Router>,
  document.getElementById('root')
);
