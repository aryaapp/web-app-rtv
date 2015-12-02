/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let CheckBoxList = require('../CheckBoxList.react.js');

let CheckBoxInput = React.createClass({
  getDefaultProps() {
    return {
      values: [],
      options: [
        { value: 'pain', label: 'Pain' }
      ]
    };
  },
  update: function(values) {
    this.props.onChange(values);
  },
  render: function() {
    return (
      <div>
        <CheckBoxList defaultData={this.props.options} onChange={this.update} />
      </div>
    )
  }
})

module.exports = CheckBoxInput
