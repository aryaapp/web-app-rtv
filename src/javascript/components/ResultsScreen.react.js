/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { executeSaveJournal } from '../actions/journals'

let d3 = require('d3')
let Section = require('./Question/Section.react.js')
let QuestionTitle = require('./Question/QuestionTitle.react.js')
let QuestionSubtitle = require('./Question/QuestionSubtitle.react.js')
let QuestionHeader = require('./Question/QuestionHeader.react.js')
let QuestionMain = require('./Question/QuestionMain.react.js')
let FixedSectionFooter = require('./Question/FixedSectionFooter.react.js')
let ReactSlider = require('rc-slider')
let DisplayBody = require('./DisplayBody.react.js')
let ConfirmationModal = require('./Question/ConfirmationModal.react.js')
let Content = require('../constants/localizableStringsDE.js')

let Recaptcha = require('react-google-recaptcha');

//returns color belonging to moodrange 0-100
let d3MoodColor = function(value) {
  let colorScale = d3.scale.linear()
        .domain([0,50,100])
        .range(['#e86e6b','#fcd56b','#92D381']); //['#e86e6b','#e86e6c','#fcd56b','#59d1ba','#59d1bb','#a5d36e']
  return colorScale(value)
}

let markupBody = function(body) {
    let markupBody = {}
    for (var bodypart in body) {
      markupBody[bodypart] = intersperse(body[bodypart], ", ")
    }
    return markupBody
}

