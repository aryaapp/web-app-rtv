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
			<button onClick={this.handleClick} className="btn btn-primary nav-button next-button"><i className="fa fa-arrow-right"></i></button>
		)
	}
})

module.exports = NextButton