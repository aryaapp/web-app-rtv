

let React = require('react')


let FixedSectionFooter = React.createClass({
	getDefaultProps: function() {
    return {
       buttons : 1
    }
  },
	render() {
		let style = {
			height: this.props.buttons * 72
		}
		return(
			<div className="fixed-section-footer" style= { style } >
      			{this.props.children}
      		</div> 

		);
	}
});

module.exports = FixedSectionFooter