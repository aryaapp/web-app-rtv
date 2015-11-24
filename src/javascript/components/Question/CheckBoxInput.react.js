/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let CheckBoxList = require('react-checkbox-list');

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
    var that = this
    return (
      <div>
        <CheckBoxList defaultData={this.props.options} onChange={this.update} />
      </div>
        )
    }
})

module.exports = CheckBoxInput
