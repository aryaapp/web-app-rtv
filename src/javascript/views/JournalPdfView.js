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
import Content from '../constants/localizableStringsDE.js'

import FixedSectionFooter from '../components/Question/FixedSectionFooter.react.js'
import { imageForEmotion, buildBodyForDisplay, hexToRgb, calculateEmotionColor, formatDay, formatTime, journalSorter, mapJournal, reverseArray, intersperse} from '../utilities'

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
  }

  createPDF() {
    const body_parts = {
      head: Content.QUESTION_BODY_HEAD,
      left_arm: Content.QUESTION_BODY_LEFT_ARM,
      right_arm: Content.QUESTION_BODY_RIGHT_ARM,
      chest: Content.QUESTION_BODY_CHEST,
      abdomen: Content.QUESTION_BODY_ABDOMEN,
      left_leg: Content.QUESTION_BODY_LEFT_LEG,
      right_leg: Content.QUESTION_BODY_RIGHT_LEG,
      hip: Content.QUESTION_BODY_HIP
    }

    let doc = new jsPDF({ unit: 'mm', format:'a4', 'orientation': 'P' })

    // doc.text(20, 20, 'This is the default font.');
    // doc.addFont("Open Sans", "Open Sans", 'normal')
    // doc.setFont("Open Sans",'normal');

    // doc.text(20, 70, 'This is Open Sans normal.');

    // doc.setFont("courier",'normal');
    // doc.text(20, 30, 'This is courier normal.');

    // doc.setFont("times", 'normal');
    // doc.setFontType("italic");
    // doc.text(20, 40, 'This is times italic.');

    // doc.setFont("helvetica", 'normal');
    // doc.setFontType("bold");
    // doc.text(20, 50, 'This is helvetica bold.');

    // doc.setFont("courier", 'normal');
    // doc.setFontType("bolditalic");
    // doc.text(20, 60, 'This is courier bolditalic.');

    // doc.save('Test.pdf');

    let a4  = [210, 297]

    doc.setFontType("normal")
    doc.setFontSize(18)
    doc.text(31, 47, "Achtsamkeits-Tagebuch")
    doc.setFontSize(13)
    doc.text(31, 53, "von " + this.props.user.email)
    doc.setFontType("bold")
    doc.text(31, 72, "ALLE EINTRÄGE")

    let height_offset = 69 // for first page

    this.props.pdfJournals.map((rawJournal) => {
      let journal = mapJournal(rawJournal)
      let journal_date = new Date(rawJournal.created_at)

      let expectedBodyHight = _.size(_.filter(journal.body, (element) => element.length > 0)) * 10

      if(height_offset + expectedBodyHight > 210) {
        doc.addPage()
        height_offset = 10
      } else {
        height_offset += 10
      }

      doc.setLineWidth(0.2)
      doc.setDrawColor(212,209,208);
      doc.line(31, height_offset, 177, height_offset)

      doc.setFontSize(14)
      doc.setFontType("normal")
      doc.text(31, height_offset + 8, formatDay(journal_date) + ", " + formatTime(journal_date))

      doc.setFontSize(13)
      doc.text(31, height_offset + 16, "Dein Befinden:")


      let colors = hexToRgb(calculateEmotionColor(journal.feeling))
      doc.setTextColor(colors.r, colors.g, colors.b)
      doc.setFontSize(10)
      let emoImage = imageForEmotion(journal.feeling)
      console.log('feeling emoImage',journal.feeling, emoImage)
      doc.addImage(emoImage, 'PNG', 31, height_offset + 17.5, 7, 7);
      doc.text(42, height_offset + 23, journal.feeling + "/100")
      doc.setTextColor(0, 0, 0)

      doc.setFontSize(13)
      doc.text(31, height_offset + 29, "Dein Körper:")
      doc.setFontSize(10)

      let bodyElementCount = 0
      Object.keys(body_parts).map((element) => {
        if(journal.body[element].length > 0) {
          doc.setFontType("bold")
          doc.text(31, height_offset + 34 + (bodyElementCount * 10), body_parts[element])

          doc.setFontType("normal")
          doc.text(31, height_offset + 39 + (bodyElementCount * 10), journal.body[element].join(', '))
          bodyElementCount = bodyElementCount + 1
        }
      })

      let bodyOffset = bodyElementCount * 10

      doc.setFontSize(13)
      doc.text(31, height_offset + bodyOffset + 35, "Deine Gedanken:")
      doc.setFontSize(10)
      doc.text(31, height_offset + bodyOffset + 40, journal.thoughts.join(', '))

      doc.setFontSize(13)
      doc.text(31, height_offset + bodyOffset + 45, "Deine Situation:")
      doc.setFontSize(10)
      doc.text(31, height_offset + bodyOffset + 50, journal.situation.join(', '))

      doc.setFontSize(13)
      doc.text(31, height_offset + bodyOffset + 55, "Deine Reaktion:")
      doc.setFontSize(10)
      doc.text(31, height_offset + bodyOffset + 60, journal.reaction.join(', '))

      height_offset = height_offset + bodyOffset + 60
    })

    doc.save('journal_output.pdf')
  }

  render() {
    return (
      <div>
        <FixedSectionFooter>
          <button className="test-button" onClick={this.createPDF}>
            <span className="btn-text">create pdf</span>
          </button>
          <button className="test-button" onClick={this.navHome}>
            <span className="btn-text">Home</span>
          </button>
        </FixedSectionFooter>
      </div>
    )
  }
}

JournalPdfView.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JournalPdfView)
