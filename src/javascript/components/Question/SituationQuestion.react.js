/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var QuestionModal = require('./QuestionModal.react.js');
var ListInput = require('./ListInput.react.js');

var SituationQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      situation: [],
      title: "Wie ist deine Situation?"
    };
  },

  update: function(value) {
    this.props.onChange(value)
  },

  render() {
    return (
      <div className="col-sm-12">
        <QuestionModal><p>Hello Situation!</p></QuestionModal>
        <h1>{this.props.title}</h1>
        <ListInput value={this.props.situation} onChange={this.update} />
      </div>
    );
  }
});

module.exports = SituationQuestion
