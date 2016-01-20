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

import { formatDay, formatTime, journalSorter, mapJournal, reverseArray, intersperse} from '../utilities'

import ReactSlider from 'rc-slider'

export default class JournalList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ul className="timeline list">
        {
          this.props.journals.sort(journalSorter).map((journal, i) => {
            let date = new Date(journal.created_at)
            let mappedJournal = mapJournal(journal)

            return (
              <div key={i} >
                <p className="list-title">{formatDay(date)}</p>
                <div className="row">
                  <div className="col-xs-2">
                    {formatTime(date)}
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
                    <li className="list-item rtv-list-item result-answer"><DisplayBody body={mappedJournal.body} /></li>
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
  journals: PropTypes.array.isRequired
};
