/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

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
      <div className="row section relative">
        <ScrollIndicator />
        <div className="rtv-question">
          <div className="col-xs-10 col-xs-push-1 text-center">
            <h3 class="rtv-title">{this.props.title}</h3>
          </div>
          <div className="col-xs-12">
            <SliderInput value={this.props.feeling} onChange={this.update} />
          </div>
          <div className="col-xs-12">
            
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FeelingQuestion
//<QuestionModal><p>Hello Feeling!</p></QuestionModal>