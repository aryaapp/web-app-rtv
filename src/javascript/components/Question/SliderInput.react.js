/**
* @module rtv-mood tracker
* @submodule Question
*/

// let's change the bg color here
import React from 'react'
let ReactDOM = require('react-dom')
let ReactSlider = require('rc-slider')
let d3 = require('d3')
require('jquery')

//returns color belonging to moodrange 0-100
let d3MoodColor = function(value) {
  let colorScale = d3.scale.linear()
        .domain([0,50,100])
        .range(['#e86e6b','#fcd56b','#92D381']); //['#e86e6b','#e86e6c','#fcd56b','#59d1ba','#59d1bb','#a5d36e']
  return colorScale(value)
}

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
    console.log("value: " + value + "color: " + d3MoodColor(value))
    let feeling = {
      value: value,
      color: d3MoodColor(value)
    }
    this.props.onChange(feeling)
  },

  componentDidMount: function() {
    //jQuery since not possible with rc-slider API
    $(".rc-slider-track").css("background-color", d3MoodColor(this.props.feeling.value));
    $(".rc-slider-handle").css("border-color", d3MoodColor(this.props.feeling.value));
    $("#react-app").css("background-color", d3MoodColor(this.props.feeling.value));
  },

  componentDidUpdate: function() {
    //jQuery since not possible with rc-slider API
    $(".rc-slider-track").css("background-color", d3MoodColor(this.props.feeling.value));
    $(".rc-slider-handle").css("border-color", d3MoodColor(this.props.feeling.value));
    $("#react-app").css("background-color", d3MoodColor(this.props.feeling.value));
  },

  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-10 col-xs-push-1">
            <ReactSlider defaultValue={ this.props.feeling.value } onChange={this.update} />
            <div id="emo-container">
              <a>
                <img src="images/emo-1.svg" className="svg emo emo-1" />
              </a>
              <a>
                <img src="images/emo-2.svg" className="svg emo emo-2" />
              </a>
              <a>
                <img src="images/emo-3.svg" className="svg emo emo-3" />
              </a>
              <a>
                <img src="images/emo-4.svg" className="svg emo emo-4" />
              </a>
              <a>
                <img src="images/emo-5.svg" className="svg emo emo-5" />
              </a>
            </div>
          </div>
        </div>
          
      </div>
    )
  }
})


module.exports = SliderInput

        // <div>
        //   <h2 className="text-center">{this.props.value}</h2>
        //   <input
        //     type="range"
        //     min="0"
        //     max="100"
        //     step="1"
        //     value={this.props.value}
        //     onChange={this.update} />
        //  </div>