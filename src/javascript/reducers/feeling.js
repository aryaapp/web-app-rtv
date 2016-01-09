import { SET_FEELING } from '../actions/actions'

export default function feeling(state = { value: 50, color: '' }, action) {
  switch (action.type) {
    case SET_FEELING:
      return {
        value: action.newValue,
        color: action.color
      }
    default:
      return state
  }
}
