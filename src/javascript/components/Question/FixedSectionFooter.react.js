

let React = require('react')


let FixedSectionFooter = React.createClass({
	render() {
		return(
			<div className="fixed-section-footer">
      			{this.props.children}
      		</div> 

		);
	}
});

module.exports = FixedSectionFooter