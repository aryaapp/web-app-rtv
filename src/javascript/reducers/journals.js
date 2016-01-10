import { RECEIVED_JOURNALS } from '../actions/journals'

export default function user(state = [], action) {
  switch (action.type) {
    case RECEIVED_JOURNALS:
      return action.data
    default:
      return state
  }
}

