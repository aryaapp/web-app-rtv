/**
* @module rtv-mood tracker
* @submodule Question
*/


import React from 'react'
let ReactDOM = require('react-dom')
let ReactSlider = require('rc-slider')

let SliderInput = React.createClass({
  getDefaultProps() {
    return {
      value: 50
    };
  },
  update: function(e) {
    this.props.onChange(e.target.value);
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-10 col-xs-push-1">
            <ReactSlider defaultValue={ 90 } />
          </div>
        </div>
          <div className="col-xs-2 col-xs-push-1 no-padding">
            <img src="images/emo-1.svg" className="svg emo emo-1" />
          </div>
          <div className="col-xs-2 col-xs-push-1 no-padding">
            <img src="images/emo-2.svg" className="svg emo emo-2" />
          </div>
          <div className="col-xs-2 col-xs-push-1 no-padding">
            <img src="images/emo-3.svg" className="svg emo emo-3" />
          </div>
          <div className="col-xs-2 col-xs-push-1 no-padding">
            <img src="images/emo-4.svg" className="svg emo emo-4" />
          </div>
          <div className="col-xs-2 col-xs-push-1 no-padding">
            <img src="images/emo-5.svg" className="svg emo emo-5" />
          </div>
        </div>
    )
  }
})


module.exports = SliderInput

        // <div>
        //   <h2 className="text-center">{this.props.value}</h2>
        //   <input
        //     type="range"
        //     min="0"
        //     max="100"
        //     step="1"
        //     value={this.props.value}
        //     onChange={this.update} />
        //  </div>