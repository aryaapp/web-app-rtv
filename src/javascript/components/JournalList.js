/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import ReactSlider from 'rc-slider'
import { routeActions } from 'react-router-redux'

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
import { calculateEmotionColor, formatDay, formatTime, journalSorter, mapJournal, reverseArray, intersperse} from '../utilities'

export default class JournalList extends Component {
  render() {
    if(_.size(this.props.journals) == 0) {
      return <ul className="timeline list"></ul>
    }

    let journalsPerDay = {}
    _.forEach(this.props.journals.sort(journalSorter), ((journal) => {
      let dayString = formatDay(new Date(journal.created_at))

      if(_.isEmpty(journalsPerDay[dayString])) {
        journalsPerDay[dayString] = []
      }
      journalsPerDay[dayString].push(journal)
    }))

    return(
      <ul className="timeline list home-timeline">
        {
          _.map(journalsPerDay, (journalsForTheDay, day_string) => {
            return(
              <div className="timeline-item list-item" key={day_string}>
                <p className="list-title">{day_string}</p>
                {
                  journalsForTheDay.map((journal, i) => {
                    let mappedJournal = mapJournal(journal)
                    let style = { color : calculateEmotionColor(mappedJournal.feeling) }

                    return(
                      <div className="journal" key={i} data-toggle="collapse" data-target={ "#collapse-" + i }>
                        <div className="row special-row">
                          <div className="col-xs-2 time">
                            {formatTime(new Date(journal.created_at))}
                          </div>
                          <div className="col-xs-1">
                            <FeelingSmiley
                              feeling={mappedJournal.feeling}
                            />
                          </div>
                          <div className="col-xs-7 ">
                            <span className="feeling-value" style= { style } >{ mappedJournal.feeling }</span><span style= { style }> / 100</span>
                          </div>
                          <div className="col-xs-1">
                            <div type="button" ><i className="fa fa-lg fa-angle-down"></i></div>
                          </div>
                        </div>
                        <div className="row special-row collapse" id={ "collapse-" + i }>
                          <ul className="timeline-day col-xs-10 col-xs-push-2 list primary-list home-list">
                            <li className="rtv-list-item result-title">Dein Körper</li>
                            <li className="rtv-list-item result-answer"><DisplayBody body={mappedJournal.body} /></li>
                            <li className="rtv-list-item result-title">Deine Gedanken</li>
                            <li className="rtv-list-item result-answer">{intersperse(reverseArray(mappedJournal.thoughts),". ")}</li>
                            <li className="rtv-list-item result-title">Deine Situation</li>
                            <li className="rtv-list-item result-answer">{intersperse(reverseArray(mappedJournal.situation),". ")}</li>
                            <li className="rtv-list-item result-title">Deine Reaktion</li>
                            <li className="rtv-list-item result-answer">{intersperse(reverseArray(mappedJournal.reaction),". ")}</li>
                          </ul>
                          <div className="col-xs-12">
                            <button className="btn btn-ghost nav-button next-button relative-button" onClick={this.props.singleJournalPDF.bind(null,journal)}>DIESEN EINTRAG HERUNTERLADEN</button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </ul>
    )
  }
}

JournalList.propTypes = {
  journals: PropTypes.array.isRequired
};
