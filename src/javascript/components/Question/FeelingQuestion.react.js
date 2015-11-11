/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
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
      <Section indicator={true}>
            <QuestionButton questionId="1" />
            <QuestionTitle title={this.props.title} />
            <div className="col-xs-10 col-xs-push-1">
              <SliderInput value={this.props.feeling} onChange={this.update} />
              <img className="emoticons" src="./images/emoticons.png" />
            </div>
      </Section>
    );
  }
});

module.exports = FeelingQuestion
//<QuestionModal><p>Hello Feeling!</p></QuestionModal>
