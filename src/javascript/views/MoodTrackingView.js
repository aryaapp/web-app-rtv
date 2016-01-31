/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { d3MoodGradient } from '../utilities'

export default class MoodTrackingView extends Component {
  render() {
    console.log('MoodTrackingView props', this.props)
    let moodTrackingStyles = {
      backgroundColor: this.props.feeling.color,
      backgroundImage: "-webkit-linear-gradient(" + d3MoodGradient(this.props.feeling.value) + ")",
    }
    return (
      <div id='mood-tracker' style={ moodTrackingStyles } >
        { this.props.children }
      </div>
    )
  }
}

MoodTrackingView.propTypes = {

};

export default connect((state) => state)(MoodTrackingView)