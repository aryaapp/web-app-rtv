import React from 'react';


let QuestionBody = React.createClass({
	render() {
		return (
			<div className="col-xs-10 col-xs-push-1 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3">
				{this.props.children}
			</div>
		)
	}

})

module.exports = QuestionBody