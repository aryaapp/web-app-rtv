/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let d3 = require('d3')
let Section = require('./Question/Section.react.js')
let QuestionTitle = require('./Question/QuestionTitle.react.js')
let FixedSectionFooter = require('./Question/FixedSectionFooter.react.js')
let ReactSlider = require('rc-slider')
let DisplayBody = require('./DisplayBody.react.js')
let ConfirmationModal = require('./Question/ConfirmationModal.react.js')

let Recaptcha = require('react-google-recaptcha');

//returns color belonging to moodrange 0-100
let d3MoodColor = function(value) {
  let colorScale = d3.scale.linear()
        .domain([0,50,100])
        .range(['#e86e6b','#fcd56b','#92D381']); //['#e86e6b','#e86e6c','#fcd56b','#59d1ba','#59d1bb','#a5d36e']
  return colorScale(value)
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
      thoughts: '',
      situation:  ['keine Eingabe'],
      reaction: ['keine Eingabe']
    };
  },
  getInitialState: function() {
    return {
      email: '',
      recaptchaToken: ''
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
    let that = this
    if (that.checkEMail()) {
      let data = {
        token: that.state.recaptchaToken,
        email: that.state.email,
        results: {
          feeling:   that.props.feeling,
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
    }
  },

  render() {
    return (
      <Section>
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-1"></div>
            <QuestionTitle title={this.props.title} />
            <div className="col-xs-12 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3 no-padding slim-scroll">
              <ul className="rtv-results list rtv-list">
                <li className="list-item rtv-list-item result-title">Deine Befinden</li>
                <li className="list-item rtv-list-item result-answer"><ReactSlider disabled={true} value={this.props.feeling.value} /></li>
                <li className="list-item rtv-list-item result-title">Deine Körper</li>
                <li className="list-item rtv-list-item result-answer"><DisplayBody body={this.props.body} /></li>
                <li className="list-item rtv-list-item result-title">Deine Gedanken</li>
                <li className="list-item rtv-list-item result-answer">{this.props.thoughts}</li>
                <li className="list-item rtv-list-item result-title">Deine Situation</li>
                <li className="list-item rtv-list-item result-answer">{this.props.situation}</li>
                <li className="list-item rtv-list-item result-title">Deine Reaktion</li>
                <li className="list-item rtv-list-item result-answer">{this.props.reaction}</li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3 submit-form">
              <div className="form-group">
                <Recaptcha
                  ref="recaptcha"
                  sitekey="6LdJ2RETAAAAAPHK7GmcRZTPnZY0E3AGY0sivpAs"
                  onChange={this.recaptchaVerify}
                />
                <input
                  className="form-control email-control"
                  type='email'
                  placeholder="email"
                  aria-describedby="basic-addon1"
                  value={this.state.email}
                  onChange={this.update} />
              </div>
              <button className='btn btn-full-width btn-success' onClick={this.sendResults}><i className="fa fa-envelope-o"></i> Report verschicken</button>
              <button className='btn btn-full-width' onClick={this.props.clearData}><i className="fa fa-trash-o"></i> Löschen</button>
            </div>
          </div>
        </div>
        <ConfirmationModal ref="confirmation" />
      </Section>
    );
  }
});

module.exports = ResultsScreen
