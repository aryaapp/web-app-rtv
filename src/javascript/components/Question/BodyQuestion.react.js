/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import update from 'react-addons-update'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Section from './Section.react.js'
import QuestionButton from './QuestionButton.react.js'
import QuestionHeader from './QuestionHeader.react.js'
import QuestionMain from './QuestionMain.react.js'
import QuestionTitle from './QuestionTitle.react.js'
import QuestionSubtitle from './QuestionSubtitle.react.js'
import QuestionModal from './QuestionModal.react.js'
import BodyModal from './BodyModal.react.js'
import BodyImage from './BodyImage.react.js'
import Content from '../../constants/localizableStringsDE.js'

export default class BodyQuestion extends Component {
  constructor(props) {
    super(props);

    // There is no autobinding for the React ES6 implementation
    this.update = this.update.bind(this);
    this.openBodyModal = this.openBodyModal.bind(this);
  }

  update(key, symptoms) {
    let bodyStateChange = {}
    bodyStateChange[key] = symptoms
    let newBodyState = update(this.props.body, { $merge: bodyStateChange })
    this.props.updateBody(newBodyState)
  }
  openBodyModal(key) {
    this.refs['body_'+ key].openModal();
  }
  render() {
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
          values={this.props.body['head']}
          title='Kopf'
          role="head"
          onChange={this.update.bind(this, 'head')}
          />
        <BodyModal
          ref='body_left_arm'
          values={this.props.body['left_arm']}
          title="Linker Arm"
          role="left_arm"
          onChange={this.update.bind(this, 'left_arm')}
          />
        <BodyModal
          ref='body_right_arm'
          values={this.props.body['right_arm']}
          title="Rechter Arm"
          role="right_arm"
          onChange={this.update.bind(this, 'right_arm')}
          />
        <BodyModal
          ref='body_chest'
          values={this.props.body['chest']}
          title="Brust"
          role="chest"
          onChange={this.update.bind(this, 'chest')}
          />
        <BodyModal
          ref='body_abdomen'
          values={this.props.body['abdomen']}
          title="Bauch"
          role="abdomen"
          onChange={this.update.bind(this, 'abdomen')}
          />
        <BodyModal
          ref='body_hip'
          values={this.props.body['hip']}
          title="Unterleib"
          role="hip"
          onChange={this.update.bind(this, 'hip')}
          />
        <BodyModal
          ref='body_left_leg'
          values={this.props.body['left_leg']}
          title="Linkes Bein"
          role="left_leg"
          onChange={this.update.bind(this, 'left_leg')}
          />
        <BodyModal
          ref='body_right_leg'
          values={this.props.body['right_leg']}
          title="Rechtes Bein"
          role="right_leg"
          onChange={this.update.bind(this, 'right_leg')}
          />
        <QuestionModal
              title ={ Content.QUESTION_BODY_TITLE }
              body = { Content.QUESTION_BODY_EXPLANATION }/>
      </Section>
    );
  }
}

BodyQuestion.propTypes = {
  updateBody: PropTypes.func.isRequired,
  body: PropTypes.object.isRequired
};
