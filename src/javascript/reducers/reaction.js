import { SET_REACTION } from '../actions/actions'

export default function reaction(state = [], action) {
  switch (action.type) {
    case SET_REACTION:
      return action.reaction
    default:
      return state
  }
}
