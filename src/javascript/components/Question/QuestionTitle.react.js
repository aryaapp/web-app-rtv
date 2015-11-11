/**
* @module rtv-mood tracker
* @submodule Question
*/

import React from 'react'

let QuestionTitle = React.createClass({
	render() {

		return (
			<div className="col-xs-10 rtv-title text-center">
          <h3>{this.props.title}</h3>
      </div>
		);
	}
});

module.exports = QuestionTitle
