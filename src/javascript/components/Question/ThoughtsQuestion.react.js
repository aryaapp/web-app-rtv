/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'

import QuestionModal from './QuestionModal.react.js'
import QuestionButton from './QuestionButton.react.js'
import QuestionHeader from './QuestionHeader.react.js'
import QuestionTitle from './QuestionTitle.react.js'
import QuestionSubtitle from './QuestionSubtitle.react.js'
import QuestionMain from './QuestionMain.react.js'
import ListInput from './ListInput.react.js'
import ScrollIndicator from './ScrollIndicator.react.js'
import Section from './Section.react.js'
import Content from '../../constants/localizableStringsDE.js'

export default class ThoughtsQuestion extends Component {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
  }

  update(value) {
    this.props.updateThoughts(value)
  }

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
    )
  }
}

ThoughtsQuestion.propTypes = {
  updateThoughts: PropTypes.func.isRequired,
  thoughts: PropTypes.array.isRequired
}
