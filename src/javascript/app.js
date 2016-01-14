require('jquery')

import React from 'react'
import ReactDOM from 'react-dom'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

import FeelingQuestion from './components/Question/FeelingQuestion.react.js'
import ThoughtsQuestion from './components/Question/ThoughtsQuestion.react.js'
import SituationQuestion from './components/Question/SituationQuestion.react.js'
import ReactionQuestion from './components/Question/ReactionQuestion.react.js'
import BodyQuestion from './components/Question/BodyQuestion.react.js'
import ResultsScreen from './components/ResultsScreen.react.js'
import WelcomeModal from './components/Question/WelcomeModal.react.js'
import PrevButton from './components/Reusable/PrevButton.react.js'
import NextButton from './components/Reusable/NextButton.react.js'
import PageNumber from './components/PageNumber.react.js'

const App = React.createClass({
  render: function() {
    return (
      <div className="gradient-background">
        <div id="main-app">
          <ReactCSSTransitionGroup component="div" className="transition-group" transitionName="page" transitionEnterTimeout={0} transitionLeaveTimeout={0}>
            { this.props.children }
          </ReactCSSTransitionGroup>
        </div>
        <ReactCSSTransitionGroup component="div" className="transition-group-modal" key="1" transitionName="modal" transitionEnterTimeout={0} transitionLeaveTimeout={0}>
          <WelcomeModal />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

export default connect((state) => state)(App)
