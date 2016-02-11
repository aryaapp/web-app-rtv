/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
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
import { includes, filter, first, isNil, keys, map, isEmpty } from 'lodash'
import { imageForEmotion, buildBodyForDisplay, hexToRgb, calculateEmotionColor, formatDay, formatTime, journalSorter, mapJournal, reverseArray, intersperse} from '../utilities'


const mapStateToProps = (state) => {
  return {
    journalsForPdf: state.homeView.journalsForPdf,
    user: state.user,
    journals: state.journals
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navHome: () => dispatch(routeActions.push('/home')),
  }
}

class JournalPdfView extends Component {
  constructor(props) {
    super(props)

    this.createPDF = this.createPDF.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
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
    const { user, journals, journalsForPdf } = this.props
    const selectedJournals = filter(journals, rawJournal => includes(journalsForPdf, rawJournal.id))

    let journalContent = []

    map(selectedJournals, rawJournal => {
      const journal = mapJournal(rawJournal)
      const journal_date = new Date(rawJournal.created_at)

      // Journal entry headline
      let answers = [{ text: `${formatDay(journal_date)}, ${formatTime(journal_date)} \n`, style:'date' }]
      answers.push({ text: 'Dein Befinden:\n', bold:true })
      answers.push({ stack: [{ image: imageForEmotion(journal.feeling), width: 24, height: 24 }]})
      answers.push({ text: `${journal.feeling}/100\n\n`, color: calculateEmotionColor(journal.feeling) })

      let printBodyHeadline = true
      map(keys(body_parts), (element) => {
        if(!isEmpty(journal.body[element])) {
          if(printBodyHeadline) {
            answers.push({ text: 'Dein Körper:\n', bold: true })
            printBodyHeadline = false
          }
          answers.push({ text: `${body_parts[element]}\n`, bold:true, fontSize: 10 })
          answers.push({ text: `${journal.body[element].join(', ')}\n`, fontSize: 9})
        }
      })

      if(!isEmpty(journal.thoughts)) {
        answers.push({ text: 'Deine Gedanken:\n', bold: true })
        answers.push({ text: `${journal.thoughts.join(', ')} \n\n` })
      }
      if(!isEmpty(journal.situation)) {
        answers.push({ text: 'Deine Situation:\n', bold: true })
        answers.push({ text: `${journal.situation.join(', ')} \n\n` })
      }
      if(!isEmpty(journal.reaction)) {
        answers.push({ text: 'Deine Reaction:\n', bold: true })
        answers.push({ text: `${journal.reaction.join(', ')} \n\n` })
      }

      journalContent.push([{ stack : answers, style:'journal' }])
    })

    let dd = {
      defaultStyle: {
        font: 'Raleway'
      },
      header: [
        { text: + user.email, margin: [55,16,16,16] }
      ],
      content: [
        {
          columns: [{ image: 'rtvlogo', width: 200 }, { text: formatDay(new Date()), width: 200, alignment: 'right' }],
          margin: [55, 40, 60, 40]
        },
        { text: 'Achtsamkeits-Tagebuch\n', style: 'title' },
        { text: user.email + '\n\n', style: 'content' },
        {
          text: [ { text: 'Alle Einträge:\n\n', fontSize: 15, italics: true, bold: false },],
          style: 'content'
        },
        {
          table: {
            widths: ['100%'],
            body: journalContent
          },
          layout: {
            hLineWidth: function(i, node) {
                return (i === node.table.body.length) ? 0 : 1;
            },
            vLineWidth: function(i, node) {
                return 0;
            },
            hLineColor: function(i, node) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
          },
          style: 'content'
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        title: {
          fontSize: 18,
          bold:true,
          margin: [55, 16, 60, 0]
        },
        subtitle: {

        },
        date: {
          fontSize: 14,
          bold: false,
          margin:[0,8,0,8]
        },
        journal: {
          fontSize:11,
          bold: false,
          margin:[0,0,0,20]
        },
        bigger: {
          fontSize: 15,
          italics: true,
        },
        journalHeadline: {
          bold: true,
          fontSize: 11
        },
        journalBody: {
          fontSize: 10
        },
        content: {
          margin: [55, 0, 60, 0]
        }
      },
      images: {
        rtvlogo: 'data:image/png;base64,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'
      }
    }

    const fontDefinition = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
      },
      Raleway: {
        normal: 'Raleway-Regular.ttf',
        bold: 'Raleway-Regular.ttf',
        italics: 'Raleway-Regular.ttf',
        bolditalics: 'Raleway-Regular.ttf'
      }
    }
    pdfMake.fonts = fontDefinition
    console.log(pdfMake)
    pdfMake.createPdf(dd).open()
  }

  componentDidMount() {
    this.createPDF()
    this.props.navHome()
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

JournalPdfView.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(JournalPdfView)
