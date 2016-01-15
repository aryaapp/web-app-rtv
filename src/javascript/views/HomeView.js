/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { executeLoadJournals } from '../actions/journals'
import { logout } from '../actions/login'

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'

import ReactSlider from 'rc-slider'

import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {
    executeLoadJournals: () => dispatch(executeLoadJournals()),
    navMoodTracking: () => dispatch(pushPath('/feeling')),
    navJournals: () => dispatch(pushPath('/journals')),
    navStart: () => dispatch(pushPath('/')),
    logout: () => dispatch(logout())
  }
}

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.weekdays = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    this.months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

    this.logout = this.logout.bind(this)
    this.getTheTime = this.getTheTime.bind(this)
    this.getTheDate = this.getTheDate.bind(this)
  }

  getTheTime(date) {
    if ( date != "") {
      let doubleDigits = function(digit) {
        digit = String(digit)
        if(digit.length<2) {
          digit = "0" + digit
        }
        return digit
      }
      let hours = date.getHours()
      let minutes = date.getMinutes()
      return doubleDigits(hours) + ":" + doubleDigits(minutes)
    }
    else return ""
  }

  getTheDate(date) {
    if ( date && date instanceof Date ) {
      let dayName = this.weekdays[date.getDay()]
      let dayInMonth = date.getDate()
      let monthName = this.months[date.getMonth()]
      let year = date.getFullYear()

      return dayName + "," + dayInMonth + " " + monthName + " " + year
    }
    else return ""
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
            <QuestionSubtitle subtitle="myemailadres@gmail.com"/>
          </QuestionHeader>
          <QuestionMain absolute={true}>
          <ul className="timeline list">
            {
              this.props.journals.map((journal, i) => {
                let date = new Date(journal.created_at)
                return (
                  <div>
                    <p className="list-title">{this.getTheDate(date)}</p>
                    <ul className="timeline-day list primary-list">
                      <li className="timeline-item list-item clickable" key={ 'journal_' + i } >
                        <div className="row">
                          <div className="col-xs-2">
                            <span className="feeling-value">{ journal.feeling }</span>
                          </div>
                          <div className="col-xs-10">
                            <ReactSlider disabled={true} value={ journal.feeling } />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )
              })
            }
          </ul>
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
              <span className="btn-text">Neue Eintrag</span>
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
  executeLoadJournals: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

// { journal.created_at }
