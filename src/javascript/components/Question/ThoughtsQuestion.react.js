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
      <div className="col-sm-12">
        <QuestionModal><p>Hello Thoguhts!</p></QuestionModal>
        <h1>{this.props.title}</h1>
        <TextInput value={this.props.thoughts} onChange={this.update} />
      </div>
    );
  }
});

module.exports = ThoughtsQuestion