let reverseArray = function (input) {
    var ret = new Array;
    for(var i = input.length-1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}

let intersperse = function(arr, sep) {
    if (arr.length === 0) {
        return [];
    }
    return arr.slice(1).reduce(function(xs, x, i) {
        return xs.concat([sep, x]);
    }, [arr[0]]);
}


const mapDispatchToProps = (dispatch) => {
  return {
    executeSaveJournal: (journal_data) => dispatch(executeSaveJournal(journal_data)),
    navHome: () => dispatch(pushPath('/home'))
  }
}

let ResultsScreen = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      recaptchaToken: '',
      emailValid: true,
      tryToSend: false
    }
  },
  componentDidMount: function() {
    $(".rc-slider-track").css("background-color", d3MoodColor(this.props.feeling.value))
  },
  update: function(e) {
    this.setState({ email: e.target.value })
  },
  recaptchaVerify: function(value) {
    this.setState({ recaptchaToken: value });
  },
  checkEMail: function(e) {
    let re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(this.state.email)
  },
  sendResults: function(e) {
    this.setState({ tryToSend: true })
    let that = this
    if (that.checkEMail()) {
      let data = {
        token: that.state.recaptchaToken,
        email: that.state.email,
        results: {
          feeling:   that.props.feeling.value,
          color:     d3MoodColor(this.props.feeling.value),
          body:      that.props.body,
          thoughts:  reverseArray(that.props.thoughts),
          situation: reverseArray(that.props.situation),
          reaction:  reverseArray(that.props.reaction),
        },
      }
      $.ajax({
        type: 'POST',
        url: 'https://arya-api-dev.herokuapp.com/v1/email/rtv_mindfullness_results',
        data: data
      })
      .done(function(data) {
        that.refs['confirmation'].openModal()
      })
      .fail(function(jqXhr) {
        console.log('failed to send request');
      });
    } else {
      this.setState({ emailValid: false})
    }
  },

  saveResults: function(e) {
    // let data = {
    //   token: this.state.recaptchaToken,
    //   email: this.state.email,
    //   results: {
    //     feeling:   this.props.feeling.value,
    //     body:      this.props.body,
    //     thoughts:  reverseArray(this.props.thoughts),
    //     situation: reverseArray(this.props.situation),
    //     reaction:  reverseArray(this.props.reaction),
    //   },
    // }
    const defaultQuestionnaireId = '99dbdf90-327a-497b-8d1e-918d90a73642'
    const feelingQuestionId = '13be5392-b860-4626-9fe5-7256da9b0482'
    const bodyQuestionId = '4e5d82b4-4aec-4ec7-a44b-62316ef10741'
    const thoughtsQuestionId = '381b6e0b-d93c-4b31-b93a-43ffa67963e6'
    const situationQuestionId = 'df71408f-a6c2-4850-9106-e67b742df4d9'
    const reactionQuestionId = 'f9a7521c-e5ed-4942-aad1-9cd5236d3c76'

    let data = {
      questionnaire_id: defaultQuestionnaireId,
      feeling: this.props.feeling.value,
      answers: [
        {
          question_id: bodyQuestionId,
          values: this.props.body
        }, {
          question_id: thoughtsQuestionId,
          values: reverseArray(this.props.thoughts)
        }, {
          question_id: situationQuestionId,
          values: reverseArray(this.props.situation)
        }, {
          question_id: reactionQuestionId,
          values: reverseArray(this.props.reaction)
        }
      ]
    }
    this.props.executeSaveJournal(data)
  },

  render() {

    let emailInvalidLabel = <label className="validation-message">Bitte gib eine gültige E-Mailadresse ein.</label>
    let captachNotConfirmed = <label className="validation-message">Bitte bestätige, dass du auch wirklich ein Mensch bist ;-)</label>
    let submitButton = ''
    const { access_token } = this.props
    console.log('access_token', access_token)
    if( typeof access_token !== 'undefined' && access_token.length > 0) {
      submitButton = <button className='btn btn-primary nav-button next-button relative-button' onClick={this.saveResults}><i className="fa fa-envelope-o"></i> Save Results</button>
    } else {
      submitButton = <button className='btn btn-primary nav-button next-button relative-button' onClick={this.signUp}><i className="fa fa-envelope-o"></i> Account anlegen</button>
    }

    return (
      <Section>
            <QuestionHeader>
              <div className="col-xs-1"></div>
              <QuestionTitle title={ Content.QUESTION_FINISH_TITLE } />
              <QuestionSubtitle subtitle= { Content.QUESTION_FINISH_SUBTITLE } />
            </QuestionHeader>
            <QuestionMain>
                <ul className="rtv-results list rtv-list">
                  <li className="list-item rtv-list-item result-title">Dein Befinden <strong></strong></li>
                  <li className="list-item rtv-list-item result-answer">
                    <div className="row">
                      <div className="col-xs-2">
                        <span className="feeling-value">{this.props.feeling.value}</span>
                      </div>
                      <div className="col-xs-10">
                        <ReactSlider disabled={true} value={this.props.feeling.value} />
                      </div>
                    </div>
                  </li>
                  <li className="list-item rtv-list-item result-title">Dein Körper</li>
                  <li className="list-item rtv-list-item result-answer"><DisplayBody body={ markupBody(this.props.body) } /></li>
                  <li className="list-item rtv-list-item result-title">Deine Gedanken</li>
                  <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.thoughts),", ")}</li>
                  <li className="list-item rtv-list-item result-title">Deine Situation</li>
                  <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.situation),", ")}</li>
                  <li className="list-item rtv-list-item result-title">Deine Reaktion</li>
                  <li className="list-item rtv-list-item result-answer">{intersperse(reverseArray(this.props.reaction),", ")}</li>
                </ul>
                <div className="col-xs-12">
                  <QuestionSubtitle subtitle= "Bitte bestätige, dass du auch wirklich ein Mensch bist ;-) und trage deine E-Mail-Adresse unten ein." />
                </div>
                <div className="form-group col-xs-12">
                  <Recaptcha
                    ref="recaptcha"
                    sitekey="6LdJ2RETAAAAAPHK7GmcRZTPnZY0E3AGY0sivpAs"
                    onChange={this.recaptchaVerify}
                  />
                  { this.state.recaptchaToken.length == '' && this.state.tryToSend ? captachNotConfirmed : '' }
                  <input
                    className="form-control email-control"
                    type='email'
                    placeholder="email"
                    aria-describedby="basic-addon1"
                    value={this.state.email}
                    onChange={this.update} />
                  { this.state.emailValid ? '' : emailInvalidLabel }
                </div>
                <div className="col-xs-12">
                  { submitButton }
                </div>
                <div className="col-xs-12">
                  <button className='btn nav-button next-button relative-button' onClick={this.props.clearData}>Eintrag verwerfen</button>
                </div>
                <div className="col-xs-12">
                  <button className='btn nav-button relative-button' onClick={this.props.navHome}>Home</button>
                </div>

                <div className="col-xs-12">
                  <QuestionSubtitle subtitle= "Oder schließe dieses Fenster und beende die Anwendung (deine Daten werden nicht gespeichert)" />
                </div>
              </QuestionMain>
              <ConfirmationModal ref="confirmation" />
      </Section>
    );
  }
});

// <button className='btn btn-full-width' onClick={this.props.clearData}><i className="fa fa-trash-o"></i> Report verwerfen</button>

export default connect(state => state, mapDispatchToProps)(ResultsScreen)
