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
			<button onClick={this.handleClick} className="btn btn-primary nav-button prev-button"><i className="fa fa-arrow-left"></i></button>
		)
	}
})

module.exports = PrevButton 
 