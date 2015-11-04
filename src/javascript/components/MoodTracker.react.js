/**
* @module ARYA Dashboard
* @submodule Components
*/

var React = require('react');

/**
* Description
* moar description
* @class Classname
* @constructor
*/

var MoodTracker = React.createClass({

  getInitialState: function() {
    return {
    	data: []
    }
  },
  componentDidMount: function() {
    
  },
  _onSubjectStoreChange: function() {
    
  },
  componentWillUnmount: function() {
    
  },

  render: function() {
    return (
			<div id="fullpage">
			    <div className="section" id="section1"><div className="row">
			    		<div className="col-sm-12">
			    	<h3>Wie fühlst du dich?</h3></div>
			    	</div>
			    </div>
			    <div className="section" id="section2"><div className="row">
			    		<div className="col-sm-12"><h3>Wie fühlst sich dein Körper an?</h3></div></div>
			    	</div>
			    <div className="section" id="section3">
			    	<div className="row">
			    		<div className="col-sm-12">
			    			<h3><i class="fa fa-heart"></i>Was sind deine Gedanken?</h3>
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
			    <div className="section" id="section4"><div className="row">
			    		<div className="col-sm-12"><h3>Ok, cheers</h3></div></div>
			    	</div>
			    <div className="section" id="section5">
			    	<div className="row">
			    		<div className="col-sm-12">
			    			<h3>No, you hang up first</h3>
			    			<button className="btn btn-lg arya-btn margin-top">Hang Up</button>
			    		</div>
			    	</div>
				</div>
		</div>
    );
  }

});

module.exports = MoodTracker;

// arya-animation translate-up

