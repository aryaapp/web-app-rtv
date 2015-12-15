/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

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

let intersperse = function(arr, sep) {
    if (arr.length === 0) {
        return [];
    }
    return arr.slice(1).reduce(function(xs, x, i) {
        return xs.concat([sep, x]);
    }, [arr[0]]);
}

let ResultsScreen = React.createClass({
  getDefaultProps: function () {
    return {
      title: "Hier deine Eingabe",
      feeling: {
        value: 50,
        color: ""
      },
      body: {},
      thoughts: [],
      situation:  ['keine Eingabe'],
      reaction: ['keine Eingabe']
    };
  },
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
          thoughts:  that.props.thoughts,
          situation: that.props.situation,
          reaction:  that.props.reaction,
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

  render() {

    var emailInvalidLabel = <label className="validation-message">Bitte gib eine gültige E-Mailadresse ein.</label>
    var captachNotConfirmed = <label className="validation-message">Bitte bestätige, dass du auch wirklich ein Mensch bist ;-)</label>

    return (
      <Section>
            <QuestionHeader>
              <div className="col-xs-1"></div>
              <QuestionTitle title={ Content.QUESTION_FINISH_TITLE } />
              <QuestionSubtitle subtitle= { Content.QUESTION_FINISH_SUBTITLE } />
            </QuestionHeader>
            <QuestionMain>
                <ul className="rtv-results list rtv-list">
                  <li className="list-item rtv-list-item result-title">Deine Befinden <strong></strong></li>
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
                  <li className="list-item rtv-list-item result-title">Deine Körper</li>
                  <li className="list-item rtv-list-item result-answer"><DisplayBody body={ markupBody(this.props.body) } /></li>
                  <li className="list-item rtv-list-item result-title">Deine Gedanken</li>
                  <li className="list-item rtv-list-item result-answer">{intersperse(this.props.thoughts,", ")}</li>
                  <li className="list-item rtv-list-item result-title">Deine Situation</li>
                  <li className="list-item rtv-list-item result-answer">{intersperse(this.props.situation,", ")}</li>
                  <li className="list-item rtv-list-item result-title">Deine Reaktion</li>
                  <li className="list-item rtv-list-item result-answer">{intersperse(this.props.reaction,", ")}</li>
                </ul>
                <div className="col-xs-12">
                  <QuestionSubtitle subtitle= "Trage unten deine Email Adresse ein und bestätige den Sicherheitscheck." />
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
                  <button className='btn btn-primary nav-button next-button relative-button' onClick={this.sendResults}><i className="fa fa-envelope-o"></i> Report verschicken</button>
                </div>
                <div className="col-xs-12">
                  <QuestionSubtitle subtitle= "Oder schließen Sie dieses Fenster, um die Daten zu löschen." />
                </div>
              </QuestionMain>
              <ConfirmationModal ref="confirmation" />
      </Section>
    );
  }
});

module.exports = ResultsScreen
// <button className='btn btn-full-width' onClick={this.props.clearData}><i className="fa fa-trash-o"></i> Report verwerfen</button>
