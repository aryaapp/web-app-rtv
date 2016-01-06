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
import ListInput from './ListInput.react.js'
import Content from '../../constants/localizableStringsDE.js'

export default class SituationQuestion extends Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
  }

  update(value) {
    this.props.updateSituation(value)
  }

  render() {
    return (
      <Section>
        <QuestionHeader>
          <div className="col-xs-1"></div>
          <QuestionTitle title={ Content.QUESTION_CIRCUMSTANCES_TITLE } />
          <QuestionSubtitle subtitle={ Content.QUESTION_CIRCUMSTANCES_SUBTITLE } />
        </QuestionHeader>
        <QuestionMain>
          <ListInput value={this.props.situation} placeholder="Meine Situation" onChange={this.update} />
        </QuestionMain>
        <QuestionModal
          title ={ Content.QUESTION_CIRCUMSTANCES_TITLE }
          body = { Content.QUESTION_CIRCUMSTANCES_EXPLANATION }
        />
      </Section>
    )
  }
}

SituationQuestion.propTypes = {
  situationUpdate: PropTypes.func.isRequired,
  situation: PropTypes.array.isRequired
}
