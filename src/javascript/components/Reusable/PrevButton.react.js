/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let PrevButton = React.createClass({
	handleClick: function() {
		this.props.onClick()
	},
	render() { 
		return (
			<button onClick={this.handleClick} className="btn btn-primary nav-button prev-button">Go Back</button>
		)
	}
})

module.exports = PrevButton 
