/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import DisplayBody from './DisplayBody.react.js'
import {
  defaultQuestionnaireId,
  feelingQuestionId,
  bodyQuestionId,
  thoughtsQuestionId,
  situationQuestionId,
  reactionQuestionId
} from '../constants/ids'
import FeelingSmiley from './FeelingSmiley'

import ReactSlider from 'rc-slider'

const mapStateToProps = (state) => (state)

const mapDispatchToProps = (dispatch) => {
  return {}
}

const markupBody = function(body) {
  let markupBody = {}
  for (var bodypart in body) {
    markupBody[bodypart] = intersperse(body[bodypart], ", ")
  }
  return markupBody
}

const reverseArray = function (input) {
  if (typeof input === 'undefined' || input == null || input.length === 0) {
    return []
  }
  var ret = new Array;
  for(var i = input.length-1; i >= 0; i--) {
      ret.push(input[i]);
  }
  return ret;
}

const intersperse = function(arr, sep) {
  if (typeof arr === 'undefined' || arr == null || arr.length === 0) {
      return [];
  }
  return arr.slice(1).reduce(function(xs, x, i) {
      return xs.concat([sep, x]);
  }, [arr[0]]);
}

class JournalList extends Component {
  constructor(props) {
    super(props)

    this.weekdays = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
    this.months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']

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

  mapJournal(journal) {
    let body, thoughts, situation, reaction;

    journal.answers.forEach((answer) => {
      switch(answer.question_id) {
        case bodyQuestionId:
          body = answer.values
        case thoughtsQuestionId:
          thoughts = answer.values
        case situationQuestionId:
          situation = answer.values
        case reactionQuestionId:
          reaction = answer.values
      }
    })
    let mappedJournal = {
      feeling: journal.feeling,
      body: body,
      thoughts: thoughts,
      situation: situation,
      reaction: reaction
    }
    return mappedJournal
  }

  journalSorter(journal_a, journal_b) {
    let date_a = new Date(journal_a.created_at)
    let date_b = new Date(journal_b.created_at)

    if(date_a < date_b) {
      return 1
    } else if(date_a > date_b) {
      return -1
    } else {
      return 0
    }
  }

  render() {
    return(
      <ul className="timeline list">
        {
          this.props.journals.sort(this.journalSorter).map((journal, i) => {
            let date = new Date(journal.created_at)
            let mappedJournal = this.mapJournal(journal)

            return (
              <div key={i} >
                <p className="list-title">{this.getTheDate(date)}</p>
                <div className="row">
                  <div className="col-xs-2">
                    {this.getTheTime(date)}
                  </div>
                  <div className="col-xs-2">
                    <FeelingSmiley
                      feeling={mappedJournal.feeling}
                    />
                  </div>
                  <div className="col-xs-6">
                    <span className="feeling-value">{ mappedJournal.feeling }</span>
                  </div>
                </div>
                <div className="row">
                  <ul className="timeline-day list primary-list">
                    <li className="list-item rtv-list-item result-title">Dein Körper</li>
                    <li className="list-item rtv-list-item result-answer"><DisplayBody body={ markupBody(mappedJournal.body) } /></li>
                    <li className="list-item rtv-list-item result-title">Deine Gedanken</li>
                    <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(mappedJournal.thoughts),", ")}</li>
                    <li className="list-item rtv-list-item result-title">Deine Situation</li>
                    <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(mappedJournal.situation),", ")}</li>
                    <li className="list-item rtv-list-item result-title">Deine Reaktion</li>
                    <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(mappedJournal.reaction),", ")}</li>
                  </ul>
                </div>
              </div>
            )
          })
        }
      </ul>
    )
  }
}

JournalList.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(JournalList)