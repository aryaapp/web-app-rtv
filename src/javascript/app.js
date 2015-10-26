var jQuery = require('jquery');
var $ = require('jquery');
var React = require('react')
var ReactDOM = require('react-dom')
var fullPage = require('./fullpage.js')
// var jQueryEasings = require('../../node_modules/fullpage.js/vendors/jquery.easings.min.js')
var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js')

ReactDOM.render(
  	<div className="container">
		 <div id="fullpage">
		    <div className="section">
		    	<div className="row">
		    		<div className="col-sm-12">
		    			<h3>Hello World</h3>
		    			<form className="margin-top">
		    			<div className="mc-field-group control-group">
							<div className="controls">
								<input type="email" placeholder="input" name="EMAIL" className="required email form-control" id="mce-EMAIL"/>
							</div>
						</div>
						</form>
		    		</div>
		    	</div>
		    </div>
		    <div className="section"><h3>How is it going?</h3></div>
		    <div className="section"><h3>Fine Thanks</h3></div>
		    <div className="section"><h3>Ok, cheers</h3></div>
		    <div className="section">
		    	<div className="row">
		    		<div className="col-sm-12">
		    			<h3>No, you hang up first</h3>
		    			<button className="btn btn-lg arya-btn margin-top">Hang Up</button>
		    		</div>
		    	</div>
			</div>
		</div>
	</div>,
  document.getElementById('react-app')
);