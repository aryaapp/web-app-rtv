/**
* @module rtv-mood tracker
* @submodule Question
*/

import React from 'react'
let ScrollIndicator = require('./ScrollIndicator.react.js')


let Section = React.createClass({
	render() {

		let indicator =  <ScrollIndicator />

		return (
			<div className="section relative">
        		{ indicator }
        		<div className=" row ">
          			<div className="rtv-question">
          				{this.props.children}
          			</div>
          		</div>
          	</div>
		);
	}
});

module.exports = Section

// scrollindicator needs to be conditional with prop
