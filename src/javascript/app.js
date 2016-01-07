require('jquery')

import React from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
import {
  setFeeling,
  setBody,
  setThoughts,
  setSituation,
  setReaction,
  nextPage,
  prevPage,
  clearDataAction
} from './actions/actions'

const App = React.createClass({
  render: function() {
    var partial;
    const { dispatch } = this.props;
    switch (this.props.currentPage) {
      case 0:
        partial = <div className="partial-wrapper">
              <div className="partial-container" key="0"><FeelingQuestion
                 feeling={this.props.feeling}
                 updateFeeling={value => dispatch(setFeeling(value))}
              /></div>
              <NextButton onClick={() => dispatch(nextPage()) } />
            </div>
        break;
      case 1:
        partial =
          <div className="partial-wrapper" key="1"><div className="partial-container" >
            <BodyQuestion
              body={this.props.body}
              updateBody={ value => dispatch(setBody(value)) }
            /></div>
            <PrevButton onClick={() => dispatch(prevPage()) } />
            <NextButton onClick={() => dispatch(nextPage()) } />
          </div>
        break;
      case 2:
        partial =
          <div className="partial-wrapper" key="2"><div className="partial-container" >
            <ThoughtsQuestion
              thoughts={this.props.thoughts}
              updateThoughts={ value => dispatch(setThoughts(value)) }
            /></div>
            <PrevButton onClick={() => dispatch(prevPage()) } />
            <NextButton onClick={() => dispatch(nextPage()) } />
          </div>
        break;
      case 3:
        partial =
          <div className="partial-wrapper" key="3"><div className="partial-container" >
            <SituationQuestion
              situation={this.props.situation}
              updateSituation={ value => dispatch(setSituation(value)) }
            /></div>
            <PrevButton onClick={() => dispatch(prevPage()) } />
            <NextButton onClick={() => dispatch(nextPage()) } />
          </div>
        break;
      case 4:
        partial =
          <div className="partial-wrapper" key="4"><div className="partial-container" >
            <ReactionQuestion
              reaction={this.props.reaction}
              updateReaction={ value => dispatch(setReaction(value)) }
            /></div>
            <PrevButton onClick={() => dispatch(prevPage()) } />
            <NextButton onClick={() => dispatch(nextPage()) } />
          </div>
        break;
      case 5:
        partial =
          <div className="partial-wrapper" key="5"><div className="partial-container" >
            <ResultsScreen
              feeling={this.props.feeling}
              body={this.props.body}
              thoughts={this.props.thoughts}
              situation={this.props.situation}
              reaction={this.props.reaction}
              clearData={() => dispatch(clearDataAction())} />
            <PrevButton onClick={() => dispatch(prevPage()) } />
          </div></div>
        break;
      default:
        console.log('nothing to do here');
    }

    console.log('app.js',this.props)
    return (
        <div className="gradient-background">
          <PageNumber page={ this.props.currentPage + 1 } />
          <div id="main-app">
            <ReactCSSTransitionGroup component="div" className="transition-group" transitionName="page" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              { partial }
            </ReactCSSTransitionGroup>
          </div>
          <ReactCSSTransitionGroup component="div" className="transition-group-modal" key="1" transitionName="modal" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <WelcomeModal />
          </ReactCSSTransitionGroup>
        </div>
    );
  }
});

export default connect((state) => state)(App)
