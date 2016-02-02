import { LOGIN_RECEIVED, LOGOUT } from '../actions/login'
import { RECEIVED_CREATE_ACCOUNT } from '../actions/createAccount'

export default function user(state = {}, action) {
  switch (action.type) {
    case LOGIN_RECEIVED:
      return action.data.user
    case RECEIVED_CREATE_ACCOUNT:
      return action.data.user
    case LOGOUT:
      return {}
    default:
      return state
  }
}

