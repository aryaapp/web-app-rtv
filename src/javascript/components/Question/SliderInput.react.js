/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import Rcslider from 'rc-slider'

import { d3MoodColor, d3MoodGradient } from '../../utilities'

export default class SliderInput extends Component {
  constructor(props) {
    super(props)

    this.state = this.calculateStyles(this.props.feeling.color)
    this.update = this.update.bind(this)
  }

  calculateStyles(color) {
    return {
      trackStyles: { backgroundColor: color },
      handleStyle: { borderColor: color }
    }
  }
  update(value) {
    let feeling = {
      value: value,
      color: d3MoodColor(value)
    }
    this.props.onChange(feeling)
    this.setState(this.calculateStyles(feeling.color))
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-10 col-xs-push-1">
            <Rcslider
              value={ this.props.feeling.value }
              defaultValue={ this.props.feeling.value }
              additionalHandleStyles={ this.state.handleStyle }
              additionalTrackStyles={ this.state.trackStyles }
              onChange={this.update}
            />
            <div id="emo-container">
              <a onClick={this.update.bind(this, 2)}>
                <img src="/images/emo-1.svg" className="svg emo emo-1" />
              </a>
              <a onClick={this.update.bind(this, 26)}>
                <img src="/images/emo-2.svg" className="svg emo emo-2" />
              </a>
              <a onClick={this.update.bind(this, 50)}>
                <img src="/images/emo-3.svg" className="svg emo emo-3" />
              </a>
              <a onClick={this.update.bind(this, 74)}>
                <img src="/images/emo-4.svg" className="svg emo emo-4" />
              </a>
              <a onClick={this.update.bind(this, 100)}>
                <img src="/images/emo-5.svg" className="svg emo emo-5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

SliderInput.defaultProps = {
  feeling: { value: 50, color: '#FCD56B' }
}
