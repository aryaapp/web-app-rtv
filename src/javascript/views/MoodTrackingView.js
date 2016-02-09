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

class MoodTrackingView extends Component {
  constructor(props) {
    super(props)
    const { color, value } = this.props.feeling
    this.state = { moodTrackingStyles: this.calcMoodTrackingStyles(color, value) }

    this.calcMoodTrackingStyles = this.calcMoodTrackingStyles.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.feeling.value != this.props.feeling.value) {
      const { color, value } = nextProps.feeling
      this.setState({ moodTrackingStyles: this.calcMoodTrackingStyles(color, value) })
    }
  }

  calcMoodTrackingStyles(color, value) {
    return {
      backgroundColor: color,
      backgroundImage: "-webkit-linear-gradient(" + d3MoodGradient(value) + ")",
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

MoodTrackingView.defaultProps = {
  feeling: {
    value: 50, color: '#FCD56B'
  }
}

export default connect(mapStateToProps)(MoodTrackingView)