import React from 'react';


let QuestionBody = React.createClass({
	render() {
		return (
			<div className="col-xs-12 no-padding col-sm-push-1 col-sm-10 col-md-8 col-md-push-2 col-lg-6 col-lg-push-3">
				{this.props.children}
			</div>
		)
	}

})

module.exports = QuestionBody