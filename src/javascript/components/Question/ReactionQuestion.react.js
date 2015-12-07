/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionHeader = require('./QuestionHeader.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let QuestionSubtitle = require('./QuestionSubtitle.react.js')
let QuestionMain = require('./QuestionMain.react.js')
let QuestionModal = require('./QuestionModal.react.js')
let ListInput = require('./ListInput.react.js')
let Content = require('../../constants/localizableStringsDE.js')

let ReactionQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      reaction: [],
      title: "Wie war deine Reaktion?"
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
          <QuestionTitle title={ Content.QUESTION_REACTION_TITLE } />
          <QuestionSubtitle subtitle={ Content.QUESTION_REACTION_SUBTITLE } />
        </QuestionHeader>
        <QuestionMain>
          <ListInput value={this.props.reaction} onChange={this.update} />
        </QuestionMain>
        <QuestionModal
          title ={ Content.QUESTION_REACTION_TITLE }
          body = { Content.QUESTION_REACTION_EXPLANATION }
        />
      </Section>
    );
  }
});

module.exports = ReactionQuestion
