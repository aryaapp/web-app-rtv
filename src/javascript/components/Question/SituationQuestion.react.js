/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let QuestionModal = require('./QuestionModal.react.js');
let ListInput = require('./ListInput.react.js');
let Content = require('../../constants/localizableStringsDE.js')

let SituationQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      situation: [],
      title: "Wie ist deine Situation?"
    };
  },

  update: function(value) {
    this.props.onChange(value)
  },

  render() {
    return (
      <Section>
            <div className="col-xs-1"></div>
            <QuestionTitle title={ Content.QUESTION_CIRCUMSTANCES_TITLE } />
            <div className="col-xs-12 no-padding">
              <ListInput value={this.props.situation} onChange={this.update} />
            </div>
            <QuestionModal 
              title ={ Content.QUESTION_CIRCUMSTANCES_TITLE } 
              body = { Content.QUESTION_CIRCUMSTANCES_EXPLANATION } 
            />
      </Section>
    );
  }
});

module.exports = SituationQuestion
