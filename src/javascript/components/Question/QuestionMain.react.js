import React from 'react';


let QuestionBody = React.createClass({
	render() {
		return (
			<div className="col-xs-12 no-padding col-sm-push-1 col-sm-10 col-sm-push-2 col-md-6 col-md-push-3">
				{this.props.children}
			</div>
		)
	}

})

module.exports = QuestionBody