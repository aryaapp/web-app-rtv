/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';

var QuestionModal = React.createClass({
  render() {
    return (
      <div>
        <span>?</span>
        <div>{this.props.children}</div>
      </div>
    );
  }
});

module.exports = QuestionModal
