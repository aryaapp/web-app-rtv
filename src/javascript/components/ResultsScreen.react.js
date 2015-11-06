/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var ResultsScreen = React.createClass({
  getDefaultProps: function () {
    return {
      title: "Hier deine Eingabe",
      feeling: 50,
      body: {},
      thoughts: '',
      situation:  ['sit1','sit2'],
      reaction: ['reak1','reak2']
    };
  },
  getInitialState: function() {
    return {
      email: 'max.muster@example.com'
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
      <div className="col-sm-12">
        <h2>{this.props.title}</h2>
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
        <input type='email' value={this.state.email} onChange={this.update} placeholder="z.B. max.muster@example.de" />
        <button onClick={this.props.clearData}>löschen</button><button onClick={this.sendResults}>Report verschicken</button>
      </div>
    );
  }
});

module.exports = ResultsScreen
