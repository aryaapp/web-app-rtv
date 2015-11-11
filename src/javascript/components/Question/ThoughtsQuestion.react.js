/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let QuestionModal = require('./QuestionModal.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let TextInput = require('./TextInput.react.js')
let ScrollIndicator = require('./ScrollIndicator.react.js')
let Section = require('./Section.react.js')

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
      <Section>
        <QuestionButton questionId="2" />
        <QuestionTitle title={this.props.title} />
        <div className="col-xs-12 no-padding">
          <TextInput value={this.props.thoughts} onChange={this.update} />
        </div>
      </Section>
    );
  }
});

module.exports = ThoughtsQuestion

//<QuestionModal><p>Hello Thoughts!</p></QuestionModal>
