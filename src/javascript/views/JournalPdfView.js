/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import ReactSlider from 'rc-slider'

import NextButton from '../components/Reusable/NextButton.react.js'
import PrevButton from '../components/Reusable/PrevButton.react.js'

import QuestionTitle from '../components/Question/QuestionTitle.react.js'
import QuestionSubtitle from '../components/Question/QuestionSubtitle.react.js'
import QuestionHeader from '../components/Question/QuestionHeader.react.js'
import QuestionMain from '../components/Question/QuestionMain.react.js'

import DisplayBody from '../components/DisplayBody.react.js'
import {
  defaultQuestionnaireId,
  feelingQuestionId,
  bodyQuestionId,
  thoughtsQuestionId,
  situationQuestionId,
  reactionQuestionId
} from '../constants/ids'
import FeelingSmiley from '../components/FeelingSmiley'

import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'
import { calculateEmotionColor, formatDay, formatTime, journalSorter, mapJournal, reverseArray, intersperse} from '../utilities'

const mapStateToProps = (state) => {
  return {
    pdfJournals: state.homeView.selectedJournals,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navHome: () => dispatch(pushPath('/home')),
  }
}

class JournalPdfView extends Component {
  constructor(props) {
    super(props)

    this.createPDF = this.createPDF.bind(this)
    this.getCanvas = this.getCanvas.bind(this)
  }

  createPDF() {
    let app = $('#main-app')
    let cachedWidth = app.width()
    let doc = new jsPDF({ format:'a4' })
    let specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };
    // this.getCanvas().then((canvas) => {
    //   let img = canvas.toDataURL("image/png")
    //   let doc = new jsPDF({ format:'a4' })
    //   doc.text(20, 20, 'Hello world!')
    //   doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.')
    //   doc.addImage(img, 'JPEG', 20, 20)


    //   doc.save('techumber-html-to-pdf.pdf')
    //   app.width(cachedWidth)
    // })
    doc.fromHTML(app.get(0), 15, 15, {
      'width': 170,
      'elementHandlers': specialElementHandlers
    }, (e) => console.log(e))
    doc.save('techumber-html-to-pdf.pdf')
  }

  getCanvas() {
    let a4  = [ 595.28,  841.89]
    let app = $('#main-app')
    app.width((a4[0]*1.33333) -80).css('max-width','none')

    return html2canvas(app, {
      imageTimeout: 2000,
      removeContainer: true
    })
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
            <ul className="timeline list">
              {
                this.props.pdfJournals.sort(journalSorter).map((journal, i) => {
                  let date = new Date(journal.created_at)
                  let mappedJournal = mapJournal(journal)
                  let style = { color : calculateEmotionColor(mappedJournal.feeling) }

                  return(
                    <div key={i}>
                      <div className="row">
                        <p className="list-title">{formatDay(date)}</p>
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
                  ) // return
                }) // map
              }
            </ul>
          </QuestionMain>
          <FixedSectionFooter>
            <button className="test-button" onClick={this.createPDF}>
              <span className="btn-text">create pdf</span>
            </button>
            <button className="test-button" onClick={this.navHome}>
              <span className="btn-text">Home</span>
            </button>
          </FixedSectionFooter>
        </div>
      </div>
    )
  }
}

JournalPdfView.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JournalPdfView)
