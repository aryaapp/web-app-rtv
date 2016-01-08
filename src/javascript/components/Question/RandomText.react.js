

import React from 'react'

let RandomText = React.createClass({
	randomPick: function(array) {
	    let randomIndex = Math.floor(Math.random() * (array.length-1));
	    return array[randomIndex]
	  },

	render() {
		return (
			<h3 className="fade-in arya-animation animation1">
                <i className=""> { this.randomPick(this.props.textArray) } </i>
             </h3>
		)
	}
})

module.exports = RandomText
