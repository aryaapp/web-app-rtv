import { SET_THOUGHTS } from '../actions/actions'

export default function thoughts(state = [], action) {
  switch (action.type) {
    case SET_THOUGHTS:
      return action.thoughts
    default:
      return state
  }
}
