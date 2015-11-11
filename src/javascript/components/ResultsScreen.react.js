/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let Section = require('./Question/Section.react.js')
let QuestionTitle = require('./Question/QuestionTitle.react.js')
let FixedSectionFooter = require('./Question/FixedSectionFooter.react.js')

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
    }
  },

  render() {
    return (
      <Section>
        <div className="col-xs-1"></div>
        <QuestionTitle title={this.props.title} />
        <div className="col-xs-10 col-xs-push-1">
          <dl>
            <dt>Deine Befinden</dt>
            <dd>{this.props.feeling}</dd>
            <dt>Deine Körper</dt>
            <dd>{this.props.body}</dd>
            <dt>Deine Gedanken</dt>
            <dd>{this.props.thoughts}</dd>
            <dt>Deine Situation</dt>
            <dd>{this.props.situation}</dd>
            <dt>Deine Reaktion</dt>
            <dd>{this.props.reaction}</dd>
          </dl>
        </div>
        
        <FixedSectionFooter>
          <div className="col-xs-12 no-padding">
            <div className="form-group">
              <input
                className="form-control"
                type='email'
                placeholder="email"
                aria-describedby="basic-addon1"
                value={this.state.email}
                onChange={this.update} />
            </div>
            <div className="col-xs-4">
              <button className='btn' onClick={this.props.clearData}>löschen</button>
            </div>
            <div className="col-xs-8">
              <button className='btn btn-success' onClick={this.sendResults}>Report verschicken</button>
            </div>
          </div>
        </FixedSectionFooter>
      </Section>
    );
  }
});

module.exports = ResultsScreen
