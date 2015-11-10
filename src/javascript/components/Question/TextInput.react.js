/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var TextInput = React.createClass({
  getDefaultProps() {
    return {
      value: ''
    };
  },
  update: function(e) {
    this.props.onChange(e.target.value);
  },
  render: function() {
    return (
        <div>
          <textarea
            className="text-input"
            rows="4"
            value={this.props.value}
            onChange={this.update} />
         </div>
        )
    }
})


module.exports = TextInput
