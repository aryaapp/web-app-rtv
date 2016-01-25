import React from 'react';


let QuestionBody = React.createClass({
	defaultProps: function() {
		return ({
			absolute : false
		})
	},
	render() {
		let position = (this.props.absolute == true ? "absolute-main" : "");
		return (
			<div className={ "col-xs-12 no-padding " + position }>
				{this.props.children}
			</div>
		)
	}

})

module.exports = QuestionBody