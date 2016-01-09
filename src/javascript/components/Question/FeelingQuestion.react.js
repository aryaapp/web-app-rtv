/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'

import Section from './Section.react.js'
import QuestionButton from './QuestionButton.react.js'
import QuestionHeader from './QuestionHeader.react.js'
import QuestionTitle from './QuestionTitle.react.js'
import QuestionSubtitle from './QuestionSubtitle.react.js'
import QuestionMain from './QuestionMain.react.js'
import QuestionModal from './QuestionModal.react.js'
import WelcomeModal from './WelcomeModal.react.js'
import SliderInput from './SliderInput.react.js'
import Content from '../../constants/localizableStringsDE.js'

export default class FeelingQuestion extends Component {
  render() {
    return (
      <Section indicator={true}>
        <QuestionHeader>
          <div className="col-xs-1"></div>
          <QuestionTitle title={ Content.QUESTION_FEELING_TITLE } />
          <QuestionSubtitle subtitle={ Content.QUESTION_FEELING_SUBTITLE } />
        </QuestionHeader>
        <QuestionMain>
          <SliderInput feeling={this.props.feeling} onChange={this.props.updateFeeling} />
        </QuestionMain>
        <QuestionModal
          title ={ Content.QUESTION_FEELING_TITLE }
          body = { Content.QUESTION_FEELING_EXPLANATION }
        />
      </Section>
    )
  }
}

FeelingQuestion.propTypes = {
  updateFeeling: PropTypes.func.isRequired,
  feeling: PropTypes.object.isRequired
};
