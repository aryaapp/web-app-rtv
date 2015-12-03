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
    var newPage = Math.min( this.state.currentPage + 1 , 1 )
    this.setState({ currentPage: newPage }) 
    console.log('current Page change : ' + newPage)
  },
  handleClickPrev: function() {
    var newPage = Math.max( this.state.currentPage + -1 , 0 )
    this.setState({currentPage: newPage})
    console.log('current Page change : ' + newPage)
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
        console.log('body');
        break;
      default:
        console.log('nothing to do here');
    }

    return (
      <div className="gradient-background">
        <div id="main-app">
            { partial }
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-app'));