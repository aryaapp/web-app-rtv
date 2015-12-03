let React = require('react');

let PageNumber = React.createClass({
	render() {
		return (
			<div className="page-number">{this.props.page}/6</div>
		)
	}
})

module.exports = PageNumber
