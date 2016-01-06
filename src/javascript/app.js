const jQuery = require('jquery')
require('jquery')
import React from 'react'
const ReactDOM = require('react-dom')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
// let's add some style

const FeelingQuestion = require('./components/Question/FeelingQuestion.react.js')
const ThoughtsQuestion = require('./components/Question/ThoughtsQuestion.react.js')
const SituationQuestion = require('./components/Question/SituationQuestion.react.js')
const ReactionQuestion = require('./components/Question/ReactionQuestion.react.js')
const BodyQuestion = require('./components/Question/BodyQuestion.react.js')
const ResultsScreen = require('./components/ResultsScreen.react.js')
const WelcomeModal = require('./components/Question/WelcomeModal.react.js')
const PrevButton = require('./components/Reusable/PrevButton.react.js')
const NextButton = require('./components/Reusable/NextButton.react.js')
const PageNumber = require('./components/PageNumber.react.js')


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setFeeling, setBody, setThoughts, setSituation, setReaction } from './actions/actions'


const App = React.createClass({
  getInitialState: function() {
    return {
      feeling: {
        value: 50,
        color: ""
      },
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
      thoughts: [],
      situation:  [],
      reaction: [],
      currentPage: 0
    };
  },
  handleQuestionChange: function(question, value) {
    var newState = {}
    newState[question] = value
    this.setState(newState);
    //tell fullpage to recalculate window size
  },
  clearData: function() {
    this.setState(this.getInitialState())
  },
  handleClickNext: function() {
    var newPage = Math.min( this.state.currentPage + 1 , 5 )
    this.setState({ currentPage: newPage })
  },
  handleClickPrev: function() {
    var newPage = Math.max( this.state.currentPage + -1 , 0 )
    this.setState({currentPage: newPage})
  },
  render: function() {
    var partial;
    const { dispatch } = this.props;
    switch (this.state.currentPage) {
      case 0:
        partial = <div className="partial-wrapper">
              <div className="partial-container" key="0"><FeelingQuestion
                 feeling={this.props.feeling}
                 updateFeeling={value => dispatch(setFeeling(value))}
              /></div>
              <NextButton onClick={this.handleClickNext} />

            </div>
        break;
      case 1:
        partial =
          <div className="partial-wrapper" key="1"><div className="partial-container" >
            <BodyQuestion
              body={this.props.body}
              updateBody={ value => dispatch(setBody(value)) }
            /></div>
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
          </div>
        break;
      case 2:
        partial =
          <div className="partial-wrapper" key="2"><div className="partial-container" >
            <ThoughtsQuestion
              thoughts={this.props.thoughts}
              updateThoughts={ value => dispatch(setThoughts(value)) }
            /></div>
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
          </div>
        break;
      case 3:
        partial =
          <div className="partial-wrapper" key="3"><div className="partial-container" >
            <SituationQuestion
              situation={this.props.situation}
              updateSituation={ value => dispatch(setSituation(value)) }
            /></div>
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
          </div>
        break;
      case 4:
        partial =
          <div className="partial-wrapper" key="4"><div className="partial-container" >
            <ReactionQuestion
              reaction={this.props.reaction}
              updateReaction={ value => dispatch(setReaction(value)) }
            /></div>
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
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
              clearData={this.clearData} />
            <PrevButton onClick={this.handleClickPrev} customClass="prev-button-relative" />
          </div></div>
        break;
      default:
        console.log('nothing to do here');
    }
    console.log('app.js',this.props)
    return (
        <div className="gradient-background">
          <PageNumber page={ this.state.currentPage + 1 } />
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
