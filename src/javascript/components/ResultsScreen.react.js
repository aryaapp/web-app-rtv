/**
* @module rtv-mood tracker
* @submodule Question
*/

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
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
import ConfirmationModal from './Question/ConfirmationModal.react.js'
import Content from '../constants/localizableStringsDE.js'
import {
  defaultQuestionnaireId,
  feelingQuestionId,
  bodyQuestionId,
  thoughtsQuestionId,
  situationQuestionId,
  reactionQuestionId
} from '../constants/ids'

import { intersperse, reverseArray } from '../utilities'

//returns color belonging to moodrange 0-100
const d3MoodColor = function(value) {
  let colorScale = d3.scale.linear()
        .domain([0,50,100])
        .range(['#e86e6b','#fcd56b','#92D381']); //['#e86e6b','#e86e6c','#fcd56b','#59d1ba','#59d1bb','#a5d36e']
  return colorScale(value)
}

//returns color belonging to moodrange 0-100
const d3MoodGradient = function(value) {
  let lowVal = Math.max(value-10,0)
  let highVal = Math.min(value+10,100)
  let colorScale = d3.scale.linear()
        .domain([0,50,100])
        .range(['#e86e6b','#fcd56b','#92D381']); //['#e86e6b','#e86e6c','#fcd56b','#59d1ba','#59d1bb','#a5d36e']
  return ("left, " + colorScale(lowVal) + ", " + colorScale(highVal))
}

const mapDispatchToProps = (dispatch) => {
  return {
    executeSaveJournal: (journal_data) => dispatch(executeSaveJournal(journal_data)),
    navHome: () => dispatch(pushPath('/home')),
    navCreateAccount: () => dispatch(pushPath('/anmelden')),
    scheduleJournalSave: () => dispatch(scheduleJournalSave()),
    clearData: () => dispatch(clearDataAction())
  }
}

class ResultsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tryToSend: false
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.signUp = this.signUp.bind(this)
    this.saveResults = this.saveResults.bind(this)
    this.resetBackground = this.resetBackground.bind(this)
    this.navHome = this.navHome.bind(this)
    this.prepareJournalData = this.prepareJournalData.bind(this)
    this.navHome = this.navHome.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  componentDidMount() {
    $(".rc-slider-track").css("background-color", d3MoodColor(this.props.feeling.value))
  }

  signUp(e) {
    this.props.scheduleJournalSave()
    this.props.navCreateAccount()
  }

  prepareJournalData() {
    let data = {
      questionnaire_id: defaultQuestionnaireId,
      feeling: this.props.feeling.value,
      answers: [
        {
          question_id: bodyQuestionId,
          values: this.props.body
        }, {
          question_id: thoughtsQuestionId,
          values: reverseArray(this.props.thoughts)
        }, {
          question_id: situationQuestionId,
          values: reverseArray(this.props.situation)
        }, {
          question_id: reactionQuestionId,
          values: reverseArray(this.props.reaction)
        }
      ]
    }

    return data
  }

  saveResults(e) {
    this.props.executeSaveJournal(this.prepareJournalData())
  }

  resetBackground() {
    //jQuery since not possible with rc-slider API
    $("#react-app").css("background-color", '#ffffff');
    $("#react-app").css("background-image", 'none');
  }

  navHome() {
    this.resetBackground()
    this.props.navHome()
  }

  clearData() {
    this.props.clearData()
    this.navHome()
  }

  render() {
    let submitButton = ''

    const { access_token } = this.props
    if( typeof access_token !== 'undefined' && access_token.length > 0) {
      submitButton = <button className='btn btn-primary nav-button next-button relative-button' onClick={this.saveResults}><i className="fa fa-envelope-o"></i> Eintrag speichern</button>
    } else {
      submitButton = <button className='btn btn-primary nav-button next-button relative-button' onClick={this.signUp}><i className="fa fa-envelope-o"></i> Zugang anlegen</button>
    }

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
              <div className="row">
                <div className="col-xs-2">
                  <span className="feeling-value">{this.props.feeling.value}</span>
                </div>
                <div className="col-xs-10">
                  <ReactSlider disabled={true} value={this.props.feeling.value} />
                </div>
              </div>
            </li>
            <li className="list-item rtv-list-item result-title">Dein Körper</li>
            <li className="list-item rtv-list-item result-answer"><DisplayBody body={this.props.body} /></li>
            <li className="list-item rtv-list-item result-title">Deine Gedanken</li>
            <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.thoughts),", ")}</li>
            <li className="list-item rtv-list-item result-title">Deine Situation</li>
            <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.situation),", ")}</li>
            <li className="list-item rtv-list-item result-title">Deine Reaktion</li>
            <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.reaction),", ")}</li>
          </ul>
          <div className="col-xs-12">
            { submitButton }
          </div>
          <div className="col-xs-12">
            <button className='btn nav-button next-button relative-button' onClick={this.clearData}>Eintrag verwerfen</button>
          </div>
        </QuestionMain>
        <ConfirmationModal ref="confirmation" />
      </Section>
    );
  }
}

export default connect(state => state, mapDispatchToProps)(ResultsScreen)