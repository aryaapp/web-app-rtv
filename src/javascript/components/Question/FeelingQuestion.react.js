/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var QuestionModal = require('./QuestionModal.react.js');
var SliderInput = require('./SliderInput.react.js');

var FeelingQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      feeling: 50,
      title: "Wie fühlst du dich?"
    };
  },

  update: function(value) {
    this.props.onChange(value)
  },

  render() {
    return (
      <div className="col-sm-12">
        <QuestionModal><p>Hello Feeling!</p></QuestionModal>
        <h2>{this.props.title}</h2>
        <SliderInput value={this.props.feeling} onChange={this.update} />
      </div>
    );
  }
});

module.exports = FeelingQuestion
