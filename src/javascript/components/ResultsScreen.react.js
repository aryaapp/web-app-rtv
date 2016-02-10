/**
* @module rtv-mood tracker
* @submodule Question
*/

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import d3 from 'd3'
require('jquery')

import { executeSaveJournal, scheduleJournalSave } from '../actions/journals'
import { clearDataAction } from '../actions/actions'

import Section from './Question/Section.react.js'
import QuestionTitle from './Question/QuestionTitle.react.js'
import QuestionSubtitle from './Question/QuestionSubtitle.react.js'
import QuestionHeader from './Question/QuestionHeader.react.js'
import QuestionMain from './Question/QuestionMain.react.js'
import FixedSectionFooter from './Question/FixedSectionFooter.react.js'
import ReactSlider from 'rc-slider'
import DisplayBody from './DisplayBody.react.js'
import Content from '../constants/localizableStringsDE.js'
import ConfirmationModal from './ConfirmationModal.react.js'
import {
  defaultQuestionnaireId,
  feelingQuestionId,
  bodyQuestionId,
  thoughtsQuestionId,
  situationQuestionId,
  reactionQuestionId
} from '../constants/ids'

import { intersperse, reverseArray, prepareJournalData } from '../utilities'

const mapDispatchToProps = (dispatch) => {
  return {
    executeSaveJournal: (journal_data) => dispatch(executeSaveJournal(journal_data)),
    navHome: () => dispatch(routeActions.push('/home')),
    navCreateAccount: () => dispatch(routeActions.push('/anmelden')),
    scheduleJournalSave: () => dispatch(scheduleJournalSave()),
    clearData: () => dispatch(clearDataAction())
  }
}

class ResultsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tryToSend: false,
      isOpen: false
    }

    this.signUp = this.signUp.bind(this)
    this.saveResults = this.saveResults.bind(this)
    this.navHome = this.navHome.bind(this)
    this.navHome = this.navHome.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  signUp(e) {
    this.props.scheduleJournalSave()
    this.props.navCreateAccount()
  }

  saveResults(e) {
    this.props.executeSaveJournal(prepareJournalData(this.props))
  }

  navHome() {
    this.props.navHome()
  }

  clearData() {
    this.closeModal()
    this.props.clearData()
    this.navHome()
  }
  openModal() {
      this.setState({ isOpen: true })
  }
  closeModal() {
      this.setState({ isOpen: false })
  }

  render() {
    let submitButton = ''

    const { access_token } = this.props
    if( typeof access_token !== 'undefined' && access_token.length > 0) {
      submitButton = <button className='btn btn-primary nav-button next-button relative-button' onClick={this.saveResults}>Eintrag speichern</button>
    } else {
      submitButton = <button className='btn btn-primary nav-button next-button relative-button' onClick={this.signUp}>Zugang anlegen</button>
    }
    const trackStyles = { backgroundColor: this.props.feeling.color }
    const handleStyle = { borderColor: this.props.feeling.color }
    return (
      <Section>
        <QuestionHeader>
          <div className="col-xs-1"></div>
          <QuestionTitle title={ Content.QUESTION_FINISH_TITLE } />
          <QuestionSubtitle subtitle= { Content.QUESTION_FINISH_SUBTITLE } />
        </QuestionHeader>
        <QuestionMain>
          <ul className="rtv-results list rtv-list">
            <li className="list-item rtv-list-item result-title">Dein Befinden <strong></strong></li>
            <li className="list-item rtv-list-item result-answer">
              <div className="row special-row">
                <div className="col-xs-1 no-padding">
                  <span className="feeling-value result-feeling-value">{this.props.feeling.value}</span>
                </div>
                <div className="col-xs-10 no-padding">
                  <ReactSlider
                    disabled={true}
                    value={this.props.feeling.value}
                    additionalHandleStyles={ handleStyle }
                    additionalTrackStyles={ trackStyles } />
                </div>
              </div>
            </li>
            <li className="list-item rtv-list-item result-title">Dein Körper</li>
            <li className="list-item rtv-list-item result-answer"><DisplayBody body={this.props.body} /></li>
            <li className="list-item rtv-list-item result-title">Deine Gedanken</li>
            <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.thoughts),". ")}</li>
            <li className="list-item rtv-list-item result-title">Deine Situation</li>
            <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.situation),". ")}</li>
            <li className="list-item rtv-list-item result-title">Deine Reaktion</li>
            <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.reaction),". ")}</li>
          </ul>
          <div className="col-xs-12">
            { submitButton }
          </div>
          <div className="col-xs-12">
            <button className='btn nav-button next-button relative-button' onClick={this.openModal}>Eintrag verwerfen</button>
          </div>
        </QuestionMain>
        <ConfirmationModal onClick={this.clearData} isOpen={this.state.isOpen} />
      </Section>
    );
  }
}

export default connect(state => state, mapDispatchToProps)(ResultsScreen)