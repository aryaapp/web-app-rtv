/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let Section = require('./Question/Section.react.js')
let QuestionButton = require('./Question/QuestionButton.react.js')
let QuestionTitle = require('./Question/QuestionTitle.react.js')
let QuestionMain = require('./Question/QuestionMain.react.js')
let QuestionModal = require('./Question/QuestionModal.react.js')
let SliderInput = require('./Question/SliderInput.react.js')
let SliderRange = require('./Question/SliderRange.react.js')
let ScrollIndicator = require('./Question/ScrollIndicator.react.js')
let Content = require('../constants/localizableStringsDE.js')

let WelcomeScreen = React.createClass({
  moveDown: () => {
    $.fn.fullpage.moveSectionDown();
  },

  render() {
    return (
      <Section>
        <div className="col-xs-1"></div>
        <QuestionTitle title={ Content.WELCOME_SCREEN_TITLE } />
        <QuestionMain>
          <p>{ Content.WELCOME_SCREEN_INTRO }</p>
          <button className="btn btn-medium" onClick={this.moveDown}>Start</button>
        </QuestionMain>
      </Section>
    );
  }
});

module.exports = WelcomeScreen

