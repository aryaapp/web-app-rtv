/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import Rcslider from 'rc-slider'

import { d3MoodColor, d3MoodGradient } from '../../utilities'

require('jquery')

let SliderInput = React.createClass({
  getDefaultProps() {
    return {
      feeling: {
        value: "",
        color: ""
        }
      };
  },
  update: function(value) {
    let feeling = {
      value: value,
      color: d3MoodColor(value)
    }
    this.props.onChange(feeling)
  },
  render: function() {
    let trackStyles = { backgroundColor: this.props.feeling.color }
    let handleStyle = { borderColor: this.props.feeling.color }
    return (
      <div>
        <div className="row">
          <div className="col-xs-10 col-xs-push-1">
            <Rcslider
              value={ this.props.feeling.value }
              defaultValue={ this.props.feeling.value }
              additionalHandleStyles={ handleStyle }
              additionalTrackStyles={ trackStyles }
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
})


module.exports = SliderInput
