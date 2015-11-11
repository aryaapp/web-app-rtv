/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionModal = require('./QuestionModal.react.js')
let SliderInput = require('./SliderInput.react.js')
let ScrollIndicator = require('./ScrollIndicator.react.js')


let FeelingQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      feeling: 50,
      title: "Wie fühlst du dich?"
    };
  },

  update: function(value) {
    this.props.onChange(value)
  },

  render() {
    return (
      <Section>
            <QuestionButton questionId="1" />
            <div className="col-xs-10 rtv-title text-center">
              <h3 class="rtv-title">{this.props.title}</h3>
            </div>
            <div className="col-xs-10 col-xs-push-1">
              <SliderInput value={this.props.feeling} onChange={this.update} />
            </div>
      </Section>
    );
  }
});

module.exports = FeelingQuestion
//<QuestionModal><p>Hello Feeling!</p></QuestionModal>
