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
let Content = require('../../constants/localizableStringsDE.js')

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
        <div className="col-xs-1"></div>
        <QuestionTitle title={this.props.title} />
        <div className="col-xs-12 no-padding">
          <TextInput value={ Content.QUESTION_THOUGHTS_TITLE } onChange={this.update} />
        </div>
        <QuestionModal 
              title ={ Content.QUESTION_THOUGHTS_TITLE } 
              body = { Content.QUESTION_THOUGHTS_EXPLANATION } 
            />
      </Section>
    );
  }
});

module.exports = ThoughtsQuestion

//<QuestionModal><p>Hello Thoughts!</p></QuestionModal>
