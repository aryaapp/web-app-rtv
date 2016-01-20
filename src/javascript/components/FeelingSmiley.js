import React, { Component, PropTypes } from 'react'

export default class FeelingSmiley extends Component {
  constructor(props) {
    super(props)
    this.state = { emotionLevel: this.calculateEmotionLevel(props.feeling) }
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  calculateEmotionLevel(feeling) {
    if(feeling == 100) {
      return 5
     } else if (feeling >= 74) {
      return 4
     } else if (feeling >= 50) {
      return 3
     } else if (feeling >= 26) {
      return 2
     } else {
      return 1
     }
  }

  componentWillReceiveProps(nextProps) {
     this.setState({ emotionLevel: this.calculateEmotionLevel(nextProps.feeling) })
  }

  render() {
    return(
      <img src={"images/emo-c" + this.state.emotionLevel +".svg"} className={ "svg emo emo-" + this.state.emotionLevel } />
    )
  }
}

FeelingSmiley.propTypes = {
  feeling: PropTypes.number.isRequired
}