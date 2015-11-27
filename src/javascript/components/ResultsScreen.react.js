/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';


let Section = require('./Question/Section.react.js')
let QuestionTitle = require('./Question/QuestionTitle.react.js')
let FixedSectionFooter = require('./Question/FixedSectionFooter.react.js')
let ReactSlider = require('rc-slider')
let DisplayBody = require('./DisplayBody.react.js')
let ConfirmationModal = require('./Question/ConfirmationModal.react.js')

var ResultsScreen = React.createClass({
  getDefaultProps: function () {
    return {
      title: "Hier deine Eingabe",
      feeling: 50,
      body: {},
      thoughts: '',
      situation:  ['keine Eingabe'],
      reaction: ['keine Eingabe']
    };
  },
  getInitialState: function() {
    return {
      email: ''
    }
  },
  update: function(e) {
    this.setState({ email: e.target.value })
  },

  checkEMail: function(e) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(this.state.email)
  },
  sendResults: function(e) {
    if (this.checkEMail()) {
      console.log('E-Mail results to:', this.state.email)
      this.refs['confirmation'].openModal()
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
