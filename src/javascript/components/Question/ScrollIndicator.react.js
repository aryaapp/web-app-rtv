/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react'

let ScrollIndicator = React.createClass({
  render() {
    return (
      <div className="scroll-wrapper scroll-wrapper-rtv">
        <p className="center-text arya-animation fade-in animation1">
          <span className="visible-xs visible-sm">Swipe down for next question</span>
          <span className="hidden-xs hidden-sm">Scroll down for next question</span>
          <br/>
          <i className="fa fa-chevron-down"></i>
        </p>
      </div>
    )
  }
})

module.exports = ScrollIndicator
