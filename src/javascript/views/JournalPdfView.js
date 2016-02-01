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

    let dd = {
      content: "This is a sample PDF printed with pdfMake",
      defaultStyle: {
        font: 'Raleway'
      },
    }
    let fontDefinition = {
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
