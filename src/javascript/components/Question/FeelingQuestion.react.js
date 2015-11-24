/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let QuestionMain = require('./QuestionMain.react.js')
let QuestionModal = require('./QuestionModal.react.js')
let SliderInput = require('./SliderInput.react.js')
let SliderRange = require('./SliderRange.react.js')
let ScrollIndicator = require('./ScrollIndicator.react.js')
let Content = require('../../constants/localizableStringsDE.js')


let FeelingQuestion = React.createClass({
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
      <Section indicator={true}>
            <div className="col-xs-1"></div>
            <QuestionTitle title={ Content.QUESTION_FEELING_TITLE } />
            <QuestionMain>
              <SliderInput value={this.props.feeling} onChange={this.update} />
            </QuestionMain>
            <QuestionModal 
              title ={ Content.QUESTION_FEELING_TITLE } 
              body = { Content.QUESTION_FEELING_EXPLANATION } 
            />
      </Section>
      
    );
  }
});

module.exports = FeelingQuestion

