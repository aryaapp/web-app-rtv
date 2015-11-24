import React from 'react'

let SliderRange = React.createClass({
	render() {
		return (
			<div className="row slider-range-container">
				<div className="col-xs-2 no-padding">
					<img src="images/emo-1.svg" className="svg emo emo-1" />
				</div>
				<div className="col-xs-3 col-xs-pull-1 no-padding text-center">
					<img src="images/emo-2.svg" className="svg emo emo-2" />
				</div>
				<div className="col-xs-4 col-xs-pull-2 no-padding text-center">
					<img src="images/emo-3.svg" className="svg emo emo-3" />
				</div>
				<div className="col-xs-3 col-xs-pull-1 no-padding text-center">
					<img src="images/emo-4.svg" className="svg emo emo-4" />
				</div>
				<div className="col-xs-2 col-xs-pull-2 no-padding">
					<img src="images/emo-5.svg" className="svg emo emo-5" />
				</div>
			</div>
		)
	}
})

module.exports = SliderRange

// optional fallback to png using svg className