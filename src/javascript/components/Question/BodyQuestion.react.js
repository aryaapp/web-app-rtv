/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
const update = require('react-addons-update');


let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionHeader = require('./QuestionHeader.react.js')
let QuestionMain = require('./QuestionMain.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let QuestionSubtitle = require('./QuestionSubtitle.react.js')
let QuestionModal = require('./QuestionModal.react.js')
let SliderInput = require('./SliderInput.react.js')
let ScrollIndicator = require('./ScrollIndicator.react.js')
let BodyModal = require('./BodyModal.react.js');
let BodyImage = require('./BodyImage.react.js');
let Content = require('../../constants/localizableStringsDE.js')
let FixedSectionFooter = require('./FixedSectionFooter.react.js')
let ReactCSSTransitionGroup = require('react-addons-css-transition-group')

let BodyQuestion = React.createClass({
  getDefaultProps: function() {
    return {
      body: {
        head: [],
        left_arm: [],
        right_arm: [],
        chest: [],
        abdomen: [],
        left_leg: [],
        right_leg: [],
        hip: []
      },
    };
  },

  update: function(key, symptoms) {
    var bodyStateChange = {}
    bodyStateChange[key] = symptoms
    var newBodyState = update(this.props.body, { $merge: bodyStateChange })
    this.props.onChange(newBodyState)
  },

  openBodyModal: function(key) {
    this.refs['body_'+ key].openModal();
  },

  render() {
    var that = this
    return (
      <Section>
        <QuestionHeader>
          <div className="col-xs-1"></div>
          <QuestionTitle title={ Content.QUESTION_BODY_TITLE } />
          <QuestionSubtitle subtitle={ Content.QUESTION_BODY_SUBTITLE } />
        </QuestionHeader>
        <QuestionMain>
          <BodyImage body={this.props.body} openBodyModal={this.openBodyModal} />
        </QuestionMain>
        <BodyModal
          ref='body_head'
          values={that.props.body['head']}
          title='Kopf'
          role="head"
          onChange={that.update.bind(that, 'head')}
          />
        <BodyModal
          ref='body_left_arm'
          values={that.props.body['left_arm']}
          title="Linker Arm"
          role="left_arm"
          onChange={that.update.bind(that, 'left_arm')}
          />
        <BodyModal
          ref='body_right_arm'
          values={that.props.body['right_arm']}
          title="Rechter Arm"
          role="right_arm"
          onChange={that.update.bind(that, 'right_arm')}
          />
        <BodyModal
          ref='body_chest'
          values={that.props.body['chest']}
          title="Brust"
          role="chest"
          onChange={that.update.bind(that, 'chest')}
          />
        <BodyModal
          ref='body_abdomen'
          values={that.props.body['abdomen']}
          title="Bauch"
          role="abdomen"
          onChange={that.update.bind(that, 'abdomen')}
          />
        <BodyModal
          ref='body_hip'
          values={that.props.body['hip']}
          title="Unterleib"
          role="hip"
          onChange={that.update.bind(that, 'hip')}
          />
        <BodyModal
          ref='body_left_leg'
          values={that.props.body['left_leg']}
          title="Linkes Bein"
          role="left_leg"
          onChange={that.update.bind(that, 'left_leg')}
          />
        <BodyModal
          ref='body_right_leg'
          values={that.props.body['right_leg']}
          title="Rechtes Bein"
          role="right_leg"
          onChange={that.update.bind(that, 'right_leg')}
          />
        <QuestionModal
              title ={ Content.QUESTION_BODY_TITLE }
              body = { Content.QUESTION_BODY_EXPLANATION }/>
      </Section>
    );
  }
});

module.exports = BodyQuestion
