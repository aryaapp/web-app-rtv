var jQuery = require('jquery');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var fullPage = require('./fullpage.js');
// var jQueryFullPage = require('../../node_modules/fullpage.js/jquery.fullPage.js');

var FeelingQuestion = require('./components/Question/FeelingQuestion.react.js');
var ThoughtsQuestion = require('./components/Question/ThoughtsQuestion.react.js');
var SituationQuestion = require('./components/Question/SituationQuestion.react.js');


var App = React.createClass({
  getInitialState: function() {
    return {
      feeling: 50,
      thoughts: '',
      body: {},
      situation:  ['test1','test2'],
    };
  },
  handleQuestionChange: function(question, value) {
    var newState = {}
    newState[question] = value
    this.setState(newState);
  },
  render: function() {
    return (
      <div className="container">
         <div id="fullpage">
            <div className="section">
                <div className="row">
                  <FeelingQuestion
                    feeling={this.state.feeling}
                    onChange={this.handleQuestionChange.bind(this, 'feeling' )}
                  />
                </div>
                <div className="row footer">
                    <p>Swipe down</p>
                </div>
                <pre>Feeling: {this.state.feeling}</pre>
            </div>
            <div className="section">
              <div className="row">
                <ThoughtsQuestion
                  thoughts={this.state.thoughts}
                  onChange={this.handleQuestionChange.bind(this, 'thoughts' )}
                />
              </div>
              <div className="row footer">
                  <p>Swipe down</p>
              </div>
              <pre>Thoughts: {this.state.thoughts}</pre>
            </div>
            <div className="section">
              <div className="row">
                <SituationQuestion
                  situation={this.state.situation}
                  onChange={this.handleQuestionChange.bind(this, 'situation' )}
                />
              </div>
              <div className="row footer">
                  <p>Swipe down</p>
              </div>
              <pre>Situation: {this.state.situation}</pre>
            </div>
            <div className="section"><h3>Ok, cheers</h3></div>
            <div className="section">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>No, you hang up first</h3>
                        <button className="btn btn-lg arya-btn margin-top">Hang Up</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('react-app'));
