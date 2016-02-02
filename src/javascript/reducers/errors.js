import { LOGIN_FAILED } from '../actions/login'


export default function errors(state = {}, action) {
  switch (action.type) {
    case LOGIN_FAILED:
      return action.errors
    default:
      return state
  }
}

