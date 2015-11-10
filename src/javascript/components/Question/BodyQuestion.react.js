/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
const update = require('react-addons-update');


let Section = require('./Section.react.js')
let QuestionButton = require('./QuestionButton.react.js')
let QuestionTitle = require('./QuestionTitle.react.js')
let QuestionModal = require('./QuestionModal.react.js')
let SliderInput = require('./SliderInput.react.js')
let ScrollIndicator = require('./ScrollIndicator.react.js')
let BodyModal = require('./BodyModal.react.js');
let BodyImage = require('./BodyImage.react.js');
let Content = require('../../constants/localizableStringsDE.js')

let BodyQuestion = React.createClass({
  getDefaultProps: function () {
    return {
      body: {
        head: ['eins'],
        left_arm: ['zwei'],
        right_arm: ['drei'],
        chest: [],
        left_leg: [],
        right_leg: [],
        hip: []
      },
    };
  },
  update: function(key, value) {
    var bodyStateChange = {}
    bodyStateChange[key] = value
    var newBodyState = update(this.props.body, { $merge: bodyStateChange })
    this.props.onChange(newBodyState)
  },
  openBodyModal: function(key) {
    this.refs['body_'+ key].openModal();
  },

  render() {
    var that = this

    var options = {
      head: [
        { value: Content.QUESTION_BODY_HEADACHE, label: Content.QUESTION_BODY_HEADACHE },
        { value: Content.QUESTION_BODY_FLUSHED_FACE, label: Content.QUESTION_BODY_FLUSHED_FACE },
        { value: Content.QUESTION_BODY_DIZZY_AND_LIGHTHEADED, label: Content.QUESTION_BODY_DIZZY_AND_LIGHTHEADED },
        { value: Content.QUESTION_BODY_NECK_PAIN, label: Content.QUESTION_BODY_NECK_PAIN }
      ],
      chest: [
        { value: Content.QUESTION_BODY_CHEST_PAIN, label: Content.QUESTION_BODY_CHEST_PAIN },
        { value: Content.QUESTION_BODY_BREATHING, label: Content.QUESTION_BODY_BREATHING },
        { value: Content.QUESTION_BODY_PRESSURE_CHEST, label: Content.QUESTION_BODY_PRESSURE_CHEST },
        { value: Content.QUESTION_BODY_HEARTBEAT, label: Content.QUESTION_BODY_HEARTBEAT },
        { value: Content.QUESTION_BODY_BACK_PAIN, label: Content.QUESTION_BODY_BACK_PAIN },
        { value: Content.QUESTION_BODY_STIFNESS, label: Content.QUESTION_BODY_STIFNESS },
        { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
      ],
      hip: [
        { value: Content.QUESTION_BODY_DIGESTIVE, label: Content.QUESTION_BODY_DIGESTIVE },
        { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
        { value: Content.QUESTION_BODY_CROTCH, label: Content.QUESTION_BODY_CROTCH },
        { value: Content.QUESTION_BODY_TENSION, label: Content.QUESTION_BODY_TENSION },
      ],
      left_arm: [
        { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
        { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
        { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
        { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
      ],
      right_arm: [
        { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
        { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
        { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
        { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
      ],
      left_leg: [
        { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
        { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
        { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
        { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
      ],
      right_leg: [
        { value: Content.QUESTION_BODY_MUSCLE_ACHE, label: Content.QUESTION_BODY_MUSCLE_ACHE },
        { value: Content.QUESTION_BODY_NAUSEOUS, label: Content.QUESTION_BODY_NAUSEOUS },
        { value: Content.QUESTION_BODY_NUMBNESS, label: Content.QUESTION_BODY_NUMBNESS },
        { value: Content.QUESTION_BODY_TINGLING, label: Content.QUESTION_BODY_TINGLING },
      ],
    };

    return (
      <Section>
        <QuestionTitle title={ Content.QUESTION_BODY_TITLE } />
        <div className="col-xs-10 col-xs-push-1">
          <BodyImage body={this.props.body} openBodyModal={this.openBodyModal} />
          <BodyModal
            ref='body_head'
            values={that.props.body['head']}
            title='Kopf'
            options={options['head']}
            onChange={that.update.bind(that, 'head')}
            />
          <BodyModal
            ref='body_left_arm'
            values={that.props.body['left_arm']}
            title="Linker Arm"
            options={options['left_arm']}
            onChange={that.update.bind(that, 'left_arm')}
            />
          <BodyModal
            ref='body_right_arm'
            values={that.props.body['right_arm']}
            title="Rechter Arm"
            options={options['right_arm']}
            onChange={that.update.bind(that, 'right_arm')}
            />
          <BodyModal
            ref='body_chest'
            values={that.props.body['chest']}
            title="Brust"
            options={options['chest']}
            onChange={that.update.bind(that, 'chest')}
            />
          <BodyModal
            ref='body_hip'
            values={that.props.body['hip']}
            title="Unterleib"
            options={options['hip']}
            onChange={that.update.bind(that, 'hip')}
            />
          <BodyModal
            ref='body_left_leg'
            values={that.props.body['left_leg']}
            title="Linkes Bein"
            options={options['left_leg']}
            onChange={that.update.bind(that, 'left_leg')}
            />
          <BodyModal
            ref='body_right_leg'
            values={that.props.body['right_leg']}
            title="Rechtes Bein"
            options={options['right_leg']}
            onChange={that.update.bind(that, 'right_leg')}
            />
        </div>
        <QuestionModal
              title ={ Content.QUESTION_BODY_TITLE }
              body = { Content.QUESTION_BODY_EXPLANATION }/>
      </Section>
    );
  }
});

module.exports = BodyQuestion
