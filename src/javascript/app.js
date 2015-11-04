var jQuery = require('jquery');
var $ = require('jquery');
var React = require('react')
var ReactDOM = require('react-dom')
var fullPage = require('./fullpage.js')
var MoodTracker = require('./components/MoodTracker.react.js')
// var jQueryEasings = require('../../node_modules/fullpage.js/vendors/jquery.easings.min.js')
var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js')

ReactDOM.render(
  	<MoodTracker/>,
  	document.getElementById('react-app')
);