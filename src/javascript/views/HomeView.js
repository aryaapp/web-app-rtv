/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import ReactSlider from 'rc-slider'

import { executeLoadJournals } from '../actions/journals'
import { logout } from '../actions/login'
import { nextWeek, prevWeek } from '../actions/homeView'

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'
import JournalList from '../components/JournalList'

import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'

const mapStateToProps = (state) => {
  return {
    user: state.user,
    beginningDate: state.homeView.beginningDate,
    endDate: state.homeView.endDate,
    selectedJournals: state.homeView.selectedJournals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    executeLoadJournals: () => dispatch(executeLoadJournals()),
    navMoodTracking: () => dispatch(pushPath('/feeling')),
    navJournals: () => dispatch(pushPath('/journals')),
    navStart: () => dispatch(pushPath('/')),
    logout: () => dispatch(logout()),
    prevWeek: () => { dispatch(prevWeek()) },
    nextWeek: () => { dispatch(nextWeek()) }
  }
}

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.weekdays = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    this.months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

    this.logout = this.logout.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
  }

  componentWillMount() {
    this.props.executeLoadJournals();
  }

  logout() {
    this.props.logout()
    this.props.navStart()
  }

  render() {
    return (
      <div className="partial-wrapper">
        <div className="partial-container" >
          <QuestionHeader absolute={true}>
            <div className="col-xs-1"></div>
            <QuestionTitle title="Achtsamkeits-Tagebuch"/>
            <QuestionSubtitle subtitle={this.props.user.email}/>
          </QuestionHeader>
          <QuestionMain absolute={true}>
            <div>
              <button className="test-button" onClick={this.props.prevWeek}>
                <span className="btn-text">prev week</span>
              </button>
              <p>{this.props.beginningDate.toDateString()} - {this.props.endDate.toDateString()}</p>
              <button className="test-button" onClick={this.props.nextWeek}>
                <span className="btn-text">next week</span>
              </button>
            </div>
            <JournalList
              journals={this.props.selectedJournals}
            />
            <button className="btn btn-ghost btn-full-width">EINTRÄGE DIESER WOCHE HERUNTERLADEN</button>
            <button className="btn btn-ghost btn-full-width">ALLE BISHERIGEN EINTRÄGE HERUNTERLADEN</button>
            <button className="test-button" onClick={this.logout}>
              <span className="btn-text">logout</span>
            </button>
            <button className="test-button" onClick={this.props.executeLoadJournals}>
              <span className="btn-text">load journals</span>
            </button>
          </QuestionMain>
          <FixedSectionFooter>
          <div className="col-xs-12">
            <button className="btn nav-button btn-primary relative-button" onClick={this.props.navMoodTracking}>
              <span className="btn-text">Neuer Eintrag</span>
            </button>
          </div>
          </FixedSectionFooter>
        </div>
      </div>
    )
  }
}

HomeView.propTypes = {
  user: PropTypes.object.isRequired,
  beginningDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  selectedJournals: PropTypes.array.isRequired,
  executeLoadJournals: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  prevWeek: PropTypes.func.isRequired,
  nextWeek: PropTypes.func.isRequired,
  navMoodTracking:  PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
