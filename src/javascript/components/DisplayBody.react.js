/**
* @module rtv-mood tracker
* @submodule Question
*/
import React from 'react';
let Content = require('../constants/localizableStringsDE.js')

let DisplayBody = React.createClass({
  getDefaultProps() {
    return {
      body: {},
    };
  },
  render: function() {
    var body_parts = {
      head: Content.QUESTION_BODY_HEAD,
      left_arm: Content.QUESTION_BODY_LEFT_ARM,
      right_arm: Content.QUESTION_BODY_RIGHT_ARM,
      chest: Content.QUESTION_BODY_CHEST,
      abdomen: Content.QUESTION_BODY_ABDOMEN,
      left_leg: Content.QUESTION_BODY_LEFT_LEG,
      right_leg: Content.QUESTION_BODY_RIGHT_LEG,
      hip: Content.QUESTION_BODY_HIP
    }
    var that = this
    return (
      <div>
        {
          Object.keys(body_parts).map(function(element, i) {
            if(typeof that.props.body[element] === 'undefined') {
              console.log('bodypart', that.props.body[element])
              return (<div key={i}></div>)
            }

            return (
              <div key={i}>
                { that.props.body[element].length > 0 ? <div><strong>{body_parts[element]}</strong><br/></div> : '' }
                {
                  that.props.body[element].map(function(value, j) {
                    return (
                      <span key={j}>{value} </span>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      )
    }
})

module.exports = DisplayBody
