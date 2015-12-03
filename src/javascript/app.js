var jQuery = require('jquery')
require('jquery')
var React = require('react')
var ReactDOM = require('react-dom')
// let's add some style

var FeelingQuestion = require('./components/Question/FeelingQuestion.react.js')
var ThoughtsQuestion = require('./components/Question/ThoughtsQuestion.react.js')
var SituationQuestion = require('./components/Question/SituationQuestion.react.js')
var ReactionQuestion = require('./components/Question/ReactionQuestion.react.js')
var BodyQuestion = require('./components/Question/BodyQuestion.react.js')
var ResultsScreen = require('./components/ResultsScreen.react.js')
var WelcomeModal = require('./components/Question/WelcomeModal.react.js')
var PrevButton = require('./components/Reusable/PrevButton.react.js')
var NextButton = require('./components/Reusable/NextButton.react.js')
var PageNumber = require('./components/PageNumber.react.js')

var App = React.createClass({
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
        left_leg: [],
        right_leg: [],
        hip: []
      },
      thoughts: '',
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
    switch (this.state.currentPage) {
      case 0:
        partial = <div className="partial-container"><FeelingQuestion
              feeling={this.state.feeling}
              onChange={this.handleQuestionChange.bind(this, 'feeling' )}
              onClickNext = { this.handleClickNext }
            />
            <NextButton onClick={this.handleClickNext} />
            </div>
        break;
      case 1:
        partial = 
          <div className="partial-container">
            <BodyQuestion
              body={this.state.body}
              onChange={this.handleQuestionChange.bind(this, 'body' )}
            />
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
          </div>
        break;
      case 2:
        partial = 
          <div className="partial-container">
            <ThoughtsQuestion
              thoughts={this.state.thoughts}
              onChange={this.handleQuestionChange.bind(this, 'thoughts' )}
            />
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
          </div>
        break;
      case 3:
        partial = 
          <div className="partial-container">
            <SituationQuestion
              situation={this.state.situation}
              onChange={this.handleQuestionChange.bind(this, 'situation' )}
            />
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
          </div>
        break;
      case 4:
        partial = 
          <div className="partial-container">
            <ReactionQuestion
              reaction={this.state.reaction}
              onChange={this.handleQuestionChange.bind(this, 'reaction' )}
            />
            <PrevButton onClick={this.handleClickPrev} />
            <NextButton onClick={this.handleClickNext} />
          </div>
        break;  
      case 5:
        partial = 
          <div className="partial-container">
            <ResultsScreen
              feeling={this.state.feeling}
              body={this.state.body}
              thoughts={this.state.thoughts}
              situation={this.state.situation}
              reaction={this.state.reaction}
              clearData={this.clearData} />
            <PrevButton onClick={this.handleClickPrev} />
          </div>
        break;  
      default:
        console.log('nothing to do here');
    }

    return (
      <div className="gradient-background">
        <PageNumber page={this.state.currentPage + 1} />
        <div id="main-app">
            { partial }
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-app'));