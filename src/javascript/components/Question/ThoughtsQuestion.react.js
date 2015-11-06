/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var QuestionModal = require('./QuestionModal.react.js');
var TextInput = require('./TextInput.react.js');

var ThoughtsQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      thoughts: '',
      title: "Was sind deine Gedanken?"
    };
  },

  update: function(value) {
    this.props.onChange(value)
  },

  render() {
    return (
      <div className="col-sm-12 style-me">
        <QuestionModal><p>Hello Thoughts!</p></QuestionModal>
        <h2>{this.props.title}</h2>
        <TextInput value={this.props.thoughts} onChange={this.update} />
      </div>
    );
  }
});

module.exports = ThoughtsQuestion
