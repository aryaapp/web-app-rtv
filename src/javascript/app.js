var jQuery = require('jquery');
require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
require('./fullpage.js');

// var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js');

var FeelingQuestion = require('./components/Question/FeelingQuestion.react.js');
var ThoughtsQuestion = require('./components/Question/ThoughtsQuestion.react.js');
var SituationQuestion = require('./components/Question/SituationQuestion.react.js');
var ReactionQuestion = require('./components/Question/ReactionQuestion.react.js');
var BodyQuestion = require('./components/Question/BodyQuestion.react.js');
var WelcomeScreen = require('./components/WelcomeScreen.react.js');
var ResultsScreen = require('./components/ResultsScreen.react.js');

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
    //container-fluid?
    return (
      <div className="">
         <div id="fullpage">
            <WelcomeScreen
            />
            <FeelingQuestion
              feeling={this.state.feeling}
              onChange={this.handleQuestionChange.bind(this, 'feeling' )}
            />
            <BodyQuestion
              body={this.state.body}
              onChange={this.handleQuestionChange.bind(this, 'body' )}
            />
            <ThoughtsQuestion
              thoughts={this.state.thoughts}
              onChange={this.handleQuestionChange.bind(this, 'thoughts' )}
            />
            <SituationQuestion
              situation={this.state.situation}
              onChange={this.handleQuestionChange.bind(this, 'situation' )}
            />

            <ReactionQuestion
              reaction={this.state.reaction}
              onChange={this.handleQuestionChange.bind(this, 'reaction' )}
            />
            <ResultsScreen
              feeling={this.state.feeling}
              body={this.state.body}
              thoughts={this.state.thoughts}
              situation={this.state.situation}
              reaction={this.state.reaction}
              clearData={this.clearData} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-app'));