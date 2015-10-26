var jQuery = require('jquery');
var $ = require('jquery');
var React = require('react')
var ReactDOM = require('react-dom')
var fullPage = require('./fullpage.js')
// var jQueryEasings = require('../../node_modules/fullpage.js/vendors/jquery.easings.min.js')
var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js')

ReactDOM.render(
  	<div>
		 <div id="fullpage">
		    <div className="section">Hello World</div>
		    <div className="section">How is it going?</div>
		    <div className="section">Fine Thanks</div>
		    <div className="section">Ok, cheers</div>
		    <div className="section">No, you hang up first</div>
		</div>
	</div>,
  document.getElementById('react-app')
);