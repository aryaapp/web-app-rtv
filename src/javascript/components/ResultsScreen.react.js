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
    if(this.state.email != '') {
      return true
    } else {
      return false
    }
  },
  sendResults: function(e) {
    if (this.checkEMail()) {
      console.log('E-Mail results to:', this.state.email)
      this.openModal()
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
              <dl className="rtv-results">
                <dt>Deine Befinden</dt>
                <dd><ReactSlider disabled={true} value={this.props.feeling} /></dd>
                <dt>Deine Körper</dt>
                <dd><DisplayBody body={this.props.body} /></dd>
                <dt>Deine Gedanken</dt>
                <dd>{this.props.thoughts}</dd>
                <dt>Deine Situation</dt>
                <dd>{this.props.situation}</dd>
                <dt>Deine Reaktion</dt>
                <dd>{this.props.reaction}</dd>
              </dl>
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
        <ConfirmationModal />
      </Section>
    );
  }
});

module.exports = ResultsScreen
