/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { d3MoodGradient } from '../utilities'

const mapStateToProps = (state) => ({
  feeling: state.moodTracking.feeling
})

export default class MoodTrackingView extends Component {
  constructor(props) {
    super(props)
    this.state = { moodTrackingStyles: this.calcMoodTrackingStyles() }

    this.calcMoodTrackingStyles = this.calcMoodTrackingStyles.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.feeling.value != this.props.feeling.value) {
      console.log('MoodTrackingView updating background')
      this.setState({ moodTrackingStyles: this.calcMoodTrackingStyles() })
    }
  }

  calcMoodTrackingStyles() {
    return {
      backgroundColor: this.props.feeling.color,
      backgroundImage: "-webkit-linear-gradient(" + d3MoodGradient(this.props.feeling.value) + ")",
    }
  }

  render() {
    return (
      <div id='mood-tracker' style={ this.state.moodTrackingStyles } >
        { this.props.children }
      </div>
    )
  }
}

MoodTrackingView.propTypes = {

};

export default connect(mapStateToProps)(MoodTrackingView)