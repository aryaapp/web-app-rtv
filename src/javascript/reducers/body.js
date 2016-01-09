import { SET_BODY } from '../actions/actions'

const initialBodyState = {
  head: [],
  left_arm: [],
  right_arm: [],
  chest: [],
  abdomen: [],
  left_leg: [],
  right_leg: [],
  hip: []
}

export default function body(state = initialBodyState, action) {
  switch (action.type) {
    case SET_BODY:
      return action.bodyState
    default:
      return state
  }
}
