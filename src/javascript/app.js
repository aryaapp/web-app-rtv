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
var ResultsScreen = require('./components/ResultsScreen.react.js');

var App = React.createClass({
  getInitialState: function() {
    return {
      feeling: 90,
      body: 'body not yet',
      thoughts: 'Mein Gedanken',
      situation:  [],
      reaction: [],
    };
  },
  handleQuestionChange: function(question, value) {
    var newState = {}
    newState[question] = value
    this.setState(newState);
    $('#fullpage').fullpage({
        afterResize: function(){
            var pluginContainer = $(this);
            alert("The sections have finished resizing");
        }
    });
    //do something here to recalculate fullscreen.js window size
  },
  clearData: function() {
    this.setState(this.getInitialState())
  },
  render: function() {
    //container-fluid?
    return (
      <div className="">
         <div id="fullpage">
            <FeelingQuestion
              className="section"
              feeling={this.state.feeling}
              onChange={this.handleQuestionChange.bind(this, 'feeling' )}
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