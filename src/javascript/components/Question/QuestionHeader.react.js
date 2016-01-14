/**
* @module rtv-mood tracker
* @submodule Question
*/

let PageNumber = require("../PageNumber.react.js")

import React from 'react'

let QuestionHeader = React.createClass({
	
	defaultProps: function() {
		return ({
			absolute : false
		})
	},
	render() {
		let position = (this.props.absolute == true ? "absolute-header" : "");
		return (
			<div className={ "rtv-header-container " + position }>
          		{ this.props.children }
      		</div>
		);
	}
});

module.exports = QuestionHeader
