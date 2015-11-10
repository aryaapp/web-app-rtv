/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let QuestionModal = require('./QuestionModal.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let TextInput = require('./TextInput.react.js')
let ScrollIndicator = require('./ScrollIndicator.react.js')

let ThoughtsQuestion = React.createClass({
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
      <div>
        <QuestionButton questionId="2" />
        <div className="col-xs-10 rtv-title text-center">
          <h3>{this.props.title}</h3>
        </div>
        <div className="col-xs-12 no-padding">
          <TextInput value={this.props.thoughts} onChange={this.update} />
        </div>
      </div>
    );
  }
});

module.exports = ThoughtsQuestion

//<QuestionModal><p>Hello Thoughts!</p></QuestionModal>