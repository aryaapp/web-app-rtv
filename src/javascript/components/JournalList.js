/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import d3 from 'd3'
import ReactSlider from 'rc-slider'
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

//returns color belonging to moodrange 0-100
const calculateEmotionColor = function(feeling) {
  if(feeling == 100) {
      return "#92d381"
     } else if (feeling >= 74) {
      return "#c7d476"
     } else if (feeling >= 50) {
      return "#fcd56b"
     } else if (feeling >= 26) {
      return "#f2a26b"
     } else {
      return "#e86e6b"
     }
}

class JournalList extends Component {
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
            let style = { color : calculateEmotionColor(mappedJournal.feeling) }
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
                    <span className="feeling-value" style= { style } >{ mappedJournal.feeling }<small> / 100</small></span>
                  </div>
                  <div className="col-xs-2">
                    <button type="button" data-toggle="collapse" data-target={ "#collapse-" + i } aria-expanded="false" aria-controls="collapseExample">hit meh</button>
                  </div>
                </div>
                <div className="row collapse" id={ "collapse-" + i }>
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
