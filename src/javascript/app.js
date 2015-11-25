var jQuery = require('jquery')
require('jquery')
var React = require('react')
var ReactDOM = require('react-dom')
require('./fullpage.js')

// var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js')

var FeelingQuestion = require('./components/Question/FeelingQuestion.react.js')
var ThoughtsQuestion = require('./components/Question/ThoughtsQuestion.react.js')
var SituationQuestion = require('./components/Question/SituationQuestion.react.js')
var ReactionQuestion = require('./components/Question/ReactionQuestion.react.js')
var BodyQuestion = require('./components/Question/BodyQuestion.react.js')
var ResultsScreen = require('./components/ResultsScreen.react.js')
var WelcomeModal = require('./components/Question/WelcomeModal.react.js')

var App = React.createClass({
  getInitialState: function() {
    return {
      feeling: 90,
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
    };
  },
  handleQuestionChange: function(question, value) {
    var newState = {}
    newState[question] = value
    this.setState(newState);
    //tell fullpage to recalculate window size
    $.fn.fullpage.reBuild();
  },
  clearData: function() {
    this.setState(this.getInitialState())
  },
  render: function() {
    //can we lazy load the Fullpage app? While displaying the WelcomeModal?
    return (
      <div className="">
          <WelcomeModal />
          
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-app'));