/**
* @module rtv-mood tracker
* @submodule Question
*/
import React, { Component, PropTypes } from 'react'
import { reverseArray, intersperse} from '../utilities'

import Content from '../constants/localizableStringsDE.js'
import { buildBodyForDisplay } from '../utilities'


export default class DisplayBody extends Component {
  constructor(props) {
    super(props)
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
    let bodyForDisplay = buildBodyForDisplay(this.props.body)

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
