/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { reverseArray, intersperse} from '../utilities'

import Content from '../constants/localizableStringsDE.js'

export default class DisplayBody extends Component {
  constructor(props) {
    super(props)

    this.buildBodyForDisplay = this.buildBodyForDisplay.bind(this)
  }

  buildBodyForDisplay() {
    let bodyForDisplay = {}
    for (let bodypart in this.props.body) {
      bodyForDisplay[bodypart] = intersperse(this.props.body[bodypart], ", ")
    }
    return bodyForDisplay
  }

  render() {
    const body_parts = {
      head: Content.QUESTION_BODY_HEAD,
      left_arm: Content.QUESTION_BODY_LEFT_ARM,
      right_arm: Content.QUESTION_BODY_RIGHT_ARM,
      chest: Content.QUESTION_BODY_CHEST,
      abdomen: Content.QUESTION_BODY_ABDOMEN,
      left_leg: Content.QUESTION_BODY_LEFT_LEG,
      right_leg: Content.QUESTION_BODY_RIGHT_LEG,
      hip: Content.QUESTION_BODY_HIP
    }
    let bodyForDisplay = this.buildBodyForDisplay()

    return (
      <div>
        {
          Object.keys(body_parts).map((element, i) => {
            if(typeof bodyForDisplay[element] === 'undefined') {
              return (<div key={i}></div>)
            }
            return (
              <div key={i}>
                { bodyForDisplay[element].length > 0 ? <div><strong>{body_parts[element]}</strong><br/></div> : '' }
                {
                  bodyForDisplay[element].map( (value, j) => {
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
}
