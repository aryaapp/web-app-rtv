/**
* @module rtv-mood tracker
* @submodule Question
*/

import React from 'react'

let QuestionSubtitle = React.createClass({
	render() {

		return (
				<div className="col-xs-10 col-xs-push-1 rtv-subtitle text-center">
	          		<h5>{this.props.subtitle}</h5>
	      		</div>
		);
	}
});

module.exports = QuestionSubtitle
