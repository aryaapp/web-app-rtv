/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let ScrollIndicator = React.createClass({
	render() {
		return (
			<div className="scroll-wrapper scroll-wrapper-rtv">
      			<p className="center-text arya-animation fade-in animation1">
      				<span className="">Swipe down for other questions</span><br/>
      				<i className="fa fa-chevron-down"></i>
      			</p>
      		</div> 
		)
	}
})

module.exports = ScrollIndicator