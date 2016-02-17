var React = require('react');
var ReactDOM = require('react-dom');

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

var HelloBox = require('./components/HelloBox');
var App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
