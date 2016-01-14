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
			<div className={ "col-xs-12 no-padding col-sm-push-1 col-sm-10 col-md-8 col-md-push-2 col-lg-6 col-lg-push-3 " + position }>
				{this.props.children}
			</div>
		)
	}

})

module.exports = QuestionBody