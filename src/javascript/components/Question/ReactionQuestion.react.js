/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let QuestionModal = require('./QuestionModal.react.js');
let ListInput = require('./ListInput.react.js');

let ReactionQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      reaction: [],
      title: "Wie war deine Reaktion?"
    };
  },

  update: function(value) {
    this.props.onChange(value)
  },

  render() {
    return (
      <Section>
            <QuestionButton questionId="4" />
            <QuestionTitle title={this.props.title} />
            <div className="col-xs-12 no-padding">
              <ListInput value={this.props.reaction} onChange={this.update} />
            </div>
      </Section>
    );
  }
});

module.exports = ReactionQuestion
