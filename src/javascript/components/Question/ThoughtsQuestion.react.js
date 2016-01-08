/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let QuestionModal = require('./QuestionModal.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionHeader = require('./QuestionHeader.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let QuestionSubtitle = require('./QuestionSubtitle.react.js')
let QuestionMain = require('./QuestionMain.react.js')
let ListInput = require('./ListInput.react.js')
let ScrollIndicator = require('./ScrollIndicator.react.js')
let Section = require('./Section.react.js')
let Content = require('../../constants/localizableStringsDE.js')

let ThoughtsQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      thoughts: []
    };
  },

  update: function(value) {
    this.props.onChange(value)
  },

  render() {
    return (
      <Section>
        <QuestionHeader>
          <div className="col-xs-1"></div>
          <QuestionTitle title={ Content.QUESTION_THOUGHTS_TITLE } />
          <QuestionSubtitle subtitle={ Content.QUESTION_THOUGHTS_SUBTITLE } />
        </QuestionHeader>
        <QuestionMain>
          <ListInput value={this.props.thoughts} placeholder="Meine Gedanken" onChange={this.update} />
        </QuestionMain>
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
