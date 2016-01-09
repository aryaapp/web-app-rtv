import { SET_SITUATION } from '../actions/actions'

export default function situation(state = [], action) {
  switch (action.type) {
    case SET_SITUATION:
      return action.situation
    default:
      return state
  }
}
