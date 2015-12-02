/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let NextButton = React.createClass({
	handleClick: function() {
		this.props.onClick()
	},
	render() { 
		return (
			<button onClick={this.handleClick} className="btn btn-primary">Hit meh</button>
		)
	}
})

module.exports = NextButton