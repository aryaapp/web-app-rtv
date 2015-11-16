/**
* @module rtv-mood tracker
* @submodule Question
*/

import React from 'react'
let ScrollIndicator = require('./ScrollIndicator.react.js')


let Section = React.createClass({
	render() {

		let indicator =  (this.props.indicator ? <ScrollIndicator />: "")

		return (
			<div className="section relative">
        		{ indicator }
            <div className="container-fluid">
          		<div className=" row ">
            			<div className="rtv-question">
            				{this.props.children}
            			</div>
            		</div>
            	</div>
            </div>
		);
	}
});

module.exports = Section
