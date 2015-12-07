/**
* @module rtv-mood tracker
* @submodule Question
*/

import React from 'react'

let QuestionHeader = React.createClass({
	render() {

		return (
			<div className="rtv-header-container">
          		{this.props.children}
      		</div>
		);
	}
});

module.exports = QuestionHeader
