/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var SliderInput = React.createClass({
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
          <h2 className="text-center">{this.props.value}</h2>
	        <input
	          type="range"
	          min="0"
	          max="100"
	          step="5"
	          value={this.props.value}
	          onChange={this.update} />
         </div>
        )
    }
})


module.exports = SliderInput
